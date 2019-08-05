import moment from "moment-timezone";
import path from "path";
import fs from "fs";
import { BookingStatus } from "../../variables/enums";
import { Moment } from "moment";
import { URL } from "url";

export { default as ResponseBuilder } from "./ResponseBuilder";

export const pickFields = (target: object, fields: string[]): object => {
	const result = {};
	for (let key in target) {
		if (fields.indexOf(key) >= 0) result[key] = target[key];
	}
	return result;
};

export const exceptFields = (fields: string[], target: object): object => {
	let result = {};

	for (let key in target) {
		if (fields.indexOf(key) < 0) result[key] = target[key];
	}

	return result;
};

export const sqlDateToMoment = (date: string): Moment =>
	moment(date, "YYYY-MM-DDTHH:mm:ss", "UTC");

export const toMySQLDate = (unixS: number): string =>
	moment(unixS, "X").format("YYYY-MM-DD HH:mm:ss");

export const toUnix = (date: string): number => sqlDateToMoment(date).unix();

export const getStaticFilesPath = (): string =>
	path.join(process.env.CAR_RENTAL_MANAGEMENT_API_STORAGE_PATH);

export const getFileURL = (filePath: string, fileName: string): string =>
	new URL(`${process.env.SERVER_URL}/static/${filePath}/${fileName}`).href;

export const getPathFromURL = (fileURL: string): string =>
	path.join(
		getStaticFilesPath(),
		fileURL.replace(new RegExp(`^${process.env.SERVER_URL}/static`), "")
	);

export const makeDirectoryIfNotExist = (filePath: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.mkdir(filePath, { recursive: true }, err => {
			if (err) {
				reject(err);
			} else {
				resolve(filePath);
			}
		});
	});
};

export const deleteFileFromUrl = (fileUrl: string): Promise<void> =>
	fs.promises.unlink(getPathFromURL(fileUrl));

export const convertSequelizeDatesToUnix = (obj: any): void => {
	if (obj instanceof Array) {
		for (let value of obj) {
			convertSequelizeDatesToUnix(value);
		}
	} else if (obj && typeof obj === "object") {
		const values = obj.dataValues ? obj.dataValues : obj;

		for (let key in values) {
			if (values[key] instanceof Date) {
				values[key] = moment(values[key]).unix();
			} else if (typeof values[key] === "object") {
				convertSequelizeDatesToUnix(values[key]);
			}
		}
	}
};

export const getBookingStatus = (booking: {
	from: number;
	to: number;
	[key: string]: any;
}): BookingStatus => {
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

export const hasActiveBooking = (vehicle: any, bookingId?: number): boolean => {
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
	vehicle: any,
	from: number,
	to: number,
	bookingId: number
): boolean => {
	let taken = false;
	if (vehicle && vehicle.bookings) {
		for (const booking of vehicle.bookings) {
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
	}
	return taken;
};

export const rangeOverlap = (
	x1: number,
	x2: number,
	y1: number,
	y2: number
): boolean => {
	return Math.max(x1, y1) <= Math.min(x2, y2);
};
