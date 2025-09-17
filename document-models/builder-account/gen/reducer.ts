// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { BuilderAccountPHState } from "./ph-factories.js";
import { z } from "./types.js";

import { reducer as ProfileReducer } from "../src/reducers/profile.js";
import { reducer as MembersReducer } from "../src/reducers/members.js";
import { reducer as SpacesReducer } from "../src/reducers/spaces.js";

export const stateReducer: StateReducer<BuilderAccountPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "SET_LOGO":
      z.SetLogoInputSchema().parse(action.input);
      ProfileReducer.setLogoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PROFILE_NAME":
      z.SetProfileNameInputSchema().parse(action.input);
      ProfileReducer.setProfileNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_SLUG":
      z.SetSlugInputSchema().parse(action.input);
      ProfileReducer.setSlugOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PROFILE_DESCRIPTION":
      z.SetProfileDescriptionInputSchema().parse(action.input);
      ProfileReducer.setProfileDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_SOCIALS":
      z.SetSocialsInputSchema().parse(action.input);
      ProfileReducer.setSocialsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_MEMBER":
      z.AddMemberInputSchema().parse(action.input);
      MembersReducer.addMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_MEMBER":
      z.RemoveMemberInputSchema().parse(action.input);
      MembersReducer.removeMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_SPACE":
      z.AddSpaceInputSchema().parse(action.input);
      SpacesReducer.addSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_SPACE":
      z.RemoveSpaceInputSchema().parse(action.input);
      SpacesReducer.removeSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_PACKAGE_TO_SPACE":
      z.AddPackageToSpaceInputSchema().parse(action.input);
      SpacesReducer.addPackageToSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_PACKAGE_FROM_SPACE":
      z.RemovePackageFromSpaceInputSchema().parse(action.input);
      SpacesReducer.removePackageFromSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<BuilderAccountPHState>(stateReducer);
