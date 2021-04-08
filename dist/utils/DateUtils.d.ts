export interface DateInterval {
    start: Date;
    end: Date;
}
export declare abstract class DateUtils {
    static getDate: (date: Date | number) => Date;
    static formatToLongDateFormat: (date: Date | number) => string;
    static relativeFromNow: (date: Date | number) => string;
    static getDateFromUnixTimestamp: (unix: number) => Date;
    static getUnixTimestampFromDate: (date: Date) => number;
    static dateIsBefore: (date: Date, compare: Date) => boolean;
    static dateIsAfter: (date: Date, compare: Date) => boolean;
    static doesDateIntervalOverlaps: (interval1: DateInterval, interval2: DateInterval) => boolean;
    static addSecondsToDate: (date: Date, seconds: number) => Date;
}
