"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(require("./DataSource"));
const enums_1 = require("../variables/enums");
const rbac_1 = __importDefault(require("../utils/rbac"));
const exceptions_1 = require("../utils/exceptions");
const helpers_1 = require("../utils/helpers");
const enums_2 = require("../variables/enums");
class Booking extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role.name;
        let foundBooking = await this.getBooking(id, {
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.BOOKINGS)
        });
        if (!foundBooking) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.BOOKINGS, {
            accessor: this.user,
            target: foundBooking
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundBooking;
    }
    async getAll() {
        let role = this.user.role.name;
        let foundBookings = await this.getBookings({
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.BOOKINGS)
        });
        let bookings = [];
        for (let booking of foundBookings) {
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.BOOKINGS, {
                accessor: this.user,
                target: booking
            });
            if (accessible) {
                bookings.push(booking);
            }
        }
        return bookings;
    }
    async update(id, data) {
        let role = this.user.role.name;
        let foundBooking = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.BOOKINGS, {
            accessor: this.user,
            target: foundBooking,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        if (data.replaceVehicle) {
            const replaceVehicle = await this.db.ReplaceVehicle.findByPk(foundBooking.replaceVehicleId);
            if (replaceVehicle) {
                await replaceVehicle.update(data.replaceVehicle);
            }
            else {
                await replaceVehicle.create(data.replaceVehicle);
            }
        }
        else if (foundBooking.replaceVehicle !== null &&
            data.replaceVehicle === undefined) {
            const replaceVehicle = await this.db.ReplaceVehicle.findByPk(foundBooking.replaceVehicleId);
            replaceVehicle.destroy();
        }
        await foundBooking.update(data);
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role.name;
        let foundBooking = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.DELETE, enums_1.Resource.BOOKINGS, {
            accessor: this.user,
            target: foundBooking
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundBooking.destroy();
        return foundBooking;
    }
    async create(data) {
        let role = this.user.role.name;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.BOOKINGS, {
            accessor: this.user,
            body: data
        });
        let replacementVehicle;
        try {
            const bookingType = this.db.BookingType.findByPk(data.bookingTypeId);
            if (bookingType.name === enums_2.BookingType.REPLACEMENT) {
                const { brand, model, plateNumber, vin } = data;
                replacementVehicle = await this.db.ReplaceVehicle.create({
                    brand,
                    model,
                    plateNumber,
                    vin
                });
            }
            if (!accessible) {
                throw new exceptions_1.InvalidPermissionException();
            }
            let exceptions = rbac_1.default.getExcludedFields(role, enums_1.Operation.CREATE, enums_1.Resource.BOOKINGS);
            let createdBooking = await this.createBooking(Object.assign({}, helpers_1.pickFields(data, exceptions), { to: helpers_1.toMySQLDate(data.to), from: helpers_1.toMySQLDate(data.from), replaceVehicleId: (replacementVehicle && replacementVehicle.id) || null }));
            return createdBooking;
        }
        catch (e) {
            replacementVehicle && (await replacementVehicle.destroy());
            throw e;
        }
    }
}
exports.default = Booking;
