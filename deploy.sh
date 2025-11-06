#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the app
echo "Building app..."
npm run build

# Copy web.config to dist folder
echo "Copying web.config..."
cp web.config dist/

echo "Deployment complete!"