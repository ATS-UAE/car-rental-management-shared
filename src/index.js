require("dotenv").config();
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");
const cors = require("cors");

const config = require("./config");
const db = require("./models");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const enumRoutes = require("./routes/enums");
const inviteRoutes = require("./routes/invites");
const vehicleRoutes = require("./routes/vehicles");
const bookingRoutes = require("./routes/bookings");
const locationRoutes = require("./routes/locations");

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

				if (!valid) {
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

passport.deserializeUser(function(id, cb) {
	db.User.findByPk(id, {
		include: [{ model: db.Role, as: "role" }]
	})
		.then(user => cb(null, user.get({ plain: true })))
		.catch(err => cb(err));
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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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

app.listen(config.serverPort, () => {
	console.log(`Listening on port ${config.serverPort}`);
});
