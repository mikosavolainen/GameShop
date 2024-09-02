import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const app = express();
const SECRET_KEY = "Heh meidän salainen avain :DD";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://Kissa:KissaKala2146@37.219.151.14:27018/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: Number },
    password: { type: String, required: true },
    confirmedemail: { type: Boolean, default: false },
});
const User = mongoose.model("User", userSchema);

const GamesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    gamefileloc: { type: String },
    author: { type: String },
    category: { type: Array },
    price: { type: Number },
    rating: { type: Array },
});
const Games = mongoose.model("Games", GamesSchema);

const convertUsernameToLowerCase = (req, res, next) => {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
    }
    next();
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "wrenchsmail@gmail.com",
        pass: "emxc dnqp eyme gudi",
    },
});

async function sendMail(Msg, sub, email) {
    try {
        const mailOptions = {
            from: "wrenchsmail@gmail.com",
            bcc: email,
            subject: sub,
            html: Msg,
        };
        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);
    } catch (error) {
        console.log("Error sending email:", error);
    }
}

app.get("/confirm", async (req, res) => {
    const jwts = req.query.confirm;
    if (jwts) {
        try {
            const { username } = jwt.verify(jwts, SECRET_KEY);
            await User.findOneAndUpdate({ username }, { confirmedemail: true });
            res.send("Email confirmed successfully.");
        } catch (error) {
            res.status(400).send("Invalid or expired confirmation link.");
        }
    } else {
        res.status(400).send("Confirmation token is missing.");
    }
});

app.post("/register", convertUsernameToLowerCase, async (req, res) => {
    const { username, password, email, phonenumber } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).send("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        email,
        phonenumber,
    });
    await newUser.save();
    const confirms = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    const Confirmation = `<p>Click <a href="https://api.oh3cyt.com/confirm?confirm=${confirms}">here</a> to confirm your email.</p>`;
    await sendMail(Confirmation, "Email Confirmation", email);
    res.status(201).json({ confirms });
});

app.post("/login", convertUsernameToLowerCase, async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ username: username }, { email: username }] });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send("Invalid credentials");
    }
    var uname = user.username
    const token = jwt.sign({ uname }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.post("/upload", async (req, res) => {
    if (req.file) {
        // Upload logic here
    }
});

export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res);
};
