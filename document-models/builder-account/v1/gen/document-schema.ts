import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { builderAccountDocumentType } from "./document-type.js";
import { BuilderAccountStateSchema } from "./schema/zod.js";
import type { BuilderAccountDocument, BuilderAccountPHState } from "./types.js";

/** Schema for validating the header object of a BuilderAccount document */
export const BuilderAccountDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(builderAccountDocumentType),
  });

/** Schema for validating the state object of a BuilderAccount document */
export const BuilderAccountPHStateSchema = BaseDocumentStateSchema.extend({
  global: BuilderAccountStateSchema(),
});

export const BuilderAccountDocumentSchema = z.object({
  header: BuilderAccountDocumentHeaderSchema,
  state: BuilderAccountPHStateSchema,
  initialState: BuilderAccountPHStateSchema,
});

/** Simple helper function to check if a state object is a BuilderAccount document state object */
export function isBuilderAccountState(
  state: unknown,
): state is BuilderAccountPHState {
  return BuilderAccountPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a BuilderAccount document state object */
export function assertIsBuilderAccountState(
  state: unknown,
): asserts state is BuilderAccountPHState {
  BuilderAccountPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a BuilderAccount document */
export function isBuilderAccountDocument(
  document: unknown,
): document is BuilderAccountDocument {
  return BuilderAccountDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a BuilderAccount document */
export function assertIsBuilderAccountDocument(
  document: unknown,
): asserts document is BuilderAccountDocument {
  BuilderAccountDocumentSchema.parse(document);
}
