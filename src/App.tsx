import styles from "./App.module.less";
import { RenderElement } from "./components/renderElement";
import { useGuideLines } from "./hooks/useGuideLine";
import { GuideLine } from "./components/guideLine";
import { useDispatch, useSelector } from "react-redux";
import {
  allShapesSelector,
  getActiveElement,
} from "./store/elementSlice/elementSelector";
import {
  setActiveElementId,
  updatePosition,
} from "./store/elementSlice/elementSlice";
import { useEffect, useRef } from "react";
import { ShapeElement, SorbData, positionType } from "./config/type";
import { Rnd } from "./components/Rnd";
import { store } from "./store/store";

export const App = () => {
  const dispatch = useDispatch();
  const elements = useSelector(allShapesSelector);
  const active = useSelector(getActiveElement);

  const elOriginPosition = useRef<positionType | null>(null);

  const startMoveX = useRef<number>(0);
  const startMoveY = useRef<number>(0);

  const sorbRange = 5;
  const sorbData = useRef<SorbData | null>(null);

  const { guideLines, setGuideLines, manipulateElement, sorb } =
    useGuideLines();

  useEffect(() => {
    if (sorb === null) {
      sorbData.current = null;
      return;
    }
    sorbData.current = sorb;
    dispatch(
      updatePosition({
        id: sorb.sorbedElement.id,
        position: sorb.position,
      })
    );
  }, [sorb]);

  useEffect(() => {
    if (active) {
      manipulateElement(elements, active, { sorbRange });
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

    if (sorbData.current) {
      const { isXAxisSorbed, isYAxisSorbed, sorbedElement } = sorbData.current;

      const elPosition = store.getState().element.shapes[sorbedElement.id]

      const diffX = position.x - elPosition.position.x;
      const diffY = position.y - elPosition.position.y;

      if (isYAxisSorbed && Math.abs(diffY) <= sorbRange) {
        position.y = elPosition.position.y;
      }

      if (isXAxisSorbed && Math.abs(diffX) <= sorbRange) {
        position.x = elPosition.position.x;
      }
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
