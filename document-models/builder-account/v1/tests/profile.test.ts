import { generateMock } from "document-model";
import {
  isBuilderAccountDocument,
  reducer,
  setLogo,
  SetLogoInputSchema,
  setProfileDescription,
  SetProfileDescriptionInputSchema,
  setProfileName,
  SetProfileNameInputSchema,
  setSlug,
  SetSlugInputSchema,
  updateSocials,
  UpdateSocialsInputSchema,
  utils,
} from "document-models/builder-account/v1";
import { describe, expect, it } from "vitest";

describe("ProfileOperations", () => {
  it("should handle setLogo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetLogoInputSchema());

    const updatedDocument = reducer(document, setLogo(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_LOGO");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setProfileName operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetProfileNameInputSchema());

    const updatedDocument = reducer(document, setProfileName(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROFILE_NAME",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setSlug operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetSlugInputSchema());

    const updatedDocument = reducer(document, setSlug(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_SLUG");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setProfileDescription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetProfileDescriptionInputSchema());

    const updatedDocument = reducer(document, setProfileDescription(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROFILE_DESCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateSocials operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateSocialsInputSchema());

    const updatedDocument = reducer(document, updateSocials(input));

    expect(isBuilderAccountDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SOCIALS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
