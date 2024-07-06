#!/bin/bash

echo "Copying node_modules..."
mkdir -p /backend/node_modules
rsync --archive --quiet --stats --delete /packages-cache/node_modules/ /backend/node_modules
# cp -r /packages-cache/node_modules /backend/node_modules
cd /backend
npm run start:dev
