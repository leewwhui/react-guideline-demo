import { useState } from "react";
import { GuideLine, ShapeElement } from "../config/type";
import { BoundingBox } from "../config/boundingBox";
import { GuideLineUtil } from "../config/guidelineUtil";

export const useGuideLines = () => {
  const [guideLines, setGuideLines] = useState<GuideLine[]>([]);
  const [sorb, setSorb] = useState<[number, number]>([0, 0]);

  const manipulateElement = (
    elements: ShapeElement[],
    activeElement: ShapeElement
  ) => {
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

    // sorb
    setSorb([
      GuideLineUtil.calculateVerticalOffset(
        activeBoundingBox,
        verticalLines,
        1
      ),
      GuideLineUtil.calculateHorziontalSorbOffset(
        activeBoundingBox,
        horizontalLines,
        1 
      ),
    ]);

    // 辅助线筛选
    const horizontalGuideLines: GuideLine[] = [];
    const verticalGuideLines: GuideLine[] = [];

    if (!activeBoundingBox) return;
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
    sorb
  };
};
