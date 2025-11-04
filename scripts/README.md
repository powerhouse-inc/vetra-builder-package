# Upload Powerhouse Documents to Remote Drive

This script extracts JSON data from `.phd` files and uploads them to a remote Switchboard drive using the GraphQL API.

## Prerequisites

- Node.js and pnpm installed
- Access to a Switchboard instance (e.g., `https://switchboard.staging.vetra.io`)

## Installation

Dependencies are already installed:
- `adm-zip` - for extracting .phd (ZIP) files
- `tsx` - for running TypeScript directly

## Usage

### Basic Usage

From project root:
```bash
bun run scripts/upload-to-drive.ts <document-path> <drive-url>
```

Or with tsx:
```bash
npx tsx scripts/upload-to-drive.ts <document-path> <drive-url>
```

### Example

Upload the SkyFintech builder team document:

```bash
bun run scripts/upload-to-drive.ts \
  /home/froid/Dokumente/SkyFintech.phvba.phd \
  https://switchboard.vetra.io/d/sky-fintech
```

### Parameters

1. **document-path**: Path to the `.phd` or `.phvba.phd` file
2. **drive-url**: Full URL to the Switchboard drive (e.g., `https://switchboard.staging.vetra.io/d/my-drive`)

## How It Works

The script performs the following steps:

1. **Extract Document Data**
   - Unzips the `.phd` file (which is a ZIP archive)
   - Reads `header.json`, `operations.json`, `state.json`, and `current-state.json`

2. **Create Document**
   - Uses the Switchboard GraphQL `BuilderTeam_createDocument` mutation
   - Creates an empty document in the specified drive
   - Returns a PHID (Powerhouse ID) for the new document

3. **Apply Operations**
   - Iterates through all operations from `operations.json`
   - Maps each operation type to its specific GraphQL mutation:
     - `SET_TEAM_NAME` → `BuilderTeam_setTeamName`
     - `SET_SLUG` → `BuilderTeam_setSlug`
     - `SET_DESCRIPTION` → `BuilderTeam_setDescription`
     - etc.
   - Applies operations sequentially to rebuild the document state

## Document Structure

A `.phd` file is a ZIP archive containing:

- `header.json` - Document metadata (id, type, name, revision, etc.)
- `operations.json` - All operations that have been applied (global and local)
- `state.json` - Initial state
- `current-state.json` - Current computed state after all operations

## Example Output

```
=== Powerhouse Document Upload to Remote Drive ===

📦 Extracting document: /home/froid/Dokumente/SkyFintech.phvba.phd
  ✓ header.json: 3626098a-174e-42b0-b87a-b2344352ab02
  ✓ operations.json: 45 global ops, 0 local ops
  ✓ state.json
  ✓ current-state.json

📝 Creating document on Switchboard...
  GraphQL endpoint: https://switchboard.vetra.io/graphql
  Drive ID: sky-fintech
  Document Type: powerhouse/builder-team
  ✓ Document created successfully
    Document ID (PHID): phd://sky-fintech/docs/abc123...

⚙️  Applying 45 operations...
  [1/45] ✓ SET_TEAM_NAME
  [2/45] ✓ SET_TEAM_NAME
  [3/45] ✓ SET_TEAM_NAME
  ...
  [23/45] ✓ SET_SLUG
  [24/45] ✓ SET_SLUG
  ...
  [45/45] ✓ SET_DESCRIPTION

  Summary:
    ✓ Success: 45

=== Upload Complete ===

Document uploaded to: https://switchboard.vetra.io/d/sky-fintech
Document ID (PHID): phd://sky-fintech/docs/abc123...
Original ID: 3626098a-174e-42b0-b87a-b2344352ab02
Total operations: 45
```

## Troubleshooting

### GraphQL Errors

If you encounter GraphQL errors, check:
- The Switchboard URL is correct and accessible
- You have proper authentication (if required)
- The document type exists in the Switchboard schema

### Missing Files in .phd

If the script reports missing files:
- Verify the `.phd` file is not corrupted
- Ensure it's a valid Powerhouse document file

### Operation Application Failures

If operations fail to apply:
- Check the operation indices are sequential
- Verify the operation types are valid for the document model
- Review the GraphQL error messages for specific issues

## API Reference

### Switchboard GraphQL Mutations

**Create BuilderTeam Document:**
```graphql
mutation BuilderTeam_createDocument($name: String, $driveId: String) {
  BuilderTeam_createDocument(name: $name, driveId: $driveId)
}
```
Returns a PHID (Powerhouse ID) string for the created document.

**Apply Operations (example - SET_TEAM_NAME):**
```graphql
mutation BuilderTeam_setTeamName(
  $driveId: String,
  $docId: PHID,
  $input: BuilderTeam_SetTeamNameInput
) {
  BuilderTeam_setTeamName(driveId: $driveId, docId: $docId, input: $input)
}
```

### Supported Operations

The script maps these operation types to their GraphQL mutations:

| Operation Type | GraphQL Mutation |
|----------------|------------------|
| `SET_LOGO` | `BuilderTeam_setLogo` |
| `SET_TEAM_NAME` | `BuilderTeam_setTeamName` |
| `SET_SLUG` | `BuilderTeam_setSlug` |
| `SET_DESCRIPTION` | `BuilderTeam_setDescription` |
| `SET_SOCIALS` | `BuilderTeam_setSocials` |
| `ADD_MEMBER` | `BuilderTeam_addMember` |
| `UPDATE_MEMBER_INFO` | `BuilderTeam_updateMemberInfo` |
| `REMOVE_MEMBER` | `BuilderTeam_removeMember` |
| `ADD_SPACE` | `BuilderTeam_addSpace` |
| `UPDATE_SPACE_INFO` | `BuilderTeam_updateSpaceInfo` |
| `REMOVE_SPACE` | `BuilderTeam_removeSpace` |
| `REORDER_SPACES` | `BuilderTeam_reorderSpaces` |
| `ADD_PACKAGE` | `BuilderTeam_addPackage` |
| `UPDATE_PACKAGE_INFO` | `BuilderTeam_updatePackageInfo` |
| `REMOVE_PACKAGE` | `BuilderTeam_removePackage` |
| `REORDER_PACKAGES` | `BuilderTeam_reorderPackages` |

## Notes

- Operations are applied sequentially, one at a time
- Each operation type has its own specific GraphQL mutation
- The script automatically maps operation types to the correct mutations
- Unknown operation types are skipped with a warning
- Both global and local operations are extracted (though only global ops are currently applied)
