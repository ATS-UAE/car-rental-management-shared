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
class Accident extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role.name;
        let foundAccident = await this.getAccident(id, {
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.ACCIDENTS)
        });
        if (!foundAccident) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.ACCIDENTS, {
            accessor: this.user,
            target: foundAccident
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundAccident;
    }
    async getAll() {
        let role = this.user.role.name;
        let foundAccidents = await this.getAccidents({
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.ACCIDENTS)
        });
        let bookings = [];
        for (let booking of foundAccidents) {
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.ACCIDENTS, {
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
        let foundAccident = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.ACCIDENTS, {
            accessor: this.user,
            target: foundAccident
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundAccident.update(data);
        if (data.read) {
            let foundUser = await this.getUser(this.user.id);
            foundAccident.setUserStatus(foundUser, {
                through: { read: true }
            });
        }
        return [foundAccident, this.get(id)];
    }
    async delete(id) {
        let role = this.user.role.name;
        let foundAccident = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.DELETE, enums_1.Resource.ACCIDENTS, {
            accessor: this.user,
            target: foundAccident
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundAccident.destroy();
        return foundAccident;
    }
    async create(data) {
        let role = this.user.role.name;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.ACCIDENTS, {
            accessor: this.user
        });
        const accidentVehicle = await this.getVehicle(data.vehicleId);
        if (!accidentVehicle) {
            throw new exceptions_1.InvalidInputException("Vehicle is not found.", ["vehicleId"]);
        }
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await accidentVehicle.update({
            defleeted: true
        });
        return this.createAccident(helpers_1.pickFields(data, rbac_1.default.getExcludedFields(role, enums_1.Operation.CREATE, enums_1.Resource.ACCIDENTS)));
    }
}
exports.default = Accident;
