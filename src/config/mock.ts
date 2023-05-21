import { ElementEnums, ShapeElement } from "./type";
import { v4 as uuidv4 } from 'uuid';

export const rectangle: ShapeElement = {
  type: ElementEnums.RECTANGLE,
  id: uuidv4(),
  position: {
    x: 20,
    y: 20
  },
  rotation: 0,
  width: 100,
  height: 100,
  fill: 'orange'
}

export const trangle: ShapeElement = {
  type: ElementEnums.TRANGLE,
  id: uuidv4(),
  position: {
    x: 150,
    y: 150
  },
  rotation: 0,
  width: 100,
  height: 100,
  fill: "yellowgreen"
}

export const shapes = {
  [rectangle.id]: rectangle,
  [trangle.id]: trangle
}
