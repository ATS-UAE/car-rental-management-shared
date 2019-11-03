#!/bin/bash
cp .env server/
cp .env client/

PORT=48620 docker-compose -f docker-compose.dev.yml up --force-recreate --build
