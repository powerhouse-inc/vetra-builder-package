import { generateMock } from "@powerhousedao/common/utils";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isBuilderAccountDocument,
  addSpace,
  deleteSpace,
  setSpaceTitle,
  setSpaceDescription,
  reorderSpaces,
  AddSpaceInputSchema,
  DeleteSpaceInputSchema,
  SetSpaceTitleInputSchema,
  SetSpaceDescriptionInputSchema,
  ReorderSpacesInputSchema,
} from "@powerhousedao/vetra-builder-package/document-models/builder-account/v1";

describe("SpacesOperations", () => {
  it("should handle addSpace operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddSpaceInputSchema());

    const updatedDocument = reducer(document, addSpace(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_SPACE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteSpace operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteSpaceInputSchema());

    const updatedDocument = reducer(document, deleteSpace(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_SPACE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setSpaceTitle operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetSpaceTitleInputSchema());

    const updatedDocument = reducer(document, setSpaceTitle(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_SPACE_TITLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setSpaceDescription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetSpaceDescriptionInputSchema());

    const updatedDocument = reducer(document, setSpaceDescription(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_SPACE_DESCRIPTION",
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

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
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
