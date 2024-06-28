# Use an official node image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (or the port your Vite server is configured to use)
EXPOSE 3000

# Run the Vite build process
RUN npm run build

# Start the application
CMD ["npm", "run", "serve"]
