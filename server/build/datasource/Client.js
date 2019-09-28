"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const lodash_1 = __importDefault(require("lodash"));
const DataSource_1 = __importDefault(require("./DataSource"));
const models_1 = __importDefault(require("../models"));
const enums_1 = require("../variables/enums");
const rbac_1 = __importDefault(require("../utils/rbac"));
const exceptions_1 = require("../utils/exceptions");
class Client extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db, userAccessor, enums_1.Resource.CLIENTS);
        this.get = async (id) => {
            let role = this.user.role.name;
            let foundClient = await this.getClient(id);
            if (!foundClient) {
                throw new exceptions_1.ResourceNotFoundException(`Client with ID of ${id} is not found.`);
            }
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.CLIENTS, {
                accessor: this.user,
                target: foundClient
            });
            if (!accessible) {
                throw new exceptions_1.InvalidPermissionException();
            }
            return foundClient;
        };
        this.update = async (id, data) => {
            let foundClient = await this.get(id);
            const { access, excludedFields } = await this.getUserPermissions(enums_1.Operation.UPDATE, {
                accessor: this.user,
                target: foundClient
            });
            if (!access) {
                throw new exceptions_1.InvalidPermissionException();
            }
            if (data.locations && !excludedFields.includes("locations")) {
                await foundClient.setLocations(data.locations);
                await models_1.default.Vehicle.update({ clientId: null }, {
                    where: { clientId: id, locationId: { [sequelize_1.Op.notIn]: data.locations } }
                });
            }
            if (data.users && !excludedFields.includes("users")) {
                await foundClient.setUsers(data.users);
            }
            if (data.vehicles && !excludedFields.includes("vehicles")) {
                await foundClient.setVehicles(data.vehicles);
            }
            await foundClient.update(lodash_1.default.omit(data, [...excludedFields, "locations", "users", "vehicles"]));
            return [foundClient, await this.get(id)];
        };
    }
    async getAll() {
        let role = this.user.role.name;
        let foundClients = await this.getClients({
            exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.CLIENTS)
        });
        let vehicles = [];
        for (let vehicle of foundClients) {
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.CLIENTS, {
                accessor: this.user,
                target: vehicle
            });
            if (accessible) {
                vehicles.push(vehicle);
            }
        }
        return vehicles;
    }
    async delete(id) {
        let role = this.user.role.name;
        let foundClient = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.DELETE, enums_1.Resource.CLIENTS, {
            accessor: this.user,
            target: foundClient
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundClient.destroy();
        return foundClient;
    }
    async create(data) {
        let role = this.user.role.name;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.CLIENTS, {
            accessor: this.user,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        let createdClient = await this.createClient(data);
        return createdClient;
    }
}
exports.default = Client;
