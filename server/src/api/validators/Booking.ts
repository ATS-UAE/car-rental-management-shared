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
import { catchYupVadationErrors } from "../utils";
import { isBookingTimeSlotTaken, hasActiveBooking } from "../../utils";
import { BookingCreateOptions, BookingUpdateOptions } from "../Booking";

export abstract class Booking {
	private static YupSchemaGet = yup.object().shape({
		id: yup.number(),
		paid: yup.boolean(),
		amount: stripField(yup.number().nullable(), [
			Role.MASTER,
			Role.ADMIN,
			Role.KEY_MANAGER
		]),
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

	private static YupSchemaDestroy = yup.object().shape({
		approved: yup
			.boolean()
			.nullable()
			.test(
				"not-approved",
				"Booking has already been approved and cannot be deleted.",
				value => value === true
			)
	});

	private static YupSchemaCreate = yup
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
					`Booking time end cannot be lower than starting time.`,
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
			replaceVehicle: yup.lazy(function(value, options) {
				const { context } = options;
				if (context["bookingOptions"].bookingType === BookingType.REPLACEMENT) {
					return yup.object().shape({
						plateNumber: yup.string().required(),
						vin: yup.string().required(),
						brand: yup.string().required(),
						model: yup.string().required()
					});
				}
				return yup
					.mixed()
					.nullable()
					.transform(() => null)
					.notRequired();
			})
		})
		.test(
			"timeslot-available",
			"The vehicle is unavailable at the time specified.",
			async function(v) {
				if (v && v.vehicleId && v.from && v.to) {
					const bookedVehicle = await Vehicle.findByPk(v.vehicleId, {
						include: [{ model: BookingModel }]
					});
					return !isBookingTimeSlotTaken(
						bookedVehicle.bookings.map(({ from, to, approved, id }) => ({
							from: moment(from).unix(),
							to: moment(to).unix(),
							approved,
							id
						})),
						v.from,
						v.to
					);
				}
				return false;
			}
		)
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

