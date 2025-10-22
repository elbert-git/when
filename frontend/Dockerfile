# Use a Node.js base image
FROM node:22.12.0-alpine

WORKDIR /app

# Copy all application files
COPY . .

# Install dependencies
RUN npm install

# Expose the development port (Vite's default is 5173)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]