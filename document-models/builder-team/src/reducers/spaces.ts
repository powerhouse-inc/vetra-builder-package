import type { BuilderTeamSpacesOperations } from "../../gen/spaces/operations.js";

export const reducer: BuilderTeamSpacesOperations = {
  addSpaceOperation(state, action, dispatch) {
    const { id } = action.input;
    if (state.spaces.find((space) => space.id === id)) {
      return;
    }
    state.spaces.push({
      id,
      title: "",
      description: "",
      packages: [],
    });
  },
  updateSpaceInfoOperation(state, action, dispatch) {
    const { id, title, description } = action.input;
    const spaceIndex = state.spaces.findIndex((space) => space.id === id);
    if (spaceIndex === -1) {
      return;
    }
    state.spaces[spaceIndex] = {
      ...state.spaces[spaceIndex],
      title: title ?? state.spaces[spaceIndex].title,
      description: description ?? state.spaces[spaceIndex].description,
    };
  },
  removeSpaceOperation(state, action, dispatch) {
    const { id } = action.input;
    const spaceIndex = state.spaces.findIndex((space) => space.id === id);
    if (spaceIndex === -1) {
      return;
    }
    state.spaces.splice(spaceIndex, 1);
  },
};
