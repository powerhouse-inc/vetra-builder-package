import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isBuilderTeamDocument,
  addSpace,
  updateSpaceInfo,
  removeSpace,
  reorderSpaces,
  AddSpaceInputSchema,
  UpdateSpaceInfoInputSchema,
  RemoveSpaceInputSchema,
  ReorderSpacesInputSchema,
} from "@powerhousedao/vetra-builder-package/document-models/builder-team";

describe("SpacesOperations", () => {
  it("should handle addSpace operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddSpaceInputSchema());

    const updatedDocument = reducer(document, addSpace(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_SPACE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateSpaceInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateSpaceInfoInputSchema());

    const updatedDocument = reducer(document, updateSpaceInfo(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SPACE_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeSpace operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveSpaceInputSchema());

    const updatedDocument = reducer(document, removeSpace(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SPACE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reorderSpaces operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReorderSpacesInputSchema());

    const updatedDocument = reducer(document, reorderSpaces(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REORDER_SPACES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
