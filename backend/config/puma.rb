# Set Puma threads (min & max)
threads_count = ENV.fetch("RAILS_MAX_THREADS", 3)
threads threads_count, threads_count

# Bind Puma to a specific port
port ENV.fetch("PORT", 3000) # Only one port setting

# Bind to all interfaces (useful for Docker)
bind "tcp://0.0.0.0:3421"
# Enable tmp_restart plugin for restarting with `rails restart`
plugin :tmp_restart

# Set a PID file if the environment variable is present
pidfile ENV["PIDFILE"] if ENV["PIDFILE"]
