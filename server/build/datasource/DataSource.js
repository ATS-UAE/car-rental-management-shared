"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rbac_1 = __importDefault(require("../utils/rbac"));
class DataSource {
    constructor(db, user, resource) {
        this.db = db;
        this.user = user;
        this.resource = resource;
        this.getUserPermissions = async (action, params) => {
            if (this.user && this.resource) {
                return {
                    access: await rbac_1.default.can(this.user.role.name, action, this.resource, params),
                    excludedFields: rbac_1.default.getExcludedFields(this.user.role.name, action, this.resource)
                };
            }
            return { access: false, excludedFields: [] };
        };
    }
    createVehicle(data) {
        return this.db.Vehicle.create(data);
    }
    getVehicles(options) {
        return this.db.Vehicle.findAll(Object.assign({}, options, { include: [{ all: true }] }));
    }
    getVehicle(id, options) {
        return this.db.Vehicle.findByPk(id, Object.assign({}, options, { include: [{ all: true }] }));
    }
    createUser(data) {
        return this.db.User.create(data);
    }
    getUsers(options) {
        return this.db.User.findAll(Object.assign({}, options, { include: [{ all: true }] }));
    }
    getUser(id, options) {
        return this.db.User.findByPk(id, Object.assign({}, options, { include: [{ all: true }] }));
    }
    createLocation(data) {
        return this.db.Location.create(data);
    }
    getLocations(options) {
        return this.db.Location.findAll(Object.assign({}, options, { include: [{ all: true }] }));
    }
    getLocation(id, options) {
        return this.db.Location.findByPk(id, Object.assign({}, options, { include: [{ all: true }] }));
    }
    createBooking(data) {
        return this.db.Booking.create(data);
    }
    getBookings(options) {
        return this.db.Booking.findAll(Object.assign({}, options, { include: [{ all: true }] }));
    }
    getBooking(id, options) {
        return this.db.Booking.findByPk(id, Object.assign({}, options, { include: [{ all: true }] }));
    }
    createAccident(data) {
        return this.db.Accident.create(data);
    }
    getAccidents(options) {
        return this.db.Accident.findAll(Object.assign({}, options, { include: [{ all: true }] }));
    }
    getAccident(id, options) {
        return this.db.Accident.findByPk(id, Object.assign({}, options, { include: [{ all: true }] }));
    }
    createClient(data) {
        return this.db.Client.create(data);
    }
    getClients(options) {
        return this.db.Client.findAll(Object.assign({}, options, { include: [{ all: true }] }));
    }
    getClient(id, options) {
        return this.db.Client.findByPk(id, Object.assign({}, options, { include: [{ all: true }] }));
    }
    createCategory(data) {
        return this.db.Category.create(data);
    }
    getCategorys(options) {
        return this.db.Category.findAll(Object.assign({}, options, { include: [{ all: true }] }));
    }
    getCategory(id, options) {
        return this.db.Category.findByPk(id, Object.assign({}, options, { include: [{ all: true }] }));
    }
}
exports.default = DataSource;
