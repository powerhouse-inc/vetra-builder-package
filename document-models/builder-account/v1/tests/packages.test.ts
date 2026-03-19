import { generateMock } from "@powerhousedao/common/utils";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isBuilderAccountDocument,
  addPackage,
  setPackageDriveId,
  updatePackage,
  reorderPackages,
  deletePackage,
  AddPackageInputSchema,
  SetPackageDriveIdInputSchema,
  UpdatePackageInputSchema,
  ReorderPackagesInputSchema,
  DeletePackageInputSchema,
} from "@powerhousedao/vetra-builder-package/document-models/builder-account/v1";

describe("PackagesOperations", () => {
  it("should handle addPackage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddPackageInputSchema());

    const updatedDocument = reducer(document, addPackage(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PACKAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setPackageDriveId operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetPackageDriveIdInputSchema());

    const updatedDocument = reducer(document, setPackageDriveId(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PACKAGE_DRIVE_ID",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updatePackage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdatePackageInputSchema());

    const updatedDocument = reducer(document, updatePackage(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PACKAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reorderPackages operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReorderPackagesInputSchema());

    const updatedDocument = reducer(document, reorderPackages(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REORDER_PACKAGES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deletePackage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeletePackageInputSchema());

    const updatedDocument = reducer(document, deletePackage(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_PACKAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
