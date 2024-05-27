FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS build
RUN npm run build

# Production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3001
CMD ["npm", "run", "start:prod"]

# Development
FROM base AS development
EXPOSE 3001
CMD ["npm", "run", "start:dev"]