"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(require("./DataSource"));
const enums_1 = require("../variables/enums");
const rbac_1 = __importDefault(require("../utils/rbac"));
const exceptions_1 = require("../utils/exceptions");
class Vehicle extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role.name;
        let foundVehicle = await this.getVehicle(id);
        if (!foundVehicle) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.VEHICLES, {
            accessor: this.user,
            target: foundVehicle
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundVehicle;
    }
    async getAll() {
        let role = this.user.role.name;
        let foundVehicles = await this.getVehicles({
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.VEHICLES)
        });
        let vehicles = [];
        for (let vehicle of foundVehicles) {
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.VEHICLES, {
                accessor: this.user,
                target: vehicle
            });
            if (accessible) {
                vehicles.push(vehicle);
            }
        }
        return vehicles;
    }
    async update(id, data) {
        let role = this.user.role.name;
        let foundVehicle = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.VEHICLES, {
            accessor: this.user,
            target: foundVehicle,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundVehicle.update(data);
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role.name;
        let foundVehicle = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.DELETE, enums_1.Resource.VEHICLES, {
            accessor: this.user,
            target: foundVehicle
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundVehicle.destroy();
        return foundVehicle;
    }
    async create(data) {
        let role = this.user.role.name;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.VEHICLES, {
            accessor: this.user,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        let createdUser = await this.createVehicle(data);
        return createdUser;
    }
}
exports.default = Vehicle;
