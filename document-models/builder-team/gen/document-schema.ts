import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { builderTeamDocumentType } from "./document-type.js";
import { BuilderTeamStateSchema } from "./schema/zod.js";
import type { BuilderTeamDocument, BuilderTeamPHState } from "./types.js";

/** Schema for validating the header object of a BuilderTeam document */
export const BuilderTeamDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(builderTeamDocumentType),
});

/** Schema for validating the state object of a BuilderTeam document */
export const BuilderTeamPHStateSchema = BaseDocumentStateSchema.extend({
  global: BuilderTeamStateSchema(),
});

export const BuilderTeamDocumentSchema = z.object({
  header: BuilderTeamDocumentHeaderSchema,
  state: BuilderTeamPHStateSchema,
  initialState: BuilderTeamPHStateSchema,
});

/** Simple helper function to check if a state object is a BuilderTeam document state object */
export function isBuilderTeamState(
  state: unknown,
): state is BuilderTeamPHState {
  return BuilderTeamPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a BuilderTeam document state object */
export function assertIsBuilderTeamState(
  state: unknown,
): asserts state is BuilderTeamPHState {
  BuilderTeamPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a BuilderTeam document */
export function isBuilderTeamDocument(
  document: unknown,
): document is BuilderTeamDocument {
  return BuilderTeamDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a BuilderTeam document */
export function assertIsBuilderTeamDocument(
  document: unknown,
): asserts document is BuilderTeamDocument {
  BuilderTeamDocumentSchema.parse(document);
}
