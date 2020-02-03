import * as yup from "yup";
import moment from "moment";

import {
	User,
	Vehicle,
	Booking as BookingModel,
	ReplaceVehicle,
	BookingAttributes
} from "../../models";
import { BookingType, Role } from "../../variables/enums";
import { stripField } from "./utils";
import { isBookingTimeSlotTaken } from "../../utils";
import { BookingCreateOptions, BookingUpdateOptions } from "../Booking";
import { API_OPERATION } from "..";
import { Validator } from ".";

type ValidatorParameters = Parameters<typeof Booking.getValidator>;

interface BookingValidationData extends Omit<BookingAttributes, "from" | "to"> {
	from: number | Date;
	to: number | Date;
}

type BookingValidatorContextWithSchema = [
	ValidatorParameters[0],
	API_OPERATION,
	BookingModel,
	BookingUpdateOptions | BookingCreateOptions,
	boolean,
	yup.ObjectSchema<BookingValidationData>
];
export abstract class Booking {
	public static getValidator = (
		user: User,
		operation: API_OPERATION,
		data?: {
			target?: BookingModel;
			newData?: BookingUpdateOptions | BookingCreateOptions;
		}
	) => new Validator(Booking.validatorSchema, user, operation, data);

	private static validatorSchema = yup
		.object()
		.shape({
			paid: yup.boolean(),
			amount: yup.number().nullable(),
			from: yup
				.date()
				.transform(
					(v, originalValue) =>
						typeof originalValue === "number" &&
						moment(originalValue, "X").toDate()
				),
			to: yup
				.date()
				.transform(
					(v, originalValue) =>
						typeof originalValue === "number" &&
						moment(originalValue, "X").toDate()
				),
			approved: yup.boolean().nullable(),
			finished: yup.boolean(),
			startMileage: yup.number().nullable(),
			endMileage: yup.number().nullable(),
			startFuel: yup.number().nullable(),
			endFuel: yup.number().nullable(),
			userId: yup.number(),
			vehicleId: yup.number(),
			bookingType: yup.mixed<BookingType>().oneOf(Object.values(BookingType)),
			replaceVehicleId: yup.number().nullable()
		})
		.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			(...args: BookingValidatorContextWithSchema) => {
				let [user, operation, target, data, casting, schema] = args;
				switch (operation) {
					case API_OPERATION.READ: {
						if (data.bookingType === BookingType.REPLACEMENT) {
							schema = schema.shape({
								replaceVehicle: yup
									.object()
									.shape({
										brand: yup.string().nullable(),
										model: yup.string().nullable(),
										vin: yup.string().nullable(),
										plateNumber: yup.string().nullable()
									})
									.nullable()
							});
						}
						schema = schema.shape({
							id: yup.number(),
							from: yup
								.number()
								.transform((v, originalValue) =>
									moment(originalValue as Date).unix()
								),
							to: yup
								.number()
								.transform((v, originalValue) =>
									moment(originalValue as Date).unix()
								),
							createdAt: yup
								.number()
								.transform((v, originalValue) =>
									moment(originalValue as Date).unix()
								),
							updatedAt: yup
								.number()
								.nullable()
								.transform(
									(v, originalValue) =>
										(originalValue && moment(originalValue as Date).unix()) ||
										null
								),
							vehicle: yup.object().shape({
								id: yup.number(),
								brand: yup.string(),
								model: yup.string(),
								vin: yup.string()
							})
						});
						break;
					}
					case API_OPERATION.UPDATE: {
						schema = schema.shape({
							from: yup
								.date()
								.transform((value, originalValue) =>
									moment(originalValue, "X").toDate()
								)
								.test(
									"no-approved",
									"Booking has already been approved",
									function() {
										const changed = data?.from !== target.from;
										if (!changed) {
											return true;
										}
										// If Guest, deny changes if approved.
										if (user.role === Role.GUEST && target.approved) {
											return false;
										} else if (
											user.role === Role.KEY_MANAGER &&
											target.finished
										) {
											// If Key Manager, deny if booking has finished.
											return false;
										}
										return true;
									}
								),
							to: yup
								.date()
								.transform((value, originalValue) =>
									moment(originalValue, "X").toDate()
								)
								.test(
									"no-approved",
									"Booking has already been approved",
									function() {
										const changed = data?.to !== target.to;

										if (!changed) {
											return true;
										}

										// If Guest, deny changes if approved.
										if (user.role === Role.GUEST && target.approved) {
											return false;
										} else if (
											user.role === Role.KEY_MANAGER &&
											target.finished
										) {
											// If Key Manager, deny if booking has finished.
											return false;
										}
										return true;
									}
								),
							finished: stripField(
								yup
									.boolean()
									.test(
										"timeslot-available",
										"This booking is intersects with another booking at the time specified.",
										async function(v) {
											const bookedVehicle = await Vehicle.findByPk(
												target.vehicleId,
												{
													include: [{ model: BookingModel }]
												}
											);
											return !isBookingTimeSlotTaken(
												bookedVehicle.bookings.map(({ from, to, id }) => ({
													from: moment(from).unix(),
													to: moment(to).unix(),
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
								.test(
									"no-approved",
									"Booking has already been approved",
									function() {
										const booking = this.options.context[
											"booking"
										] as BookingModel;
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
										} else if (
											user.role === Role.KEY_MANAGER &&
											booking.finished
										) {
											// If Key Manager, deny if booking has finished.
											return false;
										}
										return true;
									}
								),
							vehicleId: yup
								.number()
								.test(
									"no-approved",
									"Booking has already been approved",
									function() {
										const booking = this.options.context[
											"booking"
										] as BookingModel;
										const user = this.options.context["user"] as User;
										const bookingOptions = this.options.context[
											"bookingOptions"
										] as BookingUpdateOptions;

										const changed =
											bookingOptions?.vehicleId !== booking.vehicleId;

										if (!changed) {
											return true;
										}

										// If Guest or KM, deny changes if approved.
										if (
											user.role === Role.GUEST ||
											user.role === Role.KEY_MANAGER
										) {
											if (booking.approved) {
												return false;
											}
										}
										return true;
									}
								),
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
											const booking = this.options.context[
												"booking"
											] as BookingModel;
											const bookingOptions = this.options.context[
												"bookingOptions"
											] as BookingUpdateOptions;

											const changed =
												bookingOptions?.approved !== booking.approved;

											if (!changed) {
												return true;
											}

											return !booking.finished;
										}
									)
									.test(
										"pending-only",
										function() {
											const booking = this.options.context[
												"booking"
											] as BookingModel;
											return `Booking has already been ${
												booking.approved ? "approved" : "denied"
											}`;
										},
										function() {
											const booking = this.options.context[
												"booking"
											] as BookingModel;
											const bookingOptions = this.options.context[
												"bookingOptions"
											] as BookingUpdateOptions;

											const changed =
												bookingOptions?.approved !== booking.approved;

											if (!changed) {
												return true;
											}

											return changed ? booking.approved !== null : true;
										}
									)
									.test(
										"booking-expired",
										"Booking has already expired",
										function() {
											const booking = this.options.context[
												"booking"
											] as BookingModel;
											const bookingOptions = this.options.context[
												"bookingOptions"
											] as BookingUpdateOptions;

											const changed =
												bookingOptions?.approved !== booking.approved;

											if (!changed) {
												return true;
											}

											return moment(booking.from).isAfter(moment());
										}
									),
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
								// If booking type has been changed to replacement, then require a replacement vehicle.
								if (
									data.bookingType === BookingType.REPLACEMENT &&
									target.bookingType !== BookingType.REPLACEMENT
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
								} else if (target.bookingType === BookingType.REPLACEMENT) {
									// If existing booking type is Replacement, allow updating partially.
									return yup
										.object()
										.shape({
											plateNumber: yup.string(),
											vin: yup.string(),
											brand: yup.string(),
											model: yup.string()
										})
										.transform(v => {
											const replaceVehicle = ReplaceVehicle.findByPk(
												target.replaceVehicleId
											);
											return { ...v, ...replaceVehicle };
										});
								}
								return yup
									.mixed()
									.notRequired()
									.nullable()
									.transform(() => null);
							})
						});

						break;
					}
					case API_OPERATION.CREATE: {
						schema
							.shape({
								paid: stripField(
									yup.boolean().default(false),
									[Role.GUEST],
									true
								),
								amount: stripField(
									yup
										.number()
										.nullable()
										.default(null),
									[Role.GUEST],
									true
								),
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
									if (
										context["bookingOptions"].bookingType ===
										BookingType.REPLACEMENT
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
											bookedVehicle.bookings.map(
												({ from, to, approved, id }) => ({
													from: moment(from).unix(),
													to: moment(to).unix(),
													approved,
													id
												})
											),
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
									} else if (
										user.role === Role.KEY_MANAGER ||
										user.role === Role.ADMIN
									) {
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

						break;
					}
					case API_OPERATION.DELETE: {
						schema = schema.shape({
							approved: yup
								.boolean()
								.nullable()
								.test(
									"not-approved",
									"Booking has already been approved and cannot be deleted.",
									value => value === true
								)
						});
					}
				}

				return schema;
			}
		);
}
