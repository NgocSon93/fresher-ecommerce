#!/bin/bash

# Function to install dependencies
install_dependencies() {
  npm install --pure-lockfile
  if [ $? -ne 0 ]; then
    echo "Error installing dependencies."
    exit 1
  fi
}

# Function to set up development environment
setup_development() {
  npm cache clean --force
  npm run dev
}

# Function to set up production environment
setup_production() {
  npm run build
  node .output/server/index.mjs
}

# Main script starts here
install_dependencies

# Check if the .env file exists in the current directory
if [ -f ".env" ]; then
  # Export environment variables from the .env file
  export $(grep NODE_ENV .env | xargs)

  #  Determine environment and run appropriate setup
  case "$NODE_ENV" in
    "development")
      setup_development
      ;;
    "production")
      setup_production
      ;;
    *)
      echo "NODE_ENV is not set to 'development' or 'production'."
      ;;
  esac
else
  echo ".env file does not exist."
fi
