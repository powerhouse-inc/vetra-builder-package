// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { VetraPackagePHState } from "./ph-factories.js";
import { z } from "./types.js";

import { reducer as MetaReducer } from "../src/reducers/meta.js";

export const stateReducer: StateReducer<VetraPackagePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "SET_PACKAGE_NAME":
      z.SetPackageNameInputSchema().parse(action.input);
      MetaReducer.setPackageNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PACKAGE_DESCRIPTION":
      z.SetPackageDescriptionInputSchema().parse(action.input);
      MetaReducer.setPackageDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PACKAGE_CATEGORY":
      z.SetPackageCategoryInputSchema().parse(action.input);
      MetaReducer.setPackageCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PACKAGE_GITHUB":
      z.SetPackageGithubInputSchema().parse(action.input);
      MetaReducer.setPackageGithubOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PACKAGE_NPM":
      z.SetPackageNpmInputSchema().parse(action.input);
      MetaReducer.setPackageNpmOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_AUTHOR":
      z.SetAuthorInputSchema().parse(action.input);
      MetaReducer.setAuthorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_KEYWORDS":
      z.AddKeywordsInputSchema().parse(action.input);
      MetaReducer.addKeywordsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_KEYWORDS":
      z.RemoveKeywordsInputSchema().parse(action.input);
      MetaReducer.removeKeywordsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<VetraPackagePHState>(stateReducer);
