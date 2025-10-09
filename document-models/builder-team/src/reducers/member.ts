import type { BuilderTeamMemberOperations } from "../../gen/member/operations.js";

export const reducer: BuilderTeamMemberOperations = {
  addMemberOperation(state, action, dispatch) {
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
  updateMemberInfoOperation(state, action, dispatch) {
    const memberIndex = state.members.findIndex(
      (member) => member.id === action.input.id
    );
    if (memberIndex === -1) {
      return;
    }
    state.members[memberIndex] = { ...state.members[memberIndex], ...action.input };
  },
  removeMemberOperation(state, action, dispatch) {
    const memberIndex = state.members.findIndex(
      (member) => member.id === action.input.id
    );
    if (memberIndex === -1) {
      return;
    }
    state.members.splice(memberIndex, 1);
  },
};
