# Base Ruby on Rails image
FROM ruby:3.2.5-slim AS base

# Set working directory
WORKDIR /rails

# Install essential dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    curl \
    libjemalloc2 \
    libvips \
    sqlite3 \
    build-essential \
    gnupg && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install Yarn for managing frontend packages
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install --no-install-recommends -y yarn

# Install Ruby gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Frontend: Vite (Build Stage)
FROM node:20 AS frontend

# Set working directory for frontend
WORKDIR /app

# Copy frontend code and install dependencies using Yarn
COPY ./frontend/package.json ./
RUN npm install

# Copy frontend source files
COPY ./frontend .

# Build frontend
RUN npm run build

# Final Stage: Combine Backend and Frontend
FROM base

# Copy built gems and application code from previous steps
COPY --from=frontend /app/dist /rails/public

# Copy Rails app code
COPY . .

# Expose the port for Rails
EXPOSE 3000

# Run the Rails server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
