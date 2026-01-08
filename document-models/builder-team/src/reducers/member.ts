import type { BuilderTeamMemberOperations } from "@powerhousedao/vetra-builder-package/document-models/builder-team";

export const builderTeamMemberOperations: BuilderTeamMemberOperations = {
  addMemberOperation(state, action) {
    if (state.members.find((member) => member.id === action.input.id)) {
      return;
    }
    const newMember = {
      ...action.input,
      id: action.input.id,
      phid: null,
      ethAddress: null,
      name: null,
      profileImage: null,
    };
    state.members.push(newMember);
  },
  updateMemberInfoOperation(state, action) {
    const memberIndex = state.members.findIndex(
      (member) => member.id === action.input.id,
    );
    if (memberIndex === -1) {
      return;
    }
    state.members[memberIndex] = {
      ...state.members[memberIndex],
      ...action.input,
    };
  },
  removeMemberOperation(state, action) {
    const memberIndex = state.members.findIndex(
      (member) => member.id === action.input.id,
    );
    if (memberIndex === -1) {
      return;
    }
    state.members.splice(memberIndex, 1);
  },
};
