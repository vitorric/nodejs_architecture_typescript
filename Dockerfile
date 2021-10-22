FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --silent --no-cache

COPY ./src ./src

ENTRYPOINT ["/app/scripts/server.sh"]