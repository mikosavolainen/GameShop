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
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmedemail: {type: Boolean, default: false},
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
});
const User = mongoose.model('User', userSchema);

const GamesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    gamefileloc: { type: String },
    authow: { type: String },
    category: { type: Array },
    price: { type: Number },
    rating: { type: Array }
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
async function sendMail(msg) {
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
            to: 'konstalaurell@gmail.com',
            subject: 'Confirm email',
            text: msg,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

app.get("/confirm", (req,res)=>{
    var jwts = req.query.confirm
    if (jwts){
        var {username} = jwt.verify(jwts,"dontplsquessthisLOL")
        User.findOneAndUpdate(username,{confirmedemail: true})
    }
})


// Rekisteröintipiste
app.post('/register', convertUsernameToLowerCase, async (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    const confirm = jwt.sign(username,"dontplsquessthisLOL")
    sendMail(`localhost:5000/confirm?confirm=${confirm}`)
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
