"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../utils/helpers");
const mail_1 = require("../utils/mail");
const datasource_1 = require("../datasource");
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const BookingDataSource = new datasource_1.Booking(models_1.default, user);
    try {
        const foundBookings = await BookingDataSource.getAll();
        response.handleSuccess(res, `Found ${foundBookings.length} bookings.`);
        response.setData(foundBookings);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", async ({ user, body }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const BookingDataSource = new datasource_1.Booking(models_1.default, user);
    try {
        const createdBooking = await BookingDataSource.create(body);
        response.setData(createdBooking.get({ plain: true }));
        response.handleSuccess(res, "Booking has been created.");
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.get("/:id", async ({ user, params }, res) => {
    let response = new helpers_1.ResponseBuilder();
    const BookingDataSource = new datasource_1.Booking(models_1.default, user);
    try {
        const foundBooking = await BookingDataSource.get(params.id);
        response.setData(foundBooking.get({ plain: true }));
        response.handleSuccess(res, `Booking with ID of ${params.id} found.`);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", async ({ user, params, body }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const BookingDataSource = new datasource_1.Booking(models_1.default, user);
    try {
        const bookingPreviousValue = await BookingDataSource.get(params.id);
        const updatedBooking = await BookingDataSource.update(params.id, body);
        const bookingData = await models_1.default.Booking.findByPk(params.id, {
            include: [{ all: true }]
        });
        if (body.amount !== undefined &&
            body.amount !== null &&
            bookingPreviousValue.amount === null) {
            mail_1.sendInvoice({
                email: bookingData.user.email,
                amount: body.amount,
                customerName: bookingData.user.firstName,
                vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model}`,
                from: bookingData.from,
                to: bookingData.to,
                bookingId: bookingData.id
            });
        }
        if (body.approved === true && bookingPreviousValue.approved === null) {
            const location = (await models_1.default.Location.findByPk(bookingData.vehicle.locationId)) || {};
            mail_1.sendBookingConfirmation({
                email: bookingData.user.email,
                customerName: bookingData.user.firstName,
                vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model} ${bookingData.vehicle.plateNumber}`,
                from: bookingData.from,
                to: bookingData.to,
                bookingId: bookingData.id,
                address: location.address,
                parkingLocation: bookingData.vehicle.parkingLocation,
                lat: location.lat,
                lng: location.lng
            });
        }
        response.setData(updatedBooking.get({ plain: true }));
        response.handleSuccess(res, "Booking has been created");
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.delete("/:id", async ({ user, params }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const BookingDataSource = new datasource_1.Booking(models_1.default, user);
    try {
        const deletedBooking = await BookingDataSource.delete(params.id);
        response.setData(deletedBooking.get({ plain: true }));
        response.handleSuccess(res, `Booking with ID ${params.id} has been deleted.`);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
exports.default = router;
