import { useState } from "react";
import { GuideLine, ShapeElement } from "../config/type";
import { BoundingBox } from "../config/boundingBox";
import { GuideLineUtil } from "../config/guidelineUtil";

// 1. 获取拖拽元素的 bounding box 的辅助线
// 2. 遍历场景中的元素的 bounding box 的辅助线，并且收集相近的辅助线
// 3. 合并辅助线
export const useGuideLines = () => {
  const [guideLines, setGuideLines] = useState<GuideLine[]>([]);

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
  };
};
