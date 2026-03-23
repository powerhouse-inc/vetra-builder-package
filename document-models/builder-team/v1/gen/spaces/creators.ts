import { createAction } from "document-model/core";
import {
  AddSpaceInputSchema,
  UpdateSpaceInfoInputSchema,
  RemoveSpaceInputSchema,
  ReorderSpacesInputSchema,
} from "../schema/zod.js";
import type {
  AddSpaceInput,
  UpdateSpaceInfoInput,
  RemoveSpaceInput,
  ReorderSpacesInput,
} from "../types.js";
import type {
  AddSpaceAction,
  UpdateSpaceInfoAction,
  RemoveSpaceAction,
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

export const updateSpaceInfo = (input: UpdateSpaceInfoInput) =>
  createAction<UpdateSpaceInfoAction>(
    "UPDATE_SPACE_INFO",
    { ...input },
    undefined,
    UpdateSpaceInfoInputSchema,
    "global",
  );

export const removeSpace = (input: RemoveSpaceInput) =>
  createAction<RemoveSpaceAction>(
    "REMOVE_SPACE",
    { ...input },
    undefined,
    RemoveSpaceInputSchema,
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
