const getEnvVar = (key: string, defaultValue: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const value = process.env[key];
  return typeof value === "string" ? value : defaultValue;
};

export const config = {
  renownGraphqlEndpoint: getEnvVar(
    "VETRA_RENOWN_GRAPHQL_ENDPOINT",
    "https://switchboard.renown-staging.vetra.io/graphql"
  ),
  vetraGraphqlEndpoint: getEnvVar(
    "VETRA_VETRA_GRAPHQL_ENDPOINT",
    "https://switchboard.staging.vetra.io/graphql"
  ),
  renownProfileBasePath: getEnvVar(
    "VETRA_RENOWN_PROFILE_BASE_PATH",
    "phd://renown-staging.vetra.to/"
  ),
  vetraPackageBasePath: getEnvVar(
    "VETRA_VETRA_PACKAGE_BASE_PATH",
    "phd://staging.vetra.to/"
  ),
};
