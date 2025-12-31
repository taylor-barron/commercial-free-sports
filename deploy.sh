#!/usr/bin/env bash
set -e

echo "🚀 Starting deployment at $(date)"

APP_DIR="/home/taylor/mustwatchsports"

cd "$APP_DIR"

echo "📦 Fetching latest code..."
git fetch origin
git checkout main
git pull origin main

echo "🐳 Starting containers..."
./vendor/bin/sail up -d

echo "📦 Installing PHP dependencies..."
./vendor/bin/sail composer install \
  --no-dev \
  --prefer-dist \
  --optimize-autoloader

echo "📦 Installing JS dependencies..."
./vendor/bin/sail npm install

echo "🏗️  Building frontend assets..."
./vendor/bin/sail npm run build

echo "🧹 Fixing Vite manifest location..."
if [ -f public/build/.vite/manifest.json ]; then
  mv public/build/.vite/manifest.json public/build/manifest.json
fi

echo "🗄️  Running migrations..."
./vendor/bin/sail artisan migrate --force

echo "🧹 Clearing & caching config..."
./vendor/bin/sail artisan optimize:clear
./vendor/bin/sail artisan optimize

echo "✅ Deployment complete at $(date)"
