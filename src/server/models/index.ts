import { Sequelize } from "sequelize-typescript";
import bcrypt from "bcryptjs";

import config from "../config";
import { Role as RoleEnum } from "../../shared/typings";

import { Accident } from "./Accident";
import { AccidentUserStatus } from "./AccidentUserStatus";
import { Booking } from "./Booking";
import { Category } from "./Category";
import { Client } from "./Client";
import { ClientLocation } from "./ClientLocation";
import { Location } from "./Location";
import { ReplaceVehicle } from "./ReplaceVehicle";
import { User } from "./User";
import { UserVehicleCategory } from "./UserVehicleCategory";
import { Vehicle } from "./Vehicle";
import { VehicleCategory } from "./VehicleCategory";
import { VehicleIssue } from "./VehicleIssue";

export * from "./Accident";
export * from "./AccidentUserStatus";
export * from "./Booking";
export * from "./Category";
export * from "./Client";
export * from "./ClientLocation";
export * from "./Location";
export * from "./ReplaceVehicle";
export * from "./User";
export * from "./UserVehicleCategory";
export * from "./Vehicle";
export * from "./VehicleCategory";
export * from "./VehicleIssue";

const sequelize = new Sequelize(
	config.database.name,
	config.database.username,
	config.database.password,
	{
		logging: process.env.NODE_ENV === "development" ? console.log : false,
		host: config.database.host,
		port: parseInt(config.database.port),
		models: [
			Accident,
			AccidentUserStatus,
			Booking,
			Category,
			Client,
			ClientLocation,
			Location,
			ReplaceVehicle,
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

	let users = await User.findAll();

	if (users.length === 0) {
		// Create root user...
		let rootPassword = await bcrypt.hash(config.database.password, 10);
		await User.create({
			username: "root",
			password: rootPassword,
			firstName: "Root",
			lastName: "Account",
			email: "support@atsuae.net",
			role: RoleEnum.MASTER,
			mobileNumber: "",
			approved: true
		});
	}
};

export default {
	Accident,
	AccidentUserStatus,
	Booking,
	Category,
	Client,
	ClientLocation,
	Location,
	ReplaceVehicle,
	User,
	UserVehicleCategory,
	Vehicle,
	VehicleCategory,
	VehicleIssue
};
