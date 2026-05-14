import type { BuilderAccountSpacesOperations } from "document-models/builder-account/v1";
import { SpaceNotFound } from "../../gen/spaces/error.js";

export const builderAccountSpacesOperations: BuilderAccountSpacesOperations = {
  addSpaceOperation(state, action) {
    const { id, title, description } = action.input;
    if (state.spaces.find((space) => space.id === id)) {
      return;
    }
    state.spaces.push({
      id,
      title,
      description: description ?? null,
      packages: [],
    });
  },
  deleteSpaceOperation(state, action) {
    const { id } = action.input;
    const spaceIndex = state.spaces.findIndex((space) => space.id === id);
    if (spaceIndex === -1) {
      throw new SpaceNotFound(`Space with id "${id}" not found`);
    }
    state.spaces.splice(spaceIndex, 1);
  },
  setSpaceTitleOperation(state, action) {
    const { id, newTitle } = action.input;
    const space = state.spaces.find((s) => s.id === id);
    if (!space) {
      return;
    }
    space.title = newTitle;
  },
  setSpaceDescriptionOperation(state, action) {
    const { id, description } = action.input;
    const space = state.spaces.find((s) => s.id === id);
    if (!space) {
      return;
    }
    space.description = description;
  },
  reorderSpacesOperation(state, action) {
    const { ids, insertAfter } = action.input;

    const spacesToMove = state.spaces.filter((space) => ids.includes(space.id));
    const remaining = state.spaces.filter((space) => !ids.includes(space.id));

    let insertIndex = 0;
    if (insertAfter) {
      const anchorIndex = remaining.findIndex((s) => s.id === insertAfter);
      insertIndex = anchorIndex === -1 ? remaining.length : anchorIndex + 1;
    }

    remaining.splice(insertIndex, 0, ...spacesToMove);
    state.spaces = remaining;
  },
};
