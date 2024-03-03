# Use the base image to secure container
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript
RUN npm install typescript -g

# Copy the TypeScript source code to the working directory
COPY . .

# Copy the .env.production file to the working directory
COPY .env.example .env

# Build the TypeScript code
RUN npx tsc

# Set the command to start the Express server
CMD ["node", "dist/server.js"]

EXPOSE 3000