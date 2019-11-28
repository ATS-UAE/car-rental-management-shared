import { Sequelize } from "sequelize-typescript";
import bcrypt from "bcryptjs";

import config from "../config";
import {
	Role as RoleEnum,
	BookingType as BookingTypeEnum,
	BookingChargeUnit as BookingChargeUnitEnum
} from "../variables/enums";
import { convertSequelizeDatesToUnix } from "../utils";

export * from "./Accident";
export * from "./AccidentUserStatus";
export * from "./Booking";
export * from "./BookingChargeUnit";
export * from "./BookingType";
export * from "./Category";
export * from "./Client";
export * from "./ClientLocation";
export * from "./Location";
export * from "./ReplaceVehicle";
export * from "./Role";
export * from "./User";
export * from "./UserVehicleCategory";
export * from "./Vehicle";
export * from "./VehicleCategory";
export * from "./VehicleIssue";

import { Accident } from "./Accident";
import { AccidentUserStatus } from "./AccidentUserStatus";
import { Booking } from "./Booking";
import { BookingChargeUnit } from "./BookingChargeUnit";
import { BookingType } from "./BookingType";
import { Category } from "./Category";
import { Client } from "./Client";
import { ClientLocation } from "./ClientLocation";
import { Location } from "./Location";
import { ReplaceVehicle } from "./ReplaceVehicle";
import { Role } from "./Role";
import { User } from "./User";
import { UserVehicleCategory } from "./UserVehicleCategory";
import { Vehicle } from "./Vehicle";
import { VehicleCategory } from "./VehicleCategory";
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
		models: [
			Accident,
			AccidentUserStatus,
			Booking,
			BookingChargeUnit,
			BookingType,
			Category,
			Client,
			ClientLocation,
			Location,
			ReplaceVehicle,
			Role,
			User,
			UserVehicleCategory,
			Vehicle,
			VehicleCategory,
			VehicleIssue
		],
		...config.database.sequelize
	}
);

sequelize
	.authenticate()
	.then(() => init(sequelize, { sync: {} }))
	.then(() => console.log("Connection has been established successfully."))
	.catch(err => {
		console.error("Unable to connect to the database\n", err);
	});

const init = async (sequelize: Sequelize, params: any) => {
	if (params.sync) {
		await sequelize.sync(params.sync.options);
	}

	let users = await User.findAll({
		include: [{ model: Role, as: "role" }]
	});

	let roles = await Role.findAll();

	const bookingChargeUnits = await BookingChargeUnit.findAll();

	if (roles.length === 0) {
		await Promise.all(
			Object.values(RoleEnum).map(name => Role.create({ name }))
		);
		await Promise.all(
			Object.values(BookingTypeEnum).map(name => BookingType.create({ name }))
		);
	}

	if (users.length === 0) {
		let masterRole = await Role.findOne({
			where: { name: RoleEnum.MASTER }
		});

		// Create root user...
		let rootPassword = await bcrypt.hash(config.database.password, 10);
		await User.create({
			username: "root",
			password: rootPassword,
			firstName: "Root",
			lastName: "Account",
			email: "support@atsuae.net",
			roleId: masterRole.id,
			mobileNumber: "",
			approved: true
		});
	}

	// Create booking charge units.
	for (const unit of Object.values(BookingChargeUnitEnum)) {
		if (!bookingChargeUnits.find(existing => existing.unit === unit)) {
			await BookingChargeUnit.create({
				unit: unit
			});
		}
	}
};

export default {
	Accident,
	AccidentUserStatus,
	Booking,
	BookingChargeUnit,
	BookingType,
	Category,
	Client,
	ClientLocation,
	Location,
	ReplaceVehicle,
	Role,
	User,
	UserVehicleCategory,
	Vehicle,
	VehicleCategory,
	VehicleIssue
};
