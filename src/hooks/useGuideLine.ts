import { useState } from "react";
import { GuideLine, ShapeElement, SorbData } from "../config/type";
import { BoundingBox } from "../config/boundingBox";
import { GuideLineUtil } from "../config/guidelineUtil";

interface DragElementConfig {
  sorbRange: number;
}

export const useGuideLines = () => {
  const [guideLines, setGuideLines] = useState<GuideLine[]>([]);
  const [sorb, setSorb] = useState<SorbData | null>(null);

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

    const xAxisSorb = GuideLineUtil.calculateXAxisOffset(
      activeBoundingBox,
      verticalLines,
      sorbRange
    );

    const yAxisSorb = GuideLineUtil.calculateYAxisSorbOffset(
      activeBoundingBox,
      horizontalLines,
      sorbRange
    );

    if (xAxisSorb !== null || yAxisSorb !== null) {
      const sorbData: SorbData = {
        offset: [xAxisSorb || 0, yAxisSorb || 0],
        position: {
          x: activeBoundingBox.date.left + (xAxisSorb || 0),
          y: activeBoundingBox.date.top + (yAxisSorb || 0),
        },
        sorbRange,
        isXAxisSorbed: xAxisSorb !== null,
        isYAxisSorbed: yAxisSorb !== null,
        sorbedElement: activeElement,
      };

      setSorb(sorbData);
    } else {
      setSorb(null);
    }

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
    sorb,
  };
};