	private static YupSchemaUpdate = yup
		.object()
		.shape({
			amount: stripField(yup.number().nullable(), [
				Role.MASTER,
				Role.ADMIN,
				Role.KEY_MANAGER
			]),
			from: yup
				.date()
				.transform((value, originalValue) =>
					moment(originalValue, "X").toDate()
				)
				.test("no-approved", "Booking has already been approved", function() {
					const booking = this.options.context["booking"] as BookingModel;
					const user = this.options.context["user"] as User;
					const bookingOptions = this.options.context[
						"bookingOptions"
					] as BookingUpdateOptions;

					const changed = bookingOptions?.from !== booking.from;

					if (!changed) {
						return true;
					}

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
				.transform((value, originalValue) =>
					moment(originalValue, "X").toDate()
				)
				.test("no-approved", "Booking has already been approved", function() {
					const booking = this.options.context["booking"] as BookingModel;
					const user = this.options.context["user"] as User;
					const bookingOptions = this.options.context[
						"bookingOptions"
					] as BookingUpdateOptions;

					const changed = bookingOptions?.to !== booking.to;

					if (!changed) {
						return true;
					}

					// If Guest, deny changes if approved.
					if (user.role === Role.GUEST && booking.approved) {
						return false;
					} else if (user.role === Role.KEY_MANAGER && booking.finished) {
						// If Key Manager, deny if booking has finished.
						return false;
					}
					return true;
				}),
			finished: stripField(
				yup
					.boolean()
					.test(
						"timeslot-available",
						"This booking is intersects with another booking at the time specified.",
						async function(v) {
							const booking = this.options.context["booking"] as BookingModel;
							const bookedVehicle = await Vehicle.findByPk(booking.vehicleId, {
								include: [{ model: BookingModel }]
							});
							return !isBookingTimeSlotTaken(
								bookedVehicle.bookings.map(({ from, to, approved, id }) => ({
									from: moment(from).unix(),
									to: moment(to).unix(),
									approved,
									id
								})),
								v.from,
								v.to,
								v.id
							);
						}
					),
				[Role.MASTER, Role.ADMIN, Role.KEY_MANAGER]
			),
			userId: yup
				.number()
				.test("no-approved", "Booking has already been approved", function() {
					const booking = this.options.context["booking"] as BookingModel;
					const user = this.options.context["user"] as User;

					const bookingOptions = this.options.context[
						"bookingOptions"
					] as BookingUpdateOptions;

					const changed = bookingOptions?.userId !== booking.userId;

					if (!changed) {
						return true;
					}

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
					const bookingOptions = this.options.context[
						"bookingOptions"
					] as BookingUpdateOptions;

					const changed = bookingOptions?.vehicleId !== booking.vehicleId;

					if (!changed) {
						return true;
					}

					// If Guest or KM, deny changes if approved.
					if (user.role === Role.GUEST || user.role === Role.KEY_MANAGER) {
						if (booking.approved) {
							return false;
						}
					}
					return true;
				}),
			startFuel: stripField(yup.number().nullable(), [
				Role.MASTER,
				Role.ADMIN,
				Role.KEY_MANAGER
			]),
			startMileage: stripField(yup.number().nullable(), [
				Role.MASTER,
				Role.ADMIN,
				Role.KEY_MANAGER
			]),
			approved: stripField(
				yup
					.boolean()
					.nullable()
					.test(
						"no-finished-booking",
						"This booking has already finished.",
						function() {
							const booking = this.options.context["booking"] as BookingModel;
							const bookingOptions = this.options.context[
								"bookingOptions"
							] as BookingUpdateOptions;

							const changed = bookingOptions?.approved !== booking.approved;

							if (!changed) {
								return true;
							}

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
							const bookingOptions = this.options.context[
								"bookingOptions"
							] as BookingUpdateOptions;

							const changed = bookingOptions?.approved !== booking.approved;

							if (!changed) {
								return true;
							}

							return changed ? booking.approved !== null : true;
						}
					)
					.test("booking-expired", "Booking has already expired", function() {
						const booking = this.options.context["booking"] as BookingModel;
						const bookingOptions = this.options.context[
							"bookingOptions"
						] as BookingUpdateOptions;

						const changed = bookingOptions?.approved !== booking.approved;

						if (!changed) {
							return true;
						}

						return moment(booking.from).isAfter(moment());
					}),
				[Role.MASTER, Role.ADMIN, Role.KEY_MANAGER]
			),
			endFuel: stripField(yup.number().nullable(), [
				Role.MASTER,
				Role.ADMIN,
				Role.KEY_MANAGER
			]),
			endMileage: stripField(yup.number().nullable(), [
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
				const bookingOptions = options.context[
					"bookingOptions"
				] as BookingModel;
				// If booking type has been changed to replacement, then require a replacement vehicle.
				if (
					bookingOptions.bookingType === BookingType.REPLACEMENT &&
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
								console.log(booking);
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
					.nullable()
					.transform(() => null);
			})
		})
		.test(
			"timeslot-available",
			"The vehicle is unavailable at the time specified.",
			async function(v) {
				if (v && v.id && v.vehicleId && v.from && v.to) {
					const bookedVehicle = await Vehicle.findByPk(v.vehicleId, {
						include: [{ model: BookingModel }]
					});
					return !isBookingTimeSlotTaken(
						bookedVehicle.bookings.map(({ from, to, approved, id }) => ({
							from: moment(from).unix(),
							to: moment(to).unix(),
							approved,
							id
						})),
						v.from,
						v.to,
						v.id
					);
				}
				return false;
			}
		);

	public static get = {
		cast: (user: User, booking: BookingModel) =>
			Booking.YupSchemaGet.cast(booking, {
				context: { user, booking },
				stripUnknown: true
			}),
		validate: (user: User, booking: BookingModel) =>
			catchYupVadationErrors(async () => {
				await Booking.YupSchemaGet.validate(booking, {
					context: { user, booking },
					abortEarly: false
				});
			})
	};

	public static create = {
		cast: (user: User, bookingOptions: BookingCreateOptions) =>
			Booking.YupSchemaCreate.cast(bookingOptions, {
				context: { user, bookingOptions },
				stripUnknown: true
			}),
		validate: (user: User, booking: BookingCreateOptions) =>
			catchYupVadationErrors(async () => {
				await Booking.YupSchemaCreate.validate(booking, {
					context: { user, booking },
					abortEarly: false
				});
			})
	};

	public static update = {
		cast: (
			user: User,
			booking: BookingModel,
			bookingOptions: BookingUpdateOptions
		) =>
			Booking.YupSchemaUpdate.cast(bookingOptions, {
				context: { user, booking, bookingOptions },
				stripUnknown: true
			}),
		validate: (
			user: User,
			booking: BookingModel,
			bookingOptions: BookingUpdateOptions
		) =>
			catchYupVadationErrors(async () => {
				await Booking.YupSchemaUpdate.validate(bookingOptions, {
					context: { user, booking, bookingOptions },
					abortEarly: false
				});
			})
	};

	public static destroy = {
		validate: (user: User, booking: BookingModel) =>
			catchYupVadationErrors(async () => {
				await Booking.YupSchemaDestroy.validate(booking, {
					context: { user },
					abortEarly: false
				});
			})
	};
}

