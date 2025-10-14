import { GraphQLClient } from "graphql-request";
import { config } from "../config.js";

// GraphQL Clients
export const renownClient = new GraphQLClient(config.renownGraphqlEndpoint);
export const vetraClient = new GraphQLClient(config.vetraGraphqlEndpoint);

// Renown Profile Queries
export const SEARCH_PROFILES_QUERY = `
  query ($input: GetProfilesInput!) {
    getProfiles(input: $input) {
      documentId
      ethAddress
      updatedAt
      userImage
      username
    }
  }
`;

export const GET_PROFILE_QUERY = `
  query ($input: GetProfileInput!) {
    getProfile(input: $input) {
      documentId
      ethAddress
      updatedAt
      userImage
      username
    }
  }
`;

// Vetra Package Queries
export const SEARCH_PACKAGES_QUERY = `
  query SearchPackages($search: String!) {
    vetraPackages(search: $search) {
      authorName
      name
      githubUrl
      npmUrl
      documentId
      driveId
      description
    }
  }
`;

export const SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY = `
  query SearchPackagesByDocumentId($documentIds: [PHID!]) {
    vetraPackages(documentId_in: $documentIds) {
      authorName
      name
      githubUrl
      npmUrl
      documentId
      driveId
      description
    }
  }
`;
