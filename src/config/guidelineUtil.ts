import { GuideLine } from "./type";

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
    return Math.abs(line1.start.y - line2.start.y)
  }

  static verticalOffset(line1: GuideLine, line2: GuideLine) {
    return Math.abs(line1.start.x - line2.start.x)
  }

  static mergeHorizontalLines() {}

  static mergeVerticalLines() {}
}
