import { createSlice } from "@reduxjs/toolkit";
import { ShapeElement } from "../../config/type";
import {
  addShapeAction,
  setActiveElementIdAction,
  updateShapePropsAction,
} from "./elementReducer";
import { cloneDeep } from "lodash";
import { shapes } from "../../config/mock";

export interface ElementState {
  shapes: { [x: string]: ShapeElement };
  activeId: string | null;
}
const initialState: ElementState = {
  shapes: cloneDeep(shapes),
  activeId: null,
};

export const elementSlice = createSlice({
  name: "element",
  initialState,
  reducers: {
    addShape: addShapeAction,
    updateShapeProps: updateShapePropsAction,
    setActiveElementId: setActiveElementIdAction,
  },
});

// Action creators are generated for each case reducer function
export const { addShape, updateShapeProps, setActiveElementId } =
  elementSlice.actions;

export default elementSlice.reducer;
