FROM node:18-alpine AS base
RUN apk add rsync sqlite postgresql
RUN mkdir -p /packages-cache
RUN mkdir -p /app
WORKDIR /packages-cache
COPY package*.json .

FROM base AS build
RUN npm ci
RUN npm prune --production
RUN npm run build

# Production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app .
COPY --from=build /packages-cache .
EXPOSE 3000
## Starts the app
CMD ["node", "build"]

# Development
FROM base AS development
RUN npm i
WORKDIR /app
RUN mkdir -p /app/node_modules
RUN rsync --archive --quiet --stats --delete /packages-cache/node_modules/ /app/node_modules
EXPOSE 3000
CMD ["sh", "docker-dev-entrypoint.sh"]
