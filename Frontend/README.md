# Wrench web client

## Setup / installation

1. Clone the ropository
  ```bash
  git clone https://github.com/your-repository/wrench-platform.git
  cd wrench-platform
  ```
2. Install frontend depedencies
  ```bash
  cd frontend
  npm i
  ```
3. Create required .env file in the frontend directory
  ```env
  VITE_SERVER_BASE_API_URL=http://localhost:5000
  ```
4. Start frontend development server
```bash
npm run dev
```
5. In a new terminal: Install backend dependencies
  ```bash
  cd backend
  npm i
  ```
6. Run MongoDB locally or configure a remote instance.
7. Create required .env file in the backend directory
  ```env
  DISCORD_TOKEN=your_discord_bot_token
  DISCORD_LOG_CHANNEL=your_discord_log_channel_id
  MONGODB_URI=mongodb://your_mongodb_uri
  SECRET_KEY=your_jwt_secret_key
  ```
8. Start backend server
  ```bash
  npm run start
  ```
9. Open http://localhost:5173 on a web browser