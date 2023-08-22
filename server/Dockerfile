# Use an official Node.js runtime as the base image
FROM node:19.7.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port your app is running on
EXPOSE 3000

# Start the application
CMD ["node", "./dist/index.js"]
