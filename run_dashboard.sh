#!/bin/bash

# Function to clean up background processes
cleanup() {
    echo "Cleaning up..."
    kill $FLASK_PID
    exit
}

# Trap script exit signals
trap cleanup SIGINT SIGTERM

# Check if sampler is installed
if ! command -v sampler &> /dev/null
then
    echo "sampler could not be found. Please install it first."
    echo "See installation instructions at: https://github.com/sqshq/sampler"
    exit
fi

# Start the Flask backend in the background
python3 backend/app.py &
FLASK_PID=$!

# Start the sampler dashboard
sampler -c config.yml

# Clean up on exit
cleanup