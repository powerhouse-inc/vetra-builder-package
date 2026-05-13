/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 * Factory methods for creating BuilderAccountDocument instances
 */
import type { PHAuthState, PHBaseState, PHDocumentState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  BuilderAccountDocument,
  BuilderAccountGlobalState,
  BuilderAccountLocalState,
  BuilderAccountPHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): BuilderAccountGlobalState {
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
  state?: Partial<BuilderAccountGlobalState>,
): BuilderAccountGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
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
  globalState?: Partial<BuilderAccountGlobalState>,
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
    global?: Partial<BuilderAccountGlobalState>;
    local?: Partial<BuilderAccountLocalState>;
  }>,
): BuilderAccountDocument {
  const document = utils.createDocument(
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
