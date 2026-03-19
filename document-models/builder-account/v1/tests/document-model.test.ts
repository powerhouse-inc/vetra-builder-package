/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  builderAccountDocumentType,
  isBuilderAccountDocument,
  assertIsBuilderAccountDocument,
  isBuilderAccountState,
  assertIsBuilderAccountState,
} from "@powerhousedao/vetra-builder-package/document-models/builder-account/v1";
import { ZodError } from "zod";

describe("BuilderAccount Document Model", () => {
  it("should create a new BuilderAccount document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(builderAccountDocumentType);
  });

  it("should create a new BuilderAccount document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isBuilderAccountDocument(document)).toBe(true);
    expect(isBuilderAccountState(document.state)).toBe(true);
  });
  it("should reject a document that is not a BuilderAccount document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsBuilderAccountDocument(wrongDocumentType)).toThrow();
      expect(isBuilderAccountDocument(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isBuilderAccountState(wrongState.state)).toBe(false);
    expect(assertIsBuilderAccountState(wrongState.state)).toThrow();
    expect(isBuilderAccountDocument(wrongState)).toBe(false);
    expect(assertIsBuilderAccountDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isBuilderAccountState(wrongInitialState.state)).toBe(false);
    expect(assertIsBuilderAccountState(wrongInitialState.state)).toThrow();
    expect(isBuilderAccountDocument(wrongInitialState)).toBe(false);
    expect(assertIsBuilderAccountDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isBuilderAccountDocument(missingIdInHeader)).toBe(false);
    expect(assertIsBuilderAccountDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isBuilderAccountDocument(missingNameInHeader)).toBe(false);
    expect(assertIsBuilderAccountDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isBuilderAccountDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsBuilderAccountDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isBuilderAccountDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsBuilderAccountDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
