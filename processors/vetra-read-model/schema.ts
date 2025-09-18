export interface BuilderAccount {
  id: string;
  profile_name: string;
  profile_slug: string;
  profile_logo: string | null;
  profile_description: string | null;
  profile_socials_x: string | null;
  profile_socials_github: string | null;
  profile_socials_website: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface BuilderAccountMember {
  id: string;
  builder_account_id: string;
  eth_address: string;
  created_at: Date;
}

export interface BuilderSpace {
  id: string;
  builder_account_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface BuilderPackage {
  id: string;
  space_id: string;
  name: string;
  description: string | null;
  category: string | null;
  author_name: string;
  author_website: string | null;
  github_url: string | null;
  npm_url: string | null;
  vetra_drive_url: string | null;
  drive_id: string | null;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface BuilderPackageKeyword {
  id: string;
  package_id: string;
  label: string;
  created_at: Date;
}

export interface DB {
  builder_accounts: BuilderAccount;
  builder_account_members: BuilderAccountMember;
  builder_spaces: BuilderSpace;
  builder_packages: BuilderPackage;
  builder_package_keywords: BuilderPackageKeyword;
}
