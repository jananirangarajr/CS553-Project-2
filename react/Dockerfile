# Use an official Node.js 14 image as the base
FROM node:18


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json ./

# Install project dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project directory to the container
COPY . .

# Build the React app
RUN yarn build

# Set environment variables (if needed)
# ENV REACT_APP_API_URL=http://example.com/api

# Expose the port your React app is listening on (typically 3000)
EXPOSE 3000

# Start the React app when the container starts
CMD ["yarn", "start"]
