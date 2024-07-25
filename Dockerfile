FROM node:18-alpine AS builder
RUN apk add sqlite postgresql
COPY package*.json .
RUN npm ci
RUN npm prune --production
COPY . .
RUN npm run build

# Production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app .
COPY --from=build /packages-cache .
EXPOSE 5173

## Starts the app
CMD ["node", "build"]
