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
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require('path');
const multer = require("multer");

const SECRET_KEY ="Heh meidän salainen avain :O. ei oo ku meiän! ・:，。★＼(*v*)♪Merry Xmas♪(*v*)/★，。・:・゜ :DD XD XRP ┐( ͡◉ ͜ʖ ͡◉)┌ QSO QRZ ( ͡~ ͜ʖ ͡° ) QRO ( ˘▽˘)っ♨ QRP DLR JKFJ °₊·ˈ∗♡( ˃̶᷇ ‧̫ ˂̶᷆ )♡∗ˈ‧₊°"; // Heh meidän salainen avain :DD
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
	joindate: { type: Date, default: Date.now },
});
const users = mongoose.model("users", userSchema);

const gamesSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String },
	gamefileloc: { type: String },
	author: { type: String },
	category: { type: [String] },
	price: { type: Number },
	ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
	multiplayer: { type: Boolean },
	Picturefileloc: { type: String },
});


const Games = mongoose.model("games", gamesSchema);

const ReviewsSchema = new mongoose.Schema({
	game: { type: String },
	date: { type: Number },
	writer: { type: String },
	ratings: { type: Array },
	desc: { type: String },
});
const Reviews = mongoose.model("Reviews", ReviewsSchema);

const LibrarySchema = new mongoose.Schema({
	owner: { type: String },
	games: { type: Array },
});
const Library = mongoose.model("Library", LibrarySchema);

const NewsletterSchema = new mongoose.Schema({
	email: String,
});
const NewsLetter = mongoose.model("NewsLetter", NewsletterSchema);

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
	res.redirect("lol.tyhjyys.com");
});

app.post("/get-all-owned-games", async (req, res) => {
	try {
		const token = await jwt.verify(req.body.token, SECRET_KEY);
		if (!token) {
			return res.status(400).send("Owner ID is required");
		}
		const games = await Library.find({ owner: token.username });
		res.json(games);
	} catch (error) {
		console.error("Error fetching games:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.post("/get-all-games", async (req, res) => {
	try {
		const game = await Games.find();
		return res.json(game);
	} catch (error) {
		console.error("Error fetching games:", error);
		return res.status(500).send("Internal Server Error");
	}
});


app.get("/search-game", async (req, res) => {
	const {
		text,
		category,
		multiplayer,
		minPrice,
		maxPrice,
		minRating,
		author,
	} = req.query;

	try {
		// Build a dynamic query object
		const query = {};

		// Text search (name, desc, author)
		if (text) {
			const regex = new RegExp(text, "i"); // 'i' for case-insensitive
			query.$or = [
				{ name: { $regex: regex } },
				{ desc: { $regex: regex } },
				{ author: { $regex: regex } },
			];
		}

		// Filter by category
		if (category) {
			query.category = category;
		}

		// Filter by multiplayer (true/false)
		if (multiplayer !== undefined) {
			query.multiplayer = multiplayer === "true"; // ensure it's treated as a boolean
		}

		// Price range filter
		if (minPrice || maxPrice) {
			query.price = {};
			if (minPrice) {
				query.price.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
			}
			if (maxPrice) {
				query.price.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
			}
		}

		// Filter by author
		if (author) {
			query.author = { $regex: new RegExp(author, "i") }; // Fuzzy search on author
		}

		// Perform aggregation to calculate average rating and apply the minimum rating filter
		const aggregationPipeline = [
			{ $match: query }, // Apply all other query filters first
			{
				$addFields: {
					averageRating: { $avg: "$ratings" }, // Calculate the average of the ratings array
				},
			},
			{
				$match: {
					averageRating: { $gte: parseFloat(minRating) || 0 }, // Filter based on minRating (default 0 if not provided)
				},
			},
		];

		// Execute the aggregation pipeline
		const result = await Games.aggregate(aggregationPipeline);

		// Check if any games were found
		if (result.length > 0) {
			return res.status(200).json(result);
		} else {
			return res.status(404).send("No games found matching the query");
		}
	} catch (err) {
		console.error(err);
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
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "games/"); // Destination folder for game uploads
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname); // Save with unique name
	},
});

const upload2 = multer({ storage: storage });

