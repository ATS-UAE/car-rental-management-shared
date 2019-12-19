import * as Yup from "yup";
import moment from "moment";

import { User, Vehicle as VehicleModel } from "../../models";
import { BookingType, Role } from "../../variables/enums";

export abstract class Vehicle {
	static create = Yup.object()
		.shape({
			brand: Yup.string().required(),
			model: Yup.string().required(),
			plateNumber: Yup.string(),
			vin: Yup.string(),
			defleeted: Yup.boolean(),
			parkingLocatino: Yup.string(),
			vehicleImageSrc: Yup.string(),
			bookingChargeCount: Yup.number().default(0),
			bookingCharege: Yup.number().default(0),
			clientId: Yup.number(),
			locationId: Yup.number()
		})
		.test(
			"permission",
			"You do not have the permission to do this.",
			function() {
				const user = this.options.context["user"] as User;
				return user.role === Role.MASTER;
			}
		);

	static update = Yup.object()
		.shape({
			brand: Yup.string(),
			model: Yup.string(),
			plateNumber: Yup.string(), // Unique
			vin: Yup.string(),
			defleeted: Yup.boolean(),
			parkingLocation: Yup.string(),
			vehicleImageSrc: Yup.string().nullable(),
			bookingChargeCount: Yup.number(),
			bookingCharege: Yup.number(),
			clientId: Yup.number().nullable(),
			locationId: Yup.number().nullable()
		})
		.test(
			"permission",
			"You do not have the permission to do this.",
			function() {
				const user = this.options.context["user"] as User;
				const vehicle = this.options.context["vehicle"] as VehicleModel;
				if (user.role === Role.MASTER) {
					return true;
				} else if (user.role === Role.ADMIN || user.role === Role.KEY_MANAGER) {
					if (vehicle.clientId === user.clientId) {
						return true;
					}
				}

				return false;
			}
		);
}
