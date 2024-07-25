#!/bin/bash

echo "Copying node_modules..."
mkdir -p /app/node_modules
# The ending slash "/" is *important* on this next line path "/packages-cache/node_modules/":
rsync --archive --quiet --stats --delete /packages-cache/node_modules/ /app/node_modules
# cp -r /packages-cache/node_modules /backend/node_modules
cd /app
npm run dev
