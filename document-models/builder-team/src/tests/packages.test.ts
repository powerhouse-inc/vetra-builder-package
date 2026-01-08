import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isBuilderTeamDocument,
  addPackage,
  updatePackageInfo,
  removePackage,
  reorderPackages,
  AddPackageInputSchema,
  UpdatePackageInfoInputSchema,
  RemovePackageInputSchema,
  ReorderPackagesInputSchema,
} from "@powerhousedao/vetra-builder-package/document-models/builder-team";

describe("PackagesOperations", () => {
  it("should handle addPackage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddPackageInputSchema());

    const updatedDocument = reducer(document, addPackage(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PACKAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updatePackageInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdatePackageInfoInputSchema());

    const updatedDocument = reducer(document, updatePackageInfo(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PACKAGE_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removePackage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemovePackageInputSchema());

    const updatedDocument = reducer(document, removePackage(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_PACKAGE",
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

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REORDER_PACKAGES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
