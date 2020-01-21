import * as Yup from "yup";
import moment from "moment";

import { User, Vehicle as VehicleModel, VehicleAttributes } from "../../models";
import { Role, BookingChargeUnit } from "../../variables/enums";
import { API_OPERATION } from "..";
import { UpdateVehicleOptions, CreateVehicleOptions } from "../Vehicle";
import { Validator, DataCaster } from ".";

type ValidatorParameters = Parameters<typeof Vehicle.getValidator>;

type VehicleValidatorContextWithSchema = [
	ValidatorParameters[0],
	API_OPERATION,
	VehicleModel,
	UpdateVehicleOptions | CreateVehicleOptions,
	Yup.ObjectSchema<VehicleAttributes>
];
export abstract class Vehicle {
	public static getValidator = (
		user: User,
		operation: API_OPERATION,
		data?: {
			target?: VehicleModel;
			newData?: UpdateVehicleOptions | CreateVehicleOptions;
		}
	) => new Validator(Vehicle.validatorSchema, user, operation, data);

	private static validatorSchema = Yup.object<
		Omit<VehicleAttributes, "id" | "createdAt" | "updatedAt">
	>()
		.shape({
			brand: Yup.string(),
			model: Yup.string(),
			plateNumber: Yup.string(),
			vin: Yup.string(),
			defleeted: Yup.boolean(),
			parkingLocation: Yup.string(),
			vehicleImageSrc: Yup.string().nullable(),
			bookingChargeCount: Yup.number(),
			bookingChargeUnit: Yup.mixed()
				.oneOf(Object.values(BookingChargeUnit))
				.nullable(),
			bookingCharge: Yup.number(),
			clientId: Yup.number().nullable(),
			locationId: Yup.number().nullable(),
			wialonUnitId: Yup.number().nullable()
		})
		.when(
			["$user", "$operation", "$target", "$data"],
			(...args: VehicleValidatorContextWithSchema) => {
				const [user, operation, target, data, schema] = args;

				switch (operation) {
					case API_OPERATION.READ: {
						schema.shape({ id: Yup.number() });
						break;
					}
					case API_OPERATION.CREATE: {
						schema
							.shape({
								brand: Yup.string().required(),
								model: Yup.string().required(),
								bookingChargeCount: Yup.number().default(0),
								bookingCharge: Yup.number().default(0)
							})
							.test(
								"permission",
								"You do not have the permission to do this.",
								function() {
									return user.role === Role.MASTER;
								}
							);
						break;
					}
					case API_OPERATION.UPDATE: {
						schema
							.shape({ id: Yup.number().required() })
							.test(
								"permission",
								"You do not have the permission to do this.",
								function() {
									if (user.role === Role.MASTER) {
										return true;
									} else if (
										user.role === Role.ADMIN ||
										user.role === Role.KEY_MANAGER
									) {
										if (target.clientId === user.clientId) {
											return true;
										}
									}

									return false;
								}
							);
						break;
					}
				}

				return schema;
			}
		);
}
