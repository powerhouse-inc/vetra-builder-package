import type { BuilderAccountMembersOperations } from "@powerhousedao/vetra-builder-package/document-models/builder-account";

export const builderAccountMembersOperations: BuilderAccountMembersOperations = {
  addMemberOperation(state, action, dispatch) {
    if (state.members.find((member) => member === action.input.ethAddress!)) {
      return;
    }
    state.members.push(action.input.ethAddress!);
  },
  removeMemberOperation(state, action, dispatch) {
    state.members = state.members.filter(
      (member) => member !== action.input.ethAddress!
    );
  },
};
