import { createAction } from "document-model/core";
import {
  AddPackageInputSchema,
  SetPackageDriveIdInputSchema,
  UpdatePackageInputSchema,
  ReorderPackagesInputSchema,
  DeletePackageInputSchema,
} from "../schema/zod.js";
import type {
  AddPackageInput,
  SetPackageDriveIdInput,
  UpdatePackageInput,
  ReorderPackagesInput,
  DeletePackageInput,
} from "../types.js";
import type {
  AddPackageAction,
  SetPackageDriveIdAction,
  UpdatePackageAction,
  ReorderPackagesAction,
  DeletePackageAction,
} from "./actions.js";

export const addPackage = (input: AddPackageInput) =>
  createAction<AddPackageAction>(
    "ADD_PACKAGE",
    { ...input },
    undefined,
    AddPackageInputSchema,
    "global",
  );

export const setPackageDriveId = (input: SetPackageDriveIdInput) =>
  createAction<SetPackageDriveIdAction>(
    "SET_PACKAGE_DRIVE_ID",
    { ...input },
    undefined,
    SetPackageDriveIdInputSchema,
    "global",
  );

export const updatePackage = (input: UpdatePackageInput) =>
  createAction<UpdatePackageAction>(
    "UPDATE_PACKAGE",
    { ...input },
    undefined,
    UpdatePackageInputSchema,
    "global",
  );

export const reorderPackages = (input: ReorderPackagesInput) =>
  createAction<ReorderPackagesAction>(
    "REORDER_PACKAGES",
    { ...input },
    undefined,
    ReorderPackagesInputSchema,
    "global",
  );

export const deletePackage = (input: DeletePackageInput) =>
  createAction<DeletePackageAction>(
    "DELETE_PACKAGE",
    { ...input },
    undefined,
    DeletePackageInputSchema,
    "global",
  );
