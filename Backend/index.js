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

// Sähköpostin lähettäminen
async function sendMail() {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'wrenchsmail@gmail.com',
                pass: "emxc dnqp eyme gudi"
            },
        });

        const mailOptions = {
            from: 'wrenchsmail@gmail.com',
            to: 'konstalaurell@gmail.com, admin@oh3cyt.com',
            subject: 'FUCK YOU IDIOT GMAIL',
            text: 'FUCK YOU IDIOT GMAIL',
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
