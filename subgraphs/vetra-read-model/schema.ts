import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for Vetra Read Model
  """
  type BuilderAccountType {
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
    spaces: [BuilderSpace!]!
    members: [BuilderAccountMember!]!
  }

  type BuilderSpace {
    id: String!
    builderAccountId: String!
    title: String!
    description: String
    sortOrder: Int!
    createdAt: String!
    updatedAt: String!
    packages: [BuilderPackage!]!
  }

  type BuilderPackage {
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
    keywords: [BuilderPackageKeyword!]!
  }

  type BuilderPackageKeyword {
    id: String!
    packageId: String!
    label: String!
    createdAt: String!
  }

  type BuilderAccountMember {
    id: String!
    builderAccountId: String!
    ethAddress: String!
    createdAt: String!
  }

  type Query {
    example(driveId: String!): String
    fetchAllBuilderAccounts(driveId: String): [BuilderAccountType!]!
    fetchBuilderAccount(driveId: String, id: String!): BuilderAccountType
  }
`;
