export type positionType = { x: number; y: number };

export enum ElementEnums {
  TRANGLE = 'trangle',
  RECTANGLE = 'rectangle'
}

export enum GuideLineType {
HORIZONTAL_TOP = 'horizontal-top',
HORIZONTAL_CENTER = 'horizontal-center',
HORIZONTAL_BOTTOM = 'horizontal-bottom',

VERTICAL_TOP = 'vertical-top',
VERTICAL_CENTER = 'vertical-center',
VERTICAL_BOTTOM = 'vertical-bottom',
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
  type: GuideLineType
  start: positionType;
  end: positionType;
}

export interface SorbData {
  offset: [number, number];
  position: positionType;
  sorbRange: number;
  isXAxisSorbed: boolean;
  isYAxisSorbed: boolean;
  sorbedElement: ShapeElement;
}