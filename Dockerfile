# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim as base

WORKDIR /app

ENV NODE_ENV=production

FROM base as build

COPY --link package.json package-lock.json ./
RUN npm ci --include=dev
COPY --link . .

RUN npm run build

RUN npm prune --omit=dev

FROM base

COPY --from=build /app /app

EXPOSE 3000
CMD [ "npm", "run", "start" ]
