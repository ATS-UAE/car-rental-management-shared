import * as yup from "yup";
import moment from "moment";

import {
	User,
	Vehicle,
	Booking as BookingModel,
	ReplaceVehicle
} from "../../models";
import { BookingType, Role } from "../../variables/enums";
import { stripField } from "./utils";

export abstract class Booking {
	static get = yup.object().shape({
		id: yup.number(),
		paid: yup.boolean(),
		amount: yup.number().nullable(),
		from: yup
			.number()
			.transform((value, originalValue) => moment(originalValue).unix()),
		to: yup
			.number()
			.transform((value, originalValue) => moment(originalValue).unix()),
		approved: yup.boolean().nullable(),
		finished: yup.boolean(),
		startMileage: yup.number().nullable(),
		endMileage: yup.number().nullable(),
		startFuel: yup.number().nullable(),
		endFuel: yup.number().nullable(),
		userId: yup.number(),
		vehicleId: yup.number(),
		bookingType: yup.string().oneOf(Object.values(BookingType)),
		replaceVehicleId: yup.number().nullable(),
		createdAt: yup
			.number()
			.transform((value, originalValue) => moment(originalValue).unix()),
		updatedAt: yup
			.number()
			.nullable()
			.transform(
				(value, originalValue) =>
					(originalValue && moment(originalValue).unix()) || null
			)
	});

	static destroy = yup.object().shape({
		approved: yup
			.boolean()
			.test(
				"not-approved",
				"Booking has already been approved and cannot be deleted.",
				value => value === true
			)
	});

	static create = yup
		.object()
		.shape({
			userId: yup
				.number()
				.required()
				.test(
					"db-no-exist",
					({ value }) => `User with ID ${value} does not exist.`,
					async value => Boolean(await User.findByPk(value))
				),
			vehicleId: yup
				.number()
				.required()
				.test(
					"db-no-exist",
					({ value }) => `Vehicle with ID ${value} does not exist.`,
					async value => Boolean(await Vehicle.findByPk(value))
				),
			from: yup
				.date()
				.required()
				.transform((value, originalValue) =>
					moment(originalValue, "X").toDate()
				),
			to: yup
				.date()
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
						return moment(value, "X") < parent.from;
					}
				)
				.transform((value, originalValue) =>
					moment(originalValue, "X").toDate()
				),
			bookingType: yup
				.string()
				.oneOf(Object.values(BookingType))
				.required(),
			replaceVehicle: yup.lazy(function() {
				const { parent } = this;
				if (parent.bookingType === BookingType.REPLACEMENT) {
					return yup.object().shape({
						plateNumber: yup.string().required(),
						vin: yup.string().required(),
						brand: yup.string().required(),
						model: yup.string().required()
					});
				}
				return yup
					.mixed()
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
					// Only allow bookings on users with the same client.
				} else if (user.role === Role.KEY_MANAGER || user.role === Role.ADMIN) {
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

	static update = yup.object().shape({
		amount: yup.number(),
		from: yup
			.date()
			.transform((value, originalValue) => moment(originalValue, "X").toDate())
			.test("no-approved", "Booking has already been approved", function() {
				const booking = this.options.context["booking"] as BookingModel;
				const user = this.options.context["user"] as User;
				// If Guest, deny changes if approved.
				if (user.role === Role.GUEST && booking.approved) {
					return false;
				} else if (user.role === Role.KEY_MANAGER && booking.finished) {
					// If Key Manager, deny if booking has finished.
					return false;
				}
				return true;
			}),
		to: yup
			.date()
			.transform((value, originalValue) => moment(originalValue, "X").toDate())
			.test("no-approved", "Booking has already been approved", function() {
				const booking = this.options.context["booking"] as BookingModel;
				const user = this.options.context["user"] as User;
				// If Guest, deny changes if approved.
				if (user.role === Role.GUEST && booking.approved) {
					return false;
				} else if (user.role === Role.KEY_MANAGER && booking.finished) {
					// If Key Manager, deny if booking has finished.
					return false;
				}
				return true;
			}),
		finished: stripField(yup.boolean(), [
			Role.MASTER,
			Role.ADMIN,
			Role.KEY_MANAGER
		]),
		userId: yup
			.number()
			.test("no-approved", "Booking has already been approved", function() {
				const booking = this.options.context["booking"] as BookingModel;
				const user = this.options.context["user"] as User;
				// If Guest, deny changes if approved.
				if (user.role === Role.GUEST && booking.approved) {
					return false;
				} else if (user.role === Role.KEY_MANAGER && booking.finished) {
					// If Key Manager, deny if booking has finished.
					return false;
				}
				return true;
			}),
		vehicleId: yup
			.number()
			.test("no-approved", "Booking has already been approved", function() {
				const booking = this.options.context["booking"] as BookingModel;
				const user = this.options.context["user"] as User;
				// If Guest or KM, deny changes if approved.
				if (user.role === Role.GUEST || user.role === Role.KEY_MANAGER) {
					if (booking.approved) {
						return false;
					}
				}
				return true;
			}),
		startFuel: stripField(yup.number(), [
			Role.MASTER,
			Role.ADMIN,
			Role.KEY_MANAGER
		]),
		startMileage: stripField(yup.number(), [
			Role.MASTER,
			Role.ADMIN,
			Role.KEY_MANAGER
		]),
		approved: stripField(
			yup
				.boolean()
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
				}),
			[Role.MASTER, Role.ADMIN, Role.KEY_MANAGER]
		),
		endFuel: stripField(yup.number(), [
			Role.MASTER,
			Role.ADMIN,
			Role.KEY_MANAGER
		]),
		endMileage: stripField(yup.number(), [
			Role.MASTER,
			Role.ADMIN,
			Role.KEY_MANAGER
		]),
		paid: stripField(yup.boolean(), [
			Role.MASTER,
			Role.ADMIN,
			Role.KEY_MANAGER
		]),
		replaceVehicle: yup.lazy(function(value, options) {
			const booking = options.context["booking"] as BookingModel;
			const { parent } = this;
			// If booking type has been changed to replacement, then require a replacement vehicle.
			if (
				parent.bookingType === BookingType.REPLACEMENT &&
				booking.bookingType !== BookingType.REPLACEMENT
			) {
				return yup
					.object()
					.shape({
						plateNumber: yup.string().required(),
						vin: yup.string().required(),
						brand: yup.string().required(),
						model: yup.string().required()
					})
					.required();
			} else if (booking.bookingType === BookingType.REPLACEMENT) {
				// If existing booking type is Replacement, allow updating partially.
				return yup
					.object()
					.shape({
						plateNumber: yup.string(),
						vin: yup.string(),
						brand: yup.string(),
						model: yup.string()
					})
					.when("$booking", (booking, schema) =>
						schema.transform(function(v) {
							this.option;
							const replaceVehicle = ReplaceVehicle.findByPk(
								booking.replaceVehicleId
							);
							return { ...v, ...replaceVehicle };
						})
					);
			}
			return yup
				.mixed()
				.notRequired()
				.transform(() => null);
		})
	});
}
