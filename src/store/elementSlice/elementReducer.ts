import { PayloadAction } from "@reduxjs/toolkit";
import { ElementState } from "./elementSlice";
import { ShapeElement, ShapeElementProps, positionType } from "../../config/type";

export const addShapeAction = (
  state: ElementState,
  action: PayloadAction<ShapeElement>
) => {
  const shape = action.payload;
  state.shapes[shape.id] = shape;
};

export const updateShapePropsAction = (
  state: ElementState,
  action: PayloadAction<{ id: string; props: ShapeElementProps }>
) => {
  const { props, id } = action.payload;
  state.shapes[id] = {
    ...state.shapes[id],
    ...props,
  };
};

export const updatePositionAction = (
  state: ElementState,
  action: PayloadAction<{ id: string; position: positionType }>
) => {
  const {position, id } = action.payload;
  state.shapes[id].position = position;
};

export const setActiveElementIdAction = (
  state: ElementState,
  action: PayloadAction<string | null>
) => {
  state.activeId = action.payload;
};
