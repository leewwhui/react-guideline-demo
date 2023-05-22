import { BoundingBox } from "./boundingBox";
import { GuideLine } from "./type";

const abs = Math.abs;

export class GuideLineUtil {
  static createGuideLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): GuideLine {
    return {
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
      const topOffset = GuideLineUtil.horizontalOffset(line, top);
      const centerOffset = GuideLineUtil.horizontalOffset(line, center);
      const bottomOffset = GuideLineUtil.horizontalOffset(line, bottom);

      if (abs(topOffset) <= sorbRange && abs(topOffset) < abs(minOffset)) {
        minOffset = topOffset;
      }

      if (
        abs(centerOffset) <= sorbRange &&
        abs(centerOffset) < abs(minOffset)
      ) {
        minOffset = centerOffset;
      }

      if (
        abs(bottomOffset) <= sorbRange &&
        abs(bottomOffset) < abs(minOffset)
      ) {
        minOffset = bottomOffset;
      }
    });

    if (minOffset === Infinity) return 0;
    return minOffset;
  }

  static calculateVerticalOffset(
    boundingBox: BoundingBox,
    lines: GuideLine[],
    sorbRange: number
  ) {
    return 0;
  }

  static mergeHorizontalLines(lines: GuideLine[]) {
    return lines;
  }

  static mergeVerticalLines(lines: GuideLine[]) {
    return lines;
  }
}
