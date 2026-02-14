# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.2.0

################################################################################
# Base stage - prepare dependencies
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

# Install dependencies (including devDependencies for build)
COPY package.json package-lock.json ./
RUN npm ci

################################################################################
# Build stage - build the Next.js application
FROM base AS builder
WORKDIR /app

# Copy source files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN npm run build

################################################################################
# Production stage - run the application
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run as non-root user
USER node

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
