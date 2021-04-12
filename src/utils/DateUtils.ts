import {
	format,
	formatRelative,
	fromUnixTime,
	isBefore,
	isAfter,
	getUnixTime,
	addSeconds
} from "date-fns";
import { MathUtils } from "./MathUtils";

export interface DateInterval {
	start: Date;
	end: Date;
}

export abstract class DateUtils {
	public static getDate = (date: Date | number) => {
		if (typeof date === "number") {
			return DateUtils.getDateFromUnixTimestamp(date);
		}
		return date;
	};

	public static formatToLongDateFormat = (date: Date | number) => {
		const LONG_DATE_FORMAT = "MMM d yyyy h:mm aa";
		return format(DateUtils.getDate(date), LONG_DATE_FORMAT);
	};

	public static relativeFromNow = (date: Date | number) => formatRelative(DateUtils.getDate(date), new Date());

	public static getDateFromUnixTimestamp = (unix: number) => fromUnixTime(unix);

	public static getUnixTimestampFromDate = (date: Date) => getUnixTime(date);

	public static dateIsBefore = (date: Date, compare: Date) => isBefore(date, compare);

	public static dateIsAfter = (date: Date, compare: Date) => isAfter(date, compare);

	public static doesDateIntervalOverlaps = (
		interval1: DateInterval,
		interval2: DateInterval
	) => MathUtils.rangeOverlap(
			interval1.start.valueOf(),
			interval1.end.valueOf(),
			interval2.start.valueOf(),
			interval2.end.valueOf()
		);

	public static addSecondsToDate = (date: Date, seconds: number) => addSeconds(date, seconds);
}
