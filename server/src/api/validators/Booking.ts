import * as Yup from "yup";
import moment from "moment";

import { User, Vehicle, Booking as BookingModel } from "../../models";
import { BookingType, Role } from "../../variables/enums";
import { notInRoles } from "../utils";

export abstract class Booking {
	static create = Yup.object()
		.shape({
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
					function() {
						const { parent } = this;
						return `Booking time start cannot be lower than ${moment(
							parent.from,
							"X"
						).format("YYYY/MM/DD HH:mm")}`;
					},
					function(value) {
						const { parent } = this;
						return value < parent.from;
					}
				)
				.transform(v => moment(v, "X").toDate()),
			bookingType: Yup.string()
				.oneOf(Object.values(BookingType))
				.required(),
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
		})
		.test(
			"permission",
			"You do not have the permission to do this.",
			async function(v) {
				const user = this.options.context["user"] as User;

				// Only allow guest to create bookings on itself.
				if (user.role === Role.GUEST && v.userId === user.id) {
					return true;
				} else if (user.role === Role.KEY_MANAGER || user.role === Role.ADMIN) {
					// Only allow bookings on users with the same client.
					const targetUser = await User.findByPk(user.id);
					if (targetUser.clientId === user.clientId) {
						return true;
					}
				} else if (user.role === Role.MASTER) {
					return true;
				}
				return false;
			}
		);

	static update = Yup.object()
		// Approve/deny booking
		.shape({
			startFuel: Yup.number()
				.nullable()
				.default(null),
			startMileage: Yup.number()
				.nullable()
				.default(null),
			approved: Yup.boolean()
				.required()
				.test(
					"no-finished-booking",
					"This booking has already finished.",
					function() {
						const booking = this.options.context["booking"] as BookingModel;
						return !booking.finished;
					}
				)
				.test(
					"pending-only",
					function() {
						const booking = this.options.context["booking"] as BookingModel;
						return `Booking has already been ${
							booking.approved ? "approved" : "denied"
						}`;
					},
					function() {
						const booking = this.options.context["booking"] as BookingModel;
						return booking.approved !== null;
					}
				)
				.test("booking-expired", "Booking has already expired", function() {
					const booking = this.options.context["booking"] as BookingModel;
					return moment(booking.from).isAfter(moment());
				})
		})
		.test(
			"permission",
			"You do not have the permission to do this.",
			function() {
				const user = this.options.context["user"] as User;
				if ([Role.MASTER, Role.ADMIN, Role.KEY_MANAGER].includes(user.role)) {
					return true;
				}
				return false;
			}
		)
		// Finalize booking
		.shape({
			endFuel: Yup.number()
				.nullable()
				.default(null),
			endMileage: Yup.number()
				.nullable()
				.default(null),
			paid: Yup.boolean().required()
		})
		.test("finished", "Booking is not approved.", function() {
			const booking = this.options.context["booking"] as BookingModel;
			return booking.approved === true;
		})
		.test(
			"permission",
			"You do not have the permission to do this.",
			function() {
				const user = this.options.context["user"] as User;
				if ([Role.MASTER, Role.ADMIN, Role.KEY_MANAGER].includes(user.role)) {
					return true;
				}
				return false;
			}
		);
}