app.post("/upload-game", upload2.single("gamefile"), async (req, res) => {
	const { name, desc, author, category, price, multiplayer } = req.body;

	if (!req.file) {
		return res.status(400).json({ error: "Game file is required." });
	}

	const gameFilePath = req.file.path; // Path to the uploaded game file

	try {
		const newGame = new Games({
			name,
			desc,
			author,
			category: category.split(","), // Assuming category is comma-separated string
			price,
			multiplayer: multiplayer === "true",
			gamefileloc: gameFilePath,
			Picturefileloc: "", // Add picture later if needed
		});

		await newGame.save();
		res.status(201).json({
			message: "Game uploaded successfully!",
			game: newGame,
		});
	} catch (error) {
		console.error("Error uploading game:", error);
		res.status(500).json({ error: "Failed to upload the game." });
	}
});
// Get game by id
app.post('/get-game-by-id', async (req, res) => {
    const id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: 'Peli _id vaaditaan.' });
    }

    try {
        const peli = await Games.findById( id ).exec();

        if (!peli) {
            return res.status(404).send({ error: 'Peliä ei löytynyt.' });
        }

        res.status(200).send(peli);
    } catch (error) {
        console.error('Virhe pelin hakemisessa:', error);
        res.status(500).send({ error: 'Virhe pelin hakemisessa.' });
    }
});
  
// Rekisteröinti
app.post("/register", convertUsernameToLowerCase, async (req, res) => {
	const { username, password, email, phonenumber } = req.body;
	
	// Tarkista onko käyttäjä jo olemassa
	const existingUser = await users.findOne({ username });
	if (existingUser) {
		return res.status(409).send("Email or username already exists");
	}
	
	// Salasana hashataan
	const hashedPassword = await bcrypt.hash(password, 10);
	
	// Luo uusi käyttäjä ja lisää rekisteröintiajan
	const newUser = new users({
		username,
		password: hashedPassword,
		email,
		phonenumber,
		joindate: new Date(), // Lisää rekisteröintiaika tähän
	});
	
	// Tallenna käyttäjä tietokantaan
	await newUser.save();
	
	// Luo vahvistuslinkki
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
	
	// Lähetä vahvistusviesti
	await sendMail(Confirmation, "Email Confirmation", email);
	
	// Lähetä vastaus
	res.status(243).send("Done");
});

app.post("/login", convertUsernameToLowerCase, async (req, res) => {
	var { username, password } = req.body;
	const user = await users.findOne({
		$or: [{ username: username }, { email: username }],
	});
	if (!user) {
		return res.status(401).send("no user or email find");
	}
	if (!user.confirmedemail) {
		return res.status(403).send("email is not verified");
	}
	if (!user || !bcrypt.compareSync(password, user.password)) {
		return res.status(401).send("Invalid credentials");
	}
	username = user.username;
	const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
	res.json({ token });
});

app.post("/reset-password", async (req, res) => {
	const { token, password } = req.query;
	try {
		const x = jwt.verify(token, SECRET_KEY);
		if (x) {
			const newpass = await bcrypt.hash(password, 10);
			await users.findOneAndUpdate(
				{ email: x.email },
				{ password: newpass }
			);
			return res.status(200).send("RESETED");
		}
	} catch (error) {
		res.status(400).send("invalid token");
	}
});

app.post("/forgot-password", convertUsernameToLowerCase, async (req, res) => {
	const { email } = req.body;
	const user = await users.findOne({ email: email });

	if (!user) {
		res.status(400).send("didnt find email");
	}
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
////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 8 * 1024 * 1024 }
});

app.post('/upload', upload.array('images', 10), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded.' });
    }

    try {
        const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
        if (!channel) {
            return res.status(500).json({ error: 'Discord channel not found.' });
        }

        const imageUrls = [];

        for (const file of req.files) {
            const filePath = path.join(__dirname, file.path);

            try {
                const sentMessage = await channel.send({
                    content: `Heh uusi kuva :D: ${file.originalname}`,
                    files: [{
                        attachment: filePath,
                        name: file.originalname
                    }]
                });

                const imageUrl = sentMessage.attachments.first().url;
                imageUrls.push(imageUrl);

                fs.unlinkSync(filePath);
            } catch (error) {
                console.error(`Failed to upload image: ${file.originalname}`, error);
                fs.unlinkSync(filePath);  
            }
        }

        if (imageUrls.length === 0) {
            return res.status(500).json({ error: 'Failed to upload any images.' });
        }

        res.json({ urls: imageUrls });

    } catch (err) {
        console.error('Error uploading images to Discord:', err);
        res.status(500).json({ error: 'Internal server error during image upload.' });
    }
});


////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
