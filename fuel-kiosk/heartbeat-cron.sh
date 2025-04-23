#!/bin/bash

# The API endpoint to curl
API_URL="localhost:3000/api/heartbeat/check"
LOG_FILE="/var/log/heartbeat.log"

# Period to run this cron job
HOURS=12
CRON_SCHEDULE="0 */$HOURS * * *"

# The exact command to add
CRON_JOB="$CRON_SCHEDULE curl -s $API_URL >> $LOG_FILE; echo \"\" >> $LOG_FILE"

# Get existing crontab, filter out lines with the API URL, then add the new job
( crontab -l 2>/dev/null | grep -v "$API_URL" ; echo "$CRON_JOB" ) | crontab -

echo "Cron job installed (any old version removed)."
