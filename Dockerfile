# Step 1: Build the React application
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React application
RUN npm run build

# Step 2: Serve the React application using a lightweight web server
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration if you have one (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
