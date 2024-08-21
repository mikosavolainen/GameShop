const http = require("http");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Mongoose-yhteys
mongoose.connect('mongodb://87.93.199.160:27018/Testi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],  
});
const User = mongoose.model('User', userSchema);

const GamesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    note: { type: String, default: "" },
    user: { type: String },
    version: { type: Number, default: 1 }
});
const Games = mongoose.model('Games', GamesSchema);

// Middleware to convert username to lowercase
const convertUsernameToLowerCase = (req, res, next) => {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
    }
    next();
};

// OAuth2 Konfiguraatio
const CLIENT_ID = '988104252482-cv969tab240e20b5vdflqph9bi06uk6a.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Sähköpostin lähettäminen
async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'wrenchsmail@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: 'wrenchsmail@gmail.com',
            to: 'konstalaurell@gmail.com, oh3cyt@oh3cyt.com',
            subject: 'Sending Email using Node.js with OAuth2',
            text: 'That was easy!',
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

// Sähköpostin lähetys testauksen yhteydessä
sendMail();

// Rekisteröintipiste
app.post('/register', convertUsernameToLowerCase, async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
});

// Kirjautumispiste
app.post('/login', convertUsernameToLowerCase, async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.post("/upload", async (req, res) => {
    if (req.file) {
        // Upload logic here
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
