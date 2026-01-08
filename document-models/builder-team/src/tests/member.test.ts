import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isBuilderTeamDocument,
  addMember,
  updateMemberInfo,
  removeMember,
  AddMemberInputSchema,
  UpdateMemberInfoInputSchema,
  RemoveMemberInputSchema,
} from "@powerhousedao/vetra-builder-package/document-models/builder-team";

describe("MemberOperations", () => {
  it("should handle addMember operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddMemberInputSchema());

    const updatedDocument = reducer(document, addMember(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_MEMBER");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateMemberInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateMemberInfoInputSchema());

    const updatedDocument = reducer(document, updateMemberInfo(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
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
    const document = utils.createDocument();
    const input = generateMock(RemoveMemberInputSchema());

    const updatedDocument = reducer(document, removeMember(input));

    expect(isBuilderTeamDocument(updatedDocument)).toBe(true);
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
