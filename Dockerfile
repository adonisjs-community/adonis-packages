FROM node:lts-bookworm-slim AS base

RUN npm install -g corepack@latest
RUN corepack enable

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm install

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build
RUN node ace build:packages

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY --from=build /app/content/build/packages.json /app/content/build/packages.json
RUN mkdir /app/tmp
EXPOSE 8080
CMD ["node", "./bin/server.js"]
