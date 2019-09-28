"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const helpers_1 = require("./utils/helpers");
const enums_1 = require("./variables/enums");
const config_1 = __importDefault(require("./config"));
const models_1 = __importDefault(require("./models"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const enums_2 = __importDefault(require("./routes/enums"));
const invites_1 = __importDefault(require("./routes/invites"));
const vehicles_1 = __importDefault(require("./routes/vehicles"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const locations_1 = __importDefault(require("./routes/locations"));
const accidents_1 = __importDefault(require("./routes/accidents"));
const categories_1 = __importDefault(require("./routes/categories"));
const clients_1 = __importDefault(require("./routes/clients"));
const app = express_1.default();
// PASSPORT CONFIGURATIONS
passport_1.default.use(new passport_local_1.Strategy(async (username, password, cb) => {
    try {
        let existingUser = await models_1.default.User.findOne({
            include: [{ model: models_1.default.Role, as: "role" }],
            where: { username }
        });
        if (existingUser) {
            let valid = await bcryptjs_1.default.compare(password, existingUser.password);
            if (!valid || existingUser.blocked) {
                return cb(null, false);
            }
            else if (existingUser.role.name !== enums_1.Role.MASTER &&
                existingUser.clientId === null) {
                throw new Error("Your account does not belong to a client. Please contact customer support.");
            }
            else {
                return cb(null, existingUser);
            }
        }
        return cb(null, false);
    }
    catch (e) {
        return cb(e);
    }
}));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport_1.default.deserializeUser(async (id, cb) => {
    try {
        let user = await models_1.default.User.findByPk(id, {
            include: [{ model: models_1.default.Role, as: "role" }]
        });
        cb(null, Object.assign({}, user.get({ plain: true }), { categories: (await user.getCategories()).map(c => c.id) }));
    }
    catch (e) {
        cb(e);
    }
});
// EXPRESS CONFIGURATIONS
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    secret: config_1.default.secretKey,
    resave: false,
    saveUninitialized: false
}));
app.use(express_1.default.json());
// TODO: Use config.js for cors options.
app.use(cors_1.default({ origin: process.env.CLIENT_URL, credentials: true }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Express routes
app.use("/api/carbooking/auth", auth_1.default);
app.use("/api/carbooking/users", users_1.default);
app.use("/api/carbooking/enums", enums_2.default);
app.use("/api/carbooking/invites", invites_1.default);
app.use("/api/carbooking/vehicles", vehicles_1.default);
app.use("/api/carbooking/bookings", bookings_1.default);
app.use("/api/carbooking/locations", locations_1.default);
app.use("/api/carbooking/accidents", accidents_1.default);
app.use("/api/carbooking/categories", categories_1.default);
app.use("/api/carbooking/clients", clients_1.default);
app.use("/static", express_1.default.static(helpers_1.getStaticFilesPath()));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
app.listen(config_1.default.serverPort, () => {
    console.log(`Listening on port ${config_1.default.serverPort}`);
});
