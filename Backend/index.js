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
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

const SECRET_KEY = process.env.SECRET_KEY;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.once("open", () => {
	console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	description: { type: String, default: "" },
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
	ratings: { type: [Number] },
	multiplayer: { type: Boolean },
	Picturefileloc: { type: [String] },
});

const Games = mongoose.model("games", gamesSchema);

const ReviewsSchema = new mongoose.Schema({
	game: [{ type: mongoose.Schema.Types.ObjectId, ref: "games" }],
	date: { type: Date, default: Date.now },
	writer: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	rating: { type: Number },
	desc: { type: String },
});
const Reviews = mongoose.model("Reviews", ReviewsSchema);

const LibrarySchema = new mongoose.Schema({
	owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: "games" }],
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
	log("Someone tried to go to /");
	return res.redirect("https://lol.tyhjyys.com");
});

app.post("/subscribe", async (req, res) => {
	const { email } = req.query;
	const letter = new NewsLetter({
		email: email,
	});
	letter.save();
	return res.status(200).send("all good here");
});

app.post("/get-all-owned-games", async (req, res) => {
	try {
		const token = await jwt.verify(req.body.token, SECRET_KEY);
		if (!token) {
			return res.status(400).send("Owner ID is required");
		}
		const user = await users.findOne({ username: token.username });
		console.log(user)
		const games = await Library.find({ owner: user._id }).populate("games");
		return res.json(games);
	} catch (error) {
		console.error("Error fetching games:", error);
		return res.status(500).send("Internal Server Error");
	}
});

app.get("/get-all-games", async (req, res) => {
	const { page, limit } = req.query;
	const offset = (page - 1) * limit;
	try {
		const game = await Games.find().skip(offset).limit(limit);
		return res.json(game);
	} catch (error) {
		console.error("Error fetching games:", error);
		return res.status(500).send("Internal Server Error");
	}
});

