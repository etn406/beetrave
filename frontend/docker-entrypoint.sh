#!/bin/bash

echo "Copying node_modules..."
mkdir -p /frontend/node_modules
rsync --archive --quiet --stats --delete /packages-cache/node_modules/ /frontend/node_modules
# cp -r /packages-cache/node_modules /frontend/node_modules
cd /frontend
npm run dev
