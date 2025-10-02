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
  type RenownProfileState,
  type RenownProfileLocalState,
} from "./types.js";
import { RenownProfilePHState } from "./ph-factories.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: RenownProfileState = {
  username: null,
  ethAddress: null,
  userImage: null,
  authorizations: [],
};
export const initialLocalState: RenownProfileLocalState = {};

export const createState: CreateState<RenownProfilePHState> = (state) => {
  return {
    ...defaultBaseState(),
    global: { ...initialGlobalState, ...(state?.global ?? {}) },
    local: { ...initialLocalState, ...(state?.local ?? {}) },
  };
};

export const createDocument: CreateDocument<RenownProfilePHState> = (state) => {
  const document = baseCreateDocument(createState, state);
  document.header.documentType = "powerhouse/renown-profile";
  // for backwards compatibility, but this is NOT a valid signed document id
  document.header.id = generateId();
  return document;
};

export const saveToFile = (document: any, path: string, name?: string) => {
  return baseSaveToFile(document, path, "renown-profile", name);
};

export const saveToFileHandle = (document: any, input: any) => {
  return baseSaveToFileHandle(document, input);
};

export const loadFromFile: LoadFromFile<RenownProfilePHState> = (path) => {
  return baseLoadFromFile(path, reducer);
};

export const loadFromInput: LoadFromInput<RenownProfilePHState> = (input) => {
  return baseLoadFromInput(input, reducer);
};

const utils = {
  fileExtension: "renown-profile",
  createState,
  createDocument,
  saveToFile,
  saveToFileHandle,
  loadFromFile,
  loadFromInput,
};

export default utils;
