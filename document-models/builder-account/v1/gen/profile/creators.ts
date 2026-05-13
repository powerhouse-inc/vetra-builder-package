/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  SetLogoInputSchema,
  SetProfileDescriptionInputSchema,
  SetProfileNameInputSchema,
  SetSlugInputSchema,
  UpdateSocialsInputSchema,
} from "../schema/zod.js";
import type {
  SetLogoInput,
  SetProfileDescriptionInput,
  SetProfileNameInput,
  SetSlugInput,
  UpdateSocialsInput,
} from "../types.js";
import type {
  SetLogoAction,
  SetProfileDescriptionAction,
  SetProfileNameAction,
  SetSlugAction,
  UpdateSocialsAction,
} from "./actions.js";

export const setLogo = (input: SetLogoInput) =>
  createAction<SetLogoAction>(
    "SET_LOGO",
    { ...input },
    undefined,
    SetLogoInputSchema,
    "global",
  );

export const setProfileName = (input: SetProfileNameInput) =>
  createAction<SetProfileNameAction>(
    "SET_PROFILE_NAME",
    { ...input },
    undefined,
    SetProfileNameInputSchema,
    "global",
  );

export const setSlug = (input: SetSlugInput) =>
  createAction<SetSlugAction>(
    "SET_SLUG",
    { ...input },
    undefined,
    SetSlugInputSchema,
    "global",
  );

export const setProfileDescription = (input: SetProfileDescriptionInput) =>
  createAction<SetProfileDescriptionAction>(
    "SET_PROFILE_DESCRIPTION",
    { ...input },
    undefined,
    SetProfileDescriptionInputSchema,
    "global",
  );

export const updateSocials = (input: UpdateSocialsInput) =>
  createAction<UpdateSocialsAction>(
    "UPDATE_SOCIALS",
    { ...input },
    undefined,
    UpdateSocialsInputSchema,
    "global",
  );
