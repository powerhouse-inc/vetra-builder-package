import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the Todo List document type */
export const BuilderTeamEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/builder-team"],
  config: {
    id: "builder-team-editor",
    name: "Builder Team Editor",
  },
};
