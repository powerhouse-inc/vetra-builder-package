import { createAction } from "document-model/core";
import {
  SetLogoInputSchema,
  SetTeamNameInputSchema,
  SetSlugInputSchema,
  SetDescriptionInputSchema,
  SetSocialsInputSchema,
} from "../schema/zod.js";
import type {
  SetLogoInput,
  SetTeamNameInput,
  SetSlugInput,
  SetDescriptionInput,
  SetSocialsInput,
} from "../types.js";
import type {
  SetLogoAction,
  SetTeamNameAction,
  SetSlugAction,
  SetDescriptionAction,
  SetSocialsAction,
} from "./actions.js";

export const setLogo = (input: SetLogoInput) =>
  createAction<SetLogoAction>(
    "SET_LOGO",
    { ...input },
    undefined,
    SetLogoInputSchema,
    "global",
  );

export const setTeamName = (input: SetTeamNameInput) =>
  createAction<SetTeamNameAction>(
    "SET_TEAM_NAME",
    { ...input },
    undefined,
    SetTeamNameInputSchema,
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

export const setDescription = (input: SetDescriptionInput) =>
  createAction<SetDescriptionAction>(
    "SET_DESCRIPTION",
    { ...input },
    undefined,
    SetDescriptionInputSchema,
    "global",
  );

export const setSocials = (input: SetSocialsInput) =>
  createAction<SetSocialsAction>(
    "SET_SOCIALS",
    { ...input },
    undefined,
    SetSocialsInputSchema,
    "global",
  );
