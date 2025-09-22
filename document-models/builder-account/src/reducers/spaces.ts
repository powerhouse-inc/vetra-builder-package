import { toPascalCase } from "document-drive/utils/misc";
import type { BuilderAccountSpacesOperations } from "../../gen/spaces/operations.js";

export const reducer: BuilderAccountSpacesOperations = {
  addSpaceOperation(state, action, dispatch) {
    const { title, description } = action.input;
    state.spaces.push({
      id: toPascalCase(title),
      title: title ?? "",
      description: description ?? "",
      packages: [],
    });
  },
  deleteSpaceOperation(state, action, dispatch) {
    const { id } = action.input;
    state.spaces = state.spaces.filter((space) => space.id !== id);
  },
  setSpaceTitleOperation(state, action, dispatch) {
    const { id, newTitle } = action.input;
    state.spaces.find((space) => space.id === id)!.title =
      newTitle ?? state.spaces.find((space) => space.id === id)!.title;
  },
  setSpaceDescriptionOperation(state, action, dispatch) {
    const { id, description } = action.input;
    state.spaces.find((space) => space.id === id)!.description =
      description ?? state.spaces.find((space) => space.id === id)!.description;
  },
  reorderSpacesOperation(state, action, dispatch) {
    const { ids, insertAfter } = action.input;

    // Remove the spaces being reordered from their current positions
    const reorderedSpaces = state.spaces.filter((space) =>
      ids.includes(space.id)
    );
    const remainingSpaces = state.spaces.filter(
      (space) => !ids.includes(space.id)
    );

    if (insertAfter) {
      // Find the insertAfter space index in remaining spaces
      const insertAfterIndex = remainingSpaces.findIndex(
        (space) => space.id === insertAfter
      );

      if (insertAfterIndex !== -1) {
        // Insert the reordered spaces after the insertAfter space
        state.spaces = [
          ...remainingSpaces.slice(0, insertAfterIndex + 1),
          ...reorderedSpaces,
          ...remainingSpaces.slice(insertAfterIndex + 1),
        ];
      } else {
        // If insertAfter space not found, just append to the end
        state.spaces = [...reorderedSpaces, ...remainingSpaces];
      }
    } else {
      // No insertAfter specified, just append to the end
      state.spaces = [...reorderedSpaces, ...remainingSpaces];
    }
  },
};
