import { createAction } from "document-model/core";
import {
  AddPackageInputSchema,
  UpdatePackageInfoInputSchema,
  RemovePackageInputSchema,
  ReorderPackagesInputSchema,
} from "../schema/zod.js";
import type {
  AddPackageInput,
  UpdatePackageInfoInput,
  RemovePackageInput,
  ReorderPackagesInput,
} from "../types.js";
import type {
  AddPackageAction,
  UpdatePackageInfoAction,
  RemovePackageAction,
  ReorderPackagesAction,
} from "./actions.js";

export const addPackage = (input: AddPackageInput) =>
  createAction<AddPackageAction>(
    "ADD_PACKAGE",
    { ...input },
    undefined,
    AddPackageInputSchema,
    "global",
  );

export const updatePackageInfo = (input: UpdatePackageInfoInput) =>
  createAction<UpdatePackageInfoAction>(
    "UPDATE_PACKAGE_INFO",
    { ...input },
    undefined,
    UpdatePackageInfoInputSchema,
    "global",
  );

export const removePackage = (input: RemovePackageInput) =>
  createAction<RemovePackageAction>(
    "REMOVE_PACKAGE",
    { ...input },
    undefined,
    RemovePackageInputSchema,
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
