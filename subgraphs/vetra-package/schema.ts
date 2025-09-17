import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for VetraPackage (powerhouse/vetra/package)
  """
  type VetraPackageState {
    name: String!
    description: String
    category: String
    author: VetraBuilderPackageAuthor!
    keywords: [VetraBuilderPackageKeyword!]!
    github: URL
    npm: URL
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
  Queries: VetraPackage
  """
  type VetraPackageQueries {
    getDocument(docId: PHID!, driveId: PHID): VetraPackage
    getDocuments(driveId: String!): [VetraPackage!]
  }

  type Query {
    VetraPackage: VetraPackageQueries
  }

  """
  Mutations: VetraPackage
  """
  type Mutation {
    VetraPackage_createDocument(name: String!, driveId: String): String

    VetraPackage_setPackageName(
      driveId: String
      docId: PHID
      input: VetraPackage_SetPackageNameInput
    ): Int
    VetraPackage_setPackageDescription(
      driveId: String
      docId: PHID
      input: VetraPackage_SetPackageDescriptionInput
    ): Int
    VetraPackage_setPackageCategory(
      driveId: String
      docId: PHID
      input: VetraPackage_SetPackageCategoryInput
    ): Int
    VetraPackage_setPackageGithub(
      driveId: String
      docId: PHID
      input: VetraPackage_SetPackageGithubInput
    ): Int
    VetraPackage_setPackageNpm(
      driveId: String
      docId: PHID
      input: VetraPackage_SetPackageNpmInput
    ): Int
    VetraPackage_setAuthor(
      driveId: String
      docId: PHID
      input: VetraPackage_SetAuthorInput
    ): Int
    VetraPackage_addKeywords(
      driveId: String
      docId: PHID
      input: VetraPackage_AddKeywordsInput
    ): Int
    VetraPackage_removeKeywords(
      driveId: String
      docId: PHID
      input: VetraPackage_RemoveKeywordsInput
    ): Int
  }

  """
  Module: Meta
  """
  input VetraPackage_SetPackageNameInput {
    "Add your inputs here"
    name: String!
  }
  input VetraPackage_SetPackageDescriptionInput {
    "Add your inputs here"
    description: String!
  }
  input VetraPackage_SetPackageCategoryInput {
    "Add your inputs here"
    category: String!
  }
  input VetraPackage_SetPackageGithubInput {
    "Add your inputs here"
    github: URL!
  }
  input VetraPackage_SetPackageNpmInput {
    "Add your inputs here"
    npm: URL!
  }
  input VetraPackage_SetAuthorInput {
    "Add your inputs here"
    name: String!
    website: URL
  }
  input VetraPackage_AddKeywordsInput {
    "Add your inputs here"
    id: OID
    label: String!
  }
  input VetraPackage_RemoveKeywordsInput {
    "Add your inputs here"
    id: OID!
  }
`;
