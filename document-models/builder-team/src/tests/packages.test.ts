/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  type AddPackageInput,
  type UpdatePackageInfoInput,
  type RemovePackageInput,
  AddPackageInputSchema,
  RemovePackageInputSchema,
  UpdatePackageInfoInputSchema,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/packages/creators.js";
import type { BuilderTeamDocument } from "../../gen/types.js";
import { utils } from "../../utils.js";
import {
  reducer,
  utils,
  isBuilderTeamDocument,
  reorderPackages,
  AddPackageInputSchema,
  UpdatePackageInfoInputSchema,
  RemovePackageInputSchema,
  ReorderPackagesInputSchema,
} from "@powerhousedao/vetra-builder-package/document-models/builder-team";

describe("Packages Operations", () => {
  let document: BuilderTeamDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addPackage operation", () => {
    const input: AddPackageInput = generateMock(AddPackageInputSchema());

    const updatedDocument = reducer(document, creators.addPackage(input));

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
    const input: UpdatePackageInfoInput = generateMock(
      UpdatePackageInfoInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.updatePackageInfo(input),
    );

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
    const input: RemovePackageInput = generateMock(RemovePackageInputSchema());

    const updatedDocument = reducer(document, creators.removePackage(input));

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
