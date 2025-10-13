import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for BuilderTeam (powerhouse/builder-team)
  """
  type BuilderTeamState {
    profile: VetraBuilderProfile!
    members: [RenownProfileInfo!]!
    spaces: [VetraBuilderSpace!]!
  }

  type RenownProfileInfo {
    id: OID!
    phid: PHID
    ethAddress: String
    name: String
    profileImage: String
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
    packages: [VetraPackageInfo!]!
  }

  type VetraPackageInfo {
    id: OID!
    phid: PHID
    title: String
    description: String
    github: String
    npm: String
    vetraDriveUrl: URL
  }

  """
  Queries: BuilderTeam
  """
  type BuilderTeamQueries {
    getDocument(docId: PHID!, driveId: PHID): BuilderTeam
    getDocuments(driveId: String!): [BuilderTeam!]
  }

  type Query {
    BuilderTeam: BuilderTeamQueries
  }

  """
  Mutations: BuilderTeam
  """
  type Mutation {
    BuilderTeam_createDocument(name: String!, driveId: String): String

    BuilderTeam_setLogo(
      driveId: String
      docId: PHID
      input: BuilderTeam_SetLogoInput
    ): Int
    BuilderTeam_setTeamName(
      driveId: String
      docId: PHID
      input: BuilderTeam_SetTeamNameInput
    ): Int
    BuilderTeam_setSlug(
      driveId: String
      docId: PHID
      input: BuilderTeam_SetSlugInput
    ): Int
    BuilderTeam_setDescription(
      driveId: String
      docId: PHID
      input: BuilderTeam_SetDescriptionInput
    ): Int
    BuilderTeam_setSocials(
      driveId: String
      docId: PHID
      input: BuilderTeam_SetSocialsInput
    ): Int
    BuilderTeam_addMember(
      driveId: String
      docId: PHID
      input: BuilderTeam_AddMemberInput
    ): Int
    BuilderTeam_updateMemberInfo(
      driveId: String
      docId: PHID
      input: BuilderTeam_UpdateMemberInfoInput
    ): Int
    BuilderTeam_removeMember(
      driveId: String
      docId: PHID
      input: BuilderTeam_RemoveMemberInput
    ): Int
    BuilderTeam_addSpace(
      driveId: String
      docId: PHID
      input: BuilderTeam_AddSpaceInput
    ): Int
    BuilderTeam_updateSpaceInfo(
      driveId: String
      docId: PHID
      input: BuilderTeam_UpdateSpaceInfoInput
    ): Int
    BuilderTeam_removeSpace(
      driveId: String
      docId: PHID
      input: BuilderTeam_RemoveSpaceInput
    ): Int
    BuilderTeam_addPackage(
      driveId: String
      docId: PHID
      input: BuilderTeam_AddPackageInput
    ): Int
    BuilderTeam_updatePackageInfo(
      driveId: String
      docId: PHID
      input: BuilderTeam_UpdatePackageInfoInput
    ): Int
    BuilderTeam_removePackage(
      driveId: String
      docId: PHID
      input: BuilderTeam_RemovePackageInput
    ): Int
  }

  """
  Module: Profile
  """
  input BuilderTeam_SetLogoInput {
    "Add your inputs here"
    logo: String
  }
  input BuilderTeam_SetTeamNameInput {
    "Add your inputs here"
    name: String!
  }
  input BuilderTeam_SetSlugInput {
    "Add your inputs here"
    slug: String!
  }
  input BuilderTeam_SetDescriptionInput {
    "Add your inputs here"
    description: String
  }
  input BuilderTeam_SetSocialsInput {
    "Add your inputs here"
    xProfile: String
    github: String
    website: String
  }

  """
  Module: Member
  """
  input BuilderTeam_AddMemberInput {
    "Add your inputs here"
    id: OID!
  }
  input BuilderTeam_UpdateMemberInfoInput {
    "Add your inputs here"
    id: OID!
    phid: PHID
    ethAddress: String
    name: String
    profileImage: String
  }
  input BuilderTeam_RemoveMemberInput {
    "Add your inputs here"
    id: OID!
  }

  """
  Module: Spaces
  """
  input BuilderTeam_AddSpaceInput {
    "Add your inputs here"
    id: OID!
  }
  input BuilderTeam_UpdateSpaceInfoInput {
    "Add your inputs here"
    id: OID!
    title: String
    description: String
  }
  input BuilderTeam_RemoveSpaceInput {
    "Add your inputs here"
    id: OID!
  }

  """
  Module: Packages
  """
  input BuilderTeam_AddPackageInput {
    "Add your inputs here"
    id: OID!
    spaceId: OID!
  }
  input BuilderTeam_UpdatePackageInfoInput {
    "Add your inputs here"
    id: OID!
    spaceId: OID
    phid: PHID
    title: String
    description: String
    github: String
    npm: String
    vetraDriveUrl: URL
  }
  input BuilderTeam_RemovePackageInput {
    "Add your inputs here"
    id: OID!
  }
`;
