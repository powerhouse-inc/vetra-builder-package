/**
 * Factory methods for creating BuilderAccountDocument instances
 */

import {
  createBaseState,
  defaultBaseState,
  type PHAuthState,
  type PHDocumentState,
  type PHBaseState,
} from "document-model";
import type {
  BuilderAccountDocument,
  BuilderAccountLocalState,
  BuilderAccountState,
} from "./types.js";
import { createDocument } from "./utils.js";

export type BuilderAccountPHState = PHBaseState & {
  global: BuilderAccountState;
  local: BuilderAccountLocalState;
};

export function defaultGlobalState(): BuilderAccountState {
  return {
    profile: {
      logo: null,
      name: "",
      slug: "",
      description: null,
      socials: {
        xProfile: null,
        github: null,
        website: null,
      },
    },
    members: [],
    spaces: [],
  };
}

export function defaultLocalState(): BuilderAccountLocalState {
  return {};
}

export function defaultPHState(): BuilderAccountPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<BuilderAccountState>,
): BuilderAccountState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as BuilderAccountState;
}

export function createLocalState(
  state?: Partial<BuilderAccountLocalState>,
): BuilderAccountLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as BuilderAccountLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<BuilderAccountState>,
  localState?: Partial<BuilderAccountLocalState>,
): BuilderAccountPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a BuilderAccountDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createBuilderAccountDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<BuilderAccountState>;
    local?: Partial<BuilderAccountLocalState>;
  }>,
): BuilderAccountDocument {
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
