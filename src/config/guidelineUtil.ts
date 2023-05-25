import { BoundingBox } from "./boundingBox";
import { GuideLine, GuideLineType } from "./type";

const abs = Math.abs;

export class GuideLineUtil {
  static createGuideLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    type: GuideLineType
  ): GuideLine {
    return {
      type,
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
    };
  }

  static horizontalOffset(line1: GuideLine, line2: GuideLine) {
    return line1.start.y - line2.start.y;
  }

  static verticalOffset(line1: GuideLine, line2: GuideLine) {
    return line1.start.x - line2.start.x;
  }

  static calculateHorziontalSorbOffset(
    boundingBox: BoundingBox,
    lines: GuideLine[],
    sorbRange: number
  ) {
    const [top, center, bottom] = boundingBox.getHorizontalLines();
    let minOffset = Infinity;

    lines.forEach((line) => {
      const t_diff = GuideLineUtil.horizontalOffset(line, top);
      const c_diff = GuideLineUtil.horizontalOffset(line, center);
      const b_diff = GuideLineUtil.horizontalOffset(line, bottom);

      if (abs(t_diff) <= sorbRange && abs(t_diff) < abs(minOffset)) {
        minOffset = t_diff;
      }

      if (abs(c_diff) <= sorbRange && abs(c_diff) < abs(minOffset)) {
        minOffset = c_diff;
      }

      if (abs(b_diff) <= sorbRange && abs(b_diff) < abs(minOffset)) {
        minOffset = b_diff;
      }
    });

    if (minOffset === Infinity) return null;
    return minOffset;
  }

  static calculateVerticalOffset(
    boundingBox: BoundingBox,
    lines: GuideLine[],
    sorbRange: number
  ) {
    const [top, center, bottom] = boundingBox.getVerticalLines();
    let minOffset = Infinity;

    lines.forEach((line) => {
      const t_diff = GuideLineUtil.verticalOffset(line, top);
      const c_diff = GuideLineUtil.verticalOffset(line, center);
      const b_diff = GuideLineUtil.verticalOffset(line, bottom);

      if (abs(t_diff) <= sorbRange && abs(t_diff) < abs(minOffset)) {
        minOffset = t_diff;
      }

      if (abs(c_diff) <= sorbRange && abs(c_diff) < abs(minOffset)) {
        minOffset = c_diff;
      }

      if (abs(b_diff) <= sorbRange && abs(b_diff) < abs(minOffset)) {
        minOffset = b_diff;
      }
    });

    if (minOffset === Infinity) return null;
    return minOffset;
  }

  static mergeHorizontalLines(lines: GuideLine[]) {
    return lines;
  }

  static mergeVerticalLines(lines: GuideLine[]) {
    return lines;
  }
}
