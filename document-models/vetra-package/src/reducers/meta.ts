import { generateId } from "document-model";
import type { VetraPackageMetaOperations } from "../../gen/meta/operations.js";

export const reducer: VetraPackageMetaOperations = {
  setPackageNameOperation(state, action, dispatch) {
    state.name = action.input.name;
  },
  setPackageDescriptionOperation(state, action, dispatch) {
    state.description = action.input.description;
  },
  setPackageCategoryOperation(state, action, dispatch) {
    state.category = action.input.category;
  },
  setPackageGithubOperation(state, action, dispatch) {
    state.github = action.input.github;
  },
  setPackageNpmOperation(state, action, dispatch) {
    state.npm = action.input.npm;
  },
  setAuthorOperation(state, action, dispatch) {
    const { name, website } = action.input;
    if (name) {
      state.author.name = name;
    }
    if (website) {
      state.author.website = website;
    }
  },
  addKeywordsOperation(state, action, dispatch) {
    let { id } = action.input;
    const { label } = action.input;
    if (!id) {
      id = generateId();
    }
    if (id && label && !state.keywords.find((keyword) => keyword.id === id)) {
      state.keywords.push({ id, label });
    }
  },
  removeKeywordsOperation(state, action, dispatch) {
    const { id } = action.input;
    state.keywords = state.keywords.filter((keyword) => keyword.id !== id);
  },
};
