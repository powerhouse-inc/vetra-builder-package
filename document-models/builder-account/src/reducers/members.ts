import type { BuilderAccountMembersOperations } from "../../gen/members/operations.js";

export const reducer: BuilderAccountMembersOperations = {
  addMemberOperation(state, action, dispatch) {
    const { ethAddress } = action.input;
    if (ethAddress && !state.members.find((member) => member === ethAddress)) {
      state.members.push(ethAddress);
    }
  },
  removeMemberOperation(state, action, dispatch) {
    const { ethAddress } = action.input;
    if (ethAddress && state.members.find((member) => member === ethAddress)) {
      state.members = state.members.filter((member) => member !== ethAddress);
    }
  },
};
