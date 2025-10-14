import { vetraClient, SEARCH_PACKAGES_QUERY, SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY } from "../utils/graphql.js";
import { config } from "../config.js";
import type { VetraPackageData, PHIDOption } from "../types/index.js";

interface SearchPackagesResponse {
  vetraPackages: VetraPackageData[];
}

/**
 * Search for packages by name
 */
export async function searchPackages(search: string): Promise<VetraPackageData[]> {
  const data = await vetraClient.request<SearchPackagesResponse>(SEARCH_PACKAGES_QUERY, {
    search,
  });
  return data.vetraPackages;
}

/**
 * Get package(s) by document ID(s)
 */
export async function getPackagesByIds(documentIds: string[]): Promise<VetraPackageData[]> {
  const data = await vetraClient.request<SearchPackagesResponse>(
    SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY,
    { documentIds }
  );
  return data.vetraPackages;
}

/**
 * Get a single package by document ID
 */
export async function getPackage(documentId: string): Promise<VetraPackageData | null> {
  const packages = await getPackagesByIds([documentId]);
  return packages.length > 0 ? packages[0] : null;
}

/**
 * Convert a package to a PHID option for the PHIDField component
 */
export function packageToOption(pkg: VetraPackageData): PHIDOption {
  return {
    id: pkg.documentId,
    title: pkg.name,
    value: pkg.documentId,
    description: pkg.description,
    path: {
      text: `${config.vetraPackageBasePath}/${pkg.documentId}`,
      url: `${config.vetraPackageBasePath}/${pkg.documentId}`,
    },
    icon: "PackageManager",
  };
}

/**
 * Search for packages and convert to PHID options
 */
export async function searchPackageOptions(search: string): Promise<PHIDOption[]> {
  const packages = await searchPackages(search);
  return packages.map(packageToOption);
}

/**
 * Get a package and convert to PHID option
 */
export async function getPackageOption(documentId: string): Promise<PHIDOption | undefined> {
  const pkg = await getPackage(documentId);
  return pkg ? packageToOption(pkg) : undefined;
}
