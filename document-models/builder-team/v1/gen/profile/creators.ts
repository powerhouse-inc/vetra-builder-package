/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  SetDescriptionInputSchema,
  SetLogoInputSchema,
  SetSlugInputSchema,
  SetSocialsInputSchema,
  SetTeamNameInputSchema,
} from "../schema/zod.js";
import type {
  SetDescriptionInput,
  SetLogoInput,
  SetSlugInput,
  SetSocialsInput,
  SetTeamNameInput,
} from "../types.js";
import type {
  SetDescriptionAction,
  SetLogoAction,
  SetSlugAction,
  SetSocialsAction,
  SetTeamNameAction,
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
