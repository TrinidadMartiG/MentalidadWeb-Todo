#!/bin/bash

docker run -e POSTGRES_USER=trini \
           -e POSTGRES_PASSWORD=password \
           -e POSTGRES_DB=test-db \
           -p 5432:5432 -d postgres