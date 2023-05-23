import { useEffect } from "react";
import styles from "./App.module.less";
import { RenderElement } from "./components/renderElement";
import { DraggableData, Rnd } from "react-rnd";
import { useGuideLines } from "./hooks/useGuideLine";
import { GuideLine } from "./components/guideLine";
import { useDispatch, useSelector } from "react-redux";
import {
  allShapesSelector,
  getActiveElement,
  getActiveElementId,
} from "./store/elementSlice/elementSelector";
import { store } from "./store/store";
import {
  setActiveElementId,
  updatePosition,
} from "./store/elementSlice/elementSlice";
import { DraggableEvent } from "react-draggable";

export const App = () => {
  const dispatch = useDispatch();
  const elements = useSelector(allShapesSelector);
  const active = useSelector(getActiveElement);
  const activeId = useSelector(getActiveElementId);

  const { guideLines, setGuideLines, manipulateElement, sorb } =
    useGuideLines();

  useEffect(() => {
    if (sorb[0] === 0 && sorb[1] === 0) return;
    const id = store.getState().element.activeId;
    id && updateElementPosition(id, sorb);
  }, [sorb]);

  useEffect(() => {
    if (active) {
      manipulateElement(elements, active);
    }
  }, [active?.position]);

  useEffect(() => {
    setGuideLines([]);
  }, [activeId]);

  const updateElementPosition = (id: string, offset: [number, number]) => {
    const element = store.getState().element.shapes[id];
    const position = {
      x: element.position.x + offset[0],
      y: element.position.y + offset[1],
    };

    dispatch(updatePosition({ id, position }));
  };

  return (
    <div className={styles["app"]}>
      {elements.map((el) => (
        <Rnd
          key={el.id}
          position={el.position}
          onDragStart={() => {
            dispatch(setActiveElementId(el.id));
          }}
          onDrag={(e: DraggableEvent, data: DraggableData) => {
            updateElementPosition(el.id, [data.deltaX, data.deltaY]);
          }}
          onDragStop={() => {
            dispatch(setActiveElementId(null));
          }}
        >
          <RenderElement
            element={el}
            onClick={(id) => dispatch(setActiveElementId(id))}
          />
        </Rnd>
      ))}
      {guideLines.map((guide, index) => (
        <GuideLine from={guide.start} to={guide.end} key={index} />
      ))}
    </div>
  );
};