app.post("/buy-game", async (req, res) => {
	const { game_id, token } = req.body;
	try {
		const jwts = await jwt.verify(token, SECRET_KEY);
		const user = await users.findOne({ username: jwts.username });

		const library = await Library.findOne({ owner: user._id });
		const hasGame = await Library.findOne({ owner: user._id, games: game_id });

		if (hasGame) {
			return res.status(400).send("You already bought this game.");
		}

		if (library) {
			await Library.findOneAndUpdate(
				{ owner: user._id },
				{ $push: { games: game_id } }
			);
			return res.status(200).send("Game bought successfully.");
		}

		const newLibrary = new Library({
			owner: user._id,
			games: [game_id],
		});
		await newLibrary.save();
		return res.status(201).send("Game bought successfully.");
	} catch (error) {
		console.error(error);
		return res.status(400).send("An error occurred.");
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
		page,
	} = req.query;

	const limit = parseInt(req.query.limit)
	const offset = (page - 1) * limit;
	try {
		const query = {};
		console.log(limit);
		if (text) {
			const regex = new RegExp(text, "i");
			query.$or = [
				{ name: { $regex: regex } },
				{ desc: { $regex: regex } },
				{ author: { $regex: regex } },
			];
		}

		if (category) {
			query.category = category;
		}

		if (multiplayer !== undefined) {
			query.multiplayer = multiplayer === "true";
		}

		if (minPrice || maxPrice) {
			query.price = {};
			if (minPrice) {
				query.price.$gte = parseFloat(minPrice);
			}
			if (maxPrice) {
				query.price.$lte = parseFloat(maxPrice);
			}
		}

		if (author) {
			query.author = { $regex: new RegExp(author, "i") };
		}

		const aggregationPipeline = [
			{ $match: query },
			{
				$addFields: {
					averageRating: { $avg: "$ratings" || null },
				},
			},
			{
				$match: {
					$or: [
						{ averageRating: { $gte: parseFloat(minRating) || 0 } },
						{ averageRating: null },
					],
				},
			},
		];
		console.log(limit)
		const result = await Games.aggregate(aggregationPipeline).skip(offset).limit(limit);

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

app.post("/add-review", async (req, res) => {
	const { game_id, token, stars, desc } = req.body;
	if (!game_id || !token || !stars || !desc) {
		return res.status(400).send("data is missing");
	}
	if (0 > stars > 5) {
		return res.status(400).send("malformed data");
	}
	try {
		const confirmed = jwt.verify(token, SECRET_KEY);
		const user = await users.findOne({ username: confirmed.username });
		const find = await Reviews.findOne({ game: game_id, writer: user._id });
		if (find) {
			return res.status(444).send("already reviewed");
		}
		console.log(user)
		const games = await Library.findOne({ owner: user._id , games: game_id});
		if (!games) {
			return res.status(400).send("you need to buy game for review");
		}
		const game = await Games.findOneAndUpdate(
			{ _id: game_id },
			{ $push: { ratings: stars } }
		);
		const review = new Reviews({
			game: game_id,
			writer: user._id,
			rating: stars,
			desc: desc,
		});
		review.save();
		return res.status(200).send("thank you for your review");
	} catch (error) {
		console.log(error);
		return res.status(400).send("NOPE");
	}
});

app.get("/confirm", async (req, res) => {
	const jwts = req.query.confirm;
	if (jwts) {
		try {
			const { username } = jwt.verify(jwts, SECRET_KEY);
			log(`${username} just confirmed email`);
			await users.findOneAndUpdate(
				{ username },
				{ confirmedemail: true }
			);
			return res.redirect("https://lol.tyhjyys.com");
		} catch (error) {
			return res
				.status(400)
				.send("Invalid or expired confirmation link.");
		}
	} else {
		return res.status(400).send("Confirmation token is missing.");
	}
});

app.post("/update-desc", async (req, res) => {
	const { newDescription, token } = req.body;

	if (!token) {
		return res.status(401).send("No token provided.");
	}

	if (!newDescription) {
		return res.status(400).send("New description is required.");
	}

	try {

		const decoded = jwt.verify(token, secretKey);
		const username = decoded.username;

		const updatedUser = await users.findOneAndUpdate(
			{ username: username.toLowerCase() },
			{ description: newDescription }, 
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).send("User not found.");
		}

		return res.status(200).send({
			message: "Description updated successfully!",
			user: updatedUser,
		});

	} catch (error) {
		console.error("Error updating description:", error);

		if (error.name === "JsonWebTokenError") {
			return res.status(401).send("Invalid token.");
		}

		return res.status(500).send("Internal Server Error");
	}
});

app.get("/get-game-by-id", async (req, res) => {
	const id = req.query.id;

	if (!id) {
		return res.status(400).send({ error: "Peli _id vaaditaan." });
	}

	try {
		const peli = await Games.findById(id);

		if (!peli) {
			return res.status(404).send({ error: "Peliä ei löytynyt." });
		}

		return res.status(200).send(peli);
	} catch (error) {
		console.error("Virhe pelin hakemisessa:", error);
		return res.status(500).send({ error: "Virhe pelin hakemisessa." });
	}
});

app.get("/get-reviews", async (req, res) => {
	try {
		const id = req.query.id;

		if (!id) {
			return res.status(400).send({ error: "Peli id vaaditaan." });
		}

		const reviews = await Reviews.find({ game: id }).populate("writer");
		return res.json(reviews);
	} catch (error) {
		console.error("Virhe haettaessa arvosteluja:", error);
		return res
			.status(500)
			.send({ error: "Something does not work on the server." });
	}
});

app.post("/register", convertUsernameToLowerCase, async (req, res) => {
	const { username, password, email, phonenumber } = req.body;

	const existingUser = await users.findOne({ username });
	if (existingUser) {
		return res.status(409).send("Email or username already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new users({
		username,
		password: hashedPassword,
		email,
		phonenumber,
		joindate: new Date(),
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
	log(`${username} just registered`);
	res.status(243).send("Done");
});
app.get("/get-user-data", async (req, res) => {
	const { username } = req.query;
	if (username) {
		try {
			const user = await users.findOne({ username: username });
			user.password = "SHHH 🤫";
			return res.status(200).send(user);
		} catch (error) {
			console.log(error);
			return res.status(400).send("error getting data ");
		}
	}
	return res.status(401).send("...");
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
	const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" })
	log(`${username} just logged in`);
	return res.json({ token });
});

app.get("/reset-password", async (req, res) => {
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
		return res.status(400).send("invalid token");
	}
});

setInterval(async () => {
	newsletter = `<!DOCTYPE html>
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
        <h1>Our New Newsletter</h1>
        <p>Hello,</p>
        <p>You received our newsletter.</p>
        <p>To read our newsletter, click the button below:</p>
        <a href="https://lol.tyhjyys.com" class="button">Newsletter</a>
        
        <div class="footer">
            <p>Thank you,<br>The Wrench Team</p>
        </div>
    </div>
</body>
</html>


`;

	const x = await NewsLetter.find();
	console.log(x);
	for (var i = 0; i < x.length; i++) {
		console.log(x[i].email);

		await sendMail(newsletter, "You received our newsletter", x[i].email);
	}
	console.log("sent");
}, 1000 * 60 * 60 * 24);

app.post("/forgot-password", convertUsernameToLowerCase, async (req, res) => {
	const { email } = req.body;
	const user = await users.findOne({ email: email });

	if (!user) {
		return res.status(400).send("didnt find email");
	}

	const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'gamefile') {
            cb(null, 'games/');  
        } else if (file.fieldname === 'images') {
            cb(null, 'uploads/');  
        } else {
            cb(new Error('Unknown file type'), false);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 8 * 1024 * 1024 },  
});

app.post('/upload-game', upload.fields([
    { name: 'images', maxCount: 10 },  
    { name: 'gamefile', maxCount: 1 }   
]), async (req, res) => {

    if (!req.files || !req.files.gamefile || req.files.gamefile.length === 0) {
        return res.status(400).json({ error: 'Game file is required.' });
    }
    if (!req.files.images || req.files.images.length === 0) {
        return res.status(400).json({ error: 'No images uploaded.' });
    }

    const { name, desc, author, category, price, multiplayer, token } = req.body;

    try {
        const tokens = await jwt.verify(token, SECRET_KEY);
        console.log(`${tokens.username} just uploaded game ${name}`);
		log(`${tokens.username} just uploaded game ${name}`)

        const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
        if (!channel) {
            return res.status(500).json({ error: 'Discord channel not found.' });
        }

        const imageUrls = [];
        for (const file of req.files.images) {
            const filePath = path.join(__dirname, file.path);

            try {
                const sentMessage = await channel.send({
                    content: `New image uploaded: ${file.originalname}`,
                    files: [{
                        attachment: filePath,
                        name: file.originalname,
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

        const gameFilePath = req.files.gamefile[0].path;

        const newGame = new Games({
            name,
            desc,
            author,
            category: category.split(','),
            price: parseFloat(price),
            multiplayer: multiplayer === 'true',
            gamefileloc: gameFilePath,
            Picturefileloc: imageUrls,
        });

        await newGame.save();

        if (imageUrls.length === 0) {
            return res.status(500).json({ error: 'Failed to upload any images.' });
        }

        return res.status(201).json({
            message: 'Game and images uploaded successfully!',
            game: newGame,
            imageUrls: imageUrls,
        });

    } catch (err) {
        console.error('Error uploading game and images:', err);
        return res.status(500).json({ error: 'Internal server error during upload.' });
    }
});


async function log(msg) {
	const channel = await client.channels.fetch(
		process.env.DISCORD_LOG_CHANNEL
	);
	try {
		const sentMessage = await channel.send({
			content: `${msg}`,
		});
	} catch (error) {
		console.error(`Failed to send msg`, error);
	}
}

////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////
////////////////////////////////////////BOTTI//////////////////////////////////////////

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
