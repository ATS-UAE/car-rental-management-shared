"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const enums_1 = require("../../variables/enums");
const url_1 = require("url");
var ResponseBuilder_1 = require("./ResponseBuilder");
exports.ResponseBuilder = ResponseBuilder_1.default;
exports.pickAndMerge = (obj1, obj2, fields = []) => {
    return Object.assign({}, obj1, lodash_1.default.pick(obj2, fields));
};
exports.pickFields = (target, fields) => {
    const result = {};
    for (let key in target) {
        if (fields.indexOf(key) >= 0)
            result[key] = target[key];
    }
    return result;
};
exports.exceptFields = (fields, target) => {
    let result = {};
    for (let key in target) {
        if (fields.indexOf(key) < 0)
            result[key] = target[key];
    }
    return result;
};
exports.sqlDateToMoment = (date) => moment_timezone_1.default(date, "YYYY-MM-DDTHH:mm:ss", "UTC");
exports.toMySQLDate = (unixS) => moment_timezone_1.default(unixS, "X").format("YYYY-MM-DD HH:mm:ss");
exports.toUnix = (date) => exports.sqlDateToMoment(date).unix();
exports.getStaticFilesPath = () => path_1.default.join(process.env.CAR_RENTAL_MANAGEMENT_API_STORAGE_PATH);
exports.getFileURL = (filePath, fileName) => new url_1.URL(`${process.env.SERVER_URL}/static/${filePath}/${fileName}`).href;
exports.getPathFromURL = (fileURL) => path_1.default.join(exports.getStaticFilesPath(), fileURL.replace(new RegExp(`^${process.env.SERVER_URL}/static`), ""));
exports.makeDirectoryIfNotExist = (filePath) => {
    return new Promise((resolve, reject) => {
        fs_1.default.mkdir(filePath, { recursive: true }, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(filePath);
            }
        });
    });
};
exports.deleteFileFromUrl = (fileUrl) => fs_1.default.promises.unlink(exports.getPathFromURL(fileUrl));
exports.convertSequelizeDatesToUnix = (obj) => {
    if (obj instanceof Array) {
        for (let value of obj) {
            exports.convertSequelizeDatesToUnix(value);
        }
    }
    else if (obj && typeof obj === "object") {
        const values = obj.dataValues ? obj.dataValues : obj;
        for (let key in values) {
            if (values[key] instanceof Date) {
                values[key] = moment_timezone_1.default(values[key]).unix();
            }
            else if (typeof values[key] === "object") {
                exports.convertSequelizeDatesToUnix(values[key]);
            }
        }
    }
};
exports.getBookingStatus = (booking) => {
    let status = enums_1.BookingStatus.UNKNOWN;
    let currentTime = moment_timezone_1.default();
    let hasPassedFrom = moment_timezone_1.default(booking.from, "X").isSameOrBefore(currentTime);
    let hasPassedTo = moment_timezone_1.default(booking.to, "X").isSameOrBefore(currentTime);
    if (booking.approved) {
        if (hasPassedFrom && !hasPassedTo)
            status = enums_1.BookingStatus.ONGOING;
        else if (hasPassedTo)
            status = enums_1.BookingStatus.FINISHED;
        else
            status = enums_1.BookingStatus.APPROVED;
    }
    else {
        if (booking.approved === null) {
            if (hasPassedFrom)
                status = enums_1.BookingStatus.EXPIRED;
            else
                status = enums_1.BookingStatus.PENDING;
        }
        else if (booking.approved === false)
            status = enums_1.BookingStatus.DENIED;
    }
    return status;
};
exports.hasActiveBooking = (vehicle, bookingId) => {
    let active = false;
    if (vehicle && vehicle.bookings) {
        for (const booking of vehicle.bookings) {
            let status = exports.getBookingStatus(booking);
            if (status === enums_1.BookingStatus.PENDING ||
                status === enums_1.BookingStatus.ONGOING ||
                status === enums_1.BookingStatus.APPROVED) {
                if (!bookingId || bookingId !== booking.id)
                    return true;
            }
        }
    }
    return active;
};
exports.isBookingTimeSlotTaken = (vehicle, from, to, bookingId) => {
    let taken = false;
    if (vehicle && vehicle.bookings) {
        for (const booking of vehicle.bookings) {
            let status = exports.getBookingStatus(booking);
            if (status === enums_1.BookingStatus.PENDING ||
                status === enums_1.BookingStatus.ONGOING ||
                status === enums_1.BookingStatus.APPROVED) {
                taken = exports.rangeOverlap(from, to, booking.from, booking.to);
                if ((taken && !bookingId) || bookingId !== booking.id) {
                    return taken;
                }
            }
        }
    }
    return taken;
};
exports.rangeOverlap = (x1, x2, y1, y2) => {
    return Math.max(x1, y1) <= Math.min(x2, y2);
};
