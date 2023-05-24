import styles from "./App.module.less";
import { RenderElement } from "./components/renderElement";
import { useGuideLines } from "./hooks/useGuideLine";
import { GuideLine } from "./components/guideLine";
import { useDispatch, useSelector } from "react-redux";
import {
  allShapesSelector,
  getActiveElement,
} from "./store/elementSlice/elementSelector";
import { store } from "./store/store";
import {
  setActiveElementId,
  updatePosition,
} from "./store/elementSlice/elementSlice";
import { useEffect, useRef } from "react";
import { ShapeElement, positionType } from "./config/type";
import { Rnd } from "./components/Rnd";

export const App = () => {
  const dispatch = useDispatch();
  const elements = useSelector(allShapesSelector);
  const active = useSelector(getActiveElement);

  const elOriginPosition = useRef<positionType | null>(null);
  const sorbPosition = useRef<positionType | null>(null);

  const startMoveX = useRef<number>(0);
  const startMoveY = useRef<number>(0);

  const { guideLines, setGuideLines, manipulateElement, sorb } =
    useGuideLines();

  useEffect(() => {
    if (sorb[0] === 0 && sorb[1] === 0) return;
    const id = store.getState().element.activeId;
    if (!id) return;
    const element = store.getState().element.shapes[id];

    const position = {
      x: element.position.x + sorb[0],
      y: element.position.y + sorb[1],
    };
    sorbPosition.current = position;

    dispatch(
      updatePosition({
        id,
        position,
      })
    );
  }, [sorb]);

  useEffect(() => {
    if (active) {
      manipulateElement(elements, active);
    }
  }, [active?.position]);

  const handleOnDragStart = (e: MouseEvent, el: ShapeElement) => {
    elOriginPosition.current = el.position;

    startMoveX.current = e.clientX;
    startMoveY.current = e.clientY;

    dispatch(setActiveElementId(el.id));
  };

  const handleOnDrag = (e: MouseEvent, el: ShapeElement) => {
    const moveX = e.clientX - startMoveX.current;
    const moveY = e.clientY - startMoveY.current;
    if (!elOriginPosition.current) return;

    let position = {
      x: elOriginPosition.current.x + moveX,
      y: elOriginPosition.current.y + moveY,
    };

    if (sorbPosition.current) {
      const diffX = position.x - sorbPosition.current.x;
      const diffY = position.y - sorbPosition.current.y;

      const x = Math.abs(diffX) > 10 ? position.x : sorbPosition.current.x;
      const y = Math.abs(diffY) > 10 ? position.y : sorbPosition.current.y;

      position = { x, y };
    }

    dispatch(
      updatePosition({
        id: el.id,
        position,
      })
    );
  };

  return (
    <div className={styles["app"]}>
      {elements.map((el) => (
        <Rnd
          key={el.id}
          position={el.position}
          onDragStart={(e) => handleOnDragStart(e as MouseEvent, el)}
          onDrag={(e) => handleOnDrag(e as MouseEvent, el)}
          onDragStop={() => {
            setGuideLines([]);
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
