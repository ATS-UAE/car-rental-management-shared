import * as Yup from "yup";

import { User, Vehicle } from "../../models";
import { BookingType } from "../../variables/enums";
import moment = require("moment");

export abstract class Booking {
	static bookVehicle = Yup.object().shape({
		userId: Yup.number()
			.required()
			.test(
				"db-exist",
				({ value }) => `User with ID ${value} does not exist.`,
				async value => Boolean(await User.findByPk(value))
			),
		vehicleId: Yup.number()
			.required()
			.test(
				"db-exist",
				({ value }) => `Vehicle with ID ${value} does not exist.`,
				async value => Boolean(await Vehicle.findByPk(value))
			),
		from: Yup.number()
			.positive()
			.required()
			.transform(v => moment(v, "X").toDate()),
		to: Yup.number()
			.positive()
			.required()
			.test(
				"no-lower-than-other",
				async function() {
					const { parent } = this;
					return `Booking time start cannot be lower than ${moment(
						parent.from,
						"X"
					).format("YYYY/MM/DD HH:mm")}`;
				},
				async function(value) {
					const { parent } = this;
					return value < parent.from;
				}
			)
			.transform(v => moment(v, "X").toDate()),
		bookingType: Yup.string()
			.oneOf(Object.values(BookingType))
			.required(),
		startMileage: Yup.number()
			.nullable()
			.transform(v => (v === undefined ? null : v)),
		endMileage: Yup.number().test(
			"no-lower-than-other",
			function() {
				const { parent } = this;
				return `End mileage cannot be lower than ${parent.endMileage}`;
			},
			function(value) {
				const { parent } = this;
				return parent.startMileage !== null && value < parent.startMileage;
			}
		),
		startFuel: Yup.number(),
		endFuel: Yup.number().test(
			"no-lower-than-other",
			function() {
				const { parent } = this;
				return `End fuel cannot be lower than ${parent.startFuel}`;
			},
			function(value) {
				const { parent } = this;
				return parent.startFuel !== null && value < parent.startFuel;
			}
		),
		replaceVehicle: Yup.lazy(function() {
			const { parent } = this;
			if (parent.bookingType === BookingType.REPLACEMENT) {
				return Yup.object().shape({
					plateNumber: Yup.string().required(),
					vin: Yup.string().required(),
					brand: Yup.string().required(),
					model: Yup.string().required()
				});
			}
			return Yup.mixed()
				.transform(() => null)
				.notRequired();
		})
	});
}
