# Base image with specific Ruby version
ARG RUBY_VERSION=3.3.5
FROM ruby:$RUBY_VERSION-slim AS base

# Set working directory
WORKDIR /rails

# Install required OS packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libvips postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Set production environment variables
ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT="development test" \
    MALLOC_ARENA_MAX=2

# Build stage for dependencies
FROM base AS build

# Install build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config && \
    rm -rf /var/lib/apt/lists/*

# Copy only the necessary files for dependency installation
COPY Gemfile Gemfile.lock ./

# Install gems efficiently
RUN bundle install --jobs=4 --retry=3 && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Copy the entire app
COPY . .

# Precompile assets and bootsnap
RUN bundle exec bootsnap precompile --gemfile && \
    bundle exec bootsnap precompile app/ lib/

# Adjust script permissions
RUN chmod +x bin/* && sed -i "s/\r$//g" bin/*

# Final production image
FROM base

# Create a non-root user for security
RUN groupadd --system --gid 1000 rails && \
    useradd --system --uid 1000 --gid 1000 --create-home --shell /bin/bash rails

# Copy built application and dependencies
COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Change ownership for runtime directories
RUN chown -R rails:rails /rails/db /rails/log /rails/storage /rails/tmp

# Switch to the non-root user
USER rails

# Expose the port Rails runs on
EXPOSE 3000

# Default entrypoint
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Default command
CMD ["./bin/rails", "server"]
