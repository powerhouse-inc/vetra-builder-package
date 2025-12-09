import { createAction } from "document-model/core";
import {
  SetLogoInputSchema,
  SetProfileNameInputSchema,
  SetSlugInputSchema,
  SetProfileDescriptionInputSchema,
  UpdateSocialsInputSchema,
} from "../schema/zod.js";
import type {
  SetLogoInput,
  SetProfileNameInput,
  SetSlugInput,
  SetProfileDescriptionInput,
  UpdateSocialsInput,
} from "../types.js";
import type {
  SetLogoAction,
  SetProfileNameAction,
  SetSlugAction,
  SetProfileDescriptionAction,
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
