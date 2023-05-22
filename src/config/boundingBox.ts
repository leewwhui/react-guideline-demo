import { GuideLineUtil } from "./guidelineUtil";
import { GuideLine, ShapeElement } from "./type";

export class BoundingBox {
  private _left: number;
  private _top: number;
  private _width: number;
  private _height: number;

  constructor(left: number, top: number, width: number, height: number) {
    this._left = left;
    this._top = top;
    this._width = width;
    this._height = height;
  }

  static createBoundingBox(element: ShapeElement) {
    const { position, width, height } = element;
    return new BoundingBox(position.x, position.y, width, height);
  }

  private calcElementRotate() {}

  getHorizontalLines(): GuideLine[] {
    const x = this.left;
    const endX = this.left + this.width;
    const centerY = this.top + this.height / 2;
    const endY = this.top + this.height;

    return [
      GuideLineUtil.createGuideLine(x, this.top, endX, this.top),
      GuideLineUtil.createGuideLine(x, centerY, endX, centerY),
      GuideLineUtil.createGuideLine(x, endY, endX, endY),
    ];
  }

  getVerticalLines(): GuideLine[] {
    const y = this.top;
    const endY = this.top + this.height;
    const centerX = this.left + this.width / 2;
    const endX = this.left + this.width;
    return [
      GuideLineUtil.createGuideLine(this.left, y, this.left, endY),
      GuideLineUtil.createGuideLine(centerX, y, centerX, endY),
      GuideLineUtil.createGuideLine(endX, y, endX, endY),
    ];
  }

  getRelativeHorizontalLine(line: GuideLine, range: number): GuideLine[] {
    const selfs = this.getHorizontalLines();
    const results: GuideLine[] = [];
    for (let i = 0; i < selfs.length; i++) {
      const self = selfs[i];
      const startY = self.start.y;

      if (GuideLineUtil.horizontalOffset(self, line) <= range) {
        const startX = Math.min(line.start.x, self.start.x);
        const endX = Math.max(line.end.x, self.end.x);
        results.push(
          GuideLineUtil.createGuideLine(startX, startY, endX, startY)
        );
      }
    }
    return results;
  }

  getRelativeVerticalLine(line: GuideLine, range: number): GuideLine[] {
    const selfs = this.getVerticalLines();
    const results: GuideLine[] = [];

    for (let i = 0; i < selfs.length; i++) {
      const self = selfs[i];
      const startX = self.start.x;

      if (GuideLineUtil.verticalOffset(self, line) <= range) {
        const startY = Math.min(self.start.y, line.start.y);
        const endY = Math.max(self.end.y, line.end.y);
        results.push(
          GuideLineUtil.createGuideLine(startX, startY, startX, endY)
        );
      }
    }
    return results;
  }

  get left() {
    return this._left;
  }

  get top() {
    return this._top;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }
}
