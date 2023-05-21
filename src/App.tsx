import { useEffect, useRef } from "react";
import styles from "./App.module.less";
import { RenderElement } from "./components/renderElement";
import { useMoveable } from "./hooks/useMoveable";
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
  updateShapeProps,
} from "./store/elementSlice/elementSlice";

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const elements = useSelector(allShapesSelector);
  const activeId = useSelector(getActiveElementId);
  const active = useSelector(getActiveElement);

  const { moveable, setContainer, setTargets } = useMoveable();
  const guideLine = useGuideLines();

  useEffect(() => {
    active && guideLine.manipulateElement(elements, active);
  }, [active]);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      setContainer(containerRef.current);
    }
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const element = container.querySelector(`[data-element-id="${activeId}"]`);
    setTargets([element as HTMLElement]);
  }, [activeId]);

  const handleOnDragElement = (delta: number[]) => {
    const id = store.getState().element.activeId;
    if (!id) return;
    const element = store.getState().element.shapes[id];

    const props = {
      ...element,
      position: {
        x: element.position.x + delta[0],
        y: element.position.y + delta[1],
      },
    };

    dispatch(updateShapeProps({ id, props }));
  };

  useEffect(() => {
    moveable.on("drag", (e) => handleOnDragElement(e.delta));
    moveable.on("dragEnd", () => guideLine.setGuideLines([]));
  }, [moveable]);

  return (
    <div className={styles["app"]} ref={containerRef}>
      {elements.map((el) => (
        <RenderElement
          element={el}
          key={el.id}
          onClick={(id) => dispatch(setActiveElementId(id))}
        />
      ))}
      {guideLine.guideLines.map((guide, index) => (
        <GuideLine from={guide.start} to={guide.end} key={index} />
      ))}
    </div>
  );
};
