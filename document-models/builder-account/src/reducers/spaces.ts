import { generateId } from "document-model";
import type { BuilderAccountSpacesOperations } from "../../gen/spaces/operations.js";

export const reducer: BuilderAccountSpacesOperations = {
  addSpaceOperation(state, action, dispatch) {
    const { title, description } = action.input;
    state.spaces.push({
      id: generateId(),
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
    state.spaces = state.spaces.sort((a, b) => {
      const aIndex = ids.indexOf(a.id);
      const bIndex = ids.indexOf(b.id);
      if (aIndex === -1) {
        return 1;
      }
      if (bIndex === -1) {
        return -1;
      }
      return aIndex - bIndex;
    });
    if (insertAfter) {
      const insertAfterIndex = ids.indexOf(insertAfter);
      if (insertAfterIndex !== -1) {
        state.spaces.splice(
          insertAfterIndex + 1,
          0,
          state.spaces.splice(insertAfterIndex, 1)[0]
        );
      }
    }
  },
};
