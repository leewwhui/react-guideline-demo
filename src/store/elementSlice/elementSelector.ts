import { RootState } from "../store";

export const allShapesSelector = (state: RootState) => {
  return Object.values(state.element.shapes);
};

export const getActiveElementId = (state: RootState) => {
  return state.element.activeId;
}

export const getActiveElement = (state: RootState) => {
  const activeId = state.element.activeId;
  if (!activeId) return null;
  return state.element.shapes[activeId] || null;
}