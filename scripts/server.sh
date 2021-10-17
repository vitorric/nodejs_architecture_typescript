#!/bin/sh

(cd /app && node_modules/.bin/prisma migrate deploy)
(cd /app && node_modules/.bin/prisma generate)
(cd /app && yarn start)