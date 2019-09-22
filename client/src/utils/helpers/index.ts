import { AxiosError } from "axios";
import moment from "moment";
import BookingStatus from "../../variables/enums/BookingStatus";
import { Booking } from "../../typings/api";
export { default as CancellablePromise } from "./CancellablePromise";
export { default as api } from "./api";

export const hasActiveBooking = (
	vehicle: { [key: string]: any; bookings: any[] },
	bookingId: number
): boolean => {
	let active = false;
	if (vehicle && vehicle.bookings) {
		for (const booking of vehicle.bookings) {
			let status = getBookingStatus(booking);
			if (
				status === BookingStatus.PENDING ||
				status === BookingStatus.ONGOING ||
				status === BookingStatus.APPROVED
			) {
				if (!bookingId || bookingId !== booking.id) return true;
			}
		}
	}
	return active;
};

export const isBookingTimeSlotTaken = (
	vehicleBookings: Array<Booking>,
	from: number,
	to: number,
	bookingId: number
): boolean => {
	let taken = false;

	for (const booking of vehicleBookings) {
		let status = getBookingStatus(booking);
		if (
			status === BookingStatus.PENDING ||
			status === BookingStatus.ONGOING ||
			status === BookingStatus.APPROVED
		) {
			taken = rangeOverlap(from, to, booking.from, booking.to);
			if ((taken && !bookingId) || bookingId !== booking.id) {
				return taken;
			}
		}
	}

	return taken;
};

export const getBookingStatus = (booking: Booking): BookingStatus => {
	let status = BookingStatus.UNKNOWN;
	let currentTime = moment();
	let hasPassedFrom = moment(booking.from, "X").isSameOrBefore(currentTime);
	let hasPassedTo = moment(booking.to, "X").isSameOrBefore(currentTime);
	if (booking.approved) {
		if (hasPassedFrom && !hasPassedTo) status = BookingStatus.ONGOING;
		else if (hasPassedTo) status = BookingStatus.FINISHED;
		else status = BookingStatus.APPROVED;
	} else {
		if (booking.approved === null) {
			if (hasPassedFrom) status = BookingStatus.EXPIRED;
			else status = BookingStatus.PENDING;
		} else if (booking.approved === false) status = BookingStatus.DENIED;
	}
	return status;
};

export const rangeOverlap = (
	x1: number,
	x2: number,
	y1: number,
	y2: number
): boolean => {
	return Math.max(x1, y1) <= Math.min(x2, y2);
};

export const toTitleWords = (word: string, delimiter: string = "_"): string => {
	let splitWord = word.split(delimiter);
	let result = "";
	for (let word of splitWord) {
		for (let i = 0; i < word.length; i++) {
			let letter = word[i];
			if (i === 0) {
				result += letter.toUpperCase();
			} else {
				result += letter.toLowerCase();
			}
		}
		result += " ";
	}
	return result;
};

export const waitForAll = async (obj: any): Promise<any> => {
	if (obj instanceof Array) {
		for (let e of obj) {
			await waitForAll(e);
		}
	} else {
		for (let prop in obj) {
			if (obj[prop]) {
				// If the propriety has a 'then' function it's a Promise
				if (typeof obj[prop].then === "function") {
					obj[prop] = await obj[prop];
				}
				if (obj)
					if (typeof obj[prop] === "object") {
						obj[prop] = await waitForAll(obj[prop]);
					}
			}
		}
	}
	return obj;
};

export class Validator {
	constructor(public test: (v: any) => boolean, public error: string) {}

	static runThroughValidators(
		validators: Validator[],
		validatee: any
	): Validator[] {
		let errors: Validator[] = [];
		for (let i = 0; i < validators.length; i++) {
			let validator = validators[i].test.bind(validators[i].test);
			if (!validator(validatee)) errors.push(validators[i]);
		}
		return errors;
	}
}

export const validators = {
	username: new Validator(
		v => /^.{4,16}$/.test(v),
		"Min 4 characters, max 16 characters."
	),
	minLength: length =>
		new Validator(
			v => new RegExp(`^.{${length},}$`).test(v),
			`Minimum ${length} characters.`
		),
	maxLength: length =>
		new Validator(
			v => new RegExp(`^.{0,${length}}$`).test(v),
			`Maximum ${length} characters.`
		),
	usernameCharacters: new Validator(
		v => /^[a-z0-9_-]+$/.test(v),
		"No special characters."
	),
	password: new Validator(
		v => /.{8,}/.test(v),
		"Password should be greater than 8 characters."
	),
	email: new Validator(
		v =>
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				v
			),
		"Invalid email."
	),
	requiredField: new Validator(
		v => (v === undefined || v === "" ? false : true),
		"This field is required."
	)
};

export const getRelatedDataById = (findId, list, many = false) => {
	let data: any[] = [];
	for (let item of list) {
		if (item.id === findId) {
			if (!many) return item;
			else data.push(item);
		}
	}
	return data;
};

export const search = (keyWord, word) => {
	let pass = true;
	if (keyWord && word) {
		pass = Boolean(
			keyWord.split(" ").every(key => new RegExp(key, "i").test(word))
		);
	}
	return pass;
};

export const cancelablePromise = promise => {
	let hasCanceled = false;

	const wrappedPromise = new Promise(async (resolve, reject) => {
		if (promise instanceof Promise) {
			promise.then(
				value =>
					hasCanceled ? reject({ isCanceled: true, value }) : resolve(value),
				error => reject({ isCanceled: hasCanceled, error })
			);
		} else {
			resolve(promise);
		}
	});

	return {
		promise: wrappedPromise,
		cancel: () => (hasCanceled = true)
	};
};

interface ApiError {
	message: string;
	errors: string[];
}

export const apiErrorHandler = (e: AxiosError): ApiError => {
	let message = "Unknown error.";
	let errors: string[] = [];

	if (e && e.response && e.response.data) {
		message = e.response.data.message;
		errors = e.response.data.errors;
	}

	return { message, errors };
};
