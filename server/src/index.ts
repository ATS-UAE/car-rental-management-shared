import env from "dotenv";
env.config();
import express from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import expressSession from "express-session";

import { getStaticFilesPath } from "./utils/helpers";
import { Role } from "./variables/enums";
import config from "./config";
import db from "./models";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import enumRoutes from "./routes/enums";
import inviteRoutes from "./routes/invites";
import vehicleRoutes from "./routes/vehicles";
import bookingRoutes from "./routes/bookings";
import locationRoutes from "./routes/locations";
import accidentRoutes from "./routes/accidents";
import categoryRoutes from "./routes/categories";
import clientRoutes from "./routes/clients";

const app = express();
console.log(process.env);
// PASSPORT CONFIGURATIONS
passport.use(
	new Strategy(async (username, password, cb) => {
		try {
			let existingUser = await db.User.findOne({
				include: [{ model: db.Role, as: "role" }],
				where: { username }
			});

			if (existingUser) {
				let valid = await bcrypt.compare(password, existingUser.password);

				if (!valid || existingUser.blocked) {
					return cb(null, false);
				} else if (
					existingUser.role.name !== Role.MASTER &&
					existingUser.clientId === null
				) {
					throw new Error(
						"Your account does not belong to a client. Please contact customer support."
					);
				} else {
					return cb(null, existingUser);
				}
			}
			return cb(null, false);
		} catch (e) {
			return cb(e);
		}
	})
);

passport.serializeUser(function(user: { id: number }, cb) {
	cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
	try {
		let user = await db.User.findByPk(id, {
			include: [{ model: db.Role, as: "role" }]
		});

		cb(null, {
			...user.get({ plain: true }),
			categories: (await user.getCategories()).map(c => c.id)
		});
	} catch (e) {
		cb(e);
	}
});

// EXPRESS CONFIGURATIONS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	expressSession({
		secret: config.secretKey,
		resave: false,
		saveUninitialized: false
	})
);
app.use(express.json());
// TODO: Use config.js for cors options.
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Express routes
app.use("/api/carbooking/auth", authRoutes);
app.use("/api/carbooking/users", userRoutes);
app.use("/api/carbooking/enums", enumRoutes);
app.use("/api/carbooking/invites", inviteRoutes);
app.use("/api/carbooking/vehicles", vehicleRoutes);
app.use("/api/carbooking/bookings", bookingRoutes);
app.use("/api/carbooking/locations", locationRoutes);
app.use("/api/carbooking/accidents", accidentRoutes);
app.use("/api/carbooking/categories", categoryRoutes);
app.use("/api/carbooking/clients", clientRoutes);

app.use("/static", express.static(getStaticFilesPath()));
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(config.serverPort, () => {
	console.log(`Listening on port ${config.serverPort}`);
});
