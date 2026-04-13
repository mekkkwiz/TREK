#!/bin/sh
# Railway: single volume at /app/data — create upload subdirs at runtime
# (volume mount replaces /app/data with an empty dir on first deploy)
mkdir -p /app/data/uploads/avatars /app/data/uploads/photos /app/data/uploads/files /app/data/uploads/covers
mkdir -p /app/data/logs

chown -R node:node /app/data /app/uploads 2>/dev/null || true
exec su-exec node node --import tsx src/index.ts
