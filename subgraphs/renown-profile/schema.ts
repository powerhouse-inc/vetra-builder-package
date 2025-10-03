import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for RenownProfile (powerhouse/renown-profile)
  """
  type RenownProfileState {
    "Add your global state fields here"
    documentId: String
    username: String
    ethAddress: EthereumAddress
    userImage: String
    authorizations: [RenownAuthorization!]!
  }

  # Issuer is ETH Address
  # Subject is the DID for Connect
  # Audience is the target ie did:web:staging.vetra.io
  # expiry
  type RenownAuthorization {
    id: OID!
    audience: String
    issuer: String!
    subject: String!
    expiry: Int
  }

  """
  Queries: RenownProfile
  """
  type RenownProfileQueries {
    getProfile(ethAddress: String!, driveId: String!): RenownProfileState
    getDocument(docId: PHID!, driveId: PHID): RenownProfile
    getDocuments(driveId: String!): [RenownProfile!]
  }

  type Query {
    Renown: RenownProfileQueries
  }

  """
  Mutations: RenownProfile
  """
  type Mutation {
    RenownProfile_createDocument(name: String!, driveId: String): String

    RenownProfile_setUsername(
      driveId: String
      docId: PHID
      input: RenownProfile_SetUsernameInput
    ): Int
    RenownProfile_setEthAddress(
      driveId: String
      docId: PHID
      input: RenownProfile_SetEthAddressInput
    ): Int
    RenownProfile_setUserImage(
      driveId: String
      docId: PHID
      input: RenownProfile_SetUserImageInput
    ): Int
    RenownProfile_addAuthorization(
      driveId: String
      docId: PHID
      input: RenownProfile_AddAuthorizationInput
    ): Int
    RenownProfile_revokeAuthorization(
      driveId: String
      docId: PHID
      input: RenownProfile_RevokeAuthorizationInput
    ): Int
  }

  """
  Module: Profile
  """
  input RenownProfile_SetUsernameInput {
    "Add your inputs here"
    username: String!
  }
  input RenownProfile_SetEthAddressInput {
    "Add your inputs here"
    ethAddress: EthereumAddress!
  }
  input RenownProfile_SetUserImageInput {
    "Add your inputs here"
    userImage: String
  }

  """
  Module: Authorization
  """
  input RenownProfile_AddAuthorizationInput {
    "Add your inputs here"
    id: OID!
    audience: String
    issuer: String!
    subject: String!
    expiry: Int
  }
  input RenownProfile_RevokeAuthorizationInput {
    "Add your inputs here"
    authorizationId: OID!
  }
`;
