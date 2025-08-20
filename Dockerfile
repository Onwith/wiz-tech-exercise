# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the dependency files and install them
COPY package.json package-lock.json ./
RUN npm install --production

# Copy all other application files and the required text file
COPY . .

# Expose the port the application listens on
EXPOSE 3000

# The command to start the application
CMD ["npm", "start"]