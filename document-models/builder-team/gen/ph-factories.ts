/**
 * Factory methods for creating BuilderTeamDocument instances
 */

import {
  createBaseState,
  defaultBaseState,
  type PHAuthState,
  type PHDocumentState,
  type PHBaseState,
} from "document-model";
import type {
  BuilderTeamDocument,
  BuilderTeamLocalState,
  BuilderTeamState,
} from "./types.js";
import { createDocument } from "./utils.js";

export type BuilderTeamPHState = PHBaseState & {
  global: BuilderTeamState;
  local: BuilderTeamLocalState;
};

export function defaultGlobalState(): BuilderTeamState {
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

export function defaultLocalState(): BuilderTeamLocalState {
  return {};
}

export function defaultPHState(): BuilderTeamPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<BuilderTeamState>,
): BuilderTeamState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as BuilderTeamState;
}

export function createLocalState(
  state?: Partial<BuilderTeamLocalState>,
): BuilderTeamLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as BuilderTeamLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<BuilderTeamState>,
  localState?: Partial<BuilderTeamLocalState>,
): BuilderTeamPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a BuilderTeamDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createBuilderTeamDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<BuilderTeamState>;
    local?: Partial<BuilderTeamLocalState>;
  }>,
): BuilderTeamDocument {
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
