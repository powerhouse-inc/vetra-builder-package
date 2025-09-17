import {
  type CreateDocument,
  type CreateState,
  type LoadFromFile,
  type LoadFromInput,
  baseCreateDocument,
  baseSaveToFile,
  baseSaveToFileHandle,
  baseLoadFromFile,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model";
import {
  type BuilderAccountState,
  type BuilderAccountLocalState,
} from "./types.js";
import { BuilderAccountPHState } from "./ph-factories.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: BuilderAccountState = {
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

export const createState: CreateState<BuilderAccountPHState> = (state) => {
  return {
    ...defaultBaseState(),
    global: { ...initialGlobalState, ...(state?.global ?? {}) },
    local: { ...initialLocalState, ...(state?.local ?? {}) },
  };
};

export const createDocument: CreateDocument<BuilderAccountPHState> = (
  state,
) => {
  const document = baseCreateDocument(createState, state);
  document.header.documentType = "powerhouse/vetra/builder-account";
  // for backwards compatibility, but this is NOT a valid signed document id
  document.header.id = generateId();
  return document;
};

export const saveToFile = (document: any, path: string, name?: string) => {
  return baseSaveToFile(document, path, "phvba", name);
};

export const saveToFileHandle = (document: any, input: any) => {
  return baseSaveToFileHandle(document, input);
};

export const loadFromFile: LoadFromFile<BuilderAccountPHState> = (path) => {
  return baseLoadFromFile(path, reducer);
};

export const loadFromInput: LoadFromInput<BuilderAccountPHState> = (input) => {
  return baseLoadFromInput(input, reducer);
};

const utils = {
  fileExtension: "phvba",
  createState,
  createDocument,
  saveToFile,
  saveToFileHandle,
  loadFromFile,
  loadFromInput,
};

export default utils;
