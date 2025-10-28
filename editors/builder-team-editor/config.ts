export const config = {
  renownGraphqlEndpoint:
    import.meta.env.PH_CONNECT_VETRA_RENOWN_GRAPHQL_ENDPOINT ||
    "https://switchboard.renown-staging.vetra.io/graphql",
  vetraGraphqlEndpoint:
    import.meta.env.PH_CONNECT_VETRA_VETRA_GRAPHQL_ENDPOINT ||
    "https://switchboard.staging.vetra.io/graphql",
  renownProfileBasePath:
    import.meta.env.PH_CONNECT_VETRA_RENOWN_PROFILE_BASE_PATH ||
    "phd://renown-staging.vetra.to",
  vetraPackageBasePath:
    import.meta.env.PH_CONNECT_VETRA_VETRA_PACKAGE_BASE_PATH ||
    "phd://staging.vetra.to",
  vetraDriveBaseUrl:
    import.meta.env.PH_CONNECT_VETRA_DRIVE_BASE_URL ||
    "https://switchboard.staging.vetra.io/d",
};
