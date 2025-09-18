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
    id: OID!
    title: String!
    description: String
    packages: [VetraBuilderPackage!]!
  }

  type VetraBuilderPackage {
    id: OID!
    name: String!
    description: String
    category: String
    author: VetraBuilderPackageAuthor!
    keywords: [VetraBuilderPackageKeyword!]!
    github: URL
    npm: URL
    vetraDriveUrl: URL
  }

  type VetraBuilderPackageAuthor {
    name: String!
    website: URL
  }

  type VetraBuilderPackageKeyword {
    id: OID!
    label: String!
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
    BuilderAccount_updateSocials(
      driveId: String
      docId: PHID
      input: BuilderAccount_UpdateSocialsInput
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
    BuilderAccount_deleteSpace(
      driveId: String
      docId: PHID
      input: BuilderAccount_DeleteSpaceInput
    ): Int
    BuilderAccount_setSpaceTitle(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetSpaceTitleInput
    ): Int
    BuilderAccount_setSpaceDescription(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetSpaceDescriptionInput
    ): Int
    BuilderAccount_reorderSpaces(
      driveId: String
      docId: PHID
      input: BuilderAccount_ReorderSpacesInput
    ): Int
    BuilderAccount_addPackage(
      driveId: String
      docId: PHID
      input: BuilderAccount_AddPackageInput
    ): Int
    BuilderAccount_setPackageDriveId(
      driveId: String
      docId: PHID
      input: BuilderAccount_SetPackageDriveIdInput
    ): Int
    BuilderAccount_updatePackage(
      driveId: String
      docId: PHID
      input: BuilderAccount_UpdatePackageInput
    ): Int
    BuilderAccount_reorderPackages(
      driveId: String
      docId: PHID
      input: BuilderAccount_ReorderPackagesInput
    ): Int
    BuilderAccount_deletePackage(
      driveId: String
      docId: PHID
      input: BuilderAccount_DeletePackageInput
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
  input BuilderAccount_UpdateSocialsInput {
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
  input BuilderAccount_DeleteSpaceInput {
    "Add your inputs here"
    id: OID!
  }
  input BuilderAccount_SetSpaceTitleInput {
    "Add your inputs here"
    id: OID!
    newTitle: String!
  }
  input BuilderAccount_SetSpaceDescriptionInput {
    "Add your inputs here"
    id: OID!
    description: String!
  }
  input BuilderAccount_ReorderSpacesInput {
    "Add your inputs here"
    ids: [OID!]!
    insertAfter: OID
  }

  """
  Module: Packages
  """
  input BuilderAccount_AuthorInput {
    name: String!
    website: URL
  }

  input AddPackageInput {
    "Add your inputs here"
    spaceId: OID!
    name: String!
    description: String
    category: String
    author: AuthorInput
    keywords: [String!]
    github: URL
    npm: URL
    vetraDriveUrl: URL
  }
  input BuilderAccount_SetPackageDriveIdInput {
    "Add your inputs here"
    packageId: OID!
    driveId: String
  }
  input BuilderAccount_UpdatePackageInput {
    "Add your inputs here"
    id: OID!
    title: String
    description: String
  }
  input BuilderAccount_ReorderPackagesInput {
    "Add your inputs here"
    spaceId: OID!
    ids: [OID!]!
    insertAfter: OID
  }
  input BuilderAccount_DeletePackageInput {
    "Add your inputs here"
    id: OID!
  }
`;
