import type { IRelationalDb } from "document-drive";
import type { DB } from "./schema.js";

export class DatabaseHelpers {
  constructor(private db: IRelationalDb<DB>) {}

  /**
   * Ensures a package exists in the database, creating it if it doesn't
   */
  async ensurePackageExists(
    documentId: string,
    driveId: string
  ): Promise<void> {
    const existing = await this.db
      .selectFrom("builder_team_packages")
      .select("id")
      .where("id", "=", documentId)
      .executeTakeFirst();

    if (!existing) {
      await this.db
        .insertInto("builder_team_packages")
        .values({
          id: documentId,
          drive_id: driveId,
          author_name: "",
          title: "",
          space_id: "",
        })
        .execute();
    }
  }

  /**
   * Check if a document ID is marked as deleted
   */
  private async isDocumentDeleted(documentId: string): Promise<boolean> {
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
   * Ensures a builder account exists in the database, creating it if it doesn't
   * Throws an error if the document was previously deleted
   */
  async ensureBuilderAccountExistsAndIsNotdeleted(
    documentId: string
  ): Promise<void> {
    // Check if the document was deleted
    const isDeleted = await this.isDocumentDeleted(documentId);
    if (isDeleted) {
      throw new Error(
        `Builder account with document ID ${documentId} was previously deleted and cannot be accessed`
      );
    }

    const existing = await this.db
      .selectFrom("builder_teams")
      .select("id")
      .where("id", "=", documentId)
      .executeTakeFirst();

    if (!existing) {
      await this.db
        .insertInto("builder_teams")
        .values({
          id: documentId,
          profile_name: "",
          profile_slug: "",
          profile_logo: null,
          profile_description: null,
          profile_socials_x: null,
          profile_socials_github: null,
          profile_socials_website: null,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .onConflict((oc) => oc.column("id").doNothing())
        .execute();
    }
  }

  /**
   * Updates a package with the provided data
   */
  async updatePackage(
    documentId: string,
    updates: Record<string, any>
  ): Promise<void> {
    await this.db
      .updateTable("builder_team_packages")
      .set({
        ...updates,
        updated_at: new Date(),
      })
      .where("id", "=", documentId)
      .execute();
  }

  /**
   * Updates a builder account with the provided data
   */
  async updateBuilderAccount(
    documentId: string,
    updates: Record<string, any>
  ): Promise<void> {
    await this.db
      .updateTable("builder_teams")
      .set({
        ...updates,
        updated_at: new Date(),
      })
      .where("id", "=", documentId)
      .execute();
  }

  /**
   * Updates a builder space with the provided data
   */
  async updateBuilderSpace(
    spaceId: string,
    documentId: string,
    updates: Record<string, any>
  ): Promise<void> {
    await this.db
      .updateTable("builder_team_spaces")
      .set({
        ...updates,
        updated_at: new Date(),
      })
      .where("id", "=", spaceId)
      .where("builder_team_id", "=", documentId)
      .execute();
  }

  /**
   * Updates a builder package with the provided data
   */
  async updateBuilderPackage(
    packageId: string,
    updates: Record<string, any>
  ): Promise<void> {
    await this.db
      .updateTable("builder_team_packages")
      .set({
        ...updates,
        updated_at: new Date(),
      })
      .where("id", "=", packageId)
      .execute();
  }

  /**
   * Checks if a member already exists for a builder account
   */
  async memberExists(documentId: string, ethAddress: string): Promise<boolean> {
    const existing = await this.db
      .selectFrom("builder_team_members")
      .select("id")
      .where("builder_team_id", "=", documentId)
      .where("eth_address", "=", ethAddress)
      .executeTakeFirst();

    return !!existing;
  }
}
