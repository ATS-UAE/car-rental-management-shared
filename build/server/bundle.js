/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/api/Booking.ts":
/*!***********************************!*\
  !*** ./src/server/api/Booking.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_wialon_1 = __webpack_require__(/*! node-wialon */ "node-wialon");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const validators_1 = __webpack_require__(/*! ./validators */ "./src/server/api/validators/index.ts");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const models_1 = __webpack_require__(/*! ../models */ "./src/server/models/index.ts");
const exceptions_1 = __webpack_require__(/*! ./exceptions */ "./src/server/api/exceptions/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/server/api/index.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/server/api/utils/index.ts");
const Collection_1 = __webpack_require__(/*! ./Collection */ "./src/server/api/Collection.ts");
const mail_1 = __webpack_require__(/*! ../utils/mail */ "./src/server/utils/mail/index.ts");
class Booking {
    constructor(data) {
        this.data = data;
        this.cast = (user) => validators_1.Booking.getValidator(user, _1.API_OPERATION.READ).cast(this.data);
        this.update = async (user, options) => {
            var _a;
            try {
                const booking = await this.data.reload({
                    include: [{ model: models_1.ReplaceVehicle }]
                });
                const validator = validators_1.Booking.getValidator(user, _1.API_OPERATION.UPDATE, booking);
                // Validate JSON schema.
                await validator.validate(options);
                // Cast the JSON
                const bookingOptions = validator.cast(options);
                // Create replaced vehicle.
                const replacedVehicle = bookingOptions.replaceVehicle &&
                    (await models_1.ReplaceVehicle.create(bookingOptions.replaceVehicle));
                // Delete replaced vehicle
                if (replacedVehicle && booking.replaceVehicleId) {
                    await models_1.ReplaceVehicle.destroy();
                }
                // Create booking
                const updatedBooking = await this.data.update({
                    ...bookingOptions,
                    replaceVehicleId: (_a = replacedVehicle) === null || _a === void 0 ? void 0 : _a.id
                });
                return new Booking(updatedBooking);
            }
            catch (e) {
                new utils_1.ApiErrorHandler(e);
            }
        };
        this.destroy = async (user) => {
            try {
                // Validate JSON schema.
                await validators_1.Booking.getValidator(user, _1.API_OPERATION.DELETE, this.data).validate(this.data);
                await this.data.destroy();
            }
            catch (e) {
                new utils_1.ApiErrorHandler(e);
            }
        };
        this.setEmailNotificationsToBookingManagers = async () => {
            const bookingData = await this.data.reload({
                include: [{ model: models_1.User }]
            });
            await models_1.User.findAll({
                where: {
                    clientId: bookingData.user.clientId,
                    role: {
                        [sequelize_1.Op.in]: [typings_1.Role.ADMIN, typings_1.Role.KEY_MANAGER]
                    }
                }
            }).then(async (users) => {
                const vehicle = await models_1.Vehicle.findByPk(bookingData.vehicleId);
                const location = vehicle && (await models_1.Location.findByPk(vehicle.locationId));
                let lng = location.lng;
                let lat = location.lat;
                if (vehicle.wialonUnitId) {
                    const w = await node_wialon_1.Wialon.login({
                        token: process.env.WIALON_TOKEN
                    });
                    const unit = await w.Core.searchItem({
                        id: vehicle.wialonUnitId,
                        flags: 1024 + 8192
                    });
                    if (unit) {
                        lat = unit.item && unit.item.pos && unit.item.pos.y;
                        lng = unit.item && unit.item.pos && unit.item.pos.x;
                    }
                }
                for (const user of users) {
                    try {
                        mail_1.sendBookingNotification({
                            email: user.email,
                            company: "LeasePlan",
                            bookingId: bookingData.id,
                            customerEmail: bookingData.user.email,
                            customerName: `${bookingData.user.firstName} ${bookingData.user.lastName}`,
                            from: moment_1.default(bookingData.from).unix(),
                            to: moment_1.default(bookingData.to).unix(),
                            lat,
                            lng,
                            location: location.name,
                            mobile: bookingData.user.mobileNumber,
                            plateNumber: vehicle.plateNumber || "N/A",
                            vehicle: `${vehicle.brand} ${vehicle.model}`,
                            vehicleId: vehicle.id,
                            timeZone: user.timeZone
                        });
                    }
                    catch (e) { }
                }
            });
        };
        this.sendInvoice = async (amount) => {
            const bookingData = await this.data.reload({
                include: [{ model: models_1.User }, { model: models_1.Vehicle }]
            });
            await mail_1.sendInvoice({
                email: bookingData.user.email,
                amount: amount,
                customerName: bookingData.user.firstName,
                vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model}`,
                from: moment_1.default(bookingData.from, "X").unix(),
                to: moment_1.default(bookingData.to, "X").unix(),
                bookingId: bookingData.id,
                timeZone: bookingData.user.timeZone
            });
        };
        this.sendBookingConfirmation = async () => {
            const bookingData = await this.data.reload({
                include: [{ model: models_1.User }, { model: models_1.Vehicle }]
            });
            const vehicleLocation = await models_1.Location.findByPk(bookingData.vehicle.locationId);
            let lng = vehicleLocation.lng;
            let lat = vehicleLocation.lat;
            if (bookingData.vehicle.wialonUnitId) {
                const w = await node_wialon_1.Wialon.login({
                    token: process.env.WIALON_TOKEN
                });
                const unit = await w.Core.searchItem({
                    id: bookingData.vehicle.wialonUnitId,
                    flags: 1024 + 8192
                });
                if (unit) {
                    lat = unit.item && unit.item.pos && unit.item.pos.y;
                    lng = unit.item && unit.item.pos && unit.item.pos.x;
                }
            }
            await mail_1.sendBookingConfirmation({
                email: bookingData.user.email,
                customerName: bookingData.user.firstName,
                vehicleName: `${bookingData.vehicle.brand} ${bookingData.vehicle.model} ${bookingData.vehicle.plateNumber}`,
                from: moment_1.default(bookingData.from, "X").unix(),
                to: moment_1.default(bookingData.to, "X").unix(),
                bookingId: bookingData.id,
                address: vehicleLocation && vehicleLocation.address,
                parkingLocation: bookingData.vehicle.parkingLocation,
                lat,
                lng,
                timeZone: bookingData.user.timeZone
            });
        };
    }
}
exports.Booking = Booking;
Booking.getAll = async (user) => {
    let bookings = [];
    if (user.role === typings_1.Role.GUEST) {
        // Get bookings on self.
        bookings = await user.$get("bookings", {
            include: [models_1.Vehicle, models_1.ReplaceVehicle]
        });
    }
    else if (user.role === typings_1.Role.ADMIN || user.role === typings_1.Role.KEY_MANAGER) {
        // Get bookings on self client.
        bookings = await models_1.Booking.findAll({
            include: [
                {
                    model: models_1.User,
                    where: {
                        clientId: user.clientId
                    }
                },
                models_1.Vehicle,
                models_1.ReplaceVehicle
            ]
        });
    }
    else if (user.role === typings_1.Role.MASTER) {
        // Get all bookings.
        bookings = await models_1.Booking.findAll({
            include: [models_1.Vehicle, models_1.ReplaceVehicle]
        });
    }
    return new Collection_1.Collection(bookings.map(b => new Booking(b)));
};
Booking.create = async (user, options) => {
    var _a;
    try {
        const validator = validators_1.Booking.getValidator(user, _1.API_OPERATION.CREATE);
        // Validate JSON schema.
        await validator.validate(options);
        // Cast the JSON
        const bookingOptions = validator.cast(options);
        // Create replaced vehicle.
        const replacedVehicle = bookingOptions.replaceVehicle &&
            (await models_1.ReplaceVehicle.create(bookingOptions.replaceVehicle));
        // Create booking
        // TODO: Include "paid", and "amount" in schema.
        const createdBooking = await models_1.Booking.create({
            paid: false,
            amount: null,
            ...bookingOptions,
            replaceVehicleId: ((_a = replacedVehicle) === null || _a === void 0 ? void 0 : _a.id) || null
        });
        return new Booking(createdBooking);
    }
    catch (e) {
        new utils_1.ApiErrorHandler(e);
    }
};
Booking.get = async (user, bookingId) => {
    const booking = await models_1.Booking.findByPk(bookingId, {
        include: [{ all: true }]
    });
    if (!booking) {
        throw new exceptions_1.ItemNotFoundException(`Booking with ${bookingId} does not exist.`);
    }
    if (user.role === typings_1.Role.GUEST) {
        // Return only own bookings.
        if (booking.userId === user.id) {
            return new Booking(booking);
        }
    }
    else if (user.role === typings_1.Role.KEY_MANAGER || user.role === typings_1.Role.ADMIN) {
        if (booking.user.clientId === user.clientId) {
            return new Booking(booking);
        }
    }
    else if (user.role === typings_1.Role.MASTER) {
        return new Booking(booking);
    }
};


/***/ }),

/***/ "./src/server/api/Collection.ts":
/*!**************************************!*\
  !*** ./src/server/api/Collection.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Collection {
    constructor(data) {
        this.data = data;
        this.cast = (user) => {
            return this.data.map(item => item.cast(user));
        };
    }
}
exports.Collection = Collection;


/***/ }),

/***/ "./src/server/api/Vehicle.ts":
/*!***********************************!*\
  !*** ./src/server/api/Vehicle.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
const models_1 = __webpack_require__(/*! ../models */ "./src/server/models/index.ts");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const exceptions_1 = __webpack_require__(/*! ./exceptions */ "./src/server/api/exceptions/index.ts");
const validators_1 = __webpack_require__(/*! ./validators */ "./src/server/api/validators/index.ts");
const utils_2 = __webpack_require__(/*! ./utils */ "./src/server/api/utils/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/server/api/index.ts");
class Vehicle {
    constructor(data) {
        this.data = data;
        this.cast = (user) => validators_1.Vehicle.getValidator(user, _1.API_OPERATION.READ).cast(this.data);
        this.availableForBooking = async (from, to, bookings) => {
            if (this.data.defleeted === true) {
                return false;
            }
            const vehicleBookings = bookings || (await this.data.$get("bookings"));
            for (const booking of vehicleBookings) {
                const status = utils_1.getBookingStatus({
                    from,
                    to,
                    approved: booking.approved
                });
                if (status === typings_1.BookingStatus.PENDING ||
                    status === typings_1.BookingStatus.APPROVED ||
                    status === typings_1.BookingStatus.ONGOING) {
                    return false;
                }
            }
            return true;
        };
        this.update = async (user, options) => {
            try {
                await validators_1.Vehicle.getValidator(user, _1.API_OPERATION.UPDATE, {
                    newData: options,
                    target: this.data
                }).validate(options);
                const vehicleOptions = validators_1.Vehicle.getValidator(user, _1.API_OPERATION.UPDATE, {
                    newData: options,
                    target: this.data
                }).cast(options);
                await this.data.update(vehicleOptions);
            }
            catch (e) {
                new utils_2.ApiErrorHandler(e);
            }
        };
    }
}
exports.Vehicle = Vehicle;
Vehicle.get = async (user, id) => {
    const vehicle = await models_1.Vehicle.findByPk(id);
    if (user.role === typings_1.Role.MASTER) {
        return new Vehicle(vehicle);
    }
    else if (user.clientId === vehicle.clientId) {
        return new Vehicle(vehicle);
    }
    throw new exceptions_1.InvalidPermissionException("You cannot access this vehicle.");
};
Vehicle.create = async (user, options) => {
    try {
        await validators_1.Vehicle.getValidator(user, _1.API_OPERATION.CREATE, {
            newData: options
        }).validate(options);
        const vehicleOptions = await validators_1.Vehicle.getValidator(user, _1.API_OPERATION.CREATE, {
            newData: options
        }).cast(options);
        const createdVehicle = await models_1.Vehicle.create(vehicleOptions);
        return new models_1.Booking(createdVehicle);
    }
    catch (e) {
        new utils_2.ApiErrorHandler(e);
    }
};
Vehicle.getAll = async (user, options) => {
    var _a, _b;
    let vehicles = [];
    const baseFindOptions = ((_a = options) === null || _a === void 0 ? void 0 : _a.from) && ((_b = options) === null || _b === void 0 ? void 0 : _b.to)
        ? {
            where: {
                "$bookings.vehicleId$": null
            },
            include: [
                {
                    model: models_1.Booking,
                    required: false,
                    where: {
                        // Check if the intervals does not intersect with other bookings.
                        to: {
                            [sequelize_1.Op.lte]: options.to
                        },
                        from: {
                            [sequelize_1.Op.gte]: options.from
                        }
                    }
                }
            ]
        }
        : {};
    if (user.role === typings_1.Role.MASTER) {
        vehicles = await models_1.Vehicle.findAll(baseFindOptions);
    }
    else if (user.role === typings_1.Role.GUEST) {
        // Get only available vehicles in the same client.
        // Only vehicles which have the same categories as the user.
        const userCategories = await user.$get("categories");
        // Get all vehicles in the client if user does not contain a category.
        if (!userCategories.length) {
            vehicles = await models_1.Vehicle.findAll(lodash_1.default.merge({
                where: {
                    clientId: user.clientId
                }
            }, baseFindOptions));
        }
        else {
            vehicles = await models_1.Vehicle.findAll(lodash_1.default.merge({
                where: {
                    clientId: user.clientId
                },
                include: [
                    {
                        model: models_1.Category,
                        where: {
                            id: { [sequelize_1.Op.in]: userCategories.map(c => c.id) }
                        }
                    }
                ]
            }, baseFindOptions));
        }
    }
    else if (user.clientId) {
        vehicles = await models_1.Vehicle.findAll(lodash_1.default.merge({
            where: {
                clientId: user.clientId
            }
        }, baseFindOptions));
    }
    return new _1.Collection(vehicles.map(v => new Vehicle(v)));
};


/***/ }),

/***/ "./src/server/api/exceptions/ApiException.ts":
/*!***************************************************!*\
  !*** ./src/server/api/exceptions/ApiException.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ApiException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ApiException = ApiException;


/***/ }),

/***/ "./src/server/api/exceptions/DataBaseException.ts":
/*!********************************************************!*\
  !*** ./src/server/api/exceptions/DataBaseException.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! . */ "./src/server/api/exceptions/index.ts");
class DataBaseException extends _1.ApiException {
    constructor(message) {
        super(message);
    }
}
exports.DataBaseException = DataBaseException;


/***/ }),

/***/ "./src/server/api/exceptions/FormException.ts":
/*!****************************************************!*\
  !*** ./src/server/api/exceptions/FormException.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! . */ "./src/server/api/exceptions/index.ts");
class FormException extends _1.ApiException {
    constructor(message, fields) {
        super(message);
        this.fields = fields;
        this.throw = () => {
            if (this.fields) {
                throw this;
            }
        };
    }
}
exports.FormException = FormException;


/***/ }),

/***/ "./src/server/api/exceptions/InvalidPermissionException.ts":
/*!*****************************************************************!*\
  !*** ./src/server/api/exceptions/InvalidPermissionException.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! . */ "./src/server/api/exceptions/index.ts");
class InvalidPermissionException extends _1.ApiException {
    constructor(message) {
        super(message);
    }
}
exports.InvalidPermissionException = InvalidPermissionException;


/***/ }),

/***/ "./src/server/api/exceptions/ResourceNotFound.ts":
/*!*******************************************************!*\
  !*** ./src/server/api/exceptions/ResourceNotFound.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! ./ */ "./src/server/api/exceptions/index.ts");
class ItemNotFoundException extends _1.DataBaseException {
    constructor(message) {
        super(message);
    }
}
exports.ItemNotFoundException = ItemNotFoundException;


/***/ }),

/***/ "./src/server/api/exceptions/index.ts":
/*!********************************************!*\
  !*** ./src/server/api/exceptions/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./ApiException */ "./src/server/api/exceptions/ApiException.ts"));
__export(__webpack_require__(/*! ./FormException */ "./src/server/api/exceptions/FormException.ts"));
__export(__webpack_require__(/*! ./DataBaseException */ "./src/server/api/exceptions/DataBaseException.ts"));
__export(__webpack_require__(/*! ./InvalidPermissionException */ "./src/server/api/exceptions/InvalidPermissionException.ts"));
__export(__webpack_require__(/*! ./ResourceNotFound */ "./src/server/api/exceptions/ResourceNotFound.ts"));


/***/ }),

/***/ "./src/server/api/index.ts":
/*!*********************************!*\
  !*** ./src/server/api/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Booking */ "./src/server/api/Booking.ts"));
__export(__webpack_require__(/*! ./Vehicle */ "./src/server/api/Vehicle.ts"));
__export(__webpack_require__(/*! ./Collection */ "./src/server/api/Collection.ts"));
var API_OPERATION;
(function (API_OPERATION) {
    API_OPERATION["CREATE"] = "CREATE";
    API_OPERATION["DELETE"] = "DELETE";
    API_OPERATION["UPDATE"] = "UPDATE";
    API_OPERATION["READ"] = "READ";
})(API_OPERATION = exports.API_OPERATION || (exports.API_OPERATION = {}));


/***/ }),

/***/ "./src/server/api/utils/ApiErrorHandler.ts":
/*!*************************************************!*\
  !*** ./src/server/api/utils/ApiErrorHandler.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __webpack_require__(/*! ../exceptions */ "./src/server/api/exceptions/index.ts");
const exceptions_2 = __webpack_require__(/*! ../exceptions */ "./src/server/api/exceptions/index.ts");
class ApiErrorHandler {
    constructor(e) {
        console.log("ApiErrorHandler", e);
        if (e instanceof exceptions_1.FormException) {
            // Add fields to errors
            for (const error of e.fields) {
                console.log("error fields", error);
                if (error.name === "permission") {
                    throw new exceptions_2.InvalidPermissionException(error.message);
                }
            }
            throw e;
        }
        // Unknown error.
        throw new exceptions_1.ApiException("An unknown error has occurred.");
    }
}
exports.ApiErrorHandler = ApiErrorHandler;


/***/ }),

/***/ "./src/server/api/utils/FormErrorBuilder.ts":
/*!**************************************************!*\
  !*** ./src/server/api/utils/FormErrorBuilder.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __webpack_require__(/*! ../exceptions */ "./src/server/api/exceptions/index.ts");
class FormErrorBuilder {
    constructor() {
        this.fields = [];
        this.add = (field, message, name) => {
            this.fields.push({ field, message, name });
            return this;
        };
        this.addIf = (condition, field, message, name) => {
            if (condition) {
                this.add(field, message, name);
            }
            return this;
        };
    }
    throw(message = "An error has occured in one of the fields.") {
        if (this.fields.length) {
            throw new exceptions_1.FormException(message, this.fields);
        }
    }
}
exports.FormErrorBuilder = FormErrorBuilder;


/***/ }),

/***/ "./src/server/api/utils/index.ts":
/*!***************************************!*\
  !*** ./src/server/api/utils/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = __webpack_require__(/*! yup */ "yup");
const exceptions_1 = __webpack_require__(/*! ../exceptions */ "./src/server/api/exceptions/index.ts");
__export(__webpack_require__(/*! ./ApiErrorHandler */ "./src/server/api/utils/ApiErrorHandler.ts"));
__export(__webpack_require__(/*! ./FormErrorBuilder */ "./src/server/api/utils/FormErrorBuilder.ts"));
exports.getValidationErrors = (errors) => errors.inner.map(error => ({
    field: error.path,
    message: error.message,
    name: error.name
}));
exports.catchYupVadationErrors = async (validator) => {
    let errors = [];
    try {
        await validator();
    }
    catch (e) {
        if (e instanceof yup_1.ValidationError) {
            errors = exports.getValidationErrors(e);
        }
        if (errors.length) {
            throw new exceptions_1.FormException("An error has occured in one of the fields.", errors);
        }
    }
};


/***/ }),

/***/ "./src/server/api/validators/Booking.ts":
/*!**********************************************!*\
  !*** ./src/server/api/validators/Booking.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(__webpack_require__(/*! yup */ "yup"));
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const models_1 = __webpack_require__(/*! ../../models */ "./src/server/models/index.ts");
const typings_1 = __webpack_require__(/*! ../../../shared/typings */ "./src/shared/typings/index.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/server/api/validators/utils/index.ts");
const utils_2 = __webpack_require__(/*! ../../utils */ "./src/server/utils/index.ts");
const __1 = __webpack_require__(/*! .. */ "./src/server/api/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/server/api/validators/index.ts");
class Booking {
}
exports.Booking = Booking;
Booking.getValidator = (user, operation, target) => new _1.Validator(Booking.validatorSchema, user, operation, target);
Booking.validatorSchema = yup
    .object()
    .shape({
    paid: yup.boolean(),
    amount: yup.number().nullable(),
    from: yup
        .date()
        .transform((v, originalValue) => typeof originalValue === "number"
        ? moment_1.default(originalValue, "X").toDate()
        : originalValue),
    to: yup
        .date()
        .transform((v, originalValue) => typeof originalValue === "number"
        ? moment_1.default(originalValue, "X").toDate()
        : originalValue),
    approved: yup.boolean().nullable(),
    finished: yup.boolean(),
    startMileage: yup.number().nullable(),
    endMileage: yup.number().nullable(),
    startFuel: yup.number().nullable(),
    endFuel: yup.number().nullable(),
    userId: yup.number(),
    vehicleId: yup.number(),
    bookingType: yup.mixed().oneOf(Object.values(typings_1.BookingType)),
    replaceVehicleId: yup.number().nullable()
})
    .when(["$user", "$operation", "$target", "$data", "$casting"], (...args) => {
    let [user, operation, target, data, casting, schema] = args;
    switch (operation) {
        case __1.API_OPERATION.READ: {
            if (data.bookingType === typings_1.BookingType.REPLACEMENT) {
                schema = schema.shape({
                    replaceVehicle: yup
                        .object()
                        .shape({
                        brand: yup.string().nullable(),
                        model: yup.string().nullable(),
                        vin: yup.string().nullable(),
                        plateNumber: yup.string().nullable()
                    })
                        .nullable()
                });
            }
            schema = schema.shape({
                id: yup.number(),
                from: yup
                    .number()
                    .transform((v, originalValue) => moment_1.default(originalValue).unix()),
                to: yup
                    .number()
                    .transform((v, originalValue) => moment_1.default(originalValue).unix()),
                createdAt: yup
                    .number()
                    .transform((v, originalValue) => moment_1.default(originalValue).unix()),
                updatedAt: yup
                    .number()
                    .nullable()
                    .transform((v, originalValue) => (originalValue && moment_1.default(originalValue).unix()) ||
                    null),
                vehicle: yup.object().shape({
                    id: yup.number(),
                    brand: yup.string(),
                    model: yup.string(),
                    vin: yup.string(),
                    plateNumber: yup.string()
                })
            });
            break;
        }
        case __1.API_OPERATION.UPDATE: {
            const updateData = data;
            schema = schema.shape({
                from: yup
                    .date()
                    .transform((value, originalValue) => moment_1.default(originalValue, "X").toDate())
                    .test("no-approved", "Booking has already been approved", function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.from) !== undefined &&
                        updateData.from !== target.from;
                    if (!changed) {
                        return true;
                    }
                    // If Guest, deny changes if approved.
                    if (user.role === typings_1.Role.GUEST && target.approved) {
                        return false;
                    }
                    else if (user.role === typings_1.Role.KEY_MANAGER &&
                        target.finished) {
                        // If Key Manager, deny if booking has finished.
                        return false;
                    }
                    return true;
                }),
                to: yup
                    .date()
                    .transform((value, originalValue) => moment_1.default(originalValue, "X").toDate())
                    .test("no-approved", "Booking has already been approved", function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.to) !== undefined &&
                        updateData.to !== target.to;
                    if (!changed) {
                        return true;
                    }
                    // If Guest, deny changes if approved.
                    if (user.role === typings_1.Role.GUEST && target.approved) {
                        return false;
                    }
                    else if (user.role === typings_1.Role.KEY_MANAGER &&
                        target.finished) {
                        // If Key Manager, deny if booking has finished.
                        return false;
                    }
                    return true;
                }),
                finished: utils_1.stripField(yup
                    .boolean()
                    .test("timeslot-available", "This booking is intersects with another booking at the time specified.", async function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.finished) !== undefined &&
                        updateData.finished !== target.finished;
                    if (!changed) {
                        return true;
                    }
                    const bookedVehicle = await models_1.Vehicle.findByPk(target.vehicleId, {
                        include: [{ model: models_1.Booking }]
                    });
                    return !utils_2.isBookingTimeSlotTaken(bookedVehicle.bookings.map(({ from, to, id }) => ({
                        from: moment_1.default(from).unix(),
                        to: moment_1.default(to).unix(),
                        id
                    })), moment_1.default(target.from).unix(), moment_1.default(target.from).unix(), target.id);
                }), [typings_1.Role.MASTER, typings_1.Role.ADMIN, typings_1.Role.KEY_MANAGER]),
                userId: yup
                    .number()
                    .test("no-approved", "Booking has already been approved", function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.userId) !== undefined &&
                        updateData.userId !== target.userId;
                    if (!changed) {
                        return true;
                    }
                    // If Guest, deny changes if approved.
                    if (user.role === typings_1.Role.GUEST && target.approved) {
                        return false;
                    }
                    else if (user.role === typings_1.Role.KEY_MANAGER &&
                        target.finished) {
                        // If Key Manager, deny if booking has finished.
                        return false;
                    }
                    return true;
                }),
                vehicleId: yup
                    .number()
                    .test("no-approved", "Booking has already been approved", function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.vehicleId) !== undefined &&
                        updateData.vehicleId !== target.vehicleId;
                    if (!changed) {
                        return true;
                    }
                    // If Guest or KM, deny changes if approved.
                    if (user.role === typings_1.Role.GUEST ||
                        user.role === typings_1.Role.KEY_MANAGER) {
                        if (target.approved) {
                            return false;
                        }
                    }
                    return true;
                }),
                startFuel: utils_1.stripField(yup.number().nullable(), [
                    typings_1.Role.MASTER,
                    typings_1.Role.ADMIN,
                    typings_1.Role.KEY_MANAGER
                ]),
                startMileage: utils_1.stripField(yup.number().nullable(), [
                    typings_1.Role.MASTER,
                    typings_1.Role.ADMIN,
                    typings_1.Role.KEY_MANAGER
                ]),
                approved: utils_1.stripField(yup
                    .boolean()
                    .nullable()
                    .test("no-finished-booking", "This booking has already finished.", function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.approved) !== undefined &&
                        updateData.approved !== target.approved;
                    if (!changed) {
                        return true;
                    }
                    return !target.finished;
                })
                    .test("pending-only", function () {
                    return `Booking has already been ${target.approved ? "approved" : "denied"}`;
                }, function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.approved) !== undefined &&
                        updateData.approved !== target.approved;
                    if (!changed) {
                        return true;
                    }
                    return changed ? target.approved === null : true;
                })
                    .test("booking-expired", "Booking has already expired", function () {
                    var _a;
                    const changed = ((_a = updateData) === null || _a === void 0 ? void 0 : _a.approved) !== undefined &&
                        updateData.approved !== target.approved;
                    if (!changed) {
                        return true;
                    }
                    return moment_1.default(target.from).isAfter(moment_1.default());
                }), [typings_1.Role.MASTER, typings_1.Role.ADMIN, typings_1.Role.KEY_MANAGER]),
                endFuel: utils_1.stripField(yup.number().nullable(), [
                    typings_1.Role.MASTER,
                    typings_1.Role.ADMIN,
                    typings_1.Role.KEY_MANAGER
                ]),
                endMileage: utils_1.stripField(yup.number().nullable(), [
                    typings_1.Role.MASTER,
                    typings_1.Role.ADMIN,
                    typings_1.Role.KEY_MANAGER
                ]),
                paid: utils_1.stripField(yup.boolean(), [
                    typings_1.Role.MASTER,
                    typings_1.Role.ADMIN,
                    typings_1.Role.KEY_MANAGER
                ]),
                replaceVehicle: yup.lazy(function (value, options) {
                    // If booking type has been changed to replacement, then require a replacement vehicle.
                    if (updateData.bookingType === typings_1.BookingType.REPLACEMENT &&
                        target.bookingType !== typings_1.BookingType.REPLACEMENT) {
                        return yup
                            .object()
                            .shape({
                            plateNumber: yup.string().required(),
                            vin: yup.string().required(),
                            brand: yup.string().required(),
                            model: yup.string().required()
                        })
                            .required();
                    }
                    else if (target.bookingType === typings_1.BookingType.REPLACEMENT) {
                        // If existing booking type is Replacement, allow updating partially.
                        return yup
                            .object()
                            .shape({
                            plateNumber: yup.string(),
                            vin: yup.string(),
                            brand: yup.string(),
                            model: yup.string()
                        })
                            .transform(v => {
                            const replaceVehicle = models_1.ReplaceVehicle.findByPk(target.replaceVehicleId);
                            return { ...v, ...replaceVehicle };
                        });
                    }
                    return yup
                        .mixed()
                        .notRequired()
                        .nullable()
                        .transform(() => null);
                })
            });
            break;
        }
        case __1.API_OPERATION.CREATE: {
            schema
                .shape({
                paid: utils_1.stripField(yup.boolean().default(false), [typings_1.Role.GUEST], true),
                amount: utils_1.stripField(yup
                    .number()
                    .nullable()
                    .default(null), [typings_1.Role.GUEST], true),
                userId: yup
                    .number()
                    .required()
                    .test("db-no-exist", ({ value }) => `User with ID ${value} does not exist.`, async (value) => Boolean(await models_1.User.findByPk(value))),
                vehicleId: yup
                    .number()
                    .required()
                    .test("db-no-exist", ({ value }) => `Vehicle with ID ${value} does not exist.`, async (value) => Boolean(await models_1.Vehicle.findByPk(value))),
                from: yup
                    .date()
                    .required()
                    .transform((value, originalValue) => moment_1.default(originalValue, "X").toDate()),
                to: yup
                    .date()
                    .required()
                    .test("no-lower-than-other", `Booking time end cannot be lower than starting time.`, function (value) {
                    const { parent } = this;
                    return moment_1.default(value, "X") < parent.from;
                })
                    .transform((value, originalValue) => moment_1.default(originalValue, "X").toDate()),
                bookingType: yup
                    .string()
                    .oneOf(Object.values(typings_1.BookingType))
                    .required(),
                replaceVehicle: yup.lazy(function (value, options) {
                    const { context } = options;
                    if (context["bookingOptions"].bookingType ===
                        typings_1.BookingType.REPLACEMENT) {
                        return yup
                            .object()
                            .shape({
                            plateNumber: yup.string().required(),
                            vin: yup.string().required(),
                            brand: yup.string().required(),
                            model: yup.string().required()
                        })
                            .required();
                    }
                    return yup
                        .mixed()
                        .nullable()
                        .transform(() => null)
                        .notRequired();
                })
            })
                .test("timeslot-available", "The vehicle is unavailable at the time specified.", async function (v) {
                if (v && v.vehicleId && v.from && v.to) {
                    const bookedVehicle = await models_1.Vehicle.findByPk(v.vehicleId, {
                        include: [{ model: models_1.Booking }]
                    });
                    return !utils_2.isBookingTimeSlotTaken(bookedVehicle.bookings.map(({ from, to, approved, id }) => ({
                        from: moment_1.default(from).unix(),
                        to: moment_1.default(to).unix(),
                        approved,
                        id
                    })), v.from, v.to);
                }
                return false;
            })
                .test("permission", "You do not have the permission to do this.", async function (v) {
                const user = this.options.context["user"];
                // Only allow guest to create bookings on itself.
                if (user.role === typings_1.Role.GUEST && v.userId === user.id) {
                    return true;
                    // Only allow bookings on users with the same client.
                }
                else if (user.role === typings_1.Role.KEY_MANAGER ||
                    user.role === typings_1.Role.ADMIN) {
                    const targetUser = await models_1.User.findByPk(user.id);
                    if (targetUser.clientId === user.clientId) {
                        return true;
                    }
                }
                else if (user.role === typings_1.Role.MASTER) {
                    return true;
                }
                return false;
            });
            break;
        }
        case __1.API_OPERATION.DELETE: {
            schema = schema.shape({
                approved: yup
                    .boolean()
                    .nullable()
                    .test("not-approved", "Booking has already been approved and cannot be deleted.", value => value !== true)
            });
        }
    }
    return schema;
});


/***/ }),

/***/ "./src/server/api/validators/Vehicle.ts":
/*!**********************************************!*\
  !*** ./src/server/api/validators/Vehicle.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(__webpack_require__(/*! yup */ "yup"));
const __1 = __webpack_require__(/*! .. */ "./src/server/api/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/server/api/validators/index.ts");
const typings_1 = __webpack_require__(/*! ../../../shared/typings */ "./src/shared/typings/index.ts");
class Vehicle {
}
exports.Vehicle = Vehicle;
Vehicle.getValidator = (user, operation, data) => new _1.Validator(Vehicle.validatorSchema, user, operation, data);
Vehicle.validatorSchema = Yup.object()
    .shape({
    brand: Yup.string(),
    model: Yup.string(),
    plateNumber: Yup.string(),
    vin: Yup.string(),
    defleeted: Yup.boolean(),
    parkingLocation: Yup.string().nullable(),
    vehicleImageSrc: Yup.string().nullable(),
    bookingChargeCount: Yup.number(),
    bookingChargeUnit: Yup.mixed()
        .oneOf(Object.values(typings_1.BookingChargeUnit))
        .nullable(),
    bookingCharge: Yup.number(),
    clientId: Yup.number().nullable(),
    locationId: Yup.number().nullable(),
    wialonUnitId: Yup.number().nullable(),
    available: Yup.boolean()
})
    .when(["$user", "$operation", "$target", "$data", "$casting"], (...args) => {
    let [user, operation, target, data, casting, schema] = args;
    switch (operation) {
        case __1.API_OPERATION.READ: {
            schema = schema.shape({
                id: Yup.number()
            });
            break;
        }
        case __1.API_OPERATION.CREATE: {
            schema = schema
                .shape({
                brand: Yup.string().required(),
                model: Yup.string().required(),
                bookingChargeCount: Yup.number().default(0),
                bookingCharge: Yup.number().default(0)
            })
                .test("permission", "You do not have the permission to do this.", function () {
                return user.role === typings_1.Role.MASTER;
            });
            break;
        }
        case __1.API_OPERATION.UPDATE: {
            schema = schema
                .shape({ id: Yup.number().required() })
                .test("permission", "You do not have the permission to do this.", function () {
                if (user.role === typings_1.Role.MASTER) {
                    return true;
                }
                else if (user.role === typings_1.Role.ADMIN ||
                    user.role === typings_1.Role.KEY_MANAGER) {
                    if (target.clientId === user.clientId) {
                        return true;
                    }
                }
                return false;
            });
            break;
        }
    }
    return schema;
});


/***/ }),

/***/ "./src/server/api/validators/index.ts":
/*!********************************************!*\
  !*** ./src/server/api/validators/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(/*! ../ */ "./src/server/api/index.ts");
__export(__webpack_require__(/*! ./Booking */ "./src/server/api/validators/Booking.ts"));
__export(__webpack_require__(/*! ./Vehicle */ "./src/server/api/validators/Vehicle.ts"));
class Validator {
    constructor(schema, user, operation, target) {
        this.schema = schema;
        this.user = user;
        this.operation = operation;
        this.target = target;
        this.cast = (value) => {
            const { user, operation, schema, target } = this;
            return schema.cast(value, {
                stripUnknown: true,
                context: {
                    user,
                    operation,
                    target,
                    data: value,
                    casting: true
                }
            });
        };
        this.validate = (value) => {
            const { user, operation, schema, target } = this;
            return schema.validate(value, {
                abortEarly: false,
                context: {
                    user,
                    operation,
                    target: target,
                    data: value,
                    casting: false
                }
            });
        };
    }
}
exports.Validator = Validator;
class DataCaster {
    constructor(schema, user) {
        this.schema = schema;
        this.user = user;
        this.cast = (data) => {
            return this.schema.cast(data, {
                context: {
                    operation: __1.API_OPERATION.READ,
                    user: this.user
                }
            });
        };
    }
}
exports.DataCaster = DataCaster;


/***/ }),

/***/ "./src/server/api/validators/utils/index.ts":
/*!**************************************************!*\
  !*** ./src/server/api/validators/utils/index.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(__webpack_require__(/*! yup */ "yup"));
/**
 * @param schema Yup schema
 * @param stripFound
 * @value true - strip field if found.
 * @value false - strip field if not found.
 * @param roles roles to search.
 */
exports.requireRole = (roles) => function () {
    const user = this.options.context["user"];
    const exists = roles.includes(user.role);
    if (!exists) {
        return false;
    }
    return true;
};
/**
 * @param key Key of object where the user Id will be compared.
 */
exports.selfOnly = (key = "userId") => function (value) {
    const user = this.options.context["user"];
    if (value[key] === user.id) {
        return true;
    }
};
/**
 * @param schema Yup schema
 * @param stripFound
 * @value true - strip field if found.
 * @value false - strip field if not found.
 * @param roles roles to search.
 */
exports.stripField = (schema, roles, stripFound = false) => {
    return yup.lazy((value, options) => {
        const user = options.context["user"];
        const exists = roles.includes(user.role);
        if (exists && stripFound) {
            return yup.mixed().strip(true);
        }
        else if (!exists && !stripFound) {
            return yup.mixed().strip(true);
        }
        return schema;
    });
};


/***/ }),

/***/ "./src/server/config/index.ts":
/*!************************************!*\
  !*** ./src/server/config/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, MAIL_USER, MAIL_PASS, MAIL_PORT, MAIL_HOST, SERVER_PORT, SERVER_URL, SECRET_KEY } = process.env;
exports.default = {
    database: {
        name: DATABASE_NAME,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        sequelize: {
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    },
    mail: {
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        },
        port: MAIL_PORT,
        secure: true,
        host: MAIL_HOST
    },
    serverPort: SERVER_PORT,
    serverUrl: SERVER_URL,
    secretKey: SECRET_KEY
};


/***/ }),

/***/ "./src/server/datasource/Accident.ts":
/*!*******************************************!*\
  !*** ./src/server/datasource/Accident.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(__webpack_require__(/*! ./DataSource */ "./src/server/datasource/DataSource.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
class Accident extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role;
        let foundAccident = await this.getAccident(id, {
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.ACCIDENTS)
            }
        });
        if (!foundAccident) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.ACCIDENTS, {
            accessor: this.user,
            target: foundAccident
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundAccident;
    }
    async getAll() {
        let role = this.user.role;
        let foundAccidents = await this.getAccidents({
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.ACCIDENTS)
            }
        });
        let bookings = [];
        for (let booking of foundAccidents) {
            let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.ACCIDENTS, {
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
        let role = this.user.role;
        let foundAccident = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.UPDATE, typings_1.Resource.ACCIDENTS, {
            accessor: this.user,
            target: foundAccident,
            body: data
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
        let role = this.user.role;
        let foundAccident = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.DELETE, typings_1.Resource.ACCIDENTS, {
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, typings_1.Operation.CREATE, typings_1.Resource.ACCIDENTS, {
            accessor: this.user,
            body: data
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
        return this.createAccident(utils_1.exceptFields(data, rbac_1.default.getExcludedFields(role, typings_1.Operation.CREATE, typings_1.Resource.ACCIDENTS)));
    }
}
exports.default = Accident;


/***/ }),

/***/ "./src/server/datasource/Booking.ts":
/*!******************************************!*\
  !*** ./src/server/datasource/Booking.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_wialon_1 = __webpack_require__(/*! node-wialon */ "node-wialon");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const DataSource_1 = __importDefault(__webpack_require__(/*! ./DataSource */ "./src/server/datasource/DataSource.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const typings_2 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const models_1 = __webpack_require__(/*! ../models */ "./src/server/models/index.ts");
const mail_1 = __webpack_require__(/*! ../utils/mail */ "./src/server/utils/mail/index.ts");
class Booking extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role;
        let foundBooking = await this.getBooking(id, {
            include: [
                {
                    model: models_1.User
                }
            ],
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.USERS)
            }
        });
        if (!foundBooking) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.BOOKINGS, {
            accessor: this.user,
            target: foundBooking
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundBooking;
    }
    async getAll() {
        let role = this.user.role;
        let foundBookings = await this.getBookings({
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.USERS)
            },
            include: [
                {
                    model: models_1.User
                }
            ]
        });
        let bookings = [];
        for (let booking of foundBookings) {
            let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.BOOKINGS, {
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
        let role = this.user.role;
        let foundBooking = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.UPDATE, typings_1.Resource.BOOKINGS, {
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
        await foundBooking.update({
            ...data,
            from: data.from && utils_1.toMySQLDate(data.from),
            to: data.from && utils_1.toMySQLDate(data.to)
        });
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role;
        let foundBooking = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.DELETE, typings_1.Resource.BOOKINGS, {
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, typings_1.Operation.CREATE, typings_1.Resource.BOOKINGS, {
            accessor: this.user,
            body: data
        });
        let replacementVehicle;
        try {
            if (!accessible) {
                throw new exceptions_1.InvalidPermissionException();
            }
            if (data.bookingType === typings_2.BookingType.REPLACEMENT) {
                const { brand, model, plateNumber, vin } = data;
                replacementVehicle = await this.db.ReplaceVehicle.create({
                    brand,
                    model,
                    plateNumber,
                    vin
                });
            }
            let exceptions = rbac_1.default.getExcludedFields(role, typings_1.Operation.CREATE, typings_1.Resource.BOOKINGS);
            let createdBooking = await this.createBooking({
                userId: role === typings_1.Role.GUEST ? this.user.id : data.userId,
                ...utils_1.exceptFields(data, exceptions),
                to: utils_1.toMySQLDate(data.to),
                from: utils_1.toMySQLDate(data.from),
                replaceVehicleId: (replacementVehicle && replacementVehicle.id) || null
            });
            let user = await this.getUser(role === typings_1.Role.GUEST ? this.user.id : data.userId);
            if (this.user.role === typings_1.Role.GUEST) {
                models_1.User.findAll({
                    where: {
                        clientId: user.clientId,
                        role: {
                            [sequelize_1.Op.in]: [typings_1.Role.ADMIN, typings_1.Role.KEY_MANAGER]
                        }
                    }
                }).then(async (users) => {
                    const vehicle = await models_1.Vehicle.findByPk(data.vehicleId);
                    const location = await models_1.Location.findByPk(vehicle.locationId);
                    let lng = location.lng;
                    let lat = location.lat;
                    if (vehicle.wialonUnitId) {
                        const w = await node_wialon_1.Wialon.login({
                            token: process.env.WIALON_TOKEN
                        });
                        const unit = await w.Core.searchItem({
                            id: vehicle.wialonUnitId,
                            flags: 1024 + 8192
                        });
                        if (unit) {
                            lat = unit.item && unit.item.pos && unit.item.pos.y;
                            lng = unit.item && unit.item.pos && unit.item.pos.x;
                        }
                    }
                    for (const user of users) {
                        try {
                            mail_1.sendBookingNotification({
                                email: user.email,
                                company: "LeasePlan",
                                bookingId: createdBooking.id,
                                customerEmail: this.user.email,
                                customerName: `${this.user.firstName} ${this.user.lastName}`,
                                from: createdBooking.from,
                                to: createdBooking.to,
                                lat,
                                lng,
                                location: location.name,
                                mobile: this.user.mobileNumber,
                                plateNumber: vehicle.plateNumber || "N/A",
                                vehicle: `${vehicle.brand} ${vehicle.model}`,
                                vehicleId: vehicle.id,
                                timeZone: user.timeZone
                            });
                        }
                        catch (e) { }
                    }
                });
            }
            return createdBooking;
        }
        catch (e) {
            replacementVehicle && (await replacementVehicle.destroy());
            throw e;
        }
    }
}
exports.default = Booking;


/***/ }),

/***/ "./src/server/datasource/Client.ts":
/*!*****************************************!*\
  !*** ./src/server/datasource/Client.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
const DataSource_1 = __importDefault(__webpack_require__(/*! ./DataSource */ "./src/server/datasource/DataSource.ts"));
const models_1 = __webpack_require__(/*! ../models */ "./src/server/models/index.ts");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
class Client extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db, userAccessor, typings_1.Resource.CLIENTS);
        this.get = async (id) => {
            let role = this.user.role;
            let foundClient = await this.getClient(id, {
                attributes: {
                    exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.CLIENTS)
                }
            });
            if (!foundClient) {
                throw new exceptions_1.ResourceNotFoundException(`Client with ID of ${id} is not found.`);
            }
            let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.CLIENTS, {
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
            const { access, excludedFields } = await this.getUserPermissions(typings_1.Operation.UPDATE, {
                accessor: this.user,
                target: foundClient
            });
            if (!access) {
                throw new exceptions_1.InvalidPermissionException();
            }
            if (data.locations && !excludedFields.includes("locations")) {
                await foundClient.setLocations(data.locations);
                await models_1.Vehicle.update({ clientId: null }, {
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
        let role = this.user.role;
        let foundClients = await this.getClients({
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.CLIENTS)
            }
        });
        let vehicles = [];
        for (let vehicle of foundClients) {
            let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.CLIENTS, {
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
        let role = this.user.role;
        let foundClient = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.DELETE, typings_1.Resource.CLIENTS, {
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, typings_1.Operation.CREATE, typings_1.Resource.CLIENTS, {
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


/***/ }),

/***/ "./src/server/datasource/DataSource.ts":
/*!*********************************************!*\
  !*** ./src/server/datasource/DataSource.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
class DataSource {
    constructor(db, user, resource) {
        this.db = db;
        this.user = user;
        this.resource = resource;
        this.getUserPermissions = async (action, params) => {
            if (this.user && this.resource) {
                return {
                    access: await rbac_1.default.can(this.user.role, action, this.resource, params),
                    excludedFields: rbac_1.default.getExcludedFields(this.user.role, action, this.resource)
                };
            }
            return { access: false, excludedFields: [] };
        };
    }
    createVehicle(data) {
        return this.db.Vehicle.create(data);
    }
    getVehicles(options) {
        return this.db.Vehicle.findAll({ ...options, include: [{ all: true }] });
    }
    getVehicle(id, options) {
        return this.db.Vehicle.findByPk(id, {
            ...options,
            include: [{ all: true }]
        });
    }
    createUser(data) {
        return this.db.User.create(data);
    }
    getUsers(options) {
        return this.db.User.findAll({ ...options, include: [{ all: true }] });
    }
    getUser(id, options) {
        return this.db.User.findByPk(id, { ...options, include: [{ all: true }] });
    }
    createLocation(data) {
        return this.db.Location.create(data);
    }
    getLocations(options) {
        return this.db.Location.findAll({ ...options, include: [{ all: true }] });
    }
    getLocation(id, options) {
        return this.db.Location.findByPk(id, {
            ...options,
            include: [{ all: true }]
        });
    }
    createBooking(data) {
        return this.db.Booking.create(data);
    }
    getBookings(options) {
        return this.db.Booking.findAll({ ...options, include: [{ all: true }] });
    }
    getBooking(id, options) {
        return this.db.Booking.findByPk(id, {
            ...options,
            include: [{ all: true }]
        });
    }
    createAccident(data) {
        return this.db.Accident.create(data);
    }
    getAccidents(options) {
        return this.db.Accident.findAll({ ...options, include: [{ all: true }] });
    }
    getAccident(id, options) {
        return this.db.Accident.findByPk(id, {
            ...options,
            include: [{ all: true }]
        });
    }
    createClient(data) {
        return this.db.Client.create(data);
    }
    getClients(options) {
        return this.db.Client.findAll({ ...options, include: [{ all: true }] });
    }
    getClient(id, options) {
        return this.db.Client.findByPk(id, {
            ...options,
            include: [{ all: true }]
        });
    }
    createCategory(data) {
        return this.db.Category.create(data);
    }
    getCategorys(options) {
        return this.db.Category.findAll({ ...options, include: [{ all: true }] });
    }
    getCategory(id, options) {
        return this.db.Category.findByPk(id, {
            ...options,
            include: [{ all: true }]
        });
    }
}
exports.default = DataSource;


/***/ }),

/***/ "./src/server/datasource/Location.ts":
/*!*******************************************!*\
  !*** ./src/server/datasource/Location.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(__webpack_require__(/*! ./DataSource */ "./src/server/datasource/DataSource.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
const models_1 = __webpack_require__(/*! ../models */ "./src/server/models/index.ts");
class Location extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role;
        let foundLocation = await this.getLocation(id, {
            include: [{ model: models_1.Client }],
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.LOCATIONS)
            }
        });
        if (!foundLocation) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.LOCATIONS, {
            accessor: this.user,
            target: foundLocation
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundLocation;
    }
    async getAll() {
        let role = this.user.role;
        let foundLocations = await this.getLocations({
            include: [{ model: models_1.Client }],
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.LOCATIONS)
            }
        });
        let locations = [];
        for (let location of foundLocations) {
            let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.LOCATIONS, {
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
        let role = this.user.role;
        let foundLocation = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.UPDATE, typings_1.Resource.LOCATIONS, {
            accessor: this.user,
            target: foundLocation,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundLocation.update(data);
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role;
        let foundLocation = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.DELETE, typings_1.Resource.LOCATIONS, {
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, typings_1.Operation.CREATE, typings_1.Resource.LOCATIONS, {
            accessor: this.user,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        let createdUser = await this.createLocation(data);
        return createdUser;
    }
}
exports.default = Location;


/***/ }),

/***/ "./src/server/datasource/User.ts":
/*!***************************************!*\
  !*** ./src/server/datasource/User.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const DataSource_1 = __importDefault(__webpack_require__(/*! ./DataSource */ "./src/server/datasource/DataSource.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
class User extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role;
        let foundUser = await this.getUser(id, {
            attributes: {
                exclude: [
                    ...rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.USERS),
                    "password"
                ]
            }
        });
        if (!foundUser) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.USERS, {
            accessor: this.user,
            target: foundUser
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundUser;
    }
    async getAll() {
        let role = this.user.role;
        let foundUsers = await this.getUsers({
            attributes: {
                exclude: [
                    ...rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.USERS),
                    "password"
                ]
            }
        });
        let users = [];
        for (let user of foundUsers) {
            let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.USERS, {
                accessor: this.user,
                target: user
            });
            if (accessible) {
                users.push(user);
            }
        }
        return users;
    }
    async update(id, data, options) {
        let role = this.user.role;
        let foundUser = await this.get(id);
        if (!foundUser) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, typings_1.Operation.UPDATE, typings_1.Resource.USERS, {
            accessor: this.user,
            target: foundUser,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        let hashedPassword = data["password"] && (await bcryptjs_1.default.hash(data["password"], 10));
        await foundUser.update({
            ...utils_1.exceptFields(data, ["categories"]),
            password: data["password"] && hashedPassword
        }, options);
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role;
        let foundUser = await this.get(id);
        if (!foundUser) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, typings_1.Operation.DELETE, typings_1.Resource.USERS, {
            accessor: this.user,
            target: foundUser
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundUser.destroy();
        return foundUser;
    }
    async create(data, options = {}) {
        let createdUser = await this.createUser({
            ...data,
            role: options.invited ? typings_1.Role.GUEST : data.role,
            approved: !options.invited
        });
        return createdUser;
    }
}
exports.default = User;


/***/ }),

/***/ "./src/server/datasource/Vehicle.ts":
/*!******************************************!*\
  !*** ./src/server/datasource/Vehicle.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(__webpack_require__(/*! ./DataSource */ "./src/server/datasource/DataSource.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
class Vehicle extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db);
        this.user = userAccessor;
    }
    async get(id) {
        let role = this.user.role;
        let foundVehicle = await this.getVehicle(id, {
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.VEHICLES)
            }
        });
        if (!foundVehicle) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.VEHICLES, {
            accessor: this.user,
            target: foundVehicle
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        return foundVehicle;
    }
    async getAll() {
        let role = this.user.role;
        let foundVehicles = await this.getVehicles({
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, typings_1.Operation.READ, typings_1.Resource.VEHICLES)
            }
        });
        let vehicles = [];
        for (let vehicle of foundVehicles) {
            let accessible = await rbac_1.default.can(role, typings_1.Operation.READ, typings_1.Resource.VEHICLES, {
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
        let role = this.user.role;
        let foundVehicle = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.UPDATE, typings_1.Resource.VEHICLES, {
            accessor: this.user,
            target: foundVehicle,
            body: data
        });
        if (!accessible) {
            throw new exceptions_1.InvalidPermissionException();
        }
        await foundVehicle.update(utils_1.exceptFields(data, ["categories"]));
        return this.get(id);
    }
    async delete(id) {
        let role = this.user.role;
        let foundVehicle = await this.get(id);
        let accessible = await rbac_1.default.can(role, typings_1.Operation.DELETE, typings_1.Resource.VEHICLES, {
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, typings_1.Operation.CREATE, typings_1.Resource.VEHICLES, {
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


/***/ }),

/***/ "./src/server/datasource/index.ts":
/*!****************************************!*\
  !*** ./src/server/datasource/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __webpack_require__(/*! ./User */ "./src/server/datasource/User.ts");
exports.User = User_1.default;
var Booking_1 = __webpack_require__(/*! ./Booking */ "./src/server/datasource/Booking.ts");
exports.Booking = Booking_1.default;
var Vehicle_1 = __webpack_require__(/*! ./Vehicle */ "./src/server/datasource/Vehicle.ts");
exports.Vehicle = Vehicle_1.default;
var Location_1 = __webpack_require__(/*! ./Location */ "./src/server/datasource/Location.ts");
exports.Location = Location_1.default;
var Client_1 = __webpack_require__(/*! ./Client */ "./src/server/datasource/Client.ts");
exports.Client = Client_1.default;
var Accident_1 = __webpack_require__(/*! ./Accident */ "./src/server/datasource/Accident.ts");
exports.Accident = Accident_1.default;


/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//eslint-disable import/first
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const express_session_1 = __importDefault(__webpack_require__(/*! express-session */ "express-session"));
const utils_1 = __webpack_require__(/*! ./utils */ "./src/server/utils/index.ts");
const typings_1 = __webpack_require__(/*! ../shared/typings */ "./src/shared/typings/index.ts");
const config_1 = __importDefault(__webpack_require__(/*! ./config */ "./src/server/config/index.ts"));
const models_1 = __webpack_require__(/*! ./models */ "./src/server/models/index.ts");
const auth_1 = __importDefault(__webpack_require__(/*! ./routes/auth */ "./src/server/routes/auth.ts"));
const users_1 = __importDefault(__webpack_require__(/*! ./routes/users */ "./src/server/routes/users.ts"));
const invites_1 = __importDefault(__webpack_require__(/*! ./routes/invites */ "./src/server/routes/invites.ts"));
const vehicles_1 = __importDefault(__webpack_require__(/*! ./routes/vehicles */ "./src/server/routes/vehicles.ts"));
const bookings_1 = __importDefault(__webpack_require__(/*! ./routes/bookings */ "./src/server/routes/bookings.ts"));
const locations_1 = __importDefault(__webpack_require__(/*! ./routes/locations */ "./src/server/routes/locations.ts"));
const accidents_1 = __importDefault(__webpack_require__(/*! ./routes/accidents */ "./src/server/routes/accidents.ts"));
const categories_1 = __importDefault(__webpack_require__(/*! ./routes/categories */ "./src/server/routes/categories.ts"));
const clients_1 = __importDefault(__webpack_require__(/*! ./routes/clients */ "./src/server/routes/clients.ts"));
const vehicleIssues_1 = __importDefault(__webpack_require__(/*! ./routes/vehicleIssues */ "./src/server/routes/vehicleIssues.ts"));
const wialon_1 = __importDefault(__webpack_require__(/*! ./routes/wialon */ "./src/server/routes/wialon.ts"));
const reports_1 = __importDefault(__webpack_require__(/*! ./routes/reports */ "./src/server/routes/reports.ts"));
const app = express_1.default();
// PASSPORT CONFIGURATIONS
passport_1.default.use(new passport_local_1.Strategy(async (username, password, cb) => {
    try {
        let existingUser = await models_1.User.findOne({
            where: { username }
        });
        if (existingUser) {
            let valid = await bcryptjs_1.default.compare(password, existingUser.password);
            if (!valid || existingUser.blocked) {
                return cb(null, false);
            }
            else if (existingUser.role !== typings_1.Role.MASTER &&
                existingUser.clientId === null) {
                throw new Error("Your account does not belong to a client. Please contact customer support.");
            }
            else {
                return cb(null, existingUser);
            }
        }
        return cb(null, false);
    }
    catch (e) {
        return cb(e);
    }
}));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport_1.default.deserializeUser(async (id, cb) => {
    try {
        const user = await models_1.User.findByPk(id, {
            include: [{ model: models_1.Category }],
            attributes: {
                exclude: ["password"]
            }
        });
        cb(null, user);
    }
    catch (e) {
        cb(e);
    }
});
// EXPRESS CONFIGURATIONS
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    secret: config_1.default.secretKey,
    resave: false,
    saveUninitialized: false
}));
app.use(express_1.default.json());
// TODO: Use config.js for cors options.
app.use(cors_1.default({ origin: process.env.CLIENT_URL, credentials: true }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Express routes
app.use("/api/carbooking/auth", auth_1.default);
app.use("/api/carbooking/users", users_1.default);
app.use("/api/carbooking/invites", invites_1.default);
app.use("/api/carbooking/vehicles", vehicles_1.default);
app.use("/api/carbooking/bookings", bookings_1.default);
app.use("/api/carbooking/locations", locations_1.default);
app.use("/api/carbooking/accidents", accidents_1.default);
app.use("/api/carbooking/categories", categories_1.default);
app.use("/api/carbooking/clients", clients_1.default);
app.use("/api/carbooking/issues", vehicleIssues_1.default);
app.use("/api/carbooking/wialon", wialon_1.default);
app.use("/api/carbooking/reports", reports_1.default);
app.use("/static", express_1.default.static(utils_1.getStaticFilesPath()));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
app.listen(config_1.default.serverPort, () => {
    console.log(`Listening on port ${config_1.default.serverPort}`);
});

/* WEBPACK VAR INJECTION */}.call(this, "src\\server"))

/***/ }),

/***/ "./src/server/middlewares/deleteFileOnError.ts":
/*!*****************************************************!*\
  !*** ./src/server/middlewares/deleteFileOnError.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
exports.default = async ({ file, files }, res, next) => {
    if (res.statusCode >= 400) {
        if (file) {
            if (file.url)
                utils_1.deleteFileFromUrl(file.url);
            else if (file.path)
                fs_1.default.promises.unlink(file.path);
        }
        if (files) {
            for (const key in Object.keys(files)) {
                const file = files[key];
                if (file.url)
                    utils_1.deleteFileFromUrl(file.url);
                else if (file.path)
                    fs_1.default.promises.unlink(file.path);
            }
        }
    }
    next();
};


/***/ }),

/***/ "./src/server/middlewares/deleteReplacedFiles.ts":
/*!*******************************************************!*\
  !*** ./src/server/middlewares/deleteReplacedFiles.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
exports.addReplacedFiles = (res, { url, model, field }) => {
    res.locals.replacedFiles
        ? res.locals.replacedFiles.push({ url, model, field })
        : (res.locals.replacedFiles = [{ url, model, field }]);
};
exports.deleteReplacedFiles = async (req, { locals }, next) => {
    if (locals.replacedFiles) {
        for (let file of locals.replacedFiles) {
            if (file.url && file.model && file.field) {
                file.model
                    .findAll({
                    where: {
                        [file.field]: file.url
                    }
                })
                    .then(found => {
                    if (!found.length) {
                        utils_1.deleteFileFromUrl(file.url);
                    }
                });
            }
        }
    }
    next();
};
exports.default = exports.deleteReplacedFiles;


/***/ }),

/***/ "./src/server/middlewares/disallowGuests.ts":
/*!**************************************************!*\
  !*** ./src/server/middlewares/disallowGuests.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
exports.default = (req, res, next) => {
    if (req.user.role !== typings_1.Role.GUEST) {
        next();
    }
    else {
        let response = new utils_1.ResponseBuilder();
        response.setCode(401);
        response.setMessage("You are not authorized as a guest.");
        res.status(401);
        res.json(response);
    }
};


/***/ }),

/***/ "./src/server/middlewares/index.ts":
/*!*****************************************!*\
  !*** ./src/server/middlewares/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./requireRole */ "./src/server/middlewares/requireRole.ts"));


/***/ }),

/***/ "./src/server/middlewares/multerUpload.ts":
/*!************************************************!*\
  !*** ./src/server/middlewares/multerUpload.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const multer_1 = __importDefault(__webpack_require__(/*! multer */ "multer"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const upload = (uploadPath, options) => {
    return multer_1.default({
        storage: multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                const filePath = path_1.default.join(utils_1.getStaticFilesPath(), uploadPath);
                utils_1.makeDirectoryIfNotExist(filePath)
                    .then(() => cb(null, filePath))
                    .catch(e => cb(e, filePath));
            },
            filename: function (req, file, cb) {
                console.log(file);
                cb(null, `${Date.now()}-${file.originalname}`); //use Date.now() for unique file keys
            }
        }),
        limits: {
            fileSize: 10000000,
            ...(options && options.limits)
        }
    });
};
exports.default = upload;


/***/ }),

/***/ "./src/server/middlewares/parseBody.ts":
/*!*********************************************!*\
  !*** ./src/server/middlewares/parseBody.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ body }, res, next) => {
    for (let key in body) {
        try {
            body[key] = JSON.parse(body[key]);
        }
        catch (e) { }
    }
    next();
};


/***/ }),

/***/ "./src/server/middlewares/requireLogin.ts":
/*!************************************************!*\
  !*** ./src/server/middlewares/requireLogin.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
function default_1(req, res, next) {
    if (!req.user) {
        let response = new utils_1.ResponseBuilder();
        response.setMessage("You are not authorized. Please login.");
        response.setCode(401);
        response.setSuccess(false);
        res.status(401);
        res.json(response);
    }
    else {
        next();
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/server/middlewares/requireRole.ts":
/*!***********************************************!*\
  !*** ./src/server/middlewares/requireRole.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const utils_2 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
exports.requireRole = (role) => (req, res, next) => {
    const response = new utils_1.ResponseBuilder();
    if (req.user &&
        ((role instanceof Array &&
            role.findIndex(role => req.user.role === role) >= 0) ||
            role === req.user.role)) {
        next();
    }
    else {
        response.setMessage("You are not authorized to access this resource.");
        response.setCode(401);
        response.setSuccess(false);
        res.status(401);
        res.json(response);
    }
};
exports.requireHigherOrEqualRole = (role) => (req, res, next) => {
    const response = new utils_1.ResponseBuilder();
    if (req.user && utils_2.RoleUtils.isRoleBetter(role, req.user.role)) {
        next();
    }
    else {
        response.setMessage("You are not authorized to access this resource.");
        response.setCode(401);
        response.setSuccess(false);
        res.status(401);
        res.json(response);
    }
};


/***/ }),

/***/ "./src/server/models/Accident.ts":
/*!***************************************!*\
  !*** ./src/server/models/Accident.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let Accident = class Accident extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Accident.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(500),
        allowNull: false,
        validate: {
            notNull: { msg: "Message is required." }
        }
    }),
    __metadata("design:type", String)
], Accident.prototype, "message", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Accident.prototype, "accidentImageSrc", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Accident.prototype, "accidentVideoSrc", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Accident.prototype, "lat", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Accident.prototype, "lng", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.User),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Accident.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.User),
    __metadata("design:type", _1.User)
], Accident.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Vehicle),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Accident.prototype, "vehicleId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Vehicle),
    __metadata("design:type", _1.Vehicle)
], Accident.prototype, "vehicle", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Booking),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Accident.prototype, "bookingId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Booking),
    __metadata("design:type", _1.Booking)
], Accident.prototype, "booking", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Accident.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Accident.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _1.User, () => _1.AccidentUserStatus, "accidentId"),
    __metadata("design:type", Array)
], Accident.prototype, "userStatuses", void 0);
Accident = __decorate([
    sequelize_typescript_1.Table
], Accident);
exports.Accident = Accident;


/***/ }),

/***/ "./src/server/models/AccidentUserStatus.ts":
/*!*************************************************!*\
  !*** ./src/server/models/AccidentUserStatus.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let AccidentUserStatus = class AccidentUserStatus extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ defaultValue: false, allowNull: false }),
    __metadata("design:type", Boolean)
], AccidentUserStatus.prototype, "read", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: false, allowNull: false }),
    __metadata("design:type", Boolean)
], AccidentUserStatus.prototype, "deleted", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Accident),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], AccidentUserStatus.prototype, "accidentId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Accident),
    __metadata("design:type", _1.Accident)
], AccidentUserStatus.prototype, "accident", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.User),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], AccidentUserStatus.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.User),
    __metadata("design:type", _1.User)
], AccidentUserStatus.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], AccidentUserStatus.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], AccidentUserStatus.prototype, "updatedAt", void 0);
AccidentUserStatus = __decorate([
    sequelize_typescript_1.Table
], AccidentUserStatus);
exports.AccidentUserStatus = AccidentUserStatus;


/***/ }),

/***/ "./src/server/models/Booking.ts":
/*!**************************************!*\
  !*** ./src/server/models/Booking.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
let Booking = class Booking extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: false, allowNull: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "paid", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: null }),
    __metadata("design:type", Number)
], Booking.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Booking.prototype, "from", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Booking.prototype, "to", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: null }),
    __metadata("design:type", Boolean)
], Booking.prototype, "approved", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: false, allowNull: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "finished", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Booking.prototype, "startMileage", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Booking.prototype, "endMileage", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Booking.prototype, "startFuel", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Booking.prototype, "endFuel", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.User),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Booking.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Vehicle),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Booking.prototype, "vehicleId", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Booking.prototype, "bookingType", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.ReplaceVehicle),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Booking.prototype, "replaceVehicleId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Booking.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.User),
    __metadata("design:type", _1.User)
], Booking.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Vehicle),
    __metadata("design:type", _1.Vehicle)
], Booking.prototype, "vehicle", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.ReplaceVehicle),
    __metadata("design:type", _1.ReplaceVehicle)
], Booking.prototype, "replaceVehicle", void 0);
Booking = __decorate([
    sequelize_typescript_1.Table
], Booking);
exports.Booking = Booking;


/***/ }),

/***/ "./src/server/models/Category.ts":
/*!***************************************!*\
  !*** ./src/server/models/Category.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! ./ */ "./src/server/models/index.ts");
let Category = class Category extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Client),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Category.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Client),
    __metadata("design:type", _1.Client)
], Category.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _1.Vehicle, () => _1.VehicleCategory),
    __metadata("design:type", Array)
], Category.prototype, "vehicles", void 0);
Category = __decorate([
    sequelize_typescript_1.Table
], Category);
exports.Category = Category;


/***/ }),

/***/ "./src/server/models/Client.ts":
/*!*************************************!*\
  !*** ./src/server/models/Client.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let Client = class Client extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Client.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Client.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.User),
    __metadata("design:type", Array)
], Client.prototype, "users", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Vehicle),
    __metadata("design:type", Array)
], Client.prototype, "vehicles", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Category),
    __metadata("design:type", Array)
], Client.prototype, "categories", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _1.Location, () => _1.ClientLocation),
    __metadata("design:type", Array)
], Client.prototype, "locations", void 0);
Client = __decorate([
    sequelize_typescript_1.Table
], Client);
exports.Client = Client;


/***/ }),

/***/ "./src/server/models/ClientLocation.ts":
/*!*********************************************!*\
  !*** ./src/server/models/ClientLocation.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let ClientLocation = class ClientLocation extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Client),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], ClientLocation.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Client),
    __metadata("design:type", _1.Client)
], ClientLocation.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Location),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], ClientLocation.prototype, "locationId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Location),
    __metadata("design:type", _1.Location)
], ClientLocation.prototype, "location", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], ClientLocation.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], ClientLocation.prototype, "updatedAt", void 0);
ClientLocation = __decorate([
    sequelize_typescript_1.Table
], ClientLocation);
exports.ClientLocation = ClientLocation;


/***/ }),

/***/ "./src/server/models/Location.ts":
/*!***************************************!*\
  !*** ./src/server/models/Location.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let Location = class Location extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Location.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Location.prototype, "lat", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Location.prototype, "lng", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Location.prototype, "locationImageSrc", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Location.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Location.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _1.Client, () => _1.ClientLocation),
    __metadata("design:type", Array)
], Location.prototype, "clients", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Vehicle),
    __metadata("design:type", Array)
], Location.prototype, "vehicles", void 0);
Location = __decorate([
    sequelize_typescript_1.Table
], Location);
exports.Location = Location;


/***/ }),

/***/ "./src/server/models/ReplaceVehicle.ts":
/*!*********************************************!*\
  !*** ./src/server/models/ReplaceVehicle.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let ReplaceVehicle = class ReplaceVehicle extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ReplaceVehicle.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ReplaceVehicle.prototype, "plateNumber", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ReplaceVehicle.prototype, "brand", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ReplaceVehicle.prototype, "model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ReplaceVehicle.prototype, "vin", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], ReplaceVehicle.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], ReplaceVehicle.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => _1.Booking),
    __metadata("design:type", _1.Booking)
], ReplaceVehicle.prototype, "booking", void 0);
ReplaceVehicle = __decorate([
    sequelize_typescript_1.Table
], ReplaceVehicle);
exports.ReplaceVehicle = ReplaceVehicle;


/***/ }),

/***/ "./src/server/models/User.ts":
/*!***********************************!*\
  !*** ./src/server/models/User.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! ./ */ "./src/server/models/index.ts");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
let User = User_1 = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        unique: { name: "email", msg: "Email address already in use." }
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        unique: { name: "email", msg: "Email address already in use." }
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        unique: { name: "email", msg: "Email address already in use." }
    }),
    __metadata("design:type", String)
], User.prototype, "mobileNumber", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "contractNo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "objectNo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "lastLogin", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "userImageSrc", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "licenseImageSrc", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "blocked", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailConfirmed", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Client),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "timeZone", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "userCreatorId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Client),
    __metadata("design:type", _1.Client)
], User.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1, "userCreatorId"),
    __metadata("design:type", User)
], User.prototype, "userCreator", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _1.Accident, () => _1.AccidentUserStatus),
    __metadata("design:type", Array)
], User.prototype, "accidentStatuses", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _1.Category, () => _1.UserVehicleCategory),
    __metadata("design:type", Array)
], User.prototype, "categories", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Booking),
    __metadata("design:type", Array)
], User.prototype, "bookings", void 0);
User = User_1 = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;


/***/ }),

/***/ "./src/server/models/UserVehicleCategory.ts":
/*!**************************************************!*\
  !*** ./src/server/models/UserVehicleCategory.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let UserVehicleCategory = class UserVehicleCategory extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.User),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], UserVehicleCategory.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.User),
    __metadata("design:type", _1.User)
], UserVehicleCategory.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Category),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], UserVehicleCategory.prototype, "categoryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Category),
    __metadata("design:type", _1.Category)
], UserVehicleCategory.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], UserVehicleCategory.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], UserVehicleCategory.prototype, "updatedAt", void 0);
UserVehicleCategory = __decorate([
    sequelize_typescript_1.Table
], UserVehicleCategory);
exports.UserVehicleCategory = UserVehicleCategory;


/***/ }),

/***/ "./src/server/models/Vehicle.ts":
/*!**************************************!*\
  !*** ./src/server/models/Vehicle.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
let Vehicle = class Vehicle extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Vehicle.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Vehicle.prototype, "brand", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Vehicle.prototype, "plateNumber", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Vehicle.prototype, "vin", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "defleeted", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Vehicle.prototype, "parkingLocation", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Vehicle.prototype, "vehicleImageSrc", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "bookingChargeCount", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "bookingCharge", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Vehicle.prototype, "wialonUnitId", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Vehicle.prototype, "bookingChargeUnit", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Client),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Vehicle.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Location),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Vehicle.prototype, "locationId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Vehicle.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Vehicle.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Booking),
    __metadata("design:type", Array)
], Vehicle.prototype, "bookings", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.Accident),
    __metadata("design:type", Array)
], Vehicle.prototype, "accidents", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _1.VehicleIssue),
    __metadata("design:type", Array)
], Vehicle.prototype, "vehicleIssues", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _1.Category, () => _1.VehicleCategory),
    __metadata("design:type", Array)
], Vehicle.prototype, "categories", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Client),
    __metadata("design:type", _1.Client)
], Vehicle.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Location),
    __metadata("design:type", _1.Location)
], Vehicle.prototype, "location", void 0);
Vehicle = __decorate([
    sequelize_typescript_1.Table
], Vehicle);
exports.Vehicle = Vehicle;


/***/ }),

/***/ "./src/server/models/VehicleCategory.ts":
/*!**********************************************!*\
  !*** ./src/server/models/VehicleCategory.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let VehicleCategory = class VehicleCategory extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Category),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], VehicleCategory.prototype, "categoryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Category),
    __metadata("design:type", _1.Category)
], VehicleCategory.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Vehicle),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], VehicleCategory.prototype, "vehicleId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Vehicle),
    __metadata("design:type", _1.Vehicle)
], VehicleCategory.prototype, "vehicle", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], VehicleCategory.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], VehicleCategory.prototype, "updatedAt", void 0);
VehicleCategory = __decorate([
    sequelize_typescript_1.Table
], VehicleCategory);
exports.VehicleCategory = VehicleCategory;


/***/ }),

/***/ "./src/server/models/VehicleIssue.ts":
/*!*******************************************!*\
  !*** ./src/server/models/VehicleIssue.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const _1 = __webpack_require__(/*! . */ "./src/server/models/index.ts");
let VehicleIssue = class VehicleIssue extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], VehicleIssue.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], VehicleIssue.prototype, "message", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _1.Vehicle),
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], VehicleIssue.prototype, "vehicleId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], VehicleIssue.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], VehicleIssue.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _1.Vehicle),
    __metadata("design:type", _1.Vehicle)
], VehicleIssue.prototype, "vehicle", void 0);
VehicleIssue = __decorate([
    sequelize_typescript_1.Table
], VehicleIssue);
exports.VehicleIssue = VehicleIssue;


/***/ }),

/***/ "./src/server/models/index.ts":
/*!************************************!*\
  !*** ./src/server/models/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/server/config/index.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const Accident_1 = __webpack_require__(/*! ./Accident */ "./src/server/models/Accident.ts");
const AccidentUserStatus_1 = __webpack_require__(/*! ./AccidentUserStatus */ "./src/server/models/AccidentUserStatus.ts");
const Booking_1 = __webpack_require__(/*! ./Booking */ "./src/server/models/Booking.ts");
const Category_1 = __webpack_require__(/*! ./Category */ "./src/server/models/Category.ts");
const Client_1 = __webpack_require__(/*! ./Client */ "./src/server/models/Client.ts");
const ClientLocation_1 = __webpack_require__(/*! ./ClientLocation */ "./src/server/models/ClientLocation.ts");
const Location_1 = __webpack_require__(/*! ./Location */ "./src/server/models/Location.ts");
const ReplaceVehicle_1 = __webpack_require__(/*! ./ReplaceVehicle */ "./src/server/models/ReplaceVehicle.ts");
const User_1 = __webpack_require__(/*! ./User */ "./src/server/models/User.ts");
const UserVehicleCategory_1 = __webpack_require__(/*! ./UserVehicleCategory */ "./src/server/models/UserVehicleCategory.ts");
const Vehicle_1 = __webpack_require__(/*! ./Vehicle */ "./src/server/models/Vehicle.ts");
const VehicleCategory_1 = __webpack_require__(/*! ./VehicleCategory */ "./src/server/models/VehicleCategory.ts");
const VehicleIssue_1 = __webpack_require__(/*! ./VehicleIssue */ "./src/server/models/VehicleIssue.ts");
__export(__webpack_require__(/*! ./Accident */ "./src/server/models/Accident.ts"));
__export(__webpack_require__(/*! ./AccidentUserStatus */ "./src/server/models/AccidentUserStatus.ts"));
__export(__webpack_require__(/*! ./Booking */ "./src/server/models/Booking.ts"));
__export(__webpack_require__(/*! ./Category */ "./src/server/models/Category.ts"));
__export(__webpack_require__(/*! ./Client */ "./src/server/models/Client.ts"));
__export(__webpack_require__(/*! ./ClientLocation */ "./src/server/models/ClientLocation.ts"));
__export(__webpack_require__(/*! ./Location */ "./src/server/models/Location.ts"));
__export(__webpack_require__(/*! ./ReplaceVehicle */ "./src/server/models/ReplaceVehicle.ts"));
__export(__webpack_require__(/*! ./User */ "./src/server/models/User.ts"));
__export(__webpack_require__(/*! ./UserVehicleCategory */ "./src/server/models/UserVehicleCategory.ts"));
__export(__webpack_require__(/*! ./Vehicle */ "./src/server/models/Vehicle.ts"));
__export(__webpack_require__(/*! ./VehicleCategory */ "./src/server/models/VehicleCategory.ts"));
__export(__webpack_require__(/*! ./VehicleIssue */ "./src/server/models/VehicleIssue.ts"));
const sequelize = new sequelize_typescript_1.Sequelize(config_1.default.database.name, config_1.default.database.username, config_1.default.database.password, {
    logging:  true ? console.log : undefined,
    host: config_1.default.database.host,
    port: parseInt(config_1.default.database.port),
    models: [
        Accident_1.Accident,
        AccidentUserStatus_1.AccidentUserStatus,
        Booking_1.Booking,
        Category_1.Category,
        Client_1.Client,
        ClientLocation_1.ClientLocation,
        Location_1.Location,
        ReplaceVehicle_1.ReplaceVehicle,
        User_1.User,
        UserVehicleCategory_1.UserVehicleCategory,
        Vehicle_1.Vehicle,
        VehicleCategory_1.VehicleCategory,
        VehicleIssue_1.VehicleIssue
    ],
    ...config_1.default.database.sequelize
});
sequelize
    .authenticate()
    .then(() => init(sequelize, { sync: {} }))
    .then(() => console.log("Connection has been established successfully."))
    .catch(err => {
    console.error("Unable to connect to the database\n", err);
});
const init = async (sequelize, params) => {
    if (params.sync) {
        await sequelize.sync(params.sync.options);
    }
    let users = await User_1.User.findAll();
    if (users.length === 0) {
        // Create root user...
        let rootPassword = await bcryptjs_1.default.hash(config_1.default.database.password, 10);
        await User_1.User.create({
            username: "root",
            password: rootPassword,
            firstName: "Root",
            lastName: "Account",
            email: "support@atsuae.net",
            role: typings_1.Role.MASTER,
            mobileNumber: "",
            approved: true
        });
    }
};
exports.default = {
    Accident: Accident_1.Accident,
    AccidentUserStatus: AccidentUserStatus_1.AccidentUserStatus,
    Booking: Booking_1.Booking,
    Category: Category_1.Category,
    Client: Client_1.Client,
    ClientLocation: ClientLocation_1.ClientLocation,
    Location: Location_1.Location,
    ReplaceVehicle: ReplaceVehicle_1.ReplaceVehicle,
    User: User_1.User,
    UserVehicleCategory: UserVehicleCategory_1.UserVehicleCategory,
    Vehicle: Vehicle_1.Vehicle,
    VehicleCategory: VehicleCategory_1.VehicleCategory,
    VehicleIssue: VehicleIssue_1.VehicleIssue
};


/***/ }),

/***/ "./src/server/rbac/index.ts":
/*!**********************************!*\
  !*** ./src/server/rbac/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class RBAC {
    constructor(name) {
        this.name = name;
        this.roles = [];
    }
    addRole(role) {
        let existing = this.roles.find((roleItem) => roleItem.name === role.name);
        if (existing)
            throw new Error("Role already exists");
        this.roles.push(role);
    }
    can(role, action, resource, params) {
        return new Promise(async (resolve) => {
            let existingRole = this.roles.find((roleItem) => {
                if (role instanceof Role) {
                    return role.name === roleItem.name;
                }
                return role === roleItem.name;
            });
            if (!existingRole)
                throw new Error("Role does not exist.");
            let permitted = await existingRole.can(action, resource, params);
            resolve(permitted);
        });
    }
    getExcludedFields(role, action, resource) {
        let $role = this.roles.find(($role) => $role.name === role);
        if ($role) {
            let excludedFields = [];
            if ($role.extends) {
                for (let role of $role.extends) {
                    let $action = role.actions.find($action => $action.name === action && $action.resource.name === resource);
                    if ($action) {
                        excludedFields.push(...$action.excludedFields);
                    }
                }
            }
            let $action = $role.actions.find($action => $action.name === action && $action.resource.name === resource);
            if ($action) {
                excludedFields.push(...$action.excludedFields);
            }
            return excludedFields;
        }
        else
            throw new Error("Role does not exist.");
    }
    toObject() {
        return {
            name: this.name,
            roles: this.roles.map(role => ({
                name: role.name,
                access: role.actions.reduce((acc, action) => {
                    if (!acc.resources[action.resource.name]) {
                        acc.resources[action.resource.name] = {
                            permissions: {}
                        };
                    }
                    acc.resources[action.resource.name].permissions[action.name] = {
                        conditional: action.condition ? true : false,
                        excludedFields: action.excludedFields
                    };
                    return acc;
                }, {
                    resources: {}
                }),
                extends: role.extends.map(role => role.name)
            }))
        };
    }
}
exports.RBAC = RBAC;
class Role {
    constructor(name) {
        this.name = name;
        this.actions = [];
        this.extends = [];
    }
    addPermission(action) {
        let existingAction = this.actions.find(currentAction => currentAction.name === action.name &&
            currentAction.resource.name === action.resource.name);
        if (existingAction)
            throw new Error("Action already exists.");
        this.actions.push(action);
    }
    extend(role) {
        this.extends.push(role);
    }
    can(action, resource, params) {
        return new Promise(async (resolve) => {
            let actions = this.actions;
            let resourceName = resource instanceof Resource ? resource.name : resource;
            for (let i = 0; i < actions.length; i++) {
                let currentAction = actions[i];
                if (action === currentAction.name &&
                    currentAction.resource.name === resourceName) {
                    let permitted;
                    try {
                        permitted = await currentAction.perform(params);
                    }
                    catch (e) {
                        permitted = false;
                    }
                    if (permitted) {
                        return resolve(permitted);
                    }
                }
            }
            // Contine looking for matching actions, incase role is extended.
            if (this.extends) {
                for (let i = 0; i < this.extends.length; i++) {
                    let extendedRole = this.extends[i];
                    let permitted = await extendedRole.can(action, resource, params);
                    if (permitted) {
                        return resolve(permitted);
                    }
                }
            }
            return resolve(false);
        });
    }
}
exports.Role = Role;
class Action {
    constructor(name, resource, condition, excludedFields = []) {
        this.name = name;
        this.resource = resource;
        this.condition = condition;
        this.excludedFields = excludedFields;
    }
    perform(params) {
        if (this.condition) {
            return this.condition(params);
        }
        return true;
    }
}
exports.Action = Action;
class Resource {
    constructor(name) {
        this.name = name;
    }
}
exports.Resource = Resource;
exports.default = RBAC;


/***/ }),

/***/ "./src/server/routes/accidents.ts":
/*!****************************************!*\
  !*** ./src/server/routes/accidents.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const deleteReplacedFiles_1 = __webpack_require__(/*! ../middlewares/deleteReplacedFiles */ "./src/server/middlewares/deleteReplacedFiles.ts");
const parseBody_1 = __importDefault(__webpack_require__(/*! ../middlewares/parseBody */ "./src/server/middlewares/parseBody.ts"));
const multerUpload_1 = __importDefault(__webpack_require__(/*! ../middlewares/multerUpload */ "./src/server/middlewares/multerUpload.ts"));
const deleteFileOnError_1 = __importDefault(__webpack_require__(/*! ../middlewares/deleteFileOnError */ "./src/server/middlewares/deleteFileOnError.ts"));
const models_1 = __importDefault(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const datasource_1 = __webpack_require__(/*! ../datasource */ "./src/server/datasource/index.ts");
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user }, res) => {
    const response = new utils_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        const accidents = await AccidentDataSource.getAll();
        response.setData(accidents);
        response.handleSuccess(`Found ${accidents.length} accidents.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/accidents").fields([
    { name: "accidentImageSrc" },
    { name: "accidentVideoSrc" }
]), parseBody_1.default, async ({ user, body, files }, res, next) => {
    const response = new utils_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    const accidentImageSrc = files &&
        files.accidentImageSrc &&
        files.accidentImageSrc[0] &&
        files.accidentImageSrc[0].filename &&
        utils_1.getFileURL("carbooking/media/accidents", files.accidentImageSrc[0].filename);
    const accidentVideoSrc = files &&
        files.accidentVideoSrc &&
        files.accidentVideoSrc[0] &&
        files.accidentVideoSrc[0].filename &&
        utils_1.getFileURL("carbooking/media/accidents", files.accidentVideoSrc[0].filename);
    try {
        const createdAccident = await AccidentDataSource.create({
            ...body,
            accidentImageSrc,
            accidentVideoSrc
        });
        response.setData(createdAccident);
        response.handleSuccess("Accident has been created.", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default);
router.get("/:id", async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        const foundAccident = await AccidentDataSource.get(params.id);
        response.setData(foundAccident.get({ plain: true }));
        response.handleSuccess(`Found accident with ID ${params.id}`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", multerUpload_1.default("carbooking/media/accidents").fields([
    { name: "accidentImageSrc" },
    { name: "accidentVideoSrc" }
]), parseBody_1.default, async ({ user, params, body, files }, res, next) => {
    const response = new utils_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        const accidentImageSrc = files &&
            files.accidentImageSrc &&
            files.accidentImageSrc[0] &&
            files.accidentImageSrc[0].filename &&
            utils_1.getFileURL("carbooking/media/accidents", files.accidentVideoSrc[0].filename);
        const accidentVideoSrc = files &&
            files.accidentVideoSrc &&
            files.accidentVideoSrc[0] &&
            files.accidentVideoSrc[0].filename &&
            utils_1.getFileURL("carbooking/media/accidents", files.accidentVideoSrc[0].filename);
        const [previousValue, updatedAccident] = await AccidentDataSource.update(params.id, {
            ...body,
            accidentImageSrc,
            accidentVideoSrc
        });
        accidentImageSrc &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: previousValue.accidentImageSrc,
                model: models_1.default.Accident,
                field: "accidentImageSrc"
            });
        accidentVideoSrc &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: previousValue.accidentVideoSrc,
                model: models_1.default.Accident,
                field: "accidentVideoSrc"
            });
        response.setData(updatedAccident);
        response.handleSuccess(`Accident with ID ${params.id} has been updated.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", async ({ user, params }, res, next) => {
    const response = new utils_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        await AccidentDataSource.delete(params.id);
        response.handleSuccess(`Accident with ID ${params.id} has been deleted.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/auth.ts":
/*!***********************************!*\
  !*** ./src/server/routes/auth.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const express_validator_1 = __webpack_require__(/*! express-validator */ "express-validator");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const mail_1 = __webpack_require__(/*! ../utils/mail */ "./src/server/utils/mail/index.ts");
const models_1 = __importDefault(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/server/config/index.ts"));
const { secretKey } = config_1.default;
const router = express_1.default.Router();
router.get("/me", requireLogin_1.default, function (req, res) {
    let response = new utils_1.ResponseBuilder();
    response.setData(req.user);
    response.setMessage("You are logged in.");
    response.setSuccess(true);
    response.setCode(200);
    res.json(response);
});
router.patch("/me", requireLogin_1.default, async function ({ user, body }, res) {
    let response = new utils_1.ResponseBuilder();
    let me = user && (await models_1.default.User.findByPk(user.id));
    if (me) {
        if (body.password && body.passwordOld) {
            let samePassword = await bcryptjs_1.default.compare(body.password, me.password);
            if (!samePassword) {
                let validOldPassword = await bcryptjs_1.default.compare(body.passwordOld, me.password);
                let newPassword = await bcryptjs_1.default.hash(body.password, 10);
                if (validOldPassword) {
                    await me.update({ password: newPassword });
                    response.setCode(200);
                    response.setMessage("Successfully updated.");
                    response.setSuccess(true);
                }
                else {
                    response.setCode(400);
                    response.setMessage("Invalid old password.");
                    res.status(400);
                }
            }
            else {
                response.setCode(400);
                response.setMessage("Old password is same as the new one.");
                res.status(400);
            }
        }
    }
    else {
        response.setCode(401);
        response.setMessage("Unauthorized. Are you logged in?");
        res.status(401);
    }
    res.json(response);
});
router.post("/login", function (req, res, next) {
    passport_1.default.authenticate("local", function (err, user, info) {
        let response = new utils_1.ResponseBuilder();
        if (err) {
            response.setMessage(err.message);
            response.setCode(401);
            res.status(401);
            return res.json(response);
        }
        if (!user) {
            response.setMessage("Invalid login details");
            response.setCode(401);
            res.status(401);
            return res.json(response);
        }
        req.logIn(user, function (err) {
            // TODO: Updated last login in user.
            models_1.default.User.findByPk(user.id).then(user => {
                user &&
                    user.update({ lastLogin: moment_1.default().format("YYYY-MM-DD HH:mm:ss") });
            });
            if (err) {
                return next(err);
            }
            response.handleSuccess("Logged in successfully", res);
            return res.json(response.toObject());
        });
    })(req, res, next);
}, function (req, res) {
    res.json(req.user);
});
router.get("/logout", function (req, res) {
    let response = new utils_1.ResponseBuilder();
    response.setCode(200);
    response.setMessage("Successfully logged out.");
    response.setSuccess(true);
    req.logout();
    res.status(200);
    res.send(response);
});
router.post("/forgot", express_validator_1.oneOf([
    express_validator_1.check("email")
        .exists({ checkNull: true })
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email"),
    [
        express_validator_1.check("token")
            .exists({ checkNull: true })
            .withMessage("You do not have a reset token."),
        express_validator_1.check("password")
            .exists({ checkNull: true })
            .isLength({ min: 8, max: 32 })
            .withMessage("A new password should be provided")
    ]
]), async function (req, res) {
    const response = new utils_1.ResponseBuilder();
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        for (let error of errors.array())
            response.appendError(error.msg);
        response.setMessage("Invalid fields");
        response.setCode(422);
        return res.status(422).json(response);
    }
    const { email, token, password } = req.body;
    if (token) {
        try {
            const validToken = jsonwebtoken_1.default.verify(token, secretKey);
            if (validToken && validToken.passwordReset) {
                const user = await models_1.default.User.findOne({
                    where: { email: validToken.email }
                });
                const newPassword = await bcryptjs_1.default.hash(password, 10);
                user && (await user.update({ password: newPassword }));
                response.setSuccess(true);
                response.setMessage("Password has been reset.");
                response.setCode(401);
                return res.json(response);
            }
        }
        catch (e) {
            response.setSuccess(true);
            response.setMessage("Invalid token");
            response.setCode(422);
            return res.status(401).json(response);
        }
    }
    else if (email) {
        const foundEmail = await models_1.default.User.findOne({ where: { email } });
        if (foundEmail) {
            mail_1.sendPasswordResetToken({
                email,
                url: `${process.env.CLIENT_URL}/login/forgot`
            })
                .then(() => {
                response.setSuccess(true);
                response.setMessage("A reset code has been sent.");
                response.setCode(200);
                return res.json(response);
            })
                .catch(e => {
                console.log(e);
                response.setMessage("Unknown error.");
                response.setCode(500);
                return res.status(500).json(response);
            });
        }
        else {
            response.setMessage("Email is not registered.");
            response.setCode(404);
            return res.status(404).json(response);
        }
    }
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/bookings.ts":
/*!***************************************!*\
  !*** ./src/server/routes/bookings.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const api_1 = __webpack_require__(/*! ../api */ "./src/server/api/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user }, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        const foundBookings = await api_1.Booking.getAll(user);
        response.handleSuccess(`Found ${foundBookings.data.length} bookings.`, res);
        response.setData(foundBookings.cast(user));
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", async ({ user, body }, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        const createdBooking = await api_1.Booking.create(user, body);
        createdBooking.setEmailNotificationsToBookingManagers();
        response.setData(createdBooking.cast(user));
        response.handleSuccess("Booking has been created.", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.get("/:id", async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        let foundBooking = await api_1.Booking.get(user, params.id);
        response.setData(foundBooking.cast(user));
        response.handleSuccess(`Booking with ID of ${params.id} found.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", async ({ user, params, body }, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        const bookingPreviousValue = await api_1.Booking.get(user, params.id);
        const updatedBooking = await bookingPreviousValue.update(user, body);
        if (body.amount !== undefined &&
            body.amount !== null &&
            bookingPreviousValue.data.amount === null) {
            updatedBooking.sendInvoice(body.amount);
        }
        if (body.approved === true && bookingPreviousValue.data.approved === null) {
            updatedBooking.sendBookingConfirmation();
        }
        response.setData(updatedBooking.cast(user));
        response.handleSuccess("Booking has been updated", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.delete("/:id", async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        const foundBooking = await api_1.Booking.get(user, params.id);
        await foundBooking.destroy(user);
        response.setData(foundBooking.cast(user));
        response.handleSuccess(`Booking with ID ${params.id} has been deleted.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/categories.ts":
/*!*****************************************!*\
  !*** ./src/server/routes/categories.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const models_1 = __importDefault(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const utils_1 = __webpack_require__(/*! ../utils/ */ "./src/server/utils/index.ts");
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const router = express_1.default.Router();
router.get("/", requireLogin_1.default, async (req, res) => {
    let response = new utils_1.ResponseBuilder();
    const categories = await models_1.default.Category.findAll();
    response.setData(categories);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.post("/", requireLogin_1.default, async ({ body }, res) => {
    let response = new utils_1.ResponseBuilder();
    const created = await models_1.default.Category.create({
        name: body.name,
        clientId: body.clientId
    });
    response.setData(created);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.patch("/:id", requireLogin_1.default, async ({ params, body }, res) => {
    let response = new utils_1.ResponseBuilder();
    const found = await models_1.default.Category.findByPk(params.id);
    found && found.update({ name: body.name, clientId: body.clientId });
    response.setData(found);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.delete("/:id", requireLogin_1.default, async ({ params }, res) => {
    let response = new utils_1.ResponseBuilder();
    const found = await models_1.default.Category.findByPk(params.id);
    found && (await found.destroy());
    response.setData(found);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/clients.ts":
/*!**************************************!*\
  !*** ./src/server/routes/clients.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const datasource_1 = __webpack_require__(/*! ../datasource */ "./src/server/datasource/index.ts");
const models_1 = __importStar(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
const router = express_1.default.Router();
router.get("/", async ({ user }, res) => {
    const response = new utils_1.ResponseBuilder();
    const ClientDataSource = new datasource_1.Client(models_1.default, user);
    try {
        const clients = await ClientDataSource.getAll();
        response.setData(clients);
        response.handleSuccess(`Found ${clients.length} accidents.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", async ({ user, body }, res) => {
    const response = new utils_1.ResponseBuilder();
    const ClientDataSource = new datasource_1.Client(models_1.default, user);
    try {
        const createdClient = await ClientDataSource.create({
            ...body,
            clientId: user.clientId
        });
        response.setData(createdClient);
        response.handleSuccess("Client has been created", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.get("/:id", async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    const ClientDataSource = new datasource_1.Client(models_1.default, user);
    try {
        const foundClient = await ClientDataSource.get(params.id);
        response.setData({
            ...foundClient.get({ plain: true }),
            locations: (await foundClient.getLocations()).map(c => c.id)
        });
        response.handleSuccess(`Found accident with ID ${params.id}`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", async ({ user, params, body }, res) => {
    const response = new utils_1.ResponseBuilder();
    const ClientDataSource = new datasource_1.Client(models_1.default, user);
    try {
        const [previousValue, updatedValue] = await ClientDataSource.update(params.id, body);
        response.setData(updatedValue);
        response.handleSuccess(`Client with ID ${params.id} has been updated.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.delete("/:id", async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    const ClientDataSource = new datasource_1.Client(models_1.default, user);
    try {
    }
    catch (e) {
        await ClientDataSource.delete(params.id);
        response.handleSuccess(`Client with ID ${params.id} has been deleted.`, res);
    }
    res.json(response);
});
router.get("/:id/locations", requireLogin_1.default, async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    // TODO: Abstraction of apis
    try {
        const foundClient = await models_1.Client.findByPk(params.id);
        if (!foundClient) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID ${params.id} cannot be found.`);
        }
        if (user.role !== typings_1.Role.MASTER && foundClient.id !== user.clientId) {
            throw new exceptions_1.InvalidPermissionException();
        }
        const clientLocations = await models_1.Location.findAll({
            include: [
                {
                    model: models_1.Client,
                    where: {
                        id: foundClient.id
                    }
                }
            ]
        });
        response.setData(clientLocations);
        response.setSuccess(true);
        response.setMessage(`Found ${clientLocations.length} locations.`);
        response.setCode(200);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response.toObject());
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/invites.ts":
/*!**************************************!*\
  !*** ./src/server/routes/invites.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const mail_1 = __webpack_require__(/*! ../utils/mail */ "./src/server/utils/mail/index.ts");
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const disallowGuests_1 = __importDefault(__webpack_require__(/*! ../middlewares/disallowGuests */ "./src/server/middlewares/disallowGuests.ts"));
const models_1 = __importDefault(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.use(disallowGuests_1.default);
//TODO: check if email already exists in DB.
// Send an invite to an email
router.post("/", async ({ body, user }, res) => {
    let response = new utils_1.ResponseBuilder();
    // Check if email is provided.
    if (body.email) {
        // Send email invite
        try {
            let existingEmail = await models_1.default.User.findOne({
                where: { email: body.email }
            });
            if (!existingEmail) {
                await mail_1.sendInvite({ email: body.email, clientId: user.clientId });
                response.handleSuccess(`Invite has been sent to ${body.email}`, res);
            }
            else {
                throw new Error("Email is already registered.");
            }
        }
        catch (e) {
            response.handleError(e, res);
        }
    }
    else {
        response.setMessage("Please provide an email address.");
        response.setCode(422);
    }
    res.json(response);
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/locations.ts":
/*!****************************************!*\
  !*** ./src/server/routes/locations.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const disallowGuests_1 = __importDefault(__webpack_require__(/*! ../middlewares/disallowGuests */ "./src/server/middlewares/disallowGuests.ts"));
const parseBody_1 = __importDefault(__webpack_require__(/*! ../middlewares/parseBody */ "./src/server/middlewares/parseBody.ts"));
const deleteFileOnError_1 = __importDefault(__webpack_require__(/*! ../middlewares/deleteFileOnError */ "./src/server/middlewares/deleteFileOnError.ts"));
const deleteReplacedFiles_1 = __webpack_require__(/*! ../middlewares/deleteReplacedFiles */ "./src/server/middlewares/deleteReplacedFiles.ts");
const multerUpload_1 = __importDefault(__webpack_require__(/*! ../middlewares/multerUpload */ "./src/server/middlewares/multerUpload.ts"));
const models_1 = __importDefault(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const datasource_1 = __webpack_require__(/*! ../datasource */ "./src/server/datasource/index.ts");
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user }, res) => {
    const response = new utils_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        const locations = await LocationDataSource.getAll();
        response.setData(locations);
        response.handleSuccess(`Found ${locations.length} locations. `, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/locations").single("locationImageSrc"), parseBody_1.default, disallowGuests_1.default, async ({ user, body }, res) => {
    const response = new utils_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        const createdLocation = await LocationDataSource.create(body);
        response.setData(createdLocation);
        response.handleSuccess("Location has been created.", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
}, deleteFileOnError_1.default);
router.get("/:id", async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        let foundLocation = await LocationDataSource.get(params.id);
        response.setData(foundLocation.get({ plain: true }));
        response.handleSuccess(`Found location with ID of ${foundLocation.id}`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", multerUpload_1.default("carbooking/media/locations").single("locationImageSrc"), parseBody_1.default, disallowGuests_1.default, async ({ user, params, body, file = {} }, res) => {
    const fileLocation = file &&
        file.filename &&
        utils_1.getFileURL("carbooking/media/users/profile", file.filename);
    const response = new utils_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        const updatedLocation = await LocationDataSource.update(params.id, body);
        fileLocation &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: updatedLocation.locationImageSrc,
                model: models_1.default.Location,
                field: "locationImageSrc"
            });
        response.setData(updatedLocation.get({ plain: true }));
        response.handleSuccess(`Location with ID ${params.id} updated.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", async ({ user, params }, res) => {
    let response = new utils_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        let deletedLocation = await LocationDataSource.delete(params.id);
        response.setData(deletedLocation.get({ plain: true }));
        response.handleSuccess(`Location with ID ${params.id} has been deleted.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/reports.ts":
/*!**************************************!*\
  !*** ./src/server/routes/reports.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const node_wialon_1 = __webpack_require__(/*! node-wialon */ "node-wialon");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const middlewares_1 = __webpack_require__(/*! ../middlewares */ "./src/server/middlewares/index.ts");
const models_1 = __webpack_require__(/*! ../models */ "./src/server/models/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const router = express_1.default.Router();
router.use(middlewares_1.requireHigherOrEqualRole(typings_1.Role.KEY_MANAGER));
router.get("/unit-summary", async ({ user }, res) => {
    let response = new utils_1.ResponseBuilder();
    const w = await node_wialon_1.Wialon.login({ token: process.env.WIALON_TOKEN });
    let whereOptions = { clientId: user.clientId };
    if (user.role === typings_1.Role.MASTER) {
        whereOptions = {};
    }
    let clientUsersIds = (await models_1.Vehicle.findAll({
        where: whereOptions
    })).map(user => user.id);
    let clientVehicles = await models_1.Vehicle.findAll({
        where: whereOptions,
        include: [
            {
                model: models_1.Accident,
                as: "accidents",
                where: {
                    userId: {
                        [sequelize_1.Op.in]: clientUsersIds
                    }
                },
                required: false
            },
            {
                model: models_1.Booking,
                as: "bookings",
                where: {
                    userId: {
                        [sequelize_1.Op.in]: clientUsersIds
                    }
                },
                required: false
            },
            {
                model: models_1.Category,
                as: "categories",
                where: whereOptions,
                required: false
            },
            {
                model: models_1.VehicleIssue,
                as: "vehicleIssues"
            },
            models_1.Location
        ]
    });
    const units = await w.Utils.getUnits({ flags: 8192 + 1 });
    const data = clientVehicles.map(vehicle => {
        const wialonUnit = units.items.find(unit => unit.id === vehicle.wialonUnitId);
        return {
            plateNumber: vehicle.plateNumber,
            brand: vehicle.brand,
            model: vehicle.model,
            odometer: (wialonUnit && wialonUnit.cnm) || null,
            accidents: vehicle.accidents.length,
            bookings: vehicle.bookings.filter(booking => booking.finished).length,
            categories: vehicle.categories.map(category => category.name),
            issues: vehicle.vehicleIssues.length,
            defleeted: vehicle.defleeted,
            wialonUnit: Boolean(wialonUnit),
            wialonUnitName: utils_1.RoleUtils.isRoleBetter(typings_1.Role.MASTER, user.role)
                ? (wialonUnit && wialonUnit.nm) || null
                : undefined,
            client: utils_1.RoleUtils.isRoleBetter(typings_1.Role.MASTER, user.role)
                ? vehicle.client && vehicle.client.name
                : undefined
        };
    });
    response.setData(data);
    response.handleSuccess("Report successful.", res);
    res.json(response);
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/users.ts":
/*!************************************!*\
  !*** ./src/server/routes/users.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const deleteReplacedFiles_1 = __webpack_require__(/*! ../middlewares/deleteReplacedFiles */ "./src/server/middlewares/deleteReplacedFiles.ts");
const deleteFileOnError_1 = __importDefault(__webpack_require__(/*! ../middlewares/deleteFileOnError */ "./src/server/middlewares/deleteFileOnError.ts"));
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const disallowGuests_1 = __importDefault(__webpack_require__(/*! ../middlewares/disallowGuests */ "./src/server/middlewares/disallowGuests.ts"));
const parseBody_1 = __importDefault(__webpack_require__(/*! ../middlewares/parseBody */ "./src/server/middlewares/parseBody.ts"));
const multerUpload_1 = __importDefault(__webpack_require__(/*! ../middlewares/multerUpload */ "./src/server/middlewares/multerUpload.ts"));
const models_1 = __importDefault(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/server/config/index.ts"));
const datasource_1 = __webpack_require__(/*! ../datasource */ "./src/server/datasource/index.ts");
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
const router = express_1.default.Router();
router.get("/", requireLogin_1.default, async ({ user }, res) => {
    const response = new utils_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        const users = await UserDataSource.getAll();
        response.setData(users);
        response.handleSuccess(`Found ${users.length} users.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/users/profile").single("userImageSrc"), parseBody_1.default, async ({ user, body, file = {} }, res, next) => {
    const { location: fileLocation = null } = file;
    const response = new utils_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    let inviteTokenUsed = false;
    let email = body.email;
    let clientId = (user && user.clientId) || null;
    // Consume invite token
    if (body.inviteToken) {
        const inviteToken = jsonwebtoken_1.default.verify(body.inviteToken, config_1.default.secretKey);
        if (inviteToken) {
            inviteTokenUsed = true;
            email = inviteToken.email;
            clientId = inviteToken.clientId || null;
        }
    }
    try {
        let hashedPassword = await bcryptjs_1.default.hash(body.password, 10);
        let createdUser = await UserDataSource.create({
            ...body,
            userImageSrc: fileLocation,
            email,
            password: hashedPassword,
            clientId: clientId
        }, {
            invited: inviteTokenUsed
        });
        response.setData({
            createdUser,
            categories: (await createdUser.getCategories()).map(c => c.id)
        });
        response.setMessage("User has been created.");
        response.setCode(200);
        response.setSuccess(true);
        res.status(200);
    }
    catch (e) {
        response.setMessage(e.message);
        if (e instanceof exceptions_1.InvalidPermissionException) {
            response.setCode(422);
            res.status(422);
        }
        else {
            response.setMessage(e.message);
            response.setCode(403);
            res.status(403);
        }
        if (e.errors && e.errors.length > 0) {
            e.errors.forEach(error => response.appendError(error.path));
        }
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default);
router.get("/:id", requireLogin_1.default, async ({ user, params }, res) => {
    const response = new utils_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        const foundUser = await UserDataSource.get(params.id);
        response.setData({
            ...foundUser.get({ plain: true }),
            categories: (await foundUser.getCategories()).map(c => c.id)
        });
        response.setCode(200);
        response.setMessage(`User with ID ${params.id} found.`);
        response.setSuccess(true);
    }
    catch (e) {
        if (e instanceof exceptions_1.ResourceNotFoundException) {
            res.status(404);
            response.setCode(404);
        }
        else {
            res.status(403);
            response.setCode(403);
        }
        response.setMessage(e.message);
    }
    res.json(response);
});
router.patch("/:id", requireLogin_1.default, multerUpload_1.default("carbooking/media/users/profile").single("userImageSrc"), parseBody_1.default, async ({ user, body, file = {}, params }, res, next) => {
    const fileLocation = file &&
        file.filename &&
        utils_1.getFileURL("carbooking/media/users/profile", file.filename);
    let response = new utils_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        let foundUser = await UserDataSource.get(body.id);
        fileLocation &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: foundUser.userImageSrc,
                model: models_1.default.User,
                field: "userImageSrc"
            });
        if (body.categories) {
            let categories = await models_1.default.Category.findAll({
                where: { id: body.categories }
            });
            await foundUser.$set("categories", categories);
        }
        let updatedUser = await UserDataSource.update(foundUser.id, {
            ...body,
            userImageSrc: fileLocation || foundUser.userImageSrc
        });
        response.setData(updatedUser.get({ plain: true }));
        response.setCode(200);
        response.setMessage(`User with ID ${params.id} updated.`);
        response.setSuccess(true);
    }
    catch (e) {
        console.log(e);
        if (e instanceof exceptions_1.InvalidPermissionException) {
            response.setMessage(e.message);
            response.setCode(422);
            res.status(422);
        }
        else {
            response.setCode(403);
            res.status(403);
        }
        if (e.errors && e.errors.length > 0) {
            e.errors.forEach(error => response.appendError(error.path));
        }
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", requireLogin_1.default, disallowGuests_1.default, async ({ user, params }, res, next) => {
    let response = new utils_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        let deletedUser = await UserDataSource.delete(params.id);
        deleteReplacedFiles_1.addReplacedFiles(res, {
            url: deletedUser.userImageSrc,
            model: models_1.default.User,
            field: "userImageSrc"
        });
        response.setCode(200);
        response.setSuccess(true);
        response.setMessage(`User with ID ${params.id} has been deleted.`);
    }
    catch (e) {
        if (e instanceof exceptions_1.InvalidPermissionException) {
            response.setMessage(e.message);
            response.setCode(422);
            res.status(422);
        }
        else {
            response.setCode(403);
            res.status(403);
        }
        if (e.errors && e.errors.length > 0) {
            e.errors.forEach(error => response.appendError(error.path));
        }
    }
    res.json(response);
    next();
}, deleteReplacedFiles_1.deleteReplacedFiles);
exports.default = router;


/***/ }),

/***/ "./src/server/routes/vehicleIssues.ts":
/*!********************************************!*\
  !*** ./src/server/routes/vehicleIssues.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const models_1 = __importDefault(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const utils_1 = __webpack_require__(/*! ../utils/ */ "./src/server/utils/index.ts");
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const router = express_1.default.Router();
router.get("/", requireLogin_1.default, async (req, res) => {
    let response = new utils_1.ResponseBuilder();
    const categories = await models_1.default.VehicleIssue.findAll();
    response.setData(categories);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.post("/", requireLogin_1.default, async ({ body }, res) => {
    let response = new utils_1.ResponseBuilder();
    const created = await models_1.default.VehicleIssue.create({
        message: body.message,
        vehicleId: body.vehicleId
    });
    response.setData(created);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.patch("/:id", requireLogin_1.default, async ({ params, body }, res) => {
    let response = new utils_1.ResponseBuilder();
    const found = await models_1.default.VehicleIssue.findByPk(params.id);
    found && found.update({ message: body.message });
    response.setData(found);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.delete("/:id", requireLogin_1.default, async ({ params }, res) => {
    let response = new utils_1.ResponseBuilder();
    const found = await models_1.default.VehicleIssue.findByPk(params.id);
    found && (await found.destroy());
    response.setData(found);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/vehicles.ts":
/*!***************************************!*\
  !*** ./src/server/routes/vehicles.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const node_wialon_1 = __webpack_require__(/*! node-wialon */ "node-wialon");
const requireLogin_1 = __importDefault(__webpack_require__(/*! ../middlewares/requireLogin */ "./src/server/middlewares/requireLogin.ts"));
const deleteReplacedFiles_1 = __webpack_require__(/*! ../middlewares/deleteReplacedFiles */ "./src/server/middlewares/deleteReplacedFiles.ts");
const disallowGuests_1 = __importDefault(__webpack_require__(/*! ../middlewares/disallowGuests */ "./src/server/middlewares/disallowGuests.ts"));
const parseBody_1 = __importDefault(__webpack_require__(/*! ../middlewares/parseBody */ "./src/server/middlewares/parseBody.ts"));
const multerUpload_1 = __importDefault(__webpack_require__(/*! ../middlewares/multerUpload */ "./src/server/middlewares/multerUpload.ts"));
const deleteFileOnError_1 = __importDefault(__webpack_require__(/*! ../middlewares/deleteFileOnError */ "./src/server/middlewares/deleteFileOnError.ts"));
const models_1 = __importStar(__webpack_require__(/*! ../models */ "./src/server/models/index.ts"));
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const api_1 = __webpack_require__(/*! ../api */ "./src/server/api/index.ts");
const datasource_1 = __webpack_require__(/*! ../datasource */ "./src/server/datasource/index.ts"); // Deprecate
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user, query }, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        let vehicles = [];
        const from = query.from && Number(query.from);
        const to = query.to && Number(query.to);
        if (from && to) {
            vehicles = (await api_1.Vehicle.getAll(user, {
                from: moment_1.default(from, "X").toDate(),
                to: moment_1.default(to, "X").toDate()
            })).cast(user);
        }
        else {
            vehicles = (await api_1.Vehicle.getAll(user)).cast(user);
        }
        response.setData(vehicles);
        response.handleSuccess(`Found ${vehicles.length} vehicles.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/vehicles").single("vehicleImageSrc"), parseBody_1.default, disallowGuests_1.default, async ({ user, body, file }, res, next) => {
    const fileLocation = file &&
        file.filename &&
        utils_1.getFileURL("carbooking/media/vehicles", file.filename);
    let response = new utils_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        let createdVehicle = await VehicleDataSource.create({
            ...body,
            vehicleImageSrc: fileLocation
        });
        if (body.categories) {
            let categories = await models_1.default.Category.findAll({
                where: { id: body.categories }
            });
            await createdVehicle.setCategories(categories);
        }
        response.setData({
            ...createdVehicle.get({ plain: true }),
            categories: await createdVehicle.getCategories().map(c => c.id)
        });
        response.handleSuccess("Vehicle has been created.", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default);
router.get("/:id", async ({ user, params }, res) => {
    let response = new utils_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        const foundVehicle = await VehicleDataSource.get(params.id);
        const foundVehiclePlain = {
            ...foundVehicle.get({ plain: true }),
            position: null,
            mileage: null,
            categories: (await foundVehicle.getCategories()).map(c => c.id)
        };
        if (foundVehicle.wialonUnitId) {
            try {
                let w = await node_wialon_1.Wialon.login({
                    token: process.env.WIALON_TOKEN
                });
                const unit = await w.Core.searchItem({
                    id: foundVehiclePlain.wialonUnitId,
                    flags: 1024 + 8192
                });
                const lng = unit.item.pos.x;
                const lat = unit.item.pos.y;
                const mileage = unit.item.cnm;
                foundVehiclePlain.position = lat && lng ? { lat, lng } : null;
                foundVehiclePlain.mileage = mileage || null;
            }
            catch (e) {
                console.error(e);
            }
        }
        response.setData(foundVehiclePlain);
        response.handleSuccess(`Vehicle with ID ${params.id} found.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", multerUpload_1.default("carbooking/media/vehicles").single("vehicleImageSrc"), parseBody_1.default, disallowGuests_1.default, async (req, res, next) => {
    const { user, params, body, file } = req;
    const fileLocation = file &&
        file.filename &&
        utils_1.getFileURL("carbooking/media/vehicles", file.filename);
    let response = new utils_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        let updatedVehicle = await VehicleDataSource.update(params.id, {
            ...body,
            vehicleImageSrc: fileLocation
        });
        fileLocation &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: updatedVehicle.vehicleImageSrc,
                model: models_1.default.Vehicle,
                field: "vehicleImageSrc"
            });
        if (body.categories) {
            let categories = await models_1.default.Category.findAll({
                where: { id: body.categories }
            });
            await updatedVehicle.setCategories(categories);
        }
        response.setData({
            ...updatedVehicle.get({ plain: true }),
            categories: (await updatedVehicle.getCategories()).map(c => c.id)
        });
        response.handleSuccess(`Vehicle with ID ${params.id} updated.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", disallowGuests_1.default, async ({ user, params }, res, next) => {
    let response = new utils_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        const deletedVehicle = await VehicleDataSource.delete(params.id);
        deleteReplacedFiles_1.addReplacedFiles(res, {
            url: deletedVehicle.vehicleImageSrc,
            model: models_1.default.Vehicle,
            field: "vehicleImageSrc"
        });
        response.setData(deletedVehicle.get({ plain: true }));
        response.handleSuccess(`Vehicle with ID ${params.id} has been deleted.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteReplacedFiles_1.deleteReplacedFiles);
router.get("/:id/location", async ({ user, params }, res) => {
    // TODO: Abstraction of API
    const response = new utils_1.ResponseBuilder();
    const vehicle = await models_1.Vehicle.findByPk(params.id, {
        include: [models_1.Location]
    });
    if (!vehicle) {
        res.status(404);
        response.setCode(404);
        response.setMessage(`Vehicle with id ${params.id} not found.`);
    }
    else {
        if (user.role === typings_1.Role.MASTER || vehicle.clientId === user.clientId) {
            response.setData(vehicle.location || null);
            response.handleSuccess("Location found.", res);
        }
        else {
            res.status(401);
            response.setCode(401);
            response.setMessage(`You cannot access this vehicle.`);
        }
    }
    res.json(response.toObject());
});
exports.default = router;


/***/ }),

/***/ "./src/server/routes/wialon.ts":
/*!*************************************!*\
  !*** ./src/server/routes/wialon.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const node_wialon_1 = __webpack_require__(/*! node-wialon */ "node-wialon");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const exceptions_1 = __webpack_require__(/*! ../api/exceptions */ "./src/server/api/exceptions/index.ts");
const router = express_1.default.Router();
router.get("/units", async (req, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        const w = await node_wialon_1.Wialon.login({ token: process.env.WIALON_TOKEN });
        const units = await w.Utils.getUnits({ flags: 1025 });
        response.handleSuccess(`Found ${units.items.length} units.`, res);
        response.setData(units.items);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.get("/units/:id", async (req, res) => {
    const response = new utils_1.ResponseBuilder();
    try {
        const w = await node_wialon_1.Wialon.login({ token: process.env.WIALON_TOKEN });
        const units = await w.Utils.getUnits({ flags: 1025 });
        const unit = units.items.find(unit => unit.id === req.query.id);
        if (unit) {
            response.handleSuccess(`Found ${units.items.length} units.`, res);
            response.setData(units.items);
        }
        else {
            response.setCode(404);
            throw new exceptions_1.ItemNotFoundException(`Unit with ID ${req.query.id} is not found.`);
        }
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
exports.default = router;


/***/ }),

/***/ "./src/server/utils/ResponseBuilder.ts":
/*!*********************************************!*\
  !*** ./src/server/utils/ResponseBuilder.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __webpack_require__(/*! ./exceptions */ "./src/server/utils/exceptions/index.ts");
const exceptions_2 = __webpack_require__(/*! ../api/exceptions */ "./src/server/api/exceptions/index.ts");
class ResponseBuilder {
    constructor(data = null, success = false, message = "Unknown server error.", errors = [], code = 500) {
        this.data = data;
        this.success = success;
        this.message = message;
        this.errors = errors;
        this.code = code;
    }
    setData(data) {
        this.data = data;
    }
    setSuccess(success) {
        this.success = success;
    }
    appendError(error) {
        this.errors.push(error);
    }
    setCode(code) {
        this.code = code;
    }
    setMessage(message) {
        this.message = message;
    }
    handleError(e, res) {
        console.log(e);
        if (e instanceof exceptions_1.InvalidPermissionException) {
            this.setCode(422);
            res.status(422);
        }
        else if (e instanceof exceptions_1.ResourceNotFoundException ||
            e instanceof exceptions_2.ItemNotFoundException) {
            this.setCode(404);
            res.status(404);
        }
        else if (e instanceof exceptions_2.FormException) {
            e.fields.forEach(error => this.appendError(error));
            res.status(403);
        }
        else {
            res.status(500);
        }
        this.setMessage(e.message);
    }
    handleSuccess(message, res) {
        this.setMessage(message);
        this.setCode(200);
        this.setSuccess(true);
        res.status(200);
    }
    toObject() {
        const { message, code, errors, success, data } = this;
        return { message, code, errors, success, data };
    }
}
exports.default = ResponseBuilder;


/***/ }),

/***/ "./src/server/utils/RoleUtils.ts":
/*!***************************************!*\
  !*** ./src/server/utils/RoleUtils.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
class RoleUtils {
}
exports.RoleUtils = RoleUtils;
/**
 * Lower index, higher permissions.
 */
RoleUtils.roleRanks = [typings_1.Role.MASTER, typings_1.Role.ADMIN, typings_1.Role.KEY_MANAGER, typings_1.Role.GUEST];
/**
 * @param requiredRole The role required to be higher or equal to.
 * @param role The role to be compared.
 */
RoleUtils.isRoleBetter = (requiredRole, role) => {
    const requiredRoleIndex = RoleUtils.roleRanks.findIndex(value => value === requiredRole);
    const roleIndex = RoleUtils.roleRanks.findIndex(value => value === role);
    if (requiredRoleIndex >= 0 && roleIndex >= 0) {
        return roleIndex <= requiredRoleIndex;
    }
    return false;
};


/***/ }),

/***/ "./src/server/utils/exceptions/InvalidInputException.ts":
/*!**************************************************************!*\
  !*** ./src/server/utils/exceptions/InvalidInputException.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class InvalidInputException extends Error {
    constructor(message, fields = []) {
        super(message);
        this.fields = fields;
    }
}
exports.default = InvalidInputException;


/***/ }),

/***/ "./src/server/utils/exceptions/InvalidPermissionException.ts":
/*!*******************************************************************!*\
  !*** ./src/server/utils/exceptions/InvalidPermissionException.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPermissionException extends Error {
    constructor(message = "You do not have the permission to access this resource.") {
        super(message);
    }
}
exports.default = InvalidPermissionException;


/***/ }),

/***/ "./src/server/utils/exceptions/ResourceNotFoundException.ts":
/*!******************************************************************!*\
  !*** ./src/server/utils/exceptions/ResourceNotFoundException.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPermissionException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.default = InvalidPermissionException;


/***/ }),

/***/ "./src/server/utils/exceptions/index.ts":
/*!**********************************************!*\
  !*** ./src/server/utils/exceptions/index.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InvalidPermissionException_1 = __webpack_require__(/*! ./InvalidPermissionException */ "./src/server/utils/exceptions/InvalidPermissionException.ts");
exports.InvalidPermissionException = InvalidPermissionException_1.default;
var ResourceNotFoundException_1 = __webpack_require__(/*! ./ResourceNotFoundException */ "./src/server/utils/exceptions/ResourceNotFoundException.ts");
exports.ResourceNotFoundException = ResourceNotFoundException_1.default;
var InvalidInputException_1 = __webpack_require__(/*! ./InvalidInputException */ "./src/server/utils/exceptions/InvalidInputException.ts");
exports.InvalidInputException = InvalidInputException_1.default;


/***/ }),

/***/ "./src/server/utils/index.ts":
/*!***********************************!*\
  !*** ./src/server/utils/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(__webpack_require__(/*! moment-timezone */ "moment-timezone"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
const url_1 = __webpack_require__(/*! url */ "url");
const typings_1 = __webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts");
var ResponseBuilder_1 = __webpack_require__(/*! ./ResponseBuilder */ "./src/server/utils/ResponseBuilder.ts");
exports.ResponseBuilder = ResponseBuilder_1.default;
exports.pickAndMerge = (obj1, obj2, fields = []) => {
    return { ...obj1, ...lodash_1.default.pick(obj2, fields) };
};
exports.getArray = (array) => {
    return array instanceof Array ? array : [];
};
exports.pickFields = (target, fields) => {
    const result = {};
    for (let key in target) {
        if (fields.indexOf(key) >= 0)
            result[key] = target[key];
    }
    return result;
};
exports.exceptFields = (target, fields) => {
    let result = {};
    for (let key in target) {
        if (fields.indexOf(key) < 0)
            result[key] = target[key];
    }
    return result;
};
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
exports.convertDatesToUnix = (object) => {
    const clone = lodash_1.default.cloneDeep(object);
    for (const [key, value] of Object.entries(clone)) {
        if (value instanceof Date) {
            clone[key] = moment_timezone_1.default(value).unix();
        }
        else if (typeof value === "object") {
            exports.convertDatesToUnix(value);
        }
    }
    return clone;
};
exports.getBookingStatus = (booking) => {
    let status = typings_1.BookingStatus.UNKNOWN;
    let currentTime = moment_timezone_1.default();
    let hasPassedFrom = moment_timezone_1.default(booking.from, "X").isSameOrBefore(currentTime);
    let hasPassedTo = moment_timezone_1.default(booking.to, "X").isSameOrBefore(currentTime);
    if (booking.approved) {
        if (hasPassedFrom && !hasPassedTo)
            status = typings_1.BookingStatus.ONGOING;
        else if (hasPassedTo)
            status = typings_1.BookingStatus.FINISHED;
        else
            status = typings_1.BookingStatus.APPROVED;
    }
    else {
        if (booking.approved === null) {
            if (hasPassedFrom)
                status = typings_1.BookingStatus.EXPIRED;
            else
                status = typings_1.BookingStatus.PENDING;
        }
        else if (booking.approved === false)
            status = typings_1.BookingStatus.DENIED;
    }
    return status;
};
exports.hasActiveBooking = (bookings, bookingId) => {
    let active = false;
    if (bookings) {
        for (const booking of bookings) {
            let status = exports.getBookingStatus(booking);
            if (status === typings_1.BookingStatus.PENDING ||
                status === typings_1.BookingStatus.ONGOING ||
                status === typings_1.BookingStatus.APPROVED) {
                if (!bookingId || bookingId !== booking.id)
                    return true;
            }
        }
    }
    return active;
};
exports.isBookingTimeSlotTaken = (bookings, from, to, bookingId) => {
    let taken = false;
    for (const booking of bookings) {
        taken = exports.rangeOverlap(from, to, booking.from, booking.to);
        if ((taken && !bookingId) || bookingId !== booking.id) {
            return taken;
        }
    }
    return taken;
};
exports.rangeOverlap = (x1, x2, y1, y2) => {
    return Math.max(x1, y1) <= Math.min(x2, y2);
};
__export(__webpack_require__(/*! ./RoleUtils */ "./src/server/utils/RoleUtils.ts"));


/***/ }),

/***/ "./src/server/utils/mail/index.ts":
/*!****************************************!*\
  !*** ./src/server/utils/mail/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const handlebars_1 = __webpack_require__(/*! handlebars */ "handlebars");
const mjml_1 = __importDefault(__webpack_require__(/*! mjml */ "mjml"));
const nodemailer_1 = __importDefault(__webpack_require__(/*! nodemailer */ "nodemailer"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const moment_timezone_1 = __importDefault(__webpack_require__(/*! moment-timezone */ "moment-timezone"));
const staticmaps_1 = __importDefault(__webpack_require__(/*! staticmaps */ "staticmaps"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/server/config/index.ts"));
const __1 = __webpack_require__(/*! .. */ "./src/server/utils/index.ts");
const { mail, secretKey } = config_1.default;
const getTemplate = (fileName) => fs_1.default.readFileSync(path_1.default.resolve(`${__dirname}/templates/${fileName}.mjml`), "utf8");
const getTransport = () => nodemailer_1.default.createTransport({
    auth: mail.auth,
    port: Number(mail.port),
    secure: mail.secure,
    host: mail.host
});
const compileTemplate = (mjml, context) => handlebars_1.compile(mjml)(context);
const getDateStringFromUserTimezone = (timestamp, timeZone) => {
    return moment_timezone_1.default(timestamp, "X")
        .tz(timeZone)
        .format("LLL");
};
exports.sendPasswordResetToken = ({ email, url }) => {
    // Send email invite
    let token = jsonwebtoken_1.default.sign({ email, passwordReset: true }, secretKey, {
        expiresIn: "1h"
    });
    return getTransport().sendMail({
        from: "no-reply@atsuae.net",
        to: email,
        subject: "Password Reset",
        html: `<h1>Hello</h1><a href="${url}?token=${token}">Click here to reset password!</a>`
    });
};
exports.sendInvite = ({ email, clientId }) => {
    const transporter = getTransport();
    let token = jsonwebtoken_1.default.sign({ email, clientId }, secretKey, { expiresIn: "7d" });
    const compiled = compileTemplate(getTemplate("invite"), {
        company: "LeasePlan",
        contactEmail: "support@atsuae.net",
        logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
        signUpLink: `${process.env.CLIENT_URL}/signup?token=${token}`
    });
    const template = mjml_1.default(compiled);
    const mainOptions = {
        from: "LeasePlan Rentals <no-reply@atsuae.net>",
        to: email,
        subject: "You are invited to LeasePlan Car Booking!",
        html: template.html
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                reject(err);
            }
            else {
                resolve(info.response);
            }
        });
    });
};
exports.sendInvoice = ({ email, amount, customerName, vehicleName, from, to, bookingId, timeZone }) => {
    const transporter = getTransport();
    const compiled = compileTemplate(getTemplate("invoice"), {
        company: "LeasePlan",
        customerName,
        vehicleName,
        from: getDateStringFromUserTimezone(from, timeZone),
        to: getDateStringFromUserTimezone(to, timeZone),
        contactEmail: "support@atsuae.net",
        logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
        amount,
        bookingId
    });
    const template = mjml_1.default(compiled);
    const mainOptions = {
        from: "LeasePlan Rentals <no-reply@atsuae.net>",
        to: email,
        subject: "Your car booking receipt is here!",
        html: template.html
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                reject(err);
            }
            else {
                resolve(info.response);
            }
        });
    });
};
exports.sendBookingNotification = async ({ email, customerEmail, customerName, mobile, bookingId, from, to, vehicleId, vehicle, plateNumber, location, lat, lng, company, timeZone }) => {
    const transporter = getTransport();
    const map = new staticmaps_1.default({
        width: 1200,
        height: 800,
        tileUrl: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en"
    });
    map.addMarker({
        img: path_1.default.join(__dirname, "../../public/images/LocationMarker.png"),
        coord: [lng, lat],
        offsetX: 50,
        offsetY: 100,
        width: 100,
        height: 100
    });
    await map.render([lng, lat], 10);
    const filePath = path_1.default.join(__1.getStaticFilesPath(), "/maps");
    const fileName = `${Date.now()}.png`;
    const fileSavePath = path_1.default.join(filePath, fileName);
    await __1.makeDirectoryIfNotExist(filePath);
    await map.image.save(fileSavePath);
    const compiled = compileTemplate(getTemplate("bookingNotification"), {
        customerEmail,
        customerName,
        mobile,
        bookingId,
        from: getDateStringFromUserTimezone(from, timeZone),
        to: getDateStringFromUserTimezone(to, timeZone),
        vehicleId,
        vehicle,
        plateNumber,
        location,
        lat,
        lng,
        company,
        mapURL: `cid:${fileName}`,
        logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`
    });
    const template = mjml_1.default(compiled);
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: "LeasePlan Rentals <no-reply@atsuae.net>",
            to: email,
            subject: `Booking request on ${vehicle}`,
            html: template.html,
            attachments: [
                {
                    filename: "Map Location.png",
                    path: fileSavePath,
                    cid: fileName
                }
            ]
        }, function (err, info) {
            fs_1.default.promises.unlink(fileSavePath);
            if (err) {
                return reject(err);
            }
            else {
                return resolve(info.response);
            }
        });
    });
};
exports.sendBookingConfirmation = async ({ email, customerName, vehicleName, from, to, bookingId, parkingLocation, lat, lng, address, timeZone }) => {
    const transporter = getTransport();
    const map = new staticmaps_1.default({
        width: 1200,
        height: 800,
        tileUrl: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en"
    });
    map.addMarker({
        img: path_1.default.join(__dirname, "../../public/images/LocationMarker.png"),
        coord: [lng, lat],
        offsetX: 50,
        offsetY: 100,
        width: 100,
        height: 100
    });
    await map.render([lng, lat], 10);
    const filePath = path_1.default.join(__1.getStaticFilesPath(), "/maps");
    const fileName = `${Date.now()}.png`;
    const fileSavePath = path_1.default.join(filePath, fileName);
    await __1.makeDirectoryIfNotExist(filePath);
    await map.image.save(fileSavePath);
    const compiled = compileTemplate(getTemplate("confirmBooking"), {
        company: "LeasePlan",
        contactEmail: "support@atsuae.net",
        logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
        bookingId,
        from: getDateStringFromUserTimezone(from, timeZone),
        to: getDateStringFromUserTimezone(to, timeZone),
        vehicleName,
        customerName,
        mapURL: `cid:${fileName}`,
        lat,
        lng,
        parkingLocation,
        address
    });
    const template = mjml_1.default(compiled);
    const mainOptions = {
        from: "LeasePlan Rentals <no-reply@atsuae.net>",
        to: email,
        subject: "Your booking has been confirmed!",
        html: template.html,
        attachments: [
            {
                filename: "Map Location.png",
                path: fileSavePath,
                cid: fileName
            }
        ]
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mainOptions, function (err, info) {
            fs_1.default.promises.unlink(fileSavePath);
            if (err) {
                return reject(err);
            }
            else {
                return resolve(info.response);
            }
        });
    });
};

/* WEBPACK VAR INJECTION */}.call(this, "src\\server\\utils\\mail"))

/***/ }),

/***/ "./src/server/utils/rbac.ts":
/*!**********************************!*\
  !*** ./src/server/utils/rbac.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rbac_1 = __importStar(__webpack_require__(/*! ../rbac */ "./src/server/rbac/index.ts"));
const enums = __importStar(__webpack_require__(/*! ../../shared/typings */ "./src/shared/typings/index.ts"));
const { READ, UPDATE, DELETE, CREATE } = enums.Operation;
const accessControl = new rbac_1.default("Car Booking");
const masterRole = new rbac_1.Role(enums.Role.MASTER);
const adminRole = new rbac_1.Role(enums.Role.ADMIN);
const keyManagerRole = new rbac_1.Role(enums.Role.KEY_MANAGER);
const guestRole = new rbac_1.Role(enums.Role.GUEST);
const vehicles = new rbac_1.Resource(enums.Resource.VEHICLES);
const locations = new rbac_1.Resource(enums.Resource.LOCATIONS);
const bookings = new rbac_1.Resource(enums.Resource.BOOKINGS);
const users = new rbac_1.Resource(enums.Resource.USERS);
const accidents = new rbac_1.Resource(enums.Resource.ACCIDENTS);
const categories = new rbac_1.Resource(enums.Resource.CATEGORIES);
const clients = new rbac_1.Resource(enums.Resource.CLIENTS);
////////////////////////
// GUESTS ROLE CONFIG //
////////////////////////
////////////
// CREATE //
////////////
guestRole.addPermission(new rbac_1.Action(CREATE, bookings, ({ accessor, body }) => {
    try {
        if (accessor.id !== undefined && accessor.id === body.userId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}, ["userId", "paid", "clientId"]));
guestRole.addPermission(new rbac_1.Action(CREATE, accidents, ({ accessor, body }) => {
    try {
        if (accessor.id !== undefined && accessor.id === body.userId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}, ["userId", "bookingId", "clientId"]));
////////////
//  READ  //
////////////
guestRole.addPermission(new rbac_1.Action(READ, bookings, ({ accessor, target }) => {
    try {
        if (accessor.id && accessor.id === target.userId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
guestRole.addPermission(new rbac_1.Action(READ, vehicles, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}, ["bookingChargeUnitId", "bookingChargeCount", "bookingCharge"]));
guestRole.addPermission(new rbac_1.Action(READ, locations, ({ accessor, target }) => {
    try {
        if (accessor.clientId &&
            target.clients.find(client => client.id === accessor.clientId)) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}, ["clientId"]));
guestRole.addPermission(new rbac_1.Action(READ, categories, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}, ["clientId"]));
////////////
// UPDATE //
////////////
guestRole.addPermission(new rbac_1.Action(UPDATE, bookings, ({ accessor, target }) => {
    try {
        if (accessor.id === target.userId && target.approved === false) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
////////////
// DELETE //
////////////
guestRole.addPermission(new rbac_1.Action(DELETE, bookings, ({ accessor, target }) => {
    try {
        if (accessor.id === target.userId && target.approved === false) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
/////////////////////////////
// KEY_MANAGER ROLE CONFIG //
/////////////////////////////
////////////
//  READ  //
////////////
keyManagerRole.addPermission(new rbac_1.Action(READ, bookings, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.user.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
keyManagerRole.addPermission(new rbac_1.Action(READ, users, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
keyManagerRole.addPermission(new rbac_1.Action(READ, vehicles, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
keyManagerRole.addPermission(new rbac_1.Action(READ, accidents, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
keyManagerRole.addPermission(new rbac_1.Action(READ, locations, ({ accessor, target }) => {
    try {
        if (accessor.clientId &&
            target.clients.find(client => client.id === accessor.clientId)) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
keyManagerRole.addPermission(new rbac_1.Action(READ, categories, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
////////////
// UPDATE //
////////////
keyManagerRole.addPermission(new rbac_1.Action(UPDATE, vehicles, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}, ["categories", "objectId", "plateNumber", "vin", "wialonUnitId"]));
keyManagerRole.addPermission(new rbac_1.Action(UPDATE, bookings, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.user.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
keyManagerRole.addPermission(new rbac_1.Action(UPDATE, accidents, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
////////////
// DELETE //
////////////
keyManagerRole.addPermission(new rbac_1.Action(DELETE, accidents, ({ accessor, target }) => {
    try {
        if (accessor.clientId &&
            accessor.clientId === target.clientId &&
            target.approved === false) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
///////////////////////
// ADMIN ROLE CONFIG //
///////////////////////
////////////
// CREATE //
////////////
adminRole.addPermission(new rbac_1.Action(CREATE, users, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(CREATE, categories, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
////////////
//  READ  //
////////////
adminRole.addPermission(new rbac_1.Action(READ, bookings, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.user.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(UPDATE, bookings, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.user.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(READ, locations, ({ accessor, target }) => {
    try {
        if (accessor.clientId &&
            target.clients.find(client => client.id === accessor.clientId)) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(READ, users, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(READ, vehicles, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(READ, accidents, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(READ, categories, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
////////////
// UPDATE //
////////////
adminRole.addPermission(new rbac_1.Action(UPDATE, users, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(UPDATE, vehicles, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}, ["objectId", "plateNumber", "vin", "wialonUnitId"]));
adminRole.addPermission(new rbac_1.Action(UPDATE, accidents, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(UPDATE, categories, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
////////////
//  DELETE  //
////////////
adminRole.addPermission(new rbac_1.Action(DELETE, categories, ({ accessor, target }) => {
    try {
        if (accessor.clientId && accessor.clientId === target.clientId) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
adminRole.addPermission(new rbac_1.Action(DELETE, bookings, ({ accessor, target }) => {
    try {
        if (accessor.clientId &&
            accessor.clientId === target.user.clientId &&
            target.approved === false) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
////////////////////////
// MASTER ROLE CONFIG //
////////////////////////
masterRole.addPermission(new rbac_1.Action(CREATE, users));
masterRole.addPermission(new rbac_1.Action(CREATE, vehicles));
masterRole.addPermission(new rbac_1.Action(CREATE, clients));
masterRole.addPermission(new rbac_1.Action(CREATE, locations));
masterRole.addPermission(new rbac_1.Action(CREATE, categories));
masterRole.addPermission(new rbac_1.Action(READ, users));
masterRole.addPermission(new rbac_1.Action(READ, vehicles));
masterRole.addPermission(new rbac_1.Action(READ, bookings));
masterRole.addPermission(new rbac_1.Action(READ, clients));
masterRole.addPermission(new rbac_1.Action(READ, accidents));
masterRole.addPermission(new rbac_1.Action(READ, locations));
masterRole.addPermission(new rbac_1.Action(READ, categories));
masterRole.addPermission(new rbac_1.Action(UPDATE, users));
masterRole.addPermission(new rbac_1.Action(UPDATE, vehicles));
masterRole.addPermission(new rbac_1.Action(UPDATE, bookings));
masterRole.addPermission(new rbac_1.Action(UPDATE, clients));
masterRole.addPermission(new rbac_1.Action(UPDATE, accidents));
masterRole.addPermission(new rbac_1.Action(UPDATE, locations));
masterRole.addPermission(new rbac_1.Action(UPDATE, categories));
masterRole.addPermission(new rbac_1.Action(DELETE, users));
masterRole.addPermission(new rbac_1.Action(DELETE, vehicles));
masterRole.addPermission(new rbac_1.Action(DELETE, bookings, ({ accessor, target }) => {
    try {
        if (target.approved === false) {
            return true;
        }
        return false;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}));
masterRole.addPermission(new rbac_1.Action(DELETE, clients));
masterRole.addPermission(new rbac_1.Action(DELETE, accidents));
masterRole.addPermission(new rbac_1.Action(DELETE, locations));
masterRole.addPermission(new rbac_1.Action(DELETE, categories));
accessControl.addRole(masterRole);
accessControl.addRole(adminRole);
accessControl.addRole(keyManagerRole);
accessControl.addRole(guestRole);
exports.default = accessControl;
exports.roles = {
    admin: adminRole,
    keyManager: keyManagerRole,
    guest: guestRole,
    master: masterRole
};
exports.resources = {
    bookings,
    vehicles,
    locations,
    users,
    accidents,
    categories,
    clients
};


/***/ }),

/***/ "./src/shared/typings/enums/BookingChargeUnit.ts":
/*!*******************************************************!*\
  !*** ./src/shared/typings/enums/BookingChargeUnit.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BookingChargeUnit;
(function (BookingChargeUnit) {
    BookingChargeUnit["KILOMETER"] = "Km";
    BookingChargeUnit["SECOND"] = "Second";
    BookingChargeUnit["HOUR"] = "Hour";
    BookingChargeUnit["DAY"] = "Day";
    BookingChargeUnit["WEEK"] = "Week";
    BookingChargeUnit["MONTH"] = "Month";
})(BookingChargeUnit = exports.BookingChargeUnit || (exports.BookingChargeUnit = {}));


/***/ }),

/***/ "./src/shared/typings/enums/BookingStatus.ts":
/*!***************************************************!*\
  !*** ./src/shared/typings/enums/BookingStatus.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["UNKNOWN"] = "UNKNOWN";
    BookingStatus["ONGOING"] = "ONGOING";
    BookingStatus["FINISHED"] = "FINISHED";
    BookingStatus["APPROVED"] = "APPROVED";
    BookingStatus["EXPIRED"] = "EXPIRED";
    BookingStatus["DENIED"] = "DENIED";
    BookingStatus["PENDING"] = "PENDING";
})(BookingStatus = exports.BookingStatus || (exports.BookingStatus = {}));


/***/ }),

/***/ "./src/shared/typings/enums/BookingType.ts":
/*!*************************************************!*\
  !*** ./src/shared/typings/enums/BookingType.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BookingType;
(function (BookingType) {
    BookingType["PRIVATE"] = "PRIVATE";
    BookingType["BUSINESS"] = "BUSINESS";
    BookingType["SERVICE"] = "SERVICE";
    BookingType["REPLACEMENT"] = "REPLACEMENT";
})(BookingType = exports.BookingType || (exports.BookingType = {}));


/***/ }),

/***/ "./src/shared/typings/enums/Role.ts":
/*!******************************************!*\
  !*** ./src/shared/typings/enums/Role.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Role;
(function (Role) {
    Role["MASTER"] = "MASTER";
    Role["ADMIN"] = "ADMIN";
    Role["KEY_MANAGER"] = "KEY_MANAGER";
    Role["GUEST"] = "GUEST";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./src/shared/typings/enums/index.ts":
/*!*******************************************!*\
  !*** ./src/shared/typings/enums/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./BookingChargeUnit */ "./src/shared/typings/enums/BookingChargeUnit.ts"));
__export(__webpack_require__(/*! ./BookingStatus */ "./src/shared/typings/enums/BookingStatus.ts"));
__export(__webpack_require__(/*! ./BookingType */ "./src/shared/typings/enums/BookingType.ts"));
__export(__webpack_require__(/*! ./Role */ "./src/shared/typings/enums/Role.ts"));


/***/ }),

/***/ "./src/shared/typings/index.ts":
/*!*************************************!*\
  !*** ./src/shared/typings/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./enums */ "./src/shared/typings/enums/index.ts"));
// TODO remove RBAC
var Operation;
(function (Operation) {
    Operation["READ"] = "READ";
    Operation["UPDATE"] = "UPDATE";
    Operation["DELETE"] = "DELETE";
    Operation["CREATE"] = "CREATE";
})(Operation = exports.Operation || (exports.Operation = {}));
var Resource;
(function (Resource) {
    Resource["BOOKINGS"] = "BOOKINGS";
    Resource["LOCATIONS"] = "LOCATIONS";
    Resource["VEHICLES"] = "VEHICLES";
    Resource["USERS"] = "USERS";
    Resource["ENUMS"] = "ENUMS";
    Resource["INVITES"] = "INVITES";
    Resource["ACCIDENTS"] = "ACCIDENTS";
    Resource["CLIENTS"] = "CLIENTS";
    Resource["CATEGORIES"] = "CATEGORIES";
})(Resource = exports.Resource || (exports.Resource = {}));


/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mjml":
/*!***********************!*\
  !*** external "mjml" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mjml");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "moment-timezone":
/*!**********************************!*\
  !*** external "moment-timezone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),

/***/ "node-wialon":
/*!******************************!*\
  !*** external "node-wialon" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-wialon");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "sequelize-typescript":
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize-typescript");

/***/ }),

/***/ "staticmaps":
/*!*****************************!*\
  !*** external "staticmaps" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("staticmaps");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "yup":
/*!**********************!*\
  !*** external "yup" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yup");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvQm9va2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9Db2xsZWN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL1ZlaGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9BcGlFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9EYXRhQmFzZUV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9leGNlcHRpb25zL0Zvcm1FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9JbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9leGNlcHRpb25zL1Jlc291cmNlTm90Rm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS91dGlscy9BcGlFcnJvckhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdXRpbHMvRm9ybUVycm9yQnVpbGRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS92YWxpZGF0b3JzL0Jvb2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdmFsaWRhdG9ycy9WZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL3ZhbGlkYXRvcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdmFsaWRhdG9ycy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbmZpZy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RhdGFzb3VyY2UvQWNjaWRlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL0Jvb2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL0NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RhdGFzb3VyY2UvRGF0YVNvdXJjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RhdGFzb3VyY2UvTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL1ZlaGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlcy9kaXNhbGxvd0d1ZXN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcGFyc2VCb2R5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcmVxdWlyZVJvbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQWNjaWRlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQWNjaWRlbnRVc2VyU3RhdHVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0Jvb2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQ2F0ZWdvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQ2xpZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NsaWVudExvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0xvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1JlcGxhY2VWZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvVXNlclZlaGljbGVDYXRlZ29yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9WZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1ZlaGljbGVDYXRlZ29yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9WZWhpY2xlSXNzdWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yYmFjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2FjY2lkZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9hdXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2Jvb2tpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2NhdGVnb3JpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvY2xpZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9pbnZpdGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2xvY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9yZXBvcnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL3VzZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL3ZlaGljbGVJc3N1ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvdmVoaWNsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvd2lhbG9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvUmVzcG9uc2VCdWlsZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvUm9sZVV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvZXhjZXB0aW9ucy9JbnZhbGlkSW5wdXRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci91dGlscy9leGNlcHRpb25zL0ludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvZXhjZXB0aW9ucy9SZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvZXhjZXB0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvbWFpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL3JiYWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC90eXBpbmdzL2VudW1zL0Jvb2tpbmdDaGFyZ2VVbml0LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwaW5ncy9lbnVtcy9Cb29raW5nU3RhdHVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwaW5ncy9lbnVtcy9Cb29raW5nVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGluZ3MvZW51bXMvUm9sZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGluZ3MvZW51bXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC90eXBpbmdzL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWptbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm11bHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtd2lhbG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZW1haWxlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdGF0aWNtYXBzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwieXVwXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDRFQUFxQztBQUNyQyxzRUFBK0I7QUFDL0IsOEVBQTRCO0FBRTVCLHFHQUE0RDtBQUM1RCxtR0FHOEI7QUFDOUIsc0ZBTW1CO0FBQ25CLHFHQUFxRDtBQUNyRCxxRUFBaUQ7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TSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFFdkQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwRCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksYUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN0RCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksYUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3hELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUV6RCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksYUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkQsVUFBVSxDQUFDLGFBQWEsQ0FDdkIsSUFBSSxhQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBTyxFQUFFLEVBQUU7SUFDMUQsSUFBSTtRQUNILElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7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QWU7SUFDZiwyQkFBZTtJQUNmLCtCQUFtQjtJQUNuQixtQ0FBdUI7SUFDdkIsK0JBQW1CO0lBQ25CLHFDQUF5QjtBQUMxQixDQUFDLEVBVlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFVbkI7Ozs7Ozs7Ozs7OztBQ3hCRCxxQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSxnQzs7Ozs7Ozs7Ozs7QUNBQSxnQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zZXJ2ZXIvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBXaWFsb24gfSBmcm9tIFwibm9kZS13aWFsb25cIjtcclxuaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuaW1wb3J0IHsgQm9va2luZyBhcyBCb29raW5nVmFsaWRhdG9ycyB9IGZyb20gXCIuL3ZhbGlkYXRvcnNcIjtcclxuaW1wb3J0IHtcclxuXHRCb29raW5nQXR0cmlidXRlcyxcclxuXHRSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMsUm9sZVxyXG59IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQge1xyXG5cdFVzZXIsXHJcblx0Qm9va2luZyBhcyBCb29raW5nTW9kZWwsXHJcblx0UmVwbGFjZVZlaGljbGUsXHJcblx0TG9jYXRpb24sXHJcblx0VmVoaWNsZVxyXG59IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgSXRlbU5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSBcIi4vZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBVc2VQYXJhbWV0ZXJzLCBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgQXBpRXJyb3JIYW5kbGVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgQ2FzdGFibGUsIENvbGxlY3Rpb24gfSBmcm9tIFwiLi9Db2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7XHJcblx0c2VuZEJvb2tpbmdOb3RpZmljYXRpb24sXHJcblx0c2VuZEludm9pY2UgYXMgc2VuZEludm9pY2VFbWFpbCxcclxuXHRzZW5kQm9va2luZ0NvbmZpcm1hdGlvbiBhcyBzZW5kQm9va2luZ0NvbmZpcm1hdGlvbkVtYWlsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEJvb2tpbmdDcmVhdGVPcHRpb25zID0gVXNlUGFyYW1ldGVyczxcclxuXHRCb29raW5nQXR0cmlidXRlcyxcclxuXHRcImZyb21cIiB8IFwidG9cIiB8IFwiYm9va2luZ1R5cGVcIixcclxuXHRcInVzZXJJZFwiIHwgXCJ2ZWhpY2xlSWRcIlxyXG4+ICYge1xyXG5cdHJlcGxhY2VWZWhpY2xlPzogVXNlUGFyYW1ldGVyczxcclxuXHRcdFJlcGxhY2VWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRcdFwidmluXCIgfCBcImJyYW5kXCIgfCBcIm1vZGVsXCIgfCBcInBsYXRlTnVtYmVyXCJcclxuXHQ+O1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQm9va2luZ1VwZGF0ZU9wdGlvbnMgPSBVc2VQYXJhbWV0ZXJzPFxyXG5cdEJvb2tpbmdBdHRyaWJ1dGVzLFxyXG5cdFwiaWRcIixcclxuXHR8IFwidXNlcklkXCJcclxuXHR8IFwicGFpZFwiXHJcblx0fCBcImFtb3VudFwiXHJcblx0fCBcImZyb21cIlxyXG5cdHwgXCJ0b1wiXHJcblx0fCBcImFwcHJvdmVkXCJcclxuXHR8IFwiZmluaXNoZWRcIlxyXG5cdHwgXCJzdGFydE1pbGVhZ2VcIlxyXG5cdHwgXCJlbmRNaWxlYWdlXCJcclxuXHR8IFwic3RhcnRGdWVsXCJcclxuXHR8IFwiZW5kRnVlbFwiXHJcblx0fCBcInZlaGljbGVJZFwiXHJcblx0fCBcImJvb2tpbmdUeXBlXCJcclxuPiAmIHtcclxuXHRyZXBsYWNlVmVoaWNsZT86IFVzZVBhcmFtZXRlcnM8XHJcblx0XHRSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMsXHJcblx0XHRcInZpblwiIHwgXCJicmFuZFwiIHwgXCJtb2RlbFwiIHwgXCJwbGF0ZU51bWJlclwiXHJcblx0PjtcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29raW5nIGltcGxlbWVudHMgQ2FzdGFibGU8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+IHtcclxuXHRwcml2YXRlIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhOiBCb29raW5nTW9kZWwpIHt9XHJcblxyXG5cdHB1YmxpYyBjYXN0ID0gKHVzZXI6IFVzZXIpID0+XHJcblx0XHRCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IodXNlciwgQVBJX09QRVJBVElPTi5SRUFEKS5jYXN0KHRoaXMuZGF0YSk7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0QWxsID0gYXN5bmMgKHVzZXI6IFVzZXIpID0+IHtcclxuXHRcdGxldCBib29raW5nczogQm9va2luZ01vZGVsW10gPSBbXTtcclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdC8vIEdldCBib29raW5ncyBvbiBzZWxmLlxyXG5cdFx0XHRib29raW5ncyA9IGF3YWl0IHVzZXIuJGdldChcImJvb2tpbmdzXCIsIHtcclxuXHRcdFx0XHRpbmNsdWRlOiBbVmVoaWNsZSwgUmVwbGFjZVZlaGljbGVdXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuQURNSU4gfHwgdXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSKSB7XHJcblx0XHRcdC8vIEdldCBib29raW5ncyBvbiBzZWxmIGNsaWVudC5cclxuXHRcdFx0Ym9va2luZ3MgPSBhd2FpdCBCb29raW5nTW9kZWwuZmluZEFsbCh7XHJcblx0XHRcdFx0aW5jbHVkZTogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtb2RlbDogVXNlcixcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRjbGllbnRJZDogdXNlci5jbGllbnRJZFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0VmVoaWNsZSxcclxuXHRcdFx0XHRcdFJlcGxhY2VWZWhpY2xlXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSBpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0XHQvLyBHZXQgYWxsIGJvb2tpbmdzLlxyXG5cdFx0XHRib29raW5ncyA9IGF3YWl0IEJvb2tpbmdNb2RlbC5maW5kQWxsKHtcclxuXHRcdFx0XHRpbmNsdWRlOiBbVmVoaWNsZSwgUmVwbGFjZVZlaGljbGVdXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ldyBDb2xsZWN0aW9uPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+LCBCb29raW5nPihcclxuXHRcdFx0Ym9va2luZ3MubWFwKGIgPT4gbmV3IEJvb2tpbmcoYikpXHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IEJvb2tpbmdDcmVhdGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCB2YWxpZGF0b3IgPSBCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLkNSRUFURVxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0Ly8gVmFsaWRhdGUgSlNPTiBzY2hlbWEuXHJcblx0XHRcdGF3YWl0IHZhbGlkYXRvci52YWxpZGF0ZShvcHRpb25zKTtcclxuXHRcdFx0Ly8gQ2FzdCB0aGUgSlNPTlxyXG5cdFx0XHRjb25zdCBib29raW5nT3B0aW9ucyA9IHZhbGlkYXRvci5jYXN0KG9wdGlvbnMpIGFzIFBhcnRpYWw8XHJcblx0XHRcdFx0Qm9va2luZ0NyZWF0ZU9wdGlvbnNcclxuXHRcdFx0PjtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSByZXBsYWNlZCB2ZWhpY2xlLlxyXG5cdFx0XHRjb25zdCByZXBsYWNlZFZlaGljbGUgPVxyXG5cdFx0XHRcdGJvb2tpbmdPcHRpb25zLnJlcGxhY2VWZWhpY2xlICYmXHJcblx0XHRcdFx0KGF3YWl0IFJlcGxhY2VWZWhpY2xlLmNyZWF0ZShib29raW5nT3B0aW9ucy5yZXBsYWNlVmVoaWNsZSkpO1xyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIGJvb2tpbmdcclxuXHRcdFx0Ly8gVE9ETzogSW5jbHVkZSBcInBhaWRcIiwgYW5kIFwiYW1vdW50XCIgaW4gc2NoZW1hLlxyXG5cdFx0XHRjb25zdCBjcmVhdGVkQm9va2luZyA9IGF3YWl0IEJvb2tpbmdNb2RlbC5jcmVhdGUoe1xyXG5cdFx0XHRcdHBhaWQ6IGZhbHNlLFxyXG5cdFx0XHRcdGFtb3VudDogbnVsbCxcclxuXHRcdFx0XHQuLi5ib29raW5nT3B0aW9ucyxcclxuXHRcdFx0XHRyZXBsYWNlVmVoaWNsZUlkOiByZXBsYWNlZFZlaGljbGU/LmlkIHx8IG51bGxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IEJvb2tpbmcoY3JlYXRlZEJvb2tpbmcpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRuZXcgQXBpRXJyb3JIYW5kbGVyKGUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0ID0gYXN5bmMgKHVzZXI6IFVzZXIsIGJvb2tpbmdJZDogbnVtYmVyKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nID0gYXdhaXQgQm9va2luZ01vZGVsLmZpbmRCeVBrKGJvb2tpbmdJZCwge1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYm9va2luZykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSXRlbU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBCb29raW5nIHdpdGggJHtib29raW5nSWR9IGRvZXMgbm90IGV4aXN0LmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdC8vIFJldHVybiBvbmx5IG93biBib29raW5ncy5cclxuXHRcdFx0aWYgKGJvb2tpbmcudXNlcklkID09PSB1c2VyLmlkKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBCb29raW5nKGJvb2tpbmcpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUiB8fCB1c2VyLnJvbGUgPT09IFJvbGUuQURNSU4pIHtcclxuXHRcdFx0aWYgKGJvb2tpbmcudXNlci5jbGllbnRJZCA9PT0gdXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQm9va2luZyhib29raW5nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSKSB7XHJcblx0XHRcdHJldHVybiBuZXcgQm9va2luZyhib29raW5nKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgdXBkYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IEJvb2tpbmdVcGRhdGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBib29raW5nID0gYXdhaXQgdGhpcy5kYXRhLnJlbG9hZCh7XHJcblx0XHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IFJlcGxhY2VWZWhpY2xlIH1dXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zdCB2YWxpZGF0b3IgPSBCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLlVQREFURSxcclxuXHRcdFx0XHRib29raW5nXHJcblx0XHRcdCk7XHJcblx0XHRcdC8vIFZhbGlkYXRlIEpTT04gc2NoZW1hLlxyXG5cdFx0XHRhd2FpdCB2YWxpZGF0b3IudmFsaWRhdGUob3B0aW9ucyk7XHJcblx0XHRcdC8vIENhc3QgdGhlIEpTT05cclxuXHRcdFx0Y29uc3QgYm9va2luZ09wdGlvbnMgPSB2YWxpZGF0b3IuY2FzdChvcHRpb25zKSBhcyBQYXJ0aWFsPFxyXG5cdFx0XHRcdEJvb2tpbmdVcGRhdGVPcHRpb25zXHJcblx0XHRcdD47XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgcmVwbGFjZWQgdmVoaWNsZS5cclxuXHRcdFx0Y29uc3QgcmVwbGFjZWRWZWhpY2xlID1cclxuXHRcdFx0XHRib29raW5nT3B0aW9ucy5yZXBsYWNlVmVoaWNsZSAmJlxyXG5cdFx0XHRcdChhd2FpdCBSZXBsYWNlVmVoaWNsZS5jcmVhdGUoYm9va2luZ09wdGlvbnMucmVwbGFjZVZlaGljbGUpKTtcclxuXHRcdFx0Ly8gRGVsZXRlIHJlcGxhY2VkIHZlaGljbGVcclxuXHRcdFx0aWYgKHJlcGxhY2VkVmVoaWNsZSAmJiBib29raW5nLnJlcGxhY2VWZWhpY2xlSWQpIHtcclxuXHRcdFx0XHRhd2FpdCBSZXBsYWNlVmVoaWNsZS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ3JlYXRlIGJvb2tpbmdcclxuXHJcblx0XHRcdGNvbnN0IHVwZGF0ZWRCb29raW5nID0gYXdhaXQgdGhpcy5kYXRhLnVwZGF0ZSh7XHJcblx0XHRcdFx0Li4uYm9va2luZ09wdGlvbnMsXHJcblx0XHRcdFx0cmVwbGFjZVZlaGljbGVJZDogcmVwbGFjZWRWZWhpY2xlPy5pZFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgQm9va2luZyh1cGRhdGVkQm9va2luZyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHRwdWJsaWMgZGVzdHJveSA9IGFzeW5jICh1c2VyOiBVc2VyKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBWYWxpZGF0ZSBKU09OIHNjaGVtYS5cclxuXHRcdFx0YXdhaXQgQm9va2luZ1ZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKFxyXG5cdFx0XHRcdHVzZXIsXHJcblx0XHRcdFx0QVBJX09QRVJBVElPTi5ERUxFVEUsXHJcblx0XHRcdFx0dGhpcy5kYXRhXHJcblx0XHRcdCkudmFsaWRhdGUodGhpcy5kYXRhKTtcclxuXHJcblx0XHRcdGF3YWl0IHRoaXMuZGF0YS5kZXN0cm95KCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cHVibGljIHNldEVtYWlsTm90aWZpY2F0aW9uc1RvQm9va2luZ01hbmFnZXJzID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0Y29uc3QgYm9va2luZ0RhdGEgPSBhd2FpdCB0aGlzLmRhdGEucmVsb2FkKHtcclxuXHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IFVzZXIgfV1cclxuXHRcdH0pO1xyXG5cdFx0YXdhaXQgVXNlci5maW5kQWxsKHtcclxuXHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRjbGllbnRJZDogYm9va2luZ0RhdGEudXNlci5jbGllbnRJZCxcclxuXHRcdFx0XHRyb2xlOiB7XHJcblx0XHRcdFx0XHRbT3AuaW5dOiBbUm9sZS5BRE1JTiwgUm9sZS5LRVlfTUFOQUdFUl1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLnRoZW4oYXN5bmMgdXNlcnMgPT4ge1xyXG5cdFx0XHRjb25zdCB2ZWhpY2xlID0gYXdhaXQgVmVoaWNsZS5maW5kQnlQayhib29raW5nRGF0YS52ZWhpY2xlSWQpO1xyXG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IHZlaGljbGUgJiYgKGF3YWl0IExvY2F0aW9uLmZpbmRCeVBrKHZlaGljbGUubG9jYXRpb25JZCkpO1xyXG5cclxuXHRcdFx0bGV0IGxuZyA9IGxvY2F0aW9uLmxuZztcclxuXHRcdFx0bGV0IGxhdCA9IGxvY2F0aW9uLmxhdDtcclxuXHJcblx0XHRcdGlmICh2ZWhpY2xlLndpYWxvblVuaXRJZCkge1xyXG5cdFx0XHRcdGNvbnN0IHcgPSBhd2FpdCBXaWFsb24ubG9naW4oe1xyXG5cdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGNvbnN0IHVuaXQgPSBhd2FpdCB3LkNvcmUuc2VhcmNoSXRlbSh7XHJcblx0XHRcdFx0XHRpZDogdmVoaWNsZS53aWFsb25Vbml0SWQsXHJcblx0XHRcdFx0XHRmbGFnczogMTAyNCArIDgxOTJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpZiAodW5pdCkge1xyXG5cdFx0XHRcdFx0bGF0ID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy55O1xyXG5cdFx0XHRcdFx0bG5nID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy54O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IgKGNvbnN0IHVzZXIgb2YgdXNlcnMpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0c2VuZEJvb2tpbmdOb3RpZmljYXRpb24oe1xyXG5cdFx0XHRcdFx0XHRlbWFpbDogdXNlci5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdFx0XHRcdFx0Ym9va2luZ0lkOiBib29raW5nRGF0YS5pZCxcclxuXHRcdFx0XHRcdFx0Y3VzdG9tZXJFbWFpbDogYm9va2luZ0RhdGEudXNlci5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Y3VzdG9tZXJOYW1lOiBgJHtib29raW5nRGF0YS51c2VyLmZpcnN0TmFtZX0gJHtib29raW5nRGF0YS51c2VyLmxhc3ROYW1lfWAsXHJcblx0XHRcdFx0XHRcdGZyb206IG1vbWVudChib29raW5nRGF0YS5mcm9tKS51bml4KCksXHJcblx0XHRcdFx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0bGF0LFxyXG5cdFx0XHRcdFx0XHRsbmcsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiBsb2NhdGlvbi5uYW1lLFxyXG5cdFx0XHRcdFx0XHRtb2JpbGU6IGJvb2tpbmdEYXRhLnVzZXIubW9iaWxlTnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlciB8fCBcIk4vQVwiLFxyXG5cdFx0XHRcdFx0XHR2ZWhpY2xlOiBgJHt2ZWhpY2xlLmJyYW5kfSAke3ZlaGljbGUubW9kZWx9YCxcclxuXHRcdFx0XHRcdFx0dmVoaWNsZUlkOiB2ZWhpY2xlLmlkLFxyXG5cdFx0XHRcdFx0XHR0aW1lWm9uZTogdXNlci50aW1lWm9uZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge31cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0cHVibGljIHNlbmRJbnZvaWNlID0gYXN5bmMgKGFtb3VudDogbnVtYmVyKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHRoaXMuZGF0YS5yZWxvYWQoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogVXNlciB9LCB7IG1vZGVsOiBWZWhpY2xlIH1dXHJcblx0XHR9KTtcclxuXHRcdGF3YWl0IHNlbmRJbnZvaWNlRW1haWwoe1xyXG5cdFx0XHRlbWFpbDogYm9va2luZ0RhdGEudXNlci5lbWFpbCxcclxuXHRcdFx0YW1vdW50OiBhbW91bnQsXHJcblx0XHRcdGN1c3RvbWVyTmFtZTogYm9va2luZ0RhdGEudXNlci5maXJzdE5hbWUsXHJcblx0XHRcdHZlaGljbGVOYW1lOiBgJHtib29raW5nRGF0YS52ZWhpY2xlLmJyYW5kfSAke2Jvb2tpbmdEYXRhLnZlaGljbGUubW9kZWx9YCxcclxuXHRcdFx0ZnJvbTogbW9tZW50KGJvb2tpbmdEYXRhLmZyb20sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdGJvb2tpbmdJZDogYm9va2luZ0RhdGEuaWQsXHJcblx0XHRcdHRpbWVab25lOiBib29raW5nRGF0YS51c2VyLnRpbWVab25lXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgc2VuZEJvb2tpbmdDb25maXJtYXRpb24gPSBhc3luYyAoKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHRoaXMuZGF0YS5yZWxvYWQoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogVXNlciB9LCB7IG1vZGVsOiBWZWhpY2xlIH1dXHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHZlaGljbGVMb2NhdGlvbiA9IGF3YWl0IExvY2F0aW9uLmZpbmRCeVBrKFxyXG5cdFx0XHRib29raW5nRGF0YS52ZWhpY2xlLmxvY2F0aW9uSWRcclxuXHRcdCk7XHJcblx0XHRsZXQgbG5nID0gdmVoaWNsZUxvY2F0aW9uLmxuZztcclxuXHRcdGxldCBsYXQgPSB2ZWhpY2xlTG9jYXRpb24ubGF0O1xyXG5cclxuXHRcdGlmIChib29raW5nRGF0YS52ZWhpY2xlLndpYWxvblVuaXRJZCkge1xyXG5cdFx0XHRjb25zdCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHtcclxuXHRcdFx0XHR0b2tlbjogcHJvY2Vzcy5lbnYuV0lBTE9OX1RPS0VOXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zdCB1bml0ID0gYXdhaXQgdy5Db3JlLnNlYXJjaEl0ZW0oe1xyXG5cdFx0XHRcdGlkOiBib29raW5nRGF0YS52ZWhpY2xlLndpYWxvblVuaXRJZCxcclxuXHRcdFx0XHRmbGFnczogMTAyNCArIDgxOTJcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh1bml0KSB7XHJcblx0XHRcdFx0bGF0ID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy55O1xyXG5cdFx0XHRcdGxuZyA9IHVuaXQuaXRlbSAmJiB1bml0Lml0ZW0ucG9zICYmIHVuaXQuaXRlbS5wb3MueDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0YXdhaXQgc2VuZEJvb2tpbmdDb25maXJtYXRpb25FbWFpbCh7XHJcblx0XHRcdGVtYWlsOiBib29raW5nRGF0YS51c2VyLmVtYWlsLFxyXG5cdFx0XHRjdXN0b21lck5hbWU6IGJvb2tpbmdEYXRhLnVzZXIuZmlyc3ROYW1lLFxyXG5cdFx0XHR2ZWhpY2xlTmFtZTogYCR7Ym9va2luZ0RhdGEudmVoaWNsZS5icmFuZH0gJHtib29raW5nRGF0YS52ZWhpY2xlLm1vZGVsfSAke2Jvb2tpbmdEYXRhLnZlaGljbGUucGxhdGVOdW1iZXJ9YCxcclxuXHRcdFx0ZnJvbTogbW9tZW50KGJvb2tpbmdEYXRhLmZyb20sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdGJvb2tpbmdJZDogYm9va2luZ0RhdGEuaWQsXHJcblx0XHRcdGFkZHJlc3M6IHZlaGljbGVMb2NhdGlvbiAmJiB2ZWhpY2xlTG9jYXRpb24uYWRkcmVzcyxcclxuXHRcdFx0cGFya2luZ0xvY2F0aW9uOiBib29raW5nRGF0YS52ZWhpY2xlLnBhcmtpbmdMb2NhdGlvbixcclxuXHRcdFx0bGF0LFxyXG5cdFx0XHRsbmcsXHJcblx0XHRcdHRpbWVab25lOiBib29raW5nRGF0YS51c2VyLnRpbWVab25lXHJcblx0XHR9KTtcclxuXHR9O1xyXG59XHJcbiIsImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhc3RhYmxlPFI+IHtcclxuXHRjYXN0OiAodXNlcjogVXNlcikgPT4gUjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb248UiwgVCBleHRlbmRzIENhc3RhYmxlPFI+PiB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGRhdGE6IFRbXSkge31cclxuXHJcblx0cHVibGljIGNhc3QgPSAodXNlcjogVXNlcikgPT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNhc3QodXNlcikpO1xyXG5cdH07XHJcbn1cclxuIiwiaW1wb3J0IHsgT3AsIEZpbmRPcHRpb25zIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IFZlaGljbGUgYXMgVmVoaWNsZU1vZGVsLCBVc2VyLCBCb29raW5nLCBDYXRlZ29yeSB9IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgVmVoaWNsZUF0dHJpYnV0ZXMsIEJvb2tpbmdTdGF0dXMsIFJvbGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgZ2V0Qm9va2luZ1N0YXR1cyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbiB9IGZyb20gXCIuL2V4Y2VwdGlvbnNcIjtcclxuaW1wb3J0IHsgVmVoaWNsZSBhcyBWZWhpY2xlVmFsaWRhdG9ycyB9IGZyb20gXCIuL3ZhbGlkYXRvcnNcIjtcclxuaW1wb3J0IHsgQXBpRXJyb3JIYW5kbGVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgVXNlUGFyYW1ldGVycywgQ29sbGVjdGlvbiwgQ2FzdGFibGUsIEFQSV9PUEVSQVRJT04gfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ3JlYXRlVmVoaWNsZU9wdGlvbnMgPSBVc2VQYXJhbWV0ZXJzPFxyXG5cdFZlaGljbGVBdHRyaWJ1dGVzLFxyXG5cdFwiYnJhbmRcIiB8IFwibW9kZWxcIiB8IFwidmluXCIsXHJcblx0fCBcInBsYXRlTnVtYmVyXCJcclxuXHR8IFwiZGVmbGVldGVkXCJcclxuXHR8IFwicGFya2luZ0xvY2F0aW9uXCJcclxuXHR8IFwidmVoaWNsZUltYWdlU3JjXCJcclxuXHR8IFwiYm9va2luZ0NoYXJnZUNvdW50XCJcclxuXHR8IFwiYm9va2luZ0NoYXJnZVwiXHJcblx0fCBcIndpYWxvblVuaXRJZFwiXHJcblx0fCBcImJvb2tpbmdDaGFyZ2VVbml0XCJcclxuXHR8IFwiY2xpZW50SWRcIlxyXG5cdHwgXCJsb2NhdGlvbklkXCJcclxuPjtcclxuXHJcbmV4cG9ydCB0eXBlIFVwZGF0ZVZlaGljbGVPcHRpb25zID0gVXNlUGFyYW1ldGVyczxcclxuXHRWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRcImJyYW5kXCIgfCBcIm1vZGVsXCIgfCBcInZpblwiLFxyXG5cdHwgXCJwbGF0ZU51bWJlclwiXHJcblx0fCBcImRlZmxlZXRlZFwiXHJcblx0fCBcInBhcmtpbmdMb2NhdGlvblwiXHJcblx0fCBcInZlaGljbGVJbWFnZVNyY1wiXHJcblx0fCBcImJvb2tpbmdDaGFyZ2VDb3VudFwiXHJcblx0fCBcImJvb2tpbmdDaGFyZ2VcIlxyXG5cdHwgXCJ3aWFsb25Vbml0SWRcIlxyXG5cdHwgXCJib29raW5nQ2hhcmdlVW5pdFwiXHJcblx0fCBcImNsaWVudElkXCJcclxuXHR8IFwibG9jYXRpb25JZFwiXHJcbj47XHJcbmV4cG9ydCBjbGFzcyBWZWhpY2xlIGltcGxlbWVudHMgQ2FzdGFibGU8UGFydGlhbDxWZWhpY2xlQXR0cmlidXRlcz4+IHtcclxuXHRwcml2YXRlIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhOiBWZWhpY2xlTW9kZWwpIHt9XHJcblxyXG5cdHB1YmxpYyBjYXN0ID0gKHVzZXI6IFVzZXIpID0+XHJcblx0XHRWZWhpY2xlVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IodXNlciwgQVBJX09QRVJBVElPTi5SRUFEKS5jYXN0KHRoaXMuZGF0YSk7XHJcblxyXG5cdHB1YmxpYyBhdmFpbGFibGVGb3JCb29raW5nID0gYXN5bmMgKFxyXG5cdFx0ZnJvbTogbnVtYmVyLFxyXG5cdFx0dG86IG51bWJlcixcclxuXHRcdGJvb2tpbmdzOiBCb29raW5nW11cclxuXHQpID0+IHtcclxuXHRcdGlmICh0aGlzLmRhdGEuZGVmbGVldGVkID09PSB0cnVlKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCB2ZWhpY2xlQm9va2luZ3MgPSBib29raW5ncyB8fCAoYXdhaXQgdGhpcy5kYXRhLiRnZXQoXCJib29raW5nc1wiKSk7XHJcblxyXG5cdFx0Zm9yIChjb25zdCBib29raW5nIG9mIHZlaGljbGVCb29raW5ncykge1xyXG5cdFx0XHRjb25zdCBzdGF0dXMgPSBnZXRCb29raW5nU3RhdHVzKHtcclxuXHRcdFx0XHRmcm9tLFxyXG5cdFx0XHRcdHRvLFxyXG5cdFx0XHRcdGFwcHJvdmVkOiBib29raW5nLmFwcHJvdmVkXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0c3RhdHVzID09PSBCb29raW5nU3RhdHVzLlBFTkRJTkcgfHxcclxuXHRcdFx0XHRzdGF0dXMgPT09IEJvb2tpbmdTdGF0dXMuQVBQUk9WRUQgfHxcclxuXHRcdFx0XHRzdGF0dXMgPT09IEJvb2tpbmdTdGF0dXMuT05HT0lOR1xyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIGdldCA9IGFzeW5jICh1c2VyOiBVc2VyLCBpZDogbnVtYmVyKSA9PiB7XHJcblx0XHRjb25zdCB2ZWhpY2xlID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeVBrKGlkKTtcclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFZlaGljbGUodmVoaWNsZSk7XHJcblx0XHR9IGVsc2UgaWYgKHVzZXIuY2xpZW50SWQgPT09IHZlaGljbGUuY2xpZW50SWQpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBWZWhpY2xlKHZlaGljbGUpO1xyXG5cdFx0fVxyXG5cdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKFwiWW91IGNhbm5vdCBhY2Nlc3MgdGhpcyB2ZWhpY2xlLlwiKTtcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgdXBkYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IFVwZGF0ZVZlaGljbGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRhd2FpdCBWZWhpY2xlVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IodXNlciwgQVBJX09QRVJBVElPTi5VUERBVEUsIHtcclxuXHRcdFx0XHRuZXdEYXRhOiBvcHRpb25zLFxyXG5cdFx0XHRcdHRhcmdldDogdGhpcy5kYXRhXHJcblx0XHRcdH0pLnZhbGlkYXRlKG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0Y29uc3QgdmVoaWNsZU9wdGlvbnMgPSBWZWhpY2xlVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLlVQREFURSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuZXdEYXRhOiBvcHRpb25zLFxyXG5cdFx0XHRcdFx0dGFyZ2V0OiB0aGlzLmRhdGFcclxuXHRcdFx0XHR9XHJcblx0XHRcdCkuY2FzdChvcHRpb25zKTtcclxuXHJcblx0XHRcdGF3YWl0IHRoaXMuZGF0YS51cGRhdGUodmVoaWNsZU9wdGlvbnMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRuZXcgQXBpRXJyb3JIYW5kbGVyKGUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IENyZWF0ZVZlaGljbGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRhd2FpdCBWZWhpY2xlVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IodXNlciwgQVBJX09QRVJBVElPTi5DUkVBVEUsIHtcclxuXHRcdFx0XHRuZXdEYXRhOiBvcHRpb25zXHJcblx0XHRcdH0pLnZhbGlkYXRlKG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0Y29uc3QgdmVoaWNsZU9wdGlvbnMgPSBhd2FpdCBWZWhpY2xlVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLkNSRUFURSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuZXdEYXRhOiBvcHRpb25zXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpLmNhc3Qob3B0aW9ucyk7XHJcblxyXG5cdFx0XHRjb25zdCBjcmVhdGVkVmVoaWNsZSA9IGF3YWl0IFZlaGljbGVNb2RlbC5jcmVhdGUodmVoaWNsZU9wdGlvbnMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBCb29raW5nKGNyZWF0ZWRWZWhpY2xlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0bmV3IEFwaUVycm9ySGFuZGxlcihlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIGdldEFsbCA9IGFzeW5jIChcclxuXHRcdHVzZXI6IFVzZXIsXHJcblx0XHRvcHRpb25zPzogeyBmcm9tOiBEYXRlOyB0bzogRGF0ZSB9XHJcblx0KSA9PiB7XHJcblx0XHRsZXQgdmVoaWNsZXM6IFZlaGljbGVNb2RlbFtdID0gW107XHJcblx0XHRjb25zdCBiYXNlRmluZE9wdGlvbnM6IEZpbmRPcHRpb25zID1cclxuXHRcdFx0b3B0aW9ucz8uZnJvbSAmJiBvcHRpb25zPy50b1xyXG5cdFx0XHRcdD8ge1xyXG5cdFx0XHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0XHRcdFwiJGJvb2tpbmdzLnZlaGljbGVJZCRcIjogbnVsbFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRpbmNsdWRlOiBbXHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0bW9kZWw6IEJvb2tpbmcsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXF1aXJlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBDaGVjayBpZiB0aGUgaW50ZXJ2YWxzIGRvZXMgbm90IGludGVyc2VjdCB3aXRoIG90aGVyIGJvb2tpbmdzLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0bzoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFtPcC5sdGVdOiBvcHRpb25zLnRvXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZyb206IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRbT3AuZ3RlXTogb3B0aW9ucy5mcm9tXHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdF1cclxuXHRcdFx0XHQgIH1cclxuXHRcdFx0XHQ6IHt9O1xyXG5cclxuXHRcdGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSKSB7XHJcblx0XHRcdHZlaGljbGVzID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRBbGwoYmFzZUZpbmRPcHRpb25zKTtcclxuXHRcdH0gZWxzZSBpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdC8vIEdldCBvbmx5IGF2YWlsYWJsZSB2ZWhpY2xlcyBpbiB0aGUgc2FtZSBjbGllbnQuXHJcblx0XHRcdC8vIE9ubHkgdmVoaWNsZXMgd2hpY2ggaGF2ZSB0aGUgc2FtZSBjYXRlZ29yaWVzIGFzIHRoZSB1c2VyLlxyXG5cdFx0XHRjb25zdCB1c2VyQ2F0ZWdvcmllcyA9IGF3YWl0IHVzZXIuJGdldChcImNhdGVnb3JpZXNcIik7XHJcblxyXG5cdFx0XHQvLyBHZXQgYWxsIHZlaGljbGVzIGluIHRoZSBjbGllbnQgaWYgdXNlciBkb2VzIG5vdCBjb250YWluIGEgY2F0ZWdvcnkuXHJcblx0XHRcdGlmICghdXNlckNhdGVnb3JpZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZEFsbChcclxuXHRcdFx0XHRcdF8ubWVyZ2UoXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2xpZW50SWQ6IHVzZXIuY2xpZW50SWRcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdGJhc2VGaW5kT3B0aW9uc1xyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZEFsbChcclxuXHRcdFx0XHRcdF8ubWVyZ2UoXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2xpZW50SWQ6IHVzZXIuY2xpZW50SWRcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kZWw6IENhdGVnb3J5LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlkOiB7IFtPcC5pbl06IHVzZXJDYXRlZ29yaWVzLm1hcChjID0+IGMuaWQpIH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdF1cclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0YmFzZUZpbmRPcHRpb25zXHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh1c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdHZlaGljbGVzID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRBbGwoXHJcblx0XHRcdFx0Xy5tZXJnZShcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRjbGllbnRJZDogdXNlci5jbGllbnRJZFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YmFzZUZpbmRPcHRpb25zXHJcblx0XHRcdFx0KVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgQ29sbGVjdGlvbjxQYXJ0aWFsPFZlaGljbGVBdHRyaWJ1dGVzPiwgVmVoaWNsZT4oXHJcblx0XHRcdHZlaGljbGVzLm1hcCh2ID0+IG5ldyBWZWhpY2xlKHYpKVxyXG5cdFx0KTtcclxuXHR9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBBcGlFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhQmFzZUV4Y2VwdGlvbiBleHRlbmRzIEFwaUV4Y2VwdGlvbiB7XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRFcnJvciB7XHJcblx0ZmllbGQ6IHN0cmluZztcclxuXHRtZXNzYWdlOiBzdHJpbmc7XHJcblx0bmFtZTogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBGb3JtRXhjZXB0aW9uIGV4dGVuZHMgQXBpRXhjZXB0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHB1YmxpYyBmaWVsZHM6IEZpZWxkRXJyb3JbXSkge1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcblx0fVxyXG5cdHB1YmxpYyB0aHJvdyA9ICgpID0+IHtcclxuXHRcdGlmICh0aGlzLmZpZWxkcykge1xyXG5cdFx0XHR0aHJvdyB0aGlzO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbiBleHRlbmRzIEFwaUV4Y2VwdGlvbiB7XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGF0YUJhc2VFeGNlcHRpb24gfSBmcm9tIFwiLi9cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtTm90Rm91bmRFeGNlcHRpb24gZXh0ZW5kcyBEYXRhQmFzZUV4Y2VwdGlvbiB7XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZSkge1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL0FwaUV4Y2VwdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Gb3JtRXhjZXB0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0RhdGFCYXNlRXhjZXB0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0ludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1Jlc291cmNlTm90Rm91bmRcIjtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vQm9va2luZ1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0NvbGxlY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBlbnVtIEFQSV9PUEVSQVRJT04ge1xyXG5cdENSRUFURSA9IFwiQ1JFQVRFXCIsXHJcblx0REVMRVRFID0gXCJERUxFVEVcIixcclxuXHRVUERBVEUgPSBcIlVQREFURVwiLFxyXG5cdFJFQUQgPSBcIlJFQURcIlxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBVc2VQYXJhbWV0ZXJzPFxyXG5cdEFsbFBhcmFtcyxcclxuXHRSZXF1aXJlZFBhcmFtcyBleHRlbmRzIGtleW9mIEFsbFBhcmFtcyA9IHVuZGVmaW5lZCxcclxuXHRQYXJ0aWFsUGFyYW1zIGV4dGVuZHMga2V5b2YgQWxsUGFyYW1zID0gdW5kZWZpbmVkXHJcbj4gPSBQaWNrPEFsbFBhcmFtcywgUmVxdWlyZWRQYXJhbXM+ICYgUGljazxQYXJ0aWFsPEFsbFBhcmFtcz4sIFBhcnRpYWxQYXJhbXM+O1xyXG4iLCJpbXBvcnQgeyBBcGlFeGNlcHRpb24sIEZvcm1FeGNlcHRpb24gfSBmcm9tIFwiLi4vZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbiB9IGZyb20gXCIuLi9leGNlcHRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBpRXJyb3JIYW5kbGVyIHtcclxuXHRjb25zdHJ1Y3RvcihlOiBFcnJvcikge1xyXG5cdFx0Y29uc29sZS5sb2coXCJBcGlFcnJvckhhbmRsZXJcIiwgZSk7XHJcblx0XHRpZiAoZSBpbnN0YW5jZW9mIEZvcm1FeGNlcHRpb24pIHtcclxuXHRcdFx0Ly8gQWRkIGZpZWxkcyB0byBlcnJvcnNcclxuXHRcdFx0Zm9yIChjb25zdCBlcnJvciBvZiBlLmZpZWxkcykge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3IgZmllbGRzXCIsZXJyb3IpO1xyXG5cdFx0XHRcdGlmIChlcnJvci5uYW1lID09PSBcInBlcm1pc3Npb25cIikge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKGVycm9yLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aHJvdyBlO1xyXG5cdFx0fVxyXG5cdFx0Ly8gVW5rbm93biBlcnJvci5cclxuXHRcdHRocm93IG5ldyBBcGlFeGNlcHRpb24oXCJBbiB1bmtub3duIGVycm9yIGhhcyBvY2N1cnJlZC5cIik7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IEZpZWxkRXJyb3IsIEZvcm1FeGNlcHRpb24gfSBmcm9tIFwiLi4vZXhjZXB0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvcm1FcnJvckJ1aWxkZXIge1xyXG5cdHB1YmxpYyBmaWVsZHM6IEZpZWxkRXJyb3JbXSA9IFtdO1xyXG5cclxuXHRwdWJsaWMgYWRkID0gKGZpZWxkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiB7XHJcblx0XHR0aGlzLmZpZWxkcy5wdXNoKHsgZmllbGQsIG1lc3NhZ2UsIG5hbWUgfSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgYWRkSWYgPSAoXHJcblx0XHRjb25kaXRpb246IGJvb2xlYW4sXHJcblx0XHRmaWVsZDogc3RyaW5nLFxyXG5cdFx0bWVzc2FnZTogc3RyaW5nLFxyXG5cdFx0bmFtZTogc3RyaW5nXHJcblx0KSA9PiB7XHJcblx0XHRpZiAoY29uZGl0aW9uKSB7XHJcblx0XHRcdHRoaXMuYWRkKGZpZWxkLCBtZXNzYWdlLCBuYW1lKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyB0aHJvdyhtZXNzYWdlOiBzdHJpbmcgPSBcIkFuIGVycm9yIGhhcyBvY2N1cmVkIGluIG9uZSBvZiB0aGUgZmllbGRzLlwiKSB7XHJcblx0XHRpZiAodGhpcy5maWVsZHMubGVuZ3RoKSB7XHJcblx0XHRcdHRocm93IG5ldyBGb3JtRXhjZXB0aW9uKG1lc3NhZ2UsIHRoaXMuZmllbGRzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9yIH0gZnJvbSBcInl1cFwiO1xyXG5pbXBvcnQgeyBGaWVsZEVycm9yLCBGb3JtRXhjZXB0aW9uIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnNcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL0FwaUVycm9ySGFuZGxlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Gb3JtRXJyb3JCdWlsZGVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VmFsaWRhdGlvbkVycm9ycyA9IChlcnJvcnM6IFZhbGlkYXRpb25FcnJvcik6IEZpZWxkRXJyb3JbXSA9PlxyXG5cdGVycm9ycy5pbm5lci5tYXAoZXJyb3IgPT4gKHtcclxuXHRcdGZpZWxkOiBlcnJvci5wYXRoLFxyXG5cdFx0bWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuXHRcdG5hbWU6IGVycm9yLm5hbWVcclxuXHR9KSk7XHJcblxyXG5leHBvcnQgY29uc3QgY2F0Y2hZdXBWYWRhdGlvbkVycm9ycyA9IGFzeW5jIChcclxuXHR2YWxpZGF0b3I6ICgpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XHJcbikgPT4ge1xyXG5cdGxldCBlcnJvcnM6IEZpZWxkRXJyb3JbXSA9IFtdO1xyXG5cdHRyeSB7XHJcblx0XHRhd2FpdCB2YWxpZGF0b3IoKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRpZiAoZSBpbnN0YW5jZW9mIFZhbGlkYXRpb25FcnJvcikge1xyXG5cdFx0XHRlcnJvcnMgPSBnZXRWYWxpZGF0aW9uRXJyb3JzKGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGVycm9ycy5sZW5ndGgpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEZvcm1FeGNlcHRpb24oXHJcblx0XHRcdFx0XCJBbiBlcnJvciBoYXMgb2NjdXJlZCBpbiBvbmUgb2YgdGhlIGZpZWxkcy5cIixcclxuXHRcdFx0XHRlcnJvcnNcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbiIsImltcG9ydCAqIGFzIHl1cCBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuaW1wb3J0IHtcclxuXHRVc2VyLFxyXG5cdFZlaGljbGUsXHJcblx0Qm9va2luZyBhcyBCb29raW5nTW9kZWwsXHJcblx0UmVwbGFjZVZlaGljbGVcclxufSBmcm9tIFwiLi4vLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdBdHRyaWJ1dGVzLCBCb29raW5nVHlwZSwgUm9sZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgeyBzdHJpcEZpZWxkIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgaXNCb29raW5nVGltZVNsb3RUYWtlbiB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBCb29raW5nQ3JlYXRlT3B0aW9ucywgQm9va2luZ1VwZGF0ZU9wdGlvbnMgfSBmcm9tIFwiLi4vQm9va2luZ1wiO1xyXG5pbXBvcnQgeyBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuXCI7XHJcblxyXG50eXBlIFZhbGlkYXRvclBhcmFtZXRlcnMgPSBQYXJhbWV0ZXJzPHR5cGVvZiBCb29raW5nLmdldFZhbGlkYXRvcj47XHJcblxyXG5pbnRlcmZhY2UgQm9va2luZ1ZhbGlkYXRpb25EYXRhXHJcblx0ZXh0ZW5kcyBPbWl0PEJvb2tpbmdBdHRyaWJ1dGVzLCBcImZyb21cIiB8IFwidG9cIiB8IFwiY3JlYXRlZEF0XCIgfCBcInVwZGF0ZWRBdFwiPiB7XHJcblx0ZnJvbTogbnVtYmVyIHwgRGF0ZTtcclxuXHR0bzogbnVtYmVyIHwgRGF0ZTtcclxuXHRjcmVhdGVkQXQ6IG51bWJlciB8IERhdGU7XHJcblx0Y3JlYXRlZGF0OiBudW1iZXIgfCBEYXRlO1xyXG59XHJcblxyXG50eXBlIEJvb2tpbmdWYWxpZGF0b3JDb250ZXh0V2l0aFNjaGVtYSA9IFtcclxuXHRWYWxpZGF0b3JQYXJhbWV0ZXJzWzBdLFxyXG5cdEFQSV9PUEVSQVRJT04sXHJcblx0Qm9va2luZ01vZGVsLFxyXG5cdEJvb2tpbmdVcGRhdGVPcHRpb25zIHwgQm9va2luZ0NyZWF0ZU9wdGlvbnMsXHJcblx0Ym9vbGVhbixcclxuXHR5dXAuT2JqZWN0U2NoZW1hPEJvb2tpbmdWYWxpZGF0aW9uRGF0YT5cclxuXTtcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJvb2tpbmcge1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0VmFsaWRhdG9yID0gKFxyXG5cdFx0dXNlcjogVXNlcixcclxuXHRcdG9wZXJhdGlvbjogQVBJX09QRVJBVElPTixcclxuXHRcdHRhcmdldD86IEJvb2tpbmdNb2RlbFxyXG5cdCkgPT4gbmV3IFZhbGlkYXRvcihCb29raW5nLnZhbGlkYXRvclNjaGVtYSwgdXNlciwgb3BlcmF0aW9uLCB0YXJnZXQpO1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyB2YWxpZGF0b3JTY2hlbWEgPSB5dXBcclxuXHRcdC5vYmplY3QoKVxyXG5cdFx0LnNoYXBlKHtcclxuXHRcdFx0cGFpZDogeXVwLmJvb2xlYW4oKSxcclxuXHRcdFx0YW1vdW50OiB5dXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0ZnJvbTogeXVwXHJcblx0XHRcdFx0LmRhdGUoKVxyXG5cdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHR0eXBlb2Ygb3JpZ2luYWxWYWx1ZSA9PT0gXCJudW1iZXJcIlxyXG5cdFx0XHRcdFx0XHQ/IG1vbWVudChvcmlnaW5hbFZhbHVlLCBcIlhcIikudG9EYXRlKClcclxuXHRcdFx0XHRcdFx0OiBvcmlnaW5hbFZhbHVlXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0dG86IHl1cFxyXG5cdFx0XHRcdC5kYXRlKClcclxuXHRcdFx0XHQudHJhbnNmb3JtKCh2LCBvcmlnaW5hbFZhbHVlKSA9PlxyXG5cdFx0XHRcdFx0dHlwZW9mIG9yaWdpbmFsVmFsdWUgPT09IFwibnVtYmVyXCJcclxuXHRcdFx0XHRcdFx0PyBtb21lbnQob3JpZ2luYWxWYWx1ZSwgXCJYXCIpLnRvRGF0ZSgpXHJcblx0XHRcdFx0XHRcdDogb3JpZ2luYWxWYWx1ZVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdGFwcHJvdmVkOiB5dXAuYm9vbGVhbigpLm51bGxhYmxlKCksXHJcblx0XHRcdGZpbmlzaGVkOiB5dXAuYm9vbGVhbigpLFxyXG5cdFx0XHRzdGFydE1pbGVhZ2U6IHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRlbmRNaWxlYWdlOiB5dXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0c3RhcnRGdWVsOiB5dXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0ZW5kRnVlbDogeXVwLm51bWJlcigpLm51bGxhYmxlKCksXHJcblx0XHRcdHVzZXJJZDogeXVwLm51bWJlcigpLFxyXG5cdFx0XHR2ZWhpY2xlSWQ6IHl1cC5udW1iZXIoKSxcclxuXHRcdFx0Ym9va2luZ1R5cGU6IHl1cC5taXhlZDxCb29raW5nVHlwZT4oKS5vbmVPZihPYmplY3QudmFsdWVzKEJvb2tpbmdUeXBlKSksXHJcblx0XHRcdHJlcGxhY2VWZWhpY2xlSWQ6IHl1cC5udW1iZXIoKS5udWxsYWJsZSgpXHJcblx0XHR9KVxyXG5cdFx0LndoZW4oXHJcblx0XHRcdFtcIiR1c2VyXCIsIFwiJG9wZXJhdGlvblwiLCBcIiR0YXJnZXRcIiwgXCIkZGF0YVwiLCBcIiRjYXN0aW5nXCJdLFxyXG5cdFx0XHQoLi4uYXJnczogQm9va2luZ1ZhbGlkYXRvckNvbnRleHRXaXRoU2NoZW1hKSA9PiB7XHJcblx0XHRcdFx0bGV0IFt1c2VyLCBvcGVyYXRpb24sIHRhcmdldCwgZGF0YSwgY2FzdGluZywgc2NoZW1hXSA9IGFyZ3M7XHJcblx0XHRcdFx0c3dpdGNoIChvcGVyYXRpb24pIHtcclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5SRUFEOiB7XHJcblx0XHRcdFx0XHRcdGlmIChkYXRhLmJvb2tpbmdUeXBlID09PSBCb29raW5nVHlwZS5SRVBMQUNFTUVOVCkge1xyXG5cdFx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXBsYWNlVmVoaWNsZTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5vYmplY3QoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyYW5kOiB5dXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogeXVwLnN0cmluZygpLm51bGxhYmxlKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmluOiB5dXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogeXVwLnN0cmluZygpLm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWEuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdGlkOiB5dXAubnVtYmVyKCksXHJcblx0XHRcdFx0XHRcdFx0ZnJvbTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudChvcmlnaW5hbFZhbHVlIGFzIERhdGUpLnVuaXgoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR0bzogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudChvcmlnaW5hbFZhbHVlIGFzIERhdGUpLnVuaXgoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRjcmVhdGVkQXQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCh2LCBvcmlnaW5hbFZhbHVlKSA9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQob3JpZ2luYWxWYWx1ZSBhcyBEYXRlKS51bml4KClcclxuXHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0dXBkYXRlZEF0OiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oXHJcblx0XHRcdFx0XHRcdFx0XHRcdCh2LCBvcmlnaW5hbFZhbHVlKSA9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdChvcmlnaW5hbFZhbHVlICYmIG1vbWVudChvcmlnaW5hbFZhbHVlIGFzIERhdGUpLnVuaXgoKSkgfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRudWxsXHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHZlaGljbGU6IHl1cC5vYmplY3QoKS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRpZDogeXVwLm51bWJlcigpLFxyXG5cdFx0XHRcdFx0XHRcdFx0YnJhbmQ6IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdG1vZGVsOiB5dXAuc3RyaW5nKCksXHJcblx0XHRcdFx0XHRcdFx0XHR2aW46IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKClcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIEFQSV9PUEVSQVRJT04uVVBEQVRFOiB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHVwZGF0ZURhdGEgPSBkYXRhIGFzIEJvb2tpbmdVcGRhdGVPcHRpb25zO1xyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWEuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdGZyb206IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0LmRhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodmFsdWUsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudChvcmlnaW5hbFZhbHVlLCBcIlhcIikudG9EYXRlKClcclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5vLWFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwiQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuIGFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNoYW5nZWQgPVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8uZnJvbSAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLmZyb20gIT09IHRhcmdldC5mcm9tO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEd1ZXN0LCBkZW55IGNoYW5nZXMgaWYgYXBwcm92ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5HVUVTVCAmJiB0YXJnZXQuYXBwcm92ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQuZmluaXNoZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEtleSBNYW5hZ2VyLCBkZW55IGlmIGJvb2tpbmcgaGFzIGZpbmlzaGVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR0bzogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQuZGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCh2YWx1ZSwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwibm8tYXBwcm92ZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJCb29raW5nIGhhcyBhbHJlYWR5IGJlZW4gYXBwcm92ZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhPy50byAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLnRvICE9PSB0YXJnZXQudG87XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiBHdWVzdCwgZGVueSBjaGFuZ2VzIGlmIGFwcHJvdmVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh1c2VyLnJvbGUgPT09IFJvbGUuR1VFU1QgJiYgdGFyZ2V0LmFwcHJvdmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUiAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LmZpbmlzaGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiBLZXkgTWFuYWdlciwgZGVueSBpZiBib29raW5nIGhhcyBmaW5pc2hlZC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0ZmluaXNoZWQ6IHN0cmlwRmllbGQoXHJcblx0XHRcdFx0XHRcdFx0XHR5dXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmJvb2xlYW4oKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcInRpbWVzbG90LWF2YWlsYWJsZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiVGhpcyBib29raW5nIGlzIGludGVyc2VjdHMgd2l0aCBhbm90aGVyIGJvb2tpbmcgYXQgdGhlIHRpbWUgc3BlY2lmaWVkLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LmZpbmlzaGVkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YS5maW5pc2hlZCAhPT0gdGFyZ2V0LmZpbmlzaGVkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBib29rZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZS5maW5kQnlQayhcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LnZlaGljbGVJZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGluY2x1ZGU6IFt7IG1vZGVsOiBCb29raW5nTW9kZWwgfV1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAhaXNCb29raW5nVGltZVNsb3RUYWtlbihcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ym9va2VkVmVoaWNsZS5ib29raW5ncy5tYXAoKHsgZnJvbSwgdG8sIGlkIH0pID0+ICh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnJvbTogbW9tZW50KGZyb20pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bzogbW9tZW50KHRvKS51bml4KCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSkpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQodGFyZ2V0LmZyb20pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KHRhcmdldC5mcm9tKS51bml4KCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5pZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRbUm9sZS5NQVNURVIsIFJvbGUuQURNSU4sIFJvbGUuS0VZX01BTkFHRVJdXHJcblx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR1c2VySWQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJuby1hcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIkJvb2tpbmcgaGFzIGFscmVhZHkgYmVlbiBhcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LnVzZXJJZCAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLnVzZXJJZCAhPT0gdGFyZ2V0LnVzZXJJZDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEd1ZXN0LCBkZW55IGNoYW5nZXMgaWYgYXBwcm92ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5HVUVTVCAmJiB0YXJnZXQuYXBwcm92ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQuZmluaXNoZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEtleSBNYW5hZ2VyLCBkZW55IGlmIGJvb2tpbmcgaGFzIGZpbmlzaGVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR2ZWhpY2xlSWQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJuby1hcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIkJvb2tpbmcgaGFzIGFscmVhZHkgYmVlbiBhcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LnZlaGljbGVJZCAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLnZlaGljbGVJZCAhPT0gdGFyZ2V0LnZlaGljbGVJZDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEd1ZXN0IG9yIEtNLCBkZW55IGNoYW5nZXMgaWYgYXBwcm92ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlci5yb2xlID09PSBSb2xlLkdVRVNUIHx8XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0YXJnZXQuYXBwcm92ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRzdGFydEZ1ZWw6IHN0cmlwRmllbGQoeXVwLm51bWJlcigpLm51bGxhYmxlKCksIFtcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuTUFTVEVSLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5BRE1JTixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHRzdGFydE1pbGVhZ2U6IHN0cmlwRmllbGQoeXVwLm51bWJlcigpLm51bGxhYmxlKCksIFtcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuTUFTVEVSLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5BRE1JTixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHRhcHByb3ZlZDogc3RyaXBGaWVsZChcclxuXHRcdFx0XHRcdFx0XHRcdHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuYm9vbGVhbigpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5udWxsYWJsZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibm8tZmluaXNoZWQtYm9va2luZ1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiVGhpcyBib29raW5nIGhhcyBhbHJlYWR5IGZpbmlzaGVkLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LmFwcHJvdmVkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YS5hcHByb3ZlZCAhPT0gdGFyZ2V0LmFwcHJvdmVkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gIXRhcmdldC5maW5pc2hlZDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJwZW5kaW5nLW9ubHlcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBgQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuICR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5hcHByb3ZlZCA/IFwiYXBwcm92ZWRcIiA6IFwiZGVuaWVkXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1gO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8uYXBwcm92ZWQgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLmFwcHJvdmVkICE9PSB0YXJnZXQuYXBwcm92ZWQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBjaGFuZ2VkID8gdGFyZ2V0LmFwcHJvdmVkID09PSBudWxsIDogdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJib29raW5nLWV4cGlyZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcIkJvb2tpbmcgaGFzIGFscmVhZHkgZXhwaXJlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LmFwcHJvdmVkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YS5hcHByb3ZlZCAhPT0gdGFyZ2V0LmFwcHJvdmVkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9tZW50KHRhcmdldC5mcm9tKS5pc0FmdGVyKG1vbWVudCgpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRbUm9sZS5NQVNURVIsIFJvbGUuQURNSU4sIFJvbGUuS0VZX01BTkFHRVJdXHJcblx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRlbmRGdWVsOiBzdHJpcEZpZWxkKHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLCBbXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLk1BU1RFUixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuQURNSU4sXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLktFWV9NQU5BR0VSXHJcblx0XHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdFx0ZW5kTWlsZWFnZTogc3RyaXBGaWVsZCh5dXAubnVtYmVyKCkubnVsbGFibGUoKSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5NQVNURVIsXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLkFETUlOLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHBhaWQ6IHN0cmlwRmllbGQoeXVwLmJvb2xlYW4oKSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5NQVNURVIsXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLkFETUlOLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHJlcGxhY2VWZWhpY2xlOiB5dXAubGF6eShmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSWYgYm9va2luZyB0eXBlIGhhcyBiZWVuIGNoYW5nZWQgdG8gcmVwbGFjZW1lbnQsIHRoZW4gcmVxdWlyZSBhIHJlcGxhY2VtZW50IHZlaGljbGUuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGEuYm9va2luZ1R5cGUgPT09IEJvb2tpbmdUeXBlLlJFUExBQ0VNRU5UICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5ib29raW5nVHlwZSAhPT0gQm9va2luZ1R5cGUuUkVQTEFDRU1FTlRcclxuXHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9iamVjdCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpbjogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmFuZDogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogeXVwLnN0cmluZygpLnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5yZXF1aXJlZCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0YXJnZXQuYm9va2luZ1R5cGUgPT09IEJvb2tpbmdUeXBlLlJFUExBQ0VNRU5UKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIGV4aXN0aW5nIGJvb2tpbmcgdHlwZSBpcyBSZXBsYWNlbWVudCwgYWxsb3cgdXBkYXRpbmcgcGFydGlhbGx5LlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9iamVjdCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2aW46IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyYW5kOiB5dXAuc3RyaW5nKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogeXVwLnN0cmluZygpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKHYgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVwbGFjZVZlaGljbGUgPSBSZXBsYWNlVmVoaWNsZS5maW5kQnlQayhcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LnJlcGxhY2VWZWhpY2xlSWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geyAuLi52LCAuLi5yZXBsYWNlVmVoaWNsZSB9O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubWl4ZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubm90UmVxdWlyZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCgpID0+IG51bGwpO1xyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIEFQSV9PUEVSQVRJT04uQ1JFQVRFOiB7XHJcblx0XHRcdFx0XHRcdHNjaGVtYVxyXG5cdFx0XHRcdFx0XHRcdC5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRwYWlkOiBzdHJpcEZpZWxkKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR5dXAuYm9vbGVhbigpLmRlZmF1bHQoZmFsc2UpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRbUm9sZS5HVUVTVF0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRhbW91bnQ6IHN0cmlwRmllbGQoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5udWxsYWJsZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmRlZmF1bHQobnVsbCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFtSb2xlLkdVRVNUXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdHVzZXJJZDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVxdWlyZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImRiLW5vLWV4aXN0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KHsgdmFsdWUgfSkgPT4gYFVzZXIgd2l0aCBJRCAke3ZhbHVlfSBkb2VzIG5vdCBleGlzdC5gLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jIHZhbHVlID0+IEJvb2xlYW4oYXdhaXQgVXNlci5maW5kQnlQayh2YWx1ZSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHR2ZWhpY2xlSWQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJkYi1uby1leGlzdFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCh7IHZhbHVlIH0pID0+IGBWZWhpY2xlIHdpdGggSUQgJHt2YWx1ZX0gZG9lcyBub3QgZXhpc3QuYCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhc3luYyB2YWx1ZSA9PiBCb29sZWFuKGF3YWl0IFZlaGljbGUuZmluZEJ5UGsodmFsdWUpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZnJvbTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5kYXRlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodmFsdWUsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0dG86IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuZGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXF1aXJlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibm8tbG93ZXItdGhhbi1vdGhlclwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGBCb29raW5nIHRpbWUgZW5kIGNhbm5vdCBiZSBsb3dlciB0aGFuIHN0YXJ0aW5nIHRpbWUuYCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeyBwYXJlbnQgfSA9IHRoaXM7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9tZW50KHZhbHVlLCBcIlhcIikgPCBwYXJlbnQuZnJvbTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodmFsdWUsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym9va2luZ1R5cGU6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuc3RyaW5nKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lm9uZU9mKE9iamVjdC52YWx1ZXMoQm9va2luZ1R5cGUpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdHJlcGxhY2VWZWhpY2xlOiB5dXAubGF6eShmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB7IGNvbnRleHQgfSA9IG9wdGlvbnM7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0W1wiYm9va2luZ09wdGlvbnNcIl0uYm9va2luZ1R5cGUgPT09XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Qm9va2luZ1R5cGUuUkVQTEFDRU1FTlRcclxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9iamVjdCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpbjogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyYW5kOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kZWw6IHl1cC5zdHJpbmcoKS5yZXF1aXJlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5taXhlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCgpID0+IG51bGwpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm5vdFJlcXVpcmVkKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcInRpbWVzbG90LWF2YWlsYWJsZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJUaGUgdmVoaWNsZSBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgdGltZSBzcGVjaWZpZWQuXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRhc3luYyBmdW5jdGlvbih2KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh2ICYmIHYudmVoaWNsZUlkICYmIHYuZnJvbSAmJiB2LnRvKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgYm9va2VkVmVoaWNsZSA9IGF3YWl0IFZlaGljbGUuZmluZEJ5UGsodi52ZWhpY2xlSWQsIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGluY2x1ZGU6IFt7IG1vZGVsOiBCb29raW5nTW9kZWwgfV1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gIWlzQm9va2luZ1RpbWVTbG90VGFrZW4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib29rZWRWZWhpY2xlLmJvb2tpbmdzLm1hcChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KHsgZnJvbSwgdG8sIGFwcHJvdmVkLCBpZCB9KSA9PiAoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZyb206IG1vbWVudChmcm9tKS51bml4KCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG86IG1vbWVudCh0bykudW5peCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFwcHJvdmVkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0di5mcm9tLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0di50b1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFwicGVybWlzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJZb3UgZG8gbm90IGhhdmUgdGhlIHBlcm1pc3Npb24gdG8gZG8gdGhpcy5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGFzeW5jIGZ1bmN0aW9uKHYpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdXNlciA9IHRoaXMub3B0aW9ucy5jb250ZXh0W1widXNlclwiXSBhcyBVc2VyO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBhbGxvdyBndWVzdCB0byBjcmVhdGUgYm9va2luZ3Mgb24gaXRzZWxmLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUICYmIHYudXNlcklkID09PSB1c2VyLmlkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBhbGxvdyBib29raW5ncyBvbiB1c2VycyB3aXRoIHRoZSBzYW1lIGNsaWVudC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuS0VZX01BTkFHRVIgfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuQURNSU5cclxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5UGsodXNlci5pZCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldFVzZXIuY2xpZW50SWQgPT09IHVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5ERUxFVEU6IHtcclxuXHRcdFx0XHRcdFx0c2NoZW1hID0gc2NoZW1hLnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRhcHByb3ZlZDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQuYm9vbGVhbigpXHJcblx0XHRcdFx0XHRcdFx0XHQubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwibm90LWFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwiQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuIGFwcHJvdmVkIGFuZCBjYW5ub3QgYmUgZGVsZXRlZC5cIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgPT4gdmFsdWUgIT09IHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gc2NoZW1hO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIFl1cCBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuaW1wb3J0IHsgVXNlciwgVmVoaWNsZSBhcyBWZWhpY2xlTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IEFQSV9PUEVSQVRJT04gfSBmcm9tIFwiLi5cIjtcclxuaW1wb3J0IHsgVXBkYXRlVmVoaWNsZU9wdGlvbnMsIENyZWF0ZVZlaGljbGVPcHRpb25zIH0gZnJvbSBcIi4uL1ZlaGljbGVcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHtcclxuXHRWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRSb2xlLFxyXG5cdEJvb2tpbmdDaGFyZ2VVbml0XHJcbn0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbnR5cGUgVmFsaWRhdG9yUGFyYW1ldGVycyA9IFBhcmFtZXRlcnM8dHlwZW9mIFZlaGljbGUuZ2V0VmFsaWRhdG9yPjtcclxuXHJcbnR5cGUgVmVoaWNsZVZhbGlkYXRvckNvbnRleHRXaXRoU2NoZW1hID0gW1xyXG5cdFZhbGlkYXRvclBhcmFtZXRlcnNbMF0sXHJcblx0QVBJX09QRVJBVElPTixcclxuXHRWZWhpY2xlTW9kZWwsXHJcblx0VXBkYXRlVmVoaWNsZU9wdGlvbnMgfCBDcmVhdGVWZWhpY2xlT3B0aW9ucyxcclxuXHRib29sZWFuLFxyXG5cdFl1cC5PYmplY3RTY2hlbWE8VmVoaWNsZUF0dHJpYnV0ZXM+XHJcbl07XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWZWhpY2xlIHtcclxuXHRwdWJsaWMgc3RhdGljIGdldFZhbGlkYXRvciA9IChcclxuXHRcdHVzZXI6IFVzZXIsXHJcblx0XHRvcGVyYXRpb246IEFQSV9PUEVSQVRJT04sXHJcblx0XHRkYXRhPzoge1xyXG5cdFx0XHR0YXJnZXQ/OiBWZWhpY2xlTW9kZWw7XHJcblx0XHRcdG5ld0RhdGE/OiBVcGRhdGVWZWhpY2xlT3B0aW9ucyB8IENyZWF0ZVZlaGljbGVPcHRpb25zO1xyXG5cdFx0fVxyXG5cdCkgPT4gbmV3IFZhbGlkYXRvcihWZWhpY2xlLnZhbGlkYXRvclNjaGVtYSwgdXNlciwgb3BlcmF0aW9uLCBkYXRhKTtcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgdmFsaWRhdG9yU2NoZW1hID0gWXVwLm9iamVjdDxcclxuXHRcdE9taXQ8VmVoaWNsZUF0dHJpYnV0ZXMsIFwiaWRcIiB8IFwiY3JlYXRlZEF0XCIgfCBcInVwZGF0ZWRBdFwiPlxyXG5cdD4oKVxyXG5cdFx0LnNoYXBlKHtcclxuXHRcdFx0YnJhbmQ6IFl1cC5zdHJpbmcoKSxcclxuXHRcdFx0bW9kZWw6IFl1cC5zdHJpbmcoKSxcclxuXHRcdFx0cGxhdGVOdW1iZXI6IFl1cC5zdHJpbmcoKSxcclxuXHRcdFx0dmluOiBZdXAuc3RyaW5nKCksXHJcblx0XHRcdGRlZmxlZXRlZDogWXVwLmJvb2xlYW4oKSxcclxuXHRcdFx0cGFya2luZ0xvY2F0aW9uOiBZdXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0dmVoaWNsZUltYWdlU3JjOiBZdXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0Ym9va2luZ0NoYXJnZUNvdW50OiBZdXAubnVtYmVyKCksXHJcblx0XHRcdGJvb2tpbmdDaGFyZ2VVbml0OiBZdXAubWl4ZWQoKVxyXG5cdFx0XHRcdC5vbmVPZihPYmplY3QudmFsdWVzKEJvb2tpbmdDaGFyZ2VVbml0KSlcclxuXHRcdFx0XHQubnVsbGFibGUoKSxcclxuXHRcdFx0Ym9va2luZ0NoYXJnZTogWXVwLm51bWJlcigpLFxyXG5cdFx0XHRjbGllbnRJZDogWXVwLm51bWJlcigpLm51bGxhYmxlKCksXHJcblx0XHRcdGxvY2F0aW9uSWQ6IFl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHR3aWFsb25Vbml0SWQ6IFl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRhdmFpbGFibGU6IFl1cC5ib29sZWFuKClcclxuXHRcdH0pXHJcblx0XHQud2hlbihcclxuXHRcdFx0W1wiJHVzZXJcIiwgXCIkb3BlcmF0aW9uXCIsIFwiJHRhcmdldFwiLCBcIiRkYXRhXCIsIFwiJGNhc3RpbmdcIl0sXHJcblx0XHRcdCguLi5hcmdzOiBWZWhpY2xlVmFsaWRhdG9yQ29udGV4dFdpdGhTY2hlbWEpID0+IHtcclxuXHRcdFx0XHRsZXQgW3VzZXIsIG9wZXJhdGlvbiwgdGFyZ2V0LCBkYXRhLCBjYXN0aW5nLCBzY2hlbWFdID0gYXJncztcclxuXHJcblx0XHRcdFx0c3dpdGNoIChvcGVyYXRpb24pIHtcclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5SRUFEOiB7XHJcblx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IFl1cC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIEFQSV9PUEVSQVRJT04uQ1JFQVRFOiB7XHJcblx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYVxyXG5cdFx0XHRcdFx0XHRcdC5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRicmFuZDogWXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRtb2RlbDogWXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRib29raW5nQ2hhcmdlQ291bnQ6IFl1cC5udW1iZXIoKS5kZWZhdWx0KDApLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym9va2luZ0NoYXJnZTogWXVwLm51bWJlcigpLmRlZmF1bHQoMClcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJwZXJtaXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIllvdSBkbyBub3QgaGF2ZSB0aGUgcGVybWlzc2lvbiB0byBkbyB0aGlzLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2FzZSBBUElfT1BFUkFUSU9OLlVQREFURToge1xyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWFcclxuXHRcdFx0XHRcdFx0XHQuc2hhcGUoeyBpZDogWXVwLm51bWJlcigpLnJlcXVpcmVkKCkgfSlcclxuXHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFwicGVybWlzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJZb3UgZG8gbm90IGhhdmUgdGhlIHBlcm1pc3Npb24gdG8gZG8gdGhpcy5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5BRE1JTiB8fFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFyZ2V0LmNsaWVudElkID09PSB1c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBzY2hlbWE7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgQVBJX09QRVJBVElPTiB9IGZyb20gXCIuLi9cIjtcclxuaW1wb3J0IHsgT2JqZWN0U2NoZW1hIH0gZnJvbSBcInl1cFwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vQm9va2luZ1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yPFNjaGVtYSBleHRlbmRzIG9iamVjdCwgVGFyZ2V0LCBOZXdEYXRhPiB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHNjaGVtYTogT2JqZWN0U2NoZW1hPFNjaGVtYT4sXHJcblx0XHRwcml2YXRlIHVzZXI6IFVzZXIsXHJcblx0XHRwcml2YXRlIG9wZXJhdGlvbjogQVBJX09QRVJBVElPTixcclxuXHRcdHByaXZhdGUgdGFyZ2V0PzogVGFyZ2V0XHJcblx0KSB7fVxyXG5cclxuXHRwdWJsaWMgY2FzdCA9ICh2YWx1ZTogdW5rbm93bik6IFNjaGVtYSA9PiB7XHJcblx0XHRjb25zdCB7IHVzZXIsIG9wZXJhdGlvbiwgc2NoZW1hLCB0YXJnZXQgfSA9IHRoaXM7XHJcblxyXG5cdFx0cmV0dXJuIHNjaGVtYS5jYXN0KHZhbHVlLCB7XHJcblx0XHRcdHN0cmlwVW5rbm93bjogdHJ1ZSxcclxuXHRcdFx0Y29udGV4dDoge1xyXG5cdFx0XHRcdHVzZXIsXHJcblx0XHRcdFx0b3BlcmF0aW9uLFxyXG5cdFx0XHRcdHRhcmdldCxcclxuXHRcdFx0XHRkYXRhOiB2YWx1ZSxcclxuXHRcdFx0XHRjYXN0aW5nOiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyB2YWxpZGF0ZSA9ICh2YWx1ZTogdW5rbm93bikgPT4ge1xyXG5cdFx0Y29uc3QgeyB1c2VyLCBvcGVyYXRpb24sIHNjaGVtYSwgdGFyZ2V0IH0gPSB0aGlzO1xyXG5cdFx0cmV0dXJuIHNjaGVtYS52YWxpZGF0ZSh2YWx1ZSwge1xyXG5cdFx0XHRhYm9ydEVhcmx5OiBmYWxzZSxcclxuXHRcdFx0Y29udGV4dDoge1xyXG5cdFx0XHRcdHVzZXIsXHJcblx0XHRcdFx0b3BlcmF0aW9uLFxyXG5cdFx0XHRcdHRhcmdldDogdGFyZ2V0LFxyXG5cdFx0XHRcdGRhdGE6IHZhbHVlLFxyXG5cdFx0XHRcdGNhc3Rpbmc6IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhQ2FzdGVyPEF0dHJpYnV0ZXMgZXh0ZW5kcyBvYmplY3Q+IHtcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNjaGVtYTogT2JqZWN0U2NoZW1hPEF0dHJpYnV0ZXM+LCBwcml2YXRlIHVzZXI6IFVzZXIpIHt9XHJcblxyXG5cdHB1YmxpYyBjYXN0ID0gKGRhdGE6IHVua25vd24pOiBBdHRyaWJ1dGVzID0+IHtcclxuXHRcdHJldHVybiB0aGlzLnNjaGVtYS5jYXN0KGRhdGEsIHtcclxuXHRcdFx0Y29udGV4dDoge1xyXG5cdFx0XHRcdG9wZXJhdGlvbjogQVBJX09QRVJBVElPTi5SRUFELFxyXG5cdFx0XHRcdHVzZXI6IHRoaXMudXNlclxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHl1cCBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcImV4cHJlc3MtdmFsaWRhdG9yXCI7XHJcblxyXG50eXBlIFNjaGVtYUhlbHBlcjxUPiA9IChzY2hlbWE6IFQpID0+IFQ7XHJcblxyXG50eXBlIFRlc3RTY2hlbWFIZWxwZXIgPSAoXHJcblx0dGhpczogeXVwLlRlc3RDb250ZXh0LFxyXG5cdHZhbHVlPzogYW55XHJcbikgPT4gYm9vbGVhbiB8IHl1cC5WYWxpZGF0aW9uRXJyb3IgfCBQcm9taXNlPGJvb2xlYW4gfCB5dXAuVmFsaWRhdGlvbkVycm9yPjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gc2NoZW1hIFl1cCBzY2hlbWFcclxuICogQHBhcmFtIHN0cmlwRm91bmRcclxuICogQHZhbHVlIHRydWUgLSBzdHJpcCBmaWVsZCBpZiBmb3VuZC5cclxuICogQHZhbHVlIGZhbHNlIC0gc3RyaXAgZmllbGQgaWYgbm90IGZvdW5kLlxyXG4gKiBAcGFyYW0gcm9sZXMgcm9sZXMgdG8gc2VhcmNoLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlcXVpcmVSb2xlID0gPFQ+KHJvbGVzOiBSb2xlW10pOiBUZXN0U2NoZW1hSGVscGVyID0+XHJcblx0ZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zdCB1c2VyID0gdGhpcy5vcHRpb25zLmNvbnRleHRbXCJ1c2VyXCJdIGFzIFVzZXI7XHJcblx0XHRjb25zdCBleGlzdHMgPSByb2xlcy5pbmNsdWRlcyh1c2VyLnJvbGUpO1xyXG5cclxuXHRcdGlmICghZXhpc3RzKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBrZXkgS2V5IG9mIG9iamVjdCB3aGVyZSB0aGUgdXNlciBJZCB3aWxsIGJlIGNvbXBhcmVkLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNlbGZPbmx5ID0gKGtleTogc3RyaW5nID0gXCJ1c2VySWRcIik6IFRlc3RTY2hlbWFIZWxwZXIgPT5cclxuXHRmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMub3B0aW9ucy5jb250ZXh0W1widXNlclwiXSBhcyBVc2VyO1xyXG5cdFx0aWYgKHZhbHVlW2tleV0gPT09IHVzZXIuaWQpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gc2NoZW1hIFl1cCBzY2hlbWFcclxuICogQHBhcmFtIHN0cmlwRm91bmRcclxuICogQHZhbHVlIHRydWUgLSBzdHJpcCBmaWVsZCBpZiBmb3VuZC5cclxuICogQHZhbHVlIGZhbHNlIC0gc3RyaXAgZmllbGQgaWYgbm90IGZvdW5kLlxyXG4gKiBAcGFyYW0gcm9sZXMgcm9sZXMgdG8gc2VhcmNoLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHN0cmlwRmllbGQgPSA8VCBleHRlbmRzIHl1cC5TY2hlbWE8YW55Pj4oXHJcblx0c2NoZW1hOiBULFxyXG5cdHJvbGVzOiBSb2xlW10sXHJcblx0c3RyaXBGb3VuZDogYm9vbGVhbiA9IGZhbHNlXHJcbik6IHl1cC5MYXp5ID0+IHtcclxuXHRyZXR1cm4geXVwLmxhenk8VD4oKHZhbHVlLCBvcHRpb25zKSA9PiB7XHJcblx0XHRjb25zdCB1c2VyID0gb3B0aW9ucy5jb250ZXh0W1widXNlclwiXSBhcyBVc2VyO1xyXG5cdFx0Y29uc3QgZXhpc3RzID0gcm9sZXMuaW5jbHVkZXModXNlci5yb2xlKTtcclxuXHJcblx0XHRpZiAoZXhpc3RzICYmIHN0cmlwRm91bmQpIHtcclxuXHRcdFx0cmV0dXJuIHl1cC5taXhlZCgpLnN0cmlwKHRydWUpO1xyXG5cdFx0fSBlbHNlIGlmICghZXhpc3RzICYmICFzdHJpcEZvdW5kKSB7XHJcblx0XHRcdHJldHVybiB5dXAubWl4ZWQoKS5zdHJpcCh0cnVlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzY2hlbWE7XHJcblx0fSk7XHJcbn07XHJcbiIsImNvbnN0IHtcclxuXHREQVRBQkFTRV9OQU1FLFxyXG5cdERBVEFCQVNFX1VTRVJOQU1FLFxyXG5cdERBVEFCQVNFX1BBU1NXT1JELFxyXG5cdERBVEFCQVNFX0hPU1QsXHJcblx0REFUQUJBU0VfUE9SVCxcclxuXHRNQUlMX1VTRVIsXHJcblx0TUFJTF9QQVNTLFxyXG5cdE1BSUxfUE9SVCxcclxuXHRNQUlMX0hPU1QsXHJcblx0U0VSVkVSX1BPUlQsXHJcblx0U0VSVkVSX1VSTCxcclxuXHRTRUNSRVRfS0VZXHJcbn0gPSBwcm9jZXNzLmVudjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRkYXRhYmFzZToge1xyXG5cdFx0bmFtZTogREFUQUJBU0VfTkFNRSxcclxuXHRcdHVzZXJuYW1lOiBEQVRBQkFTRV9VU0VSTkFNRSxcclxuXHRcdHBhc3N3b3JkOiBEQVRBQkFTRV9QQVNTV09SRCxcclxuXHRcdGhvc3Q6IERBVEFCQVNFX0hPU1QsXHJcblx0XHRwb3J0OiBEQVRBQkFTRV9QT1JULFxyXG5cdFx0c2VxdWVsaXplOiB7XHJcblx0XHRcdGRpYWxlY3Q6IDxjb25zdD5cIm15c3FsXCIsXHJcblx0XHRcdHBvb2w6IHtcclxuXHRcdFx0XHRtYXg6IDUsXHJcblx0XHRcdFx0bWluOiAwLFxyXG5cdFx0XHRcdGFjcXVpcmU6IDMwMDAwLFxyXG5cdFx0XHRcdGlkbGU6IDEwMDAwXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdG1haWw6IHtcclxuXHRcdGF1dGg6IHtcclxuXHRcdFx0dXNlcjogTUFJTF9VU0VSLFxyXG5cdFx0XHRwYXNzOiBNQUlMX1BBU1NcclxuXHRcdH0sXHJcblx0XHRwb3J0OiBNQUlMX1BPUlQsXHJcblx0XHRzZWN1cmU6IHRydWUsXHJcblx0XHRob3N0OiBNQUlMX0hPU1RcclxuXHR9LFxyXG5cdHNlcnZlclBvcnQ6IFNFUlZFUl9QT1JULFxyXG5cdHNlcnZlclVybDogU0VSVkVSX1VSTCxcclxuXHRzZWNyZXRLZXk6IFNFQ1JFVF9LRVlcclxufTtcclxuIiwiaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbixcclxuXHRJbnZhbGlkSW5wdXRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBleGNlcHRGaWVsZHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjaWRlbnQgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHR1c2VyOiBVc2VyQWNjZXNzb3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiOiBhbnksIHVzZXJBY2Nlc3NvcjogVXNlckFjY2Vzc29yKSB7XHJcblx0XHRzdXBlcihkYik7XHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyQWNjZXNzb3I7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXQoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQWNjaWRlbnQgPSBhd2FpdCB0aGlzLmdldEFjY2lkZW50KGlkLCB7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKFxyXG5cdFx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRBY2NpZGVudCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5BQ0NJREVOVFMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZEFjY2lkZW50XHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmb3VuZEFjY2lkZW50O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQWNjaWRlbnRzID0gYXdhaXQgdGhpcy5nZXRBY2NpZGVudHMoe1xyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhcclxuXHRcdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0XHRPcGVyYXRpb24uUkVBRCxcclxuXHRcdFx0XHRcdFJlc291cmNlLkFDQ0lERU5UU1xyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgYm9va2luZ3MgPSBbXTtcclxuXHRcdGZvciAobGV0IGJvb2tpbmcgb2YgZm91bmRBY2NpZGVudHMpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0XHRyb2xlLFxyXG5cdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFJlc291cmNlLkFDQ0lERU5UUyxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdFx0dGFyZ2V0OiBib29raW5nXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoYWNjZXNzaWJsZSkge1xyXG5cdFx0XHRcdGJvb2tpbmdzLnB1c2goYm9va2luZyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYm9va2luZ3M7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGUoaWQ6IG51bWJlciwgZGF0YTogYW55KTogUHJvbWlzZTxbYW55LCBhbnldPiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQWNjaWRlbnQgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLlVQREFURSxcclxuXHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kQWNjaWRlbnQsXHJcblx0XHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRhd2FpdCBmb3VuZEFjY2lkZW50LnVwZGF0ZShkYXRhKTtcclxuXHJcblx0XHRpZiAoZGF0YS5yZWFkKSB7XHJcblx0XHRcdGxldCBmb3VuZFVzZXIgPSBhd2FpdCB0aGlzLmdldFVzZXIodGhpcy51c2VyLmlkKTtcclxuXHRcdFx0Zm91bmRBY2NpZGVudC5zZXRVc2VyU3RhdHVzKGZvdW5kVXNlciwge1xyXG5cdFx0XHRcdHRocm91Z2g6IHsgcmVhZDogdHJ1ZSB9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFtmb3VuZEFjY2lkZW50LCB0aGlzLmdldChpZCldO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZEFjY2lkZW50ID0gYXdhaXQgdGhpcy5nZXQoaWQpO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4oXHJcblx0XHRcdHJvbGUsXHJcblx0XHRcdE9wZXJhdGlvbi5ERUxFVEUsXHJcblx0XHRcdFJlc291cmNlLkFDQ0lERU5UUyxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0dGFyZ2V0OiBmb3VuZEFjY2lkZW50XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRBY2NpZGVudC5kZXN0cm95KCk7XHJcblx0XHRyZXR1cm4gZm91bmRBY2NpZGVudDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZShkYXRhOiBhbnkpIHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLkNSRUFURSxcclxuXHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHRib2R5OiBkYXRhXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0XHRjb25zdCBhY2NpZGVudFZlaGljbGUgPSBhd2FpdCB0aGlzLmdldFZlaGljbGUoZGF0YS52ZWhpY2xlSWQpO1xyXG5cclxuXHRcdGlmICghYWNjaWRlbnRWZWhpY2xlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkSW5wdXRFeGNlcHRpb24oXCJWZWhpY2xlIGlzIG5vdCBmb3VuZC5cIiwgW1widmVoaWNsZUlkXCJdKTtcclxuXHRcdH1cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRhd2FpdCBhY2NpZGVudFZlaGljbGUudXBkYXRlKHtcclxuXHRcdFx0ZGVmbGVldGVkOiB0cnVlXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVBY2NpZGVudChcclxuXHRcdFx0ZXhjZXB0RmllbGRzKFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0UkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhyb2xlLCBPcGVyYXRpb24uQ1JFQVRFLCBSZXNvdXJjZS5BQ0NJREVOVFMpXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IFdpYWxvbiB9IGZyb20gXCJub2RlLXdpYWxvblwiO1xyXG5pbXBvcnQgeyBPcCB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IHRvTXlTUUxEYXRlLCBleGNlcHRGaWVsZHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgQm9va2luZ1R5cGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgVXNlciwgVmVoaWNsZSwgTG9jYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IHNlbmRCb29raW5nTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG5cdHVzZXI6IFVzZXJBY2Nlc3NvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiKTtcclxuXHRcdHRoaXMudXNlciA9IHVzZXJBY2Nlc3NvcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldChpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRCb29raW5nID0gYXdhaXQgdGhpcy5nZXRCb29raW5nKGlkLCB7XHJcblx0XHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RlbDogVXNlclxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XSxcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRCb29raW5nKSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkJPT0tJTkdTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRCb29raW5nXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm91bmRCb29raW5nO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQm9va2luZ3MgPSBhd2FpdCB0aGlzLmdldEJvb2tpbmdzKHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbmNsdWRlOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bW9kZWw6IFVzZXJcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdFx0bGV0IGJvb2tpbmdzID0gW107XHJcblx0XHRmb3IgKGxldCBib29raW5nIG9mIGZvdW5kQm9va2luZ3MpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuQk9PS0lOR1MsIHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogYm9va2luZ1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHRib29raW5ncy5wdXNoKGJvb2tpbmcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJvb2tpbmdzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGlkOiBudW1iZXIsIGRhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQm9va2luZyA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5VUERBVEUsIFJlc291cmNlLkJPT0tJTkdTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRCb29raW5nLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEucmVwbGFjZVZlaGljbGUpIHtcclxuXHRcdFx0Y29uc3QgcmVwbGFjZVZlaGljbGUgPSBhd2FpdCB0aGlzLmRiLlJlcGxhY2VWZWhpY2xlLmZpbmRCeVBrKFxyXG5cdFx0XHRcdGZvdW5kQm9va2luZy5yZXBsYWNlVmVoaWNsZUlkXHJcblx0XHRcdCk7XHJcblx0XHRcdGlmIChyZXBsYWNlVmVoaWNsZSkge1xyXG5cdFx0XHRcdGF3YWl0IHJlcGxhY2VWZWhpY2xlLnVwZGF0ZShkYXRhLnJlcGxhY2VWZWhpY2xlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhd2FpdCByZXBsYWNlVmVoaWNsZS5jcmVhdGUoZGF0YS5yZXBsYWNlVmVoaWNsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdGZvdW5kQm9va2luZy5yZXBsYWNlVmVoaWNsZSAhPT0gbnVsbCAmJlxyXG5cdFx0XHRkYXRhLnJlcGxhY2VWZWhpY2xlID09PSB1bmRlZmluZWRcclxuXHRcdCkge1xyXG5cdFx0XHRjb25zdCByZXBsYWNlVmVoaWNsZSA9IGF3YWl0IHRoaXMuZGIuUmVwbGFjZVZlaGljbGUuZmluZEJ5UGsoXHJcblx0XHRcdFx0Zm91bmRCb29raW5nLnJlcGxhY2VWZWhpY2xlSWRcclxuXHRcdFx0KTtcclxuXHRcdFx0cmVwbGFjZVZlaGljbGUuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IGZvdW5kQm9va2luZy51cGRhdGUoe1xyXG5cdFx0XHQuLi5kYXRhLFxyXG5cdFx0XHRmcm9tOiBkYXRhLmZyb20gJiYgdG9NeVNRTERhdGUoZGF0YS5mcm9tKSxcclxuXHRcdFx0dG86IGRhdGEuZnJvbSAmJiB0b015U1FMRGF0ZShkYXRhLnRvKVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoaWQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZEJvb2tpbmcgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uREVMRVRFLCBSZXNvdXJjZS5CT09LSU5HUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHR0YXJnZXQ6IGZvdW5kQm9va2luZ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRCb29raW5nLmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZEJvb2tpbmc7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGUoZGF0YTogYW55KSB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLkNSRUFURSwgUmVzb3VyY2UuQk9PS0lOR1MsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgcmVwbGFjZW1lbnRWZWhpY2xlO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkYXRhLmJvb2tpbmdUeXBlID09PSBCb29raW5nVHlwZS5SRVBMQUNFTUVOVCkge1xyXG5cdFx0XHRcdGNvbnN0IHsgYnJhbmQsIG1vZGVsLCBwbGF0ZU51bWJlciwgdmluIH0gPSBkYXRhO1xyXG5cdFx0XHRcdHJlcGxhY2VtZW50VmVoaWNsZSA9IGF3YWl0IHRoaXMuZGIuUmVwbGFjZVZlaGljbGUuY3JlYXRlKHtcclxuXHRcdFx0XHRcdGJyYW5kLFxyXG5cdFx0XHRcdFx0bW9kZWwsXHJcblx0XHRcdFx0XHRwbGF0ZU51bWJlcixcclxuXHRcdFx0XHRcdHZpblxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgZXhjZXB0aW9ucyA9IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMoXHJcblx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRPcGVyYXRpb24uQ1JFQVRFLFxyXG5cdFx0XHRcdFJlc291cmNlLkJPT0tJTkdTXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRsZXQgY3JlYXRlZEJvb2tpbmcgPSBhd2FpdCB0aGlzLmNyZWF0ZUJvb2tpbmcoe1xyXG5cdFx0XHRcdHVzZXJJZDogcm9sZSA9PT0gUm9sZS5HVUVTVCA/IHRoaXMudXNlci5pZCA6IGRhdGEudXNlcklkLFxyXG5cdFx0XHRcdC4uLmV4Y2VwdEZpZWxkcyhkYXRhLCBleGNlcHRpb25zKSxcclxuXHRcdFx0XHR0bzogdG9NeVNRTERhdGUoZGF0YS50byksXHJcblx0XHRcdFx0ZnJvbTogdG9NeVNRTERhdGUoZGF0YS5mcm9tKSxcclxuXHRcdFx0XHRyZXBsYWNlVmVoaWNsZUlkOiAocmVwbGFjZW1lbnRWZWhpY2xlICYmIHJlcGxhY2VtZW50VmVoaWNsZS5pZCkgfHwgbnVsbFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCB1c2VyID0gYXdhaXQgdGhpcy5nZXRVc2VyKFxyXG5cdFx0XHRcdHJvbGUgPT09IFJvbGUuR1VFU1QgPyB0aGlzLnVzZXIuaWQgOiBkYXRhLnVzZXJJZFxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdFx0VXNlci5maW5kQWxsKHtcclxuXHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdGNsaWVudElkOiB1c2VyLmNsaWVudElkLFxyXG5cdFx0XHRcdFx0XHRyb2xlOiB7XHJcblx0XHRcdFx0XHRcdFx0W09wLmluXTogW1JvbGUuQURNSU4sIFJvbGUuS0VZX01BTkFHRVJdXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS50aGVuKGFzeW5jIHVzZXJzID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHZlaGljbGUgPSBhd2FpdCBWZWhpY2xlLmZpbmRCeVBrKGRhdGEudmVoaWNsZUlkKTtcclxuXHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgTG9jYXRpb24uZmluZEJ5UGsodmVoaWNsZS5sb2NhdGlvbklkKTtcclxuXHJcblx0XHRcdFx0XHRsZXQgbG5nID0gbG9jYXRpb24ubG5nO1xyXG5cdFx0XHRcdFx0bGV0IGxhdCA9IGxvY2F0aW9uLmxhdDtcclxuXHJcblx0XHRcdFx0XHRpZiAodmVoaWNsZS53aWFsb25Vbml0SWQpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdyA9IGF3YWl0IFdpYWxvbi5sb2dpbih7XHJcblx0XHRcdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdW5pdCA9IGF3YWl0IHcuQ29yZS5zZWFyY2hJdGVtKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogdmVoaWNsZS53aWFsb25Vbml0SWQsXHJcblx0XHRcdFx0XHRcdFx0ZmxhZ3M6IDEwMjQgKyA4MTkyXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodW5pdCkge1xyXG5cdFx0XHRcdFx0XHRcdGxhdCA9IHVuaXQuaXRlbSAmJiB1bml0Lml0ZW0ucG9zICYmIHVuaXQuaXRlbS5wb3MueTtcclxuXHRcdFx0XHRcdFx0XHRsbmcgPSB1bml0Lml0ZW0gJiYgdW5pdC5pdGVtLnBvcyAmJiB1bml0Lml0ZW0ucG9zLng7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbmRCb29raW5nTm90aWZpY2F0aW9uKHtcclxuXHRcdFx0XHRcdFx0XHRcdGVtYWlsOiB1c2VyLmVtYWlsLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGJvb2tpbmdJZDogY3JlYXRlZEJvb2tpbmcuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21lckVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXHJcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21lck5hbWU6IGAke3RoaXMudXNlci5maXJzdE5hbWV9ICR7dGhpcy51c2VyLmxhc3ROYW1lfWAsXHJcblx0XHRcdFx0XHRcdFx0XHRmcm9tOiBjcmVhdGVkQm9va2luZy5mcm9tLFxyXG5cdFx0XHRcdFx0XHRcdFx0dG86IGNyZWF0ZWRCb29raW5nLnRvLFxyXG5cdFx0XHRcdFx0XHRcdFx0bGF0LFxyXG5cdFx0XHRcdFx0XHRcdFx0bG5nLFxyXG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb246IGxvY2F0aW9uLm5hbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRtb2JpbGU6IHRoaXMudXNlci5tb2JpbGVOdW1iZXIsXHJcblx0XHRcdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlciB8fCBcIk4vQVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0dmVoaWNsZTogYCR7dmVoaWNsZS5icmFuZH0gJHt2ZWhpY2xlLm1vZGVsfWAsXHJcblx0XHRcdFx0XHRcdFx0XHR2ZWhpY2xlSWQ6IHZlaGljbGUuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHR0aW1lWm9uZTogdXNlci50aW1lWm9uZVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjcmVhdGVkQm9va2luZztcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVwbGFjZW1lbnRWZWhpY2xlICYmIChhd2FpdCByZXBsYWNlbWVudFZlaGljbGUuZGVzdHJveSgpKTtcclxuXHRcdFx0dGhyb3cgZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnQgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHRjb25zdHJ1Y3RvcihkYjogYW55LCB1c2VyQWNjZXNzb3I6IFVzZXJBY2Nlc3Nvcikge1xyXG5cdFx0c3VwZXIoZGIsIHVzZXJBY2Nlc3NvciwgUmVzb3VyY2UuQ0xJRU5UUyk7XHJcblx0fVxyXG5cclxuXHRnZXQgPSBhc3luYyAoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQ2xpZW50ID0gYXdhaXQgdGhpcy5nZXRDbGllbnQoaWQsIHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkNMSUVOVFMpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFmb3VuZENsaWVudCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgQ2xpZW50IHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkNMSUVOVFMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZENsaWVudFxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm91bmRDbGllbnQ7XHJcblx0fTtcclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQ2xpZW50cyA9IGF3YWl0IHRoaXMuZ2V0Q2xpZW50cyh7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5DTElFTlRTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGxldCB2ZWhpY2xlcyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgdmVoaWNsZSBvZiBmb3VuZENsaWVudHMpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuQ0xJRU5UUywge1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0dGFyZ2V0OiB2ZWhpY2xlXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoYWNjZXNzaWJsZSkge1xyXG5cdFx0XHRcdHZlaGljbGVzLnB1c2godmVoaWNsZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmVoaWNsZXM7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUgPSBhc3luYyAoaWQ6IG51bWJlciwgZGF0YT86IGFueSk6IFByb21pc2U8W2FueSwgYW55XT4gPT4ge1xyXG5cdFx0bGV0IGZvdW5kQ2xpZW50ID0gYXdhaXQgdGhpcy5nZXQoaWQpO1xyXG5cclxuXHRcdGNvbnN0IHsgYWNjZXNzLCBleGNsdWRlZEZpZWxkcyB9ID0gYXdhaXQgdGhpcy5nZXRVc2VyUGVybWlzc2lvbnMoXHJcblx0XHRcdE9wZXJhdGlvbi5VUERBVEUsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogZm91bmRDbGllbnRcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHRcdGlmICghYWNjZXNzKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEubG9jYXRpb25zICYmICFleGNsdWRlZEZpZWxkcy5pbmNsdWRlcyhcImxvY2F0aW9uc1wiKSkge1xyXG5cdFx0XHRhd2FpdCBmb3VuZENsaWVudC5zZXRMb2NhdGlvbnMoZGF0YS5sb2NhdGlvbnMpO1xyXG5cdFx0XHRhd2FpdCBWZWhpY2xlLnVwZGF0ZShcclxuXHRcdFx0XHR7IGNsaWVudElkOiBudWxsIH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0d2hlcmU6IHsgY2xpZW50SWQ6IGlkLCBsb2NhdGlvbklkOiB7IFtPcC5ub3RJbl06IGRhdGEubG9jYXRpb25zIH0gfVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhLnVzZXJzICYmICFleGNsdWRlZEZpZWxkcy5pbmNsdWRlcyhcInVzZXJzXCIpKSB7XHJcblx0XHRcdGF3YWl0IGZvdW5kQ2xpZW50LnNldFVzZXJzKGRhdGEudXNlcnMpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEudmVoaWNsZXMgJiYgIWV4Y2x1ZGVkRmllbGRzLmluY2x1ZGVzKFwidmVoaWNsZXNcIikpIHtcclxuXHRcdFx0YXdhaXQgZm91bmRDbGllbnQuc2V0VmVoaWNsZXMoZGF0YS52ZWhpY2xlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0YXdhaXQgZm91bmRDbGllbnQudXBkYXRlKFxyXG5cdFx0XHRfLm9taXQoZGF0YSwgWy4uLmV4Y2x1ZGVkRmllbGRzLCBcImxvY2F0aW9uc1wiLCBcInVzZXJzXCIsIFwidmVoaWNsZXNcIl0pXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiBbZm91bmRDbGllbnQsIGF3YWl0IHRoaXMuZ2V0KGlkKV07XHJcblx0fTtcclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZENsaWVudCA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5ERUxFVEUsIFJlc291cmNlLkNMSUVOVFMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZENsaWVudFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRDbGllbnQuZGVzdHJveSgpO1xyXG5cdFx0cmV0dXJuIGZvdW5kQ2xpZW50O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlKGRhdGE6IG9iamVjdCkge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5DUkVBVEUsIFJlc291cmNlLkNMSUVOVFMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRsZXQgY3JlYXRlZENsaWVudCA9IGF3YWl0IHRoaXMuY3JlYXRlQ2xpZW50KGRhdGEpO1xyXG5cdFx0cmV0dXJuIGNyZWF0ZWRDbGllbnQ7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7IE9wZXJhdGlvbiwgUmVzb3VyY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERhdGFTb3VyY2Uge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJvdGVjdGVkIGRiOiBhbnksXHJcblx0XHRwcm90ZWN0ZWQgdXNlcj86IFVzZXJBY2Nlc3NvcixcclxuXHRcdHByb3RlY3RlZCByZXNvdXJjZT86IFJlc291cmNlXHJcblx0KSB7fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VXNlclBlcm1pc3Npb25zID0gYXN5bmMgKFxyXG5cdFx0YWN0aW9uOiBPcGVyYXRpb24sXHJcblx0XHRwYXJhbXM/OiBhbnlcclxuXHQpOiBQcm9taXNlPHsgYWNjZXNzOiBib29sZWFuOyBleGNsdWRlZEZpZWxkczogc3RyaW5nW10gfT4gPT4ge1xyXG5cdFx0aWYgKHRoaXMudXNlciAmJiB0aGlzLnJlc291cmNlKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0YWNjZXNzOiBhd2FpdCBSQkFDLmNhbih0aGlzLnVzZXIucm9sZSwgYWN0aW9uLCB0aGlzLnJlc291cmNlLCBwYXJhbXMpLFxyXG5cdFx0XHRcdGV4Y2x1ZGVkRmllbGRzOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKFxyXG5cdFx0XHRcdFx0dGhpcy51c2VyLnJvbGUsXHJcblx0XHRcdFx0XHRhY3Rpb24sXHJcblx0XHRcdFx0XHR0aGlzLnJlc291cmNlXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHsgYWNjZXNzOiBmYWxzZSwgZXhjbHVkZWRGaWVsZHM6IFtdIH07XHJcblx0fTtcclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZVZlaGljbGUoZGF0YTogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLlZlaGljbGUuY3JlYXRlKGRhdGEpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldFZlaGljbGVzKG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuVmVoaWNsZS5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldFZlaGljbGUoaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5WZWhpY2xlLmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlVXNlcihkYXRhOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuVXNlci5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VXNlcnMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Vc2VyLmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VXNlcihpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLlVzZXIuZmluZEJ5UGsoaWQsIHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUxvY2F0aW9uKGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Mb2NhdGlvbi5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRMb2NhdGlvbnMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Mb2NhdGlvbi5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0TG9jYXRpb24oaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Mb2NhdGlvbi5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUJvb2tpbmcoZGF0YTogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkJvb2tpbmcuY3JlYXRlKGRhdGEpO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0Qm9va2luZ3Mob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Cb29raW5nLmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRCb29raW5nKGlkOiBudW1iZXIsIG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuQm9va2luZy5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUFjY2lkZW50KGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5BY2NpZGVudC5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRBY2NpZGVudHMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5BY2NpZGVudC5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0QWNjaWRlbnQoaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5BY2NpZGVudC5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUNsaWVudChkYXRhOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuQ2xpZW50LmNyZWF0ZShkYXRhKTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldENsaWVudHMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DbGllbnQuZmluZEFsbCh7IC4uLm9wdGlvbnMsIGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XSB9KTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldENsaWVudChpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkNsaWVudC5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUNhdGVnb3J5KGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DYXRlZ29yeS5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRDYXRlZ29yeXMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DYXRlZ29yeS5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0Q2F0ZWdvcnkoaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DYXRlZ29yeS5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgRGF0YVNvdXJjZSBmcm9tIFwiLi9EYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IFJvbGUsIE9wZXJhdGlvbiwgUmVzb3VyY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IFVzZXJBY2Nlc3NvciBmcm9tIFwiLi90eXBlcy9Vc2VyQWNjZXNzb3JcIjtcclxuaW1wb3J0IFJCQUMgZnJvbSBcIi4uL3V0aWxzL3JiYWNcIjtcclxuaW1wb3J0IHtcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbixcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYXRpb24gZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHR1c2VyOiBVc2VyQWNjZXNzb3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiOiBhbnksIHVzZXJBY2Nlc3NvcjogVXNlckFjY2Vzc29yKSB7XHJcblx0XHRzdXBlcihkYik7XHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyQWNjZXNzb3I7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXQoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb24gPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uKGlkLCB7XHJcblx0XHRcdGluY2x1ZGU6IFt7IG1vZGVsOiBDbGllbnQgfV0sXHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKFxyXG5cdFx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFx0UmVzb3VyY2UuTE9DQVRJT05TXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRMb2NhdGlvbikge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5MT0NBVElPTlMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZExvY2F0aW9uXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmb3VuZExvY2F0aW9uO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb25zID0gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbnMoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogQ2xpZW50IH1dLFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhcclxuXHRcdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0XHRPcGVyYXRpb24uUkVBRCxcclxuXHRcdFx0XHRcdFJlc291cmNlLkxPQ0FUSU9OU1xyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgbG9jYXRpb25zID0gW107XHJcblx0XHRmb3IgKGxldCBsb2NhdGlvbiBvZiBmb3VuZExvY2F0aW9ucykge1xyXG5cdFx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0T3BlcmF0aW9uLlJFQUQsXHJcblx0XHRcdFx0UmVzb3VyY2UuTE9DQVRJT05TLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0XHR0YXJnZXQ6IGxvY2F0aW9uXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoYWNjZXNzaWJsZSkge1xyXG5cdFx0XHRcdGxvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBsb2NhdGlvbnM7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGUoaWQ6IG51bWJlciwgZGF0YT86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb24gPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLlVQREFURSxcclxuXHRcdFx0UmVzb3VyY2UuTE9DQVRJT05TLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kTG9jYXRpb24sXHJcblx0XHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kTG9jYXRpb24udXBkYXRlKGRhdGEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0KGlkKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRMb2NhdGlvbiA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRyb2xlLFxyXG5cdFx0XHRPcGVyYXRpb24uREVMRVRFLFxyXG5cdFx0XHRSZXNvdXJjZS5MT0NBVElPTlMsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogZm91bmRMb2NhdGlvblxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kTG9jYXRpb24uZGVzdHJveSgpO1xyXG5cdFx0cmV0dXJuIGZvdW5kTG9jYXRpb247XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGUoZGF0YTogb2JqZWN0KSB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4oXHJcblx0XHRcdHJvbGUsXHJcblx0XHRcdE9wZXJhdGlvbi5DUkVBVEUsXHJcblx0XHRcdFJlc291cmNlLkxPQ0FUSU9OUyxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGNyZWF0ZWRVc2VyID0gYXdhaXQgdGhpcy5jcmVhdGVMb2NhdGlvbihkYXRhKTtcclxuXHRcdHJldHVybiBjcmVhdGVkVXNlcjtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBPcGVyYXRpb24sIFJlc291cmNlLCBSb2xlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7IGV4Y2VwdEZpZWxkcyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG5cdEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLFxyXG5cdFJlc291cmNlTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG5cdHVzZXI6IFVzZXJBY2Nlc3NvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiKTtcclxuXHRcdHRoaXMudXNlciA9IHVzZXJBY2Nlc3NvcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldChpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRVc2VyID0gYXdhaXQgdGhpcy5nZXRVc2VyKGlkLCB7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBbXHJcblx0XHRcdFx0XHQuLi5SQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5VU0VSUyksXHJcblx0XHRcdFx0XHRcInBhc3N3b3JkXCJcclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFmb3VuZFVzZXIpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24oXHJcblx0XHRcdFx0YFVzZXIgd2l0aCBJRCBvZiAke2lkfSBpcyBub3QgZm91bmQuYFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuVVNFUlMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZFVzZXJcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZm91bmRVc2VyO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVXNlcnMgPSBhd2FpdCB0aGlzLmdldFVzZXJzKHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFtcclxuXHRcdFx0XHRcdC4uLlJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTKSxcclxuXHRcdFx0XHRcdFwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgdXNlcnMgPSBbXTtcclxuXHRcdGZvciAobGV0IHVzZXIgb2YgZm91bmRVc2Vycykge1xyXG5cdFx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5VU0VSUywge1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0dGFyZ2V0OiB1c2VyXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoYWNjZXNzaWJsZSkge1xyXG5cdFx0XHRcdHVzZXJzLnB1c2godXNlcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXNlcnM7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGUoaWQ6IG51bWJlciwgZGF0YT86IG9iamVjdCwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVXNlciA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHRcdGlmICghZm91bmRVc2VyKSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlVQREFURSwgUmVzb3VyY2UuVVNFUlMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZFVzZXIsXHJcblx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGhhc2hlZFBhc3N3b3JkID1cclxuXHRcdFx0ZGF0YVtcInBhc3N3b3JkXCJdICYmIChhd2FpdCBiY3J5cHQuaGFzaChkYXRhW1wicGFzc3dvcmRcIl0sIDEwKSk7XHJcblx0XHRhd2FpdCBmb3VuZFVzZXIudXBkYXRlKFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Li4uZXhjZXB0RmllbGRzKGRhdGEsIFtcImNhdGVnb3JpZXNcIl0pLFxyXG5cdFx0XHRcdHBhc3N3b3JkOiBkYXRhW1wicGFzc3dvcmRcIl0gJiYgaGFzaGVkUGFzc3dvcmRcclxuXHRcdFx0fSxcclxuXHRcdFx0b3B0aW9uc1xyXG5cdFx0KTtcclxuXHRcdHJldHVybiB0aGlzLmdldChpZCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZWxldGUoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVXNlciA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHRcdGlmICghZm91bmRVc2VyKSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLkRFTEVURSwgUmVzb3VyY2UuVVNFUlMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZFVzZXJcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRVc2VyLmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZFVzZXI7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGUoZGF0YTogYW55LCBvcHRpb25zOiB7IGludml0ZWQ/OiBib29sZWFuIH0gPSB7fSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgY3JlYXRlZFVzZXIgPSBhd2FpdCB0aGlzLmNyZWF0ZVVzZXIoe1xyXG5cdFx0XHQuLi5kYXRhLFxyXG5cdFx0XHRyb2xlOiBvcHRpb25zLmludml0ZWQgPyBSb2xlLkdVRVNUIDogZGF0YS5yb2xlLFxyXG5cdFx0XHRhcHByb3ZlZDogIW9wdGlvbnMuaW52aXRlZFxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gY3JlYXRlZFVzZXI7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBEYXRhU291cmNlIGZyb20gXCIuL0RhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgUm9sZSwgT3BlcmF0aW9uLCBSZXNvdXJjZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgVXNlckFjY2Vzc29yIGZyb20gXCIuL3R5cGVzL1VzZXJBY2Nlc3NvclwiO1xyXG5pbXBvcnQgUkJBQyBmcm9tIFwiLi4vdXRpbHMvcmJhY1wiO1xyXG5pbXBvcnQge1xyXG5cdEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLFxyXG5cdFJlc291cmNlTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBleGNlcHRGaWVsZHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlaGljbGUgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHR1c2VyOiBVc2VyQWNjZXNzb3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiOiBhbnksIHVzZXJBY2Nlc3NvcjogVXNlckFjY2Vzc29yKSB7XHJcblx0XHRzdXBlcihkYik7XHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyQWNjZXNzb3I7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXQoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVmVoaWNsZSA9IGF3YWl0IHRoaXMuZ2V0VmVoaWNsZShpZCwge1xyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuVkVISUNMRVMpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFmb3VuZFZlaGljbGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24oXHJcblx0XHRcdFx0YFVzZXIgd2l0aCBJRCBvZiAke2lkfSBpcyBub3QgZm91bmQuYFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuVkVISUNMRVMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZFZlaGljbGVcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvdW5kVmVoaWNsZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFZlaGljbGVzID0gYXdhaXQgdGhpcy5nZXRWZWhpY2xlcyh7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5WRUhJQ0xFUylcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgdmVoaWNsZXMgPSBbXTtcclxuXHRcdGZvciAobGV0IHZlaGljbGUgb2YgZm91bmRWZWhpY2xlcykge1xyXG5cdFx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5WRUhJQ0xFUywge1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0dGFyZ2V0OiB2ZWhpY2xlXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoYWNjZXNzaWJsZSkge1xyXG5cdFx0XHRcdHZlaGljbGVzLnB1c2godmVoaWNsZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmVoaWNsZXM7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGUoaWQ6IG51bWJlciwgZGF0YT86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVmVoaWNsZSA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5VUERBVEUsIFJlc291cmNlLlZFSElDTEVTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRWZWhpY2xlLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRhd2FpdCBmb3VuZFZlaGljbGUudXBkYXRlKGV4Y2VwdEZpZWxkcyhkYXRhLCBbXCJjYXRlZ29yaWVzXCJdKSk7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoaWQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFZlaGljbGUgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uREVMRVRFLCBSZXNvdXJjZS5WRUhJQ0xFUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHR0YXJnZXQ6IGZvdW5kVmVoaWNsZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRWZWhpY2xlLmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZFZlaGljbGU7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGUoZGF0YTogb2JqZWN0KSB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLkNSRUFURSwgUmVzb3VyY2UuVkVISUNMRVMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRsZXQgY3JlYXRlZFVzZXIgPSBhd2FpdCB0aGlzLmNyZWF0ZVZlaGljbGUoZGF0YSk7XHJcblx0XHRyZXR1cm4gY3JlYXRlZFVzZXI7XHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb29raW5nIH0gZnJvbSBcIi4vQm9va2luZ1wiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFZlaGljbGUgfSBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9jYXRpb24gfSBmcm9tIFwiLi9Mb2NhdGlvblwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIENsaWVudCB9IGZyb20gXCIuL0NsaWVudFwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFjY2lkZW50IH0gZnJvbSBcIi4vQWNjaWRlbnRcIjtcclxuIiwiLy9lc2xpbnQtZGlzYWJsZSBpbXBvcnQvZmlyc3RcclxuaW1wb3J0IGVudiBmcm9tIFwiZG90ZW52XCI7XHJcbmVudi5jb25maWcoKTtcclxuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHBhc3Nwb3J0IGZyb20gXCJwYXNzcG9ydFwiO1xyXG5pbXBvcnQgeyBTdHJhdGVneSB9IGZyb20gXCJwYXNzcG9ydC1sb2NhbFwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcclxuaW1wb3J0IGV4cHJlc3NTZXNzaW9uIGZyb20gXCJleHByZXNzLXNlc3Npb25cIjtcclxuXHJcbmltcG9ydCB7IGdldFN0YXRpY0ZpbGVzUGF0aCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tIFwiLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHsgVXNlciwgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9tb2RlbHNcIjtcclxuaW1wb3J0IGF1dGhSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2F1dGhcIjtcclxuaW1wb3J0IHVzZXJSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL3VzZXJzXCI7XHJcbmltcG9ydCBpbnZpdGVSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2ludml0ZXNcIjtcclxuaW1wb3J0IHZlaGljbGVSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL3ZlaGljbGVzXCI7XHJcbmltcG9ydCBib29raW5nUm91dGVzIGZyb20gXCIuL3JvdXRlcy9ib29raW5nc1wiO1xyXG5pbXBvcnQgbG9jYXRpb25Sb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2xvY2F0aW9uc1wiO1xyXG5pbXBvcnQgYWNjaWRlbnRSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2FjY2lkZW50c1wiO1xyXG5pbXBvcnQgY2F0ZWdvcnlSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2NhdGVnb3JpZXNcIjtcclxuaW1wb3J0IGNsaWVudFJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvY2xpZW50c1wiO1xyXG5pbXBvcnQgdmVoaWNlbElzc3VlUm91dGVzIGZyb20gXCIuL3JvdXRlcy92ZWhpY2xlSXNzdWVzXCI7XHJcbmltcG9ydCB3aWFsb25Sb3V0ZXMgZnJvbSBcIi4vcm91dGVzL3dpYWxvblwiO1xyXG5pbXBvcnQgcmVwb3J0Um91dGVzIGZyb20gXCIuL3JvdXRlcy9yZXBvcnRzXCI7XHJcblxyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcbi8vIFBBU1NQT1JUIENPTkZJR1VSQVRJT05TXHJcbnBhc3Nwb3J0LnVzZShcclxuXHRuZXcgU3RyYXRlZ3koYXN5bmMgKHVzZXJuYW1lLCBwYXNzd29yZCwgY2IpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBleGlzdGluZ1VzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoe1xyXG5cdFx0XHRcdHdoZXJlOiB7IHVzZXJuYW1lIH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAoZXhpc3RpbmdVc2VyKSB7XHJcblx0XHRcdFx0bGV0IHZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGV4aXN0aW5nVXNlci5wYXNzd29yZCk7XHJcblxyXG5cdFx0XHRcdGlmICghdmFsaWQgfHwgZXhpc3RpbmdVc2VyLmJsb2NrZWQpIHtcclxuXHRcdFx0XHRcdHJldHVybiBjYihudWxsLCBmYWxzZSk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdGV4aXN0aW5nVXNlci5yb2xlICE9PSBSb2xlLk1BU1RFUiAmJlxyXG5cdFx0XHRcdFx0ZXhpc3RpbmdVc2VyLmNsaWVudElkID09PSBudWxsXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXHJcblx0XHRcdFx0XHRcdFwiWW91ciBhY2NvdW50IGRvZXMgbm90IGJlbG9uZyB0byBhIGNsaWVudC4gUGxlYXNlIGNvbnRhY3QgY3VzdG9tZXIgc3VwcG9ydC5cIlxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNiKG51bGwsIGV4aXN0aW5nVXNlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjYihudWxsLCBmYWxzZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJldHVybiBjYihlKTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxucGFzc3BvcnQuc2VyaWFsaXplVXNlcihmdW5jdGlvbih1c2VyOiB7IGlkOiBudW1iZXIgfSwgY2IpIHtcclxuXHRjYihudWxsLCB1c2VyLmlkKTtcclxufSk7XHJcblxyXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoYXN5bmMgKGlkOiBudW1iZXIsIGNiKSA9PiB7XHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdGluY2x1ZGU6IFt7IG1vZGVsOiBDYXRlZ29yeSB9XSxcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFtcInBhc3N3b3JkXCJdXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGNiKG51bGwsIHVzZXIpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdGNiKGUpO1xyXG5cdH1cclxufSk7XHJcbi8vIEVYUFJFU1MgQ09ORklHVVJBVElPTlNcclxuXHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xyXG5hcHAudXNlKFxyXG5cdGV4cHJlc3NTZXNzaW9uKHtcclxuXHRcdHNlY3JldDogY29uZmlnLnNlY3JldEtleSxcclxuXHRcdHJlc2F2ZTogZmFsc2UsXHJcblx0XHRzYXZlVW5pbml0aWFsaXplZDogZmFsc2VcclxuXHR9KVxyXG4pO1xyXG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcclxuLy8gVE9ETzogVXNlIGNvbmZpZy5qcyBmb3IgY29ycyBvcHRpb25zLlxyXG5hcHAudXNlKGNvcnMoeyBvcmlnaW46IHByb2Nlc3MuZW52LkNMSUVOVF9VUkwsIGNyZWRlbnRpYWxzOiB0cnVlIH0pKTtcclxuXHJcbi8vIEluaXRpYWxpemUgUGFzc3BvcnQgYW5kIHJlc3RvcmUgYXV0aGVudGljYXRpb24gc3RhdGUsIGlmIGFueSwgZnJvbSB0aGVcclxuLy8gc2Vzc2lvbi5cclxuYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xyXG5hcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XHJcblxyXG4vLyBFeHByZXNzIHJvdXRlc1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2F1dGhcIiwgYXV0aFJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvdXNlcnNcIiwgdXNlclJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvaW52aXRlc1wiLCBpbnZpdGVSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL3ZlaGljbGVzXCIsIHZlaGljbGVSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2Jvb2tpbmdzXCIsIGJvb2tpbmdSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2xvY2F0aW9uc1wiLCBsb2NhdGlvblJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvYWNjaWRlbnRzXCIsIGFjY2lkZW50Um91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9jYXRlZ29yaWVzXCIsIGNhdGVnb3J5Um91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9jbGllbnRzXCIsIGNsaWVudFJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvaXNzdWVzXCIsIHZlaGljZWxJc3N1ZVJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvd2lhbG9uXCIsIHdpYWxvblJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvcmVwb3J0c1wiLCByZXBvcnRSb3V0ZXMpO1xyXG5cclxuYXBwLnVzZShcIi9zdGF0aWNcIiwgZXhwcmVzcy5zdGF0aWMoZ2V0U3RhdGljRmlsZXNQYXRoKCkpKTtcclxuYXBwLnVzZShcIi9zdGF0aWNcIiwgZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgXCJwdWJsaWNcIikpKTtcclxuXHJcbmFwcC5saXN0ZW4oY29uZmlnLnNlcnZlclBvcnQsICgpID0+IHtcclxuXHRjb25zb2xlLmxvZyhgTGlzdGVuaW5nIG9uIHBvcnQgJHtjb25maWcuc2VydmVyUG9ydH1gKTtcclxufSk7XHJcbiIsImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHsgZGVsZXRlRmlsZUZyb21VcmwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbnR5cGUgZmlsZVVSSSA9IHsgdXJsOiBzdHJpbmc7IHBhdGg6IHN0cmluZyB9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKFxyXG5cdHsgZmlsZSwgZmlsZXMgfTogeyBmaWxlPzogZmlsZVVSSTsgZmlsZXM/OiB7IFtrZXk6IHN0cmluZ106IGZpbGVVUkkgfSB9LFxyXG5cdHJlcyxcclxuXHRuZXh0XHJcbikgPT4ge1xyXG5cdGlmIChyZXMuc3RhdHVzQ29kZSA+PSA0MDApIHtcclxuXHRcdGlmIChmaWxlKSB7XHJcblx0XHRcdGlmIChmaWxlLnVybCkgZGVsZXRlRmlsZUZyb21VcmwoZmlsZS51cmwpO1xyXG5cdFx0XHRlbHNlIGlmIChmaWxlLnBhdGgpIGZzLnByb21pc2VzLnVubGluayhmaWxlLnBhdGgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGZpbGVzKSB7XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIE9iamVjdC5rZXlzKGZpbGVzKSkge1xyXG5cdFx0XHRcdGNvbnN0IGZpbGUgPSBmaWxlc1trZXldO1xyXG5cdFx0XHRcdGlmIChmaWxlLnVybCkgZGVsZXRlRmlsZUZyb21VcmwoZmlsZS51cmwpO1xyXG5cdFx0XHRcdGVsc2UgaWYgKGZpbGUucGF0aCkgZnMucHJvbWlzZXMudW5saW5rKGZpbGUucGF0aCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0bmV4dCgpO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBkZWxldGVGaWxlRnJvbVVybCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBNb2RlbFR5cGUgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcblxyXG50eXBlIFJlcGxhY2VGaWxlVVJJID0ge1xyXG5cdHVybDogc3RyaW5nO1xyXG5cdG1vZGVsOiBNb2RlbFR5cGU7XHJcblx0ZmllbGQ6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRSZXBsYWNlZEZpbGVzID0gKFxyXG5cdHJlczogeyBba2V5OiBzdHJpbmddOiBhbnk7IGxvY2FsczogYW55IH0sXHJcblx0eyB1cmwsIG1vZGVsLCBmaWVsZCB9OiBSZXBsYWNlRmlsZVVSSVxyXG4pID0+IHtcclxuXHRyZXMubG9jYWxzLnJlcGxhY2VkRmlsZXNcclxuXHRcdD8gcmVzLmxvY2Fscy5yZXBsYWNlZEZpbGVzLnB1c2goeyB1cmwsIG1vZGVsLCBmaWVsZCB9KVxyXG5cdFx0OiAocmVzLmxvY2Fscy5yZXBsYWNlZEZpbGVzID0gW3sgdXJsLCBtb2RlbCwgZmllbGQgfV0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZVJlcGxhY2VkRmlsZXMgPSBhc3luYyAoXHJcblx0cmVxLFxyXG5cdHsgbG9jYWxzIH06IHsgbG9jYWxzOiBhbnk7IFtrZXk6IHN0cmluZ106IGFueSB9LFxyXG5cdG5leHRcclxuKSA9PiB7XHJcblx0aWYgKGxvY2Fscy5yZXBsYWNlZEZpbGVzKSB7XHJcblx0XHRmb3IgKGxldCBmaWxlIG9mIGxvY2Fscy5yZXBsYWNlZEZpbGVzKSB7XHJcblx0XHRcdGlmIChmaWxlLnVybCAmJiBmaWxlLm1vZGVsICYmIGZpbGUuZmllbGQpIHtcclxuXHRcdFx0XHRmaWxlLm1vZGVsXHJcblx0XHRcdFx0XHQuZmluZEFsbCh7XHJcblx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0W2ZpbGUuZmllbGRdOiBmaWxlLnVybFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0LnRoZW4oZm91bmQgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoIWZvdW5kLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdGRlbGV0ZUZpbGVGcm9tVXJsKGZpbGUudXJsKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG5leHQoKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlbGV0ZVJlcGxhY2VkRmlsZXM7XHJcbiIsImltcG9ydCB7IFJvbGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRpZiAocmVxLnVzZXIucm9sZSAhPT0gUm9sZS5HVUVTVCkge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCBhcyBhIGd1ZXN0LlwiKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9XHJcbn07XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3JlcXVpcmVSb2xlXCI7XHJcbiIsImltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBtdWx0ZXIgZnJvbSBcIm11bHRlclwiO1xyXG5pbXBvcnQgeyBnZXRTdGF0aWNGaWxlc1BhdGgsIG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0IH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5jb25zdCB1cGxvYWQgPSAodXBsb2FkUGF0aCwgb3B0aW9ucz8pID0+IHtcclxuXHRyZXR1cm4gbXVsdGVyKHtcclxuXHRcdHN0b3JhZ2U6IG11bHRlci5kaXNrU3RvcmFnZSh7XHJcblx0XHRcdGRlc3RpbmF0aW9uOiBmdW5jdGlvbihyZXEsIGZpbGUsIGNiKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oZ2V0U3RhdGljRmlsZXNQYXRoKCksIHVwbG9hZFBhdGgpO1xyXG5cdFx0XHRcdG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0KGZpbGVQYXRoKVxyXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4gY2IobnVsbCwgZmlsZVBhdGgpKVxyXG5cdFx0XHRcdFx0LmNhdGNoKGUgPT4gY2IoZSwgZmlsZVBhdGgpKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmlsZW5hbWU6IGZ1bmN0aW9uKHJlcSwgZmlsZSwgY2IpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhmaWxlKTtcclxuXHRcdFx0XHRjYihudWxsLCBgJHtEYXRlLm5vdygpfS0ke2ZpbGUub3JpZ2luYWxuYW1lfWApOyAvL3VzZSBEYXRlLm5vdygpIGZvciB1bmlxdWUgZmlsZSBrZXlzXHJcblx0XHRcdH1cclxuXHRcdH0pLFxyXG5cdFx0bGltaXRzOiB7XHJcblx0XHRcdGZpbGVTaXplOiAxMDAwMDAwMCxcclxuXHRcdFx0Li4uKG9wdGlvbnMgJiYgb3B0aW9ucy5saW1pdHMpXHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHVwbG9hZDtcclxuIiwiZXhwb3J0IGRlZmF1bHQgKHsgYm9keSB9LCByZXMsIG5leHQpID0+IHtcclxuXHRmb3IgKGxldCBrZXkgaW4gYm9keSkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ym9keVtrZXldID0gSlNPTi5wYXJzZShib2R5W2tleV0pO1xyXG5cdFx0fSBjYXRjaCAoZSkge31cclxuXHR9XHJcblx0bmV4dCgpO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0aWYgKCFyZXEudXNlcikge1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQuIFBsZWFzZSBsb2dpbi5cIik7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKGZhbHNlKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IFJvbGVVdGlscyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcmVxdWlyZVJvbGUgPSAocm9sZTogUm9sZSB8IFJvbGVbXSk6IEhhbmRsZXIgPT4gKFxyXG5cdHJlcSxcclxuXHRyZXMsXHJcblx0bmV4dFxyXG4pID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRpZiAoXHJcblx0XHRyZXEudXNlciAmJlxyXG5cdFx0KChyb2xlIGluc3RhbmNlb2YgQXJyYXkgJiZcclxuXHRcdFx0cm9sZS5maW5kSW5kZXgocm9sZSA9PiByZXEudXNlci5yb2xlID09PSByb2xlKSA+PSAwKSB8fFxyXG5cdFx0XHRyb2xlID09PSByZXEudXNlci5yb2xlKVxyXG5cdCkge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCB0byBhY2Nlc3MgdGhpcyByZXNvdXJjZS5cIik7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKGZhbHNlKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVxdWlyZUhpZ2hlck9yRXF1YWxSb2xlID0gKHJvbGU6IFJvbGUpOiBIYW5kbGVyID0+IChcclxuXHRyZXEsXHJcblx0cmVzLFxyXG5cdG5leHRcclxuKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0aWYgKHJlcS51c2VyICYmIFJvbGVVdGlscy5pc1JvbGVCZXR0ZXIocm9sZSwgcmVxLnVzZXIucm9sZSkpIHtcclxuXHRcdG5leHQoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQgdG8gYWNjZXNzIHRoaXMgcmVzb3VyY2UuXCIpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDEpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0U3VjY2VzcyhmYWxzZSk7XHJcblx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0fVxyXG59O1xyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHREYXRhVHlwZSxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0QmVsb25nc1RvTWFueSxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRDcmVhdGVkQXQsXHJcblx0VXBkYXRlZEF0XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEFjY2lkZW50QXR0cmlidXRlcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgeyBVc2VyLCBWZWhpY2xlLCBCb29raW5nLCBBY2NpZGVudFVzZXJTdGF0dXMgfSBmcm9tIFwiLlwiO1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBBY2NpZGVudCBleHRlbmRzIE1vZGVsPEFjY2lkZW50PiBpbXBsZW1lbnRzIEFjY2lkZW50QXR0cmlidXRlcyB7XHJcblx0QFByaW1hcnlLZXlcclxuXHRAQXV0b0luY3JlbWVudFxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgaWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7XHJcblx0XHR0eXBlOiBEYXRhVHlwZS5TVFJJTkcoNTAwKSxcclxuXHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHR2YWxpZGF0ZToge1xyXG5cdFx0XHRub3ROdWxsOiB7IG1zZzogXCJNZXNzYWdlIGlzIHJlcXVpcmVkLlwiIH1cclxuXHRcdH1cclxuXHR9KVxyXG5cdHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgYWNjaWRlbnRJbWFnZVNyYzogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGFjY2lkZW50VmlkZW9TcmM6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBsYXQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBsbmc6IG51bWJlcjtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVXNlcilcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBVc2VyKVxyXG5cdHVzZXI6IFVzZXI7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFZlaGljbGUpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdmVoaWNsZUlkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVmVoaWNsZSlcclxuXHR2ZWhpY2xlOiBWZWhpY2xlO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBCb29raW5nKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGJvb2tpbmdJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IEJvb2tpbmcpXHJcblx0Ym9va2luZzogQm9va2luZztcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQmVsb25nc1RvTWFueShcclxuXHRcdCgpID0+IFVzZXIsXHJcblx0XHQoKSA9PiBBY2NpZGVudFVzZXJTdGF0dXMsXHJcblx0XHRcImFjY2lkZW50SWRcIlxyXG5cdClcclxuXHR1c2VyU3RhdHVzZXM6IEFycmF5PEFjY2lkZW50VXNlclN0YXR1cz47XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBBY2NpZGVudFVzZXJTdGF0dXNBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7IEFjY2lkZW50LCBVc2VyIH0gZnJvbSBcIi5cIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQWNjaWRlbnRVc2VyU3RhdHVzIGV4dGVuZHMgTW9kZWw8QWNjaWRlbnRVc2VyU3RhdHVzPlxyXG5cdGltcGxlbWVudHMgQWNjaWRlbnRVc2VyU3RhdHVzQXR0cmlidXRlcyB7XHJcblx0QENvbHVtbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UsIGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgcmVhZDogYm9vbGVhbjtcclxuXHJcblx0QENvbHVtbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UsIGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgZGVsZXRlZDogYm9vbGVhbjtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gQWNjaWRlbnQpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgYWNjaWRlbnRJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IEFjY2lkZW50KVxyXG5cdHB1YmxpYyBhY2NpZGVudDogQWNjaWRlbnQ7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFVzZXIpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdXNlcklkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVXNlcilcclxuXHRwdWJsaWMgdXNlcjogVXNlcjtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRDcmVhdGVkQXQsXHJcblx0RGF0YVR5cGUsXHJcblx0VXBkYXRlZEF0XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IFVzZXIsIFZlaGljbGUsIFJlcGxhY2VWZWhpY2xlIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgQm9va2luZ1R5cGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgQm9va2luZ0F0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQm9va2luZyBleHRlbmRzIE1vZGVsPEJvb2tpbmc+IGltcGxlbWVudHMgQm9va2luZ0F0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHBhaWQ6IGJvb2xlYW47XHJcblxyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuXHRwdWJsaWMgYW1vdW50OiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgdHlwZTogRGF0YVR5cGUuREFURSB9KVxyXG5cdHB1YmxpYyBmcm9tOiBEYXRlO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgdHlwZTogRGF0YVR5cGUuREFURSB9KVxyXG5cdHB1YmxpYyB0bzogRGF0ZTtcclxuXHJcblx0QENvbHVtbih7IGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG5cdHB1YmxpYyBhcHByb3ZlZDogYm9vbGVhbiB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGZpbmlzaGVkOiBib29sZWFuO1xyXG5cclxuXHRAQ29sdW1uKERhdGFUeXBlLkZMT0FUKVxyXG5cdHB1YmxpYyBzdGFydE1pbGVhZ2U6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oRGF0YVR5cGUuRkxPQVQpXHJcblx0cHVibGljIGVuZE1pbGVhZ2U6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oRGF0YVR5cGUuRkxPQVQpXHJcblx0cHVibGljIHN0YXJ0RnVlbDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbihEYXRhVHlwZS5GTE9BVClcclxuXHRwdWJsaWMgZW5kRnVlbDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVXNlcilcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVmVoaWNsZSlcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB2ZWhpY2xlSWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIHR5cGU6IERhdGFUeXBlLlNUUklORyB9KVxyXG5cdHB1YmxpYyByZWFkb25seSBib29raW5nVHlwZTogQm9va2luZ1R5cGU7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFJlcGxhY2VWZWhpY2xlKVxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgcmVwbGFjZVZlaGljbGVJZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFVzZXIpXHJcblx0cHVibGljIHJlYWRvbmx5IHVzZXI6IFVzZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVmVoaWNsZSlcclxuXHRwdWJsaWMgcmVhZG9ubHkgdmVoaWNsZTogVmVoaWNsZTtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBSZXBsYWNlVmVoaWNsZSlcclxuXHRwdWJsaWMgcmVhZG9ubHkgcmVwbGFjZVZlaGljbGU6IFJlcGxhY2VWZWhpY2xlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdENyZWF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBDbGllbnQsIFZlaGljbGUsIFZlaGljbGVDYXRlZ29yeSB9IGZyb20gXCIuL1wiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeUF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBNb2RlbDxDYXRlZ29yeT4gaW1wbGVtZW50cyBDYXRlZ29yeUF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gQ2xpZW50KVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGNsaWVudElkOiBudW1iZXI7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDbGllbnQpXHJcblx0cHVibGljIHJlYWRvbmx5IGNsaWVudDogQ2xpZW50O1xyXG5cclxuXHRAQmVsb25nc1RvTWFueShcclxuXHRcdCgpID0+IFZlaGljbGUsXHJcblx0XHQoKSA9PiBWZWhpY2xlQ2F0ZWdvcnlcclxuXHQpXHJcblx0cHVibGljIHJlYWRvbmx5IHZlaGljbGVzOiBWZWhpY2xlW107XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEJlbG9uZ3NUb01hbnksXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdCxcclxuXHRIYXNNYW55XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IFVzZXIsIFZlaGljbGUsIENhdGVnb3J5LCBMb2NhdGlvbiwgQ2xpZW50TG9jYXRpb24gfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBDbGllbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIENsaWVudCBleHRlbmRzIE1vZGVsPENsaWVudD4gaW1wbGVtZW50cyBDbGllbnRBdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gVXNlcilcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXNlcnM6IFVzZXJbXTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gVmVoaWNsZSlcclxuXHRwdWJsaWMgcmVhZG9ubHkgdmVoaWNsZXM6IFZlaGljbGVbXTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gQ2F0ZWdvcnkpXHJcblx0cHVibGljIHJlYWRvbmx5IGNhdGVnb3JpZXM6IENhdGVnb3J5W107XHJcblxyXG5cdEBCZWxvbmdzVG9NYW55KFxyXG5cdFx0KCkgPT4gTG9jYXRpb24sXHJcblx0XHQoKSA9PiBDbGllbnRMb2NhdGlvblxyXG5cdClcclxuXHRwdWJsaWMgcmVhZG9ubHkgbG9jYXRpb25zOiBMb2NhdGlvbltdO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXRcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQ2xpZW50LCBMb2NhdGlvbiB9IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IENsaWVudExvY2F0aW9uQXR0cmlidXRlcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRMb2NhdGlvbiBleHRlbmRzIE1vZGVsPENsaWVudExvY2F0aW9uPlxyXG5cdGltcGxlbWVudHMgQ2xpZW50TG9jYXRpb25BdHRyaWJ1dGVzIHtcclxuXHRARm9yZWlnbktleSgoKSA9PiBDbGllbnQpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgY2xpZW50SWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDbGllbnQpXHJcblx0cHVibGljIGNsaWVudDogQ2xpZW50O1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBMb2NhdGlvbilcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBsb2NhdGlvbklkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gTG9jYXRpb24pXHJcblx0cHVibGljIGxvY2F0aW9uOiBMb2NhdGlvbjtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXQsXHJcblx0SGFzTWFueVxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlLCBDbGllbnQsIENsaWVudExvY2F0aW9uIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgTG9jYXRpb25BdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIExvY2F0aW9uIGV4dGVuZHMgTW9kZWw8TG9jYXRpb24+IGltcGxlbWVudHMgTG9jYXRpb25BdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGxhdDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBsbmc6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgYWRkcmVzczogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGxvY2F0aW9uSW1hZ2VTcmM6IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBDbGllbnQsXHJcblx0XHQoKSA9PiBDbGllbnRMb2NhdGlvblxyXG5cdClcclxuXHRwdWJsaWMgcmVhZG9ubHkgY2xpZW50czogQ2xpZW50W107XHJcblxyXG5cdEBIYXNNYW55KCgpID0+IFZlaGljbGUpXHJcblx0cHVibGljIHJlYWRvbmx5IHZlaGljbGVzPzogVmVoaWNsZVtdO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRDcmVhdGVkQXQsXHJcblx0VXBkYXRlZEF0LFxyXG5cdEhhc09uZVxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBCb29raW5nIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgUmVwbGFjZVZlaGljbGVBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFJlcGxhY2VWZWhpY2xlIGV4dGVuZHMgTW9kZWw8UmVwbGFjZVZlaGljbGU+XHJcblx0aW1wbGVtZW50cyBSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgcGxhdGVOdW1iZXI6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBicmFuZDogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIG1vZGVsOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgdmluOiBzdHJpbmc7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEhhc09uZSgoKSA9PiBCb29raW5nKVxyXG5cdHB1YmxpYyByZWFkb25seSBib29raW5nPzogQm9va2luZztcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdERhdGFUeXBlLFxyXG5cdFVwZGF0ZWRBdCxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdEhhc01hbnlcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHtcclxuXHRDbGllbnQsXHJcblx0QWNjaWRlbnQsXHJcblx0QWNjaWRlbnRVc2VyU3RhdHVzLFxyXG5cdENhdGVnb3J5LFxyXG5cdFVzZXJWZWhpY2xlQ2F0ZWdvcnksXHJcblx0Qm9va2luZ1xyXG59IGZyb20gXCIuL1wiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7IFVzZXJBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFVzZXIgZXh0ZW5kcyBNb2RlbDxVc2VyPiBpbXBsZW1lbnRzIFVzZXJBdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHtcclxuXHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHR1bmlxdWU6IHsgbmFtZTogXCJlbWFpbFwiLCBtc2c6IFwiRW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZS5cIiB9XHJcblx0fSlcclxuXHRwdWJsaWMgdXNlcm5hbWU6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgZmlyc3ROYW1lOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGxhc3ROYW1lOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oe1xyXG5cdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdHVuaXF1ZTogeyBuYW1lOiBcImVtYWlsXCIsIG1zZzogXCJFbWFpbCBhZGRyZXNzIGFscmVhZHkgaW4gdXNlLlwiIH1cclxuXHR9KVxyXG5cdHB1YmxpYyBlbWFpbDogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBwYXNzd29yZDogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHtcclxuXHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHR1bmlxdWU6IHsgbmFtZTogXCJlbWFpbFwiLCBtc2c6IFwiRW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZS5cIiB9XHJcblx0fSlcclxuXHRwdWJsaWMgbW9iaWxlTnVtYmVyOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgY29udHJhY3RObzogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBvYmplY3RObzogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBsYXN0TG9naW46IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgdXNlckltYWdlU3JjOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGxpY2Vuc2VJbWFnZVNyYzogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSlcclxuXHRwdWJsaWMgYmxvY2tlZDogYm9vbGVhbjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSlcclxuXHRwdWJsaWMgZW1haWxDb25maXJtZWQ6IGJvb2xlYW47XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IENsaWVudClcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGNsaWVudElkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uKHsgdHlwZTogRGF0YVR5cGUuU1RSSU5HLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHJvbGU6IFJvbGU7XHJcblxyXG5cdEBDb2x1bW4oeyB0eXBlOiBEYXRhVHlwZS5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdGltZVpvbmU6IHN0cmluZztcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVXNlcilcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIHVzZXJDcmVhdG9ySWQ6IG51bWJlcjtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IENsaWVudClcclxuXHRjbGllbnQ6IENsaWVudDtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBVc2VyLCBcInVzZXJDcmVhdG9ySWRcIilcclxuXHR1c2VyQ3JlYXRvcjogVXNlcjtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBBY2NpZGVudCxcclxuXHRcdCgpID0+IEFjY2lkZW50VXNlclN0YXR1c1xyXG5cdClcclxuXHRhY2NpZGVudFN0YXR1c2VzOiBBY2NpZGVudFVzZXJTdGF0dXNbXTtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBDYXRlZ29yeSxcclxuXHRcdCgpID0+IFVzZXJWZWhpY2xlQ2F0ZWdvcnlcclxuXHQpXHJcblx0Y2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gQm9va2luZylcclxuXHRib29raW5nczogQm9va2luZ1tdO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXRcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgVXNlciwgQ2F0ZWdvcnkgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBVc2VyVmVoaWNsZUNhdGVnb3J5QXR0cmlidXRlcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBVc2VyVmVoaWNsZUNhdGVnb3J5IGV4dGVuZHMgTW9kZWw8VXNlclZlaGljbGVDYXRlZ29yeT5cclxuXHRpbXBsZW1lbnRzIFVzZXJWZWhpY2xlQ2F0ZWdvcnlBdHRyaWJ1dGVzIHtcclxuXHRARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHVzZXJJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFVzZXIpXHJcblx0cHVibGljIHVzZXI6IFVzZXI7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IENhdGVnb3J5KVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGNhdGVnb3J5SWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDYXRlZ29yeSlcclxuXHRwdWJsaWMgY2F0ZWdvcnk6IENhdGVnb3J5O1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXQsXHJcblx0SGFzTWFueSxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdERhdGFUeXBlXHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7XHJcblx0Q2xpZW50LFxyXG5cdExvY2F0aW9uLFxyXG5cdEJvb2tpbmcsXHJcblx0VmVoaWNsZUlzc3VlLFxyXG5cdENhdGVnb3J5LFxyXG5cdFZlaGljbGVDYXRlZ29yeSxcclxuXHRBY2NpZGVudFxyXG59IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdDaGFyZ2VVbml0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7IFZlaGljbGVBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFZlaGljbGUgZXh0ZW5kcyBNb2RlbDxWZWhpY2xlPiBpbXBsZW1lbnRzIFZlaGljbGVBdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBicmFuZDogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBtb2RlbDogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB2aW46IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSlcclxuXHRwdWJsaWMgZGVmbGVldGVkOiBib29sZWFuO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIHBhcmtpbmdMb2NhdGlvbjogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyB2ZWhpY2xlSW1hZ2VTcmM6IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBkZWZhdWx0VmFsdWU6IDAgfSlcclxuXHRwdWJsaWMgYm9va2luZ0NoYXJnZUNvdW50OiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBkZWZhdWx0VmFsdWU6IDAgfSlcclxuXHRwdWJsaWMgYm9va2luZ0NoYXJnZTogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIHdpYWxvblVuaXRJZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbih7IHR5cGU6IERhdGFUeXBlLlNUUklORyB9KVxyXG5cdHB1YmxpYyBib29raW5nQ2hhcmdlVW5pdDogQm9va2luZ0NoYXJnZVVuaXQgfCBudWxsO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBDbGllbnQpXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBjbGllbnRJZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gTG9jYXRpb24pXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBsb2NhdGlvbklkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBIYXNNYW55KCgpID0+IEJvb2tpbmcpXHJcblx0cHVibGljIHJlYWRvbmx5IGJvb2tpbmdzOiBCb29raW5nW107XHJcblxyXG5cdEBIYXNNYW55KCgpID0+IEFjY2lkZW50KVxyXG5cdHB1YmxpYyByZWFkb25seSBhY2NpZGVudHM6IEFjY2lkZW50W107XHJcblxyXG5cdEBIYXNNYW55KCgpID0+IFZlaGljbGVJc3N1ZSlcclxuXHRwdWJsaWMgcmVhZG9ubHkgdmVoaWNsZUlzc3VlczogVmVoaWNsZUlzc3VlW107XHJcblxyXG5cdEBCZWxvbmdzVG9NYW55KFxyXG5cdFx0KCkgPT4gQ2F0ZWdvcnksXHJcblx0XHQoKSA9PiBWZWhpY2xlQ2F0ZWdvcnlcclxuXHQpXHJcblx0cHVibGljIHJlYWRvbmx5IGNhdGVnb3JpZXM6IENhdGVnb3J5W107XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gQ2xpZW50KVxyXG5cdHB1YmxpYyByZWFkb25seSBjbGllbnQ6IENsaWVudDtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBMb2NhdGlvbilcclxuXHRwdWJsaWMgcmVhZG9ubHkgbG9jYXRpb246IExvY2F0aW9uO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXRcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcnksIFZlaGljbGUgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlQ2F0ZWdvcnlBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFZlaGljbGVDYXRlZ29yeSBleHRlbmRzIE1vZGVsPFZlaGljbGVDYXRlZ29yeT5cclxuXHRpbXBsZW1lbnRzIFZlaGljbGVDYXRlZ29yeUF0dHJpYnV0ZXMge1xyXG5cdEBGb3JlaWduS2V5KCgpID0+IENhdGVnb3J5KVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGNhdGVnb3J5SWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDYXRlZ29yeSlcclxuXHRwdWJsaWMgY2F0ZWdvcnk6IENhdGVnb3J5O1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBWZWhpY2xlKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHZlaGljbGVJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFZlaGljbGUpXHJcblx0cHVibGljIHZlaGljbGU6IFZlaGljbGU7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgVmVoaWNsZUlzc3VlQXR0cmlidXRlcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBWZWhpY2xlSXNzdWUgZXh0ZW5kcyBNb2RlbDxWZWhpY2xlSXNzdWU+XHJcblx0aW1wbGVtZW50cyBWZWhpY2xlSXNzdWVBdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFZlaGljbGUpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdmVoaWNsZUlkOiBudW1iZXI7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBWZWhpY2xlKVxyXG5cdHB1YmxpYyByZWFkb25seSB2ZWhpY2xlOiBWZWhpY2xlO1xyXG59XHJcbiIsImltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5cclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IFJvbGUgYXMgUm9sZUVudW0gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IEFjY2lkZW50IH0gZnJvbSBcIi4vQWNjaWRlbnRcIjtcclxuaW1wb3J0IHsgQWNjaWRlbnRVc2VyU3RhdHVzIH0gZnJvbSBcIi4vQWNjaWRlbnRVc2VyU3RhdHVzXCI7XHJcbmltcG9ydCB7IEJvb2tpbmcgfSBmcm9tIFwiLi9Cb29raW5nXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4vQ2xpZW50XCI7XHJcbmltcG9ydCB7IENsaWVudExvY2F0aW9uIH0gZnJvbSBcIi4vQ2xpZW50TG9jYXRpb25cIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiLi9Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBSZXBsYWNlVmVoaWNsZSB9IGZyb20gXCIuL1JlcGxhY2VWZWhpY2xlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9Vc2VyXCI7XHJcbmltcG9ydCB7IFVzZXJWZWhpY2xlQ2F0ZWdvcnkgfSBmcm9tIFwiLi9Vc2VyVmVoaWNsZUNhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFZlaGljbGUgfSBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcbmltcG9ydCB7IFZlaGljbGVDYXRlZ29yeSB9IGZyb20gXCIuL1ZlaGljbGVDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlSXNzdWUgfSBmcm9tIFwiLi9WZWhpY2xlSXNzdWVcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL0FjY2lkZW50XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0FjY2lkZW50VXNlclN0YXR1c1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Cb29raW5nXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0NhdGVnb3J5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0NsaWVudFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9DbGllbnRMb2NhdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Mb2NhdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9SZXBsYWNlVmVoaWNsZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Vc2VyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1VzZXJWZWhpY2xlQ2F0ZWdvcnlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vVmVoaWNsZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9WZWhpY2xlQ2F0ZWdvcnlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vVmVoaWNsZUlzc3VlXCI7XHJcblxyXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKFxyXG5cdGNvbmZpZy5kYXRhYmFzZS5uYW1lLFxyXG5cdGNvbmZpZy5kYXRhYmFzZS51c2VybmFtZSxcclxuXHRjb25maWcuZGF0YWJhc2UucGFzc3dvcmQsXHJcblx0e1xyXG5cdFx0bG9nZ2luZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIiA/IGNvbnNvbGUubG9nIDogZmFsc2UsXHJcblx0XHRob3N0OiBjb25maWcuZGF0YWJhc2UuaG9zdCxcclxuXHRcdHBvcnQ6IHBhcnNlSW50KGNvbmZpZy5kYXRhYmFzZS5wb3J0KSxcclxuXHRcdG1vZGVsczogW1xyXG5cdFx0XHRBY2NpZGVudCxcclxuXHRcdFx0QWNjaWRlbnRVc2VyU3RhdHVzLFxyXG5cdFx0XHRCb29raW5nLFxyXG5cdFx0XHRDYXRlZ29yeSxcclxuXHRcdFx0Q2xpZW50LFxyXG5cdFx0XHRDbGllbnRMb2NhdGlvbixcclxuXHRcdFx0TG9jYXRpb24sXHJcblx0XHRcdFJlcGxhY2VWZWhpY2xlLFxyXG5cdFx0XHRVc2VyLFxyXG5cdFx0XHRVc2VyVmVoaWNsZUNhdGVnb3J5LFxyXG5cdFx0XHRWZWhpY2xlLFxyXG5cdFx0XHRWZWhpY2xlQ2F0ZWdvcnksXHJcblx0XHRcdFZlaGljbGVJc3N1ZVxyXG5cdFx0XSxcclxuXHRcdC4uLmNvbmZpZy5kYXRhYmFzZS5zZXF1ZWxpemVcclxuXHR9XHJcbik7XHJcblxyXG5zZXF1ZWxpemVcclxuXHQuYXV0aGVudGljYXRlKClcclxuXHQudGhlbigoKSA9PiBpbml0KHNlcXVlbGl6ZSwgeyBzeW5jOiB7fSB9KSlcclxuXHQudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gaGFzIGJlZW4gZXN0YWJsaXNoZWQgc3VjY2Vzc2Z1bGx5LlwiKSlcclxuXHQuY2F0Y2goZXJyID0+IHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2VcXG5cIiwgZXJyKTtcclxuXHR9KTtcclxuXHJcbmNvbnN0IGluaXQgPSBhc3luYyAoc2VxdWVsaXplOiBTZXF1ZWxpemUsIHBhcmFtczogYW55KSA9PiB7XHJcblx0aWYgKHBhcmFtcy5zeW5jKSB7XHJcblx0XHRhd2FpdCBzZXF1ZWxpemUuc3luYyhwYXJhbXMuc3luYy5vcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdGxldCB1c2VycyA9IGF3YWl0IFVzZXIuZmluZEFsbCgpO1xyXG5cclxuXHRpZiAodXNlcnMubGVuZ3RoID09PSAwKSB7XHJcblx0XHQvLyBDcmVhdGUgcm9vdCB1c2VyLi4uXHJcblx0XHRsZXQgcm9vdFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2goY29uZmlnLmRhdGFiYXNlLnBhc3N3b3JkLCAxMCk7XHJcblx0XHRhd2FpdCBVc2VyLmNyZWF0ZSh7XHJcblx0XHRcdHVzZXJuYW1lOiBcInJvb3RcIixcclxuXHRcdFx0cGFzc3dvcmQ6IHJvb3RQYXNzd29yZCxcclxuXHRcdFx0Zmlyc3ROYW1lOiBcIlJvb3RcIixcclxuXHRcdFx0bGFzdE5hbWU6IFwiQWNjb3VudFwiLFxyXG5cdFx0XHRlbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdFx0cm9sZTogUm9sZUVudW0uTUFTVEVSLFxyXG5cdFx0XHRtb2JpbGVOdW1iZXI6IFwiXCIsXHJcblx0XHRcdGFwcHJvdmVkOiB0cnVlXHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0QWNjaWRlbnQsXHJcblx0QWNjaWRlbnRVc2VyU3RhdHVzLFxyXG5cdEJvb2tpbmcsXHJcblx0Q2F0ZWdvcnksXHJcblx0Q2xpZW50LFxyXG5cdENsaWVudExvY2F0aW9uLFxyXG5cdExvY2F0aW9uLFxyXG5cdFJlcGxhY2VWZWhpY2xlLFxyXG5cdFVzZXIsXHJcblx0VXNlclZlaGljbGVDYXRlZ29yeSxcclxuXHRWZWhpY2xlLFxyXG5cdFZlaGljbGVDYXRlZ29yeSxcclxuXHRWZWhpY2xlSXNzdWVcclxufTtcclxuIiwiaW1wb3J0IHtcclxuXHRSb2xlIGFzIFJvbGVFbnVtLFxyXG5cdFJlc291cmNlIGFzIFJlc291cmNlVHlwZVxyXG59IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJCQUMge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRyb2xlczogUm9sZVtdO1xyXG5cdGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMucm9sZXMgPSBbXTtcclxuXHR9XHJcblx0YWRkUm9sZShyb2xlOiBSb2xlKTogdm9pZCB7XHJcblx0XHRsZXQgZXhpc3RpbmcgPSB0aGlzLnJvbGVzLmZpbmQoXHJcblx0XHRcdChyb2xlSXRlbTogUm9sZSkgPT4gcm9sZUl0ZW0ubmFtZSA9PT0gcm9sZS5uYW1lXHJcblx0XHQpO1xyXG5cdFx0aWYgKGV4aXN0aW5nKSB0aHJvdyBuZXcgRXJyb3IoXCJSb2xlIGFscmVhZHkgZXhpc3RzXCIpO1xyXG5cdFx0dGhpcy5yb2xlcy5wdXNoKHJvbGUpO1xyXG5cdH1cclxuXHJcblx0Y2FuKFxyXG5cdFx0cm9sZTogUm9sZSB8IFJvbGVFbnVtLFxyXG5cdFx0YWN0aW9uOiBzdHJpbmcsXHJcblx0XHRyZXNvdXJjZTogUmVzb3VyY2UgfCBSZXNvdXJjZVR5cGUsXHJcblx0XHRwYXJhbXM6IGFueVxyXG5cdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xyXG5cdFx0XHRsZXQgZXhpc3RpbmdSb2xlOiBSb2xlIHwgdW5kZWZpbmVkID0gdGhpcy5yb2xlcy5maW5kKChyb2xlSXRlbTogUm9sZSkgPT4ge1xyXG5cdFx0XHRcdGlmIChyb2xlIGluc3RhbmNlb2YgUm9sZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJvbGUubmFtZSA9PT0gcm9sZUl0ZW0ubmFtZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHJvbGUgPT09IHJvbGVJdGVtLm5hbWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoIWV4aXN0aW5nUm9sZSkgdGhyb3cgbmV3IEVycm9yKFwiUm9sZSBkb2VzIG5vdCBleGlzdC5cIik7XHJcblx0XHRcdGxldCBwZXJtaXR0ZWQgPSBhd2FpdCBleGlzdGluZ1JvbGUuY2FuKGFjdGlvbiwgcmVzb3VyY2UsIHBhcmFtcyk7XHJcblx0XHRcdHJlc29sdmUocGVybWl0dGVkKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0RXhjbHVkZWRGaWVsZHMocm9sZTogc3RyaW5nLCBhY3Rpb246IHN0cmluZywgcmVzb3VyY2U6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuXHRcdGxldCAkcm9sZTogUm9sZSB8IHVuZGVmaW5lZCA9IHRoaXMucm9sZXMuZmluZChcclxuXHRcdFx0KCRyb2xlOiBSb2xlKSA9PiAkcm9sZS5uYW1lID09PSByb2xlXHJcblx0XHQpO1xyXG5cdFx0aWYgKCRyb2xlKSB7XHJcblx0XHRcdGxldCBleGNsdWRlZEZpZWxkcyA9IFtdO1xyXG5cdFx0XHRpZiAoJHJvbGUuZXh0ZW5kcykge1xyXG5cdFx0XHRcdGZvciAobGV0IHJvbGUgb2YgJHJvbGUuZXh0ZW5kcykge1xyXG5cdFx0XHRcdFx0bGV0ICRhY3Rpb24gPSByb2xlLmFjdGlvbnMuZmluZChcclxuXHRcdFx0XHRcdFx0JGFjdGlvbiA9PlxyXG5cdFx0XHRcdFx0XHRcdCRhY3Rpb24ubmFtZSA9PT0gYWN0aW9uICYmICRhY3Rpb24ucmVzb3VyY2UubmFtZSA9PT0gcmVzb3VyY2VcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRpZiAoJGFjdGlvbikge1xyXG5cdFx0XHRcdFx0XHRleGNsdWRlZEZpZWxkcy5wdXNoKC4uLiRhY3Rpb24uZXhjbHVkZWRGaWVsZHMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgJGFjdGlvbiA9ICRyb2xlLmFjdGlvbnMuZmluZChcclxuXHRcdFx0XHQkYWN0aW9uID0+ICRhY3Rpb24ubmFtZSA9PT0gYWN0aW9uICYmICRhY3Rpb24ucmVzb3VyY2UubmFtZSA9PT0gcmVzb3VyY2VcclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKCRhY3Rpb24pIHtcclxuXHRcdFx0XHRleGNsdWRlZEZpZWxkcy5wdXNoKC4uLiRhY3Rpb24uZXhjbHVkZWRGaWVsZHMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBleGNsdWRlZEZpZWxkcztcclxuXHRcdH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJSb2xlIGRvZXMgbm90IGV4aXN0LlwiKTtcclxuXHR9XHJcblx0dG9PYmplY3QoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRuYW1lOiB0aGlzLm5hbWUsXHJcblx0XHRcdHJvbGVzOiB0aGlzLnJvbGVzLm1hcChyb2xlID0+ICh7XHJcblx0XHRcdFx0bmFtZTogcm9sZS5uYW1lLFxyXG5cdFx0XHRcdGFjY2Vzczogcm9sZS5hY3Rpb25zLnJlZHVjZShcclxuXHRcdFx0XHRcdChhY2M6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGFjdGlvbikgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoIWFjYy5yZXNvdXJjZXNbYWN0aW9uLnJlc291cmNlLm5hbWVdKSB7XHJcblx0XHRcdFx0XHRcdFx0YWNjLnJlc291cmNlc1thY3Rpb24ucmVzb3VyY2UubmFtZV0gPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRwZXJtaXNzaW9uczoge31cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGFjYy5yZXNvdXJjZXNbYWN0aW9uLnJlc291cmNlLm5hbWVdLnBlcm1pc3Npb25zW2FjdGlvbi5uYW1lXSA9IHtcclxuXHRcdFx0XHRcdFx0XHRjb25kaXRpb25hbDogYWN0aW9uLmNvbmRpdGlvbiA/IHRydWUgOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRleGNsdWRlZEZpZWxkczogYWN0aW9uLmV4Y2x1ZGVkRmllbGRzXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdHJldHVybiBhY2M7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRyZXNvdXJjZXM6IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRleHRlbmRzOiByb2xlLmV4dGVuZHMubWFwKHJvbGUgPT4gcm9sZS5uYW1lKVxyXG5cdFx0XHR9KSlcclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUm9sZSB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGFjdGlvbnM6IEFjdGlvbltdO1xyXG5cdGV4dGVuZHM6IFJvbGVbXTtcclxuXHJcblx0Y29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5hY3Rpb25zID0gW107XHJcblx0XHR0aGlzLmV4dGVuZHMgPSBbXTtcclxuXHR9XHJcblxyXG5cdGFkZFBlcm1pc3Npb24oYWN0aW9uOiBBY3Rpb24pIHtcclxuXHRcdGxldCBleGlzdGluZ0FjdGlvbiA9IHRoaXMuYWN0aW9ucy5maW5kKFxyXG5cdFx0XHRjdXJyZW50QWN0aW9uID0+XHJcblx0XHRcdFx0Y3VycmVudEFjdGlvbi5uYW1lID09PSBhY3Rpb24ubmFtZSAmJlxyXG5cdFx0XHRcdGN1cnJlbnRBY3Rpb24ucmVzb3VyY2UubmFtZSA9PT0gYWN0aW9uLnJlc291cmNlLm5hbWVcclxuXHRcdCk7XHJcblx0XHRpZiAoZXhpc3RpbmdBY3Rpb24pIHRocm93IG5ldyBFcnJvcihcIkFjdGlvbiBhbHJlYWR5IGV4aXN0cy5cIik7XHJcblx0XHR0aGlzLmFjdGlvbnMucHVzaChhY3Rpb24pO1xyXG5cdH1cclxuXHJcblx0ZXh0ZW5kKHJvbGU6IFJvbGUpIHtcclxuXHRcdHRoaXMuZXh0ZW5kcy5wdXNoKHJvbGUpO1xyXG5cdH1cclxuXHRjYW4oXHJcblx0XHRhY3Rpb246IHN0cmluZyxcclxuXHRcdHJlc291cmNlOiBSZXNvdXJjZSB8IFJlc291cmNlVHlwZSxcclxuXHRcdHBhcmFtczogYW55XHJcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xyXG5cdFx0XHRsZXQgcmVzb3VyY2VOYW1lID1cclxuXHRcdFx0XHRyZXNvdXJjZSBpbnN0YW5jZW9mIFJlc291cmNlID8gcmVzb3VyY2UubmFtZSA6IHJlc291cmNlO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgY3VycmVudEFjdGlvbjogQWN0aW9uID0gYWN0aW9uc1tpXTtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRhY3Rpb24gPT09IGN1cnJlbnRBY3Rpb24ubmFtZSAmJlxyXG5cdFx0XHRcdFx0Y3VycmVudEFjdGlvbi5yZXNvdXJjZS5uYW1lID09PSByZXNvdXJjZU5hbWVcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdGxldCBwZXJtaXR0ZWQ7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRwZXJtaXR0ZWQgPSBhd2FpdCBjdXJyZW50QWN0aW9uLnBlcmZvcm0ocGFyYW1zKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0cGVybWl0dGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAocGVybWl0dGVkKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHBlcm1pdHRlZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vIENvbnRpbmUgbG9va2luZyBmb3IgbWF0Y2hpbmcgYWN0aW9ucywgaW5jYXNlIHJvbGUgaXMgZXh0ZW5kZWQuXHJcblx0XHRcdGlmICh0aGlzLmV4dGVuZHMpIHtcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXh0ZW5kcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0bGV0IGV4dGVuZGVkUm9sZSA9IHRoaXMuZXh0ZW5kc1tpXTtcclxuXHRcdFx0XHRcdGxldCBwZXJtaXR0ZWQ6IGJvb2xlYW4gPSBhd2FpdCBleHRlbmRlZFJvbGUuY2FuKFxyXG5cdFx0XHRcdFx0XHRhY3Rpb24sXHJcblx0XHRcdFx0XHRcdHJlc291cmNlLFxyXG5cdFx0XHRcdFx0XHRwYXJhbXNcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRpZiAocGVybWl0dGVkKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXNvbHZlKHBlcm1pdHRlZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZXNvbHZlKGZhbHNlKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbiB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHJlc291cmNlOiBSZXNvdXJjZTtcclxuXHRjb25kaXRpb24/OiAoKHBhcmFtcz86IGFueSkgPT4gUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4pIHwgbnVsbDtcclxuXHRleGNsdWRlZEZpZWxkczogc3RyaW5nW107XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRuYW1lOiBzdHJpbmcsXHJcblx0XHRyZXNvdXJjZTogUmVzb3VyY2UsXHJcblx0XHRjb25kaXRpb24/OiAoKHBhcmFtcz86IGFueSkgPT4gUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4pIHwgbnVsbCxcclxuXHRcdGV4Y2x1ZGVkRmllbGRzOiBzdHJpbmdbXSA9IFtdXHJcblx0KSB7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5yZXNvdXJjZSA9IHJlc291cmNlO1xyXG5cdFx0dGhpcy5jb25kaXRpb24gPSBjb25kaXRpb247XHJcblx0XHR0aGlzLmV4Y2x1ZGVkRmllbGRzID0gZXhjbHVkZWRGaWVsZHM7XHJcblx0fVxyXG5cdHBlcmZvcm0ocGFyYW1zPzogYW55KSB7XHJcblx0XHRpZiAodGhpcy5jb25kaXRpb24pIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29uZGl0aW9uKHBhcmFtcyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZSB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSQkFDO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuaW1wb3J0IHJlcXVpcmVMb2dpbiBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luXCI7XHJcbmltcG9ydCB7XHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlcyxcclxuXHRhZGRSZXBsYWNlZEZpbGVzXHJcbn0gZnJvbSBcIi4uL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXNcIjtcclxuaW1wb3J0IHBhcnNlQm9keSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcGFyc2VCb2R5XCI7XHJcbmltcG9ydCB1cGxvYWQgZnJvbSBcIi4uL21pZGRsZXdhcmVzL211bHRlclVwbG9hZFwiO1xyXG5pbXBvcnQgZGVsZXRlRmlsZU9uRXJyb3IgZnJvbSBcIi4uL21pZGRsZXdhcmVzL2RlbGV0ZUZpbGVPbkVycm9yXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciwgZ2V0RmlsZVVSTCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBBY2NpZGVudCB9IGZyb20gXCIuLi9kYXRhc291cmNlXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5yb3V0ZXIudXNlKHJlcXVpcmVMb2dpbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCBhc3luYyAoeyB1c2VyIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQWNjaWRlbnREYXRhU291cmNlID0gbmV3IEFjY2lkZW50KGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGFjY2lkZW50cyA9IGF3YWl0IEFjY2lkZW50RGF0YVNvdXJjZS5nZXRBbGwoKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoYWNjaWRlbnRzKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kICR7YWNjaWRlbnRzLmxlbmd0aH0gYWNjaWRlbnRzLmAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcclxuXHRcIi9cIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiKS5maWVsZHMoW1xyXG5cdFx0eyBuYW1lOiBcImFjY2lkZW50SW1hZ2VTcmNcIiB9LFxyXG5cdFx0eyBuYW1lOiBcImFjY2lkZW50VmlkZW9TcmNcIiB9XHJcblx0XSksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGFzeW5jICh7IHVzZXIsIGJvZHksIGZpbGVzIH0sIHJlcywgbmV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRjb25zdCBBY2NpZGVudERhdGFTb3VyY2UgPSBuZXcgQWNjaWRlbnQoZGIsIHVzZXIpO1xyXG5cdFx0Y29uc3QgYWNjaWRlbnRJbWFnZVNyYyA9XHJcblx0XHRcdGZpbGVzICYmXHJcblx0XHRcdGZpbGVzLmFjY2lkZW50SW1hZ2VTcmMgJiZcclxuXHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyY1swXSAmJlxyXG5cdFx0XHRmaWxlcy5hY2NpZGVudEltYWdlU3JjWzBdLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXHJcblx0XHRcdFx0XCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiLFxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50SW1hZ2VTcmNbMF0uZmlsZW5hbWVcclxuXHRcdFx0KTtcclxuXHRcdGNvbnN0IGFjY2lkZW50VmlkZW9TcmMgPVxyXG5cdFx0XHRmaWxlcyAmJlxyXG5cdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjICYmXHJcblx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0gJiZcclxuXHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyY1swXS5maWxlbmFtZSAmJlxyXG5cdFx0XHRnZXRGaWxlVVJMKFxyXG5cdFx0XHRcdFwiY2FyYm9va2luZy9tZWRpYS9hY2NpZGVudHNcIixcclxuXHRcdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjWzBdLmZpbGVuYW1lXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgY3JlYXRlZEFjY2lkZW50ID0gYXdhaXQgQWNjaWRlbnREYXRhU291cmNlLmNyZWF0ZSh7XHJcblx0XHRcdFx0Li4uYm9keSxcclxuXHRcdFx0XHRhY2NpZGVudEltYWdlU3JjLFxyXG5cdFx0XHRcdGFjY2lkZW50VmlkZW9TcmNcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKGNyZWF0ZWRBY2NpZGVudCk7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXCJBY2NpZGVudCBoYXMgYmVlbiBjcmVhdGVkLlwiLCByZXMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdG5leHQoKTtcclxuXHR9LFxyXG5cdGRlbGV0ZUZpbGVPbkVycm9yXHJcbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBBY2NpZGVudERhdGFTb3VyY2UgPSBuZXcgQWNjaWRlbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgZm91bmRBY2NpZGVudCA9IGF3YWl0IEFjY2lkZW50RGF0YVNvdXJjZS5nZXQocGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoZm91bmRBY2NpZGVudC5nZXQoeyBwbGFpbjogdHJ1ZSB9KSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBGb3VuZCBhY2NpZGVudCB3aXRoIElEICR7cGFyYW1zLmlkfWAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXHJcblx0XCIvOmlkXCIsXHJcblx0dXBsb2FkKFwiY2FyYm9va2luZy9tZWRpYS9hY2NpZGVudHNcIikuZmllbGRzKFtcclxuXHRcdHsgbmFtZTogXCJhY2NpZGVudEltYWdlU3JjXCIgfSxcclxuXHRcdHsgbmFtZTogXCJhY2NpZGVudFZpZGVvU3JjXCIgfVxyXG5cdF0pLFxyXG5cdHBhcnNlQm9keSxcclxuXHRhc3luYyAoeyB1c2VyLCBwYXJhbXMsIGJvZHksIGZpbGVzIH0sIHJlcywgbmV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRjb25zdCBBY2NpZGVudERhdGFTb3VyY2UgPSBuZXcgQWNjaWRlbnQoZGIsIHVzZXIpO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGFjY2lkZW50SW1hZ2VTcmMgPVxyXG5cdFx0XHRcdGZpbGVzICYmXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyYyAmJlxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50SW1hZ2VTcmNbMF0gJiZcclxuXHRcdFx0XHRmaWxlcy5hY2NpZGVudEltYWdlU3JjWzBdLmZpbGVuYW1lICYmXHJcblx0XHRcdFx0Z2V0RmlsZVVSTChcclxuXHRcdFx0XHRcdFwiY2FyYm9va2luZy9tZWRpYS9hY2NpZGVudHNcIixcclxuXHRcdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0uZmlsZW5hbWVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRjb25zdCBhY2NpZGVudFZpZGVvU3JjID1cclxuXHRcdFx0XHRmaWxlcyAmJlxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmMgJiZcclxuXHRcdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjWzBdICYmXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyY1swXS5maWxlbmFtZSAmJlxyXG5cdFx0XHRcdGdldEZpbGVVUkwoXHJcblx0XHRcdFx0XHRcImNhcmJvb2tpbmcvbWVkaWEvYWNjaWRlbnRzXCIsXHJcblx0XHRcdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjWzBdLmZpbGVuYW1lXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0Y29uc3QgW3ByZXZpb3VzVmFsdWUsIHVwZGF0ZWRBY2NpZGVudF0gPSBhd2FpdCBBY2NpZGVudERhdGFTb3VyY2UudXBkYXRlKFxyXG5cdFx0XHRcdHBhcmFtcy5pZCxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQuLi5ib2R5LFxyXG5cdFx0XHRcdFx0YWNjaWRlbnRJbWFnZVNyYyxcclxuXHRcdFx0XHRcdGFjY2lkZW50VmlkZW9TcmNcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHRcdGFjY2lkZW50SW1hZ2VTcmMgJiZcclxuXHRcdFx0XHRhZGRSZXBsYWNlZEZpbGVzKHJlcywge1xyXG5cdFx0XHRcdFx0dXJsOiBwcmV2aW91c1ZhbHVlLmFjY2lkZW50SW1hZ2VTcmMsXHJcblx0XHRcdFx0XHRtb2RlbDogZGIuQWNjaWRlbnQsXHJcblx0XHRcdFx0XHRmaWVsZDogXCJhY2NpZGVudEltYWdlU3JjXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0YWNjaWRlbnRWaWRlb1NyYyAmJlxyXG5cdFx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0XHR1cmw6IHByZXZpb3VzVmFsdWUuYWNjaWRlbnRWaWRlb1NyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5BY2NpZGVudCxcclxuXHRcdFx0XHRcdGZpZWxkOiBcImFjY2lkZW50VmlkZW9TcmNcIlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHVwZGF0ZWRBY2NpZGVudCk7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdFx0YEFjY2lkZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIHVwZGF0ZWQuYCxcclxuXHRcdFx0XHRyZXNcclxuXHRcdFx0KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdG5leHQoKTtcclxuXHR9LFxyXG5cdGRlbGV0ZUZpbGVPbkVycm9yLFxyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXNcclxuKTtcclxuXHJcbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcywgbmV4dCkgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IEFjY2lkZW50RGF0YVNvdXJjZSA9IG5ldyBBY2NpZGVudChkYiwgdXNlcik7XHJcblx0dHJ5IHtcclxuXHRcdGF3YWl0IEFjY2lkZW50RGF0YVNvdXJjZS5kZWxldGUocGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdGBBY2NpZGVudCB3aXRoIElEICR7cGFyYW1zLmlkfSBoYXMgYmVlbiBkZWxldGVkLmAsXHJcblx0XHRcdHJlc1xyXG5cdFx0KTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0bmV4dCgpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHBhc3Nwb3J0IGZyb20gXCJwYXNzcG9ydFwiO1xyXG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcbmltcG9ydCB7IGNoZWNrLCBvbmVPZiwgdmFsaWRhdGlvblJlc3VsdCB9IGZyb20gXCJleHByZXNzLXZhbGlkYXRvclwiO1xyXG5cclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IHNlbmRQYXNzd29yZFJlc2V0VG9rZW4gfSBmcm9tIFwiLi4vdXRpbHMvbWFpbFwiO1xyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IFBhc3N3b3JkUmVzZXRUb2tlbiB9IGZyb20gXCIuLi90eXBpbmdzXCI7XHJcblxyXG5jb25zdCB7IHNlY3JldEtleSB9ID0gY29uZmlnO1xyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldChcIi9tZVwiLCByZXF1aXJlTG9naW4sIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEocmVxLnVzZXIpO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJZb3UgYXJlIGxvZ2dlZCBpbi5cIik7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxucm91dGVyLnBhdGNoKFwiL21lXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgZnVuY3Rpb24oeyB1c2VyLCBib2R5IH0sIHJlcykge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRsZXQgbWUgPSB1c2VyICYmIChhd2FpdCBkYi5Vc2VyLmZpbmRCeVBrKHVzZXIuaWQpKTtcclxuXHRpZiAobWUpIHtcclxuXHRcdGlmIChib2R5LnBhc3N3b3JkICYmIGJvZHkucGFzc3dvcmRPbGQpIHtcclxuXHRcdFx0bGV0IHNhbWVQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGJvZHkucGFzc3dvcmQsIG1lLnBhc3N3b3JkKTtcclxuXHRcdFx0aWYgKCFzYW1lUGFzc3dvcmQpIHtcclxuXHRcdFx0XHRsZXQgdmFsaWRPbGRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKFxyXG5cdFx0XHRcdFx0Ym9keS5wYXNzd29yZE9sZCxcclxuXHRcdFx0XHRcdG1lLnBhc3N3b3JkXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHRsZXQgbmV3UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChib2R5LnBhc3N3b3JkLCAxMCk7XHJcblx0XHRcdFx0aWYgKHZhbGlkT2xkUGFzc3dvcmQpIHtcclxuXHRcdFx0XHRcdGF3YWl0IG1lLnVwZGF0ZSh7IHBhc3N3b3JkOiBuZXdQYXNzd29yZCB9KTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJTdWNjZXNzZnVsbHkgdXBkYXRlZC5cIik7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMCk7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiSW52YWxpZCBvbGQgcGFzc3dvcmQuXCIpO1xyXG5cdFx0XHRcdFx0cmVzLnN0YXR1cyg0MDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMCk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIk9sZCBwYXNzd29yZCBpcyBzYW1lIGFzIHRoZSBuZXcgb25lLlwiKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDEpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlVuYXV0aG9yaXplZC4gQXJlIHlvdSBsb2dnZWQgaW4/XCIpO1xyXG5cdFx0cmVzLnN0YXR1cyg0MDEpO1xyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXHJcblx0XCIvbG9naW5cIixcclxuXHRmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xyXG5cdFx0cGFzc3BvcnQuYXV0aGVudGljYXRlKFwibG9jYWxcIiwgZnVuY3Rpb24oZXJyLCB1c2VyLCBpbmZvKSB7XHJcblx0XHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoZXJyLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXVzZXIpIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiSW52YWxpZCBsb2dpbiBkZXRhaWxzXCIpO1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXEubG9nSW4odXNlciwgZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdFx0Ly8gVE9ETzogVXBkYXRlZCBsYXN0IGxvZ2luIGluIHVzZXIuXHJcblx0XHRcdFx0ZGIuVXNlci5maW5kQnlQayh1c2VyLmlkKS50aGVuKHVzZXIgPT4ge1xyXG5cdFx0XHRcdFx0dXNlciAmJlxyXG5cdFx0XHRcdFx0XHR1c2VyLnVwZGF0ZSh7IGxhc3RMb2dpbjogbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzc1wiKSB9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV4dChlcnIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiTG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiLCByZXMpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UudG9PYmplY3QoKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSkocmVxLCByZXMsIG5leHQpO1xyXG5cdH0sXHJcblx0ZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuXHRcdHJlcy5qc29uKHJlcS51c2VyKTtcclxuXHR9XHJcbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL2xvZ291dFwiLCBmdW5jdGlvbihyZXEsIHJlcykge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlN1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0LlwiKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlcS5sb2dvdXQoKTtcclxuXHRyZXMuc3RhdHVzKDIwMCk7XHJcblx0cmVzLnNlbmQocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFxyXG5cdFwiL2ZvcmdvdFwiLFxyXG5cdG9uZU9mKFtcclxuXHRcdGNoZWNrKFwiZW1haWxcIilcclxuXHRcdFx0LmV4aXN0cyh7IGNoZWNrTnVsbDogdHJ1ZSB9KVxyXG5cdFx0XHQud2l0aE1lc3NhZ2UoXCJFbWFpbCBjYW5ub3QgYmUgZW1wdHlcIilcclxuXHRcdFx0LmlzRW1haWwoKVxyXG5cdFx0XHQud2l0aE1lc3NhZ2UoXCJJbnZhbGlkIGVtYWlsXCIpLFxyXG5cdFx0W1xyXG5cdFx0XHRjaGVjayhcInRva2VuXCIpXHJcblx0XHRcdFx0LmV4aXN0cyh7IGNoZWNrTnVsbDogdHJ1ZSB9KVxyXG5cdFx0XHRcdC53aXRoTWVzc2FnZShcIllvdSBkbyBub3QgaGF2ZSBhIHJlc2V0IHRva2VuLlwiKSxcclxuXHRcdFx0Y2hlY2soXCJwYXNzd29yZFwiKVxyXG5cdFx0XHRcdC5leGlzdHMoeyBjaGVja051bGw6IHRydWUgfSlcclxuXHRcdFx0XHQuaXNMZW5ndGgoeyBtaW46IDgsIG1heDogMzIgfSlcclxuXHRcdFx0XHQud2l0aE1lc3NhZ2UoXCJBIG5ldyBwYXNzd29yZCBzaG91bGQgYmUgcHJvdmlkZWRcIilcclxuXHRcdF1cclxuXHRdKSxcclxuXHRhc3luYyBmdW5jdGlvbihyZXEsIHJlcykge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblxyXG5cdFx0Y29uc3QgZXJyb3JzID0gdmFsaWRhdGlvblJlc3VsdChyZXEpO1xyXG5cdFx0aWYgKCFlcnJvcnMuaXNFbXB0eSgpKSB7XHJcblx0XHRcdGZvciAobGV0IGVycm9yIG9mIGVycm9ycy5hcnJheSgpKSByZXNwb25zZS5hcHBlbmRFcnJvcihlcnJvci5tc2cpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiSW52YWxpZCBmaWVsZHNcIik7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDIyKTtcclxuXHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDIyKS5qc29uKHJlc3BvbnNlKTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHsgZW1haWwsIHRva2VuLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XHJcblxyXG5cdFx0aWYgKHRva2VuKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgdmFsaWRUb2tlbiA9IGp3dC52ZXJpZnkodG9rZW4sIHNlY3JldEtleSkgYXMgUGFzc3dvcmRSZXNldFRva2VuO1xyXG5cdFx0XHRcdGlmICh2YWxpZFRva2VuICYmIHZhbGlkVG9rZW4ucGFzc3dvcmRSZXNldCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdXNlciA9IGF3YWl0IGRiLlVzZXIuZmluZE9uZSh7XHJcblx0XHRcdFx0XHRcdHdoZXJlOiB7IGVtYWlsOiB2YWxpZFRva2VuLmVtYWlsIH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xyXG5cdFx0XHRcdFx0dXNlciAmJiAoYXdhaXQgdXNlci51cGRhdGUoeyBwYXNzd29yZDogbmV3UGFzc3dvcmQgfSkpO1xyXG5cdFx0XHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJQYXNzd29yZCBoYXMgYmVlbiByZXNldC5cIik7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIkludmFsaWQgdG9rZW5cIik7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MjIpO1xyXG5cdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbihyZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoZW1haWwpIHtcclxuXHRcdFx0Y29uc3QgZm91bmRFbWFpbCA9IGF3YWl0IGRiLlVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSk7XHJcblx0XHRcdGlmIChmb3VuZEVtYWlsKSB7XHJcblx0XHRcdFx0c2VuZFBhc3N3b3JkUmVzZXRUb2tlbih7XHJcblx0XHRcdFx0XHRlbWFpbCxcclxuXHRcdFx0XHRcdHVybDogYCR7cHJvY2Vzcy5lbnYuQ0xJRU5UX1VSTH0vbG9naW4vZm9yZ290YFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJBIHJlc2V0IGNvZGUgaGFzIGJlZW4gc2VudC5cIik7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQuY2F0Y2goZSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiVW5rbm93biBlcnJvci5cIik7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNTAwKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJFbWFpbCBpcyBub3QgcmVnaXN0ZXJlZC5cIik7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDQpO1xyXG5cdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbihyZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5pbXBvcnQgeyBCb29raW5nLCBCb29raW5nQ3JlYXRlT3B0aW9ucywgQm9va2luZ1VwZGF0ZU9wdGlvbnMgfSBmcm9tIFwiLi4vYXBpXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxuXHJcbnJvdXRlci5nZXQ8dW5kZWZpbmVkLCBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz5bXT4sIHVuZGVmaW5lZD4oXHJcblx0XCIvXCIsXHJcblx0YXN5bmMgKHsgdXNlciB9LCByZXMpID0+IHtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPltdPigpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgZm91bmRCb29raW5ncyA9IGF3YWl0IEJvb2tpbmcuZ2V0QWxsKHVzZXIpO1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRcdGBGb3VuZCAke2ZvdW5kQm9va2luZ3MuZGF0YS5sZW5ndGh9IGJvb2tpbmdzLmAsXHJcblx0XHRcdFx0cmVzXHJcblx0XHRcdCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoZm91bmRCb29raW5ncy5jYXN0KHVzZXIpKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0fVxyXG4pO1xyXG5cclxucm91dGVyLnBvc3Q8XHJcblx0dW5kZWZpbmVkLFxyXG5cdFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPj4sXHJcblx0Qm9va2luZ0NyZWF0ZU9wdGlvbnNcclxuPihcIi9cIiwgYXN5bmMgKHsgdXNlciwgYm9keSB9LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+KCk7XHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGNyZWF0ZWRCb29raW5nID0gYXdhaXQgQm9va2luZy5jcmVhdGUodXNlciwgYm9keSk7XHJcblxyXG5cdFx0Y3JlYXRlZEJvb2tpbmcuc2V0RW1haWxOb3RpZmljYXRpb25zVG9Cb29raW5nTWFuYWdlcnMoKTtcclxuXHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGNyZWF0ZWRCb29raW5nLmNhc3QodXNlcikpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkJvb2tpbmcgaGFzIGJlZW4gY3JlYXRlZC5cIiwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmdldDxcclxuXHR7IGlkOiBzdHJpbmcgfSxcclxuXHRSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+LFxyXG5cdHVuZGVmaW5lZFxyXG4+KFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+KCk7XHJcblx0dHJ5IHtcclxuXHRcdGxldCBmb3VuZEJvb2tpbmcgPSBhd2FpdCBCb29raW5nLmdldCh1c2VyLCBwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZEJvb2tpbmcuY2FzdCh1c2VyKSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBCb29raW5nIHdpdGggSUQgb2YgJHtwYXJhbXMuaWR9IGZvdW5kLmAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaDxcclxuXHR7IGlkOiBzdHJpbmcgfSxcclxuXHRSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+LFxyXG5cdEJvb2tpbmdVcGRhdGVPcHRpb25zXHJcbj4oXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcywgYm9keSB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPj4oKTtcclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgYm9va2luZ1ByZXZpb3VzVmFsdWUgPSBhd2FpdCBCb29raW5nLmdldCh1c2VyLCBwYXJhbXMuaWQpO1xyXG5cdFx0Y29uc3QgdXBkYXRlZEJvb2tpbmcgPSBhd2FpdCBib29raW5nUHJldmlvdXNWYWx1ZS51cGRhdGUodXNlciwgYm9keSk7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHRib2R5LmFtb3VudCAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdGJvZHkuYW1vdW50ICE9PSBudWxsICYmXHJcblx0XHRcdGJvb2tpbmdQcmV2aW91c1ZhbHVlLmRhdGEuYW1vdW50ID09PSBudWxsXHJcblx0XHQpIHtcclxuXHRcdFx0dXBkYXRlZEJvb2tpbmcuc2VuZEludm9pY2UoYm9keS5hbW91bnQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGJvZHkuYXBwcm92ZWQgPT09IHRydWUgJiYgYm9va2luZ1ByZXZpb3VzVmFsdWUuZGF0YS5hcHByb3ZlZCA9PT0gbnVsbCkge1xyXG5cdFx0XHR1cGRhdGVkQm9va2luZy5zZW5kQm9va2luZ0NvbmZpcm1hdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZEJvb2tpbmcuY2FzdCh1c2VyKSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiQm9va2luZyBoYXMgYmVlbiB1cGRhdGVkXCIsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5kZWxldGU8XHJcblx0eyBpZDogc3RyaW5nIH0sXHJcblx0UmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PixcclxuXHR1bmRlZmluZWRcclxuPihcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PigpO1xyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZEJvb2tpbmcgPSBhd2FpdCBCb29raW5nLmdldCh1c2VyLCBwYXJhbXMuaWQpO1xyXG5cdFx0YXdhaXQgZm91bmRCb29raW5nLmRlc3Ryb3kodXNlcik7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGZvdW5kQm9va2luZy5jYXN0KHVzZXIpKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdGBCb29raW5nIHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIGRlbGV0ZWQuYCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcblxyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHMvXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBkYi5DYXRlZ29yeS5maW5kQWxsKCk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShjYXRlZ29yaWVzKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKG51bGwpO1xyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcIi9cIiwgcmVxdWlyZUxvZ2luLCBhc3luYyAoeyBib2R5IH0sIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBjcmVhdGVkID0gYXdhaXQgZGIuQ2F0ZWdvcnkuY3JlYXRlKHtcclxuXHRcdG5hbWU6IGJvZHkubmFtZSxcclxuXHRcdGNsaWVudElkOiBib2R5LmNsaWVudElkXHJcblx0fSk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShjcmVhdGVkKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKG51bGwpO1xyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXCIvOmlkXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgcGFyYW1zLCBib2R5IH0sIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBmb3VuZCA9IGF3YWl0IGRiLkNhdGVnb3J5LmZpbmRCeVBrKHBhcmFtcy5pZCk7XHJcblx0Zm91bmQgJiYgZm91bmQudXBkYXRlKHsgbmFtZTogYm9keS5uYW1lLCBjbGllbnRJZDogYm9keS5jbGllbnRJZCB9KTtcclxuXHRyZXNwb25zZS5zZXREYXRhKGZvdW5kKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKG51bGwpO1xyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZGVsZXRlKFwiLzppZFwiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IHBhcmFtcyB9LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgZm91bmQgPSBhd2FpdCBkYi5DYXRlZ29yeS5maW5kQnlQayhwYXJhbXMuaWQpO1xyXG5cdGZvdW5kICYmIChhd2FpdCBmb3VuZC5kZXN0cm95KCkpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoZm91bmQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MsIHsgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uL2RhdGFzb3VyY2VcIjtcclxuaW1wb3J0IGRiLCB7IExvY2F0aW9uLCBDbGllbnQgYXMgQ2xpZW50TW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5pbXBvcnQgeyBSb2xlLCBMb2NhdGlvbkF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHtcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uLFxyXG5cdEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCBhc3luYyAoeyB1c2VyIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQ2xpZW50RGF0YVNvdXJjZSA9IG5ldyBDbGllbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgY2xpZW50cyA9IGF3YWl0IENsaWVudERhdGFTb3VyY2UuZ2V0QWxsKCk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGNsaWVudHMpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHtjbGllbnRzLmxlbmd0aH0gYWNjaWRlbnRzLmAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcIi9cIiwgYXN5bmMgKHsgdXNlciwgYm9keSB9OiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBDbGllbnREYXRhU291cmNlID0gbmV3IENsaWVudChkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBjcmVhdGVkQ2xpZW50ID0gYXdhaXQgQ2xpZW50RGF0YVNvdXJjZS5jcmVhdGUoe1xyXG5cdFx0XHQuLi5ib2R5LFxyXG5cdFx0XHRjbGllbnRJZDogdXNlci5jbGllbnRJZFxyXG5cdFx0fSk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGNyZWF0ZWRDbGllbnQpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkNsaWVudCBoYXMgYmVlbiBjcmVhdGVkXCIsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBDbGllbnREYXRhU291cmNlID0gbmV3IENsaWVudChkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZENsaWVudCA9IGF3YWl0IENsaWVudERhdGFTb3VyY2UuZ2V0KHBhcmFtcy5pZCk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHtcclxuXHRcdFx0Li4uZm91bmRDbGllbnQuZ2V0KHsgcGxhaW46IHRydWUgfSksXHJcblx0XHRcdGxvY2F0aW9uczogKGF3YWl0IGZvdW5kQ2xpZW50LmdldExvY2F0aW9ucygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0fSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBGb3VuZCBhY2NpZGVudCB3aXRoIElEICR7cGFyYW1zLmlkfWAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcywgYm9keSB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IENsaWVudERhdGFTb3VyY2UgPSBuZXcgQ2xpZW50KGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IFtwcmV2aW91c1ZhbHVlLCB1cGRhdGVkVmFsdWVdID0gYXdhaXQgQ2xpZW50RGF0YVNvdXJjZS51cGRhdGUoXHJcblx0XHRcdHBhcmFtcy5pZCxcclxuXHRcdFx0Ym9keVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHVwZGF0ZWRWYWx1ZSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRgQ2xpZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIHVwZGF0ZWQuYCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQ2xpZW50RGF0YVNvdXJjZSA9IG5ldyBDbGllbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdGF3YWl0IENsaWVudERhdGFTb3VyY2UuZGVsZXRlKHBhcmFtcy5pZCk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRgQ2xpZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIGRlbGV0ZWQuYCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQ8eyBpZDogc3RyaW5nIH0+KFxyXG5cdFwiLzppZC9sb2NhdGlvbnNcIixcclxuXHRyZXF1aXJlTG9naW4sXHJcblx0YXN5bmMgKHsgdXNlciwgcGFyYW1zIH0sIHJlcykgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPExvY2F0aW9uQXR0cmlidXRlc1tdPigpO1xyXG5cclxuXHRcdC8vIFRPRE86IEFic3RyYWN0aW9uIG9mIGFwaXNcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBmb3VuZENsaWVudCA9IGF3YWl0IENsaWVudE1vZGVsLmZpbmRCeVBrKHBhcmFtcy5pZCk7XHJcblxyXG5cdFx0XHRpZiAoIWZvdW5kQ2xpZW50KSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24oXHJcblx0XHRcdFx0XHRgVXNlciB3aXRoIElEICR7cGFyYW1zLmlkfSBjYW5ub3QgYmUgZm91bmQuYFxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHVzZXIucm9sZSAhPT0gUm9sZS5NQVNURVIgJiYgZm91bmRDbGllbnQuaWQgIT09IHVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgY2xpZW50TG9jYXRpb25zID0gYXdhaXQgTG9jYXRpb24uZmluZEFsbCh7XHJcblx0XHRcdFx0aW5jbHVkZTogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtb2RlbDogQ2xpZW50TW9kZWwsXHJcblx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IGZvdW5kQ2xpZW50LmlkXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YShjbGllbnRMb2NhdGlvbnMpO1xyXG5cclxuXHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgRm91bmQgJHtjbGllbnRMb2NhdGlvbnMubGVuZ3RofSBsb2NhdGlvbnMuYCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlLnRvT2JqZWN0KCkpO1xyXG5cdH1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuXHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBzZW5kSW52aXRlIH0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuaW1wb3J0IHJlcXVpcmVMb2dpbiBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luXCI7XHJcbmltcG9ydCBkaXNhbGxvd0d1ZXN0cyBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGlzYWxsb3dHdWVzdHNcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxucm91dGVyLnVzZShkaXNhbGxvd0d1ZXN0cyk7XHJcblxyXG4vL1RPRE86IGNoZWNrIGlmIGVtYWlsIGFscmVhZHkgZXhpc3RzIGluIERCLlxyXG4vLyBTZW5kIGFuIGludml0ZSB0byBhbiBlbWFpbFxyXG5yb3V0ZXIucG9zdChcIi9cIiwgYXN5bmMgKHsgYm9keSwgdXNlciB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0Ly8gQ2hlY2sgaWYgZW1haWwgaXMgcHJvdmlkZWQuXHJcblx0aWYgKGJvZHkuZW1haWwpIHtcclxuXHRcdC8vIFNlbmQgZW1haWwgaW52aXRlXHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgZXhpc3RpbmdFbWFpbCA9IGF3YWl0IGRiLlVzZXIuZmluZE9uZSh7XHJcblx0XHRcdFx0d2hlcmU6IHsgZW1haWw6IGJvZHkuZW1haWwgfVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKCFleGlzdGluZ0VtYWlsKSB7XHJcblx0XHRcdFx0YXdhaXQgc2VuZEludml0ZSh7IGVtYWlsOiBib2R5LmVtYWlsLCBjbGllbnRJZDogdXNlci5jbGllbnRJZCB9KTtcclxuXHRcdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBJbnZpdGUgaGFzIGJlZW4gc2VudCB0byAke2JvZHkuZW1haWx9YCwgcmVzKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFbWFpbCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJQbGVhc2UgcHJvdmlkZSBhbiBlbWFpbCBhZGRyZXNzLlwiKTtcclxuXHRcdHJlc3BvbnNlLnNldENvZGUoNDIyKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5pbXBvcnQgZGlzYWxsb3dHdWVzdHMgZnJvbSBcIi4uL21pZGRsZXdhcmVzL2Rpc2FsbG93R3Vlc3RzXCI7XHJcbmltcG9ydCBwYXJzZUJvZHkgZnJvbSBcIi4uL21pZGRsZXdhcmVzL3BhcnNlQm9keVwiO1xyXG5pbXBvcnQgZGVsZXRlRmlsZU9uRXJyb3IgZnJvbSBcIi4uL21pZGRsZXdhcmVzL2RlbGV0ZUZpbGVPbkVycm9yXCI7XHJcbmltcG9ydCB7XHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlcyxcclxuXHRhZGRSZXBsYWNlZEZpbGVzXHJcbn0gZnJvbSBcIi4uL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXNcIjtcclxuaW1wb3J0IHVwbG9hZCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IGdldEZpbGVVUkwsIFJlc3BvbnNlQnVpbGRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCIuLi9kYXRhc291cmNlXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5yb3V0ZXIudXNlKHJlcXVpcmVMb2dpbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCBhc3luYyAoeyB1c2VyIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgTG9jYXRpb25EYXRhU291cmNlID0gbmV3IExvY2F0aW9uKGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGxvY2F0aW9ucyA9IGF3YWl0IExvY2F0aW9uRGF0YVNvdXJjZS5nZXRBbGwoKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEobG9jYXRpb25zKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kICR7bG9jYXRpb25zLmxlbmd0aH0gbG9jYXRpb25zLiBgLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXHJcblx0XCIvXCIsXHJcblx0dXBsb2FkKFwiY2FyYm9va2luZy9tZWRpYS9sb2NhdGlvbnNcIikuc2luZ2xlKFwibG9jYXRpb25JbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHsgdXNlciwgYm9keSB9LCByZXMpID0+IHtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0Y29uc3QgTG9jYXRpb25EYXRhU291cmNlID0gbmV3IExvY2F0aW9uKGRiLCB1c2VyKTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBjcmVhdGVkTG9jYXRpb24gPSBhd2FpdCBMb2NhdGlvbkRhdGFTb3VyY2UuY3JlYXRlKGJvZHkpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKGNyZWF0ZWRMb2NhdGlvbik7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXCJMb2NhdGlvbiBoYXMgYmVlbiBjcmVhdGVkLlwiLCByZXMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9LFxyXG5cdGRlbGV0ZUZpbGVPbkVycm9yXHJcbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBMb2NhdGlvbkRhdGFTb3VyY2UgPSBuZXcgTG9jYXRpb24oZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb24gPSBhd2FpdCBMb2NhdGlvbkRhdGFTb3VyY2UuZ2V0KHBhcmFtcy5pZCk7XHJcblxyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZExvY2F0aW9uLmdldCh7IHBsYWluOiB0cnVlIH0pKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdGBGb3VuZCBsb2NhdGlvbiB3aXRoIElEIG9mICR7Zm91bmRMb2NhdGlvbi5pZH1gLFxyXG5cdFx0XHRyZXNcclxuXHRcdCk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXHJcblx0XCIvOmlkXCIsXHJcblx0dXBsb2FkKFwiY2FyYm9va2luZy9tZWRpYS9sb2NhdGlvbnNcIikuc2luZ2xlKFwibG9jYXRpb25JbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHsgdXNlciwgcGFyYW1zLCBib2R5LCBmaWxlID0ge30gfSwgcmVzKSA9PiB7XHJcblx0XHRjb25zdCBmaWxlTG9jYXRpb24gPVxyXG5cdFx0XHRmaWxlICYmXHJcblx0XHRcdGZpbGUuZmlsZW5hbWUgJiZcclxuXHRcdFx0Z2V0RmlsZVVSTChcImNhcmJvb2tpbmcvbWVkaWEvdXNlcnMvcHJvZmlsZVwiLCBmaWxlLmZpbGVuYW1lKTtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0Y29uc3QgTG9jYXRpb25EYXRhU291cmNlID0gbmV3IExvY2F0aW9uKGRiLCB1c2VyKTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCB1cGRhdGVkTG9jYXRpb24gPSBhd2FpdCBMb2NhdGlvbkRhdGFTb3VyY2UudXBkYXRlKHBhcmFtcy5pZCwgYm9keSk7XHJcblx0XHRcdGZpbGVMb2NhdGlvbiAmJlxyXG5cdFx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0XHR1cmw6IHVwZGF0ZWRMb2NhdGlvbi5sb2NhdGlvbkltYWdlU3JjLFxyXG5cdFx0XHRcdFx0bW9kZWw6IGRiLkxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0ZmllbGQ6IFwibG9jYXRpb25JbWFnZVNyY1wiXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHVwZGF0ZWRMb2NhdGlvbi5nZXQoeyBwbGFpbjogdHJ1ZSB9KSk7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYExvY2F0aW9uIHdpdGggSUQgJHtwYXJhbXMuaWR9IHVwZGF0ZWQuYCwgcmVzKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0fSxcclxuXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3IsXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IExvY2F0aW9uRGF0YVNvdXJjZSA9IG5ldyBMb2NhdGlvbihkYiwgdXNlcik7XHJcblx0dHJ5IHtcclxuXHRcdGxldCBkZWxldGVkTG9jYXRpb24gPSBhd2FpdCBMb2NhdGlvbkRhdGFTb3VyY2UuZGVsZXRlKHBhcmFtcy5pZCk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGRlbGV0ZWRMb2NhdGlvbi5nZXQoeyBwbGFpbjogdHJ1ZSB9KSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRgTG9jYXRpb24gd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gZGVsZXRlZC5gLFxyXG5cdFx0XHRyZXNcclxuXHRcdCk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgV2lhbG9uIH0gZnJvbSBcIm5vZGUtd2lhbG9uXCI7XHJcbmltcG9ydCB7IE9wLCBGaWx0ZXJhYmxlIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5cclxuaW1wb3J0IHsgcmVxdWlyZUhpZ2hlck9yRXF1YWxSb2xlIH0gZnJvbSBcIi4uL21pZGRsZXdhcmVzXCI7XHJcbmltcG9ydCB7XHJcblx0VmVoaWNsZSxcclxuXHRCb29raW5nLFxyXG5cdEFjY2lkZW50LFxyXG5cdFZlaGljbGVJc3N1ZSxcclxuXHRMb2NhdGlvbixcclxuXHRDYXRlZ29yeVxyXG59IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyLCBSb2xlVXRpbHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UocmVxdWlyZUhpZ2hlck9yRXF1YWxSb2xlKFJvbGUuS0VZX01BTkFHRVIpKTtcclxuXHJcbmludGVyZmFjZSBVbml0U3VtbWFyeVJlc3BvbnNlIHtcclxuXHRwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cdGJyYW5kOiBzdHJpbmc7XHJcblx0bW9kZWw6IHN0cmluZztcclxuXHRvZG9tZXRlcjogbnVtYmVyIHwgbnVsbDtcclxuXHRhY2NpZGVudHM6IG51bWJlcjtcclxuXHRib29raW5nczogbnVtYmVyO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdGlzc3VlczogbnVtYmVyO1xyXG5cdGRlZmxlZXRlZDogYm9vbGVhbjtcclxuXHR3aWFsb25Vbml0OiBib29sZWFuO1xyXG5cdHdpYWxvblVuaXROYW1lPzogc3RyaW5nIHwgbnVsbDtcclxuXHRjbGllbnQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbnJvdXRlci5nZXQoXCIvdW5pdC1zdW1tYXJ5XCIsIGFzeW5jICh7IHVzZXIgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxVbml0U3VtbWFyeVJlc3BvbnNlW10+KCk7XHJcblx0Y29uc3QgdyA9IGF3YWl0IFdpYWxvbi5sb2dpbih7IHRva2VuOiBwcm9jZXNzLmVudi5XSUFMT05fVE9LRU4gfSk7XHJcblxyXG5cdGxldCB3aGVyZU9wdGlvbnM6IEZpbHRlcmFibGVbXCJ3aGVyZVwiXSA9IHsgY2xpZW50SWQ6IHVzZXIuY2xpZW50SWQgfTtcclxuXHJcblx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5NQVNURVIpIHtcclxuXHRcdHdoZXJlT3B0aW9ucyA9IHt9O1xyXG5cdH1cclxuXHJcblx0bGV0IGNsaWVudFVzZXJzSWRzID0gKFxyXG5cdFx0YXdhaXQgVmVoaWNsZS5maW5kQWxsKHtcclxuXHRcdFx0d2hlcmU6IHdoZXJlT3B0aW9uc1xyXG5cdFx0fSlcclxuXHQpLm1hcCh1c2VyID0+IHVzZXIuaWQpO1xyXG5cclxuXHRsZXQgY2xpZW50VmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlLmZpbmRBbGwoe1xyXG5cdFx0d2hlcmU6IHdoZXJlT3B0aW9ucyxcclxuXHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG1vZGVsOiBBY2NpZGVudCxcclxuXHRcdFx0XHRhczogXCJhY2NpZGVudHNcIixcclxuXHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0dXNlcklkOiB7XHJcblx0XHRcdFx0XHRcdFtPcC5pbl06IGNsaWVudFVzZXJzSWRzXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRyZXF1aXJlZDogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG1vZGVsOiBCb29raW5nLFxyXG5cdFx0XHRcdGFzOiBcImJvb2tpbmdzXCIsXHJcblx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdHVzZXJJZDoge1xyXG5cdFx0XHRcdFx0XHRbT3AuaW5dOiBjbGllbnRVc2Vyc0lkc1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRtb2RlbDogQ2F0ZWdvcnksXHJcblx0XHRcdFx0YXM6IFwiY2F0ZWdvcmllc1wiLFxyXG5cdFx0XHRcdHdoZXJlOiB3aGVyZU9wdGlvbnMsXHJcblx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRtb2RlbDogVmVoaWNsZUlzc3VlLFxyXG5cdFx0XHRcdGFzOiBcInZlaGljbGVJc3N1ZXNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRMb2NhdGlvblxyXG5cdFx0XVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB1bml0cyA9IGF3YWl0IHcuVXRpbHMuZ2V0VW5pdHMoeyBmbGFnczogODE5MiArIDEgfSk7XHJcblxyXG5cdGNvbnN0IGRhdGEgPSBjbGllbnRWZWhpY2xlcy5tYXA8VW5pdFN1bW1hcnlSZXNwb25zZT4odmVoaWNsZSA9PiB7XHJcblx0XHRjb25zdCB3aWFsb25Vbml0ID0gdW5pdHMuaXRlbXMuZmluZChcclxuXHRcdFx0dW5pdCA9PiB1bml0LmlkID09PSB2ZWhpY2xlLndpYWxvblVuaXRJZFxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlcixcclxuXHRcdFx0YnJhbmQ6IHZlaGljbGUuYnJhbmQsXHJcblx0XHRcdG1vZGVsOiB2ZWhpY2xlLm1vZGVsLFxyXG5cdFx0XHRvZG9tZXRlcjogKHdpYWxvblVuaXQgJiYgd2lhbG9uVW5pdC5jbm0pIHx8IG51bGwsXHJcblx0XHRcdGFjY2lkZW50czogdmVoaWNsZS5hY2NpZGVudHMubGVuZ3RoLFxyXG5cdFx0XHRib29raW5nczogdmVoaWNsZS5ib29raW5ncy5maWx0ZXIoYm9va2luZyA9PiBib29raW5nLmZpbmlzaGVkKS5sZW5ndGgsXHJcblx0XHRcdGNhdGVnb3JpZXM6IHZlaGljbGUuY2F0ZWdvcmllcy5tYXAoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkubmFtZSksXHJcblx0XHRcdGlzc3VlczogdmVoaWNsZS52ZWhpY2xlSXNzdWVzLmxlbmd0aCxcclxuXHRcdFx0ZGVmbGVldGVkOiB2ZWhpY2xlLmRlZmxlZXRlZCxcclxuXHRcdFx0d2lhbG9uVW5pdDogQm9vbGVhbih3aWFsb25Vbml0KSxcclxuXHRcdFx0d2lhbG9uVW5pdE5hbWU6IFJvbGVVdGlscy5pc1JvbGVCZXR0ZXIoUm9sZS5NQVNURVIsIHVzZXIucm9sZSlcclxuXHRcdFx0XHQ/ICh3aWFsb25Vbml0ICYmIHdpYWxvblVuaXQubm0pIHx8IG51bGxcclxuXHRcdFx0XHQ6IHVuZGVmaW5lZCxcclxuXHRcdFx0Y2xpZW50OiBSb2xlVXRpbHMuaXNSb2xlQmV0dGVyKFJvbGUuTUFTVEVSLCB1c2VyLnJvbGUpXHJcblx0XHRcdFx0PyB2ZWhpY2xlLmNsaWVudCAmJiB2ZWhpY2xlLmNsaWVudC5uYW1lXHJcblx0XHRcdFx0OiB1bmRlZmluZWRcclxuXHRcdH07XHJcblx0fSk7XHJcblxyXG5cdHJlc3BvbnNlLnNldERhdGEoZGF0YSk7XHJcblx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIlJlcG9ydCBzdWNjZXNzZnVsLlwiLCByZXMpO1xyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmltcG9ydCB7XHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlcyxcclxuXHRhZGRSZXBsYWNlZEZpbGVzXHJcbn0gZnJvbSBcIi4uL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXNcIjtcclxuaW1wb3J0IGRlbGV0ZUZpbGVPbkVycm9yIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvclwiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IGRpc2FsbG93R3Vlc3RzIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kaXNhbGxvd0d1ZXN0c1wiO1xyXG5pbXBvcnQgcGFyc2VCb2R5IGZyb20gXCIuLi9taWRkbGV3YXJlcy9wYXJzZUJvZHlcIjtcclxuaW1wb3J0IHVwbG9hZCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciwgZ2V0RmlsZVVSTCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9kYXRhc291cmNlXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IEludml0ZVRva2VuIH0gZnJvbSBcIi4uL3R5cGluZ3NcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IHVzZXIgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBVc2VyRGF0YVNvdXJjZSA9IG5ldyBVc2VyKGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlckRhdGFTb3VyY2UuZ2V0QWxsKCk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHVzZXJzKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kICR7dXNlcnMubGVuZ3RofSB1c2Vycy5gLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXHJcblx0XCIvXCIsXHJcblx0dXBsb2FkKFwiY2FyYm9va2luZy9tZWRpYS91c2Vycy9wcm9maWxlXCIpLnNpbmdsZShcInVzZXJJbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0YXN5bmMgKHsgdXNlciwgYm9keSwgZmlsZSA9IHt9IH0sIHJlcywgbmV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgeyBsb2NhdGlvbjogZmlsZUxvY2F0aW9uID0gbnVsbCB9ID0gZmlsZTtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0Y29uc3QgVXNlckRhdGFTb3VyY2UgPSBuZXcgVXNlcihkYiwgdXNlcik7XHJcblx0XHRsZXQgaW52aXRlVG9rZW5Vc2VkID0gZmFsc2U7XHJcblx0XHRsZXQgZW1haWwgPSBib2R5LmVtYWlsO1xyXG5cdFx0bGV0IGNsaWVudElkOiBudW1iZXIgfCBudWxsID0gKHVzZXIgJiYgdXNlci5jbGllbnRJZCkgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBDb25zdW1lIGludml0ZSB0b2tlblxyXG5cdFx0aWYgKGJvZHkuaW52aXRlVG9rZW4pIHtcclxuXHRcdFx0Y29uc3QgaW52aXRlVG9rZW4gPSBqd3QudmVyaWZ5KFxyXG5cdFx0XHRcdGJvZHkuaW52aXRlVG9rZW4sXHJcblx0XHRcdFx0Y29uZmlnLnNlY3JldEtleVxyXG5cdFx0XHQpIGFzIEludml0ZVRva2VuO1xyXG5cdFx0XHRpZiAoaW52aXRlVG9rZW4pIHtcclxuXHRcdFx0XHRpbnZpdGVUb2tlblVzZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGVtYWlsID0gaW52aXRlVG9rZW4uZW1haWw7XHJcblx0XHRcdFx0Y2xpZW50SWQgPSBpbnZpdGVUb2tlbi5jbGllbnRJZCB8fCBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2goYm9keS5wYXNzd29yZCwgMTApO1xyXG5cdFx0XHRsZXQgY3JlYXRlZFVzZXIgPSBhd2FpdCBVc2VyRGF0YVNvdXJjZS5jcmVhdGUoXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Li4uYm9keSxcclxuXHRcdFx0XHRcdHVzZXJJbWFnZVNyYzogZmlsZUxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0ZW1haWwsXHJcblx0XHRcdFx0XHRwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXHJcblx0XHRcdFx0XHRjbGllbnRJZDogY2xpZW50SWRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGludml0ZWQ6IGludml0ZVRva2VuVXNlZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoe1xyXG5cdFx0XHRcdGNyZWF0ZWRVc2VyLFxyXG5cdFx0XHRcdGNhdGVnb3JpZXM6IChhd2FpdCBjcmVhdGVkVXNlci5nZXRDYXRlZ29yaWVzKCkpLm1hcChjID0+IGMuaWQpXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlVzZXIgaGFzIGJlZW4gY3JlYXRlZC5cIik7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0cmVzLnN0YXR1cygyMDApO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGUubWVzc2FnZSk7XHJcblx0XHRcdGlmIChlIGluc3RhbmNlb2YgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24pIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQyMik7XHJcblx0XHRcdFx0cmVzLnN0YXR1cyg0MjIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoZS5tZXNzYWdlKTtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMyk7XHJcblx0XHRcdFx0cmVzLnN0YXR1cyg0MDMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZS5lcnJvcnMgJiYgZS5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGUuZXJyb3JzLmZvckVhY2goZXJyb3IgPT4gcmVzcG9uc2UuYXBwZW5kRXJyb3IoZXJyb3IucGF0aCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3JcclxuKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgVXNlckRhdGFTb3VyY2UgPSBuZXcgVXNlcihkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZFVzZXIgPSBhd2FpdCBVc2VyRGF0YVNvdXJjZS5nZXQocGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoe1xyXG5cdFx0XHQuLi5mb3VuZFVzZXIuZ2V0KHsgcGxhaW46IHRydWUgfSksXHJcblx0XHRcdGNhdGVnb3JpZXM6IChhd2FpdCBmb3VuZFVzZXIuZ2V0Q2F0ZWdvcmllcygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0fSk7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGBVc2VyIHdpdGggSUQgJHtwYXJhbXMuaWR9IGZvdW5kLmApO1xyXG5cdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRpZiAoZSBpbnN0YW5jZW9mIFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24pIHtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MDQpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwNCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwMyk7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAzKTtcclxuXHRcdH1cclxuXHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoZS5tZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXHJcblx0XCIvOmlkXCIsXHJcblx0cmVxdWlyZUxvZ2luLFxyXG5cdHVwbG9hZChcImNhcmJvb2tpbmcvbWVkaWEvdXNlcnMvcHJvZmlsZVwiKS5zaW5nbGUoXCJ1c2VySW1hZ2VTcmNcIiksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGFzeW5jICh7IHVzZXIsIGJvZHksIGZpbGUgPSB7fSwgcGFyYW1zIH0sIHJlcywgbmV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgZmlsZUxvY2F0aW9uID1cclxuXHRcdFx0ZmlsZSAmJlxyXG5cdFx0XHRmaWxlLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXCJjYXJib29raW5nL21lZGlhL3VzZXJzL3Byb2ZpbGVcIiwgZmlsZS5maWxlbmFtZSk7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRjb25zdCBVc2VyRGF0YVNvdXJjZSA9IG5ldyBVc2VyKGRiLCB1c2VyKTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgZm91bmRVc2VyID0gYXdhaXQgVXNlckRhdGFTb3VyY2UuZ2V0KGJvZHkuaWQpO1xyXG5cclxuXHRcdFx0ZmlsZUxvY2F0aW9uICYmXHJcblx0XHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHRcdHVybDogZm91bmRVc2VyLnVzZXJJbWFnZVNyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5Vc2VyLFxyXG5cdFx0XHRcdFx0ZmllbGQ6IFwidXNlckltYWdlU3JjXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0aWYgKGJvZHkuY2F0ZWdvcmllcykge1xyXG5cdFx0XHRcdGxldCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEFsbCh7XHJcblx0XHRcdFx0XHR3aGVyZTogeyBpZDogYm9keS5jYXRlZ29yaWVzIH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRhd2FpdCBmb3VuZFVzZXIuJHNldChcImNhdGVnb3JpZXNcIiwgY2F0ZWdvcmllcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IHVwZGF0ZWRVc2VyID0gYXdhaXQgVXNlckRhdGFTb3VyY2UudXBkYXRlKGZvdW5kVXNlci5pZCwge1xyXG5cdFx0XHRcdC4uLmJvZHksXHJcblx0XHRcdFx0dXNlckltYWdlU3JjOiBmaWxlTG9jYXRpb24gfHwgZm91bmRVc2VyLnVzZXJJbWFnZVNyY1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZFVzZXIuZ2V0KHsgcGxhaW46IHRydWUgfSkpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoYFVzZXIgd2l0aCBJRCAke3BhcmFtcy5pZH0gdXBkYXRlZC5gKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdGlmIChlIGluc3RhbmNlb2YgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24pIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGUubWVzc2FnZSk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MjIpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDIyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMyk7XHJcblx0XHRcdFx0cmVzLnN0YXR1cyg0MDMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChlLmVycm9ycyAmJiBlLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0ZS5lcnJvcnMuZm9yRWFjaChlcnJvciA9PiByZXNwb25zZS5hcHBlbmRFcnJvcihlcnJvci5wYXRoKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0XHRuZXh0KCk7XHJcblx0fSxcclxuXHRkZWxldGVGaWxlT25FcnJvcixcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzXHJcbik7XHJcblxyXG5yb3V0ZXIuZGVsZXRlKFxyXG5cdFwiLzppZFwiLFxyXG5cdHJlcXVpcmVMb2dpbixcclxuXHRkaXNhbGxvd0d1ZXN0cyxcclxuXHRhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0XHRjb25zdCBVc2VyRGF0YVNvdXJjZSA9IG5ldyBVc2VyKGRiLCB1c2VyKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBkZWxldGVkVXNlciA9IGF3YWl0IFVzZXJEYXRhU291cmNlLmRlbGV0ZShwYXJhbXMuaWQpO1xyXG5cclxuXHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHR1cmw6IGRlbGV0ZWRVc2VyLnVzZXJJbWFnZVNyYyxcclxuXHRcdFx0XHRtb2RlbDogZGIuVXNlcixcclxuXHRcdFx0XHRmaWVsZDogXCJ1c2VySW1hZ2VTcmNcIlxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgVXNlciB3aXRoIElEICR7cGFyYW1zLmlkfSBoYXMgYmVlbiBkZWxldGVkLmApO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRpZiAoZSBpbnN0YW5jZW9mIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDIyKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQyMik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDMpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZS5lcnJvcnMgJiYgZS5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGUuZXJyb3JzLmZvckVhY2goZXJyb3IgPT4gcmVzcG9uc2UuYXBwZW5kRXJyb3IoZXJyb3IucGF0aCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzL1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCByZXF1aXJlTG9naW4sIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuVmVoaWNsZUlzc3VlLmZpbmRBbGwoKTtcclxuXHRyZXNwb25zZS5zZXREYXRhKGNhdGVnb3JpZXMpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFwiL1wiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IGJvZHkgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGNyZWF0ZWQgPSBhd2FpdCBkYi5WZWhpY2xlSXNzdWUuY3JlYXRlKHtcclxuXHRcdG1lc3NhZ2U6IGJvZHkubWVzc2FnZSxcclxuXHRcdHZlaGljbGVJZDogYm9keS52ZWhpY2xlSWRcclxuXHR9KTtcclxuXHRyZXNwb25zZS5zZXREYXRhKGNyZWF0ZWQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcIi86aWRcIiwgcmVxdWlyZUxvZ2luLCBhc3luYyAoeyBwYXJhbXMsIGJvZHkgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGZvdW5kID0gYXdhaXQgZGIuVmVoaWNsZUlzc3VlLmZpbmRCeVBrKHBhcmFtcy5pZCk7XHJcblx0Zm91bmQgJiYgZm91bmQudXBkYXRlKHsgbWVzc2FnZTogYm9keS5tZXNzYWdlIH0pO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoZm91bmQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBmb3VuZCA9IGF3YWl0IGRiLlZlaGljbGVJc3N1ZS5maW5kQnlQayhwYXJhbXMuaWQpO1xyXG5cdGZvdW5kICYmIChhd2FpdCBmb3VuZC5kZXN0cm95KCkpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoZm91bmQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgV2lhbG9uIH0gZnJvbSBcIm5vZGUtd2lhbG9uXCI7XHJcblxyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IHtcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzLFxyXG5cdGFkZFJlcGxhY2VkRmlsZXNcclxufSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlUmVwbGFjZWRGaWxlc1wiO1xyXG5pbXBvcnQgZGlzYWxsb3dHdWVzdHMgZnJvbSBcIi4uL21pZGRsZXdhcmVzL2Rpc2FsbG93R3Vlc3RzXCI7XHJcbmltcG9ydCBwYXJzZUJvZHkgZnJvbSBcIi4uL21pZGRsZXdhcmVzL3BhcnNlQm9keVwiO1xyXG5pbXBvcnQgdXBsb2FkIGZyb20gXCIuLi9taWRkbGV3YXJlcy9tdWx0ZXJVcGxvYWRcIjtcclxuaW1wb3J0IGRlbGV0ZUZpbGVPbkVycm9yIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvclwiO1xyXG5pbXBvcnQgZGIsIHsgVmVoaWNsZSBhcyBWZWhpY2xlTW9kZWwsIExvY2F0aW9uIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQge1xyXG5cdFZlaGljbGVBdHRyaWJ1dGVzLFxyXG5cdExvY2F0aW9uQXR0cmlidXRlcyxcclxuXHRSb2xlXHJcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciwgZ2V0RmlsZVVSTCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIH0gZnJvbSBcIi4uL2FwaVwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIGFzIFZlaGljbGVEUyB9IGZyb20gXCIuLi9kYXRhc291cmNlXCI7IC8vIERlcHJlY2F0ZVxyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIGFzeW5jICh7IHVzZXIsIHF1ZXJ5IH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0dHJ5IHtcclxuXHRcdGxldCB2ZWhpY2xlczogUGFydGlhbDxWZWhpY2xlQXR0cmlidXRlcz5bXSA9IFtdO1xyXG5cdFx0Y29uc3QgZnJvbSA9IHF1ZXJ5LmZyb20gJiYgTnVtYmVyKHF1ZXJ5LmZyb20pO1xyXG5cdFx0Y29uc3QgdG8gPSBxdWVyeS50byAmJiBOdW1iZXIocXVlcnkudG8pO1xyXG5cdFx0aWYgKGZyb20gJiYgdG8pIHtcclxuXHRcdFx0dmVoaWNsZXMgPSAoXHJcblx0XHRcdFx0YXdhaXQgVmVoaWNsZS5nZXRBbGwodXNlciwge1xyXG5cdFx0XHRcdFx0ZnJvbTogbW9tZW50KGZyb20sIFwiWFwiKS50b0RhdGUoKSxcclxuXHRcdFx0XHRcdHRvOiBtb21lbnQodG8sIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdCkuY2FzdCh1c2VyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZlaGljbGVzID0gKGF3YWl0IFZlaGljbGUuZ2V0QWxsKHVzZXIpKS5jYXN0KHVzZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlc3BvbnNlLnNldERhdGEodmVoaWNsZXMpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHt2ZWhpY2xlcy5sZW5ndGh9IHZlaGljbGVzLmAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcclxuXHRcIi9cIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL3ZlaGljbGVzXCIpLnNpbmdsZShcInZlaGljbGVJbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHsgdXNlciwgYm9keSwgZmlsZSB9LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGNvbnN0IGZpbGVMb2NhdGlvbiA9XHJcblx0XHRcdGZpbGUgJiZcclxuXHRcdFx0ZmlsZS5maWxlbmFtZSAmJlxyXG5cdFx0XHRnZXRGaWxlVVJMKFwiY2FyYm9va2luZy9tZWRpYS92ZWhpY2xlc1wiLCBmaWxlLmZpbGVuYW1lKTtcclxuXHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IFZlaGljbGVEYXRhU291cmNlID0gbmV3IFZlaGljbGVEUyhkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IGNyZWF0ZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZURhdGFTb3VyY2UuY3JlYXRlKHtcclxuXHRcdFx0XHQuLi5ib2R5LFxyXG5cdFx0XHRcdHZlaGljbGVJbWFnZVNyYzogZmlsZUxvY2F0aW9uXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKGJvZHkuY2F0ZWdvcmllcykge1xyXG5cdFx0XHRcdGxldCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEFsbCh7XHJcblx0XHRcdFx0XHR3aGVyZTogeyBpZDogYm9keS5jYXRlZ29yaWVzIH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRhd2FpdCBjcmVhdGVkVmVoaWNsZS5zZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoe1xyXG5cdFx0XHRcdC4uLmNyZWF0ZWRWZWhpY2xlLmdldCh7IHBsYWluOiB0cnVlIH0pLFxyXG5cdFx0XHRcdGNhdGVnb3JpZXM6IGF3YWl0IGNyZWF0ZWRWZWhpY2xlLmdldENhdGVnb3JpZXMoKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIlZlaGljbGUgaGFzIGJlZW4gY3JlYXRlZC5cIiwgcmVzKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0XHRuZXh0KCk7XHJcblx0fSxcclxuXHRkZWxldGVGaWxlT25FcnJvclxyXG4pO1xyXG5cclxucm91dGVyLmdldChcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IFZlaGljbGVEYXRhU291cmNlID0gbmV3IFZlaGljbGVEUyhkYiwgdXNlcik7XHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGZvdW5kVmVoaWNsZSA9IGF3YWl0IFZlaGljbGVEYXRhU291cmNlLmdldChwYXJhbXMuaWQpO1xyXG5cdFx0Y29uc3QgZm91bmRWZWhpY2xlUGxhaW4gPSB7XHJcblx0XHRcdC4uLmZvdW5kVmVoaWNsZS5nZXQoeyBwbGFpbjogdHJ1ZSB9KSxcclxuXHRcdFx0cG9zaXRpb246IG51bGwsXHJcblx0XHRcdG1pbGVhZ2U6IG51bGwsXHJcblx0XHRcdGNhdGVnb3JpZXM6IChhd2FpdCBmb3VuZFZlaGljbGUuZ2V0Q2F0ZWdvcmllcygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0fTtcclxuXHRcdGlmIChmb3VuZFZlaGljbGUud2lhbG9uVW5pdElkKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bGV0IHcgPSBhd2FpdCBXaWFsb24ubG9naW4oe1xyXG5cdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGNvbnN0IHVuaXQgPSBhd2FpdCB3LkNvcmUuc2VhcmNoSXRlbSh7XHJcblx0XHRcdFx0XHRpZDogZm91bmRWZWhpY2xlUGxhaW4ud2lhbG9uVW5pdElkLFxyXG5cdFx0XHRcdFx0ZmxhZ3M6IDEwMjQgKyA4MTkyXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Y29uc3QgbG5nID0gdW5pdC5pdGVtLnBvcy54O1xyXG5cdFx0XHRcdGNvbnN0IGxhdCA9IHVuaXQuaXRlbS5wb3MueTtcclxuXHRcdFx0XHRjb25zdCBtaWxlYWdlID0gdW5pdC5pdGVtLmNubTtcclxuXHRcdFx0XHRmb3VuZFZlaGljbGVQbGFpbi5wb3NpdGlvbiA9IGxhdCAmJiBsbmcgPyB7IGxhdCwgbG5nIH0gOiBudWxsO1xyXG5cdFx0XHRcdGZvdW5kVmVoaWNsZVBsYWluLm1pbGVhZ2UgPSBtaWxlYWdlIHx8IG51bGw7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGZvdW5kVmVoaWNsZVBsYWluKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYFZlaGljbGUgd2l0aCBJRCAke3BhcmFtcy5pZH0gZm91bmQuYCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcclxuXHRcIi86aWRcIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL3ZlaGljbGVzXCIpLnNpbmdsZShcInZlaGljbGVJbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRjb25zdCB7IHVzZXIsIHBhcmFtcywgYm9keSwgZmlsZSB9ID0gcmVxO1xyXG5cdFx0Y29uc3QgZmlsZUxvY2F0aW9uID1cclxuXHRcdFx0ZmlsZSAmJlxyXG5cdFx0XHRmaWxlLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXCJjYXJib29raW5nL21lZGlhL3ZlaGljbGVzXCIsIGZpbGUuZmlsZW5hbWUpO1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0Y29uc3QgVmVoaWNsZURhdGFTb3VyY2UgPSBuZXcgVmVoaWNsZURTKGRiLCB1c2VyKTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgdXBkYXRlZFZlaGljbGUgPSBhd2FpdCBWZWhpY2xlRGF0YVNvdXJjZS51cGRhdGUocGFyYW1zLmlkLCB7XHJcblx0XHRcdFx0Li4uYm9keSxcclxuXHRcdFx0XHR2ZWhpY2xlSW1hZ2VTcmM6IGZpbGVMb2NhdGlvblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGZpbGVMb2NhdGlvbiAmJlxyXG5cdFx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0XHR1cmw6IHVwZGF0ZWRWZWhpY2xlLnZlaGljbGVJbWFnZVNyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5WZWhpY2xlLFxyXG5cdFx0XHRcdFx0ZmllbGQ6IFwidmVoaWNsZUltYWdlU3JjXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0aWYgKGJvZHkuY2F0ZWdvcmllcykge1xyXG5cdFx0XHRcdGxldCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEFsbCh7XHJcblx0XHRcdFx0XHR3aGVyZTogeyBpZDogYm9keS5jYXRlZ29yaWVzIH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRhd2FpdCB1cGRhdGVkVmVoaWNsZS5zZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHtcclxuXHRcdFx0XHQuLi51cGRhdGVkVmVoaWNsZS5nZXQoeyBwbGFpbjogdHJ1ZSB9KSxcclxuXHRcdFx0XHRjYXRlZ29yaWVzOiAoYXdhaXQgdXBkYXRlZFZlaGljbGUuZ2V0Q2F0ZWdvcmllcygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgVmVoaWNsZSB3aXRoIElEICR7cGFyYW1zLmlkfSB1cGRhdGVkLmAsIHJlcyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3IsXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcclxuXHRcIi86aWRcIixcclxuXHRkaXNhbGxvd0d1ZXN0cyxcclxuXHRhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0XHRjb25zdCBWZWhpY2xlRGF0YVNvdXJjZSA9IG5ldyBWZWhpY2xlRFMoZGIsIHVzZXIpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgZGVsZXRlZFZlaGljbGUgPSBhd2FpdCBWZWhpY2xlRGF0YVNvdXJjZS5kZWxldGUocGFyYW1zLmlkKTtcclxuXHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHR1cmw6IGRlbGV0ZWRWZWhpY2xlLnZlaGljbGVJbWFnZVNyYyxcclxuXHRcdFx0XHRtb2RlbDogZGIuVmVoaWNsZSxcclxuXHRcdFx0XHRmaWVsZDogXCJ2ZWhpY2xlSW1hZ2VTcmNcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YShkZWxldGVkVmVoaWNsZS5nZXQoeyBwbGFpbjogdHJ1ZSB9KSk7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdFx0YFZlaGljbGUgd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gZGVsZXRlZC5gLFxyXG5cdFx0XHRcdHJlc1xyXG5cdFx0XHQpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdG5leHQoKTtcclxuXHR9LFxyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXNcclxuKTtcclxuXHJcbnJvdXRlci5nZXQ8eyBpZDogc3RyaW5nIH0+KFwiLzppZC9sb2NhdGlvblwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfSwgcmVzKSA9PiB7XHJcblx0Ly8gVE9ETzogQWJzdHJhY3Rpb24gb2YgQVBJXHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPExvY2F0aW9uQXR0cmlidXRlcz4oKTtcclxuXHRjb25zdCB2ZWhpY2xlID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeVBrKHBhcmFtcy5pZCwge1xyXG5cdFx0aW5jbHVkZTogW0xvY2F0aW9uXVxyXG5cdH0pO1xyXG5cdGlmICghdmVoaWNsZSkge1xyXG5cdFx0cmVzLnN0YXR1cyg0MDQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgVmVoaWNsZSB3aXRoIGlkICR7cGFyYW1zLmlkfSBub3QgZm91bmQuYCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSIHx8IHZlaGljbGUuY2xpZW50SWQgPT09IHVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YSh2ZWhpY2xlLmxvY2F0aW9uIHx8IG51bGwpO1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiTG9jYXRpb24gZm91bmQuXCIsIHJlcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgWW91IGNhbm5vdCBhY2Nlc3MgdGhpcyB2ZWhpY2xlLmApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZS50b09iamVjdCgpKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFdpYWxvbiB9IGZyb20gXCJub2RlLXdpYWxvblwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgSXRlbU5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSBcIi4uL2FwaS9leGNlcHRpb25zXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldChcIi91bml0c1wiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IHcgPSBhd2FpdCBXaWFsb24ubG9naW4oeyB0b2tlbjogcHJvY2Vzcy5lbnYuV0lBTE9OX1RPS0VOIH0pO1xyXG5cdFx0Y29uc3QgdW5pdHMgPSBhd2FpdCB3LlV0aWxzLmdldFVuaXRzKHsgZmxhZ3M6IDEwMjUgfSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBGb3VuZCAke3VuaXRzLml0ZW1zLmxlbmd0aH0gdW5pdHMuYCwgcmVzKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEodW5pdHMuaXRlbXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmdldChcIi91bml0cy86aWRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHsgdG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTiB9KTtcclxuXHRcdGNvbnN0IHVuaXRzID0gYXdhaXQgdy5VdGlscy5nZXRVbml0cyh7IGZsYWdzOiAxMDI1IH0pO1xyXG5cdFx0Y29uc3QgdW5pdCA9IHVuaXRzLml0ZW1zLmZpbmQodW5pdCA9PiB1bml0LmlkID09PSByZXEucXVlcnkuaWQpO1xyXG5cdFx0aWYgKHVuaXQpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHt1bml0cy5pdGVtcy5sZW5ndGh9IHVuaXRzLmAsIHJlcyk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodW5pdHMuaXRlbXMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDQpO1xyXG5cdFx0XHR0aHJvdyBuZXcgSXRlbU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVbml0IHdpdGggSUQgJHtyZXEucXVlcnkuaWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbixcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4vZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQge1xyXG5cdEZvcm1FeGNlcHRpb24sXHJcblx0RmllbGRFcnJvcixcclxuXHRJdGVtTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vYXBpL2V4Y2VwdGlvbnNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2VCdWlsZGVyPFQgPSB1bmtub3duPiB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGRhdGE6IFQgPSBudWxsLFxyXG5cdFx0cHJpdmF0ZSBzdWNjZXNzID0gZmFsc2UsXHJcblx0XHRwcml2YXRlIG1lc3NhZ2UgPSBcIlVua25vd24gc2VydmVyIGVycm9yLlwiLFxyXG5cdFx0cHJpdmF0ZSBlcnJvcnM6IEZpZWxkRXJyb3JbXSA9IFtdLFxyXG5cdFx0cHJpdmF0ZSBjb2RlID0gNTAwXHJcblx0KSB7fVxyXG5cclxuXHRzZXREYXRhKGRhdGE6IFQpIHtcclxuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XHJcblx0fVxyXG5cclxuXHRzZXRTdWNjZXNzKHN1Y2Nlc3M6IGJvb2xlYW4pIHtcclxuXHRcdHRoaXMuc3VjY2VzcyA9IHN1Y2Nlc3M7XHJcblx0fVxyXG5cclxuXHRhcHBlbmRFcnJvcihlcnJvcjogRmllbGRFcnJvcikge1xyXG5cdFx0dGhpcy5lcnJvcnMucHVzaChlcnJvcik7XHJcblx0fVxyXG5cclxuXHRzZXRDb2RlKGNvZGU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5jb2RlID0gY29kZTtcclxuXHR9XHJcblxyXG5cdHNldE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZTogRXJyb3IsIHJlczogUmVzcG9uc2UpIHtcclxuXHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0aWYgKGUgaW5zdGFuY2VvZiBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbikge1xyXG5cdFx0XHR0aGlzLnNldENvZGUoNDIyKTtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MjIpO1xyXG5cdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0ZSBpbnN0YW5jZW9mIFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24gfHxcclxuXHRcdFx0ZSBpbnN0YW5jZW9mIEl0ZW1Ob3RGb3VuZEV4Y2VwdGlvblxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuc2V0Q29kZSg0MDQpO1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwNCk7XHJcblx0XHR9IGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBGb3JtRXhjZXB0aW9uKSB7XHJcblx0XHRcdGUuZmllbGRzLmZvckVhY2goZXJyb3IgPT4gdGhpcy5hcHBlbmRFcnJvcihlcnJvcikpO1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwMyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDUwMCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldE1lc3NhZ2UoZS5tZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nLCByZXM6IFJlc3BvbnNlKSB7XHJcblx0XHR0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XHJcblx0XHR0aGlzLnNldENvZGUoMjAwKTtcclxuXHRcdHRoaXMuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdHJlcy5zdGF0dXMoMjAwKTtcclxuXHR9XHJcblxyXG5cdHRvT2JqZWN0KCkge1xyXG5cdFx0Y29uc3QgeyBtZXNzYWdlLCBjb2RlLCBlcnJvcnMsIHN1Y2Nlc3MsIGRhdGEgfSA9IHRoaXM7XHJcblx0XHRyZXR1cm4geyBtZXNzYWdlLCBjb2RlLCBlcnJvcnMsIHN1Y2Nlc3MsIGRhdGEgfTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvbGVVdGlscyB7XHJcblx0LyoqXHJcblx0ICogTG93ZXIgaW5kZXgsIGhpZ2hlciBwZXJtaXNzaW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcm9sZVJhbmtzID0gW1JvbGUuTUFTVEVSLCBSb2xlLkFETUlOLCBSb2xlLktFWV9NQU5BR0VSLCBSb2xlLkdVRVNUXTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHJlcXVpcmVkUm9sZSBUaGUgcm9sZSByZXF1aXJlZCB0byBiZSBoaWdoZXIgb3IgZXF1YWwgdG8uXHJcblx0ICogQHBhcmFtIHJvbGUgVGhlIHJvbGUgdG8gYmUgY29tcGFyZWQuXHJcblx0ICovXHJcblx0c3RhdGljIGlzUm9sZUJldHRlciA9IChyZXF1aXJlZFJvbGU6IFJvbGUsIHJvbGU6IFJvbGUgfCBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuXHRcdGNvbnN0IHJlcXVpcmVkUm9sZUluZGV4ID0gUm9sZVV0aWxzLnJvbGVSYW5rcy5maW5kSW5kZXgoXHJcblx0XHRcdHZhbHVlID0+IHZhbHVlID09PSByZXF1aXJlZFJvbGVcclxuXHRcdCk7XHJcblxyXG5cdFx0Y29uc3Qgcm9sZUluZGV4ID0gUm9sZVV0aWxzLnJvbGVSYW5rcy5maW5kSW5kZXgodmFsdWUgPT4gdmFsdWUgPT09IHJvbGUpO1xyXG5cclxuXHRcdGlmIChyZXF1aXJlZFJvbGVJbmRleCA+PSAwICYmIHJvbGVJbmRleCA+PSAwKSB7XHJcblx0XHRcdHJldHVybiByb2xlSW5kZXggPD0gcmVxdWlyZWRSb2xlSW5kZXg7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZElucHV0RXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG5cdGZpZWxkczogc3RyaW5nW107XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBmaWVsZHM6IHN0cmluZ1tdID0gW10pIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdFx0dGhpcy5maWVsZHMgPSBmaWVsZHM7XHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0bWVzc2FnZTogc3RyaW5nID0gXCJZb3UgZG8gbm90IGhhdmUgdGhlIHBlcm1pc3Npb24gdG8gYWNjZXNzIHRoaXMgcmVzb3VyY2UuXCJcclxuXHQpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJleHBvcnQge1xyXG5cdGRlZmF1bHQgYXMgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb25cclxufSBmcm9tIFwiLi9JbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvblwiO1xyXG5leHBvcnQge1xyXG5cdGRlZmF1bHQgYXMgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuL1Jlc291cmNlTm90Rm91bmRFeGNlcHRpb25cIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnZhbGlkSW5wdXRFeGNlcHRpb24gfSBmcm9tIFwiLi9JbnZhbGlkSW5wdXRFeGNlcHRpb25cIjtcclxuIiwiaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50LXRpbWV6b25lXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCB7IFVSTCB9IGZyb20gXCJ1cmxcIjtcclxuXHJcbmltcG9ydCB7IEZsYXR0ZW5JZkFycmF5LEJvb2tpbmdTdGF0dXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4vUmVzcG9uc2VCdWlsZGVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcGlja0FuZE1lcmdlID0gPFxyXG5cdFQxIGV4dGVuZHMgb2JqZWN0LFxyXG5cdFQyIGV4dGVuZHMgb2JqZWN0LFxyXG5cdEsgZXh0ZW5kcyBrZXlvZiBUMlxyXG4+KFxyXG5cdG9iajE6IFQxLFxyXG5cdG9iajI6IFQyLFxyXG5cdGZpZWxkczogS1tdID0gW11cclxuKTogUGljazxUMiwgSz4gJiBUMSA9PiB7XHJcblx0cmV0dXJuIHsgLi4ub2JqMSwgLi4uXy5waWNrKG9iajIsIGZpZWxkcykgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBcnJheSA9IDxUPihhcnJheTogVCk6IEZsYXR0ZW5JZkFycmF5PFQ+W10gPT4ge1xyXG5cdHJldHVybiBhcnJheSBpbnN0YW5jZW9mIEFycmF5ID8gYXJyYXkgOiBbXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrRmllbGRzID0gKHRhcmdldDogb2JqZWN0LCBmaWVsZHM6IHN0cmluZ1tdKTogb2JqZWN0ID0+IHtcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHRmb3IgKGxldCBrZXkgaW4gdGFyZ2V0KSB7XHJcblx0XHRpZiAoZmllbGRzLmluZGV4T2Yoa2V5KSA+PSAwKSByZXN1bHRba2V5XSA9IHRhcmdldFtrZXldO1xyXG5cdH1cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4Y2VwdEZpZWxkcyA9ICh0YXJnZXQ6IG9iamVjdCwgZmllbGRzOiBzdHJpbmdbXSk6IG9iamVjdCA9PiB7XHJcblx0bGV0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBrZXkgaW4gdGFyZ2V0KSB7XHJcblx0XHRpZiAoZmllbGRzLmluZGV4T2Yoa2V5KSA8IDApIHJlc3VsdFtrZXldID0gdGFyZ2V0W2tleV07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbnZlcnRTZXF1ZWxpemVEYXRlc1RvVW5peCA9IChvYmo6IGFueSk6IHZvaWQgPT4ge1xyXG5cdGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0Zm9yIChsZXQgdmFsdWUgb2Ygb2JqKSB7XHJcblx0XHRcdGNvbnZlcnRTZXF1ZWxpemVEYXRlc1RvVW5peCh2YWx1ZSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmIChvYmogJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0Y29uc3QgdmFsdWVzID0gb2JqLmRhdGFWYWx1ZXMgPyBvYmouZGF0YVZhbHVlcyA6IG9iajtcclxuXHJcblx0XHRmb3IgKGxldCBrZXkgaW4gdmFsdWVzKSB7XHJcblx0XHRcdGlmICh2YWx1ZXNba2V5XSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0XHR2YWx1ZXNba2V5XSA9IG1vbWVudCh2YWx1ZXNba2V5XSkudW5peCgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZXNba2V5XSA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdGNvbnZlcnRTZXF1ZWxpemVEYXRlc1RvVW5peCh2YWx1ZXNba2V5XSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc3FsRGF0ZVRvTW9tZW50ID0gKGRhdGU6IHN0cmluZyk6IE1vbWVudCA9PlxyXG5cdG1vbWVudChkYXRlLCBcIllZWVktTU0tRERUSEg6bW06c3NcIiwgXCJVVENcIik7XHJcblxyXG5leHBvcnQgY29uc3QgdG9NeVNRTERhdGUgPSAodW5peFM6IG51bWJlcik6IHN0cmluZyA9PlxyXG5cdG1vbWVudCh1bml4UywgXCJYXCIpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIik7XHJcblxyXG5leHBvcnQgY29uc3QgdG9Vbml4ID0gKGRhdGU6IHN0cmluZyk6IG51bWJlciA9PiBzcWxEYXRlVG9Nb21lbnQoZGF0ZSkudW5peCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY0ZpbGVzUGF0aCA9ICgpOiBzdHJpbmcgPT5cclxuXHRwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuQ0FSX1JFTlRBTF9NQU5BR0VNRU5UX0FQSV9TVE9SQUdFX1BBVEgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEZpbGVVUkwgPSAoZmlsZVBhdGg6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyA9PlxyXG5cdG5ldyBVUkwoYCR7cHJvY2Vzcy5lbnYuU0VSVkVSX1VSTH0vc3RhdGljLyR7ZmlsZVBhdGh9LyR7ZmlsZU5hbWV9YCkuaHJlZjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQYXRoRnJvbVVSTCA9IChmaWxlVVJMOiBzdHJpbmcpOiBzdHJpbmcgPT5cclxuXHRwYXRoLmpvaW4oXHJcblx0XHRnZXRTdGF0aWNGaWxlc1BhdGgoKSxcclxuXHRcdGZpbGVVUkwucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtwcm9jZXNzLmVudi5TRVJWRVJfVVJMfS9zdGF0aWNgKSwgXCJcIilcclxuXHQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0ID0gKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRmcy5ta2RpcihmaWxlUGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSwgZXJyID0+IHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoZmlsZVBhdGgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVGaWxlRnJvbVVybCA9IChmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+XHJcblx0ZnMucHJvbWlzZXMudW5saW5rKGdldFBhdGhGcm9tVVJMKGZpbGVVcmwpKTtcclxuXHJcbnR5cGUgQ29udmVydGVkPFQ+ID0ge1xyXG5cdFtQIGluIGtleW9mIFRdOiBUW1BdIGV4dGVuZHMgRGF0ZVxyXG5cdFx0PyBudW1iZXJcclxuXHRcdDogVFtQXSBleHRlbmRzIE9iamVjdFxyXG5cdFx0PyBDb252ZXJ0ZWQ8VFtQXT5cclxuXHRcdDogVFtQXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb252ZXJ0RGF0ZXNUb1VuaXggPSA8VCBleHRlbmRzIG9iamVjdD4oXHJcblx0b2JqZWN0OiBUXHJcbik6IENvbnZlcnRlZDxUPiA9PiB7XHJcblx0Y29uc3QgY2xvbmUgPSA8Q29udmVydGVkPFQ+Pl8uY2xvbmVEZWVwKG9iamVjdCk7XHJcblxyXG5cdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNsb25lKSkge1xyXG5cdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRjbG9uZVtrZXldID0gPG51bWJlcj5tb21lbnQodmFsdWUpLnVuaXgoKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdGNvbnZlcnREYXRlc1RvVW5peCh2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY2xvbmU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Qm9va2luZ1N0YXR1cyA9IChib29raW5nOiB7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0YXBwcm92ZWQ6IGJvb2xlYW4gfCBudWxsO1xyXG59KTogQm9va2luZ1N0YXR1cyA9PiB7XHJcblx0bGV0IHN0YXR1cyA9IEJvb2tpbmdTdGF0dXMuVU5LTk9XTjtcclxuXHRsZXQgY3VycmVudFRpbWUgPSBtb21lbnQoKTtcclxuXHRsZXQgaGFzUGFzc2VkRnJvbSA9IG1vbWVudChib29raW5nLmZyb20sIFwiWFwiKS5pc1NhbWVPckJlZm9yZShjdXJyZW50VGltZSk7XHJcblx0bGV0IGhhc1Bhc3NlZFRvID0gbW9tZW50KGJvb2tpbmcudG8sIFwiWFwiKS5pc1NhbWVPckJlZm9yZShjdXJyZW50VGltZSk7XHJcblx0aWYgKGJvb2tpbmcuYXBwcm92ZWQpIHtcclxuXHRcdGlmIChoYXNQYXNzZWRGcm9tICYmICFoYXNQYXNzZWRUbykgc3RhdHVzID0gQm9va2luZ1N0YXR1cy5PTkdPSU5HO1xyXG5cdFx0ZWxzZSBpZiAoaGFzUGFzc2VkVG8pIHN0YXR1cyA9IEJvb2tpbmdTdGF0dXMuRklOSVNIRUQ7XHJcblx0XHRlbHNlIHN0YXR1cyA9IEJvb2tpbmdTdGF0dXMuQVBQUk9WRUQ7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmIChib29raW5nLmFwcHJvdmVkID09PSBudWxsKSB7XHJcblx0XHRcdGlmIChoYXNQYXNzZWRGcm9tKSBzdGF0dXMgPSBCb29raW5nU3RhdHVzLkVYUElSRUQ7XHJcblx0XHRcdGVsc2Ugc3RhdHVzID0gQm9va2luZ1N0YXR1cy5QRU5ESU5HO1xyXG5cdFx0fSBlbHNlIGlmIChib29raW5nLmFwcHJvdmVkID09PSBmYWxzZSkgc3RhdHVzID0gQm9va2luZ1N0YXR1cy5ERU5JRUQ7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0dXM7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGFzQWN0aXZlQm9va2luZyA9IChcclxuXHRib29raW5nczogQXJyYXk8e1xyXG5cdFx0ZnJvbTogbnVtYmVyO1xyXG5cdFx0dG86IG51bWJlcjtcclxuXHRcdGFwcHJvdmVkOiBib29sZWFuIHwgbnVsbDtcclxuXHRcdGlkOiBudW1iZXI7XHJcblx0fT4sXHJcblx0Ym9va2luZ0lkPzogbnVtYmVyXHJcbik6IGJvb2xlYW4gPT4ge1xyXG5cdGxldCBhY3RpdmUgPSBmYWxzZTtcclxuXHRpZiAoYm9va2luZ3MpIHtcclxuXHRcdGZvciAoY29uc3QgYm9va2luZyBvZiBib29raW5ncykge1xyXG5cdFx0XHRsZXQgc3RhdHVzID0gZ2V0Qm9va2luZ1N0YXR1cyhib29raW5nKTtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHN0YXR1cyA9PT0gQm9va2luZ1N0YXR1cy5QRU5ESU5HIHx8XHJcblx0XHRcdFx0c3RhdHVzID09PSBCb29raW5nU3RhdHVzLk9OR09JTkcgfHxcclxuXHRcdFx0XHRzdGF0dXMgPT09IEJvb2tpbmdTdGF0dXMuQVBQUk9WRURcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0aWYgKCFib29raW5nSWQgfHwgYm9va2luZ0lkICE9PSBib29raW5nLmlkKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gYWN0aXZlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzQm9va2luZ1RpbWVTbG90VGFrZW4gPSAoXHJcblx0Ym9va2luZ3M6IEFycmF5PHtcclxuXHRcdGZyb206IG51bWJlcjtcclxuXHRcdHRvOiBudW1iZXI7XHJcblx0XHRpZDogbnVtYmVyO1xyXG5cdH0+LFxyXG5cdGZyb206IG51bWJlcixcclxuXHR0bzogbnVtYmVyLFxyXG5cdGJvb2tpbmdJZD86IG51bWJlclxyXG4pOiBib29sZWFuID0+IHtcclxuXHRsZXQgdGFrZW4gPSBmYWxzZTtcclxuXHJcblx0Zm9yIChjb25zdCBib29raW5nIG9mIGJvb2tpbmdzKSB7XHJcblx0XHR0YWtlbiA9IHJhbmdlT3ZlcmxhcChmcm9tLCB0bywgYm9va2luZy5mcm9tLCBib29raW5nLnRvKTtcclxuXHRcdGlmICgodGFrZW4gJiYgIWJvb2tpbmdJZCkgfHwgYm9va2luZ0lkICE9PSBib29raW5nLmlkKSB7XHJcblx0XHRcdHJldHVybiB0YWtlbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YWtlbjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByYW5nZU92ZXJsYXAgPSAoXHJcblx0eDE6IG51bWJlcixcclxuXHR4MjogbnVtYmVyLFxyXG5cdHkxOiBudW1iZXIsXHJcblx0eTI6IG51bWJlclxyXG4pOiBib29sZWFuID0+IHtcclxuXHRyZXR1cm4gTWF0aC5tYXgoeDEsIHkxKSA8PSBNYXRoLm1pbih4MiwgeTIpO1xyXG59O1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vUm9sZVV0aWxzXCI7XHJcbiIsImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcGlsZSB9IGZyb20gXCJoYW5kbGViYXJzXCI7XHJcbmltcG9ydCBtam1sMmh0bWwgZnJvbSBcIm1qbWxcIjtcclxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xyXG5pbXBvcnQgU3RhdGljTWFwcyBmcm9tIFwic3RhdGljbWFwc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWdcIjtcclxuaW1wb3J0IHsgZ2V0U3RhdGljRmlsZXNQYXRoLCBtYWtlRGlyZWN0b3J5SWZOb3RFeGlzdCB9IGZyb20gXCIuLlwiO1xyXG5cclxuY29uc3QgeyBtYWlsLCBzZWNyZXRLZXkgfSA9IGNvbmZpZztcclxuXHJcbmNvbnN0IGdldFRlbXBsYXRlID0gKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cclxuXHRmcy5yZWFkRmlsZVN5bmMoXHJcblx0XHRwYXRoLnJlc29sdmUoYCR7X19kaXJuYW1lfS90ZW1wbGF0ZXMvJHtmaWxlTmFtZX0ubWptbGApLFxyXG5cdFx0XCJ1dGY4XCJcclxuXHQpO1xyXG5cclxuY29uc3QgZ2V0VHJhbnNwb3J0ID0gKCkgPT5cclxuXHRub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcblx0XHRhdXRoOiBtYWlsLmF1dGgsXHJcblx0XHRwb3J0OiBOdW1iZXIobWFpbC5wb3J0KSxcclxuXHRcdHNlY3VyZTogbWFpbC5zZWN1cmUsXHJcblx0XHRob3N0OiBtYWlsLmhvc3RcclxuXHR9KTtcclxuXHJcbmNvbnN0IGNvbXBpbGVUZW1wbGF0ZSA9IChtam1sOiBzdHJpbmcsIGNvbnRleHQ6IGFueSkgPT4gY29tcGlsZShtam1sKShjb250ZXh0KTtcclxuXHJcbmNvbnN0IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lID0gKHRpbWVzdGFtcDogbnVtYmVyLCB0aW1lWm9uZTogc3RyaW5nKSA9PiB7XHJcblx0cmV0dXJuIG1vbWVudCh0aW1lc3RhbXAsIFwiWFwiKVxyXG5cdFx0LnR6KHRpbWVab25lKVxyXG5cdFx0LmZvcm1hdChcIkxMTFwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUGFzc3dvcmRSZXNldFRva2VuID0gKHtcclxuXHRlbWFpbCxcclxuXHR1cmxcclxufToge1xyXG5cdGVtYWlsOiBzdHJpbmc7XHJcblx0dXJsOiBzdHJpbmc7XHJcbn0pOiBhbnkgPT4ge1xyXG5cdC8vIFNlbmQgZW1haWwgaW52aXRlXHJcblx0bGV0IHRva2VuID0gand0LnNpZ24oeyBlbWFpbCwgcGFzc3dvcmRSZXNldDogdHJ1ZSB9LCBzZWNyZXRLZXksIHtcclxuXHRcdGV4cGlyZXNJbjogXCIxaFwiXHJcblx0fSk7XHJcblx0cmV0dXJuIGdldFRyYW5zcG9ydCgpLnNlbmRNYWlsKHtcclxuXHRcdGZyb206IFwibm8tcmVwbHlAYXRzdWFlLm5ldFwiLFxyXG5cdFx0dG86IGVtYWlsLFxyXG5cdFx0c3ViamVjdDogXCJQYXNzd29yZCBSZXNldFwiLFxyXG5cdFx0aHRtbDogYDxoMT5IZWxsbzwvaDE+PGEgaHJlZj1cIiR7dXJsfT90b2tlbj0ke3Rva2VufVwiPkNsaWNrIGhlcmUgdG8gcmVzZXQgcGFzc3dvcmQhPC9hPmBcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kSW52aXRlID0gKHtcclxuXHRlbWFpbCxcclxuXHRjbGllbnRJZFxyXG59OiB7XHJcblx0ZW1haWw6IHN0cmluZztcclxuXHRjbGllbnRJZDogbnVtYmVyO1xyXG59KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuXHRjb25zdCB0cmFuc3BvcnRlciA9IGdldFRyYW5zcG9ydCgpO1xyXG5cdGxldCB0b2tlbiA9IGp3dC5zaWduKHsgZW1haWwsIGNsaWVudElkIH0sIHNlY3JldEtleSwgeyBleHBpcmVzSW46IFwiN2RcIiB9KTtcclxuXHRjb25zdCBjb21waWxlZCA9IGNvbXBpbGVUZW1wbGF0ZShnZXRUZW1wbGF0ZShcImludml0ZVwiKSwge1xyXG5cdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdHNpZ25VcExpbms6IGAke3Byb2Nlc3MuZW52LkNMSUVOVF9VUkx9L3NpZ251cD90b2tlbj0ke3Rva2VufWBcclxuXHR9KTtcclxuXHRjb25zdCB0ZW1wbGF0ZSA9IG1qbWwyaHRtbChjb21waWxlZCk7XHJcblx0Y29uc3QgbWFpbk9wdGlvbnMgPSB7XHJcblx0XHRmcm9tOiBcIkxlYXNlUGxhbiBSZW50YWxzIDxuby1yZXBseUBhdHN1YWUubmV0PlwiLFxyXG5cdFx0dG86IGVtYWlsLFxyXG5cdFx0c3ViamVjdDogXCJZb3UgYXJlIGludml0ZWQgdG8gTGVhc2VQbGFuIENhciBCb29raW5nIVwiLFxyXG5cdFx0aHRtbDogdGVtcGxhdGUuaHRtbFxyXG5cdH07XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haW5PcHRpb25zLCBmdW5jdGlvbihlcnIsIGluZm8pIHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoaW5mby5yZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRJbnZvaWNlID0gKHtcclxuXHRlbWFpbCxcclxuXHRhbW91bnQsXHJcblx0Y3VzdG9tZXJOYW1lLFxyXG5cdHZlaGljbGVOYW1lLFxyXG5cdGZyb20sXHJcblx0dG8sXHJcblx0Ym9va2luZ0lkLFxyXG5cdHRpbWVab25lXHJcbn06IHtcclxuXHRlbWFpbDogc3RyaW5nO1xyXG5cdGFtb3VudDogbnVtYmVyO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdHZlaGljbGVOYW1lOiBzdHJpbmc7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0Ym9va2luZ0lkOiBudW1iZXI7XHJcblx0dGltZVpvbmU6IHN0cmluZztcclxufSkgPT4ge1xyXG5cdGNvbnN0IHRyYW5zcG9ydGVyID0gZ2V0VHJhbnNwb3J0KCk7XHJcblx0Y29uc3QgY29tcGlsZWQgPSBjb21waWxlVGVtcGxhdGUoZ2V0VGVtcGxhdGUoXCJpbnZvaWNlXCIpLCB7XHJcblx0XHRjb21wYW55OiBcIkxlYXNlUGxhblwiLFxyXG5cdFx0Y3VzdG9tZXJOYW1lLFxyXG5cdFx0dmVoaWNsZU5hbWUsXHJcblx0XHRmcm9tOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZShmcm9tLCB0aW1lWm9uZSksXHJcblx0XHR0bzogZ2V0RGF0ZVN0cmluZ0Zyb21Vc2VyVGltZXpvbmUodG8sIHRpbWVab25lKSxcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdGFtb3VudCxcclxuXHRcdGJvb2tpbmdJZFxyXG5cdH0pO1xyXG5cdGNvbnN0IHRlbXBsYXRlID0gbWptbDJodG1sKGNvbXBpbGVkKTtcclxuXHRjb25zdCBtYWluT3B0aW9ucyA9IHtcclxuXHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHR0bzogZW1haWwsXHJcblx0XHRzdWJqZWN0OiBcIllvdXIgY2FyIGJvb2tpbmcgcmVjZWlwdCBpcyBoZXJlIVwiLFxyXG5cdFx0aHRtbDogdGVtcGxhdGUuaHRtbFxyXG5cdH07XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haW5PcHRpb25zLCBmdW5jdGlvbihlcnIsIGluZm8pIHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoaW5mby5yZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZW5kQm9va2luZ05vdGlmaWNhdGlvbk9wdGlvbnMge1xyXG5cdGVtYWlsOiBzdHJpbmc7XHJcblx0Y3VzdG9tZXJFbWFpbDogc3RyaW5nO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdG1vYmlsZTogc3RyaW5nO1xyXG5cdGJvb2tpbmdJZDogbnVtYmVyO1xyXG5cdGZyb206IG51bWJlcjtcclxuXHR0bzogbnVtYmVyO1xyXG5cdHZlaGljbGVJZDogbnVtYmVyO1xyXG5cdHZlaGljbGU6IHN0cmluZztcclxuXHRwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cdGxvY2F0aW9uOiBzdHJpbmc7XHJcblx0bGF0OiBudW1iZXI7XHJcblx0bG5nOiBudW1iZXI7XHJcblx0Y29tcGFueTogc3RyaW5nO1xyXG5cdHRpbWVab25lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kQm9va2luZ05vdGlmaWNhdGlvbiA9IGFzeW5jICh7XHJcblx0ZW1haWwsXHJcblx0Y3VzdG9tZXJFbWFpbCxcclxuXHRjdXN0b21lck5hbWUsXHJcblx0bW9iaWxlLFxyXG5cdGJvb2tpbmdJZCxcclxuXHRmcm9tLFxyXG5cdHRvLFxyXG5cdHZlaGljbGVJZCxcclxuXHR2ZWhpY2xlLFxyXG5cdHBsYXRlTnVtYmVyLFxyXG5cdGxvY2F0aW9uLFxyXG5cdGxhdCxcclxuXHRsbmcsXHJcblx0Y29tcGFueSxcclxuXHR0aW1lWm9uZVxyXG59OiBTZW5kQm9va2luZ05vdGlmaWNhdGlvbk9wdGlvbnMpID0+IHtcclxuXHRjb25zdCB0cmFuc3BvcnRlciA9IGdldFRyYW5zcG9ydCgpO1xyXG5cclxuXHRjb25zdCBtYXAgPSBuZXcgU3RhdGljTWFwcyh7XHJcblx0XHR3aWR0aDogMTIwMCxcclxuXHRcdGhlaWdodDogODAwLFxyXG5cdFx0dGlsZVVybDogXCJodHRwczovL21hcHMud2lraW1lZGlhLm9yZy9vc20taW50bC97en0ve3h9L3t5fS5wbmc/bGFuZz1lblwiXHJcblx0fSk7XHJcblx0bWFwLmFkZE1hcmtlcih7XHJcblx0XHRpbWc6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vcHVibGljL2ltYWdlcy9Mb2NhdGlvbk1hcmtlci5wbmdcIiksXHJcblx0XHRjb29yZDogW2xuZywgbGF0XSxcclxuXHRcdG9mZnNldFg6IDUwLFxyXG5cdFx0b2Zmc2V0WTogMTAwLFxyXG5cdFx0d2lkdGg6IDEwMCxcclxuXHRcdGhlaWdodDogMTAwXHJcblx0fSk7XHJcblx0YXdhaXQgbWFwLnJlbmRlcihbbG5nLCBsYXRdLCAxMCk7XHJcblx0Y29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oZ2V0U3RhdGljRmlsZXNQYXRoKCksIFwiL21hcHNcIik7XHJcblx0Y29uc3QgZmlsZU5hbWUgPSBgJHtEYXRlLm5vdygpfS5wbmdgO1xyXG5cdGNvbnN0IGZpbGVTYXZlUGF0aCA9IHBhdGguam9pbihmaWxlUGF0aCwgZmlsZU5hbWUpO1xyXG5cdGF3YWl0IG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0KGZpbGVQYXRoKTtcclxuXHRhd2FpdCBtYXAuaW1hZ2Uuc2F2ZShmaWxlU2F2ZVBhdGgpO1xyXG5cdGNvbnN0IGNvbXBpbGVkID0gY29tcGlsZVRlbXBsYXRlKGdldFRlbXBsYXRlKFwiYm9va2luZ05vdGlmaWNhdGlvblwiKSwge1xyXG5cdFx0Y3VzdG9tZXJFbWFpbCxcclxuXHRcdGN1c3RvbWVyTmFtZSxcclxuXHRcdG1vYmlsZSxcclxuXHRcdGJvb2tpbmdJZCxcclxuXHRcdGZyb206IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lKGZyb20sIHRpbWVab25lKSxcclxuXHRcdHRvOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZSh0bywgdGltZVpvbmUpLFxyXG5cdFx0dmVoaWNsZUlkLFxyXG5cdFx0dmVoaWNsZSxcclxuXHRcdHBsYXRlTnVtYmVyLFxyXG5cdFx0bG9jYXRpb24sXHJcblx0XHRsYXQsXHJcblx0XHRsbmcsXHJcblx0XHRjb21wYW55LFxyXG5cdFx0bWFwVVJMOiBgY2lkOiR7ZmlsZU5hbWV9YCxcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYFxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB0ZW1wbGF0ZSA9IG1qbWwyaHRtbChjb21waWxlZCk7XHJcblxyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHR0cmFuc3BvcnRlci5zZW5kTWFpbChcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHRcdFx0dG86IGVtYWlsLFxyXG5cdFx0XHRcdHN1YmplY3Q6IGBCb29raW5nIHJlcXVlc3Qgb24gJHt2ZWhpY2xlfWAsXHJcblx0XHRcdFx0aHRtbDogdGVtcGxhdGUuaHRtbCxcclxuXHRcdFx0XHRhdHRhY2htZW50czogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRmaWxlbmFtZTogXCJNYXAgTG9jYXRpb24ucG5nXCIsXHJcblx0XHRcdFx0XHRcdHBhdGg6IGZpbGVTYXZlUGF0aCxcclxuXHRcdFx0XHRcdFx0Y2lkOiBmaWxlTmFtZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb24oZXJyLCBpbmZvKSB7XHJcblx0XHRcdFx0ZnMucHJvbWlzZXMudW5saW5rKGZpbGVTYXZlUGF0aCk7XHJcblx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShpbmZvLnJlc3BvbnNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZEJvb2tpbmdDb25maXJtYXRpb24gPSBhc3luYyAoe1xyXG5cdGVtYWlsLFxyXG5cdGN1c3RvbWVyTmFtZSxcclxuXHR2ZWhpY2xlTmFtZSxcclxuXHRmcm9tLFxyXG5cdHRvLFxyXG5cdGJvb2tpbmdJZCxcclxuXHRwYXJraW5nTG9jYXRpb24sXHJcblx0bGF0LFxyXG5cdGxuZyxcclxuXHRhZGRyZXNzLFxyXG5cdHRpbWVab25lXHJcbn06IHtcclxuXHRlbWFpbDogc3RyaW5nO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdHZlaGljbGVOYW1lOiBzdHJpbmc7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0Ym9va2luZ0lkOiBudW1iZXI7XHJcblx0cGFya2luZ0xvY2F0aW9uOiBzdHJpbmc7XHJcblx0bGF0OiBudW1iZXI7XHJcblx0bG5nOiBudW1iZXI7XHJcblx0YWRkcmVzczogc3RyaW5nO1xyXG5cdHRpbWVab25lOiBzdHJpbmc7XHJcbn0pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG5cdGNvbnN0IHRyYW5zcG9ydGVyID0gZ2V0VHJhbnNwb3J0KCk7XHJcblxyXG5cdGNvbnN0IG1hcCA9IG5ldyBTdGF0aWNNYXBzKHtcclxuXHRcdHdpZHRoOiAxMjAwLFxyXG5cdFx0aGVpZ2h0OiA4MDAsXHJcblx0XHR0aWxlVXJsOiBcImh0dHBzOi8vbWFwcy53aWtpbWVkaWEub3JnL29zbS1pbnRsL3t6fS97eH0ve3l9LnBuZz9sYW5nPWVuXCJcclxuXHR9KTtcclxuXHRtYXAuYWRkTWFya2VyKHtcclxuXHRcdGltZzogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi9wdWJsaWMvaW1hZ2VzL0xvY2F0aW9uTWFya2VyLnBuZ1wiKSxcclxuXHRcdGNvb3JkOiBbbG5nLCBsYXRdLFxyXG5cdFx0b2Zmc2V0WDogNTAsXHJcblx0XHRvZmZzZXRZOiAxMDAsXHJcblx0XHR3aWR0aDogMTAwLFxyXG5cdFx0aGVpZ2h0OiAxMDBcclxuXHR9KTtcclxuXHRhd2FpdCBtYXAucmVuZGVyKFtsbmcsIGxhdF0sIDEwKTtcclxuXHRjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihnZXRTdGF0aWNGaWxlc1BhdGgoKSwgXCIvbWFwc1wiKTtcclxuXHRjb25zdCBmaWxlTmFtZSA9IGAke0RhdGUubm93KCl9LnBuZ2A7XHJcblx0Y29uc3QgZmlsZVNhdmVQYXRoID0gcGF0aC5qb2luKGZpbGVQYXRoLCBmaWxlTmFtZSk7XHJcblx0YXdhaXQgbWFrZURpcmVjdG9yeUlmTm90RXhpc3QoZmlsZVBhdGgpO1xyXG5cdGF3YWl0IG1hcC5pbWFnZS5zYXZlKGZpbGVTYXZlUGF0aCk7XHJcblx0Y29uc3QgY29tcGlsZWQgPSBjb21waWxlVGVtcGxhdGUoZ2V0VGVtcGxhdGUoXCJjb25maXJtQm9va2luZ1wiKSwge1xyXG5cdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdGJvb2tpbmdJZCxcclxuXHRcdGZyb206IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lKGZyb20sIHRpbWVab25lKSxcclxuXHRcdHRvOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZSh0bywgdGltZVpvbmUpLFxyXG5cdFx0dmVoaWNsZU5hbWUsXHJcblx0XHRjdXN0b21lck5hbWUsXHJcblx0XHRtYXBVUkw6IGBjaWQ6JHtmaWxlTmFtZX1gLFxyXG5cdFx0bGF0LFxyXG5cdFx0bG5nLFxyXG5cdFx0cGFya2luZ0xvY2F0aW9uLFxyXG5cdFx0YWRkcmVzc1xyXG5cdH0pO1xyXG5cdGNvbnN0IHRlbXBsYXRlID0gbWptbDJodG1sKGNvbXBpbGVkKTtcclxuXHRjb25zdCBtYWluT3B0aW9ucyA9IHtcclxuXHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHR0bzogZW1haWwsXHJcblx0XHRzdWJqZWN0OiBcIllvdXIgYm9va2luZyBoYXMgYmVlbiBjb25maXJtZWQhXCIsXHJcblx0XHRodG1sOiB0ZW1wbGF0ZS5odG1sLFxyXG5cdFx0YXR0YWNobWVudHM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpbGVuYW1lOiBcIk1hcCBMb2NhdGlvbi5wbmdcIixcclxuXHRcdFx0XHRwYXRoOiBmaWxlU2F2ZVBhdGgsXHJcblx0XHRcdFx0Y2lkOiBmaWxlTmFtZVxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fTtcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0dHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbk9wdGlvbnMsIGZ1bmN0aW9uKGVyciwgaW5mbykge1xyXG5cdFx0XHRmcy5wcm9taXNlcy51bmxpbmsoZmlsZVNhdmVQYXRoKTtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShpbmZvLnJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcbiIsImltcG9ydCBSQkFDLCB7IFJvbGUsIFJlc291cmNlLCBBY3Rpb24gfSBmcm9tIFwiLi4vcmJhY1wiO1xyXG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbmNvbnN0IHsgUkVBRCwgVVBEQVRFLCBERUxFVEUsIENSRUFURSB9ID0gZW51bXMuT3BlcmF0aW9uO1xyXG5jb25zdCBhY2Nlc3NDb250cm9sID0gbmV3IFJCQUMoXCJDYXIgQm9va2luZ1wiKTtcclxuY29uc3QgbWFzdGVyUm9sZSA9IG5ldyBSb2xlKGVudW1zLlJvbGUuTUFTVEVSKTtcclxuY29uc3QgYWRtaW5Sb2xlID0gbmV3IFJvbGUoZW51bXMuUm9sZS5BRE1JTik7XHJcbmNvbnN0IGtleU1hbmFnZXJSb2xlID0gbmV3IFJvbGUoZW51bXMuUm9sZS5LRVlfTUFOQUdFUik7XHJcbmNvbnN0IGd1ZXN0Um9sZSA9IG5ldyBSb2xlKGVudW1zLlJvbGUuR1VFU1QpO1xyXG5cclxuY29uc3QgdmVoaWNsZXMgPSBuZXcgUmVzb3VyY2UoZW51bXMuUmVzb3VyY2UuVkVISUNMRVMpO1xyXG5jb25zdCBsb2NhdGlvbnMgPSBuZXcgUmVzb3VyY2UoZW51bXMuUmVzb3VyY2UuTE9DQVRJT05TKTtcclxuY29uc3QgYm9va2luZ3MgPSBuZXcgUmVzb3VyY2UoZW51bXMuUmVzb3VyY2UuQk9PS0lOR1MpO1xyXG5jb25zdCB1c2VycyA9IG5ldyBSZXNvdXJjZShlbnVtcy5SZXNvdXJjZS5VU0VSUyk7XHJcbmNvbnN0IGFjY2lkZW50cyA9IG5ldyBSZXNvdXJjZShlbnVtcy5SZXNvdXJjZS5BQ0NJREVOVFMpO1xyXG5jb25zdCBjYXRlZ29yaWVzID0gbmV3IFJlc291cmNlKGVudW1zLlJlc291cmNlLkNBVEVHT1JJRVMpO1xyXG5jb25zdCBjbGllbnRzID0gbmV3IFJlc291cmNlKGVudW1zLlJlc291cmNlLkNMSUVOVFMpO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIEdVRVNUUyBST0xFIENPTkZJRyAvL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyBDUkVBVEUgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFxyXG5cdFx0Q1JFQVRFLFxyXG5cdFx0Ym9va2luZ3MsXHJcblx0XHQoeyBhY2Nlc3NvciwgYm9keSB9OiBhbnkpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoYWNjZXNzb3IuaWQgIT09IHVuZGVmaW5lZCAmJiBhY2Nlc3Nvci5pZCA9PT0gYm9keS51c2VySWQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFtcInVzZXJJZFwiLCBcInBhaWRcIiwgXCJjbGllbnRJZFwiXVxyXG5cdClcclxuKTtcclxuXHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oXHJcblx0XHRDUkVBVEUsXHJcblx0XHRhY2NpZGVudHMsXHJcblx0XHQoeyBhY2Nlc3NvciwgYm9keSB9OiBhbnkpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoYWNjZXNzb3IuaWQgIT09IHVuZGVmaW5lZCAmJiBhY2Nlc3Nvci5pZCA9PT0gYm9keS51c2VySWQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFtcInVzZXJJZFwiLCBcImJvb2tpbmdJZFwiLCBcImNsaWVudElkXCJdXHJcblx0KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vICBSRUFEICAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuaWQgJiYgYWNjZXNzb3IuaWQgPT09IHRhcmdldC51c2VySWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFxyXG5cdFx0UkVBRCxcclxuXHRcdHZlaGljbGVzLFxyXG5cdFx0KHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0W1wiYm9va2luZ0NoYXJnZVVuaXRJZFwiLCBcImJvb2tpbmdDaGFyZ2VDb3VudFwiLCBcImJvb2tpbmdDaGFyZ2VcIl1cclxuXHQpXHJcbik7XHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oXHJcblx0XHRSRUFELFxyXG5cdFx0bG9jYXRpb25zLFxyXG5cdFx0KHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRhY2Nlc3Nvci5jbGllbnRJZCAmJlxyXG5cdFx0XHRcdFx0dGFyZ2V0LmNsaWVudHMuZmluZChjbGllbnQgPT4gY2xpZW50LmlkID09PSBhY2Nlc3Nvci5jbGllbnRJZClcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFtcImNsaWVudElkXCJdXHJcblx0KVxyXG4pO1xyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFxyXG5cdFx0UkVBRCxcclxuXHRcdGNhdGVnb3JpZXMsXHJcblx0XHQoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRbXCJjbGllbnRJZFwiXVxyXG5cdClcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyBVUERBVEUgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFVQREFURSwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuaWQgPT09IHRhcmdldC51c2VySWQgJiYgdGFyZ2V0LmFwcHJvdmVkID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gREVMRVRFIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihERUxFVEUsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmlkID09PSB0YXJnZXQudXNlcklkICYmIHRhcmdldC5hcHByb3ZlZCA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gS0VZX01BTkFHRVIgUk9MRSBDT05GSUcgLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyAgUkVBRCAgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC51c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCB1c2VycywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCB2ZWhpY2xlcywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBhY2NpZGVudHMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgbG9jYXRpb25zLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdGFjY2Vzc29yLmNsaWVudElkICYmXHJcblx0XHRcdFx0dGFyZ2V0LmNsaWVudHMuZmluZChjbGllbnQgPT4gY2xpZW50LmlkID09PSBhY2Nlc3Nvci5jbGllbnRJZClcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBjYXRlZ29yaWVzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vIFVQREFURSAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihcclxuXHRcdFVQREFURSxcclxuXHRcdHZlaGljbGVzLFxyXG5cdFx0KHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0W1wiY2F0ZWdvcmllc1wiLCBcIm9iamVjdElkXCIsIFwicGxhdGVOdW1iZXJcIiwgXCJ2aW5cIiwgXCJ3aWFsb25Vbml0SWRcIl1cclxuXHQpXHJcbik7XHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oVVBEQVRFLCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LnVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFVQREFURSwgYWNjaWRlbnRzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vIERFTEVURSAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihERUxFVEUsIGFjY2lkZW50cywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRhY2Nlc3Nvci5jbGllbnRJZCAmJlxyXG5cdFx0XHRcdGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQgJiZcclxuXHRcdFx0XHR0YXJnZXQuYXBwcm92ZWQgPT09IGZhbHNlXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBBRE1JTiBST0xFIENPTkZJRyAvL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vIENSRUFURSAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oQ1JFQVRFLCB1c2VycywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oQ1JFQVRFLCBjYXRlZ29yaWVzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vICBSRUFEICAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC51c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oVVBEQVRFLCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LnVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBsb2NhdGlvbnMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0YWNjZXNzb3IuY2xpZW50SWQgJiZcclxuXHRcdFx0XHR0YXJnZXQuY2xpZW50cy5maW5kKGNsaWVudCA9PiBjbGllbnQuaWQgPT09IGFjY2Vzc29yLmNsaWVudElkKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCB1c2VycywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgdmVoaWNsZXMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGFjY2lkZW50cywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgY2F0ZWdvcmllcywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyBVUERBVEUgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFVQREFURSwgdXNlcnMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFxyXG5cdFx0VVBEQVRFLFxyXG5cdFx0dmVoaWNsZXMsXHJcblx0XHQoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRbXCJvYmplY3RJZFwiLCBcInBsYXRlTnVtYmVyXCIsIFwidmluXCIsIFwid2lhbG9uVW5pdElkXCJdXHJcblx0KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihVUERBVEUsIGFjY2lkZW50cywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oVVBEQVRFLCBjYXRlZ29yaWVzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vICBERUxFVEUgIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihERUxFVEUsIGNhdGVnb3JpZXMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKERFTEVURSwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0YWNjZXNzb3IuY2xpZW50SWQgJiZcclxuXHRcdFx0XHRhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LnVzZXIuY2xpZW50SWQgJiZcclxuXHRcdFx0XHR0YXJnZXQuYXBwcm92ZWQgPT09IGZhbHNlXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gTUFTVEVSIFJPTEUgQ09ORklHIC8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oQ1JFQVRFLCB1c2VycykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihDUkVBVEUsIHZlaGljbGVzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKENSRUFURSwgY2xpZW50cykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihDUkVBVEUsIGxvY2F0aW9ucykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihDUkVBVEUsIGNhdGVnb3JpZXMpKTtcclxuXHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFJFQUQsIHVzZXJzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFJFQUQsIHZlaGljbGVzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFJFQUQsIGJvb2tpbmdzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFJFQUQsIGNsaWVudHMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oUkVBRCwgYWNjaWRlbnRzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFJFQUQsIGxvY2F0aW9ucykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihSRUFELCBjYXRlZ29yaWVzKSk7XHJcblxyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihVUERBVEUsIHVzZXJzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFVQREFURSwgdmVoaWNsZXMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oVVBEQVRFLCBib29raW5ncykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihVUERBVEUsIGNsaWVudHMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oVVBEQVRFLCBhY2NpZGVudHMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oVVBEQVRFLCBsb2NhdGlvbnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oVVBEQVRFLCBjYXRlZ29yaWVzKSk7XHJcblxyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihERUxFVEUsIHVzZXJzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKERFTEVURSwgdmVoaWNsZXMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oREVMRVRFLCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmICh0YXJnZXQuYXBwcm92ZWQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oREVMRVRFLCBjbGllbnRzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKERFTEVURSwgYWNjaWRlbnRzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKERFTEVURSwgbG9jYXRpb25zKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKERFTEVURSwgY2F0ZWdvcmllcykpO1xyXG5cclxuYWNjZXNzQ29udHJvbC5hZGRSb2xlKG1hc3RlclJvbGUpO1xyXG5hY2Nlc3NDb250cm9sLmFkZFJvbGUoYWRtaW5Sb2xlKTtcclxuYWNjZXNzQ29udHJvbC5hZGRSb2xlKGtleU1hbmFnZXJSb2xlKTtcclxuYWNjZXNzQ29udHJvbC5hZGRSb2xlKGd1ZXN0Um9sZSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY2Nlc3NDb250cm9sO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvbGVzID0ge1xyXG5cdGFkbWluOiBhZG1pblJvbGUsXHJcblx0a2V5TWFuYWdlcjoga2V5TWFuYWdlclJvbGUsXHJcblx0Z3Vlc3Q6IGd1ZXN0Um9sZSxcclxuXHRtYXN0ZXI6IG1hc3RlclJvbGVcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvdXJjZXMgPSB7XHJcblx0Ym9va2luZ3MsXHJcblx0dmVoaWNsZXMsXHJcblx0bG9jYXRpb25zLFxyXG5cdHVzZXJzLFxyXG5cdGFjY2lkZW50cyxcclxuXHRjYXRlZ29yaWVzLFxyXG5cdGNsaWVudHNcclxufTtcclxuIiwiZXhwb3J0IGVudW0gQm9va2luZ0NoYXJnZVVuaXQge1xyXG5cdEtJTE9NRVRFUiA9IFwiS21cIixcclxuXHRTRUNPTkQgPSBcIlNlY29uZFwiLFxyXG5cdEhPVVIgPSBcIkhvdXJcIixcclxuXHREQVkgPSBcIkRheVwiLFxyXG5cdFdFRUsgPSBcIldlZWtcIixcclxuXHRNT05USCA9IFwiTW9udGhcIlxyXG59XHJcbiIsImV4cG9ydCBlbnVtIEJvb2tpbmdTdGF0dXMge1xyXG5cdFVOS05PV04gPSBcIlVOS05PV05cIixcclxuXHRPTkdPSU5HID0gXCJPTkdPSU5HXCIsXHJcblx0RklOSVNIRUQgPSBcIkZJTklTSEVEXCIsXHJcblx0QVBQUk9WRUQgPSBcIkFQUFJPVkVEXCIsXHJcblx0RVhQSVJFRCA9IFwiRVhQSVJFRFwiLFxyXG5cdERFTklFRCA9IFwiREVOSUVEXCIsXHJcblx0UEVORElORyA9IFwiUEVORElOR1wiXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gQm9va2luZ1R5cGUge1xyXG5cdFBSSVZBVEUgPSBcIlBSSVZBVEVcIixcclxuXHRCVVNJTkVTUyA9IFwiQlVTSU5FU1NcIixcclxuXHRTRVJWSUNFID0gXCJTRVJWSUNFXCIsXHJcblx0UkVQTEFDRU1FTlQgPSBcIlJFUExBQ0VNRU5UXCJcclxufVxyXG4iLCJleHBvcnQgZW51bSBSb2xlIHtcclxuXHRNQVNURVIgPSBcIk1BU1RFUlwiLFxyXG5cdEFETUlOID0gXCJBRE1JTlwiLFxyXG5cdEtFWV9NQU5BR0VSID0gXCJLRVlfTUFOQUdFUlwiLFxyXG5cdEdVRVNUID0gXCJHVUVTVFwiXHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vQm9va2luZ0NoYXJnZVVuaXRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQm9va2luZ1N0YXR1c1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Cb29raW5nVHlwZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Sb2xlXCI7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3V0aWxzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2VudW1zXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21vZGVsc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9hcGlcIjtcclxuXHJcblxyXG4vLyBUT0RPIHJlbW92ZSBSQkFDXHJcbmV4cG9ydCBlbnVtIE9wZXJhdGlvbiB7XHJcblx0UkVBRCA9IFwiUkVBRFwiLFxyXG5cdFVQREFURSA9IFwiVVBEQVRFXCIsXHJcblx0REVMRVRFID0gXCJERUxFVEVcIixcclxuXHRDUkVBVEUgPSBcIkNSRUFURVwiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJlc291cmNlIHtcclxuXHRCT09LSU5HUyA9IFwiQk9PS0lOR1NcIixcclxuXHRMT0NBVElPTlMgPSBcIkxPQ0FUSU9OU1wiLFxyXG5cdFZFSElDTEVTID0gXCJWRUhJQ0xFU1wiLFxyXG5cdFVTRVJTID0gXCJVU0VSU1wiLFxyXG5cdEVOVU1TID0gXCJFTlVNU1wiLFxyXG5cdElOVklURVMgPSBcIklOVklURVNcIixcclxuXHRBQ0NJREVOVFMgPSBcIkFDQ0lERU5UU1wiLFxyXG5cdENMSUVOVFMgPSBcIkNMSUVOVFNcIixcclxuXHRDQVRFR09SSUVTID0gXCJDQVRFR09SSUVTXCJcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXZhbGlkYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWptbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50LXRpbWV6b25lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm11bHRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLXdpYWxvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlbWFpbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0YXRpY21hcHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInl1cFwiKTsiXSwic291cmNlUm9vdCI6IiJ9