#!/bin/bash

ENV_FILE=".env"


# Check if the .env file exists
if [ -f "$ENV_FILE" ]; then
    # Read the .env file line by line
    while IFS= read -r line; do
        # Skip comments and empty lines
        if [[ "$line" =~ ^\s*#.*$ || -z "$line" ]]; then
            continue
        fi
        
        # Split the line into key and value
        key=$(echo "$line" | cut -d '=' -f 1)
        value=$(echo "$line" | cut -d '=' -f 2-)
        
        # Remove single quotes, double quotes, and leading/trailing spaces from the value
        value=$(echo "$value" | sed -e "s/^'//" -e "s/'$//" -e 's/^"//' -e 's/"$//' -e 's/^[ \t]*//;s/[ \t]*$//')
        
        # Export the key and value as environment variables
        #export "$key=$value"
        
        if [ $key == "APP_HOST" ]; then
            APP_HOST=$value
        fi
    done < "$ENV_FILE"
fi

if [[ ! $APP_HOST ]]; then
    echo "No APP_HOST specified. Add this entry to the .env file."
    exit 1
fi

echo $app_host
# Variables
USERNAME="jeth"
REMOTE_DIR="/home/jeth/apps/freerider-alerts"
LOCAL_DIR="dist"
PORT="2244"

# Function to upload directory using rsync
upload_directory() {
    local local_dir=$1
    local remote_dir=$2
    local app_host=$3
    local username=$4
    local port=$5
    
    # Use rsync to copy the local directory to the remote directory
    rsync -avz -e "ssh -p $port" "$local_dir/" "$username@$app_host:$remote_dir"
    
    if [ $? -eq 0 ]; then
        echo "Successfully uploaded $local_dir to $remote_dir on $app_host"
    else
        echo "Failed to upload $local_dir to $remote_dir on $app_host"
    fi
}

# Execute the function
upload_directory "$LOCAL_DIR" "$REMOTE_DIR" "$APP_HOST" "$USERNAME" "$PORT"
