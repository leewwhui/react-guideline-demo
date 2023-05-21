import { useState } from "react";
import { GuideLine, ShapeElement } from "../config/type";
import { BoundingBox } from "../config/boundingBox";

// 1. 获取拖拽元素的 bounding box 的辅助线
// 2. 遍历场景中的元素的 bounding box 的辅助线，并且收集相近的辅助线
// 3. 合并辅助线
export const useGuideLines = () => {
  const [guideLines, setGuideLines] = useState<GuideLine[]>([]);
  const sorptionRange = 5;

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

    // 根据吸附范围(sorptionRange)进行辅助线筛选
    const horizontalGuideLines: GuideLine[] = [];
    const verticalGuideLines: GuideLine[] = [];

    horizontalLines.forEach((h) => {
      horizontalGuideLines.push(
        ...activeBoundingBox.getRelativeHorizontalLine(h, sorptionRange)
      );
    });

    verticalLines.forEach((v) => {
      verticalGuideLines.push(
        ...activeBoundingBox.getRelativeVerticalLine(v, sorptionRange)
      );
    });

    // 合并辅助线
    // setGuideLines([
    //   ...mergeHorizontalLines(horizontalGuideLines),
    //   ...mergeVerticalLines(verticalGuideLines),
    // ]);

    setGuideLines([...horizontalGuideLines, ...verticalGuideLines]);
  };

  const createBoundingBox = (element: ShapeElement) => {
    return BoundingBox.createBoundingBox(element);
  };

  const mergeHorizontalLines = (lines: GuideLine[]) => {
    return [];
  };

  const mergeVerticalLines = (lines: GuideLine[]) => {
    return [];
  };

  return {
    manipulateElement,
    guideLines,
    setGuideLines,
  };
};
