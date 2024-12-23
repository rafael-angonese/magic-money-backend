#!/bin/sh

# Run migrations
node ace migration:run --force

# Start the application
node ./bin/server.js
