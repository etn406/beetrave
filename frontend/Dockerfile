FROM node:18-alpine AS base

RUN mkdir -p /packages-cache
RUN mkdir -p /frontend

WORKDIR /packages-cache

COPY package.json .
COPY package-lock.json .

RUN npm install

FROM base AS build
RUN npm run build

# Production
FROM node:18-alpine AS production

WORKDIR /frontend

COPY --from=build /frontend .

EXPOSE 3000

CMD ["npm", "start"]

# Development
FROM base AS development

EXPOSE 3000

CMD ["npm", "run", "dev"]
