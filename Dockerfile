FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --silent --no-cache

COPY ./src ./src
COPY ./prisma ./prisma
COPY ./scripts ./scripts

ENTRYPOINT ["/app/scripts/server.sh"]