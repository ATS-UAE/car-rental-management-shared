"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataSource {
    constructor(db) {
        this.db = db;
    }
    createVehicle(data) {
        return this.db.Vehicle.create(data);
    }
    getVehicles(options) {
        return this.db.Vehicle.findAll(options);
    }
    getVehicle(id, options) {
        return this.db.Vehicle.findByPk(id, options);
    }
    createUser(data) {
        return this.db.User.create(data);
    }
    getUsers(options) {
        return this.db.User.findAll(options);
    }
    getUser(id, options) {
        return this.db.User.findByPk(id, options);
    }
    createLocation(data) {
        return this.db.Booking.create(data);
    }
    getLocations(options) {
        return this.db.Location.findAll(options);
    }
    getLocation(id, options) {
        return this.db.Location.findByPk(id, options);
    }
    createBooking(data) {
        return this.db.Booking.create(data);
    }
    getBookings(options) {
        return this.db.Booking.findAll(options);
    }
    getBooking(id, options) {
        return this.db.Booking.findByPk(id, options);
    }
    createAccident(data) {
        return this.db.Accident.create(data);
    }
    getAccidents(options) {
        return this.db.Accident.findAll(options);
    }
    getAccident(id, options) {
        return this.db.Accident.findByPk(id, options);
    }
}
exports.default = DataSource;
