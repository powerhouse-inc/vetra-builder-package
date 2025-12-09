import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type {
  BuilderAccountGlobalState,
  BuilderAccountLocalState,
} from "./types.js";
import type { BuilderAccountPHState } from "./types.js";
import { reducer } from "./reducer.js";
import { builderAccountDocumentType } from "./document-type.js";
import {
  isBuilderAccountDocument,
  assertIsBuilderAccountDocument,
  isBuilderAccountState,
  assertIsBuilderAccountState,
} from "./document-schema.js";

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

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromInput = utils.loadFromInput;
export const isStateOfType = utils.isStateOfType;
export const assertIsStateOfType = utils.assertIsStateOfType;
export const isDocumentOfType = utils.isDocumentOfType;
export const assertIsDocumentOfType = utils.assertIsDocumentOfType;
