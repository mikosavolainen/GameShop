
# Wrench Platform

Wrench is game marketplace that includes user authentication, game management, reviews, file uploads, and Discord bot integration. This project leverages Node.js, Express, MongoDB, JWT-based authentication, and more to provide a robust platform for game enthusiasts.

## Features

- User Registration, Login, and Email Confirmation
- JWT-based Authentication
- Game Management: Add, Search, and Fetch Games
- Reviews and Ratings for Games
- File Uploads (Game Files, Images)
- Forgot Password and Reset Password Flows
- Discord Bot Integration for Logging Events
- Newsletter Subscription

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT), bcrypt.js for password hashing
- **Email**: Nodemailer for sending confirmation and reset emails
- **File Uploads**: Multer for handling file uploads
- **Game Data**: CRUD operations for managing game data
- **Discord Integration**: Discord.js for logging activity in Discord

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/wrench-platform.git
   cd wrench-platform
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:

   ```env
   DISCORD_TOKEN=your_discord_bot_token
   DISCORD_CHANNEL_ID=your_image_channel_here
   DISCORD_LOG_CHANNEL=your_discord_log_channel_id
   MONGODB_URI=mongodb://your_mongodb_uri
   SECRET_KEY=your_jwt_secret_key
   ```

4. Run MongoDB locally or configure a remote instance.

5. Start the server:

   ```bash
   npm start
   ```

6. The application will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST** `/register`: Register a new user
- **POST** `/login`: Login a user and return JWT
- **GET** `/confirm`: Email confirmation with JWT
- **POST** `/forgot-password`: Initiate password reset
- **GET** `/reset-password`: Reset password using token

### Games

- **POST** `/upload-game`: Upload a new game (with file upload)
- **GET** `/get-all-games`: Fetch all games
- **GET** `/search-game`: Search for a game with filters (name, author, category, multiplayer, etc.)
- **POST** `/get-all-owned-games`: Get a user's game library (based on token)

### Reviews

- **POST** `/add-review`: Add a review to a game
- **GET** `/get-reviews`: Get all reviews for a specific game

### Secret

- **Get** `/get-user-data`: Gets user data by name

### Discord Integration

- Logs important events (user registrations, game uploads) to a specified Discord channel.

## How to Use

1. **Register**: Create an account and confirm via email.
2. **Login**: Authenticate yourself and retrieve a JWT token.
3. **Upload Games**: Post your games using the `/upload-game` endpoint.
4. **Search Games**: Use `/search-game` to filter and browse the game library.
5. **Discord Logging**: Events are automatically logged to a Discord channel.

## File Structure

```

├── games/          # Uploaded files are stored here
├── .env            # Environment configuration
├── index.js        # Main entry point
├── package.json    # Project dependencies and scripts
```

## Contributions

Feel free to submit issues or pull requests to enhance the platform.

## License

This project is licensed under the MIT License.
