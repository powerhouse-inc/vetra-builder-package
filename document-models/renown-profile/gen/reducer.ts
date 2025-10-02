// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { RenownProfilePHState } from "./ph-factories.js";
import { z } from "./types.js";

import { reducer as ProfileReducer } from "../src/reducers/profile.js";
import { reducer as AuthorizationReducer } from "../src/reducers/authorization.js";

export const stateReducer: StateReducer<RenownProfilePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "SET_USERNAME":
      z.SetUsernameInputSchema().parse(action.input);
      ProfileReducer.setUsernameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_ETH_ADDRESS":
      z.SetEthAddressInputSchema().parse(action.input);
      ProfileReducer.setEthAddressOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_USER_IMAGE":
      z.SetUserImageInputSchema().parse(action.input);
      ProfileReducer.setUserImageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_AUTHORIZATION":
      z.AddAuthorizationInputSchema().parse(action.input);
      AuthorizationReducer.addAuthorizationOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REVOKE_AUTHORIZATION":
      z.RevokeAuthorizationInputSchema().parse(action.input);
      AuthorizationReducer.revokeAuthorizationOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<RenownProfilePHState>(stateReducer);
