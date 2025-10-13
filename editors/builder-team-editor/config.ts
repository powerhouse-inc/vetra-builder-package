const getEnvVar = (key: string, defaultValue: string): string => {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // Browser environment - check window object for injected env vars
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const windowEnv = (window as any).__ENV__;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (windowEnv && typeof windowEnv[key] === "string") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return windowEnv[key];
    }
  }

  // Node.js environment - check process.env
  if (typeof process !== "undefined" && process.env) {
    const value = process.env[key];
    if (typeof value === "string") {
      return value;
    }
  }

  return defaultValue;
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
    "phd://renown-staging.vetra.to"
  ),
  vetraPackageBasePath: getEnvVar(
    "VETRA_VETRA_PACKAGE_BASE_PATH",
    "phd://staging.vetra.to"
  ),
};
