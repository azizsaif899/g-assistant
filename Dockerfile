# Multi-stage build for AzizSys
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/
COPY config/ ./config/

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S azizsys -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder --chown=azizsys:nodejs /app/dist ./dist
COPY --from=builder --chown=azizsys:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=azizsys:nodejs /app/package.json ./

# Create logs directory
RUN mkdir -p /app/logs && chown azizsys:nodejs /app/logs

# Switch to non-root user
USER azizsys

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]