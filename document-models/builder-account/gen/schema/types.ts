export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Upload: { input: File; output: File };
};

export type AddMemberInput = {
  /** Add your inputs here */
  ethAddress?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
};

export type AddPackageInput = {
  author?: InputMaybe<AuthorInput>;
  category?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  github?: InputMaybe<Scalars["URL"]["input"]>;
  keywords?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name: Scalars["String"]["input"];
  npm?: InputMaybe<Scalars["URL"]["input"]>;
  /** Add your inputs here */
  spaceId: Scalars["OID"]["input"];
  vetraDriveUrl?: InputMaybe<Scalars["URL"]["input"]>;
};

export type AddSpaceInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Add your inputs here */
  title: Scalars["String"]["input"];
};

export type AuthorInput = {
  name: Scalars["String"]["input"];
  website?: InputMaybe<Scalars["URL"]["input"]>;
};

export type BuilderAccountState = {
  members: Array<Scalars["EthereumAddress"]["output"]>;
  profile: VetraBuilderProfile;
  spaces: Array<VetraBuilderSpace>;
};

export type DeletePackageInput = {
  /** Add your inputs here */
  id: Scalars["OID"]["input"];
};

export type DeleteSpaceInput = {
  /** Add your inputs here */
  id: Scalars["OID"]["input"];
};

export type RemoveMemberInput = {
  /** Add your inputs here */
  ethAddress?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
};

export type ReorderPackagesInput = {
  ids: Array<Scalars["OID"]["input"]>;
  insertAfter?: InputMaybe<Scalars["OID"]["input"]>;
  /** Add your inputs here */
  spaceId: Scalars["OID"]["input"];
};

export type ReorderSpacesInput = {
  /** Add your inputs here */
  ids: Array<Scalars["OID"]["input"]>;
  insertAfter?: InputMaybe<Scalars["OID"]["input"]>;
};

export type SetLogoInput = {
  /** Add your inputs here */
  logoUrl: Scalars["String"]["input"];
};

export type SetPackageDriveIdInput = {
  driveId?: InputMaybe<Scalars["String"]["input"]>;
  /** Add your inputs here */
  packageId: Scalars["OID"]["input"];
};

export type SetProfileDescriptionInput = {
  /** Add your inputs here */
  description?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetProfileNameInput = {
  /** Add your inputs here */
  name: Scalars["String"]["input"];
};

export type SetSlugInput = {
  /** Add your inputs here */
  slug: Scalars["String"]["input"];
};

export type SetSpaceDescriptionInput = {
  description: Scalars["String"]["input"];
  /** Add your inputs here */
  id: Scalars["OID"]["input"];
};

export type SetSpaceTitleInput = {
  /** Add your inputs here */
  id: Scalars["OID"]["input"];
  newTitle: Scalars["String"]["input"];
};

export type UpdatePackageInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Add your inputs here */
  id: Scalars["OID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateSocialsInput = {
  github?: InputMaybe<Scalars["URL"]["input"]>;
  website?: InputMaybe<Scalars["URL"]["input"]>;
  /** Add your inputs here */
  x?: InputMaybe<Scalars["URL"]["input"]>;
};

export type VetraBuilderPackage = {
  author: VetraBuilderPackageAuthor;
  category: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  github: Maybe<Scalars["URL"]["output"]>;
  id: Maybe<Scalars["PHID"]["output"]>;
  keywords: Array<VetraBuilderPackageKeyword>;
  name: Scalars["String"]["output"];
  npm: Maybe<Scalars["URL"]["output"]>;
  vetraDriveUrl: Maybe<Scalars["URL"]["output"]>;
};

export type VetraBuilderPackageAuthor = {
  name: Scalars["String"]["output"];
  website: Maybe<Scalars["URL"]["output"]>;
};

export type VetraBuilderPackageKeyword = {
  id: Scalars["OID"]["output"];
  label: Scalars["String"]["output"];
};

export type VetraBuilderProfile = {
  description: Maybe<Scalars["String"]["output"]>;
  logo: Maybe<Scalars["URL"]["output"]>;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  socials: VetraBuilderSocials;
};

export type VetraBuilderSocials = {
  github: Maybe<Scalars["URL"]["output"]>;
  website: Maybe<Scalars["URL"]["output"]>;
  xProfile: Maybe<Scalars["URL"]["output"]>;
};

export type VetraBuilderSpace = {
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  packages: Array<VetraBuilderPackage>;
  title: Scalars["String"]["output"];
};
