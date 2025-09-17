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
  type VetraPackageState,
  type VetraPackageLocalState,
} from "./types.js";
import { VetraPackagePHState } from "./ph-factories.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: VetraPackageState = {
  name: "",
  description: null,
  category: null,
  author: {
    name: "",
    website: null,
  },
  keywords: [],
  github: null,
  npm: null,
};
export const initialLocalState: VetraPackageLocalState = {};

export const createState: CreateState<VetraPackagePHState> = (state) => {
  return {
    ...defaultBaseState(),
    global: { ...initialGlobalState, ...(state?.global ?? {}) },
    local: { ...initialLocalState, ...(state?.local ?? {}) },
  };
};

export const createDocument: CreateDocument<VetraPackagePHState> = (state) => {
  const document = baseCreateDocument(createState, state);
  document.header.documentType = "powerhouse/vetra/package";
  // for backwards compatibility, but this is NOT a valid signed document id
  document.header.id = generateId();
  return document;
};

export const saveToFile = (document: any, path: string, name?: string) => {
  return baseSaveToFile(document, path, "phvp", name);
};

export const saveToFileHandle = (document: any, input: any) => {
  return baseSaveToFileHandle(document, input);
};

export const loadFromFile: LoadFromFile<VetraPackagePHState> = (path) => {
  return baseLoadFromFile(path, reducer);
};

export const loadFromInput: LoadFromInput<VetraPackagePHState> = (input) => {
  return baseLoadFromInput(input, reducer);
};

const utils = {
  fileExtension: "phvp",
  createState,
  createDocument,
  saveToFile,
  saveToFileHandle,
  loadFromFile,
  loadFromInput,
};

export default utils;
