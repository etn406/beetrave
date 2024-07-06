FROM node:18-alpine AS base

RUN apk add rsync

RUN mkdir -p /packages-cache
RUN mkdir -p /backend

WORKDIR /packages-cache

COPY package.json .
COPY package-lock.json .

RUN npm install

FROM base AS build
RUN npm run build

# Production
FROM node:18-alpine AS production

WORKDIR /backend

COPY --from=build /backend .

EXPOSE 3001

CMD ["npm", "start:prod"]

# Development
FROM base AS development

WORKDIR /backend

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
