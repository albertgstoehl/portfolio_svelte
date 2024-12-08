# Use an official Node.js image as the base
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose port 8080 for the SvelteKit app
EXPOSE 5173


