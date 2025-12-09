// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { BuilderAccountPHState } from "@powerhousedao/vetra-builder-package/document-models/builder-account";

import { builderAccountProfileOperations } from "../src/reducers/profile.js";
import { builderAccountMembersOperations } from "../src/reducers/members.js";
import { builderAccountSpacesOperations } from "../src/reducers/spaces.js";
import { builderAccountPackagesOperations } from "../src/reducers/packages.js";

import {
  SetLogoInputSchema,
  SetProfileNameInputSchema,
  SetSlugInputSchema,
  SetProfileDescriptionInputSchema,
  UpdateSocialsInputSchema,
  AddMemberInputSchema,
  RemoveMemberInputSchema,
  AddSpaceInputSchema,
  DeleteSpaceInputSchema,
  SetSpaceTitleInputSchema,
  SetSpaceDescriptionInputSchema,
  ReorderSpacesInputSchema,
  AddPackageInputSchema,
  SetPackageDriveIdInputSchema,
  UpdatePackageInputSchema,
  ReorderPackagesInputSchema,
  DeletePackageInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<BuilderAccountPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "SET_LOGO":
      SetLogoInputSchema().parse(action.input);
      builderAccountProfileOperations.setLogoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PROFILE_NAME":
      SetProfileNameInputSchema().parse(action.input);
      builderAccountProfileOperations.setProfileNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_SLUG":
      SetSlugInputSchema().parse(action.input);
      builderAccountProfileOperations.setSlugOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PROFILE_DESCRIPTION":
      SetProfileDescriptionInputSchema().parse(action.input);
      builderAccountProfileOperations.setProfileDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_SOCIALS":
      UpdateSocialsInputSchema().parse(action.input);
      builderAccountProfileOperations.updateSocialsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_MEMBER":
      AddMemberInputSchema().parse(action.input);
      builderAccountMembersOperations.addMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_MEMBER":
      RemoveMemberInputSchema().parse(action.input);
      builderAccountMembersOperations.removeMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_SPACE":
      AddSpaceInputSchema().parse(action.input);
      builderAccountSpacesOperations.addSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_SPACE":
      DeleteSpaceInputSchema().parse(action.input);
      builderAccountSpacesOperations.deleteSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_SPACE_TITLE":
      SetSpaceTitleInputSchema().parse(action.input);
      builderAccountSpacesOperations.setSpaceTitleOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_SPACE_DESCRIPTION":
      SetSpaceDescriptionInputSchema().parse(action.input);
      builderAccountSpacesOperations.setSpaceDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REORDER_SPACES":
      ReorderSpacesInputSchema().parse(action.input);
      builderAccountSpacesOperations.reorderSpacesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_PACKAGE":
      AddPackageInputSchema().parse(action.input);
      builderAccountPackagesOperations.addPackageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_PACKAGE_DRIVE_ID":
      SetPackageDriveIdInputSchema().parse(action.input);
      builderAccountPackagesOperations.setPackageDriveIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_PACKAGE":
      UpdatePackageInputSchema().parse(action.input);
      builderAccountPackagesOperations.updatePackageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REORDER_PACKAGES":
      ReorderPackagesInputSchema().parse(action.input);
      builderAccountPackagesOperations.reorderPackagesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_PACKAGE":
      DeletePackageInputSchema().parse(action.input);
      builderAccountPackagesOperations.deletePackageOperation(
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
