#!/usr/bin/env bun
/**
 * Upload Powerhouse Document to Remote Drive via Switchboard GraphQL API
 *
 * Usage (from project root):
 *   bun run scripts/upload-to-drive.ts <document-path> <drive-url>
 *   OR
 *   npx tsx scripts/upload-to-drive.ts <document-path> <drive-url>
 *
 * Example:
 *   bun run scripts/upload-to-drive.ts /home/froid/Dokumente/SkyFintech.phvba.phd https://switchboard.vetra.io/d/sky-fintech
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DocumentHeader {
  id: string;
  documentType: string;
  name: string;
  slug: string;
  branch: string;
  revision: {
    document: number;
    global: number;
  };
  [key: string]: any;
}

interface Operation {
  type: string;
  input: any;
  index: number;
  skip: number;
  hash: string;
  timestamp?: string;
  [key: string]: any;
}

interface OperationsData {
  global: Operation[];
  local: Operation[];
}

interface StateData {
  global: any;
  local: any;
}

/**
 * Extract JSON files from .phd (ZIP) file
 */
function extractDocumentData(filePath: string): {
  header: DocumentHeader;
  operations: OperationsData;
  state: StateData;
  currentState: StateData;
} {
  console.log(`📦 Extracting document: ${filePath}`);

  const zip = new AdmZip(filePath);
  const zipEntries = zip.getEntries();

  let header: DocumentHeader | null = null;
  let operations: OperationsData | null = null;
  let state: StateData | null = null;
  let currentState: StateData | null = null;

  zipEntries.forEach((entry) => {
    const content = entry.getData().toString('utf8');

    switch (entry.entryName) {
      case 'header.json':
        header = JSON.parse(content);
        console.log(`  ✓ header.json: ${header?.id}`);
        break;
      case 'operations.json':
        operations = JSON.parse(content);
        console.log(`  ✓ operations.json: ${operations?.global.length} global ops, ${operations?.local.length} local ops`);
        break;
      case 'state.json':
        state = JSON.parse(content);
        console.log(`  ✓ state.json`);
        break;
      case 'current-state.json':
        currentState = JSON.parse(content);
        console.log(`  ✓ current-state.json`);
        break;
    }
  });

  if (!header || !operations) {
    throw new Error('Missing required files in .phd document');
  }

  return {
    header: header!,
    operations: operations!,
    state: state || { global: {}, local: {} },
    currentState: currentState || { global: {}, local: {} },
  };
}

/**
 * Extract drive ID from drive URL
 */
function extractDriveId(driveUrl: string): string {
  const match = driveUrl.match(/\/d\/([^/]+)/);
  if (!match) {
    throw new Error(`Invalid drive URL: ${driveUrl}`);
  }
  return match[1];
}

/**
 * Create document via Switchboard GraphQL API
 */
async function createDocument(
  driveUrl: string,
  header: DocumentHeader,
  initialState: StateData
): Promise<string> {
  const graphqlUrl = driveUrl.replace(/\/d\/[^/]+$/, '/graphql');
  const driveId = extractDriveId(driveUrl);

  console.log(`\n📝 Creating document on Switchboard...`);
  console.log(`  GraphQL endpoint: ${graphqlUrl}`);
  console.log(`  Drive ID: ${driveId}`);
  console.log(`  Document Type: ${header.documentType}`);

  const mutation = `
    mutation BuilderTeam_createDocument($name: String!, $driveId: String!) {
      BuilderTeam_createDocument(name: $name, driveId: $driveId)
    }
  `;

  const variables = {
    name: header.name || header.slug || 'Untitled',
    driveId: driveId,
  };

  try {
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error(`  ✗ GraphQL errors:`, JSON.stringify(result.errors, null, 2));
      throw new Error('Failed to create document');
    }

    const documentId = result.data?.BuilderTeam_createDocument;
    console.log(`  ✓ Document created successfully`);
    console.log(`    Document ID (PHID): ${documentId}`);

    return documentId;
  } catch (error) {
    console.error(`  ✗ Error creating document:`, error);
    throw error;
  }
}

/**
 * Map operation types to GraphQL mutation names
 */
