# WRENCH PLATFORM

Wrench is a game marketplace that includes features such as user authentication, game management, reviews, file uploads, and Discord bot integration. This project is designed for game enthusiasts and leverages modern technologies like Node.js, Express, MongoDB, and JWT-based authentication to create a robust platform.

## Project Description

The Wrench Platform is designed to provide users with an easy-to-use system for uploading, managing, and reviewing games. The target audience includes game developers, players, and community members who want a centralized hub for sharing and discussing games. The platform also integrates Discord for event logging and offers an email-based newsletter subscription.

## Features

- **User Authentication**: Registration, login, and email confirmation with JWT-based authentication.
- **Game Management**: Add, search, and fetch games, as well as handle file uploads for game images and game files.
- **Reviews and Ratings**: Users can review and rate games.
- **Password Recovery**: Forgot password and reset password functionalities.
- **Discord Bot Integration**: Logs important events such as user registrations and game uploads.
- **Newsletter Subscription**: Users can subscribe to a newsletter for platform updates.

## Tech Stack

- **Backend**: Node.js, Express for the API and server-side logic.
- **Database**: MongoDB (using Mongoose ODM).
- **Authentication**: JSON Web Tokens (JWT) for securing API endpoints, bcrypt.js for password hashing.
- **Email**: Nodemailer for sending email confirmations and password reset links.
- **File Uploads**: Multer for handling game file and image uploads.
- **Discord Integration**: Discord.js for logging events to a Discord server.

## Installation Guide

### Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (version 14 or later)
- MongoDB (either running locally or via a cloud provider like MongoDB Atlas)
- Git for cloning the repository

### Step-by-Step Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repository/wrench-platform.git
   cd wrench-platform
   ```

2. **Install project dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the project root and add the necessary environment variables:

   ```env
   DISCORD_TOKEN=your_discord_bot_token
   DISCORD_CHANNEL_ID=your_discord_channel_id
   DISCORD_LOG_CHANNEL=your_discord_log_channel_id
   MONGODB_URI=mongodb://your_mongodb_uri
   SECRET_KEY=your_jwt_secret_key
   ```

4. **Run MongoDB**: 
   
   If you're using a local MongoDB instance, start it by running:

   ```bash
   mongod
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

6. **Access the application**:

   Open your browser and navigate to `http://localhost:5000` to use the platform.

## API Endpoints

### Authentication

- **POST** `/register`: Register a new user with an email and password.
- **POST** `/login`: Authenticate a user and return a JWT.
- **GET** `/confirm`: Confirm user email with a token.
- **POST** `/forgot-password`: Initiate password reset flow by sending a reset link via email.
- **GET** `/reset-password`: Reset a user's password using a provided token.

### Games

- **POST** `/upload`: Upload game images.
- **POST** `/upload-game`: Upload a new game with accompanying files.
- **GET** `/get-all-games`: Retrieve all available games.
- **GET** `/search-game`: Search for games by filters such as name, author, category, or multiplayer mode.
- **POST** `/get-all-owned-games`: Get a user's library of owned games based on their JWT token.

### Reviews

- **POST** `/add-review`: Add a review for a game.
- **GET** `/get-reviews`: Retrieve all reviews for a particular game.

### Newsletter & User Data

- **POST** `/subscribe`: Subscribe to the newsletter by providing an email address.
- **GET** `/get-user-data`: Retrieve user information by username.

### Discord Integration

- The platform logs important events, like user registrations and game uploads, directly to a Discord channel using the Discord bot.

## How to Use the Platform

1. **Register**: Create a new account using the `/register` endpoint.
2. **Login**: Authenticate yourself and retrieve a JWT token using the `/login` endpoint.
3. **Upload Games**: Use the `/upload-game` endpoint to upload games along with their associated files.
4. **Search for Games**: Use `/search-game` to search the game library with various filters.
5. **Review Games**: Add reviews for games and check out other users' reviews.
6. **Subscribe to Newsletter**: Subscribe to the newsletter via `/subscribe`.

## Contribution

We welcome contributions! Feel free to fork the repository and submit a pull request with your changes. If you encounter any issues, please create a new issue in the GitHub repository.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the software, but please give credit to the original authors.

<sub><sub> ChatGPT <sup><sup>
ChatGPT has helped us to write backend readme and solve hard errors in backend
