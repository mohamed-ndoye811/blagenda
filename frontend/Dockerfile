# syntax = docker/dockerfile:1

ARG NODE_VERSION=24.1.0

FROM node:${NODE_VERSION}-slim AS base

ARG PORT=3000

WORKDIR /src

# Build
FROM base AS build

COPY --link package.json .
COPY --link yarn.lock .
RUN yarn install

COPY --link . .

RUN yarn build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]