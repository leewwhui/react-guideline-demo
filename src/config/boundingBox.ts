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

  getHorizontalLines() {
    const x = this.left;
    const endX = this.left + this.width;
    const centerY = this.top + this.height / 2;
    const endY = this.top + this.height;

    return [
      { start: { x, y: this.top }, end: { x: endX, y: this.top } },
      { start: { x, y: centerY }, end: { x: endX, y: centerY } },
      { start: { x, y: endY }, end: { x: endX, y: endY } },
    ];
  }

  getVerticalLines() {
    const y = this.top;
    const endY = this.top + this.height;
    const centerX = this.left + this.width / 2;
    const endX = this.left + this.width;
    return [
      { start: { x: this.left, y }, end: { x: this.left, y: endY } },
      { start: { x: centerX, y }, end: { x: centerX, y: endY } },
      { start: { x: endX, y }, end: { x: endX, y: endY } },
    ];
  }

  getRelativeHorizontalLine(line: GuideLine, range: number): GuideLine[] {
    const selfs = this.getHorizontalLines();
    const results: GuideLine[] = [];
    for (let i = 0; i < selfs.length; i++) {
      const self = selfs[i];
      if (Math.abs(self.start.y - line.start.y) === 0) {
        const startX = Math.min(
          line.start.x,
          line.end.x,
          self.start.x,
          self.end.x
        );
        const endX = Math.max(
          line.start.x,
          line.end.x,
          self.start.x,
          self.end.x
        );
        results.push({
          start: { x: startX, y: self.start.y },
          end: { x: endX, y: self.start.y },
        });
      }
    }
    return results;
  }

  getRelativeVerticalLine(line: GuideLine, range: number): GuideLine[] {
    const selfs = this.getVerticalLines();
    const results: GuideLine[] = [];

    for (let i = 0; i < selfs.length; i++) {
      const self = selfs[i];
      if (Math.abs(self.start.x - line.start.x) <= 0) {
        const startY = Math.min(
          self.start.y,
          self.end.y,
          line.start.y,
          line.end.y
        );
        const endY = Math.max(
          self.start.y,
          self.end.y,
          line.start.y,
          line.end.y
        );
        results.push({
          start: { x: self.start.x, y: startY },
          end: { x: self.start.x, y: endY },
        });
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
