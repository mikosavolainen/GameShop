# Wrench Game Store API

This is a RESTful API built with Node.js, Express, MongoDB, and Mongoose for a game store platform called "Wrench." It provides endpoints for user registration, login, game management, and email verification.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-username/wrench-api.git
    cd wrench-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables by creating a `.env` file in the root directory with the following content:
    ```bash
    MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
    JWT_SECRET=Your_Secret_Key
    GMAIL_USER=wrenchsmail@gmail.com
    GMAIL_PASS=Your_Gmail_App_Password
    ```

4. Run the server:
    ```bash
    npm start
    ```

The API will be running on [http://localhost:5000](http://localhost:5000).

## Usage

To use the API, you can send HTTP requests to the available endpoints. Below is a list of the primary API routes available.

## API Endpoints

### **Authentication**

- **POST /register**
    - Registers a new user and sends an email confirmation link.
    - **Body Parameters**:
        - `username`: String, required
        - `email`: String, required
        - `password`: String, required
        - `phonenumber`: Number, optional

- **POST /login**
    - Logs in a user and returns a JWT token.
    - **Body Parameters**:
        - `username`: String, required
        - `password`: String, required

- **GET /confirm**
    - Confirms a user's email address by verifying the JWT token sent via email.
    - **Query Parameters**:
        - `confirm`: String (JWT token)

### **Game Management**

- **POST /get-all-games**
    - Fetches all available games.

- **POST /get-all-owned-games**
    - Retrieves all games owned by a user.
    - **Body Parameters**:
        - `token`: JWT token of the user

### **Password Management**

- **POST /forgot-password**
    - Sends a password reset link to the user's email.
    - **Body Parameters**:
        - `email`: String, required

- **POST /reset-password**
    - Resets the user's password using the token received via email.
    - **Query Parameters**:
        - `token`: String (JWT token)
        - `password`: String (new password)

## Security

- Passwords are hashed using `bcryptjs`.
- JWT is used for authentication and securing API routes.
- Nodemailer is used for sending verification and password reset emails.

## Contributing

Feel free to contribute by submitting a pull request. Make sure your code is well tested and follows the existing coding conventions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
