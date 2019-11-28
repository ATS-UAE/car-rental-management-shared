#!/bin/bash
cp .env server/
cp .env client/

PORT=48620 docker-compose down
PORT=48620 docker-compose build --no-cache
PORT=48620 docker-compose up -d -V --force-recreate --build
