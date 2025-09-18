import { createAction } from "document-model";
import {
  z,
  type AddSpaceInput,
  type DeleteSpaceInput,
  type SetSpaceTitleInput,
  type SetSpaceDescriptionInput,
  type ReorderSpacesInput,
} from "../types.js";
import {
  type AddSpaceAction,
  type DeleteSpaceAction,
  type SetSpaceTitleAction,
  type SetSpaceDescriptionAction,
  type ReorderSpacesAction,
} from "./actions.js";

export const addSpace = (input: AddSpaceInput) =>
  createAction<AddSpaceAction>(
    "ADD_SPACE",
    { ...input },
    undefined,
    z.AddSpaceInputSchema,
    "global",
  );

export const deleteSpace = (input: DeleteSpaceInput) =>
  createAction<DeleteSpaceAction>(
    "DELETE_SPACE",
    { ...input },
    undefined,
    z.DeleteSpaceInputSchema,
    "global",
  );

export const setSpaceTitle = (input: SetSpaceTitleInput) =>
  createAction<SetSpaceTitleAction>(
    "SET_SPACE_TITLE",
    { ...input },
    undefined,
    z.SetSpaceTitleInputSchema,
    "global",
  );

export const setSpaceDescription = (input: SetSpaceDescriptionInput) =>
  createAction<SetSpaceDescriptionAction>(
    "SET_SPACE_DESCRIPTION",
    { ...input },
    undefined,
    z.SetSpaceDescriptionInputSchema,
    "global",
  );

export const reorderSpaces = (input: ReorderSpacesInput) =>
  createAction<ReorderSpacesAction>(
    "REORDER_SPACES",
    { ...input },
    undefined,
    z.ReorderSpacesInputSchema,
    "global",
  );
