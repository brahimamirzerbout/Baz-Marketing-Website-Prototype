#!/usr/bin/env bash
set -euo pipefail

# ============================================
# BAZ — production deploy helper
# ============================================
# Targets:
#   1) Vercel       (vercel deploy --prod)
#   2) Docker       (docker build + push or compose up)
#   3) Self-hosted  (build + tar + scp + systemd)
#
# Usage:
#   ./scripts/deploy.sh vercel
#   ./scripts/deploy.sh docker
#   ./scripts/deploy.sh selfhost user@host
# ============================================

if [ $# -lt 1 ]; then
  echo "Usage: $0 {vercel|docker|selfhost <user@host>}"
  exit 1
fi

TARGET="$1"

case "$TARGET" in
  vercel)
    echo "→ Deploying to Vercel"
    if ! command -v vercel >/dev/null 2>&1; then
      echo "  vercel CLI not found. Install: npm i -g vercel"
      exit 1
    fi
    [ -f .env.production ] || cp .env.production.example .env.production
    vercel env pull .env.local
    vercel build --prod
    vercel deploy --prod --yes
    echo "✓ Deployed to Vercel"
    ;;

  docker)
    echo "→ Building Docker image"
    IMAGE_TAG="${DOCKER_IMAGE:-baz-marketing:latest}"
    docker build -t "$IMAGE_TAG" .
    if [ -n "${DOCKER_REGISTRY:-}" ]; then
      docker tag "$IMAGE_TAG" "$DOCKER_REGISTRY/$IMAGE_TAG"
      docker push "$DOCKER_REGISTRY/$IMAGE_TAG"
      echo "✓ Pushed to $DOCKER_REGISTRY/$IMAGE_TAG"
    else
      echo "✓ Built locally: $IMAGE_TAG"
      echo "  Run with: docker run -p 3000:3000 -v baz-data:/app/data $IMAGE_TAG"
      echo "  Or:       docker compose up -d"
    fi
    ;;

  selfhost)
    if [ $# -lt 2 ]; then
      echo "Usage: $0 selfhost user@host"
      exit 1
    fi
    DEST="$2"
    REMOTE_DIR="${REMOTE_DIR:-/opt/baz}"
    echo "→ Building + syncing to $DEST:$REMOTE_DIR"
    npm run build
    rsync -avz --delete \
      --exclude='node_modules' --exclude='.next/cache' --exclude='.git' \
      --exclude='tests/e2e/screenshots' --exclude='data' --exclude='.env.local' \
      ./ "$DEST:$REMOTE_DIR/"
    ssh "$DEST" "cd $REMOTE_DIR && \
      if command -v pnpm >/dev/null; then pnpm install --prod --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm ci --omit=dev; \
      else npm install --omit=dev; fi && \
      cp -n .env.production.example .env.production || true && \
      echo 'Edit $REMOTE_DIR/.env.production with real values, then:' && \
      echo '  sudo systemctl restart baz'"
    echo "✓ Synced. Set env vars on the host, then restart the baz systemd service."
    ;;

  *)
    echo "Unknown target: $TARGET"
    echo "Usage: $0 {vercel|docker|selfhost <user@host>}"
    exit 1
    ;;
esac