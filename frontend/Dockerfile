# Use Node.js LTS
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 5173

# Start server
CMD ["npm", "run", "preview"]
