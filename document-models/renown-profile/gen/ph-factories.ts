/**
 * Factory methods for creating RenownProfileDocument instances
 */

import {
  createBaseState,
  defaultBaseState,
  type PHAuthState,
  type PHDocumentState,
  type PHBaseState,
} from "document-model";
import type {
  RenownProfileDocument,
  RenownProfileLocalState,
  RenownProfileState,
} from "./types.js";
import { createDocument } from "./utils.js";

export type RenownProfilePHState = PHBaseState & {
  global: RenownProfileState;
  local: RenownProfileLocalState;
};

export function defaultGlobalState(): RenownProfileState {
  return {
    username: null,
    ethAddress: null,
    userImage: null,
    authorizations: [],
  };
}

export function defaultLocalState(): RenownProfileLocalState {
  return {};
}

export function defaultPHState(): RenownProfilePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<RenownProfileState>,
): RenownProfileState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as RenownProfileState;
}

export function createLocalState(
  state?: Partial<RenownProfileLocalState>,
): RenownProfileLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as RenownProfileLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<RenownProfileState>,
  localState?: Partial<RenownProfileLocalState>,
): RenownProfilePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a RenownProfileDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createRenownProfileDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<RenownProfileState>;
    local?: Partial<RenownProfileLocalState>;
  }>,
): RenownProfileDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
