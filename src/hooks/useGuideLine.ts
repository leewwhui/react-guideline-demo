import { useRef, useState } from "react";
import { GuideLine, ShapeElement } from "../config/type";
import { BoundingBox } from "../config/boundingBox";
import { GuideLineUtil } from "../config/guidelineUtil";

interface DragElementConfig {
  sorbRange: number;
}

export const useGuideLines = () => {
  const [guideLines, setGuideLines] = useState<GuideLine[]>([]);
  const [sorb, setSorb] = useState<[number, number]>([0, 0]);
  const isHoriztontalSorb = useRef<boolean>(false);

  const manipulateElement = (
    elements: ShapeElement[],
    activeElement: ShapeElement,
    config: DragElementConfig
  ) => {
    const { sorbRange } = config;

    const horizontalLines: GuideLine[] = [];
    const verticalLines: GuideLine[] = [];

    const activeBoundingBox = createBoundingBox(activeElement);

    // 收集目标对其元素的所有辅助线
    elements.forEach((el) => {
      if (activeElement.id === el.id) return;
      const boundingBox = createBoundingBox(el);

      horizontalLines.push(...boundingBox.getHorizontalLines());
      verticalLines.push(...boundingBox.getVerticalLines());
    });

    const verticalSorb = GuideLineUtil.calculateVerticalOffset(
      activeBoundingBox,
      verticalLines,
      sorbRange
    );

    const horizontalSorb = GuideLineUtil.calculateHorziontalSorbOffset(
      activeBoundingBox,
      horizontalLines,
      sorbRange
    );

    if (horizontalSorb !== null) isHoriztontalSorb.current = true;
    else isHoriztontalSorb.current = false;
    setSorb([verticalSorb || 0, horizontalSorb || 0]);

    // 辅助线筛选
    const horizontalGuideLines: GuideLine[] = [];
    const verticalGuideLines: GuideLine[] = [];

    horizontalLines.forEach((h) => {
      horizontalGuideLines.push(
        ...activeBoundingBox.getRelativeHorizontalLine(h)
      );
    });

    verticalLines.forEach((v) => {
      verticalGuideLines.push(...activeBoundingBox.getRelativeVerticalLine(v));
    });

    // 合并辅助线
    setGuideLines([
      ...GuideLineUtil.mergeHorizontalLines(horizontalGuideLines),
      ...GuideLineUtil.mergeVerticalLines(verticalGuideLines),
    ]);
  };

  const createBoundingBox = (element: ShapeElement) => {
    return BoundingBox.createBoundingBox(element);
  };

  return {
    manipulateElement,
    guideLines,
    setGuideLines,
    isHoriztontalSorb: isHoriztontalSorb.current,
    sorb,
  };
};
