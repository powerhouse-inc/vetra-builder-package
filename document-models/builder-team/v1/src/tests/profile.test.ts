import { generateMock } from "document-model";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isBuilderTeamDocument,
  setLogo,
  setTeamName,
  setSlug,
  setDescription,
  setSocials,
  SetLogoInputSchema,
  SetTeamNameInputSchema,
  SetSlugInputSchema,
  SetDescriptionInputSchema,
  SetSocialsInputSchema,
} from "document-models/builder-team";

describe("ProfileOperations", () => {
  it("should handle setLogo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetLogoInputSchema(), { logo: "https://example.com" });

    const updatedDocument = reducer(document, setLogo(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_LOGO");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setTeamName operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetTeamNameInputSchema());

    const updatedDocument = reducer(document, setTeamName(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_TEAM_NAME",
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

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_SLUG");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setDescription operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetDescriptionInputSchema());

    const updatedDocument = reducer(document, setDescription(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DESCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setSocials operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetSocialsInputSchema(), { xProfile: "https://example.com", github: "https://example.com", website: "https://example.com" });

    const updatedDocument = reducer(document, setSocials(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_SOCIALS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
