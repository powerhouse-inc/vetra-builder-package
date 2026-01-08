import type { VetraBuilderSpace } from "../../gen/types.js";
import type { BuilderTeamSpacesOperations } from "@powerhousedao/vetra-builder-package/document-models/builder-team";

// Extended type that includes sortOrder for internal sorting
type SpaceWithSortOrder = VetraBuilderSpace & { sortOrder: number };

export const builderTeamSpacesOperations: BuilderTeamSpacesOperations = {
  addSpaceOperation(state, action) {
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
  updateSpaceInfoOperation(state, action) {
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
  removeSpaceOperation(state, action) {
    const { id } = action.input;
    const spaceIndex = state.spaces.findIndex((space) => space.id === id);
    if (spaceIndex === -1) {
      return;
    }
    state.spaces.splice(spaceIndex, 1);
  },
  reorderSpacesOperation(state, action) {
    const { spaceIds, targetIndex } = action.input;

    // Find the spaces to move
    const spacesToMove = state.spaces.filter((space) =>
      spaceIds.includes(space.id),
    );
    const remainingSpaces = state.spaces.filter(
      (space) => !spaceIds.includes(space.id),
    );

    // Insert the spaces at the target index
    remainingSpaces.splice(targetIndex, 0, ...spacesToMove);
    state.spaces = remainingSpaces;
  },
};
