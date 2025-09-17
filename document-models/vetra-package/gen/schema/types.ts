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

export type AddKeywordsInput = {
  /** Add your inputs here */
  id?: InputMaybe<Scalars["OID"]["input"]>;
  label: Scalars["String"]["input"];
};

export type RemoveKeywordsInput = {
  /** Add your inputs here */
  id: Scalars["OID"]["input"];
};

export type SetAuthorInput = {
  /** Add your inputs here */
  name: Scalars["String"]["input"];
  website?: InputMaybe<Scalars["URL"]["input"]>;
};

export type SetPackageCategoryInput = {
  /** Add your inputs here */
  category: Scalars["String"]["input"];
};

export type SetPackageDescriptionInput = {
  /** Add your inputs here */
  description: Scalars["String"]["input"];
};

export type SetPackageGithubInput = {
  /** Add your inputs here */
  github: Scalars["URL"]["input"];
};

export type SetPackageNameInput = {
  /** Add your inputs here */
  name: Scalars["String"]["input"];
};

export type SetPackageNpmInput = {
  /** Add your inputs here */
  npm: Scalars["URL"]["input"];
};

export type VetraBuilderPackageAuthor = {
  name: Scalars["String"]["output"];
  website: Maybe<Scalars["URL"]["output"]>;
};

export type VetraBuilderPackageKeyword = {
  id: Scalars["OID"]["output"];
  label: Scalars["String"]["output"];
};

export type VetraPackageState = {
  author: VetraBuilderPackageAuthor;
  category: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  github: Maybe<Scalars["URL"]["output"]>;
  keywords: Array<VetraBuilderPackageKeyword>;
  name: Scalars["String"]["output"];
  npm: Maybe<Scalars["URL"]["output"]>;
};
