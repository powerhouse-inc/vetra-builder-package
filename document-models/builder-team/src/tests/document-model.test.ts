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
  builderTeamDocumentType,
  isBuilderTeamDocument,
  assertIsBuilderTeamDocument,
  isBuilderTeamState,
  assertIsBuilderTeamState,
} from "@powerhousedao/vetra-builder-package/document-models/builder-team";
import { ZodError } from "zod";

describe("BuilderTeam Document Model", () => {
  it("should create a new BuilderTeam document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(builderTeamDocumentType);
  });

  it("should create a new BuilderTeam document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isBuilderTeamDocument(document)).toBe(true);
    expect(isBuilderTeamState(document.state)).toBe(true);
  });
  it("should reject a document that is not a BuilderTeam document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsBuilderTeamDocument(wrongDocumentType)).toThrow();
      expect(isBuilderTeamDocument(wrongDocumentType)).toBe(false);
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
    expect(isBuilderTeamState(wrongState.state)).toBe(false);
    expect(assertIsBuilderTeamState(wrongState.state)).toThrow();
    expect(isBuilderTeamDocument(wrongState)).toBe(false);
    expect(assertIsBuilderTeamDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isBuilderTeamState(wrongInitialState.state)).toBe(false);
    expect(assertIsBuilderTeamState(wrongInitialState.state)).toThrow();
    expect(isBuilderTeamDocument(wrongInitialState)).toBe(false);
    expect(assertIsBuilderTeamDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isBuilderTeamDocument(missingIdInHeader)).toBe(false);
    expect(assertIsBuilderTeamDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isBuilderTeamDocument(missingNameInHeader)).toBe(false);
    expect(assertIsBuilderTeamDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isBuilderTeamDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsBuilderTeamDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isBuilderTeamDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsBuilderTeamDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
