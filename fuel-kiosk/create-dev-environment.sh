#!/bin/bash

# Make it so that any errors fail the script
set -e

# Function to check if the MySQL container is running
is_mysql_running() {
    docker ps --filter "name=fuel-kiosk-db" --filter "status=running" --format "{{.Names}}" | grep -q "fuel-kiosk-db"
}

if is_mysql_running; then
    echo "MySQL is already running."
else
    echo "Starting MySQL container..."
    docker compose -f compose-dev.yaml up -d || (echo "ERROR: DOCKER COMPOSE FAILED: You may need to run this script with sudo"; exit 1)

    # Give time for DB to init
    echo "Waiting on DB to come up..."
    sleep 10
fi

# Setup DB connection URL for prisma
export DATABASE_URL=mysql://root:root@localhost:3306/fuel-kiosk?connection_limit=2

# Ensure all packages are installed
echo "Installing Packages..."
npm install || (echo "ERROR: problem installing npm packages"; exit 1)

# Setup prisma cache and migrate db
pushd src
echo "Setting up Prisma Cache and Migrating DB..."
npx prisma generate || (echo "ERROR: problem generating prisma client"; exit 1)
npx prisma migrate dev || (echo "ERROR: problem migrating test DB, possibly due to db schema shift"; exit 1)
popd

# Initialize DB with test data
echo "Intializing DB with Test Data..."
npm run initdb || (echo "ERROR: problem populating DB using initdb script"; exit 1)

# Create env file if it doesn't exist
if [ ! -f ".dev.env" ]; then
    touch .dev.env
fi

# Setup connection URL in env file
echo "export DATABASE_URL=$DATABASE_URL" > .dev.env
echo "IMPORTANT: Before you run \`npm run dev\` you need to run \`source .dev.env\` which will set the db connection URL"
