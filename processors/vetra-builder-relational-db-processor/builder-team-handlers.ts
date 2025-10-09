import type { DB } from "./schema.js";
import { DatabaseHelpers } from "./database-helpers.js";
import type { IRelationalDb } from "document-drive";
import {
  type BuilderTeamState,
  type BuilderTeamAction,
} from "document-models/builder-team/index.js";
import type {
  AddSpaceAction,
  AddMemberAction,
  AddPackageAction,
  RemoveMemberAction,
  RemovePackageAction,
  RemoveSpaceAction,
  SetDescriptionAction,
  SetLogoAction,
  SetSlugAction,
  SetSocialsAction,
  SetTeamNameAction,
  UpdatePackageInfoAction,
  UpdateSpaceInfoAction,
} from "document-models/builder-team/gen/actions.js";

export class BuilderTeamHandlers {
  private dbHelpers: DatabaseHelpers;

  constructor(private db: IRelationalDb<DB>) {
    this.dbHelpers = new DatabaseHelpers(db);
  }

  async handleBuilderTeamOperation(
    documentId: string,
    action: BuilderTeamAction,
    state: BuilderTeamState,
    driveId?: string
  ): Promise<void> {
    switch (action.type) {
      // Profile operations
      case "SET_LOGO":
        await this.handleSetLogo(documentId, action, state);
        break;
      case "SET_TEAM_NAME":
        await this.handleSetProfileName(documentId, action, state);
        break;
      case "SET_SLUG":
        await this.handleSetSlug(documentId, action, state);
        break;
      case "SET_DESCRIPTION":
        await this.handleSetProfileDescription(documentId, action, state);
        break;
      case "SET_SOCIALS":
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
      case "REMOVE_SPACE":
        await this.handleDeleteSpace(documentId, action, state);
        break;
      case "UPDATE_SPACE_INFO":
        await this.handleUpdateSpaceInfo(documentId, action, state);
        break;
      // case "REORDER_SPACES":
      //   await this.handleReorderSpaces(documentId, action, state);
      //   break;

      // Packages operations
      case "ADD_PACKAGE":
        await this.handleAddPackage(documentId, action, state);
        break;
      case "REMOVE_PACKAGE":
        await this.handleDeletePackage(documentId, action, state);
        break;
      case "UPDATE_PACKAGE_INFO":
        await this.handleUpdatePackageInfo(documentId, action, state);
        break;
    }
  }

  // Profile operations
  private async handleSetLogo(
    documentId: string,
    action: SetLogoAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_logo: action.input.logo,
    });
  }

  private async handleSetProfileName(
    documentId: string,
    action: SetTeamNameAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_name: action.input.name,
    });
  }

  private async handleSetSlug(
    documentId: string,
    action: SetSlugAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_slug: action.input.slug,
    });
  }

  private async handleSetProfileDescription(
    documentId: string,
    action: SetDescriptionAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_description: action.input.description,
    });
  }

  private async handleUpdateSocials(
    documentId: string,
    action: SetSocialsAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);
    await this.dbHelpers.updateBuilderAccount(documentId, {
      profile_socials_x: action.input.xProfile,
      profile_socials_github: action.input.github,
      profile_socials_website: action.input.website,
    });
  }

  // Members operations
  private async handleAddMember(
    documentId: string,
    action: AddMemberAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);

    if (!action.input.id) return;

    const memberExists = await this.dbHelpers.memberExists(
      documentId,
      action.input.id
    );
    if (!memberExists) {
      await this.db
        .insertInto("builder_team_members")
        .values({
          id: action.input.id,
          builder_team_id: documentId,
          eth_address: "",
          created_at: new Date(),
        })
        .execute();
    }
  }

  private async handleRemoveMember(
    documentId: string,
    action: RemoveMemberAction,
    state: BuilderTeamState
  ): Promise<void> {
    if (!action.input.id) return;

    await this.db
      .deleteFrom("builder_team_members")
      .where("builder_team_id", "=", documentId)
      .where("eth_address", "=", action.input.id)
      .execute();
  }

  // Spaces operations
  private async handleAddSpace(
    documentId: string,
    action: AddSpaceAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);

    await this.db
      .insertInto("builder_team_spaces")
      .values({
        id: action.input.id,
        builder_team_id: documentId,
        title: "",
        description: "",
        sort_order: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();
  }

  private async handleDeleteSpace(
    documentId: string,
    action: RemoveSpaceAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.db
      .deleteFrom("builder_team_spaces")
      .where("id", "=", action.input.id)
      .where("builder_team_id", "=", documentId)
      .execute();
  }

  private async handleUpdateSpaceInfo(
    documentId: string,
    action: UpdateSpaceInfoAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.updateBuilderSpace(action.input.id, documentId, {
      title: action.input.title,
      description: action.input.description,
    });
  }

  // private async handleReorderSpaces(
  //   documentId: string,
  //   action: ReorderSpacesAction,
  //   state: BuilderAccountState
  // ): Promise<void> {
  //   const { ids, insertAfter } = action.input;

  //   for (let i = 0; i < ids.length; i++) {
  //     const spaceId = ids[i];
  //     const sortOrder = insertAfter !== null ? Number(insertAfter) + i + 1 : i;

  //     await this.dbHelpers.updateBuilderSpace(spaceId, documentId, {
  //       sort_order: sortOrder,
  //     });
  //   }
  // }

  // Packages operations
  private async handleAddPackage(
    documentId: string,
    action: AddPackageAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.db
      .insertInto("builder_team_packages")
      .values({
        id: `${action.input.id}`,
        space_id: action.input.spaceId,
        title: "",
        description: "",
        category: "",
        author_name: "",
        author_website: "",
        github_url: "",
        npm_url: "",
        vetra_drive_url: "",
        drive_id: "",
        sort_order: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();

    // // Add keywords if provided
    // if (action.input.keywords && action.input.keywords.length > 0) {
    //   for (const keyword of action.input.keywords) {
    //     await this.db
    //       .insertInto("builder_package_keywords")
    //       .values({
    //         id: `${packageId}-${keyword}`,
    //         package_id: packageId,
    //         label: keyword,
    //         created_at: new Date(),
    //       })
    //       .execute();
    //   }
    // }
  }

  private async handleUpdatePackageInfo(
    documentId: string,
    action: UpdatePackageInfoAction,
    state: BuilderTeamState
  ): Promise<void> {
    const updates: Record<string, any> = {
      ...action.input,
      updated_at: new Date(),
    };

    await this.dbHelpers.updateBuilderPackage(action.input.id, updates);
  }

  // private async handleReorderPackages(
  //   documentId: string,
  //   action: ReorderPackagesAction,
  //   state: BuilderAccountState
  // ): Promise<void> {
  //   const { ids, insertAfter, spaceId } = action.input;

  //   for (let i = 0; i < ids.length; i++) {
  //     const packageId = ids[i];
  //     const sortOrder = insertAfter !== null ? Number(insertAfter) + i + 1 : i;

  //     await this.db
  //       .updateTable("builder_packages")
  //       .set({
  //         sort_order: sortOrder,
  //         updated_at: new Date(),
  //       })
  //       .where("id", "=", packageId)
  //       .where("space_id", "=", spaceId)
  //       .execute();
  //   }
  // }

  private async handleDeletePackage(
    documentId: string,
    action: RemovePackageAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.db
      .deleteFrom("builder_team_packages")
      .where("id", "=", action.input.id)
      .execute();
  }
}
