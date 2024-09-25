Sure! Here’s the updated documentation for the Wrench Game Store API, incorporating the details from your code. 

# Wrench Game Store API Documentation

This project is an API built using Node.js, Express, and MongoDB for managing users and games for a game store. It supports user registration, login, email confirmation, game uploading, and other functionalities.

## Features

- **User Registration & Login:** 
  - New users can register and confirm their email.
  - Users can log in using a username or email and password.
  
- **Email Confirmation:** 
  - After registration, an email is sent to the user for email verification.

- **Game Management:** 
  - Games can be added to the database with metadata like name, description, file location, author, category, price, and ratings.
  - Users can retrieve their owned games and search for games using various filters (e.g., text search, category, price range).

- **Password Management:**
  - Users can reset their passwords via email.
  - Passwords are encrypted using `bcryptjs` for security.

- **Discord Integration:** 
  - Uploaded images can be sent to a specified Discord channel.

## Prerequisites

To run this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) v12 or later
- [MongoDB](https://www.mongodb.com/) instance
- [Discord.js](https://discord.js.org/) library for Discord functionalities

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mikosavolainen/GameShop.git
   cd GameShop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   DISCORD_TOKEN=your_discord_bot_token
   DISCORD_CHANNEL_ID=your_discord_channel_id
   PORT=5000
   ```

4. Start the server:
   ```bash
   node index.js
   ```

## API Endpoints

### User Registration

- **POST** `/register`
  - Request Body:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string",
      "phonenumber": "number"
    }
    ```

- **Response:**
  - Status `243`: Confirmation email sent.
  - Status `409`: User or email already exists.

### User Login

- **POST** `/login`
  - Request Body:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Response:**
  - Status `200`: Returns a JWT token.
  - Status `401`: Invalid credentials or user not found.
  - Status `403`: Email is not verified.

### Email Confirmation

- **GET** `/confirm`
  - Query Parameter:
    - `confirm`: JWT token for confirmation.

- **Response:**
  - Status `200`: Email confirmed successfully.
  - Status `400`: Invalid or expired confirmation link.

### Game Management

#### Upload Game

- **POST** `/upload-game`
  - Form Data:
    - `gamefile`: File to upload.
    - Other fields in the request body:
      ```json
      {
        "name": "string",
        "desc": "string",
        "author": "string",
        "category": "string", // Comma-separated
        "price": "number",
        "multiplayer": "boolean"
      }
      ```

- **Response:**
  - Status `201`: Game uploaded successfully.
  - Status `400`: Game file is required.
  - Status `500`: Failed to upload the game.

#### Get All Games

- **POST** `/get-all-games`
  
- **Response:**
  - Status `200`: Returns a list of all games.
  - Status `500`: Internal server error.

#### Search Games

- **GET** `/search-game`
  - Query Parameters:
    - `text`: Search term for name, description, or author.
    - `category`: Filter by category.
    - `multiplayer`: Filter by multiplayer availability (true/false).
    - `minPrice`: Minimum price.
    - `maxPrice`: Maximum price.
    - `minRating`: Minimum average rating.
    - `author`: Filter by author.

- **Response:**
  - Status `200`: Returns a list of matching games.
  - Status `404`: No games found matching the query.
  - Status `500`: Internal server error.

### Password Management

#### Forgot Password

- **POST** `/forgot-password`
  - Request Body:
    ```json
    {
      "email": "string"
    }
    ```

- **Response:**
  - Status `200`: Reset password email sent.
  - Status `400`: Email not found.

#### Reset Password

- **GET** `/reset-password`
  - Query Parameter:
    - `token`: JWT token for password reset.

- **Response:**
  - Status `200`: Password reset successfully.
  - Status `400`: Invalid token.

### Discord Image Upload

- **POST** `/upload`
  - Form Data:
    - `images`: File(s) to upload (max 10 files).

- **Response:**
  - Status `200`: Returns URLs of uploaded images.
  - Status `400`: No files uploaded.
  - Status `500`: Internal server error during image upload.

## Conclusion

The Wrench Game Store API provides robust functionalities for managing a game store, including user management, game management, and integration with Discord. Follow the above steps to set up the API and start using its features!