#!/bin/bash
cp .env server/
cp .env client/

PORT=48620 docker-compose build
PORT=48620 docker-compose up -d -V
