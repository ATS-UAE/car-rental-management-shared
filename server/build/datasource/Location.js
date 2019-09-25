"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(require("./DataSource"));
const enums_1 = require("../variables/enums");
const rbac_1 = __importDefault(require("../utils/rbac"));
const exceptions_1 = require("../utils/exceptions");
class Location extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role.name;
        let foundLocation = await this.getLocation(id);
        if (!foundLocation) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.LOCATIONS, {
            accessor: this.user,
            target: foundLocation
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundLocation;
    }
    async getAll() {
        let role = this.user.role.name;
        let foundLocations = await this.getLocations({
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.LOCATIONS)
        });
        let locations = [];
        for (let location of foundLocations) {
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.LOCATIONS, {
                accessor: this.user,
                target: location
            });
            if (accessible) {
                locations.push(location);
            }
        }
        return locations;
    }
    async update(id, data) {
        let role = this.user.role.name;
        let foundLocation = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.LOCATIONS, {
            accessor: this.user,
            target: foundLocation
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundLocation.update(data);
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role.name;
        let foundLocation = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.DELETE, enums_1.Resource.LOCATIONS, {
            accessor: this.user,
            target: foundLocation
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundLocation.destroy();
        return foundLocation;
    }
    async create(data) {
        let role = this.user.role.name;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.LOCATIONS, {
            accessor: this.user
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        let createdUser = await this.createLocation(data);
        return createdUser;
    }
}
exports.default = Location;
