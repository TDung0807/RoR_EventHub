# Use Node.js for building the frontend
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files for efficient caching
COPY package.json package-lock.json ./

# Install dependencies (optimize for peer deps issue)
RUN npm ci --legacy-peer-deps

# Copy the rest of the app files
COPY . .

# Set production mode and build
ENV NODE_ENV=production
RUN npm run build

# Use lightweight Nginx for serving the built app
FROM nginx:alpine

# Copy built frontend files to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Use minimal Nginx config for better performance
CMD ["nginx", "-g", "daemon off;"]