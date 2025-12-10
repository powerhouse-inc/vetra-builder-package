import type { IRelationalDb } from "document-drive";
import type {
  AddMemberAction,
  AddPackageAction,
  AddSpaceAction,
  RemoveMemberAction,
  RemovePackageAction,
  RemoveSpaceAction,
  ReorderPackagesAction,
  ReorderSpacesAction,
  SetDescriptionAction,
  SetLogoAction,
  SetSlugAction,
  SetSocialsAction,
  SetTeamNameAction,
  UpdateMemberInfoAction,
  UpdatePackageInfoAction,
  UpdateSpaceInfoAction,
} from "../../document-models/builder-team/gen/actions.js";
import {
  type BuilderTeamAction,
  type BuilderTeamState,
  type VetraBuilderSpace,
  type VetraPackageInfo,
} from "../../document-models/builder-team/index.js";
import type { Updateable } from "kysely";
import { DatabaseHelpers } from "./database-helpers.js";
import type { DB } from "./schema.js";

// Extended types that include sortOrder for internal sorting
type SpaceWithSortOrder = VetraBuilderSpace & { sortOrder: number };
type PackageWithSortOrder = VetraPackageInfo & { sortOrder: number };

export class BuilderTeamHandlers {
  private dbHelpers: DatabaseHelpers;

  constructor(private db: IRelationalDb<DB>) {
    this.dbHelpers = new DatabaseHelpers(db);
  }

