import type {
  DocumentDriveAction,
  DocumentDriveState,
  IRelationalDb,
} from "document-drive";
import {
  RelationalDbProcessor,
  type RelationalDbProcessorFilter,
} from "document-drive/processors/relational";
import { type InternalTransmitterUpdate } from "document-drive/server/listener/transmitter/internal";
import type { BuilderTeamState } from "document-models/builder-team/index.js";
import type { BuilderTeamAction } from "../../document-models/builder-team/gen/actions.js";
import { BuilderTeamHandlers } from "./builder-team-handlers.js";
import { up } from "./migrations.js";
import { type DB } from "./schema.js";

export class VetraBuilderRelationalDbProcessor extends RelationalDbProcessor<DB> {
  static override getNamespace(driveId: string): string {
    // Default namespace: `${this.name}_${driveId.replaceAll("-", "_")}`
    return super.getNamespace(driveId);
  }

  private builderTeamHandlers: BuilderTeamHandlers;

  constructor(
    _namespace: string,
    _filter: RelationalDbProcessorFilter,
    relationalDb: IRelationalDb<DB>
  ) {
    super(_namespace, _filter, relationalDb);
    this.builderTeamHandlers = new BuilderTeamHandlers(relationalDb);
  }

  override async initAndUpgrade(): Promise<void> {
    await up(this.relationalDb);
  }

  override async onStrands(
    strands: InternalTransmitterUpdate[]
  ): Promise<void> {
    if (strands.length === 0) {
      return;
    }

    for (const strand of strands) {
      if (strand.operations.length === 0) {
        continue;
      }
      console.log("onStrands", strand);

      for (const operation of strand.operations) {
        if (strand.documentType.includes("powerhouse/document-drive")) {
          await this.handleDocumentDriveOperation(
            strand.documentId,
            strand.driveId,
            operation.action as DocumentDriveAction,
            operation.state as unknown as DocumentDriveState
          );
        } else {
          await this.builderTeamHandlers.handleBuilderTeamOperation(
            strand.documentId,
            operation.action as BuilderTeamAction,
            operation.state as unknown as BuilderTeamState
          );
        }
      }
    }
  }

  private async handleDocumentDriveOperation(
    documentId: string,
    driveId: string = "",
    action: DocumentDriveAction,
    state: DocumentDriveState
  ): Promise<void> {
    switch (action.type) {
      case "DELETE_NODE":
        await this.relationalDb
          .insertInto("deleted_files")
          .values({
            id: documentId + "-" + action.input.id,
            document_id: action.input.id,
            drive_id: driveId,
            deleted_at: new Date(),
          })
          .onConflict((oc) => oc.column("id").doNothing())
          .execute();
        break;
    }
  }

  async onDisconnect() {}
}
