import type { EditorModule } from "document-model";
import { lazy } from "react";

export const BuilderAccountEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/vetra/builder-account"],
  config: {
    id: "builder-account-editor",
    name: "Builder Account Editor",
  },
};
