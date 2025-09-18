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
import { reducer as PackagesReducer } from "../src/reducers/packages.js";

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

    case "UPDATE_SOCIALS":
      z.UpdateSocialsInputSchema().parse(action.input);
      ProfileReducer.updateSocialsOperation(
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

    case "DELETE_SPACE":
      z.DeleteSpaceInputSchema().parse(action.input);
      SpacesReducer.deleteSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_SPACE_TITLE":
      z.SetSpaceTitleInputSchema().parse(action.input);
      SpacesReducer.setSpaceTitleOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_SPACE_DESCRIPTION":
      z.SetSpaceDescriptionInputSchema().parse(action.input);
      SpacesReducer.setSpaceDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REORDER_SPACES":
      z.ReorderSpacesInputSchema().parse(action.input);
      SpacesReducer.reorderSpacesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_PACKAGE":
      z.AddPackageInputSchema().parse(action.input);
      PackagesReducer.addPackageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PACKAGE_DRIVE_ID":
      z.SetPackageDriveIdInputSchema().parse(action.input);
      PackagesReducer.setPackageDriveIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_PACKAGE":
      z.UpdatePackageInputSchema().parse(action.input);
      PackagesReducer.updatePackageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REORDER_PACKAGES":
      z.ReorderPackagesInputSchema().parse(action.input);
      PackagesReducer.reorderPackagesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_PACKAGE":
      z.DeletePackageInputSchema().parse(action.input);
      PackagesReducer.deletePackageOperation(
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
