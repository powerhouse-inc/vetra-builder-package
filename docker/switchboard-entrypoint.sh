#!/bin/sh
set -e

# Find Prisma schema from document-drive (may be hoisted or nested in .pnpm)
PRISMA_SCHEMA=$(find node_modules -path "*/document-drive/dist/prisma/schema.prisma" -print -quit 2>/dev/null)
if [ -z "$PRISMA_SCHEMA" ]; then
    echo "[entrypoint] WARNING: Prisma schema not found, skipping Prisma setup"
else
    # Regenerate Prisma client for current platform (fixes darwin-arm64 vs linux-musl-openssl mismatch)
    echo "[entrypoint] Regenerating Prisma client for current platform..."
    prisma generate --schema "$PRISMA_SCHEMA"

    # Run migrations if DATABASE_URL is postgres and migrations not skipped
    if [ -n "$DATABASE_URL" ] && echo "$DATABASE_URL" | grep -q "^postgres" && [ "$SKIP_DB_MIGRATIONS" != "true" ]; then
        echo "[entrypoint] Running Prisma db push..."
        prisma db push --schema "$PRISMA_SCHEMA" --skip-generate
        echo "[entrypoint] Running migrations..."
        ph switchboard --migrate
    fi
fi

echo "[entrypoint] Starting switchboard on port ${PORT:-3000}..."
exec ph switchboard --port ${PORT:-3000}
