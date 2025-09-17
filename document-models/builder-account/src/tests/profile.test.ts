/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type SetLogoInput,
  type SetProfileNameInput,
  type SetSlugInput,
  type SetProfileDescriptionInput,
  type SetSocialsInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/profile/creators.js";
import type { BuilderAccountDocument } from "../../gen/types.js";

describe("Profile Operations", () => {
  let document: BuilderAccountDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setLogo operation", () => {
    const input: SetLogoInput = generateMock(z.SetLogoInputSchema());

    const updatedDocument = reducer(document, creators.setLogo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_LOGO");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setProfileName operation", () => {
    const input: SetProfileNameInput = generateMock(
      z.SetProfileNameInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setProfileName(input));

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
    const input: SetSlugInput = generateMock(z.SetSlugInputSchema());

    const updatedDocument = reducer(document, creators.setSlug(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_SLUG");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setProfileDescription operation", () => {
    const input: SetProfileDescriptionInput = generateMock(
      z.SetProfileDescriptionInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setProfileDescription(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROFILE_DESCRIPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setSocials operation", () => {
    const input: SetSocialsInput = generateMock(z.SetSocialsInputSchema());

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
