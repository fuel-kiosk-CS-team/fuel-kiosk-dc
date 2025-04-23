#!/bin/bash

# The API endpoint to curl
API_URL="localhost:3000/api/heartbeat/check"

# Period to run this cron job
HOURS=3
CRON_SCHEDULE="*/1 * * * *"

# The exact command to add
CRON_JOB="$CRON_SCHEDULE curl -s $API_URL >> /var/log/heartbeat.log"

# Get existing crontab, filter out lines with the API URL, then add the new job
( crontab -l 2>/dev/null | grep -v "$API_URL" ; echo "$CRON_JOB" ) | crontab -

echo "Cron job installed (any old version removed)."
