import type { RenownAuthorization } from "document-models/renown-profile/gen/types.js";
import type { RenownProfileAuthorizationOperations } from "../../gen/authorization/operations.js";

export const reducer: RenownProfileAuthorizationOperations = {
  addAuthorizationOperation(state, action, dispatch) {
    state.authorizations.push(action.input as RenownAuthorization);
  },
  revokeAuthorizationOperation(state, action, dispatch) {
    state.authorizations = state.authorizations.filter(
      (authorization) => authorization.id !== action.input.authorizationId
    );
  },
};
