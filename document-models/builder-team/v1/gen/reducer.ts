/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { BuilderTeamPHState } from "document-models/builder-team/v1";

import { builderTeamMemberOperations } from "../src/reducers/member.js";
import { builderTeamPackagesOperations } from "../src/reducers/packages.js";
import { builderTeamProfileOperations } from "../src/reducers/profile.js";
import { builderTeamSpacesOperations } from "../src/reducers/spaces.js";

import {
  AddMemberInputSchema,
  AddPackageInputSchema,
  AddSpaceInputSchema,
  RemoveMemberInputSchema,
  RemovePackageInputSchema,
  RemoveSpaceInputSchema,
  ReorderPackagesInputSchema,
  ReorderSpacesInputSchema,
  SetDescriptionInputSchema,
  SetLogoInputSchema,
  SetSlugInputSchema,
  SetSocialsInputSchema,
  SetTeamNameInputSchema,
  UpdateMemberInfoInputSchema,
  UpdatePackageInfoInputSchema,
  UpdateSpaceInfoInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<BuilderTeamPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "SET_LOGO": {
      SetLogoInputSchema().parse(action.input);

      builderTeamProfileOperations.setLogoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_TEAM_NAME": {
      SetTeamNameInputSchema().parse(action.input);

      builderTeamProfileOperations.setTeamNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_SLUG": {
      SetSlugInputSchema().parse(action.input);

      builderTeamProfileOperations.setSlugOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_DESCRIPTION": {
      SetDescriptionInputSchema().parse(action.input);

      builderTeamProfileOperations.setDescriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_SOCIALS": {
      SetSocialsInputSchema().parse(action.input);

      builderTeamProfileOperations.setSocialsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_MEMBER": {
      AddMemberInputSchema().parse(action.input);

      builderTeamMemberOperations.addMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_MEMBER_INFO": {
      UpdateMemberInfoInputSchema().parse(action.input);

      builderTeamMemberOperations.updateMemberInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_MEMBER": {
      RemoveMemberInputSchema().parse(action.input);

      builderTeamMemberOperations.removeMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SPACE": {
      AddSpaceInputSchema().parse(action.input);

      builderTeamSpacesOperations.addSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SPACE_INFO": {
      UpdateSpaceInfoInputSchema().parse(action.input);

      builderTeamSpacesOperations.updateSpaceInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SPACE": {
      RemoveSpaceInputSchema().parse(action.input);

      builderTeamSpacesOperations.removeSpaceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_SPACES": {
      ReorderSpacesInputSchema().parse(action.input);

      builderTeamSpacesOperations.reorderSpacesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_PACKAGE": {
      AddPackageInputSchema().parse(action.input);

      builderTeamPackagesOperations.addPackageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_PACKAGE_INFO": {
      UpdatePackageInfoInputSchema().parse(action.input);

      builderTeamPackagesOperations.updatePackageInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_PACKAGE": {
      RemovePackageInputSchema().parse(action.input);

      builderTeamPackagesOperations.removePackageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REORDER_PACKAGES": {
      ReorderPackagesInputSchema().parse(action.input);

      builderTeamPackagesOperations.reorderPackagesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer: Reducer<BuilderTeamPHState> = createReducer(stateReducer);
