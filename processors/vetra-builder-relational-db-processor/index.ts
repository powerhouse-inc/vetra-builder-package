import {
  RelationalDbProcessor,
  type IRelationalDb,
  type ProcessorFilter,
  type OperationWithContext,
} from "@powerhousedao/reactor";
import type { BuilderTeamState } from "../../document-models/builder-team/index.js";
import type { BuilderTeamAction } from "../../document-models/builder-team/gen/actions.js";
import type {
  BuilderAccountAction,
  BuilderAccountState,
} from "../../document-models/builder-account/v1/gen/types.js";
import { BuilderAccountHandlers } from "./builder-account-handlers.js";
import { BuilderTeamHandlers } from "./builder-team-handlers.js";
import { up } from "./migrations.js";
import { type DB } from "./schema.js";

export class VetraBuilderRelationalDbProcessor extends RelationalDbProcessor<DB> {
  private builderTeamHandlers: BuilderTeamHandlers;
  private builderAccountHandlers: BuilderAccountHandlers;
  private readonly driveId: string;

  constructor(
    _namespace: string,
    _filter: ProcessorFilter,
    relationalDb: IRelationalDb<DB>,
    driveId: string = ""
  ) {
    super(_namespace, _filter, relationalDb);
    this.driveId = driveId;
    this.builderTeamHandlers = new BuilderTeamHandlers(relationalDb, driveId);
    this.builderAccountHandlers = new BuilderAccountHandlers(
      relationalDb,
      driveId
    );
  }

  override async initAndUpgrade(): Promise<void> {
    await up(this.relationalDb);
  }

  override async onOperations(
    operations: OperationWithContext[]
  ): Promise<void> {
    if (operations.length === 0) {
      return;
    }

    for (const op of operations) {
      try {
        if (op.context.documentType.includes("powerhouse/document-drive")) {
          await this.handleDocumentDriveOperation(
            op.context.documentId,
            this.driveId,
            op.operation.action as unknown as { type: string; input: Record<string, unknown> },
            op.operation.resultingState
              ? (JSON.parse(op.operation.resultingState) as Record<string, unknown>)
              : undefined
          );
        } else if (op.context.documentType.includes("powerhouse/builder-account")) {
          await this.builderAccountHandlers.handleBuilderAccountOperation(
            op.context.documentId,
            op.operation.action as unknown as BuilderAccountAction,
            op.operation.resultingState
              ? JSON.parse(op.operation.resultingState)
              : ({} as BuilderAccountState)
          );
        } else {
          await this.builderTeamHandlers.handleBuilderTeamOperation(
            op.context.documentId,
            op.operation.action as unknown as BuilderTeamAction,
            op.operation.resultingState
              ? (JSON.parse(op.operation.resultingState))
              : ({} as BuilderTeamState)
          );
        }
      } catch (error) {
        console.error(
          `VetraBuilderRelationalDbProcessor: Error processing operation ${JSON.stringify(
            op.operation.action
          )}:`,
          error
        );
        break;
      }
    }
  }

  private async handleDocumentDriveOperation(
    documentId: string,
    driveId: string,
    action: { type: string; input: Record<string, unknown> },
    state?: Record<string, unknown>
  ): Promise<void> {
    switch (action.type) {
      case "DELETE_NODE":
        await this.relationalDb
          .insertInto("deleted_files")
          .values({
            id: documentId + "-" + (action.input.id as string),
            document_id: action.input.id as string,
            drive_id: driveId,
            deleted_at: new Date(),
          })
          .onConflict((oc: any) => oc.column("id").doNothing())
          .execute();
        break;
    }
  }

  async onDisconnect() {}
}
