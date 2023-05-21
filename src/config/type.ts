export type positionType = { x: number; y: number };

export enum ElementEnums {
  TRANGLE = 'trangle',
  RECTANGLE = 'rectangle'
}

export interface ShapeElementProps {
  position: positionType;
  rotation: number;
  width: number;
  height: number;
  fill: string;
}

export interface ShapeElement extends ShapeElementProps {
  type: ElementEnums;
  id: string;
}

export interface BoundingBoxProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface GuideLine {
  start: positionType;
  end: positionType;
}
