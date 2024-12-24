#!/usr/bin/with-contenv bashio

# Get config values
export STORMGLASS_API_KEY=$(bashio::config 'stormglass_api_key')

# Start the server
npm run start