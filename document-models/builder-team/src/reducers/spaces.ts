import type { BuilderTeamSpacesOperations } from "../../gen/spaces/operations.js";
import type { VetraBuilderSpace } from "../../gen/types.js";

// Extended type that includes sortOrder for internal sorting
type SpaceWithSortOrder = VetraBuilderSpace & { sortOrder: number };

export const reducer: BuilderTeamSpacesOperations = {
  addSpaceOperation(state, action, dispatch) {
    const { id } = action.input;
    if (state.spaces.find((space) => space.id === id)) {
      return;
    }
    // Assign sortOrder as the next index
    const sortOrder = state.spaces.length;
    state.spaces.push({
      id,
      title: "",
      description: "",
      packages: [],
      sortOrder,
    } as SpaceWithSortOrder);
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
  reorderSpacesOperation(state, action, dispatch) {
      const { spaceIds, targetIndex } = action.input;

      // Find the spaces to move
      const spacesToMove = state.spaces.filter(space => spaceIds.includes(space.id));
      const remainingSpaces = state.spaces.filter(space => !spaceIds.includes(space.id));

      // Insert the spaces at the target index
      remainingSpaces.splice(targetIndex, 0, ...spacesToMove);
      state.spaces = remainingSpaces;

      // Update sortOrder for all spaces
      state.spaces.forEach((space, index) => {
        (space as SpaceWithSortOrder).sortOrder = index;
      });
  },
};
