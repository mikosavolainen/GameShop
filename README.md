# Wrench Game Store API

This project is an API built using Node.js, Express, and MongoDB for managing users and games for a game store. It supports user registration, login, email confirmation, and game uploading.

## Features

- **User Registration & Login:** 
  - New users can register and confirm their email.
  - Users can log in using a username and password.
  
- **Email Confirmation:** 
  - After registration, an email is sent to the user for email verification.
  
- **Game Management:** 
  - Games can be added to the database with metadata like name, description, file location, category, price, and rating.
  
- **Password Encryption:** 
  - User passwords are hashed using `bcryptjs` for security.

## Prerequisites

To run this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) v12 or later
- [MongoDB](https://www.mongodb.com/) instance

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

3. Create a `.env` file with the following configuration:
   ```bash
   PORT=5000
   MONGO_URI=mongodb://Kissa:KissaKala2146@37.33.70.228:27018/
   JWT_SECRET=dontplsquessthisLOL
   EMAIL_USER=wrenchsmail@gmail.com
   EMAIL_PASS=your-email-password
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Register a New User
- **Endpoint:** `POST /register`
- **Description:** Registers a new user and sends a confirmation email.
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### Confirm Email
- **Endpoint:** `GET /confirm`
- **Description:** Confirms the user's email address using a token sent via email.
- **Query Parameters:** 
  - `confirm`: The JWT token sent via email.

### Login
- **Endpoint:** `POST /login`
- **Description:** Logs in the user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```

### Upload a Game
- **Endpoint:** `POST /upload`
- **Description:** Uploads a game to the store (Upload logic is still under development).

## MongoDB Schema

### User Schema
```js
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmedemail: { type: Boolean, default: false },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
}
```

### Game Schema
```js
{
  name: { type: String, required: true },
  desc: { type: String },
  gamefileloc: { type: String },
  authow: { type: String },
  category: { type: Array },
  price: { type: Number },
  rating: { type: Array }
}
```

## Email Functionality

The email service is set up using `nodemailer` and Gmail. Once the user registers, an email is sent with a confirmation link. Users must confirm their email to activate their account.

To set up the email service, ensure to replace `EMAIL_USER` and `EMAIL_PASS` in your `.env` file with valid Gmail credentials.

## Security Notes

- **Password Hashing:** Passwords are hashed using `bcryptjs` before saving to the database.
- **JWT Authentication:** Tokens are generated using `jsonwebtoken` and should be stored securely on the client side.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

.