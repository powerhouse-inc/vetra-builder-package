import type { Action } from "document-model";
import type { BuilderAccountState } from "document-models/builder-account/index.js";
import type { DB } from "./schema.js";
import { DatabaseHelpers } from "./database-helpers.js";
import type {
  SetPackageNameInput,
  SetPackageDescriptionInput,
  SetPackageCategoryInput,
  SetPackageAuthorInput,
  SetPackageAuthorNameInput,
  SetPackageAuthorWebsiteInput,
  AddPackageKeywordInput,
  RemovePackageKeywordInput,
  SetPackageGithubUrlInput,
  SetPackageNpmUrlInput,
} from "./types.js";
import type { IRelationalDb } from "document-drive";

export class PackageHandlers {
  private dbHelpers: DatabaseHelpers;

  constructor(private db: IRelationalDb<DB>) {
    this.dbHelpers = new DatabaseHelpers(db);
  }

  async handlePackageOperation(
    documentId: string,
    action: Action,
    state: BuilderAccountState,
    driveId?: string
  ): Promise<void> {
    const packageDriveId = driveId || "";

    switch (action.type) {
      case "SET_PACKAGE_NAME":
        await this.handleSetPackageName(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "SET_PACKAGE_DESCRIPTION":
        await this.handleSetPackageDescription(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "SET_PACKAGE_CATEGORY":
        await this.handleSetPackageCategory(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "SET_PACKAGE_AUTHOR":
        await this.handleSetPackageAuthor(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "SET_PACKAGE_AUTHOR_NAME":
        await this.handleSetPackageAuthorName(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "SET_PACKAGE_AUTHOR_WEBSITE":
        await this.handleSetPackageAuthorWebsite(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "ADD_PACKAGE_KEYWORD":
        await this.handleAddPackageKeyword(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "REMOVE_PACKAGE_KEYWORD":
        await this.handleRemovePackageKeyword(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "SET_PACKAGE_GITHUB_URL":
        await this.handleSetPackageGithubUrl(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
      case "SET_PACKAGE_NPM_URL":
        await this.handleSetPackageNpmUrl(
          documentId,
          packageDriveId,
          action,
          state
        );
        break;
    }
  }

  private async handleSetPackageName(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    await this.dbHelpers.updatePackage(documentId, {
      name: (action.input as SetPackageNameInput).name,
    });
  }

  private async handleSetPackageDescription(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    await this.dbHelpers.updatePackage(documentId, {
      description: (action.input as SetPackageDescriptionInput).description,
    });
  }

  private async handleSetPackageCategory(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    await this.dbHelpers.updatePackage(documentId, {
      category: (action.input as SetPackageCategoryInput).category,
    });
  }

  private async handleSetPackageAuthor(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    const input = action.input as SetPackageAuthorInput;
    await this.dbHelpers.updatePackage(documentId, {
      author_name: input.name,
      author_website: input.website,
    });
  }

  private async handleSetPackageAuthorName(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    await this.dbHelpers.updatePackage(documentId, {
      author_name: (action.input as SetPackageAuthorNameInput).name,
    });
  }

  private async handleSetPackageAuthorWebsite(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    await this.dbHelpers.updatePackage(documentId, {
      author_website: (action.input as SetPackageAuthorWebsiteInput).website,
    });
  }

  private async handleAddPackageKeyword(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);

    const input = action.input as AddPackageKeywordInput;
    await this.db
      .insertInto("builder_package_keywords")
      .values({
        id: input.id,
        package_id: documentId,
        label: input.label,
        created_at: new Date(),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();
  }

  private async handleRemovePackageKeyword(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    const input = action.input as RemovePackageKeywordInput;
    await this.db
      .deleteFrom("builder_package_keywords")
      .where("id", "=", input.id)
      .where("package_id", "=", documentId)
      .execute();
  }

  private async handleSetPackageGithubUrl(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    await this.dbHelpers.updatePackage(documentId, {
      github_url: (action.input as SetPackageGithubUrlInput).url,
    });
  }

  private async handleSetPackageNpmUrl(
    documentId: string,
    driveId: string,
    action: Action,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensurePackageExists(documentId, driveId);
    await this.dbHelpers.updatePackage(documentId, {
      npm_url: (action.input as SetPackageNpmUrlInput).url,
    });
  }
}
