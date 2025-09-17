import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for BuilderAccount (powerhouse/vetra/builder-account)
  """
  type BuilderAccountState {
    profile: VetraBuilderProfile!
    members: [EthereumAddress!]!
    spaces: [VetraBuilderSpace!]!
  }

  type VetraBuilderProfile {
    logo: URL
    name: String!
    slug: String!
    description: String
    socials: VetraBuilderSocials!
  }

  type VetraBuilderSocials {
    xProfile: URL
    github: URL
    website: URL
  }

  type VetraBuilderSpace {
    title: String!
    description: String
    packages: [PHID!]!
  }

  """
  Queries: BuilderAccount
  """
  type BuilderAccountQueries {
    getDocument(docId: PHID!, driveId: PHID): BuilderAccount
    getDocuments(driveId: String!): [BuilderAccount!]
  }

  type Query {
    BuilderAccount: BuilderAccountQueries
  }

  """
  Mutations: BuilderAccount
  """
  type Mutation {
    BuilderAccount_createDocument(name: String!, driveId: String): String

    BuilderAccount_setLogo(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetLogoInput
    ): Int
    BuilderAccount_setProfileName(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetProfileNameInput
    ): Int
    BuilderAccount_setSlug(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetSlugInput
    ): Int
    BuilderAccount_setProfileDescription(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetProfileDescriptionInput
    ): Int
    BuilderAccount_setSocials(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetSocialsInput
    ): Int
    BuilderAccount_addMember(
      driveId: String
      docId: PHID
      input: BuilderAccount_AddMemberInput
    ): Int
    BuilderAccount_removeMember(
      driveId: String
      docId: PHID
      input: BuilderAccount_RemoveMemberInput
    ): Int
    BuilderAccount_addSpace(
      driveId: String
      docId: PHID
      input: BuilderAccount_AddSpaceInput
    ): Int
    BuilderAccount_removeSpace(
      driveId: String
      docId: PHID
      input: BuilderAccount_RemoveSpaceInput
    ): Int
    BuilderAccount_addPackageToSpace(
      driveId: String
      docId: PHID
      input: BuilderAccount_AddPackageToSpaceInput
    ): Int
    BuilderAccount_removePackageFromSpace(
      driveId: String
      docId: PHID
      input: BuilderAccount_RemovePackageFromSpaceInput
    ): Int
  }

  """
  Module: Profile
  """
  input BuilderAccount_SetLogoInput {
    "Add your inputs here"
    logoUrl: String!
  }
  input BuilderAccount_SetProfileNameInput {
    "Add your inputs here"
    name: String!
  }
  input BuilderAccount_SetSlugInput {
    "Add your inputs here"
    slug: String!
  }
  input BuilderAccount_SetProfileDescriptionInput {
    "Add your inputs here"
    description: String
  }
  input BuilderAccount_SetSocialsInput {
    "Add your inputs here"
    x: URL
    github: URL
    website: URL
  }

  """
  Module: Members
  """
  input BuilderAccount_AddMemberInput {
    "Add your inputs here"
    ethAddress: EthereumAddress
  }
  input BuilderAccount_RemoveMemberInput {
    "Add your inputs here"
    ethAddress: EthereumAddress
  }

  """
  Module: Spaces
  """
  input BuilderAccount_AddSpaceInput {
    "Add your inputs here"
    title: String!
    description: String
  }
  input BuilderAccount_RemoveSpaceInput {
    "Add your inputs here"
    slug: String
  }
  input BuilderAccount_AddPackageToSpaceInput {
    "Add your inputs here"
    spaceSlug: String!
    package: PHID!
  }
  input BuilderAccount_RemovePackageFromSpaceInput {
    "Add your inputs here"
    spaceSlug: String!
    package: PHID!
  }
`;
