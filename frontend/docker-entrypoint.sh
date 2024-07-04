#!/bin/bash

echo "Copying node_modules..."
cp -r /packages-cache/node_modules /frontend/node_modules
cd /frontend
npm run dev
