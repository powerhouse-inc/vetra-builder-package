import type { EditorModule } from "document-model";
import { BuilderAccountEditor } from "./builder-account-editor/module.js";

export const editors: EditorModule[] = [
  BuilderAccountEditor,
];
