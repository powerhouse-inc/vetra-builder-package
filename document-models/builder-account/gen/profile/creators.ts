import { createAction } from "document-model";
import {
  z,
  type SetLogoInput,
  type SetProfileNameInput,
  type SetSlugInput,
  type SetProfileDescriptionInput,
  type UpdateSocialsInput,
} from "../types.js";
import {
  type SetLogoAction,
  type SetProfileNameAction,
  type SetSlugAction,
  type SetProfileDescriptionAction,
  type UpdateSocialsAction,
} from "./actions.js";

export const setLogo = (input: SetLogoInput) =>
  createAction<SetLogoAction>(
    "SET_LOGO",
    { ...input },
    undefined,
    z.SetLogoInputSchema,
    "global",
  );

export const setProfileName = (input: SetProfileNameInput) =>
  createAction<SetProfileNameAction>(
    "SET_PROFILE_NAME",
    { ...input },
    undefined,
    z.SetProfileNameInputSchema,
    "global",
  );

export const setSlug = (input: SetSlugInput) =>
  createAction<SetSlugAction>(
    "SET_SLUG",
    { ...input },
    undefined,
    z.SetSlugInputSchema,
    "global",
  );

export const setProfileDescription = (input: SetProfileDescriptionInput) =>
  createAction<SetProfileDescriptionAction>(
    "SET_PROFILE_DESCRIPTION",
    { ...input },
    undefined,
    z.SetProfileDescriptionInputSchema,
    "global",
  );

export const updateSocials = (input: UpdateSocialsInput) =>
  createAction<UpdateSocialsAction>(
    "UPDATE_SOCIALS",
    { ...input },
    undefined,
    z.UpdateSocialsInputSchema,
    "global",
  );
