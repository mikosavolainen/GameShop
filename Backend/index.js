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
async function sendMail(msg, sub) {
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
            bcc: 'konstalaurell@gmail.com, admin@oh3cyt.com',
            subject: sub,
            html: msg,
            
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}


register = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rekisteröinti onnistui</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #333;
        }
        p {
            font-size: 16px;
            color: #555;
        }

        a.button {
            padding: 1px 6px;
            border: 1px outset buttonborder;
            border-radius: 3px;
            color: buttontext;
            background-color: buttonface;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Rekisteröinti onnistui!</h1>
        <p>Hei,</p>
        <p>Olet onnistuneesti rekisteröitynyt Wrench-pelikauppaan. Kiitos rekisteröitymisestäsi!</p>
        <a href="https://oh3cyt.com" class="button">Kauppaaaaaaaaan</a>
        <p>Ystävällisin terveisin,<br>Wrench-tiimi</p>
    </div>
</body>
</html>`

sub = "Onnistunut registeröinti"

sendMail(register, sub);



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
