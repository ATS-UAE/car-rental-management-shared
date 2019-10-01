#!/bin/bash
cp .env server/
cp .env client/

PORT=48620 docker-compose -f docker-compose.yml down
PORT=48620 docker-compose -f ./docker-compose.yml up -d -V --force-recreate
