/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  type SetLogoInput,
  type SetTeamNameInput,
  type SetSlugInput,
  type SetDescriptionInput,
  type SetSocialsInput,
  SetDescriptionInputSchema,
  SetLogoInputSchema,
  SetSlugInputSchema,
  SetSocialsInputSchema,
  SetTeamNameInputSchema,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/profile/creators.js";
import type { BuilderTeamDocument } from "../../gen/types.js";
import { utils } from "../../utils.js";
import {
  reducer,
  utils,
  SetLogoInputSchema,
  SetTeamNameInputSchema,
  SetSlugInputSchema,
  SetDescriptionInputSchema,
  SetSocialsInputSchema,
} from "@powerhousedao/vetra-builder-package/document-models/builder-team";

describe("Profile Operations", () => {
  let document: BuilderTeamDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setLogo operation", () => {
    const input: SetLogoInput = generateMock(SetLogoInputSchema());

    const updatedDocument = reducer(document, creators.setLogo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_LOGO");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setTeamName operation", () => {
    const input: SetTeamNameInput = generateMock(SetTeamNameInputSchema());

    const updatedDocument = reducer(document, creators.setTeamName(input));

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
    const input: SetSlugInput = generateMock(SetSlugInputSchema());

    const updatedDocument = reducer(document, creators.setSlug(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_SLUG");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setDescription operation", () => {
    const input: SetDescriptionInput = generateMock(
      SetDescriptionInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setDescription(input));

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
    const input: SetSocialsInput = generateMock(SetSocialsInputSchema());

    const updatedDocument = reducer(document, creators.setSocials(input));

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
