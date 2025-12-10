/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  type AddSpaceInput,
  type UpdateSpaceInfoInput,
  type RemoveSpaceInput,
  AddSpaceInputSchema,
  RemoveSpaceInputSchema,
  UpdateSpaceInfoInputSchema,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/spaces/creators.js";
import type { BuilderTeamDocument } from "../../gen/types.js";
import { utils } from "../../utils.js";

describe("Spaces Operations", () => {
  let document: BuilderTeamDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addSpace operation", () => {
    const input: AddSpaceInput = generateMock(AddSpaceInputSchema());

    const updatedDocument = reducer(document, creators.addSpace(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_SPACE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateSpaceInfo operation", () => {
    const input: UpdateSpaceInfoInput = generateMock(
      UpdateSpaceInfoInputSchema(),
    );

    const updatedDocument = reducer(document, creators.updateSpaceInfo(input));

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
    const input: RemoveSpaceInput = generateMock(RemoveSpaceInputSchema());

    const updatedDocument = reducer(document, creators.removeSpace(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SPACE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
