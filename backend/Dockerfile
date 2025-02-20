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

# Install only necessary build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy only necessary files for dependency installation
COPY Gemfile Gemfile.lock ./

# Install gems efficiently
RUN bundle install --jobs=4 --retry=3 && \
    rm -rf ~/.bundle/ "$BUNDLE_PATH"/ruby/*/cache

# Copy application code
COPY . .

# Precompile bootsnap
RUN bundle exec bootsnap precompile --gemfile && bundle exec bootsnap precompile app/ lib/

# Ensure scripts are executable
RUN chmod +x bin/* && sed -i 's/\r$//' bin/*

# Final production image
FROM base

# Create non-root user for security
RUN addgroup --system rails && adduser --system --ingroup rails rails

# Copy built application and dependencies
COPY --from=build "$BUNDLE_PATH" "$BUNDLE_PATH"
COPY --from=build /rails /rails

# Set permissions
RUN chown -R rails:rails /rails

# Switch to non-root user
USER rails

# Expose Rails port
EXPOSE 3000

# Default entrypoint and command
ENTRYPOINT ["/rails/bin/docker-entrypoint"]
CMD ["./bin/rails", "server"]