#!/bin/bash

# Build Docker image
docker build -t mad-mike-automobile .

docker stop mad-mike-automobile-container
docker rm mad-mike-automobile-container

# Run Docker container
docker run --name mad-mike-automobile-container -it -d -p 3000:3000 mad-mike-automobile