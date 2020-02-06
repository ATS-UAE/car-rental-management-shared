import moment from "moment-timezone";
import path from "path";
import fs from "fs";
import _ from "lodash";
import { Moment } from "moment";
import { URL } from "url";

import { BookingStatus } from "../variables/enums";
import { ExtractArray } from "../typings";
import { Booking } from "../models";

export { default as ResponseBuilder } from "./ResponseBuilder";

export const pickAndMerge = <
	T1 extends object,
	T2 extends object,
	K extends keyof T2
>(
	obj1: T1,
	obj2: T2,
	fields: K[] = []
): Pick<T2, K> & T1 => {
	return { ...obj1, ..._.pick(obj2, fields) };
};

export const getArray = <T>(array: T): ExtractArray<T>[] => {
	return array instanceof Array ? array : [];
};

export const pickFields = (target: object, fields: string[]): object => {
	const result = {};
	for (let key in target) {
		if (fields.indexOf(key) >= 0) result[key] = target[key];
	}
	return result;
};

export const exceptFields = (target: object, fields: string[]): object => {
	let result = {};

	for (let key in target) {
		if (fields.indexOf(key) < 0) result[key] = target[key];
	}

	return result;
};

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

type Converted<T> = {
	[P in keyof T]: T[P] extends Date
		? number
		: T[P] extends Object
		? Converted<T[P]>
		: T[P];
};

export const convertDatesToUnix = <T extends object>(
	object: T
): Converted<T> => {
	const clone = <Converted<T>>_.cloneDeep(object);

	for (const [key, value] of Object.entries(clone)) {
		if (value instanceof Date) {
			clone[key] = <number>moment(value).unix();
		} else if (typeof value === "object") {
			convertDatesToUnix(value);
		}
	}

	return clone;
};

export const getBookingStatus = (booking: {
	from: number;
	to: number;
	approved: boolean | null;
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

export const hasActiveBooking = (
	bookings: Array<{
		from: number;
		to: number;
		approved: boolean | null;
		id: number;
	}>,
	bookingId?: number
): boolean => {
	let active = false;
	if (bookings) {
		for (const booking of bookings) {
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
	bookings: Array<{
		from: number;
		to: number;
		id: number;
	}>,
	from: number,
	to: number,
	bookingId?: number
): boolean => {
	let taken = false;

	for (const booking of bookings) {
		taken = rangeOverlap(from, to, booking.from, booking.to);
		if ((taken && !bookingId) || bookingId !== booking.id) {
			return taken;
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

export * from "./RoleUtils";
