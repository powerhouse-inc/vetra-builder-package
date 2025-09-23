import { type IRelationalDb } from "document-drive/processors/types";

export async function up(db: IRelationalDb<any>): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    await down(db);
  }

  // Create builder_accounts table
  await db.schema
    .createTable("builder_accounts")
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

  // Create builder_account_members table
  await db.schema
    .createTable("builder_account_members")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("builder_account_id", "varchar(255)", (col) => col.notNull())
    .addColumn("eth_address", "varchar(42)", (col) => col.notNull()) // Ethereum addresses are 42 chars
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addForeignKeyConstraint(
      "builder_account_members_account_fk",
      ["builder_account_id"],
      "builder_accounts",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create builder_spaces table
  await db.schema
    .createTable("builder_spaces")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("builder_account_id", "varchar(255)", (col) => col.notNull())
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
      "builder_spaces_account_fk",
      ["builder_account_id"],
      "builder_accounts",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create builder_packages table
  await db.schema
    .createTable("builder_packages")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("space_id", "varchar(255)", (col) => col.notNull())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
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
      "builder_packages_space_fk",
      ["space_id"],
      "builder_spaces",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create builder_package_keywords table
  await db.schema
    .createTable("builder_package_keywords")
    .addColumn("id", "varchar(255)", (col) => col.primaryKey())
    .addColumn("package_id", "varchar(255)", (col) => col.notNull())
    .addColumn("label", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addForeignKeyConstraint(
      "builder_package_keywords_package_fk",
      ["package_id"],
      "builder_packages",
      ["id"],
      (cb) => cb.onDelete("cascade")
    )
    .ifNotExists()
    .execute();

  // Create indexes for better performance
  await db.schema
    .createIndex("idx_builder_accounts_slug")
    .on("builder_accounts")
    .column("profile_slug")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_account_members_account")
    .on("builder_account_members")
    .column("builder_account_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_account_members_eth_address")
    .on("builder_account_members")
    .column("eth_address")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_spaces_account")
    .on("builder_spaces")
    .column("builder_account_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_spaces_sort_order")
    .on("builder_spaces")
    .column("sort_order")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_packages_space")
    .on("builder_packages")
    .column("space_id")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_packages_sort_order")
    .on("builder_packages")
    .column("sort_order")
    .ifNotExists()
    .execute();

  await db.schema
    .createIndex("idx_builder_package_keywords_package")
    .on("builder_package_keywords")
    .column("package_id")
    .ifNotExists()
    .execute();
}

export async function down(db: IRelationalDb<any>): Promise<void> {
  // Drop tables in reverse order due to foreign key constraints
  await db.schema.dropTable("builder_package_keywords").ifExists().execute();
  await db.schema.dropTable("builder_packages").ifExists().execute();
  await db.schema.dropTable("builder_spaces").ifExists().execute();
  await db.schema.dropTable("builder_account_members").ifExists().execute();
  await db.schema.dropTable("builder_accounts").ifExists().execute();
}
