import { createAction } from "document-model/core";
import {
  AddSpaceInputSchema,
  DeleteSpaceInputSchema,
  SetSpaceTitleInputSchema,
  SetSpaceDescriptionInputSchema,
  ReorderSpacesInputSchema,
} from "../schema/zod.js";
import type {
  AddSpaceInput,
  DeleteSpaceInput,
  SetSpaceTitleInput,
  SetSpaceDescriptionInput,
  ReorderSpacesInput,
} from "../types.js";
import type {
  AddSpaceAction,
  DeleteSpaceAction,
  SetSpaceTitleAction,
  SetSpaceDescriptionAction,
  ReorderSpacesAction,
} from "./actions.js";

export const addSpace = (input: AddSpaceInput) =>
  createAction<AddSpaceAction>(
    "ADD_SPACE",
    { ...input },
    undefined,
    AddSpaceInputSchema,
    "global",
  );

export const deleteSpace = (input: DeleteSpaceInput) =>
  createAction<DeleteSpaceAction>(
    "DELETE_SPACE",
    { ...input },
    undefined,
    DeleteSpaceInputSchema,
    "global",
  );

export const setSpaceTitle = (input: SetSpaceTitleInput) =>
  createAction<SetSpaceTitleAction>(
    "SET_SPACE_TITLE",
    { ...input },
    undefined,
    SetSpaceTitleInputSchema,
    "global",
  );

export const setSpaceDescription = (input: SetSpaceDescriptionInput) =>
  createAction<SetSpaceDescriptionAction>(
    "SET_SPACE_DESCRIPTION",
    { ...input },
    undefined,
    SetSpaceDescriptionInputSchema,
    "global",
  );

export const reorderSpaces = (input: ReorderSpacesInput) =>
  createAction<ReorderSpacesAction>(
    "REORDER_SPACES",
    { ...input },
    undefined,
    ReorderSpacesInputSchema,
    "global",
  );