const OPERATION_MUTATION_MAP: Record<string, string> = {
  SET_LOGO: 'BuilderTeam_setLogo',
  SET_TEAM_NAME: 'BuilderTeam_setTeamName',
  SET_SLUG: 'BuilderTeam_setSlug',
  SET_DESCRIPTION: 'BuilderTeam_setDescription',
  SET_SOCIALS: 'BuilderTeam_setSocials',
  ADD_MEMBER: 'BuilderTeam_addMember',
  UPDATE_MEMBER_INFO: 'BuilderTeam_updateMemberInfo',
  REMOVE_MEMBER: 'BuilderTeam_removeMember',
  ADD_SPACE: 'BuilderTeam_addSpace',
  UPDATE_SPACE_INFO: 'BuilderTeam_updateSpaceInfo',
  REMOVE_SPACE: 'BuilderTeam_removeSpace',
  REORDER_SPACES: 'BuilderTeam_reorderSpaces',
  ADD_PACKAGE: 'BuilderTeam_addPackage',
  UPDATE_PACKAGE_INFO: 'BuilderTeam_updatePackageInfo',
  REMOVE_PACKAGE: 'BuilderTeam_removePackage',
  REORDER_PACKAGES: 'BuilderTeam_reorderPackages',
};

/**
 * Convert operation type to input type name
 */
function getInputTypeName(operationType: string): string {
  // Convert SET_TEAM_NAME -> SetTeamNameInput
  const parts = operationType.split('_');
  const camelCase = parts.map(p => p.charAt(0) + p.slice(1).toLowerCase()).join('');
  return `BuilderTeam_${camelCase}Input`;
}

/**
 * Apply a single operation via its specific mutation
 */
async function applyOperation(
  graphqlUrl: string,
  driveId: string,
  docId: string,
  operation: Operation
): Promise<void> {
  const mutationName = OPERATION_MUTATION_MAP[operation.type];

  if (!mutationName) {
    console.log(`    ⚠ Skipping unknown operation: ${operation.type}`);
    return;
  }

  const inputTypeName = getInputTypeName(operation.type);

  const mutation = `
    mutation Apply($driveId: String, $docId: PHID, $input: ${inputTypeName}) {
      ${mutationName}(driveId: $driveId, docId: $docId, input: $input)
    }
  `;

  const variables = {
    driveId,
    docId,
    input: operation.input,
  };

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
  }
}

/**
 * Apply operations to document via Switchboard GraphQL API
 */
async function applyOperations(
  driveUrl: string,
  documentId: string,
  operations: Operation[]
): Promise<void> {
  const graphqlUrl = driveUrl.replace(/\/d\/[^/]+$/, '/graphql');
  const driveId = extractDriveId(driveUrl);

  console.log(`\n⚙️  Applying ${operations.length} operations...`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    const progress = `[${i + 1}/${operations.length}]`;

    try {
      await applyOperation(graphqlUrl, driveId, documentId, operation);
      console.log(`  ${progress} ✓ ${operation.type}`);
      successCount++;
    } catch (error) {
      if (OPERATION_MUTATION_MAP[operation.type]) {
        console.error(`  ${progress} ✗ ${operation.type}: ${error instanceof Error ? error.message : String(error)}`);
        errorCount++;
      } else {
        console.log(`  ${progress} ⚠ Skipped ${operation.type} (no mutation)`);
        skipCount++;
      }
    }
  }

  console.log(`\n  Summary:`);
  console.log(`    ✓ Success: ${successCount}`);
  if (skipCount > 0) console.log(`    ⚠ Skipped: ${skipCount}`);
  if (errorCount > 0) console.log(`    ✗ Errors: ${errorCount}`);

  if (errorCount > 0) {
    throw new Error(`Failed to apply ${errorCount} operations`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('=== Powerhouse Document Upload to Remote Drive ===\n');

  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: bun run scripts/upload-to-drive.ts <document-path> <drive-url>');
    console.error('\nExample:');
    console.error('  bun run scripts/upload-to-drive.ts /home/froid/Dokumente/SkyFintech.phvba.phd https://switchboard.vetra.io/d/sky-fintech');
    process.exit(1);
  }

  const [documentPath, driveUrl] = args;

  if (!fs.existsSync(documentPath)) {
    console.error(`Error: Document not found: ${documentPath}`);
    process.exit(1);
  }

  try {
    // Step 1: Extract document data
    const { header, operations, state } = extractDocumentData(documentPath);

    // Step 2: Create document
    const documentId = await createDocument(driveUrl, header, state);

    // Step 3: Apply operations
    if (operations.global.length > 0) {
      await applyOperations(driveUrl, documentId, operations.global);
    } else {
      console.log('\n⚙️  No operations to apply');
    }

    console.log('\n=== Upload Complete ===');
    console.log(`\nDocument uploaded to: ${driveUrl}`);
    console.log(`Document ID (PHID): ${documentId}`);
    console.log(`Original ID: ${header.id}`);
    console.log(`Total operations: ${operations.global.length}`);

  } catch (error) {
    console.error('\n✗ Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
