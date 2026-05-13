import type { BuilderTeamSpacesOperations } from "document-models/builder-team/v1";

export const builderTeamSpacesOperations: BuilderTeamSpacesOperations = {
  addSpaceOperation(state, action) {
    // TODO: implement addSpaceOperation reducer
    throw new Error("Reducer for 'addSpaceOperation' not implemented.");
  },
  updateSpaceInfoOperation(state, action) {
    // TODO: implement updateSpaceInfoOperation reducer
    throw new Error("Reducer for 'updateSpaceInfoOperation' not implemented.");
  },
  removeSpaceOperation(state, action) {
    // TODO: implement removeSpaceOperation reducer
    throw new Error("Reducer for 'removeSpaceOperation' not implemented.");
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
