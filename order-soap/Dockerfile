# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

# Expose the port on which your Node.js application listens (if applicable)
EXPOSE 8001

# Specify the command to run your Node.js application
CMD ["node", "app.js"]
