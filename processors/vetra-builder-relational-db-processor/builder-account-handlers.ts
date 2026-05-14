import type { IRelationalDb } from "@powerhousedao/reactor";
import type {
  SetLogoAction,
  SetProfileDescriptionAction,
  SetProfileNameAction,
  SetSlugAction,
  UpdateSocialsAction,
} from "../../document-models/builder-account/v1/gen/profile/actions.js";
import type {
  BuilderAccountAction,
  BuilderAccountState,
} from "../../document-models/builder-account/v1/gen/types.js";
import type { DB } from "./schema.js";

/**
 * Mirrors `BuilderTeamHandlers` but writes to `builder_accounts`. Phase 1b
 * MVP only persists profile fields; spaces / packages / members on accounts
 * are deferred until a UI consumer exists.
 *
 * Every insert/update carries `source_drive_id` so resolvers can filter by
 * the originating drive (`user:<eth>`) since all processor instances now
 * share the "powerhouse" namespace.
 */
export class BuilderAccountHandlers {
  constructor(
    private db: IRelationalDb<DB>,
    private driveId: string,
  ) {}

  async handleBuilderAccountOperation(
    documentId: string,
    action: BuilderAccountAction,
    state: BuilderAccountState,
  ): Promise<void> {
    switch (action.type) {
      case "SET_LOGO":
        await this.handleSetLogo(documentId, action as SetLogoAction, state);
        break;
      case "SET_PROFILE_NAME":
        await this.handleSetProfileName(
          documentId,
          action as SetProfileNameAction,
          state,
        );
        break;
      case "SET_SLUG":
        await this.handleSetSlug(documentId, action as SetSlugAction, state);
        break;
      case "SET_PROFILE_DESCRIPTION":
        await this.handleSetProfileDescription(
          documentId,
          action as SetProfileDescriptionAction,
          state,
        );
        break;
      case "UPDATE_SOCIALS":
        await this.handleUpdateSocials(
          documentId,
          action as UpdateSocialsAction,
          state,
        );
        break;
      // Members / spaces / packages: deferred to a later phase. They are
      // intentionally not handled so writes are silently no-op'd; the doc
      // model still records them and the UI can replay them once read
      // surfaces ship.
    }
  }

  private async ensureExists(documentId: string): Promise<void> {
    const existing = await this.db
      .selectFrom("builder_accounts")
      .select("id")
      .where("id", "=", documentId)
      .executeTakeFirst();
    if (!existing) {
      await this.db
        .insertInto("builder_accounts")
        .values({
          id: documentId,
          source_drive_id: this.driveId,
          profile_name: null,
          profile_slug: null,
          profile_logo: null,
          profile_description: null,
          profile_socials_x: null,
          profile_socials_github: null,
          profile_socials_website: null,
        })
        .execute();
    }
  }

  private async setField(
    documentId: string,
    updates: Partial<{
      profile_name: string | null;
      profile_slug: string | null;
      profile_logo: string | null;
      profile_description: string | null;
      profile_socials_x: string | null;
      profile_socials_github: string | null;
      profile_socials_website: string | null;
    }>,
  ): Promise<void> {
    await this.ensureExists(documentId);
    await this.db
      .updateTable("builder_accounts")
      .set({ ...updates, updated_at: new Date() })
      .where("id", "=", documentId)
      .execute();
  }

  private async handleSetLogo(
    documentId: string,
    action: SetLogoAction,
    _state: BuilderAccountState,
  ): Promise<void> {
    await this.setField(documentId, { profile_logo: action.input.logoUrl ?? null });
  }

  private async handleSetProfileName(
    documentId: string,
    action: SetProfileNameAction,
    _state: BuilderAccountState,
  ): Promise<void> {
    await this.setField(documentId, { profile_name: action.input.name ?? null });
  }

  private async handleSetSlug(
    documentId: string,
    action: SetSlugAction,
    _state: BuilderAccountState,
  ): Promise<void> {
    await this.setField(documentId, { profile_slug: action.input.slug ?? null });
  }

  private async handleSetProfileDescription(
    documentId: string,
    action: SetProfileDescriptionAction,
    _state: BuilderAccountState,
  ): Promise<void> {
    await this.setField(documentId, {
      profile_description: action.input.description ?? null,
    });
  }

  private async handleUpdateSocials(
    documentId: string,
    action: UpdateSocialsAction,
    _state: BuilderAccountState,
  ): Promise<void> {
    const updates: Partial<{
      profile_socials_x: string | null;
      profile_socials_github: string | null;
      profile_socials_website: string | null;
    }> = {};
    if (action.input.x !== undefined) updates.profile_socials_x = action.input.x ?? null;
    if (action.input.github !== undefined)
      updates.profile_socials_github = action.input.github ?? null;
    if (action.input.website !== undefined)
      updates.profile_socials_website = action.input.website ?? null;
    if (Object.keys(updates).length > 0) {
      await this.setField(documentId, updates);
    }
  }
}
