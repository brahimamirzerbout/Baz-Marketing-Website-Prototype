#!/bin/bash
# Run a focused subset of tests against a fresh dev server.
# Usage: scripts/run-wave-tests.sh [spec-file]
set -e

cd "$(dirname "$0")/.."
SPEC="${1:-tests/e2e/smoke.spec.ts}"

# Clean DB so migrations run fresh
rm -f data/baz.db data/baz.db-shm data/baz.db-wal

PORT=3737
export PLAYWRIGHT_BASE_URL="http://localhost:${PORT}"

# Start dev server in background, capture log
npx next dev -p "$PORT" > /tmp/baz-dev.log 2>&1 &
SVR_PID=$!
cleanup() {
  kill -9 "$SVR_PID" 2>/dev/null || true
  wait "$SVR_PID" 2>/dev/null || true
}
trap cleanup EXIT

# Wait for ready
echo "Waiting for server on :$PORT..."
for i in {1..60}; do
  if curl -s -o /dev/null --max-time 2 -w "%{http_code}" "http://localhost:${PORT}/" 2>/dev/null | grep -qE "200|307|308"; then
    echo "Server ready in ${i}s"
    break
  fi
  sleep 1
done

# Trigger DB init
curl -s -o /dev/null --max-time 10 "http://localhost:${PORT}/api/health" || true

# Run the requested spec
echo
echo "=== Running $SPEC ==="
npx playwright test "$SPEC" --reporter=list

# Cleanup
cleanup
