import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface BuilderTeamMembers {
  builder_team_id: string;
  created_at: Generated<Timestamp>;
  eth_address: string;
  id: string;
}

export interface BuilderTeamPackageKeywords {
  created_at: Generated<Timestamp>;
  id: string;
  label: string;
  package_id: string;
}

export interface BuilderTeamPackages {
  author_name: string;
  author_website: string | null;
  category: string | null;
  created_at: Generated<Timestamp>;
  description: string | null;
  drive_id: string | null;
  github_url: string | null;
  id: string;
  npm_url: string | null;
  sort_order: Generated<number>;
  space_id: string;
  title: string;
  updated_at: Generated<Timestamp>;
  vetra_drive_url: string | null;
}

export interface BuilderTeams {
  created_at: Generated<Timestamp>;
  id: string;
  profile_description: string | null;
  profile_logo: string | null;
  profile_name: string;
  profile_slug: string;
  profile_socials_github: string | null;
  profile_socials_website: string | null;
  profile_socials_x: string | null;
  updated_at: Generated<Timestamp>;
}

export interface BuilderTeamSpaces {
  builder_team_id: string;
  created_at: Generated<Timestamp>;
  description: string | null;
  id: string;
  sort_order: Generated<number>;
  title: string;
  updated_at: Generated<Timestamp>;
}

export interface DeletedFiles {
  deleted_at: Generated<Timestamp>;
  document_id: string;
  drive_id: string;
  id: string;
}

export interface DB {
  builder_team_members: BuilderTeamMembers;
  builder_team_package_keywords: BuilderTeamPackageKeywords;
  builder_team_packages: BuilderTeamPackages;
  builder_team_spaces: BuilderTeamSpaces;
  builder_teams: BuilderTeams;
  deleted_files: DeletedFiles;
}
