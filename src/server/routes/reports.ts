import express from "express";
import { Wialon } from "node-wialon";
import { Op, Filterable } from "sequelize";

import { requireHigherOrEqualRole } from "../middlewares";
import {
	Vehicle,
	Booking,
	Accident,
	VehicleIssue,
	Location,
	Category
} from "../models";
import { ResponseBuilder, RoleUtils } from "../utils";
import { Role } from "../variables/enums";

const router = express.Router();

router.use(requireHigherOrEqualRole(Role.KEY_MANAGER));

interface UnitSummaryResponse {
	plateNumber: string;
	brand: string;
	model: string;
	odometer: number | null;
	accidents: number;
	bookings: number;
	categories: string[];
	issues: number;
	defleeted: boolean;
	wialonUnit: boolean;
	wialonUnitName?: string | null;
	client?: string;
}

router.get("/unit-summary", async ({ user }, res) => {
	let response = new ResponseBuilder<UnitSummaryResponse[]>();
	const w = await Wialon.login({ token: process.env.WIALON_TOKEN });

	let whereOptions: Filterable["where"] = { clientId: user.clientId };

	if (user.role === Role.MASTER) {
		whereOptions = {};
	}

	let clientUsersIds = (
		await Vehicle.findAll({
			where: whereOptions
		})
	).map(user => user.id);

	let clientVehicles = await Vehicle.findAll({
		where: whereOptions,
		include: [
			{
				model: Accident,
				as: "accidents",
				where: {
					userId: {
						[Op.in]: clientUsersIds
					}
				},
				required: false
			},
			{
				model: Booking,
				as: "bookings",
				where: {
					userId: {
						[Op.in]: clientUsersIds
					}
				},
				required: false
			},
			{
				model: Category,
				as: "categories",
				where: whereOptions,
				required: false
			},
			{
				model: VehicleIssue,
				as: "vehicleIssues"
			},
			Location
		]
	});

	const units = await w.Utils.getUnits({ flags: 8192 + 1 });

	const data = clientVehicles.map<UnitSummaryResponse>(vehicle => {
		const wialonUnit = units.items.find(
			unit => unit.id === vehicle.wialonUnitId
		);

		return {
			plateNumber: vehicle.plateNumber,
			brand: vehicle.brand,
			model: vehicle.model,
			odometer: (wialonUnit && wialonUnit.cnm) || null,
			accidents: vehicle.accidents.length,
			bookings: vehicle.bookings.filter(booking => booking.finished).length,
			categories: vehicle.categories.map(category => category.name),
			issues: vehicle.vehicleIssues.length,
			defleeted: vehicle.defleeted,
			wialonUnit: Boolean(wialonUnit),
			wialonUnitName: RoleUtils.isRoleBetter(Role.MASTER, user.role)
				? (wialonUnit && wialonUnit.nm) || null
				: undefined,
			client: RoleUtils.isRoleBetter(Role.MASTER, user.role)
				? vehicle.client && vehicle.client.name
				: undefined
		};
	});

	response.setData(data);
	response.handleSuccess("Report successful.", res);

	res.json(response);
});

export default router;
