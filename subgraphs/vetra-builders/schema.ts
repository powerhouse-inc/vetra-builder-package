import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for Vetra Read Model
  """
  type BuilderTeamType {
    id: String!
    profileName: String!
    profileSlug: String!
    profileLogo: String
    profileDescription: String
    profileSocialsX: String
    profileSocialsGithub: String
    profileSocialsWebsite: String
    createdAt: String!
    updatedAt: String!
    spaces: [BuilderTeamSpace!]!
    members: [BuilderTeamMember!]!
  }

  type BuilderTeamSpace {
    id: String!
    builderAccountId: String!
    title: String!
    description: String
    sortOrder: Int!
    createdAt: String!
    updatedAt: String!
    packages: [BuilderTeamPackage!]!
  }

  type BuilderTeamPackage {
    id: String!
    spaceId: String!
    name: String!
    description: String
    category: String
    authorName: String!
    authorWebsite: String
    githubUrl: String
    npmUrl: String
    vetraDriveUrl: String
    driveId: String
    sortOrder: Int!
    createdAt: String!
    updatedAt: String!
    keywords: [BuilderTeamPackageKeyword!]!
  }

  type BuilderTeamPackageKeyword {
    id: String!
    packageId: String!
    label: String!
    createdAt: String!
  }

  type BuilderTeamMember {
    id: String!
    builderAccountId: String!
    ethAddress: String!
    createdAt: String!
  }

  type BuilderTeamFilter {
    profileName: String
    profileSlug: String
    profileLogo: String
    profileDescription: String
  }

  type Query {
    fetchAllBuilderTeams(
      driveId: String
      search: String
      sortOrder: String
    ): [BuilderTeamType!]!
    fetchBuilderTeam(driveId: String, id: String!): BuilderTeamType
  }
`;
