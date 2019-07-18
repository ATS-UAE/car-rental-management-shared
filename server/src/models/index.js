const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config");
const bcrypt = require("bcryptjs");
const { asyncForEach, convertSequelizeDatesToUnix } = require("../utils");
const { ROLES, BOOKING_TYPES } = require("../utils/variables");

const createStore = () => {
	let db = {};
	let sequelize = new Sequelize(
		config.database.name,
		config.database.username,
		config.database.password,
		{
			logging: process.env.NODE_ENV === "development" ? console.log : false,
			host: config.database.host,
			port: config.database.port,
			hooks: {
				afterFind: results => {
					if (results) {
						convertSequelizeDatesToUnix(results);
					}
					return results;
				}
			},
			...config.database.sequelize
		}
	);

	fs.readdirSync(__dirname)
		.filter(file => {
			return (
				file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
			);
		})
		.forEach(file => {
			let model = sequelize.import(path.join(__dirname, file));
			db[model.name] = model;
		});

	Object.keys(db).forEach(modelName => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});
	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	sequelize
		.authenticate()
		.then(() => init(db, { sync: { options: {} } }))
		.then(() => console.log("Connection has been established successfully."))
		.catch(err => {
			console.error("Unable to connect to the database\n", err);
		});

	return db;
};

// Initialize database values
const init = async (db, params = {}) => {
	if (params.sync) {
		await db.sequelize.sync(params.sync.options);
	}

	let users = await db.User.findAll({
		include: [{ model: db.Role, as: "role" }]
	});

	let roles = await db.Role.findAll();

	if (roles.length === 0) {
		// Create user types...
		await asyncForEach(Object.values(ROLES), async name => {
			if (typeof name === "string") {
				await db.Role.create({ name });
			}
		});
		await asyncForEach(Object.values(BOOKING_TYPES), async name => {
			if (typeof name === "string") {
				await db.BookingType.create({ name });
			}
		});
	}

	if (users.length === 0) {
		let adminRole = await db.Role.findOne({
			where: { name: ROLES.ADMIN }
		});
		// Create root user...
		let rootPassword = await bcrypt.hash(config.database.password, 10);
		await db.User.create({
			username: "root",
			password: rootPassword,
			firstName: "Ramil",
			lastName: "Amparo",
			gender: "m",
			email: "ramil@atsuae.net",
			roleId: adminRole.dataValues.id,
			mobileNumber: "+971562341841",
			approved: true
		});
	}
};

let db = createStore();

module.exports = db;
