// Type definitions for package action inputs (matching @powerhousedao/vetra schema)
export interface SetPackageNameInput {
  name: string;
}

export interface SetPackageDescriptionInput {
  description: string;
}

export interface SetPackageCategoryInput {
  category: string;
}

export interface SetPackageAuthorInput {
  name?: string | null;
  website?: string | null;
}

export interface SetPackageAuthorNameInput {
  name: string;
}

export interface SetPackageAuthorWebsiteInput {
  website: string;
}

export interface AddPackageKeywordInput {
  id: string;
  label: string;
}

export interface RemovePackageKeywordInput {
  id: string;
}

export interface SetPackageGithubUrlInput {
  url: string;
}

export interface SetPackageNpmUrlInput {
  url: string;
}
