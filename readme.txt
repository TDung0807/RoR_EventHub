# Ruby on Rails Project Setup Guide

Welcome to the Ruby on Rails project! This guide will help you set up and run the project on your local machine.

## Prerequisites
Before getting started, ensure you have the following installed on your system:
- **Ruby** (version 3.x or higher is recommended)
- **Rails** (version 7.x or higher is recommended)
- **Bundler** (for managing gem dependencies)
- **Node.js** and **Yarn** (for managing JavaScript assets)
- **PostgreSQL** or your preferred database

## Installation Backend:

### 1. Install Ruby on Rails
Follow the [official Ruby on Rails installation guide](https://guides.rubyonrails.org/getting_started.html#installing-rails) to install Ruby, Rails, and other dependencies.


### 2. Install Gem Dependencies
Run the following command to install all required Ruby gems:
```bash
bundle install
```

### 3. Set Up the Database
Create and set up the database:
```bash
rails db:create
rails db:migrate
rails db:populate_all_tables // optional: generate sample data
```

### 4. Start the Rails Server
Run the Rails server with:
```bash
rails server
```

By default, the server will be available at `http://localhost:3000`.

### 5. Access the Application
Open your browser and navigate to `http://localhost:3000` to view the application.


### Stop the Server
To stop the server, press `Ctrl + C` in the terminal where the server is running.

## Troubleshooting
If you encounter any issues during installation or setup, please check the following:
- Ensure you have installed all prerequisites.
- Verify that your database service is running.
- Check for missing dependencies or errors in the terminal output.

For further assistance, refer to the [Ruby on Rails documentation](https://guides.rubyonrails.org/) or contact the project maintainers.

---

Happy coding!

