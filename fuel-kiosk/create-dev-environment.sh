#!/bin/bash

# Setup MySQL container using compose
sudo docker compose -f compose-dev.yaml up -d

# Give time for DB to init
echo "Waiting on DB to come up..."
sleep 10

# Setup DB connection URL for prisma
export DATABASE_URL=mysql://root:root@localhost:3306/fuel-kiosk?connection_limit=2

# Ensure all packages are installed
echo "Installing Packages..."
npm install

# Setup prisma cache and migrate db
pushd src
echo "Setting up Prisma Cache and Migrating DB..."
npx prisma generate
npx prisma migrate dev
popd

# Initialize DB with test data
echo "Intializing DB with Test Data..."
npm run initdb

# Create env file if it doesn't exist
if [ ! -f ".dev.env" ]; then
    touch .dev.env
fi

# Setup connection URL in env file
echo "export DATABASE_URL=$DATABASE_URL" > .dev.env
echo "IMPORTANT: Before you run \`npm run dev\` you need to run \`source .dev.env\` which will set the db connection URL"
