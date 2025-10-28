const getEnvVar = (key: keyof ImportMetaEnv, defaultValue: string): string => {
  return import.meta.env[key] ?? defaultValue;
};

export const config = {
  renownGraphqlEndpoint: getEnvVar(
    "PH_CONNECT_VETRA_RENOWN_GRAPHQL_ENDPOINT",
    "https://switchboard.renown-staging.vetra.io/graphql"
  ),
  vetraGraphqlEndpoint: getEnvVar(
    "PH_CONNECT_VETRA_VETRA_GRAPHQL_ENDPOINT",
    "https://switchboard.staging.vetra.io/graphql"
  ),
  renownProfileBasePath: getEnvVar(
    "PH_CONNECT_VETRA_RENOWN_PROFILE_BASE_PATH",
    "phd://renown-staging.vetra.to"
  ),
  vetraPackageBasePath: getEnvVar(
    "PH_CONNECT_VETRA_VETRA_PACKAGE_BASE_PATH",
    "phd://staging.vetra.to"
  ),
  vetraDriveBaseUrl: getEnvVar(
    "PH_CONNECT_VETRA_DRIVE_BASE_URL",
    "https://switchboard.staging.vetra.io/d"
  ),
};
