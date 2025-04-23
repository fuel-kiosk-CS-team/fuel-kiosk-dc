#!/bin/bash

# Make it so that any errors fail the script
set -e

# Check if openssl is installed
if ! command -v openssl &> /dev/null; then
    echo "ERROR: openssl is not installed. Please install it using your system's corresponding package manager before running this script."
    echo
    echo "For example:"
    echo
    echo "Arch: pacman -S openssl"
    echo "Ubuntu: apt get install openssl"
    echo

    exit 1
fi

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

# Setup DB connection URL for prisma and Secret Key for Sessions
export DATABASE_URL=mysql://root:root@localhost:3306/fuel-kiosk?connection_limit=2
export SECRET_KEY=$(openssl rand -base64 32)

# Ensure all packages are installed
echo "Installing Packages..."

# Check if this is running in CI then do clean install
if [ -n "$CI" ]; then
    echo "CI environment detected. Running npm ci..."
    npm ci || (echo "ERROR: problem installing npm packages with npm ci"; exit 1)
else
    echo "CI environment not detected. Running npm install..."
    npm install || (echo "ERROR: problem installing npm packages"; exit 1)
fi

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
echo "export SECRET_KEY=$SECRET_KEY" >> .dev.env

echo >> .dev.env

# Setup email credentials in env file
if [ -z "$EMAIL_USER" ] || [ -z "$EMAIL_PASSWORD" ]; then
    echo "export EMAIL_USER=\"Put in your ONID username\"" >> .dev.env
    echo "export EMAIL_PASSWORD=\"Put in your ONID password\"" >> .dev.env

    echo "IMPORTANT: Emails won't work until you set your respective email credentials in the .dev.env file and source it"
else
    echo "export EMAIL_USER=$EMAIL_USER" >> .dev.env
    echo "export EMAIL_PASSWORD=$EMAIL_PASSWORD" >> .dev.env
fi

echo >> .dev.env

# setup heartbeat settings in env file
echo "export ALLOWED_DOWNTIME_HOURS=1" >> .dev.env

echo "IMPORTANT: Before you run \`npm run dev\` you may need to run \`source .dev.env\` which will set the important envs"
