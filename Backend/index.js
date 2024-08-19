const http = require("http")
const express = require("express")
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
console.log("LOL")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/LOL', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],  // Reference to Note schema
});
const User = mongoose.model('User', userSchema);

const GamesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    note: { type: String, default: "" },
    user: { type: String },
    version: { type: Number, default: 1 }
})
const Games = mongoose.model('Games', GamesSchema);


// Middleware to convert username to lowercase
const convertUsernameToLowerCase = (req, res, next) => {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
    }
    next();
};


// Registration endpoint
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

// Login endpoint
app.post('/login', convertUsernameToLowerCase, async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});



const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});