  async handleBuilderTeamOperation(
    documentId: string,
    action: BuilderTeamAction,
    state: BuilderTeamState  ): Promise<void> {
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
      case "UPDATE_MEMBER_INFO":
        await this.handleUpdateMemberInfo(documentId, action, state);
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
      case "REORDER_SPACES":
        await this.handleReorderSpaces(documentId, action, state);
        break;

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
      case "REORDER_PACKAGES":
        await this.handleReorderPackages(documentId, action, state);
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

    // Find member in state to get full details
    const member = state.members.find((m) => m.id === action.input.id);

    // If member not found in state, skip
    if (!member) {
      console.warn(`Member ${action.input.id} not found in state`);
      return;
    }

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
          eth_address: member.ethAddress || "",
          phid: member.phid || null,
          name: member.name || null,
          profile_image: member.profileImage || null,
          created_at: new Date(),
        })
        .execute();
    } else {
      // Update existing member with new information
      await this.db
        .updateTable("builder_team_members")
        .set({
          eth_address: member.ethAddress || "",
          phid: member.phid || null,
          name: member.name || null,
          profile_image: member.profileImage || null,
        })
        .where("id", "=", action.input.id)
        .where("builder_team_id", "=", documentId)
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
      .where("id", "=", action.input.id)
      .execute();
  }

  private async handleUpdateMemberInfo(
    documentId: string,
    action: UpdateMemberInfoAction,
    state: BuilderTeamState
  ): Promise<void> {
    if (!action.input.id) return;

    // Find member in state to get full details
    const member = state.members.find((m) => m.id === action.input.id);

    // If member not found in state, skip
    if (!member) {
      console.warn(`Member ${action.input.id} not found in state for update`);
      return;
    }

    const updates: Partial<Updateable<DB["builder_team_members"]>> = {};

    // Update fields from state
    if (member.ethAddress !== undefined) {
      updates.eth_address = member.ethAddress || "";
    }
    if (member.phid !== undefined) {
      updates.phid = member.phid;
    }
    if (member.name !== undefined) {
      updates.name = member.name;
    }
    if (member.profileImage !== undefined) {
      updates.profile_image = member.profileImage;
    }

    // Only update if there are actual changes
    if (Object.keys(updates).length > 0) {
      await this.db
        .updateTable("builder_team_members")
        .set(updates)
        .where("id", "=", action.input.id)
        .where("builder_team_id", "=", documentId)
        .execute();
    }
  }

  // Spaces operations
  private async handleAddSpace(
    documentId: string,
    action: AddSpaceAction,
    state: BuilderTeamState
  ): Promise<void> {
    await this.dbHelpers.ensureBuilderAccountExistsAndIsNotdeleted(documentId);

    // Find the space in state to get its sortOrder
    const space = state.spaces.find((s) => s.id === action.input.id);
    const sortOrder = (space as SpaceWithSortOrder | undefined)?.sortOrder ?? 0;

    await this.db
      .insertInto("builder_team_spaces")
      .values({
        id: action.input.id,
        builder_team_id: documentId,
        title: "",
        description: "",
        sort_order: sortOrder,
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
    const updates: Partial<Updateable<DB["builder_team_spaces"]>> = {};

    // Only include fields that are provided
    if (action.input.title !== undefined && action.input.title !== null) {
      updates.title = action.input.title;
    }
    if (
      action.input.description !== undefined &&
      action.input.description !== null
    ) {
      updates.description = action.input.description;
    }

    // Only update if there are actual changes
    if (Object.keys(updates).length > 0) {
      await this.dbHelpers.updateBuilderSpace(
        action.input.id,
        documentId,
        updates
      );
    }
  }

  private async handleReorderSpaces(
    documentId: string,
    action: ReorderSpacesAction,
    state: BuilderTeamState
  ): Promise<void> {
    // Update sortOrder for all spaces based on the state
    for (const space of state.spaces) {
      await this.dbHelpers.updateBuilderSpace(space.id, documentId, {
        sort_order: (space as SpaceWithSortOrder).sortOrder,
      });
    }
  }

  // Packages operations
  private async handleAddPackage(
    documentId: string,
    action: AddPackageAction,
    state: BuilderTeamState
  ): Promise<void> {
    // Find the package in state to get its sortOrder
    let sortOrder = 0;
    for (const space of state.spaces) {
      const pkg = space.packages.find((p) => p.id === action.input.id);
      if (pkg) {
        sortOrder = (pkg as PackageWithSortOrder).sortOrder ?? 0;
        break;
      }
    }

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
        sort_order: sortOrder,
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
    const updates: Partial<Updateable<DB["builder_team_packages"]>> = {};

    // Find the package in the state to get additional information
    let packageFromState: { phid?: string | null } | null = null;
    for (const space of state.spaces) {
      const pkg = space.packages.find((p) => p.id === action.input.id);
      if (pkg) {
        packageFromState = pkg as { phid?: string | null };
        break;
      }
    }

    // Map input fields to database columns, only include provided fields
    if (action.input.title !== undefined && action.input.title !== null) {
      updates.title = action.input.title;
    }
    if (
      action.input.description !== undefined &&
      action.input.description !== null
    ) {
      updates.description = action.input.description;
    }
    if (action.input.github !== undefined && action.input.github !== null) {
      updates.github_url = action.input.github;
    }
    if (action.input.npm !== undefined && action.input.npm !== null) {
      updates.npm_url = action.input.npm;
    }
    if (
      action.input.vetraDriveUrl !== undefined &&
      action.input.vetraDriveUrl !== null
    ) {
      updates.vetra_drive_url = action.input.vetraDriveUrl;
    }
    if (action.input.spaceId !== undefined && action.input.spaceId !== null) {
      updates.space_id = action.input.spaceId;
    }

    // If we found the package in state and phid is available, store it
    if (packageFromState?.phid) {
      updates.drive_id = packageFromState.phid;
    } else if (action.input.phid) {
      updates.drive_id = action.input.phid;
    }

    // Always update the updated_at timestamp
    updates.updated_at = new Date();

    // Only update if there are actual changes
    if (Object.keys(updates).length > 0) {
      await this.dbHelpers.updateBuilderPackage(action.input.id, updates);
    }
  }

  private async handleReorderPackages(
    documentId: string,
    action: ReorderPackagesAction,
    state: BuilderTeamState
  ): Promise<void> {
    const { spaceId } = action.input;

    // Find the space in state
    const space = state.spaces.find((s) => s.id === spaceId);
    if (!space) return;

    // Update sortOrder for all packages in the space based on the state
    for (const pkg of space.packages) {
      await this.db
        .updateTable("builder_team_packages")
        .set({
          sort_order: (pkg as PackageWithSortOrder).sortOrder,
          updated_at: new Date(),
        })
        .where("id", "=", pkg.id)
        .where("space_id", "=", spaceId)
        .execute();
    }
  }

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
