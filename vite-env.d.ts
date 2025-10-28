interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly PH_VETRA_RENOWN_GRAPHQL_ENDPOINT: string;
  readonly PH_VETRA_VETRA_GRAPHQL_ENDPOINT: string;
  readonly PH_VETRA_RENOWN_PROFILE_BASE_PATH: string;
  readonly PH_VETRA_VETRA_PACKAGE_BASE_PATH: string;
  readonly PH_VETRA_DRIVE_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
