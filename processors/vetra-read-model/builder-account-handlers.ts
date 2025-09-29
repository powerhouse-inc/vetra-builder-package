import { toPascalCase } from "document-drive/utils/misc";
import type {
  AddMemberAction,
  AddPackageAction,
  AddSpaceAction,
  BuilderAccountAction,
  DeletePackageAction,
  DeleteSpaceAction,
  RemoveMemberAction,
  ReorderPackagesAction,
  ReorderSpacesAction,
  SetLogoAction,
  SetPackageDriveIdAction,
  SetProfileDescriptionAction,
  SetProfileNameAction,
  SetSlugAction,
  SetSpaceDescriptionAction,
  SetSpaceTitleAction,
  UpdatePackageAction,
  UpdateSocialsAction,
} from "../../document-models/builder-account/gen/actions.js";
import type { BuilderAccountState } from "document-models/builder-account/index.js";
import type { DB } from "./schema.js";
import { DatabaseHelpers } from "./database-helpers.js";
import type { IRelationalDb } from "document-drive";

export class BuilderAccountHandlers {
  private dbHelpers: DatabaseHelpers;

  constructor(private db: IRelationalDb<DB>) {
    this.dbHelpers = new DatabaseHelpers(db);
  }

  async handleBuilderAccountOperation(
    documentId: string,
    action: BuilderAccountAction,
    state: BuilderAccountState,
    driveId?: string
  ): Promise<void> {
    switch (action.type) {
      // Profile operations
      case "SET_LOGO":
        await this.handleSetLogo(documentId, action, state);
        break;
      case "SET_PROFILE_NAME":
        await this.handleSetProfileName(documentId, action, state);
        break;
      case "SET_SLUG":
        await this.handleSetSlug(documentId, action, state);
        break;
      case "SET_PROFILE_DESCRIPTION":
        await this.handleSetProfileDescription(documentId, action, state);
        break;
      case "UPDATE_SOCIALS":
        await this.handleUpdateSocials(documentId, action, state);
        break;

      // Members operations
      case "ADD_MEMBER":
        await this.handleAddMember(documentId, action, state);
        break;
      case "REMOVE_MEMBER":
        await this.handleRemoveMember(documentId, action, state);
        break;

      // Spaces operations
      case "ADD_SPACE":
        await this.handleAddSpace(documentId, action, state);
        break;
      case "DELETE_SPACE":
        await this.handleDeleteSpace(documentId, action, state);
        break;
      case "SET_SPACE_TITLE":
        await this.handleSetSpaceTitle(documentId, action, state);
        break;
      case "SET_SPACE_DESCRIPTION":
        await this.handleSetSpaceDescription(documentId, action, state);
        break;
      case "REORDER_SPACES":
        await this.handleReorderSpaces(documentId, action, state);
        break;

      // Packages operations
      case "ADD_PACKAGE":
        await this.handleAddPackage(documentId, action, state);
        break;
      case "SET_PACKAGE_DRIVE_ID":
        await this.handleSetPackageDriveId(documentId, action, state);
        break;
      case "UPDATE_PACKAGE":
        await this.handleUpdatePackage(documentId, action, state);
        break;
      case "REORDER_PACKAGES":
        await this.handleReorderPackages(documentId, action, state);
        break;
      case "DELETE_PACKAGE":
        await this.handleDeletePackage(documentId, action, state);
        break;
    }
  }

