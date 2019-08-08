import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import config from "../config";
import bcrypt from "bcryptjs";
import { convertSequelizeDatesToUnix } from "../utils/helpers";
import { Role, BookingType } from "../variables/enums";

class DB {
	[key: string]: any;
	constructor() {
		return this.sequelize();
	}
	public sequelize(): any {
		const sequelize = new Sequelize(
			config.database.name,
			config.database.username,
			config.database.password,
			{
				logging: process.env.NODE_ENV === "development" ? console.log : false,
				host: config.database.host,
				port: parseInt(config.database.port),
				hooks: {
					afterFind: (results): void => {
						if (results) {
							convertSequelizeDatesToUnix(results);
						}
					}
				},
				...config.database.sequelize
			}
		);
		const db: any = {};
		const modelPath = path.join(__dirname);
		const basename = path.basename(__filename);
		fs.readdirSync(modelPath)
			.filter(
				file =>
					file.indexOf(".") !== 0 &&
					file !== basename &&
					file.slice(-3) === ".js"
			)
			.forEach(file => {
				const model = sequelize.import(modelPath + file);
				db[model.name] = model;
			});

		Object.keys(db).forEach(modelName => {
			if (db[modelName].associate) {
				db[modelName].associate(db);
			}
		});
		db.sequelize = sequelize;
		sequelize
			.authenticate()
			.then(() => this.init(db, { sync: { options: {} } }))
			.then(() => console.log("Connection has been established successfully."))
			.catch(err => {
				console.error("Unable to connect to the database\n", err);
			});

		return db;
	}
	private async init(db: any, params: any) {
		if (params.sync) {
			await db.sequelize.sync(params.sync.options);
		}

		let users = await db.User.findAll({
			include: [{ model: db.Role, as: "role" }]
		});

		let roles = await db.Role.findAll();

		if (roles.length === 0) {
			await Promise.all(
				Object.values(Role).map(name => db.Role.create({ name }))
			);
			await Promise.all(
				Object.values(BookingType).map(name => db.BookingType.create({ name }))
			);
		}

		if (users.length === 0) {
			let adminRole = await db.Role.findOne({
				where: { name: Role.ADMIN }
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
	}
}

const db = new DB();

export default db;