import type { BuilderAccountMembersOperations } from "document-models/builder-account/v1";

export const builderAccountMembersOperations: BuilderAccountMembersOperations =
  {
    addMemberOperation(state, action) {
      const { ethAddress } = action.input;
      if (!ethAddress) {
        return;
      }
      const normalized = ethAddress.toLowerCase();
      if (state.members.some((m) => m.toLowerCase() === normalized)) {
        return;
      }
      state.members.push(ethAddress);
    },
    removeMemberOperation(state, action) {
      const { ethAddress } = action.input;
      if (!ethAddress) {
        return;
      }
      const normalized = ethAddress.toLowerCase();
      state.members = state.members.filter(
        (m) => m.toLowerCase() !== normalized,
      );
    },
  };
