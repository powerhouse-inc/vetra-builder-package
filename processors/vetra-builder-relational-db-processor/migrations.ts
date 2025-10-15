import { type IRelationalDb } from "document-drive/processors/types";
import type { DB } from "./schema.js";

export async function up(db: IRelationalDb<DB>): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    await down(db);
  }

  // Create builder_teams table
  await db.schema
    .createTable("builder_teams")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("profile_name", "varchar(255)", (col) => col.notNull())
    .addColumn("profile_slug", "varchar(255)", (col) => col.notNull())
    .addColumn("profile_logo", "text")
    .addColumn("profile_description", "text")
    .addColumn("profile_socials_x", "text")
    .addColumn("profile_socials_github", "text")
    .addColumn("profile_socials_website", "text")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .ifNotExists()
    .execute();

  // Create builder_team_members table
  await db.schema
    .createTable("builder_team_members")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("builder_team_id", "varchar(255)", (col) => col.notNull())
    .addColumn("eth_address", "varchar(42)", (col) => col.notNull()) // Ethereum addresses are 42 chars
    .addColumn("phid", "varchar(255)") // Powerhouse ID for Renown integration
    .addColumn("name", "varchar(255)") // Member name
    .addColumn("profile_image", "text") // Profile image URL
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addForeignKeyConstraint(
      "builder_team_members_account_fk",
      ["builder_team_id"],
      "builder_teams",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create builder_team_spaces table
  await db.schema
    .createTable("builder_team_spaces")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("builder_team_id", "varchar(255)", (col) => col.notNull())
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("sort_order", "integer", (col) => col.defaultTo(0).notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addForeignKeyConstraint(
      "builder_team_spaces_account_fk",
      ["builder_team_id"],
      "builder_teams",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create builder_team_packages table
  await db.schema
    .createTable("builder_team_packages")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("space_id", "varchar(255)", (col) => col.notNull())
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("category", "varchar(255)")
    .addColumn("author_name", "varchar(255)", (col) => col.notNull())
    .addColumn("author_website", "text")
    .addColumn("github_url", "text")
    .addColumn("npm_url", "text")
    .addColumn("vetra_drive_url", "text")
    .addColumn("drive_id", "varchar(255)") // For SetPackageDriveId operation
    .addColumn("sort_order", "integer", (col) => col.defaultTo(0).notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addForeignKeyConstraint(
      "builder_team_packages_space_fk",
      ["space_id"],
      "builder_team_spaces",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create builder_team_package_keywords table
  await db.schema
    .createTable("builder_team_package_keywords")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("package_id", "varchar(255)", (col) => col.notNull())
    .addColumn("label", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addForeignKeyConstraint(
      "builder_team_package_keywords_package_fk",
      ["package_id"],
      "builder_team_packages",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create deleted_files table
  await db.schema
    .createTable("deleted_files")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("document_id", "varchar(255)", (col) => col.notNull())
    .addColumn("drive_id", "varchar(255)", (col) => col.notNull())
    .addColumn("deleted_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .ifNotExists()
    .execute();

  // Create indexes for better performance
  await db.schema
    .createIndex("idx_builder_teams_slug")
    .on("builder_teams")
    .column("profile_slug")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_members_account")
    .on("builder_team_members")
    .column("builder_team_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_members_eth_address")
    .on("builder_team_members")
    .column("eth_address")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_members_phid")
    .on("builder_team_members")
    .column("phid")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_spaces_account")
    .on("builder_team_spaces")
    .column("builder_team_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_spaces_sort_order")
    .on("builder_team_spaces")
    .column("sort_order")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_packages_space")
    .on("builder_team_packages")
    .column("space_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_packages_sort_order")
    .on("builder_team_packages")
    .column("sort_order")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_team_package_keywords_package")
    .on("builder_team_package_keywords")
    .column("package_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_deleted_files_document_id")
    .on("deleted_files")
    .column("document_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_deleted_files_drive_id")
    .on("deleted_files")
    .column("drive_id")
    .ifNotExists()
    .execute();
}

export async function down(db: IRelationalDb<DB>): Promise<void> {
  // Drop tables in reverse order due to foreign key constraints
  await db.schema.dropTable("deleted_files").ifExists().execute();
  await db.schema
    .dropTable("builder_team_package_keywords")
    .ifExists()
    .execute();
  await db.schema.dropTable("builder_team_packages").ifExists().execute();
  await db.schema.dropTable("builder_team_spaces").ifExists().execute();
  await db.schema.dropTable("builder_team_members").ifExists().execute();
  await db.schema.dropTable("builder_teams").ifExists().execute();
}
