import type { RenownProfileProfileOperations } from "../../gen/profile/operations.js";

export const reducer: RenownProfileProfileOperations = {
  setUsernameOperation(state, action, dispatch) {
    state.username = action.input.username;
  },
  setEthAddressOperation(state, action, dispatch) {
    state.ethAddress = action.input.ethAddress;
  },
  setUserImageOperation(state, action, dispatch) {
    state.userImage = action.input.userImage ?? null;
  },
};
