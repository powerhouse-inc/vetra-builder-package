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
  id: Scalars["OID"]["input"];
};

export type AddPackageInput = {
  id: Scalars["OID"]["input"];
  spaceId: Scalars["OID"]["input"];
};

export type AddSpaceInput = {
  id: Scalars["OID"]["input"];
};

export type BuilderTeamState = {
  members: Array<RenownProfileInfo>;
  profile: VetraBuilderProfile;
  spaces: Array<VetraBuilderSpace>;
};

export type RemoveMemberInput = {
  id: Scalars["OID"]["input"];
};

export type RemovePackageInput = {
  id: Scalars["OID"]["input"];
};

export type RemoveSpaceInput = {
  id: Scalars["OID"]["input"];
};

export type RenownProfileInfo = {
  ethAddress: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
  phid: Maybe<Scalars["PHID"]["output"]>;
  profileImage: Maybe<Scalars["String"]["output"]>;
};

export type ReorderPackagesInput = {
  packageIds: Array<Scalars["OID"]["input"]>;
  spaceId: Scalars["OID"]["input"];
  targetIndex: Scalars["Int"]["input"];
};

export type ReorderSpacesInput = {
  spaceIds: Array<Scalars["OID"]["input"]>;
  targetIndex: Scalars["Int"]["input"];
};

export type SetDescriptionInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetLogoInput = {
  logo?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetSlugInput = {
  slug: Scalars["String"]["input"];
};

export type SetSocialsInput = {
  github?: InputMaybe<Scalars["String"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
  xProfile?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetTeamNameInput = {
  name: Scalars["String"]["input"];
};

export type UpdateMemberInfoInput = {
  ethAddress?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  phid?: InputMaybe<Scalars["PHID"]["input"]>;
  profileImage?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdatePackageInfoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  github?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  npm?: InputMaybe<Scalars["String"]["input"]>;
  phid?: InputMaybe<Scalars["PHID"]["input"]>;
  spaceId?: InputMaybe<Scalars["OID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  vetraDriveUrl?: InputMaybe<Scalars["URL"]["input"]>;
};

export type UpdateSpaceInfoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
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
  packages: Array<VetraPackageInfo>;
  title: Scalars["String"]["output"];
};

export type VetraPackageInfo = {
  description: Maybe<Scalars["String"]["output"]>;
  github: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  npm: Maybe<Scalars["String"]["output"]>;
  phid: Maybe<Scalars["PHID"]["output"]>;
  title: Maybe<Scalars["String"]["output"]>;
  vetraDriveUrl: Maybe<Scalars["URL"]["output"]>;
};
