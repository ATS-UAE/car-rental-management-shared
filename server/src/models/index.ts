import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

import config from "../config";
import { convertSequelizeDatesToUnix } from "../utils/helpers";
import {
	Role as RoleEnum,
	BookingType as BookingTypeEnum,
	BookingChargeUnit as BookingChargeUnitEnum
} from "../variables/enums";

export * from "./BookingChargeUnit";
export * from "./AccidentUserStatus";
export * from "./User";
export * from "./Booking";
export * from "./BookingType";
export * from "./Category";
export * from "./Client";
export * from "./Location";
export * from "./ReplaceVehicle";
export * from "./Role";
export * from "./Vehicle";
export * from "./VehicleIssue";
export * from "./Accident";

import { Accident } from "./Accident";
import { AccidentUserStatus } from "./AccidentUserStatus";
import { Booking } from "./Booking";
import { BookingChargeUnit } from "./BookingChargeUnit";
import { BookingType } from "./BookingType";
import { Category } from "./Category";
import { Client } from "./Client";
import { Location } from "./Location";
import { ReplaceVehicle } from "./ReplaceVehicle";
import { Role } from "./Role";
import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { VehicleIssue } from "./VehicleIssue";

const sequelize = new Sequelize(
	config.database.name,
	config.database.username,
	config.database.password,
	{
		logging: process.env.NODE_ENV === "development" ? console.log : false,
		host: config.database.host,
		port: parseInt(config.database.port),
		define: {
			hooks: {
				afterFind: (results): void => {
					if (results) {
						convertSequelizeDatesToUnix(results);
					}
				}
			}
		},
		...config.database.sequelize
	}
);

Accident.load(sequelize);
AccidentUserStatus.load(sequelize);
Booking.load(sequelize);
BookingChargeUnit.load(sequelize);
BookingType.load(sequelize);
Category.load(sequelize);
Client.load(sequelize);
Location.load(sequelize);
ReplaceVehicle.load(sequelize);
Role.load(sequelize);
User.load(sequelize);
Vehicle.load(sequelize);
VehicleIssue.load(sequelize);

const db = {
	Accident,
	AccidentUserStatus,
	Booking,
	BookingChargeUnit,
	BookingType,
	Category,
	Client,
	Location,
	ReplaceVehicle,
	Role,
	User,
	Vehicle,
	VehicleIssue
};

sequelize
	.authenticate()
	.then(() => init(db, { sync: {} }))
	.then(() => console.log("Connection has been established successfully."))
	.catch(err => {
		console.error("Unable to connect to the database\n", err);
	});

const init = async (db: any, params: any) => {
	if (params.sync) {
		await db.sequelize.sync(params.sync.options);
	}

	let users = await db.User.findAll({
		include: [{ model: db.Role, as: "role" }]
	});

	let roles = await db.Role.findAll();

	const bookingChargeUnits = await db.BookingChargeUnit.findAll();

	if (roles.length === 0) {
		await Promise.all(
			Object.values(RoleEnum).map(name => db.Role.create({ name }))
		);
		await Promise.all(
			Object.values(BookingTypeEnum).map(name =>
				db.BookingType.create({ name })
			)
		);
	}

	if (users.length === 0) {
		let masterRole = await db.Role.findOne({
			where: { name: RoleEnum.MASTER }
		});

		// Create root user...
		let rootPassword = await bcrypt.hash(config.database.password, 10);
		await db.User.create({
			username: "root",
			password: rootPassword,
			firstName: "Root",
			lastName: "Account",
			email: "support@atsuae.net",
			roleId: masterRole.dataValues.id,
			mobileNumber: "",
			approved: true
		});
	}

	// Create booking charge units.
	for (const unit of Object.values(BookingChargeUnitEnum)) {
		if (!bookingChargeUnits.find(existing => existing.unit === unit)) {
			await db.BookingChargeUnit.create({
				unit: unit
			});
		}
	}
};

export default db;
