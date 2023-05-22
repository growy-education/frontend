# 本番環境用のDockerfileです。

# Create nodejs environment for x86_64 
# This platform switch is prepared for M1 chip user's first deploy.
# For more information, visit https://cloud.google.com/run/docs/developing
FROM --platform=linux/amd64 node:18 as build
WORKDIR /app

ENV REACT_APP_STAGE=${REACT_APP_STAGE}
ENV REACT_APP_BACKEND_BASE_URL=${REACT_APP_STAGE}
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_ID=${REACT_APP_GOOGLE_OAUTH_CLIENT_ID}

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies from both package.json and yarn.lock
RUN yarn --frozen-lockfile

# Copy the rest of the application files
COPY . ./

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/configfile.template

# Copy the built application from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Set environment variables
ENV PORT 8080
ENV HOST 0.0.0.0

# Expose the port
EXPOSE 8080

# Start NGINX server
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
