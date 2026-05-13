/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseLoadFromInput,
  baseSaveToFileHandle,
  defaultBaseState,
  generateId,
} from "document-model";
import {
  assertIsBuilderTeamDocument,
  assertIsBuilderTeamState,
  isBuilderTeamDocument,
  isBuilderTeamState,
} from "./document-schema.js";
import { builderTeamDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  BuilderTeamGlobalState,
  BuilderTeamLocalState,
  BuilderTeamPHState,
} from "./types.js";

export const initialGlobalState: BuilderTeamGlobalState = {
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
export const initialLocalState: BuilderTeamLocalState = {};

export const utils: DocumentModelUtils<BuilderTeamPHState> = {
  fileExtension: "phvba",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = builderTeamDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isBuilderTeamState(state);
  },
  assertIsStateOfType(state) {
    return assertIsBuilderTeamState(state);
  },
  isDocumentOfType(document) {
    return isBuilderTeamDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsBuilderTeamDocument(document);
  },
};
