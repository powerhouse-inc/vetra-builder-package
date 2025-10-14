import { createAction } from "document-model";
import {
  z,
  type AddPackageInput,
  type UpdatePackageInfoInput,
  type RemovePackageInput,
  type ReorderPackagesInput,
} from "../types.js";
import {
  type AddPackageAction,
  type UpdatePackageInfoAction,
  type RemovePackageAction,
  type ReorderPackagesAction,
} from "./actions.js";

export const addPackage = (input: AddPackageInput) =>
  createAction<AddPackageAction>(
    "ADD_PACKAGE",
    { ...input },
    undefined,
    z.AddPackageInputSchema,
    "global",
  );

export const updatePackageInfo = (input: UpdatePackageInfoInput) =>
  createAction<UpdatePackageInfoAction>(
    "UPDATE_PACKAGE_INFO",
    { ...input },
    undefined,
    z.UpdatePackageInfoInputSchema,
    "global",
  );

export const removePackage = (input: RemovePackageInput) =>
  createAction<RemovePackageAction>(
    "REMOVE_PACKAGE",
    { ...input },
    undefined,
    z.RemovePackageInputSchema,
    "global",
  );

export const reorderPackages = (input: ReorderPackagesInput) =>
  createAction<ReorderPackagesAction>(
    "REORDER_PACKAGES",
    { ...input },
    undefined,
    z.ReorderPackagesInputSchema,
    "global",
  );
