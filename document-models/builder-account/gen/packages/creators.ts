import { createAction } from "document-model";
import {
  z,
  type AddPackageInput,
  type SetPackageDriveIdInput,
  type UpdatePackageInput,
  type ReorderPackagesInput,
  type DeletePackageInput,
} from "../types.js";
import {
  type AddPackageAction,
  type SetPackageDriveIdAction,
  type UpdatePackageAction,
  type ReorderPackagesAction,
  type DeletePackageAction,
} from "./actions.js";

export const addPackage = (input: AddPackageInput) =>
  createAction<AddPackageAction>(
    "ADD_PACKAGE",
    { ...input },
    undefined,
    z.AddPackageInputSchema,
    "global",
  );

export const setPackageDriveId = (input: SetPackageDriveIdInput) =>
  createAction<SetPackageDriveIdAction>(
    "SET_PACKAGE_DRIVE_ID",
    { ...input },
    undefined,
    z.SetPackageDriveIdInputSchema,
    "global",
  );

export const updatePackage = (input: UpdatePackageInput) =>
  createAction<UpdatePackageAction>(
    "UPDATE_PACKAGE",
    { ...input },
    undefined,
    z.UpdatePackageInputSchema,
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

export const deletePackage = (input: DeletePackageInput) =>
  createAction<DeletePackageAction>(
    "DELETE_PACKAGE",
    { ...input },
    undefined,
    z.DeletePackageInputSchema,
    "global",
  );
