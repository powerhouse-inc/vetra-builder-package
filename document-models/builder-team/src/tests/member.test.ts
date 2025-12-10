/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  type AddMemberInput,
  type UpdateMemberInfoInput,
  type RemoveMemberInput,
  AddMemberInputSchema,
  RemoveMemberInputSchema,
  UpdateMemberInfoInputSchema,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/member/creators.js";
import type { BuilderTeamDocument } from "../../gen/types.js";
import { utils } from "../../utils.js";

describe("Member Operations", () => {
  let document: BuilderTeamDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addMember operation", () => {
    const input: AddMemberInput = generateMock(AddMemberInputSchema());

    const updatedDocument = reducer(document, creators.addMember(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_MEMBER");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateMemberInfo operation", () => {
    const input: UpdateMemberInfoInput = generateMock(
      UpdateMemberInfoInputSchema(),
    );

    const updatedDocument = reducer(document, creators.updateMemberInfo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_MEMBER_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeMember operation", () => {
    const input: RemoveMemberInput = generateMock(RemoveMemberInputSchema());

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
