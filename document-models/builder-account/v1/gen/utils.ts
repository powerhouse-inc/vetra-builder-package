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
  assertIsBuilderAccountDocument,
  assertIsBuilderAccountState,
  isBuilderAccountDocument,
  isBuilderAccountState,
} from "./document-schema.js";
import { builderAccountDocumentType } from "./document-type.js";
import { reducer } from "./reducer.js";
import type {
  BuilderAccountGlobalState,
  BuilderAccountLocalState,
  BuilderAccountPHState,
} from "./types.js";

export const initialGlobalState: BuilderAccountGlobalState = {
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
export const initialLocalState: BuilderAccountLocalState = {};

export const utils: DocumentModelUtils<BuilderAccountPHState> = {
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

    document.header.documentType = builderAccountDocumentType;

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
    return isBuilderAccountState(state);
  },
  assertIsStateOfType(state) {
    return assertIsBuilderAccountState(state);
  },
  isDocumentOfType(document) {
    return isBuilderAccountDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsBuilderAccountDocument(document);
  },
};
