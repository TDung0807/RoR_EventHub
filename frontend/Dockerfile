# Use latest Node.js for building the frontend
FROM node:latest-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files for efficient caching
COPY package.json package-lock.json ./

# Install dependencies efficiently
RUN npm ci --legacy-peer-deps --prefer-offline --no-audit

# Copy the rest of the app files
COPY . .

# Set production mode and build
ENV NODE_ENV=production
RUN npm start

# Use lightweight Nginx for serving the built app
FROM nginx:alpine

# Copy built frontend files to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Use minimal Nginx config for better performance
CMD ["nginx", "-g", "daemon off;"]