  // Profile operations
  private async handleSetLogo(
    documentId: string,
    action: SetLogoAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccount(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_logo: action.input.logoUrl,
    });
  }

  private async handleSetProfileName(
    documentId: string,
    action: SetProfileNameAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccount(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_name: action.input.name,
    });
  }

  private async handleSetSlug(
    documentId: string,
    action: SetSlugAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccount(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_slug: action.input.slug,
    });
  }

  private async handleSetProfileDescription(
    documentId: string,
    action: SetProfileDescriptionAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccount(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_description: action.input.description,
    });
  }

  private async handleUpdateSocials(
    documentId: string,
    action: UpdateSocialsAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccount(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_socials_x: action.input.x,
      profile_socials_github: action.input.github,
      profile_socials_website: action.input.website,
    });
  }

  // Members operations
  private async handleAddMember(
    documentId: string,
    action: AddMemberAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccount(documentId);

    if (!action.input.ethAddress) return;

    const memberExists = await this.dbHelpers.memberExists(
      documentId,
      action.input.ethAddress
    );
    if (!memberExists) {
      await this.db
        .insertInto("builder_account_members")
        .values({
          id: action.input.ethAddress,
          builder_account_id: documentId,
          eth_address: action.input.ethAddress,
          created_at: new Date(),
        })
        .execute();
    }
  }

  private async handleRemoveMember(
    documentId: string,
    action: RemoveMemberAction,
    state: BuilderAccountState
  ): Promise<void> {
    if (!action.input.ethAddress) return;

    await this.db
      .deleteFrom("builder_account_members")
      .where("builder_account_id", "=", documentId)
      .where("eth_address", "=", action.input.ethAddress)
      .execute();
  }

  // Spaces operations
  private async handleAddSpace(
    documentId: string,
    action: AddSpaceAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccount(documentId);

    const spaceId = toPascalCase(action.input.title);
    await this.db
      .insertInto("builder_spaces")
      .values({
        id: spaceId,
        builder_account_id: documentId,
        title: action.input.title,
        description: action.input.description || null,
        sort_order: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();
  }

  private async handleDeleteSpace(
    documentId: string,
    action: DeleteSpaceAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.db
      .deleteFrom("builder_spaces")
      .where("id", "=", action.input.id)
      .where("builder_account_id", "=", documentId)
      .execute();
  }

  private async handleSetSpaceTitle(
    documentId: string,
    action: SetSpaceTitleAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.updateBuilderSpace(action.input.id, documentId, {
      title: action.input.newTitle,
    });
  }

  private async handleSetSpaceDescription(
    documentId: string,
    action: SetSpaceDescriptionAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.updateBuilderSpace(action.input.id, documentId, {
      description: action.input.description,
    });
  }

  private async handleReorderSpaces(
    documentId: string,
    action: ReorderSpacesAction,
    state: BuilderAccountState
  ): Promise<void> {
    const { ids, insertAfter } = action.input;

    for (let i = 0; i < ids.length; i++) {
      const spaceId = ids[i];
      const sortOrder = insertAfter !== null ? Number(insertAfter) + i + 1 : i;

      await this.dbHelpers.updateBuilderSpace(spaceId, documentId, {
        sort_order: sortOrder,
      });
    }
  }

  // Packages operations
  private async handleAddPackage(
    documentId: string,
    action: AddPackageAction,
    state: BuilderAccountState
  ): Promise<void> {
    const packageId =
      action.input.spaceId + "-" + toPascalCase(action.input.name);

    await this.db
      .insertInto("builder_packages")
      .values({
        id: `${packageId}`,
        space_id: action.input.spaceId,
        name: action.input.name,
        description: action.input.description || null,
        category: action.input.category || null,
        author_name: action.input.author?.name || "",
        author_website: action.input.author?.website || null,
        github_url: action.input.github || null,
        npm_url: action.input.npm || null,
        vetra_drive_url: action.input.vetraDriveUrl || null,
        drive_id: null,
        sort_order: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();

    // Add keywords if provided
    if (action.input.keywords && action.input.keywords.length > 0) {
      for (const keyword of action.input.keywords) {
        await this.db
          .insertInto("builder_package_keywords")
          .values({
            id: `${packageId}-${keyword}`,
            package_id: packageId,
            label: keyword,
            created_at: new Date(),
          })
          .execute();
      }
    }
  }

  private async handleSetPackageDriveId(
    documentId: string,
    action: SetPackageDriveIdAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.dbHelpers.updateBuilderPackage(action.input.packageId, {
      drive_id: action.input.driveId,
    });
  }

  private async handleUpdatePackage(
    documentId: string,
    action: UpdatePackageAction,
    state: BuilderAccountState
  ): Promise<void> {
    const updates: Record<string, any> = {};

    if (action.input.title !== undefined) {
      updates.name = action.input.title;
    }
    if (action.input.description !== undefined) {
      updates.description = action.input.description;
    }

    await this.dbHelpers.updateBuilderPackage(action.input.id, updates);
  }

  private async handleReorderPackages(
    documentId: string,
    action: ReorderPackagesAction,
    state: BuilderAccountState
  ): Promise<void> {
    const { ids, insertAfter, spaceId } = action.input;

    for (let i = 0; i < ids.length; i++) {
      const packageId = ids[i];
      const sortOrder = insertAfter !== null ? Number(insertAfter) + i + 1 : i;

      await this.db
        .updateTable("builder_packages")
        .set({
          sort_order: sortOrder,
          updated_at: new Date(),
        })
        .where("id", "=", packageId)
        .where("space_id", "=", spaceId)
        .execute();
    }
  }

  private async handleDeletePackage(
    documentId: string,
    action: DeletePackageAction,
    state: BuilderAccountState
  ): Promise<void> {
    await this.db
      .deleteFrom("builder_packages")
      .where("id", "=", action.input.id)
      .execute();
  }
}
