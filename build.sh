#!/bin/bash
cp .env server/
cp .env client/

PORT=48620 docker-compose -f docker-compose.yml build --no-cache
PORT=48620 docker-compose -f docker-compose.yml up -d --force-recreate
