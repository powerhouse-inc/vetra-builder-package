import { createAction } from "document-model";
import {
  z,
  type AddSpaceInput,
  type UpdateSpaceInfoInput,
  type RemoveSpaceInput,
  type ReorderSpacesInput,
} from "../types.js";
import {
  type AddSpaceAction,
  type UpdateSpaceInfoAction,
  type RemoveSpaceAction,
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

export const updateSpaceInfo = (input: UpdateSpaceInfoInput) =>
  createAction<UpdateSpaceInfoAction>(
    "UPDATE_SPACE_INFO",
    { ...input },
    undefined,
    z.UpdateSpaceInfoInputSchema,
    "global",
  );

export const removeSpace = (input: RemoveSpaceInput) =>
  createAction<RemoveSpaceAction>(
    "REMOVE_SPACE",
    { ...input },
    undefined,
    z.RemoveSpaceInputSchema,
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
