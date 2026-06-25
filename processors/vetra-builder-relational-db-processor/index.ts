import {
  RelationalDbProcessor,
  type IRelationalDb,
  type ProcessorFilter,
} from "@powerhousedao/reactor-browser";
import type { OperationWithContext } from "document-model";
import type {
  BuilderTeamAction,
  BuilderTeamState,
} from "document-models/builder-team";
import { BuilderTeamHandlers } from "./builder-team-handlers.js";
import { up } from "./migrations.js";
import { type DB } from "./schema.js";

export class VetraBuilderRelationalDbProcessor extends RelationalDbProcessor<DB> {
  private builderTeamHandlers: BuilderTeamHandlers;

  constructor(
    _namespace: string,
    _filter: ProcessorFilter,
    relationalDb: IRelationalDb<DB>,
  ) {
    super(_namespace, _filter, relationalDb);
    this.builderTeamHandlers = new BuilderTeamHandlers(relationalDb);
  }

  override async initAndUpgrade(): Promise<void> {
    await up(this.relationalDb);
  }

  override async onOperations(
    operations: OperationWithContext[],
  ): Promise<void> {
    for (const { operation, context } of operations) {
      try {
        if (context.documentType.includes("powerhouse/document-drive")) {
          await this.handleDocumentDriveOperation(operation.action);
        } else {
          const state = this.parseState(context.resultingState);
          if (state) {
            await this.builderTeamHandlers.handleBuilderTeamOperation(
              context.documentId,
              operation.action as BuilderTeamAction,
              state,
            );
          }
        }
      } catch (error) {
        console.error(
          `VetraBuilderRelationalDbProcessor: Error processing operation ${JSON.stringify(
            operation.action,
          )}:`,
          error,
        );
        break;
      }
    }
  }

  private async handleDocumentDriveOperation(action: {
    type: string;
    input: unknown;
  }): Promise<void> {
    switch (action.type) {
      case "DELETE_NODE": {
        const input = action.input as { id?: string };
        if (input.id) {
          await this.relationalDb
            .insertInto("deleted_files")
            .values({
              id: input.id,
              document_id: input.id,
              drive_id: "",
              deleted_at: new Date(),
            })
            .onConflict((oc) => oc.column("id").doNothing())
            .execute();
        }
        break;
      }
    }
  }

  /**
   * `resultingState` is the post-reducer document state, JSON-encoded. The
   * envelope is sometimes the global state directly, sometimes wrapped in
   * `{ global: ... }`. Tolerate both, and never let one bad envelope kill the
   * whole batch.
   */
  private parseState(
    resultingState: string | undefined,
  ): BuilderTeamState | null {
    if (!resultingState) return null;
    try {
      const parsed = JSON.parse(resultingState) as
        | BuilderTeamState
        | { global: BuilderTeamState };
      return "global" in parsed && parsed.global
        ? parsed.global
        : (parsed as BuilderTeamState);
    } catch (error) {
      console.error(
        "VetraBuilderRelationalDbProcessor: failed to parse resultingState:",
        error,
      );
      return null;
    }
  }

  async onDisconnect() {}
}
