import type { Action } from "document-model";
import type { DB } from "./schema.js";
import type { IRelationalDb } from "document-drive";

// Define document drive action types locally to avoid import issues
export type DocumentDriveAction = Action & {
  type:
    | "DELETE_NODE"
    | "ADD_FILE"
    | "ADD_FOLDER"
    | "UPDATE_FILE"
    | "UPDATE_NODE"
    | "COPY_NODE"
    | "MOVE_NODE";
  input: any;
};

export class DocumentDriveHandlers {
  constructor(private db: IRelationalDb<DB>) {}

  /**
   * Check if a document ID is marked as deleted
   */
  async isDocumentDeleted(documentId: string): Promise<boolean> {
    try {
      const result = await this.db
        .selectFrom("deleted_files")
        .select("id")
        .where("document_id", "=", documentId)
        .executeTakeFirst();

      return !!result;
    } catch (error) {
      console.error("Error checking if document is deleted:", error);
      return false;
    }
  }

  /**
   * Get all deleted document IDs for a specific drive
   */
  async getDeletedDocumentsInDrive(driveId: string): Promise<string[]> {
    try {
      const results = await this.db
        .selectFrom("deleted_files")
        .select("document_id")
        .where("drive_id", "=", driveId)
        .execute();

      return results.map((r) => r.document_id);
    } catch (error) {
      console.error("Error getting deleted documents in drive:", error);
      return [];
    }
  }

  async handleDocumentDriveOperation(
    documentId: string,
    action: DocumentDriveAction,
    driveId?: string
  ): Promise<void> {
    switch (action.type) {
      case "DELETE_NODE":
        await this.handleDeleteNode(documentId, action, driveId);
        break;
      // Add other document-drive operations as needed
      // case "ADD_FILE":
      //   await this.handleAddFile(documentId, action, driveId);
      //   break;
      // case "UPDATE_FILE":
      //   await this.handleUpdateFile(documentId, action, driveId);
      //   break;
    }
  }

  private async handleDeleteNode(
    documentId: string,
    action: DocumentDriveAction,
    driveId?: string
  ): Promise<void> {
    try {
      const { nodeId } = action.input as { nodeId: string };

      // Store the deleted file/document ID in the deleted_files table
      // documentId is the drive ID, nodeId is the specific file/node being deleted
      await this.db
        .insertInto("deleted_files")
        .values({
          id: `${documentId}-${nodeId}`, // Unique ID combining drive and node
          document_id: nodeId as string, // The specific document/file that was deleted
          drive_id: documentId, // The drive containing the deleted file
          deleted_at: new Date(),
        })
        .onConflict((oc) => oc.column("id").doNothing())
        .execute();
    } catch (error) {
      console.error("Error handling delete node:", error);
    }
  }

  // Future handlers for other document-drive operations
  // private async handleAddFile(
  //   documentId: string,
  //   action: Action & { type: "ADD_FILE"; input: any },
  //   driveId?: string
  // ): Promise<void> {
  //   // Handle file addition if needed
  // }

  // private async handleUpdateFile(
  //   documentId: string,
  //   action: Action & { type: "UPDATE_FILE"; input: any },
  //   driveId?: string
  // ): Promise<void> {
  //   // Handle file updates if needed
  // }
}
