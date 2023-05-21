import { PayloadAction } from "@reduxjs/toolkit";
import { ElementState } from "./elementSlice";
import { ShapeElement, ShapeElementProps } from "../../config/type";

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

export const setActiveElementIdAction = (
  state: ElementState,
  action: PayloadAction<string>
) => {
  state.activeId = action.payload;
};
