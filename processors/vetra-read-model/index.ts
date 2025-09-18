import { RelationalDbProcessor } from "document-drive/processors/relational";
import { type InternalTransmitterUpdate } from "document-drive/server/listener/transmitter/internal";
import { generateId } from "document-model";
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
import { up } from "./migrations.js";
import { type DB } from "./schema.js";

export class VetraReadModelProcessor extends RelationalDbProcessor<DB> {
  static override getNamespace(driveId: string): string {
    // Default namespace: `${this.name}_${driveId.replaceAll("-", "_")}`
    return super.getNamespace(driveId);
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

      for (const operation of strand.operations) {
        await this.handleOperation(
          strand.documentId,
          operation.action as BuilderAccountAction
        );
      }
    }
  }

  private async handleOperation(
    documentId: string,
    action: BuilderAccountAction
  ): Promise<void> {
    switch (action.type) {
      // Profile operations
      case "SET_LOGO":
        await this.handleSetLogo(documentId, action);
        break;
      case "SET_PROFILE_NAME":
        await this.handleSetProfileName(documentId, action);
        break;
      case "SET_SLUG":
        await this.handleSetSlug(documentId, action);
        break;
      case "SET_PROFILE_DESCRIPTION":
        await this.handleSetProfileDescription(documentId, action);
        break;
      case "UPDATE_SOCIALS":
        await this.handleUpdateSocials(documentId, action);
        break;

      // Members operations
      case "ADD_MEMBER":
        await this.handleAddMember(documentId, action);
        break;
      case "REMOVE_MEMBER":
        await this.handleRemoveMember(documentId, action);
        break;

      // Spaces operations
      case "ADD_SPACE":
        await this.handleAddSpace(documentId, action);
        break;
      case "DELETE_SPACE":
        await this.handleDeleteSpace(documentId, action);
        break;
      case "SET_SPACE_TITLE":
        await this.handleSetSpaceTitle(documentId, action);
        break;
      case "SET_SPACE_DESCRIPTION":
        await this.handleSetSpaceDescription(documentId, action);
        break;
      case "REORDER_SPACES":
        await this.handleReorderSpaces(documentId, action);
        break;

      // Packages operations
      case "ADD_PACKAGE":
        await this.handleAddPackage(documentId, action);
        break;
      case "SET_PACKAGE_DRIVE_ID":
        await this.handleSetPackageDriveId(documentId, action);
        break;
      case "UPDATE_PACKAGE":
        await this.handleUpdatePackage(documentId, action);
        break;
      case "REORDER_PACKAGES":
        await this.handleReorderPackages(documentId, action);
        break;
      case "DELETE_PACKAGE":
        await this.handleDeletePackage(documentId, action);
        break;
    }
  }

  // Profile operations
  private async handleSetLogo(
    documentId: string,
    action: SetLogoAction
  ): Promise<void> {
    await this.ensureBuilderAccount(documentId);
    await this.relationalDb
      .updateTable("builder_accounts")
      .set({
        profile_logo: action.input.logoUrl,
        updated_at: new Date(),
      })
      .where("id", "=", documentId)
      .execute();
  }

  private async handleSetProfileName(
    documentId: string,
    action: SetProfileNameAction
  ): Promise<void> {
    await this.ensureBuilderAccount(documentId);
    await this.relationalDb
      .updateTable("builder_accounts")
      .set({
        profile_name: action.input.name,
        updated_at: new Date(),
      })
      .where("id", "=", documentId)
      .execute();
  }

  private async handleSetSlug(
    documentId: string,
    action: SetSlugAction
  ): Promise<void> {
    await this.ensureBuilderAccount(documentId);
    await this.relationalDb
      .updateTable("builder_accounts")
      .set({
        profile_slug: action.input.slug,
        updated_at: new Date(),
      })
      .where("id", "=", documentId)
      .execute();
  }

  private async handleSetProfileDescription(
    documentId: string,
    action: SetProfileDescriptionAction
  ): Promise<void> {
    await this.ensureBuilderAccount(documentId);
    await this.relationalDb
      .updateTable("builder_accounts")
      .set({
        profile_description: action.input.description,
        updated_at: new Date(),
      })
      .where("id", "=", documentId)
      .execute();
  }

  private async handleUpdateSocials(
    documentId: string,
    action: UpdateSocialsAction
  ): Promise<void> {
    await this.ensureBuilderAccount(documentId);
    await this.relationalDb
      .updateTable("builder_accounts")
      .set({
        profile_socials_x: action.input.x,
        profile_socials_github: action.input.github,
        profile_socials_website: action.input.website,
        updated_at: new Date(),
      })
      .where("id", "=", documentId)
      .execute();
  }

  // Members operations
  private async handleAddMember(
    documentId: string,
    action: AddMemberAction
  ): Promise<void> {
    await this.ensureBuilderAccount(documentId);

    if (!action.input.ethAddress) return;

    // Check if member already exists
    const existingMember = await this.relationalDb
      .selectFrom("builder_account_members")
      .select("id")
      .where("builder_account_id", "=", documentId)
      .where("eth_address", "=", action.input.ethAddress)
      .executeTakeFirst();

    if (!existingMember) {
      await this.relationalDb
        .insertInto("builder_account_members")
        .values({
          id: generateId(),
          builder_account_id: documentId,
          eth_address: action.input.ethAddress,
          created_at: new Date(),
        })
        .execute();
    }
  }

  private async handleRemoveMember(
    documentId: string,
    action: RemoveMemberAction
  ): Promise<void> {
    if (!action.input.ethAddress) return;

    await this.relationalDb
      .deleteFrom("builder_account_members")
      .where("builder_account_id", "=", documentId)
      .where("eth_address", "=", action.input.ethAddress)
      .execute();
  }

  // Spaces operations
  private async handleAddSpace(
    documentId: string,
    action: AddSpaceAction
  ): Promise<void> {
    await this.ensureBuilderAccount(documentId);

    const spaceId = generateId();
    await this.relationalDb
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
    action: DeleteSpaceAction
  ): Promise<void> {
    await this.relationalDb
      .deleteFrom("builder_spaces")
      .where("id", "=", action.input.id)
      .where("builder_account_id", "=", documentId)
      .execute();
  }

  private async handleSetSpaceTitle(
    documentId: string,
    action: SetSpaceTitleAction
  ): Promise<void> {
    await this.relationalDb
      .updateTable("builder_spaces")
      .set({
        title: action.input.newTitle,
        updated_at: new Date(),
      })
      .where("id", "=", action.input.id)
      .where("builder_account_id", "=", documentId)
      .execute();
  }

  private async handleSetSpaceDescription(
    documentId: string,
    action: SetSpaceDescriptionAction
  ): Promise<void> {
    await this.relationalDb
      .updateTable("builder_spaces")
      .set({
        description: action.input.description,
        updated_at: new Date(),
      })
      .where("id", "=", action.input.id)
      .where("builder_account_id", "=", documentId)
      .execute();
  }

  private async handleReorderSpaces(
    documentId: string,
    action: ReorderSpacesAction
  ): Promise<void> {
    const { ids, insertAfter } = action.input;

    for (let i = 0; i < ids.length; i++) {
      const spaceId = ids[i];
      const sortOrder = insertAfter !== null ? Number(insertAfter) + i + 1 : i;

      await this.relationalDb
        .updateTable("builder_spaces")
        .set({
          sort_order: sortOrder,
          updated_at: new Date(),
        })
        .where("id", "=", spaceId)
        .where("builder_account_id", "=", documentId)
        .execute();
    }
  }

  // Packages operations
  private async handleAddPackage(
    documentId: string,
    action: AddPackageAction
  ): Promise<void> {
    const packageId = generateId();

    await this.relationalDb
      .insertInto("builder_packages")
      .values({
        id: packageId,
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
        await this.relationalDb
          .insertInto("builder_package_keywords")
          .values({
            id: generateId(),
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
    action: SetPackageDriveIdAction
  ): Promise<void> {
    await this.relationalDb
      .updateTable("builder_packages")
      .set({
        drive_id: action.input.driveId,
        updated_at: new Date(),
      })
      .where("id", "=", action.input.packageId)
      .execute();
  }

  private async handleUpdatePackage(
    documentId: string,
    action: UpdatePackageAction
  ): Promise<void> {
    const updates: Record<string, any> = { updated_at: new Date() };

    if (action.input.title !== undefined) {
      updates.name = action.input.title;
    }
    if (action.input.description !== undefined) {
      updates.description = action.input.description;
    }

    await this.relationalDb
      .updateTable("builder_packages")
      .set(updates)
      .where("id", "=", action.input.id)
      .execute();
  }

  private async handleReorderPackages(
    documentId: string,
    action: ReorderPackagesAction
  ): Promise<void> {
    const { ids, insertAfter, spaceId } = action.input;

    for (let i = 0; i < ids.length; i++) {
      const packageId = ids[i];
      const sortOrder = insertAfter !== null ? Number(insertAfter) + i + 1 : i;

      await this.relationalDb
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
    action: DeletePackageAction
  ): Promise<void> {
    await this.relationalDb
      .deleteFrom("builder_packages")
      .where("id", "=", action.input.id)
      .execute();
  }

  // Helper method to ensure builder account exists
  private async ensureBuilderAccount(documentId: string): Promise<void> {
    const existing = await this.relationalDb
      .selectFrom("builder_accounts")
      .select("id")
      .where("id", "=", documentId)
      .executeTakeFirst();

    if (!existing) {
      await this.relationalDb
        .insertInto("builder_accounts")
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

  async onDisconnect() {}
}
