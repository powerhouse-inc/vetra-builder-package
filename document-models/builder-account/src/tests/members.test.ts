/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddMemberInput,
  type RemoveMemberInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/members/creators.js";
import type { BuilderAccountDocument } from "../../gen/types.js";

describe("Members Operations", () => {
  let document: BuilderAccountDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addMember operation", () => {
    const input: AddMemberInput = generateMock(z.AddMemberInputSchema());

    const updatedDocument = reducer(document, creators.addMember(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_MEMBER");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeMember operation", () => {
    const input: RemoveMemberInput = generateMock(z.RemoveMemberInputSchema());

    const updatedDocument = reducer(document, creators.removeMember(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_MEMBER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
