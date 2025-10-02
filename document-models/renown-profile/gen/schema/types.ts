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

export type AddAuthorizationInput = {
  audience?: InputMaybe<Scalars["String"]["input"]>;
  expiry?: InputMaybe<Scalars["Int"]["input"]>;
  /** Add your inputs here */
  id: Scalars["OID"]["input"];
  issuer: Scalars["String"]["input"];
  subject: Scalars["String"]["input"];
};

export type RenownAuthorization = {
  audience: Maybe<Scalars["String"]["output"]>;
  expiry: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["OID"]["output"];
  issuer: Scalars["String"]["output"];
  subject: Scalars["String"]["output"];
};

export type RenownProfileState = {
  authorizations: Array<RenownAuthorization>;
  ethAddress: Maybe<Scalars["EthereumAddress"]["output"]>;
  userImage: Maybe<Scalars["String"]["output"]>;
  /** Add your global state fields here */
  username: Maybe<Scalars["String"]["output"]>;
};

export type RevokeAuthorizationInput = {
  /** Add your inputs here */
  authorizationId: Scalars["OID"]["input"];
};

export type SetEthAddressInput = {
  /** Add your inputs here */
  ethAddress: Scalars["EthereumAddress"]["input"];
};

export type SetUserImageInput = {
  /** Add your inputs here */
  userImage?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetUsernameInput = {
  /** Add your inputs here */
  username: Scalars["String"]["input"];
};
