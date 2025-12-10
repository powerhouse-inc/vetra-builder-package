/**
 * Factory methods for creating BuilderTeamDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  BuilderTeamDocument,
  BuilderTeamLocalState,
  BuilderTeamGlobalState,
  BuilderTeamPHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): BuilderTeamGlobalState {
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
  state?: Partial<BuilderTeamGlobalState>,
): BuilderTeamGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as BuilderTeamGlobalState;
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
  globalState?: Partial<BuilderTeamGlobalState>,
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
    global?: Partial<BuilderTeamGlobalState>;
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
