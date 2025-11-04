import type { EditorModule } from "document-model";
import { Editor } from "./editor.js";

export const module: EditorModule = {
  Component: Editor,
  documentTypes: ["powerhouse/builder-team"],
  config: {
    id: "builder-team-editor",
    name: "Builder Team Editor",
  },
};
