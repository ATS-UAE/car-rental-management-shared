#!/bin/bash
PORT=48620 docker-compose build --no-cache
PORT=48620 docker-compose up -d -V
docker system prune -f
