require("dotenv").config();
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");

const { getStaticFilesPath } = require("./utils");
const config = require("./config");
const db = require("./models");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const enumRoutes = require("./routes/enums");
const inviteRoutes = require("./routes/invites");
const vehicleRoutes = require("./routes/vehicles");
const bookingRoutes = require("./routes/bookings");
const locationRoutes = require("./routes/locations");
const accidentRoutes = require("./routes/accidents");
const categoryRoutes = require("./routes/categories");

const app = express();

// PASSPORT CONFIGURATIONS
passport.use(
	new Strategy(async (username, password, cb) => {
		try {
			let existingUser = await db.User.findOne({
				where: { username }
			});
			if (existingUser) {
				existingUser = existingUser.get({ plain: true });
				let valid = await bcrypt.compare(password, existingUser.password);

				if (!valid || existingUser.blocked) {
					return cb(null, false);
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

passport.serializeUser(function(user, cb) {
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

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
	require("express-session")({
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

app.use("/static", express.static(getStaticFilesPath()));
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(config.serverPort, () => {
	console.log(`Listening on port ${config.serverPort}`);
});
