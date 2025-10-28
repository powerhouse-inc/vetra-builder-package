// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { BuilderTeamPHState } from "./ph-factories.js";
import { z } from "./types.js";

import { reducer as ProfileReducer } from "../src/reducers/profile.js";
import { reducer as MemberReducer } from "../src/reducers/member.js";
import { reducer as SpacesReducer } from "../src/reducers/spaces.js";
import { reducer as PackagesReducer } from "../src/reducers/packages.js";

export const stateReducer: StateReducer<BuilderTeamPHState> = (
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

    case "SET_TEAM_NAME":
      z.SetTeamNameInputSchema().parse(action.input);
      ProfileReducer.setTeamNameOperation(
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

    case "SET_DESCRIPTION":
      z.SetDescriptionInputSchema().parse(action.input);
      ProfileReducer.setDescriptionOperation(
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
      MemberReducer.addMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_MEMBER_INFO":
      z.UpdateMemberInfoInputSchema().parse(action.input);
      MemberReducer.updateMemberInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_MEMBER":
      z.RemoveMemberInputSchema().parse(action.input);
      MemberReducer.removeMemberOperation(
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

    case "UPDATE_SPACE_INFO":
      z.UpdateSpaceInfoInputSchema().parse(action.input);
      SpacesReducer.updateSpaceInfoOperation(
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

    case "UPDATE_PACKAGE_INFO":
      z.UpdatePackageInfoInputSchema().parse(action.input);
      PackagesReducer.updatePackageInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_PACKAGE":
      z.RemovePackageInputSchema().parse(action.input);
      PackagesReducer.removePackageOperation(
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

    default:
      return state;
  }
};

export const reducer = createReducer<BuilderTeamPHState>(stateReducer);
