const http = require("http");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const SECRET_KEY =
	"Heh meidän salainen avain :O. ei oo ku meiän! ・:，。★＼(*v*)♪Merry Xmas♪(*v*)/★，。・:・゜ :DD XD XRP ┐( ͡◉ ͜ʖ ͡◉)┌ QSO QRZ ( ͡~ ͜ʖ ͡° ) QRO ( ˘▽˘)っ♨ QRP DLR JKFJ °₊·ˈ∗♡( ˃̶᷇ ‧̫ ˂̶᷆ )♡∗ˈ‧₊°"; // Heh meidän salainen avain :DD
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
mongoose.connect("mongodb://Kissa:KissaKala2146@37.219.151.14:27018/Wrench");

const db = mongoose.connection;

db.once("open", () => {
	console.log("Connected to MongoDB");
});

// User Schema
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	phonenumber: { type: Number },
	password: { type: String, required: true },
	confirmedemail: { type: Boolean, default: false },
});
const users = mongoose.model("users", userSchema);

const gamesSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String },
	gamefileloc: { type: String },
	author: { type: String },
	category: { type: Array },
	price: { type: Number },
	ratings: { type: Array },
	multiplayer: { type: String },
	Picturefileloc: { type: String },
});
const games = mongoose.model("games", gamesSchema);

const ReviewsSchema = new mongoose.Schema({
	game: { type: String },
	date: { type: Number },
	writer: { type: String },
	ratings: { type: Array },
	desc: { type: String },
});
const Reviews = mongoose.model("Reviews", ReviewsSchema);

const LibrarySchema = new mongoose.Schema({
  owner: { type: String},
  game: { type: String },

});
const Library = mongoose.model("Library", LibrarySchema);


const convertUsernameToLowerCase = (req, res, next) => {
	if (req.body.username) {
		req.body.username = req.body.username.toLowerCase();
	}
	if (req.body.email) {
		req.body.email = req.body.email.toLowerCase();
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

// Sähköpostin lähettäminen
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

app.get("/", (req, res) => {
	res.json("hello world");
});

app.post("/get-all-owned-games", async (req, res) => {
  try {
    const ownerId = req.body.owner; 
    if (!ownerId) {
      return res.status(400).send("Owner ID is required");
    }
   
    const games = await Library.find({ owner: ownerId });

    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/get-all-games", async (req, res) => {
	try {
		const game = await games.find();
		return res.json(game);
	} catch (error) {
		console.error("Error fetching games:", error);
		return res.status(500).send("Internal Server Error");
	}
});

app.get("/confirm", async (req, res) => {
	const jwts = req.query.confirm;
	if (jwts) {
		try {
			const { username } = jwt.verify(jwts, SECRET_KEY);
			await users.findOneAndUpdate(
				{ username },
				{ confirmedemail: true }
			);
			return res.send("Email confirmed successfully.");
		} catch (error) {
			return res
				.status(400)
				.send("Invalid or expired confirmation link.");
		}
	} else {
		return res.status(400).send("Confirmation token is missing.");
	}
});

// Rekisteröinti
app.post("/register", convertUsernameToLowerCase, async (req, res) => {
	const { username, password, email, phonenumber } = req.body;
	const existingUser = await users.findOne({
		$or: [{ username: username }, { email: email }],
	});
	if (existingUser) {
		return res.status(409).send("Email or username already exists");
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new users({
		username,
		password: hashedPassword,
		email,
		phonenumber,
	});
	await newUser.save();
	const confirms = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
	const Confirmation = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Confirmation</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
                color: #333;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
            }
            p {
                font-size: 16px;
                color: #555;
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                position: relative;
                padding: 12px 35px;
                margin-top: 20px;
                font-size: 17px;
                font-weight: 500;
                color: #ffffff;
                background: linear-gradient(145deg, #b0b0b0, #e0e0e0);
                border: 2px solid #a6a6a6;
                border-radius: 8px;
                text-decoration: none;
                transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
            }
            .button:hover {
                background: linear-gradient(145deg, #e0e0e0, #b0b0b0);
                color: #333;
                box-shadow: 0 0 15px rgba(128, 128, 128, 0.5);
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Confirm Your Email</h1>
            <p>Hello,</p>
            <p>Please click the button below to confirm your email address and complete the registration process.</p>
            <a href="http://localhost:5000/confirm?confirm=${confirms}" class="button">Confirm Email</a>
            <p class="footer">Thank you,<br>The Wrench Team</p>
        </div>
    </body>
    </html>`;
	await sendMail(Confirmation, "Email Confirmation", email);
	res.status(243).send("Done");
});

app.post("/login", convertUsernameToLowerCase, async (req, res) => {
	const { username, password } = req.body;
	const user = await users.findOne({
		$or: [{ username: username }, { email: username }],
	});
	if (!user.confirmedemail) {
		return res.status(403).send("email is not verified");
	}
	if (!user || !bcrypt.compareSync(password, user.password)) {
		return res.status(401).send("Invalid credentials");
	}
	var uname = user.username;
	const token = jwt.sign({ uname }, SECRET_KEY, { expiresIn: "1h" });
	res.json({ token });
});
app.post("/reset-password", async (req, res) => {
	const { token, password } = req.query;
	const x = jwt.verify(token, SECRET_KEY);
	if (x) {
		const newpass = await bcrypt.hash(password, 10);
		await users.findOneAndUpdate({ email: x.email }, { password: newpass });
		return res.status(200).send("RESETED");
	}
});
app.post("/forgot-password", convertUsernameToLowerCase, async (req, res) => {
	const { email } = req.body;
	const user = await users.findOne({ email: email });

	if (!user) {
		return res.status(400).send("didnt find email");
	}
	if (!user.confirmedemail) {
		return res.status(401).send("You need to confirm your email");
	}
	const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "15min" });

	confirmation = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Confirmation</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            position: relative;
            padding: 12px 35px;
            margin-top: 20px;
            font-size: 17px;
            font-weight: 500;
            color: #ffffff;
            background: linear-gradient(145deg, #b0b0b0, #e0e0e0);
            border: 2px solid #a6a6a6;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .button:hover {
            background: linear-gradient(145deg, #e0e0e0, #b0b0b0);
            color: #333;
            box-shadow: 0 0 15px rgba(128, 128, 128, 0.5);
        }
        .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #999;
            }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hello,</p>
        <p>We received a request to reset the password for your account associated with this email address. If you did not request a password reset, please ignore this email.</p>
        <p>To reset your password, please click the button below:</p>
        <a href="http://localhost:5000/reset-password?token=${token}" class="button">Reset Password</a>
        <p>If the button above does not work, please copy and paste the following link into your web browser:</p>
        <p>http://localhost:5000/reset-password?token=${token}</p>
        <p>This link will expire in 24 hours for your security.</p>
    <div class="footer">
         <p>Thank you,<br>The Wrench Team</p>
    </div>
    </div>
</body>
</html>

`;

	await sendMail(confirmation, "Password reset", email);
	return res.status(200).send("reset password email send");
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
