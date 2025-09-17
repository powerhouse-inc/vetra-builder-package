import { createAction } from "document-model";
import {
  z,
  type AddSpaceInput,
  type RemoveSpaceInput,
  type AddPackageToSpaceInput,
  type RemovePackageFromSpaceInput,
} from "../types.js";
import {
  type AddSpaceAction,
  type RemoveSpaceAction,
  type AddPackageToSpaceAction,
  type RemovePackageFromSpaceAction,
} from "./actions.js";

export const addSpace = (input: AddSpaceInput) =>
  createAction<AddSpaceAction>(
    "ADD_SPACE",
    { ...input },
    undefined,
    z.AddSpaceInputSchema,
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

export const addPackageToSpace = (input: AddPackageToSpaceInput) =>
  createAction<AddPackageToSpaceAction>(
    "ADD_PACKAGE_TO_SPACE",
    { ...input },
    undefined,
    z.AddPackageToSpaceInputSchema,
    "global",
  );

export const removePackageFromSpace = (input: RemovePackageFromSpaceInput) =>
  createAction<RemovePackageFromSpaceAction>(
    "REMOVE_PACKAGE_FROM_SPACE",
    { ...input },
    undefined,
    z.RemovePackageFromSpaceInputSchema,
    "global",
  );
