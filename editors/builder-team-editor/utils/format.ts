/**
 * Truncate an Ethereum address to format: 0xabcd...xyz
 * @param address - Full ethereum address
 * @param prefixLength - Number of characters to show after 0x (default: 4)
 * @param suffixLength - Number of characters to show at the end (default: 4)
 */
export function truncateAddress(
  address: string,
  prefixLength = 4,
  suffixLength = 4
): string {
  if (!address) return "";
  if (address.length <= prefixLength + suffixLength + 2) return address;

  return `${address.slice(0, prefixLength + 2)}...${address.slice(-suffixLength)}`;
}
