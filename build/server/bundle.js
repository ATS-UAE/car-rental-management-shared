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
const models_1 = __webpack_require__(/*! ../models */ "./src/server/models/index.ts");
const exceptions_1 = __webpack_require__(/*! ./exceptions */ "./src/server/api/exceptions/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/server/api/index.ts");
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
                        [sequelize_1.Op.in]: [enums_1.Role.ADMIN, enums_1.Role.KEY_MANAGER]
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
    if (user.role === enums_1.Role.GUEST) {
        // Get bookings on self.
        bookings = await user.$get("bookings", {
            include: [models_1.Vehicle, models_1.ReplaceVehicle]
        });
    }
    else if (user.role === enums_1.Role.ADMIN || user.role === enums_1.Role.KEY_MANAGER) {
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
    else if (user.role === enums_1.Role.MASTER) {
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
    if (user.role === enums_1.Role.GUEST) {
        // Return only own bookings.
        if (booking.userId === user.id) {
            return new Booking(booking);
        }
    }
    else if (user.role === enums_1.Role.KEY_MANAGER || user.role === enums_1.Role.ADMIN) {
        if (booking.user.clientId === user.clientId) {
            return new Booking(booking);
        }
    }
    else if (user.role === enums_1.Role.MASTER) {
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
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
                if (status === enums_1.BookingStatus.PENDING ||
                    status === enums_1.BookingStatus.APPROVED ||
                    status === enums_1.BookingStatus.ONGOING) {
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
    if (user.role === enums_1.Role.MASTER) {
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
    if (user.role === enums_1.Role.MASTER) {
        vehicles = await models_1.Vehicle.findAll(baseFindOptions);
    }
    else if (user.role === enums_1.Role.GUEST) {
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
const enums_1 = __webpack_require__(/*! ../../variables/enums */ "./src/server/variables/enums/index.ts");
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
    bookingType: yup.mixed().oneOf(Object.values(enums_1.BookingType)),
    replaceVehicleId: yup.number().nullable()
})
    .when(["$user", "$operation", "$target", "$data", "$casting"], (...args) => {
    let [user, operation, target, data, casting, schema] = args;
    switch (operation) {
        case __1.API_OPERATION.READ: {
            if (data.bookingType === enums_1.BookingType.REPLACEMENT) {
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
                    if (user.role === enums_1.Role.GUEST && target.approved) {
                        return false;
                    }
                    else if (user.role === enums_1.Role.KEY_MANAGER &&
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
                    if (user.role === enums_1.Role.GUEST && target.approved) {
                        return false;
                    }
                    else if (user.role === enums_1.Role.KEY_MANAGER &&
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
                }), [enums_1.Role.MASTER, enums_1.Role.ADMIN, enums_1.Role.KEY_MANAGER]),
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
                    if (user.role === enums_1.Role.GUEST && target.approved) {
                        return false;
                    }
                    else if (user.role === enums_1.Role.KEY_MANAGER &&
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
                    if (user.role === enums_1.Role.GUEST ||
                        user.role === enums_1.Role.KEY_MANAGER) {
                        if (target.approved) {
                            return false;
                        }
                    }
                    return true;
                }),
                startFuel: utils_1.stripField(yup.number().nullable(), [
                    enums_1.Role.MASTER,
                    enums_1.Role.ADMIN,
                    enums_1.Role.KEY_MANAGER
                ]),
                startMileage: utils_1.stripField(yup.number().nullable(), [
                    enums_1.Role.MASTER,
                    enums_1.Role.ADMIN,
                    enums_1.Role.KEY_MANAGER
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
                }), [enums_1.Role.MASTER, enums_1.Role.ADMIN, enums_1.Role.KEY_MANAGER]),
                endFuel: utils_1.stripField(yup.number().nullable(), [
                    enums_1.Role.MASTER,
                    enums_1.Role.ADMIN,
                    enums_1.Role.KEY_MANAGER
                ]),
                endMileage: utils_1.stripField(yup.number().nullable(), [
                    enums_1.Role.MASTER,
                    enums_1.Role.ADMIN,
                    enums_1.Role.KEY_MANAGER
                ]),
                paid: utils_1.stripField(yup.boolean(), [
                    enums_1.Role.MASTER,
                    enums_1.Role.ADMIN,
                    enums_1.Role.KEY_MANAGER
                ]),
                replaceVehicle: yup.lazy(function (value, options) {
                    // If booking type has been changed to replacement, then require a replacement vehicle.
                    if (updateData.bookingType === enums_1.BookingType.REPLACEMENT &&
                        target.bookingType !== enums_1.BookingType.REPLACEMENT) {
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
                    else if (target.bookingType === enums_1.BookingType.REPLACEMENT) {
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
                paid: utils_1.stripField(yup.boolean().default(false), [enums_1.Role.GUEST], true),
                amount: utils_1.stripField(yup
                    .number()
                    .nullable()
                    .default(null), [enums_1.Role.GUEST], true),
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
                    .oneOf(Object.values(enums_1.BookingType))
                    .required(),
                replaceVehicle: yup.lazy(function (value, options) {
                    const { context } = options;
                    if (context["bookingOptions"].bookingType ===
                        enums_1.BookingType.REPLACEMENT) {
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
                if (user.role === enums_1.Role.GUEST && v.userId === user.id) {
                    return true;
                    // Only allow bookings on users with the same client.
                }
                else if (user.role === enums_1.Role.KEY_MANAGER ||
                    user.role === enums_1.Role.ADMIN) {
                    const targetUser = await models_1.User.findByPk(user.id);
                    if (targetUser.clientId === user.clientId) {
                        return true;
                    }
                }
                else if (user.role === enums_1.Role.MASTER) {
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
const enums_1 = __webpack_require__(/*! ../../variables/enums */ "./src/server/variables/enums/index.ts");
const __1 = __webpack_require__(/*! .. */ "./src/server/api/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/server/api/validators/index.ts");
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
        .oneOf(Object.values(enums_1.BookingChargeUnit))
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
                return user.role === enums_1.Role.MASTER;
            });
            break;
        }
        case __1.API_OPERATION.UPDATE: {
            schema = schema
                .shape({ id: Yup.number().required() })
                .test("permission", "You do not have the permission to do this.", function () {
                if (user.role === enums_1.Role.MASTER) {
                    return true;
                }
                else if (user.role === enums_1.Role.ADMIN ||
                    user.role === enums_1.Role.KEY_MANAGER) {
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.ACCIDENTS)
            }
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
        let role = this.user.role;
        let foundAccidents = await this.getAccidents({
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.ACCIDENTS)
            }
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
        let role = this.user.role;
        let foundAccident = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.ACCIDENTS, {
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.ACCIDENTS, {
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
        return this.createAccident(utils_1.exceptFields(data, rbac_1.default.getExcludedFields(role, enums_1.Operation.CREATE, enums_1.Resource.ACCIDENTS)));
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const enums_2 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.USERS)
            }
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
        let role = this.user.role;
        let foundBookings = await this.getBookings({
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.USERS)
            },
            include: [
                {
                    model: models_1.User
                }
            ]
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
        let role = this.user.role;
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.BOOKINGS, {
            accessor: this.user,
            body: data
        });
        let replacementVehicle;
        try {
            if (!accessible) {
                throw new exceptions_1.InvalidPermissionException();
            }
            if (data.bookingType === enums_2.BookingType.REPLACEMENT) {
                const { brand, model, plateNumber, vin } = data;
                replacementVehicle = await this.db.ReplaceVehicle.create({
                    brand,
                    model,
                    plateNumber,
                    vin
                });
            }
            let exceptions = rbac_1.default.getExcludedFields(role, enums_1.Operation.CREATE, enums_1.Resource.BOOKINGS);
            let createdBooking = await this.createBooking({
                userId: role === enums_1.Role.GUEST ? this.user.id : data.userId,
                ...utils_1.exceptFields(data, exceptions),
                to: utils_1.toMySQLDate(data.to),
                from: utils_1.toMySQLDate(data.from),
                replaceVehicleId: (replacementVehicle && replacementVehicle.id) || null
            });
            let user = await this.getUser(role === enums_1.Role.GUEST ? this.user.id : data.userId);
            if (this.user.role === enums_1.Role.GUEST) {
                models_1.User.findAll({
                    where: {
                        clientId: user.clientId,
                        role: {
                            [sequelize_1.Op.in]: [enums_1.Role.ADMIN, enums_1.Role.KEY_MANAGER]
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
const rbac_1 = __importDefault(__webpack_require__(/*! ../utils/rbac */ "./src/server/utils/rbac.ts"));
const exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./src/server/utils/exceptions/index.ts");
class Client extends DataSource_1.default {
    constructor(db, userAccessor) {
        super(db, userAccessor, enums_1.Resource.CLIENTS);
        this.get = async (id) => {
            let role = this.user.role;
            let foundClient = await this.getClient(id, {
                attributes: {
                    exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.CLIENTS)
                }
            });
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
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.CLIENTS)
            }
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
        let role = this.user.role;
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
        let role = this.user.role;
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.LOCATIONS)
            }
        });
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
        let role = this.user.role;
        let foundLocations = await this.getLocations({
            include: [{ model: models_1.Client }],
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.LOCATIONS)
            }
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
        let role = this.user.role;
        let foundLocation = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.LOCATIONS, {
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
        let role = this.user.role;
        let accessible = await rbac_1.default.can(role, enums_1.Operation.CREATE, enums_1.Resource.LOCATIONS, {
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
                    ...rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.USERS),
                    "password"
                ]
            }
        });
        if (!foundUser) {
            throw new exceptions_1.ResourceNotFoundException(`User with ID of ${id} is not found.`);
        }
        let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.USERS, {
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
                    ...rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.USERS),
                    "password"
                ]
            }
        });
        let users = [];
        for (let user of foundUsers) {
            let accessible = await rbac_1.default.can(role, enums_1.Operation.READ, enums_1.Resource.USERS, {
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
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.USERS, {
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
        let accessible = await rbac_1.default.can(role, enums_1.Operation.DELETE, enums_1.Resource.USERS, {
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
            role: options.invited ? enums_1.Role.GUEST : data.role,
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.VEHICLES)
            }
        });
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
        let role = this.user.role;
        let foundVehicles = await this.getVehicles({
            attributes: {
                exclude: rbac_1.default.getExcludedFields(role, enums_1.Operation.READ, enums_1.Resource.VEHICLES)
            }
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
        let role = this.user.role;
        let foundVehicle = await this.get(id);
        let accessible = await rbac_1.default.can(role, enums_1.Operation.UPDATE, enums_1.Resource.VEHICLES, {
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
        let role = this.user.role;
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
const enums_1 = __webpack_require__(/*! ./variables/enums */ "./src/server/variables/enums/index.ts");
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
            else if (existingUser.role !== enums_1.Role.MASTER &&
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
exports.default = (req, res, next) => {
    if (req.user.role !== enums_1.Role.GUEST) {
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
    __metadata("design:type", Number)
], Booking.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Number)
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
            role: enums_1.Role.MASTER,
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
        if (user.role !== enums_1.Role.MASTER && foundClient.id !== user.clientId) {
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
const router = express_1.default.Router();
router.use(middlewares_1.requireHigherOrEqualRole(enums_1.Role.KEY_MANAGER));
router.get("/unit-summary", async ({ user }, res) => {
    let response = new utils_1.ResponseBuilder();
    const w = await node_wialon_1.Wialon.login({ token: process.env.WIALON_TOKEN });
    let whereOptions = { clientId: user.clientId };
    if (user.role === enums_1.Role.MASTER) {
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
            wialonUnitName: utils_1.RoleUtils.isRoleBetter(enums_1.Role.MASTER, user.role)
                ? (wialonUnit && wialonUnit.nm) || null
                : undefined,
            client: utils_1.RoleUtils.isRoleBetter(enums_1.Role.MASTER, user.role)
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
const utils_1 = __webpack_require__(/*! ../utils */ "./src/server/utils/index.ts");
const api_1 = __webpack_require__(/*! ../api */ "./src/server/api/index.ts");
const datasource_1 = __webpack_require__(/*! ../datasource */ "./src/server/datasource/index.ts"); // Deprecate
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
        if (user.role === enums_1.Role.MASTER || vehicle.clientId === user.clientId) {
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
class RoleUtils {
}
exports.RoleUtils = RoleUtils;
/**
 * Lower index, higher permissions.
 */
RoleUtils.roleRanks = [enums_1.Role.MASTER, enums_1.Role.ADMIN, enums_1.Role.KEY_MANAGER, enums_1.Role.GUEST];
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
const enums_1 = __webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts");
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
exports.hasActiveBooking = (bookings, bookingId) => {
    let active = false;
    if (bookings) {
        for (const booking of bookings) {
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
const enums = __importStar(__webpack_require__(/*! ../variables/enums */ "./src/server/variables/enums/index.ts"));
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

/***/ "./src/server/variables/enums/BookingChargeUnit.ts":
/*!*********************************************************!*\
  !*** ./src/server/variables/enums/BookingChargeUnit.ts ***!
  \*********************************************************/
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
})(BookingChargeUnit || (BookingChargeUnit = {}));
exports.default = BookingChargeUnit;


/***/ }),

/***/ "./src/server/variables/enums/BookingStatus.ts":
/*!*****************************************************!*\
  !*** ./src/server/variables/enums/BookingStatus.ts ***!
  \*****************************************************/
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
})(BookingStatus || (BookingStatus = {}));
exports.default = BookingStatus;


/***/ }),

/***/ "./src/server/variables/enums/BookingType.ts":
/*!***************************************************!*\
  !*** ./src/server/variables/enums/BookingType.ts ***!
  \***************************************************/
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
})(BookingType || (BookingType = {}));
exports.default = BookingType;


/***/ }),

/***/ "./src/server/variables/enums/Operation.ts":
/*!*************************************************!*\
  !*** ./src/server/variables/enums/Operation.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Operation;
(function (Operation) {
    Operation["READ"] = "READ";
    Operation["UPDATE"] = "UPDATE";
    Operation["DELETE"] = "DELETE";
    Operation["CREATE"] = "CREATE";
})(Operation || (Operation = {}));
exports.default = Operation;


/***/ }),

/***/ "./src/server/variables/enums/Resource.ts":
/*!************************************************!*\
  !*** ./src/server/variables/enums/Resource.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
})(Resource || (Resource = {}));
exports.default = Resource;


/***/ }),

/***/ "./src/server/variables/enums/Role.ts":
/*!********************************************!*\
  !*** ./src/server/variables/enums/Role.ts ***!
  \********************************************/
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
})(Role || (Role = {}));
exports.default = Role;


/***/ }),

/***/ "./src/server/variables/enums/index.ts":
/*!*********************************************!*\
  !*** ./src/server/variables/enums/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Operation_1 = __webpack_require__(/*! ./Operation */ "./src/server/variables/enums/Operation.ts");
exports.Operation = Operation_1.default;
var Resource_1 = __webpack_require__(/*! ./Resource */ "./src/server/variables/enums/Resource.ts");
exports.Resource = Resource_1.default;
var Role_1 = __webpack_require__(/*! ./Role */ "./src/server/variables/enums/Role.ts");
exports.Role = Role_1.default;
var BookingType_1 = __webpack_require__(/*! ./BookingType */ "./src/server/variables/enums/BookingType.ts");
exports.BookingType = BookingType_1.default;
var BookingStatus_1 = __webpack_require__(/*! ./BookingStatus */ "./src/server/variables/enums/BookingStatus.ts");
exports.BookingStatus = BookingStatus_1.default;
var BookingChargeUnit_1 = __webpack_require__(/*! ./BookingChargeUnit */ "./src/server/variables/enums/BookingChargeUnit.ts");
exports.BookingChargeUnit = BookingChargeUnit_1.default;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvQm9va2luZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9Db2xsZWN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL1ZlaGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9BcGlFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9EYXRhQmFzZUV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9leGNlcHRpb25zL0Zvcm1FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9JbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9leGNlcHRpb25zL1Jlc291cmNlTm90Rm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS91dGlscy9BcGlFcnJvckhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdXRpbHMvRm9ybUVycm9yQnVpbGRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS92YWxpZGF0b3JzL0Jvb2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdmFsaWRhdG9ycy9WZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL3ZhbGlkYXRvcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdmFsaWRhdG9ycy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2NvbmZpZy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RhdGFzb3VyY2UvQWNjaWRlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL0Jvb2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL0NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RhdGFzb3VyY2UvRGF0YVNvdXJjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RhdGFzb3VyY2UvTG9jYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL1ZlaGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlcy9kaXNhbGxvd0d1ZXN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcGFyc2VCb2R5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcmVxdWlyZVJvbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQWNjaWRlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQWNjaWRlbnRVc2VyU3RhdHVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0Jvb2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQ2F0ZWdvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvQ2xpZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NsaWVudExvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0xvY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1JlcGxhY2VWZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvVXNlclZlaGljbGVDYXRlZ29yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9WZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1ZlaGljbGVDYXRlZ29yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9WZWhpY2xlSXNzdWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yYmFjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2FjY2lkZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9hdXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2Jvb2tpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2NhdGVnb3JpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvY2xpZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9pbnZpdGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2xvY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9yZXBvcnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL3VzZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL3ZlaGljbGVJc3N1ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvdmVoaWNsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvd2lhbG9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvUmVzcG9uc2VCdWlsZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvUm9sZVV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvZXhjZXB0aW9ucy9JbnZhbGlkSW5wdXRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci91dGlscy9leGNlcHRpb25zL0ludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvZXhjZXB0aW9ucy9SZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvZXhjZXB0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvbWFpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL3JiYWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci92YXJpYWJsZXMvZW51bXMvQm9va2luZ0NoYXJnZVVuaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci92YXJpYWJsZXMvZW51bXMvQm9va2luZ1N0YXR1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3ZhcmlhYmxlcy9lbnVtcy9Cb29raW5nVHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3ZhcmlhYmxlcy9lbnVtcy9PcGVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci92YXJpYWJsZXMvZW51bXMvUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci92YXJpYWJsZXMvZW51bXMvUm9sZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3ZhcmlhYmxlcy9lbnVtcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRqc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29yc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLXZhbGlkYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1qbWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnQtdGltZXpvbmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtdWx0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLXdpYWxvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGVtYWlsZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0LWxvY2FsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3RhdGljbWFwc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInl1cFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw0RUFBcUM7QUFDckMsc0VBQStCO0FB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Ozs7OztBQ1p4QixJQUFLLElBS0o7QUFMRCxXQUFLLElBQUk7SUFDUix5QkFBaUI7SUFDakIsdUJBQWU7SUFDZixtQ0FBMkI7SUFDM0IsdUJBQWU7QUFDaEIsQ0FBQyxFQUxJLElBQUksS0FBSixJQUFJLFFBS1I7QUFFRCxrQkFBZSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1BwQixzR0FBbUQ7QUFBMUMsdUNBQU8sQ0FBYTtBQUM3QixtR0FBaUQ7QUFBeEMscUNBQU8sQ0FBWTtBQUM1Qix1RkFBeUM7QUFBaEMsNkJBQU8sQ0FBUTtBQUN4Qiw0R0FBdUQ7QUFBOUMsMkNBQU8sQ0FBZTtBQUMvQixrSEFBMkQ7QUFBbEQsK0NBQU8sQ0FBaUI7QUFDakMsOEhBQW1FO0FBQTFELHVEQUFPLENBQXFCOzs7Ozs7Ozs7Ozs7QUNMckMscUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEsOEM7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsNEM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsMkM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsZ0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2VydmVyL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgV2lhbG9uIH0gZnJvbSBcIm5vZGUtd2lhbG9uXCI7XHJcbmltcG9ydCB7IE9wIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuXHJcbmltcG9ydCB7IEJvb2tpbmcgYXMgQm9va2luZ1ZhbGlkYXRvcnMgfSBmcm9tIFwiLi92YWxpZGF0b3JzXCI7XHJcbmltcG9ydCB7XHJcblx0VXNlcixcclxuXHRCb29raW5nIGFzIEJvb2tpbmdNb2RlbCxcclxuXHRSZXBsYWNlVmVoaWNsZSxcclxuXHRCb29raW5nQXR0cmlidXRlcyxcclxuXHRSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMsXHJcblx0TG9jYXRpb24sXHJcblx0VmVoaWNsZVxyXG59IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgSXRlbU5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSBcIi4vZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBVc2VQYXJhbWV0ZXJzLCBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi92YXJpYWJsZXMvZW51bXNcIjtcclxuaW1wb3J0IHsgQXBpRXJyb3JIYW5kbGVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgQ2FzdGFibGUsIENvbGxlY3Rpb24gfSBmcm9tIFwiLi9Db2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7XHJcblx0c2VuZEJvb2tpbmdOb3RpZmljYXRpb24sXHJcblx0c2VuZEludm9pY2UgYXMgc2VuZEludm9pY2VFbWFpbCxcclxuXHRzZW5kQm9va2luZ0NvbmZpcm1hdGlvbiBhcyBzZW5kQm9va2luZ0NvbmZpcm1hdGlvbkVtYWlsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEJvb2tpbmdDcmVhdGVPcHRpb25zID0gVXNlUGFyYW1ldGVyczxcclxuXHRCb29raW5nQXR0cmlidXRlcyxcclxuXHRcImZyb21cIiB8IFwidG9cIiB8IFwiYm9va2luZ1R5cGVcIixcclxuXHRcInVzZXJJZFwiIHwgXCJ2ZWhpY2xlSWRcIlxyXG4+ICYge1xyXG5cdHJlcGxhY2VWZWhpY2xlPzogVXNlUGFyYW1ldGVyczxcclxuXHRcdFJlcGxhY2VWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRcdFwidmluXCIgfCBcImJyYW5kXCIgfCBcIm1vZGVsXCIgfCBcInBsYXRlTnVtYmVyXCJcclxuXHQ+O1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQm9va2luZ1VwZGF0ZU9wdGlvbnMgPSBVc2VQYXJhbWV0ZXJzPFxyXG5cdEJvb2tpbmdBdHRyaWJ1dGVzLFxyXG5cdFwiaWRcIixcclxuXHR8IFwidXNlcklkXCJcclxuXHR8IFwicGFpZFwiXHJcblx0fCBcImFtb3VudFwiXHJcblx0fCBcImZyb21cIlxyXG5cdHwgXCJ0b1wiXHJcblx0fCBcImFwcHJvdmVkXCJcclxuXHR8IFwiZmluaXNoZWRcIlxyXG5cdHwgXCJzdGFydE1pbGVhZ2VcIlxyXG5cdHwgXCJlbmRNaWxlYWdlXCJcclxuXHR8IFwic3RhcnRGdWVsXCJcclxuXHR8IFwiZW5kRnVlbFwiXHJcblx0fCBcInZlaGljbGVJZFwiXHJcblx0fCBcImJvb2tpbmdUeXBlXCJcclxuPiAmIHtcclxuXHRyZXBsYWNlVmVoaWNsZT86IFVzZVBhcmFtZXRlcnM8XHJcblx0XHRSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMsXHJcblx0XHRcInZpblwiIHwgXCJicmFuZFwiIHwgXCJtb2RlbFwiIHwgXCJwbGF0ZU51bWJlclwiXHJcblx0PjtcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29raW5nIGltcGxlbWVudHMgQ2FzdGFibGU8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+IHtcclxuXHRwcml2YXRlIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhOiBCb29raW5nTW9kZWwpIHt9XHJcblxyXG5cdHB1YmxpYyBjYXN0ID0gKHVzZXI6IFVzZXIpID0+XHJcblx0XHRCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IodXNlciwgQVBJX09QRVJBVElPTi5SRUFEKS5jYXN0KHRoaXMuZGF0YSk7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0QWxsID0gYXN5bmMgKHVzZXI6IFVzZXIpID0+IHtcclxuXHRcdGxldCBib29raW5nczogQm9va2luZ01vZGVsW10gPSBbXTtcclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdC8vIEdldCBib29raW5ncyBvbiBzZWxmLlxyXG5cdFx0XHRib29raW5ncyA9IGF3YWl0IHVzZXIuJGdldChcImJvb2tpbmdzXCIsIHtcclxuXHRcdFx0XHRpbmNsdWRlOiBbVmVoaWNsZSwgUmVwbGFjZVZlaGljbGVdXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuQURNSU4gfHwgdXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSKSB7XHJcblx0XHRcdC8vIEdldCBib29raW5ncyBvbiBzZWxmIGNsaWVudC5cclxuXHRcdFx0Ym9va2luZ3MgPSBhd2FpdCBCb29raW5nTW9kZWwuZmluZEFsbCh7XHJcblx0XHRcdFx0aW5jbHVkZTogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtb2RlbDogVXNlcixcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRjbGllbnRJZDogdXNlci5jbGllbnRJZFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0VmVoaWNsZSxcclxuXHRcdFx0XHRcdFJlcGxhY2VWZWhpY2xlXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSBpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0XHQvLyBHZXQgYWxsIGJvb2tpbmdzLlxyXG5cdFx0XHRib29raW5ncyA9IGF3YWl0IEJvb2tpbmdNb2RlbC5maW5kQWxsKHtcclxuXHRcdFx0XHRpbmNsdWRlOiBbVmVoaWNsZSwgUmVwbGFjZVZlaGljbGVdXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ldyBDb2xsZWN0aW9uPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+LCBCb29raW5nPihcclxuXHRcdFx0Ym9va2luZ3MubWFwKGIgPT4gbmV3IEJvb2tpbmcoYikpXHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IEJvb2tpbmdDcmVhdGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCB2YWxpZGF0b3IgPSBCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLkNSRUFURVxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0Ly8gVmFsaWRhdGUgSlNPTiBzY2hlbWEuXHJcblx0XHRcdGF3YWl0IHZhbGlkYXRvci52YWxpZGF0ZShvcHRpb25zKTtcclxuXHRcdFx0Ly8gQ2FzdCB0aGUgSlNPTlxyXG5cdFx0XHRjb25zdCBib29raW5nT3B0aW9ucyA9IHZhbGlkYXRvci5jYXN0KG9wdGlvbnMpIGFzIFBhcnRpYWw8XHJcblx0XHRcdFx0Qm9va2luZ0NyZWF0ZU9wdGlvbnNcclxuXHRcdFx0PjtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSByZXBsYWNlZCB2ZWhpY2xlLlxyXG5cdFx0XHRjb25zdCByZXBsYWNlZFZlaGljbGUgPVxyXG5cdFx0XHRcdGJvb2tpbmdPcHRpb25zLnJlcGxhY2VWZWhpY2xlICYmXHJcblx0XHRcdFx0KGF3YWl0IFJlcGxhY2VWZWhpY2xlLmNyZWF0ZShib29raW5nT3B0aW9ucy5yZXBsYWNlVmVoaWNsZSkpO1xyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIGJvb2tpbmdcclxuXHRcdFx0Ly8gVE9ETzogSW5jbHVkZSBcInBhaWRcIiwgYW5kIFwiYW1vdW50XCIgaW4gc2NoZW1hLlxyXG5cdFx0XHRjb25zdCBjcmVhdGVkQm9va2luZyA9IGF3YWl0IEJvb2tpbmdNb2RlbC5jcmVhdGUoe1xyXG5cdFx0XHRcdHBhaWQ6IGZhbHNlLFxyXG5cdFx0XHRcdGFtb3VudDogbnVsbCxcclxuXHRcdFx0XHQuLi5ib29raW5nT3B0aW9ucyxcclxuXHRcdFx0XHRyZXBsYWNlVmVoaWNsZUlkOiByZXBsYWNlZFZlaGljbGU/LmlkIHx8IG51bGxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IEJvb2tpbmcoY3JlYXRlZEJvb2tpbmcpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRuZXcgQXBpRXJyb3JIYW5kbGVyKGUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0ID0gYXN5bmMgKHVzZXI6IFVzZXIsIGJvb2tpbmdJZDogbnVtYmVyKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nID0gYXdhaXQgQm9va2luZ01vZGVsLmZpbmRCeVBrKGJvb2tpbmdJZCwge1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYm9va2luZykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSXRlbU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBCb29raW5nIHdpdGggJHtib29raW5nSWR9IGRvZXMgbm90IGV4aXN0LmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdC8vIFJldHVybiBvbmx5IG93biBib29raW5ncy5cclxuXHRcdFx0aWYgKGJvb2tpbmcudXNlcklkID09PSB1c2VyLmlkKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBCb29raW5nKGJvb2tpbmcpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUiB8fCB1c2VyLnJvbGUgPT09IFJvbGUuQURNSU4pIHtcclxuXHRcdFx0aWYgKGJvb2tpbmcudXNlci5jbGllbnRJZCA9PT0gdXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQm9va2luZyhib29raW5nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSKSB7XHJcblx0XHRcdHJldHVybiBuZXcgQm9va2luZyhib29raW5nKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgdXBkYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IEJvb2tpbmdVcGRhdGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBib29raW5nID0gYXdhaXQgdGhpcy5kYXRhLnJlbG9hZCh7XHJcblx0XHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IFJlcGxhY2VWZWhpY2xlIH1dXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zdCB2YWxpZGF0b3IgPSBCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLlVQREFURSxcclxuXHRcdFx0XHRib29raW5nXHJcblx0XHRcdCk7XHJcblx0XHRcdC8vIFZhbGlkYXRlIEpTT04gc2NoZW1hLlxyXG5cdFx0XHRhd2FpdCB2YWxpZGF0b3IudmFsaWRhdGUob3B0aW9ucyk7XHJcblx0XHRcdC8vIENhc3QgdGhlIEpTT05cclxuXHRcdFx0Y29uc3QgYm9va2luZ09wdGlvbnMgPSB2YWxpZGF0b3IuY2FzdChvcHRpb25zKSBhcyBQYXJ0aWFsPFxyXG5cdFx0XHRcdEJvb2tpbmdVcGRhdGVPcHRpb25zXHJcblx0XHRcdD47XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgcmVwbGFjZWQgdmVoaWNsZS5cclxuXHRcdFx0Y29uc3QgcmVwbGFjZWRWZWhpY2xlID1cclxuXHRcdFx0XHRib29raW5nT3B0aW9ucy5yZXBsYWNlVmVoaWNsZSAmJlxyXG5cdFx0XHRcdChhd2FpdCBSZXBsYWNlVmVoaWNsZS5jcmVhdGUoYm9va2luZ09wdGlvbnMucmVwbGFjZVZlaGljbGUpKTtcclxuXHRcdFx0Ly8gRGVsZXRlIHJlcGxhY2VkIHZlaGljbGVcclxuXHRcdFx0aWYgKHJlcGxhY2VkVmVoaWNsZSAmJiBib29raW5nLnJlcGxhY2VWZWhpY2xlSWQpIHtcclxuXHRcdFx0XHRhd2FpdCBSZXBsYWNlVmVoaWNsZS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ3JlYXRlIGJvb2tpbmdcclxuXHJcblx0XHRcdGNvbnN0IHVwZGF0ZWRCb29raW5nID0gYXdhaXQgdGhpcy5kYXRhLnVwZGF0ZSh7XHJcblx0XHRcdFx0Li4uYm9va2luZ09wdGlvbnMsXHJcblx0XHRcdFx0cmVwbGFjZVZlaGljbGVJZDogcmVwbGFjZWRWZWhpY2xlPy5pZFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgQm9va2luZyh1cGRhdGVkQm9va2luZyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHRwdWJsaWMgZGVzdHJveSA9IGFzeW5jICh1c2VyOiBVc2VyKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBWYWxpZGF0ZSBKU09OIHNjaGVtYS5cclxuXHRcdFx0YXdhaXQgQm9va2luZ1ZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKFxyXG5cdFx0XHRcdHVzZXIsXHJcblx0XHRcdFx0QVBJX09QRVJBVElPTi5ERUxFVEUsXHJcblx0XHRcdFx0dGhpcy5kYXRhXHJcblx0XHRcdCkudmFsaWRhdGUodGhpcy5kYXRhKTtcclxuXHJcblx0XHRcdGF3YWl0IHRoaXMuZGF0YS5kZXN0cm95KCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cHVibGljIHNldEVtYWlsTm90aWZpY2F0aW9uc1RvQm9va2luZ01hbmFnZXJzID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0Y29uc3QgYm9va2luZ0RhdGEgPSBhd2FpdCB0aGlzLmRhdGEucmVsb2FkKHtcclxuXHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IFVzZXIgfV1cclxuXHRcdH0pO1xyXG5cdFx0YXdhaXQgVXNlci5maW5kQWxsKHtcclxuXHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRjbGllbnRJZDogYm9va2luZ0RhdGEudXNlci5jbGllbnRJZCxcclxuXHRcdFx0XHRyb2xlOiB7XHJcblx0XHRcdFx0XHRbT3AuaW5dOiBbUm9sZS5BRE1JTiwgUm9sZS5LRVlfTUFOQUdFUl1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLnRoZW4oYXN5bmMgdXNlcnMgPT4ge1xyXG5cdFx0XHRjb25zdCB2ZWhpY2xlID0gYXdhaXQgVmVoaWNsZS5maW5kQnlQayhib29raW5nRGF0YS52ZWhpY2xlSWQpO1xyXG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IHZlaGljbGUgJiYgKGF3YWl0IExvY2F0aW9uLmZpbmRCeVBrKHZlaGljbGUubG9jYXRpb25JZCkpO1xyXG5cclxuXHRcdFx0bGV0IGxuZyA9IGxvY2F0aW9uLmxuZztcclxuXHRcdFx0bGV0IGxhdCA9IGxvY2F0aW9uLmxhdDtcclxuXHJcblx0XHRcdGlmICh2ZWhpY2xlLndpYWxvblVuaXRJZCkge1xyXG5cdFx0XHRcdGNvbnN0IHcgPSBhd2FpdCBXaWFsb24ubG9naW4oe1xyXG5cdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGNvbnN0IHVuaXQgPSBhd2FpdCB3LkNvcmUuc2VhcmNoSXRlbSh7XHJcblx0XHRcdFx0XHRpZDogdmVoaWNsZS53aWFsb25Vbml0SWQsXHJcblx0XHRcdFx0XHRmbGFnczogMTAyNCArIDgxOTJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpZiAodW5pdCkge1xyXG5cdFx0XHRcdFx0bGF0ID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy55O1xyXG5cdFx0XHRcdFx0bG5nID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy54O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IgKGNvbnN0IHVzZXIgb2YgdXNlcnMpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0c2VuZEJvb2tpbmdOb3RpZmljYXRpb24oe1xyXG5cdFx0XHRcdFx0XHRlbWFpbDogdXNlci5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdFx0XHRcdFx0Ym9va2luZ0lkOiBib29raW5nRGF0YS5pZCxcclxuXHRcdFx0XHRcdFx0Y3VzdG9tZXJFbWFpbDogYm9va2luZ0RhdGEudXNlci5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Y3VzdG9tZXJOYW1lOiBgJHtib29raW5nRGF0YS51c2VyLmZpcnN0TmFtZX0gJHtib29raW5nRGF0YS51c2VyLmxhc3ROYW1lfWAsXHJcblx0XHRcdFx0XHRcdGZyb206IG1vbWVudChib29raW5nRGF0YS5mcm9tKS51bml4KCksXHJcblx0XHRcdFx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0bGF0LFxyXG5cdFx0XHRcdFx0XHRsbmcsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiBsb2NhdGlvbi5uYW1lLFxyXG5cdFx0XHRcdFx0XHRtb2JpbGU6IGJvb2tpbmdEYXRhLnVzZXIubW9iaWxlTnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlciB8fCBcIk4vQVwiLFxyXG5cdFx0XHRcdFx0XHR2ZWhpY2xlOiBgJHt2ZWhpY2xlLmJyYW5kfSAke3ZlaGljbGUubW9kZWx9YCxcclxuXHRcdFx0XHRcdFx0dmVoaWNsZUlkOiB2ZWhpY2xlLmlkLFxyXG5cdFx0XHRcdFx0XHR0aW1lWm9uZTogdXNlci50aW1lWm9uZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge31cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0cHVibGljIHNlbmRJbnZvaWNlID0gYXN5bmMgKGFtb3VudDogbnVtYmVyKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHRoaXMuZGF0YS5yZWxvYWQoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogVXNlciB9LCB7IG1vZGVsOiBWZWhpY2xlIH1dXHJcblx0XHR9KTtcclxuXHRcdGF3YWl0IHNlbmRJbnZvaWNlRW1haWwoe1xyXG5cdFx0XHRlbWFpbDogYm9va2luZ0RhdGEudXNlci5lbWFpbCxcclxuXHRcdFx0YW1vdW50OiBhbW91bnQsXHJcblx0XHRcdGN1c3RvbWVyTmFtZTogYm9va2luZ0RhdGEudXNlci5maXJzdE5hbWUsXHJcblx0XHRcdHZlaGljbGVOYW1lOiBgJHtib29raW5nRGF0YS52ZWhpY2xlLmJyYW5kfSAke2Jvb2tpbmdEYXRhLnZlaGljbGUubW9kZWx9YCxcclxuXHRcdFx0ZnJvbTogbW9tZW50KGJvb2tpbmdEYXRhLmZyb20sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdGJvb2tpbmdJZDogYm9va2luZ0RhdGEuaWQsXHJcblx0XHRcdHRpbWVab25lOiBib29raW5nRGF0YS51c2VyLnRpbWVab25lXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgc2VuZEJvb2tpbmdDb25maXJtYXRpb24gPSBhc3luYyAoKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHRoaXMuZGF0YS5yZWxvYWQoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogVXNlciB9LCB7IG1vZGVsOiBWZWhpY2xlIH1dXHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHZlaGljbGVMb2NhdGlvbiA9IGF3YWl0IExvY2F0aW9uLmZpbmRCeVBrKFxyXG5cdFx0XHRib29raW5nRGF0YS52ZWhpY2xlLmxvY2F0aW9uSWRcclxuXHRcdCk7XHJcblx0XHRsZXQgbG5nID0gdmVoaWNsZUxvY2F0aW9uLmxuZztcclxuXHRcdGxldCBsYXQgPSB2ZWhpY2xlTG9jYXRpb24ubGF0O1xyXG5cclxuXHRcdGlmIChib29raW5nRGF0YS52ZWhpY2xlLndpYWxvblVuaXRJZCkge1xyXG5cdFx0XHRjb25zdCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHtcclxuXHRcdFx0XHR0b2tlbjogcHJvY2Vzcy5lbnYuV0lBTE9OX1RPS0VOXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zdCB1bml0ID0gYXdhaXQgdy5Db3JlLnNlYXJjaEl0ZW0oe1xyXG5cdFx0XHRcdGlkOiBib29raW5nRGF0YS52ZWhpY2xlLndpYWxvblVuaXRJZCxcclxuXHRcdFx0XHRmbGFnczogMTAyNCArIDgxOTJcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh1bml0KSB7XHJcblx0XHRcdFx0bGF0ID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy55O1xyXG5cdFx0XHRcdGxuZyA9IHVuaXQuaXRlbSAmJiB1bml0Lml0ZW0ucG9zICYmIHVuaXQuaXRlbS5wb3MueDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0YXdhaXQgc2VuZEJvb2tpbmdDb25maXJtYXRpb25FbWFpbCh7XHJcblx0XHRcdGVtYWlsOiBib29raW5nRGF0YS51c2VyLmVtYWlsLFxyXG5cdFx0XHRjdXN0b21lck5hbWU6IGJvb2tpbmdEYXRhLnVzZXIuZmlyc3ROYW1lLFxyXG5cdFx0XHR2ZWhpY2xlTmFtZTogYCR7Ym9va2luZ0RhdGEudmVoaWNsZS5icmFuZH0gJHtib29raW5nRGF0YS52ZWhpY2xlLm1vZGVsfSAke2Jvb2tpbmdEYXRhLnZlaGljbGUucGxhdGVOdW1iZXJ9YCxcclxuXHRcdFx0ZnJvbTogbW9tZW50KGJvb2tpbmdEYXRhLmZyb20sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdGJvb2tpbmdJZDogYm9va2luZ0RhdGEuaWQsXHJcblx0XHRcdGFkZHJlc3M6IHZlaGljbGVMb2NhdGlvbiAmJiB2ZWhpY2xlTG9jYXRpb24uYWRkcmVzcyxcclxuXHRcdFx0cGFya2luZ0xvY2F0aW9uOiBib29raW5nRGF0YS52ZWhpY2xlLnBhcmtpbmdMb2NhdGlvbixcclxuXHRcdFx0bGF0LFxyXG5cdFx0XHRsbmcsXHJcblx0XHRcdHRpbWVab25lOiBib29raW5nRGF0YS51c2VyLnRpbWVab25lXHJcblx0XHR9KTtcclxuXHR9O1xyXG59XHJcbiIsImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhc3RhYmxlPFI+IHtcclxuXHRjYXN0OiAodXNlcjogVXNlcikgPT4gUjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb248UiwgVCBleHRlbmRzIENhc3RhYmxlPFI+PiB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGRhdGE6IFRbXSkge31cclxuXHJcblx0cHVibGljIGNhc3QgPSAodXNlcjogVXNlcikgPT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNhc3QodXNlcikpO1xyXG5cdH07XHJcbn1cclxuIiwiaW1wb3J0IHsgT3AsIEZpbmRPcHRpb25zIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7XHJcblx0VmVoaWNsZSBhcyBWZWhpY2xlTW9kZWwsXHJcblx0VXNlcixcclxuXHRCb29raW5nLFxyXG5cdFZlaGljbGVBdHRyaWJ1dGVzLFxyXG5cdENhdGVnb3J5XHJcbn0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBnZXRCb29raW5nU3RhdHVzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdTdGF0dXMsIFJvbGUgfSBmcm9tIFwiLi4vdmFyaWFibGVzL2VudW1zXCI7XHJcbmltcG9ydCB7IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4vZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIGFzIFZlaGljbGVWYWxpZGF0b3JzIH0gZnJvbSBcIi4vdmFsaWRhdG9yc1wiO1xyXG5pbXBvcnQgeyBBcGlFcnJvckhhbmRsZXIgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBVc2VQYXJhbWV0ZXJzLCBDb2xsZWN0aW9uLCBDYXN0YWJsZSwgQVBJX09QRVJBVElPTiB9IGZyb20gXCIuXCI7XHJcblxyXG5leHBvcnQgdHlwZSBDcmVhdGVWZWhpY2xlT3B0aW9ucyA9IFVzZVBhcmFtZXRlcnM8XHJcblx0VmVoaWNsZUF0dHJpYnV0ZXMsXHJcblx0XCJicmFuZFwiIHwgXCJtb2RlbFwiIHwgXCJ2aW5cIixcclxuXHR8IFwicGxhdGVOdW1iZXJcIlxyXG5cdHwgXCJkZWZsZWV0ZWRcIlxyXG5cdHwgXCJwYXJraW5nTG9jYXRpb25cIlxyXG5cdHwgXCJ2ZWhpY2xlSW1hZ2VTcmNcIlxyXG5cdHwgXCJib29raW5nQ2hhcmdlQ291bnRcIlxyXG5cdHwgXCJib29raW5nQ2hhcmdlXCJcclxuXHR8IFwid2lhbG9uVW5pdElkXCJcclxuXHR8IFwiYm9va2luZ0NoYXJnZVVuaXRcIlxyXG5cdHwgXCJjbGllbnRJZFwiXHJcblx0fCBcImxvY2F0aW9uSWRcIlxyXG4+O1xyXG5cclxuZXhwb3J0IHR5cGUgVXBkYXRlVmVoaWNsZU9wdGlvbnMgPSBVc2VQYXJhbWV0ZXJzPFxyXG5cdFZlaGljbGVBdHRyaWJ1dGVzLFxyXG5cdFwiYnJhbmRcIiB8IFwibW9kZWxcIiB8IFwidmluXCIsXHJcblx0fCBcInBsYXRlTnVtYmVyXCJcclxuXHR8IFwiZGVmbGVldGVkXCJcclxuXHR8IFwicGFya2luZ0xvY2F0aW9uXCJcclxuXHR8IFwidmVoaWNsZUltYWdlU3JjXCJcclxuXHR8IFwiYm9va2luZ0NoYXJnZUNvdW50XCJcclxuXHR8IFwiYm9va2luZ0NoYXJnZVwiXHJcblx0fCBcIndpYWxvblVuaXRJZFwiXHJcblx0fCBcImJvb2tpbmdDaGFyZ2VVbml0XCJcclxuXHR8IFwiY2xpZW50SWRcIlxyXG5cdHwgXCJsb2NhdGlvbklkXCJcclxuPjtcclxuZXhwb3J0IGNsYXNzIFZlaGljbGUgaW1wbGVtZW50cyBDYXN0YWJsZTxQYXJ0aWFsPFZlaGljbGVBdHRyaWJ1dGVzPj4ge1xyXG5cdHByaXZhdGUgY29uc3RydWN0b3IocHVibGljIGRhdGE6IFZlaGljbGVNb2RlbCkge31cclxuXHJcblx0cHVibGljIGNhc3QgPSAodXNlcjogVXNlcikgPT5cclxuXHRcdFZlaGljbGVWYWxpZGF0b3JzLmdldFZhbGlkYXRvcih1c2VyLCBBUElfT1BFUkFUSU9OLlJFQUQpLmNhc3QodGhpcy5kYXRhKTtcclxuXHJcblx0cHVibGljIGF2YWlsYWJsZUZvckJvb2tpbmcgPSBhc3luYyAoXHJcblx0XHRmcm9tOiBudW1iZXIsXHJcblx0XHR0bzogbnVtYmVyLFxyXG5cdFx0Ym9va2luZ3M6IEJvb2tpbmdbXVxyXG5cdCkgPT4ge1xyXG5cdFx0aWYgKHRoaXMuZGF0YS5kZWZsZWV0ZWQgPT09IHRydWUpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHZlaGljbGVCb29raW5ncyA9IGJvb2tpbmdzIHx8IChhd2FpdCB0aGlzLmRhdGEuJGdldChcImJvb2tpbmdzXCIpKTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGJvb2tpbmcgb2YgdmVoaWNsZUJvb2tpbmdzKSB7XHJcblx0XHRcdGNvbnN0IHN0YXR1cyA9IGdldEJvb2tpbmdTdGF0dXMoe1xyXG5cdFx0XHRcdGZyb20sXHJcblx0XHRcdFx0dG8sXHJcblx0XHRcdFx0YXBwcm92ZWQ6IGJvb2tpbmcuYXBwcm92ZWRcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRzdGF0dXMgPT09IEJvb2tpbmdTdGF0dXMuUEVORElORyB8fFxyXG5cdFx0XHRcdHN0YXR1cyA9PT0gQm9va2luZ1N0YXR1cy5BUFBST1ZFRCB8fFxyXG5cdFx0XHRcdHN0YXR1cyA9PT0gQm9va2luZ1N0YXR1cy5PTkdPSU5HXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0ID0gYXN5bmMgKHVzZXI6IFVzZXIsIGlkOiBudW1iZXIpID0+IHtcclxuXHRcdGNvbnN0IHZlaGljbGUgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZEJ5UGsoaWQpO1xyXG5cclxuXHRcdGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSKSB7XHJcblx0XHRcdHJldHVybiBuZXcgVmVoaWNsZSh2ZWhpY2xlKTtcclxuXHRcdH0gZWxzZSBpZiAodXNlci5jbGllbnRJZCA9PT0gdmVoaWNsZS5jbGllbnRJZCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFZlaGljbGUodmVoaWNsZSk7XHJcblx0XHR9XHJcblx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oXCJZb3UgY2Fubm90IGFjY2VzcyB0aGlzIHZlaGljbGUuXCIpO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUgPSBhc3luYyAodXNlcjogVXNlciwgb3B0aW9uczogVXBkYXRlVmVoaWNsZU9wdGlvbnMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGF3YWl0IFZlaGljbGVWYWxpZGF0b3JzLmdldFZhbGlkYXRvcih1c2VyLCBBUElfT1BFUkFUSU9OLlVQREFURSwge1xyXG5cdFx0XHRcdG5ld0RhdGE6IG9wdGlvbnMsXHJcblx0XHRcdFx0dGFyZ2V0OiB0aGlzLmRhdGFcclxuXHRcdFx0fSkudmFsaWRhdGUob3B0aW9ucyk7XHJcblxyXG5cdFx0XHRjb25zdCB2ZWhpY2xlT3B0aW9ucyA9IFZlaGljbGVWYWxpZGF0b3JzLmdldFZhbGlkYXRvcihcclxuXHRcdFx0XHR1c2VyLFxyXG5cdFx0XHRcdEFQSV9PUEVSQVRJT04uVVBEQVRFLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5ld0RhdGE6IG9wdGlvbnMsXHJcblx0XHRcdFx0XHR0YXJnZXQ6IHRoaXMuZGF0YVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KS5jYXN0KG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0YXdhaXQgdGhpcy5kYXRhLnVwZGF0ZSh2ZWhpY2xlT3B0aW9ucyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cHVibGljIHN0YXRpYyBjcmVhdGUgPSBhc3luYyAodXNlcjogVXNlciwgb3B0aW9uczogQ3JlYXRlVmVoaWNsZU9wdGlvbnMpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGF3YWl0IFZlaGljbGVWYWxpZGF0b3JzLmdldFZhbGlkYXRvcih1c2VyLCBBUElfT1BFUkFUSU9OLkNSRUFURSwge1xyXG5cdFx0XHRcdG5ld0RhdGE6IG9wdGlvbnNcclxuXHRcdFx0fSkudmFsaWRhdGUob3B0aW9ucyk7XHJcblxyXG5cdFx0XHRjb25zdCB2ZWhpY2xlT3B0aW9ucyA9IGF3YWl0IFZlaGljbGVWYWxpZGF0b3JzLmdldFZhbGlkYXRvcihcclxuXHRcdFx0XHR1c2VyLFxyXG5cdFx0XHRcdEFQSV9PUEVSQVRJT04uQ1JFQVRFLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5ld0RhdGE6IG9wdGlvbnNcclxuXHRcdFx0XHR9XHJcblx0XHRcdCkuY2FzdChvcHRpb25zKTtcclxuXHJcblx0XHRcdGNvbnN0IGNyZWF0ZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZU1vZGVsLmNyZWF0ZSh2ZWhpY2xlT3B0aW9ucyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IEJvb2tpbmcoY3JlYXRlZFZlaGljbGUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRuZXcgQXBpRXJyb3JIYW5kbGVyKGUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0QWxsID0gYXN5bmMgKFxyXG5cdFx0dXNlcjogVXNlcixcclxuXHRcdG9wdGlvbnM/OiB7IGZyb206IERhdGU7IHRvOiBEYXRlIH1cclxuXHQpID0+IHtcclxuXHRcdGxldCB2ZWhpY2xlczogVmVoaWNsZU1vZGVsW10gPSBbXTtcclxuXHRcdGNvbnN0IGJhc2VGaW5kT3B0aW9uczogRmluZE9wdGlvbnMgPVxyXG5cdFx0XHRvcHRpb25zPy5mcm9tICYmIG9wdGlvbnM/LnRvXHJcblx0XHRcdFx0PyB7XHJcblx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0XCIkYm9va2luZ3MudmVoaWNsZUlkJFwiOiBudWxsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRtb2RlbDogQm9va2luZyxcclxuXHRcdFx0XHRcdFx0XHRcdHJlcXVpcmVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIENoZWNrIGlmIHRoZSBpbnRlcnZhbHMgZG9lcyBub3QgaW50ZXJzZWN0IHdpdGggb3RoZXIgYm9va2luZ3MuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRvOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0W09wLmx0ZV06IG9wdGlvbnMudG9cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZnJvbToge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFtPcC5ndGVdOiBvcHRpb25zLmZyb21cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XVxyXG5cdFx0XHRcdCAgfVxyXG5cdFx0XHRcdDoge307XHJcblxyXG5cdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5NQVNURVIpIHtcclxuXHRcdFx0dmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZEFsbChiYXNlRmluZE9wdGlvbnMpO1xyXG5cdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuR1VFU1QpIHtcclxuXHRcdFx0Ly8gR2V0IG9ubHkgYXZhaWxhYmxlIHZlaGljbGVzIGluIHRoZSBzYW1lIGNsaWVudC5cclxuXHRcdFx0Ly8gT25seSB2ZWhpY2xlcyB3aGljaCBoYXZlIHRoZSBzYW1lIGNhdGVnb3JpZXMgYXMgdGhlIHVzZXIuXHJcblx0XHRcdGNvbnN0IHVzZXJDYXRlZ29yaWVzID0gYXdhaXQgdXNlci4kZ2V0KFwiY2F0ZWdvcmllc1wiKTtcclxuXHJcblx0XHRcdC8vIEdldCBhbGwgdmVoaWNsZXMgaW4gdGhlIGNsaWVudCBpZiB1c2VyIGRvZXMgbm90IGNvbnRhaW4gYSBjYXRlZ29yeS5cclxuXHRcdFx0aWYgKCF1c2VyQ2F0ZWdvcmllcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR2ZWhpY2xlcyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQWxsKFxyXG5cdFx0XHRcdFx0Xy5tZXJnZShcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRjbGllbnRJZDogdXNlci5jbGllbnRJZFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0YmFzZUZpbmRPcHRpb25zXHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2ZWhpY2xlcyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQWxsKFxyXG5cdFx0XHRcdFx0Xy5tZXJnZShcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRjbGllbnRJZDogdXNlci5jbGllbnRJZFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0aW5jbHVkZTogW1xyXG5cdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogQ2F0ZWdvcnksXHJcblx0XHRcdFx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWQ6IHsgW09wLmluXTogdXNlckNhdGVnb3JpZXMubWFwKGMgPT4gYy5pZCkgfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XVxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRiYXNlRmluZE9wdGlvbnNcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0dmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlTW9kZWwuZmluZEFsbChcclxuXHRcdFx0XHRfLm1lcmdlKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0XHRcdGNsaWVudElkOiB1c2VyLmNsaWVudElkXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRiYXNlRmluZE9wdGlvbnNcclxuXHRcdFx0XHQpXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBDb2xsZWN0aW9uPFBhcnRpYWw8VmVoaWNsZUF0dHJpYnV0ZXM+LCBWZWhpY2xlPihcclxuXHRcdFx0dmVoaWNsZXMubWFwKHYgPT4gbmV3IFZlaGljbGUodikpXHJcblx0XHQpO1xyXG5cdH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEFwaUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFCYXNlRXhjZXB0aW9uIGV4dGVuZHMgQXBpRXhjZXB0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWVsZEVycm9yIHtcclxuXHRmaWVsZDogc3RyaW5nO1xyXG5cdG1lc3NhZ2U6IHN0cmluZztcclxuXHRuYW1lOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIEZvcm1FeGNlcHRpb24gZXh0ZW5kcyBBcGlFeGNlcHRpb24ge1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgcHVibGljIGZpZWxkczogRmllbGRFcnJvcltdKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcblx0cHVibGljIHRocm93ID0gKCkgPT4ge1xyXG5cdFx0aWYgKHRoaXMuZmllbGRzKSB7XHJcblx0XHRcdHRocm93IHRoaXM7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uIGV4dGVuZHMgQXBpRXhjZXB0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBEYXRhQmFzZUV4Y2VwdGlvbiB9IGZyb20gXCIuL1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEl0ZW1Ob3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIERhdGFCYXNlRXhjZXB0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vQXBpRXhjZXB0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0Zvcm1FeGNlcHRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vRGF0YUJhc2VFeGNlcHRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vUmVzb3VyY2VOb3RGb3VuZFwiO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9Cb29raW5nXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1ZlaGljbGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQ29sbGVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGVudW0gQVBJX09QRVJBVElPTiB7XHJcblx0Q1JFQVRFID0gXCJDUkVBVEVcIixcclxuXHRERUxFVEUgPSBcIkRFTEVURVwiLFxyXG5cdFVQREFURSA9IFwiVVBEQVRFXCIsXHJcblx0UkVBRCA9IFwiUkVBRFwiXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFVzZVBhcmFtZXRlcnM8XHJcblx0QWxsUGFyYW1zLFxyXG5cdFJlcXVpcmVkUGFyYW1zIGV4dGVuZHMga2V5b2YgQWxsUGFyYW1zID0gdW5kZWZpbmVkLFxyXG5cdFBhcnRpYWxQYXJhbXMgZXh0ZW5kcyBrZXlvZiBBbGxQYXJhbXMgPSB1bmRlZmluZWRcclxuPiA9IFBpY2s8QWxsUGFyYW1zLCBSZXF1aXJlZFBhcmFtcz4gJiBQaWNrPFBhcnRpYWw8QWxsUGFyYW1zPiwgUGFydGlhbFBhcmFtcz47XHJcbiIsImltcG9ydCB7IEFwaUV4Y2VwdGlvbiwgRm9ybUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBcGlFcnJvckhhbmRsZXIge1xyXG5cdGNvbnN0cnVjdG9yKGU6IEVycm9yKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIkFwaUVycm9ySGFuZGxlclwiLCBlKTtcclxuXHRcdGlmIChlIGluc3RhbmNlb2YgRm9ybUV4Y2VwdGlvbikge1xyXG5cdFx0XHQvLyBBZGQgZmllbGRzIHRvIGVycm9yc1xyXG5cdFx0XHRmb3IgKGNvbnN0IGVycm9yIG9mIGUuZmllbGRzKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJlcnJvciBmaWVsZHNcIixlcnJvcik7XHJcblx0XHRcdFx0aWYgKGVycm9yLm5hbWUgPT09IFwicGVybWlzc2lvblwiKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oZXJyb3IubWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHRocm93IGU7XHJcblx0XHR9XHJcblx0XHQvLyBVbmtub3duIGVycm9yLlxyXG5cdFx0dGhyb3cgbmV3IEFwaUV4Y2VwdGlvbihcIkFuIHVua25vd24gZXJyb3IgaGFzIG9jY3VycmVkLlwiKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgRmllbGRFcnJvciwgRm9ybUV4Y2VwdGlvbiB9IGZyb20gXCIuLi9leGNlcHRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybUVycm9yQnVpbGRlciB7XHJcblx0cHVibGljIGZpZWxkczogRmllbGRFcnJvcltdID0gW107XHJcblxyXG5cdHB1YmxpYyBhZGQgPSAoZmllbGQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IHtcclxuXHRcdHRoaXMuZmllbGRzLnB1c2goeyBmaWVsZCwgbWVzc2FnZSwgbmFtZSB9KTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBhZGRJZiA9IChcclxuXHRcdGNvbmRpdGlvbjogYm9vbGVhbixcclxuXHRcdGZpZWxkOiBzdHJpbmcsXHJcblx0XHRtZXNzYWdlOiBzdHJpbmcsXHJcblx0XHRuYW1lOiBzdHJpbmdcclxuXHQpID0+IHtcclxuXHRcdGlmIChjb25kaXRpb24pIHtcclxuXHRcdFx0dGhpcy5hZGQoZmllbGQsIG1lc3NhZ2UsIG5hbWUpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0cHVibGljIHRocm93KG1lc3NhZ2U6IHN0cmluZyA9IFwiQW4gZXJyb3IgaGFzIG9jY3VyZWQgaW4gb25lIG9mIHRoZSBmaWVsZHMuXCIpIHtcclxuXHRcdGlmICh0aGlzLmZpZWxkcy5sZW5ndGgpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEZvcm1FeGNlcHRpb24obWVzc2FnZSwgdGhpcy5maWVsZHMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCB7IEZpZWxkRXJyb3IsIEZvcm1FeGNlcHRpb24gfSBmcm9tIFwiLi4vZXhjZXB0aW9uc1wiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vQXBpRXJyb3JIYW5kbGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0Zvcm1FcnJvckJ1aWxkZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRWYWxpZGF0aW9uRXJyb3JzID0gKGVycm9yczogVmFsaWRhdGlvbkVycm9yKTogRmllbGRFcnJvcltdID0+XHJcblx0ZXJyb3JzLmlubmVyLm1hcChlcnJvciA9PiAoe1xyXG5cdFx0ZmllbGQ6IGVycm9yLnBhdGgsXHJcblx0XHRtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxyXG5cdFx0bmFtZTogZXJyb3IubmFtZVxyXG5cdH0pKTtcclxuXHJcbmV4cG9ydCBjb25zdCBjYXRjaFl1cFZhZGF0aW9uRXJyb3JzID0gYXN5bmMgKFxyXG5cdHZhbGlkYXRvcjogKCkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD5cclxuKSA9PiB7XHJcblx0bGV0IGVycm9yczogRmllbGRFcnJvcltdID0gW107XHJcblx0dHJ5IHtcclxuXHRcdGF3YWl0IHZhbGlkYXRvcigpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdGlmIChlIGluc3RhbmNlb2YgVmFsaWRhdGlvbkVycm9yKSB7XHJcblx0XHRcdGVycm9ycyA9IGdldFZhbGlkYXRpb25FcnJvcnMoZSk7XHJcblx0XHR9XHJcblx0XHRpZiAoZXJyb3JzLmxlbmd0aCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRm9ybUV4Y2VwdGlvbihcclxuXHRcdFx0XHRcIkFuIGVycm9yIGhhcyBvY2N1cmVkIGluIG9uZSBvZiB0aGUgZmllbGRzLlwiLFxyXG5cdFx0XHRcdGVycm9yc1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuIiwiaW1wb3J0ICogYXMgeXVwIGZyb20gXCJ5dXBcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5pbXBvcnQge1xyXG5cdFVzZXIsXHJcblx0VmVoaWNsZSxcclxuXHRCb29raW5nIGFzIEJvb2tpbmdNb2RlbCxcclxuXHRSZXBsYWNlVmVoaWNsZSxcclxuXHRCb29raW5nQXR0cmlidXRlc1xyXG59IGZyb20gXCIuLi8uLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgQm9va2luZ1R5cGUsIFJvbGUgfSBmcm9tIFwiLi4vLi4vdmFyaWFibGVzL2VudW1zXCI7XHJcbmltcG9ydCB7IHN0cmlwRmllbGQgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBpc0Jvb2tpbmdUaW1lU2xvdFRha2VuIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdDcmVhdGVPcHRpb25zLCBCb29raW5nVXBkYXRlT3B0aW9ucyB9IGZyb20gXCIuLi9Cb29raW5nXCI7XHJcbmltcG9ydCB7IEFQSV9PUEVSQVRJT04gfSBmcm9tIFwiLi5cIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi5cIjtcclxuXHJcbnR5cGUgVmFsaWRhdG9yUGFyYW1ldGVycyA9IFBhcmFtZXRlcnM8dHlwZW9mIEJvb2tpbmcuZ2V0VmFsaWRhdG9yPjtcclxuXHJcbmludGVyZmFjZSBCb29raW5nVmFsaWRhdGlvbkRhdGEgZXh0ZW5kcyBPbWl0PEJvb2tpbmdBdHRyaWJ1dGVzLCBcImZyb21cIiB8IFwidG9cIj4ge1xyXG5cdGZyb206IG51bWJlciB8IERhdGU7XHJcblx0dG86IG51bWJlciB8IERhdGU7XHJcbn1cclxuXHJcbnR5cGUgQm9va2luZ1ZhbGlkYXRvckNvbnRleHRXaXRoU2NoZW1hID0gW1xyXG5cdFZhbGlkYXRvclBhcmFtZXRlcnNbMF0sXHJcblx0QVBJX09QRVJBVElPTixcclxuXHRCb29raW5nTW9kZWwsXHJcblx0Qm9va2luZ1VwZGF0ZU9wdGlvbnMgfCBCb29raW5nQ3JlYXRlT3B0aW9ucyxcclxuXHRib29sZWFuLFxyXG5cdHl1cC5PYmplY3RTY2hlbWE8Qm9va2luZ1ZhbGlkYXRpb25EYXRhPlxyXG5dO1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQm9va2luZyB7XHJcblx0cHVibGljIHN0YXRpYyBnZXRWYWxpZGF0b3IgPSAoXHJcblx0XHR1c2VyOiBVc2VyLFxyXG5cdFx0b3BlcmF0aW9uOiBBUElfT1BFUkFUSU9OLFxyXG5cdFx0dGFyZ2V0PzogQm9va2luZ01vZGVsXHJcblx0KSA9PiBuZXcgVmFsaWRhdG9yKEJvb2tpbmcudmFsaWRhdG9yU2NoZW1hLCB1c2VyLCBvcGVyYXRpb24sIHRhcmdldCk7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIHZhbGlkYXRvclNjaGVtYSA9IHl1cFxyXG5cdFx0Lm9iamVjdCgpXHJcblx0XHQuc2hhcGUoe1xyXG5cdFx0XHRwYWlkOiB5dXAuYm9vbGVhbigpLFxyXG5cdFx0XHRhbW91bnQ6IHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRmcm9tOiB5dXBcclxuXHRcdFx0XHQuZGF0ZSgpXHJcblx0XHRcdFx0LnRyYW5zZm9ybSgodiwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdHR5cGVvZiBvcmlnaW5hbFZhbHVlID09PSBcIm51bWJlclwiXHJcblx0XHRcdFx0XHRcdD8gbW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHQ6IG9yaWdpbmFsVmFsdWVcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHR0bzogeXVwXHJcblx0XHRcdFx0LmRhdGUoKVxyXG5cdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHR0eXBlb2Ygb3JpZ2luYWxWYWx1ZSA9PT0gXCJudW1iZXJcIlxyXG5cdFx0XHRcdFx0XHQ/IG1vbWVudChvcmlnaW5hbFZhbHVlLCBcIlhcIikudG9EYXRlKClcclxuXHRcdFx0XHRcdFx0OiBvcmlnaW5hbFZhbHVlXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0YXBwcm92ZWQ6IHl1cC5ib29sZWFuKCkubnVsbGFibGUoKSxcclxuXHRcdFx0ZmluaXNoZWQ6IHl1cC5ib29sZWFuKCksXHJcblx0XHRcdHN0YXJ0TWlsZWFnZTogeXVwLm51bWJlcigpLm51bGxhYmxlKCksXHJcblx0XHRcdGVuZE1pbGVhZ2U6IHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRzdGFydEZ1ZWw6IHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRlbmRGdWVsOiB5dXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0dXNlcklkOiB5dXAubnVtYmVyKCksXHJcblx0XHRcdHZlaGljbGVJZDogeXVwLm51bWJlcigpLFxyXG5cdFx0XHRib29raW5nVHlwZTogeXVwLm1peGVkPEJvb2tpbmdUeXBlPigpLm9uZU9mKE9iamVjdC52YWx1ZXMoQm9va2luZ1R5cGUpKSxcclxuXHRcdFx0cmVwbGFjZVZlaGljbGVJZDogeXVwLm51bWJlcigpLm51bGxhYmxlKClcclxuXHRcdH0pXHJcblx0XHQud2hlbihcclxuXHRcdFx0W1wiJHVzZXJcIiwgXCIkb3BlcmF0aW9uXCIsIFwiJHRhcmdldFwiLCBcIiRkYXRhXCIsIFwiJGNhc3RpbmdcIl0sXHJcblx0XHRcdCguLi5hcmdzOiBCb29raW5nVmFsaWRhdG9yQ29udGV4dFdpdGhTY2hlbWEpID0+IHtcclxuXHRcdFx0XHRsZXQgW3VzZXIsIG9wZXJhdGlvbiwgdGFyZ2V0LCBkYXRhLCBjYXN0aW5nLCBzY2hlbWFdID0gYXJncztcclxuXHRcdFx0XHRzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG5cdFx0XHRcdFx0Y2FzZSBBUElfT1BFUkFUSU9OLlJFQUQ6IHtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGEuYm9va2luZ1R5cGUgPT09IEJvb2tpbmdUeXBlLlJFUExBQ0VNRU5UKSB7XHJcblx0XHRcdFx0XHRcdFx0c2NoZW1hID0gc2NoZW1hLnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlcGxhY2VWZWhpY2xlOiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lm9iamVjdCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJhbmQ6IHl1cC5zdHJpbmcoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1vZGVsOiB5dXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2aW46IHl1cC5zdHJpbmcoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKCkubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IHl1cC5udW1iZXIoKSxcclxuXHRcdFx0XHRcdFx0XHRmcm9tOiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodiwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUgYXMgRGF0ZSkudW5peCgpXHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHRvOiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodiwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUgYXMgRGF0ZSkudW5peCgpXHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdGNyZWF0ZWRBdDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudChvcmlnaW5hbFZhbHVlIGFzIERhdGUpLnVuaXgoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR1cGRhdGVkQXQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHQubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybShcclxuXHRcdFx0XHRcdFx0XHRcdFx0KHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KG9yaWdpbmFsVmFsdWUgJiYgbW9tZW50KG9yaWdpbmFsVmFsdWUgYXMgRGF0ZSkudW5peCgpKSB8fFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG51bGxcclxuXHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0dmVoaWNsZTogeXVwLm9iamVjdCgpLnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRcdGlkOiB5dXAubnVtYmVyKCksXHJcblx0XHRcdFx0XHRcdFx0XHRicmFuZDogeXVwLnN0cmluZygpLFxyXG5cdFx0XHRcdFx0XHRcdFx0bW9kZWw6IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdHZpbjogeXVwLnN0cmluZygpLFxyXG5cdFx0XHRcdFx0XHRcdFx0cGxhdGVOdW1iZXI6IHl1cC5zdHJpbmcoKVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5VUERBVEU6IHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdXBkYXRlRGF0YSA9IGRhdGEgYXMgQm9va2luZ1VwZGF0ZU9wdGlvbnM7XHJcblx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0ZnJvbTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQuZGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCh2YWx1ZSwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwibm8tYXBwcm92ZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJCb29raW5nIGhhcyBhbHJlYWR5IGJlZW4gYXBwcm92ZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhPy5mcm9tICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGEuZnJvbSAhPT0gdGFyZ2V0LmZyb207XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgR3Vlc3QsIGRlbnkgY2hhbmdlcyBpZiBhcHByb3ZlZC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUICYmIHRhcmdldC5hcHByb3ZlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuS0VZX01BTkFHRVIgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5maW5pc2hlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgS2V5IE1hbmFnZXIsIGRlbnkgaWYgYm9va2luZyBoYXMgZmluaXNoZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHRvOiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdC5kYXRlKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKHZhbHVlLCBvcmlnaW5hbFZhbHVlKSA9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQob3JpZ2luYWxWYWx1ZSwgXCJYXCIpLnRvRGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJuby1hcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIkJvb2tpbmcgaGFzIGFscmVhZHkgYmVlbiBhcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LnRvICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGEudG8gIT09IHRhcmdldC50bztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEd1ZXN0LCBkZW55IGNoYW5nZXMgaWYgYXBwcm92ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5HVUVTVCAmJiB0YXJnZXQuYXBwcm92ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQuZmluaXNoZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEtleSBNYW5hZ2VyLCBkZW55IGlmIGJvb2tpbmcgaGFzIGZpbmlzaGVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRmaW5pc2hlZDogc3RyaXBGaWVsZChcclxuXHRcdFx0XHRcdFx0XHRcdHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuYm9vbGVhbigpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwidGltZXNsb3QtYXZhaWxhYmxlXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJUaGlzIGJvb2tpbmcgaXMgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIgYm9va2luZyBhdCB0aGUgdGltZSBzcGVjaWZpZWQuXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXN5bmMgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8uZmluaXNoZWQgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLmZpbmlzaGVkICE9PSB0YXJnZXQuZmluaXNoZWQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGJvb2tlZFZlaGljbGUgPSBhd2FpdCBWZWhpY2xlLmZpbmRCeVBrKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQudmVoaWNsZUlkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IEJvb2tpbmdNb2RlbCB9XVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICFpc0Jvb2tpbmdUaW1lU2xvdFRha2VuKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib29rZWRWZWhpY2xlLmJvb2tpbmdzLm1hcCgoeyBmcm9tLCB0bywgaWQgfSkgPT4gKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmcm9tOiBtb21lbnQoZnJvbSkudW5peCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvOiBtb21lbnQodG8pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KSksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudCh0YXJnZXQuZnJvbSkudW5peCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQodGFyZ2V0LmZyb20pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LmlkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdFtSb2xlLk1BU1RFUiwgUm9sZS5BRE1JTiwgUm9sZS5LRVlfTUFOQUdFUl1cclxuXHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHVzZXJJZDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5vLWFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwiQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuIGFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNoYW5nZWQgPVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8udXNlcklkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGEudXNlcklkICE9PSB0YXJnZXQudXNlcklkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWNoYW5nZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgR3Vlc3QsIGRlbnkgY2hhbmdlcyBpZiBhcHByb3ZlZC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUICYmIHRhcmdldC5hcHByb3ZlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuS0VZX01BTkFHRVIgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5maW5pc2hlZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgS2V5IE1hbmFnZXIsIGRlbnkgaWYgYm9va2luZyBoYXMgZmluaXNoZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHZlaGljbGVJZDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5vLWFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwiQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuIGFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNoYW5nZWQgPVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8udmVoaWNsZUlkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGEudmVoaWNsZUlkICE9PSB0YXJnZXQudmVoaWNsZUlkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWNoYW5nZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgR3Vlc3Qgb3IgS00sIGRlbnkgY2hhbmdlcyBpZiBhcHByb3ZlZC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuR1VFU1QgfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldC5hcHByb3ZlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHN0YXJ0RnVlbDogc3RyaXBGaWVsZCh5dXAubnVtYmVyKCkubnVsbGFibGUoKSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5NQVNURVIsXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLkFETUlOLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHN0YXJ0TWlsZWFnZTogc3RyaXBGaWVsZCh5dXAubnVtYmVyKCkubnVsbGFibGUoKSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5NQVNURVIsXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLkFETUlOLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdGFwcHJvdmVkOiBzdHJpcEZpZWxkKFxyXG5cdFx0XHRcdFx0XHRcdFx0eXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5ib29sZWFuKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJuby1maW5pc2hlZC1ib29raW5nXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJUaGlzIGJvb2tpbmcgaGFzIGFscmVhZHkgZmluaXNoZWQuXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8uYXBwcm92ZWQgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLmFwcHJvdmVkICE9PSB0YXJnZXQuYXBwcm92ZWQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAhdGFyZ2V0LmZpbmlzaGVkO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcInBlbmRpbmctb25seVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGBCb29raW5nIGhhcyBhbHJlYWR5IGJlZW4gJHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LmFwcHJvdmVkID8gXCJhcHByb3ZlZFwiIDogXCJkZW5pZWRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fWA7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNoYW5nZWQgPVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhPy5hcHByb3ZlZCAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGEuYXBwcm92ZWQgIT09IHRhcmdldC5hcHByb3ZlZDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWNoYW5nZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNoYW5nZWQgPyB0YXJnZXQuYXBwcm92ZWQgPT09IG51bGwgOiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImJvb2tpbmctZXhwaXJlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiQm9va2luZyBoYXMgYWxyZWFkeSBleHBpcmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8uYXBwcm92ZWQgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLmFwcHJvdmVkICE9PSB0YXJnZXQuYXBwcm92ZWQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtb21lbnQodGFyZ2V0LmZyb20pLmlzQWZ0ZXIobW9tZW50KCkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdFtSb2xlLk1BU1RFUiwgUm9sZS5BRE1JTiwgUm9sZS5LRVlfTUFOQUdFUl1cclxuXHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdGVuZEZ1ZWw6IHN0cmlwRmllbGQoeXVwLm51bWJlcigpLm51bGxhYmxlKCksIFtcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuTUFTVEVSLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5BRE1JTixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHRlbmRNaWxlYWdlOiBzdHJpcEZpZWxkKHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLCBbXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLk1BU1RFUixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuQURNSU4sXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLktFWV9NQU5BR0VSXHJcblx0XHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdFx0cGFpZDogc3RyaXBGaWVsZCh5dXAuYm9vbGVhbigpLCBbXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLk1BU1RFUixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuQURNSU4sXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLktFWV9NQU5BR0VSXHJcblx0XHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdFx0cmVwbGFjZVZlaGljbGU6IHl1cC5sYXp5KGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBJZiBib29raW5nIHR5cGUgaGFzIGJlZW4gY2hhbmdlZCB0byByZXBsYWNlbWVudCwgdGhlbiByZXF1aXJlIGEgcmVwbGFjZW1lbnQgdmVoaWNsZS5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YS5ib29raW5nVHlwZSA9PT0gQm9va2luZ1R5cGUuUkVQTEFDRU1FTlQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LmJvb2tpbmdUeXBlICE9PSBCb29raW5nVHlwZS5SRVBMQUNFTUVOVFxyXG5cdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQub2JqZWN0KClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGxhdGVOdW1iZXI6IHl1cC5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmluOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyYW5kOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZGVsOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHRhcmdldC5ib29raW5nVHlwZSA9PT0gQm9va2luZ1R5cGUuUkVQTEFDRU1FTlQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgZXhpc3RpbmcgYm9va2luZyB0eXBlIGlzIFJlcGxhY2VtZW50LCBhbGxvdyB1cGRhdGluZyBwYXJ0aWFsbHkuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQub2JqZWN0KClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGxhdGVOdW1iZXI6IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpbjogeXVwLnN0cmluZygpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJhbmQ6IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZGVsOiB5dXAuc3RyaW5nKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0odiA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZXBsYWNlVmVoaWNsZSA9IFJlcGxhY2VWZWhpY2xlLmZpbmRCeVBrKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQucmVwbGFjZVZlaGljbGVJZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB7IC4uLnYsIC4uLnJlcGxhY2VWZWhpY2xlIH07XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5taXhlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5ub3RSZXF1aXJlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5udWxsYWJsZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKCkgPT4gbnVsbCk7XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5DUkVBVEU6IHtcclxuXHRcdFx0XHRcdFx0c2NoZW1hXHJcblx0XHRcdFx0XHRcdFx0LnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRcdHBhaWQ6IHN0cmlwRmllbGQoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHl1cC5ib29sZWFuKCkuZGVmYXVsdChmYWxzZSksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFtSb2xlLkdVRVNUXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdGFtb3VudDogc3RyaXBGaWVsZChcclxuXHRcdFx0XHRcdFx0XHRcdFx0eXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZGVmYXVsdChudWxsKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0W1JvbGUuR1VFU1RdLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR0cnVlXHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0dXNlcklkOiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXF1aXJlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiZGItbm8tZXhpc3RcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQoeyB2YWx1ZSB9KSA9PiBgVXNlciB3aXRoIElEICR7dmFsdWV9IGRvZXMgbm90IGV4aXN0LmAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXN5bmMgdmFsdWUgPT4gQm9vbGVhbihhd2FpdCBVc2VyLmZpbmRCeVBrKHZhbHVlKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdHZlaGljbGVJZDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVxdWlyZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImRiLW5vLWV4aXN0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KHsgdmFsdWUgfSkgPT4gYFZlaGljbGUgd2l0aCBJRCAke3ZhbHVlfSBkb2VzIG5vdCBleGlzdC5gLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jIHZhbHVlID0+IEJvb2xlYW4oYXdhaXQgVmVoaWNsZS5maW5kQnlQayh2YWx1ZSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRmcm9tOiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmRhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVxdWlyZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCh2YWx1ZSwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQob3JpZ2luYWxWYWx1ZSwgXCJYXCIpLnRvRGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHR0bzogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5kYXRlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJuby1sb3dlci10aGFuLW90aGVyXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YEJvb2tpbmcgdGltZSBlbmQgY2Fubm90IGJlIGxvd2VyIHRoYW4gc3RhcnRpbmcgdGltZS5gLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB7IHBhcmVudCB9ID0gdGhpcztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBtb21lbnQodmFsdWUsIFwiWFwiKSA8IHBhcmVudC5mcm9tO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCh2YWx1ZSwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQob3JpZ2luYWxWYWx1ZSwgXCJYXCIpLnRvRGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRib29raW5nVHlwZTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5zdHJpbmcoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQub25lT2YoT2JqZWN0LnZhbHVlcyhCb29raW5nVHlwZSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXF1aXJlZCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVwbGFjZVZlaGljbGU6IHl1cC5sYXp5KGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHsgY29udGV4dCB9ID0gb3B0aW9ucztcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRleHRbXCJib29raW5nT3B0aW9uc1wiXS5ib29raW5nVHlwZSA9PT1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRCb29raW5nVHlwZS5SRVBMQUNFTUVOVFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQub2JqZWN0KClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmluOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJhbmQ6IHl1cC5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogeXVwLnN0cmluZygpLnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucmVxdWlyZWQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm1peGVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKCkgPT4gbnVsbClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQubm90UmVxdWlyZWQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFwidGltZXNsb3QtYXZhaWxhYmxlXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIlRoZSB2ZWhpY2xlIGlzIHVuYXZhaWxhYmxlIGF0IHRoZSB0aW1lIHNwZWNpZmllZC5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGFzeW5jIGZ1bmN0aW9uKHYpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHYgJiYgdi52ZWhpY2xlSWQgJiYgdi5mcm9tICYmIHYudG8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBib29rZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZS5maW5kQnlQayh2LnZlaGljbGVJZCwge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IEJvb2tpbmdNb2RlbCB9XVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAhaXNCb29raW5nVGltZVNsb3RUYWtlbihcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJvb2tlZFZlaGljbGUuYm9va2luZ3MubWFwKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoeyBmcm9tLCB0bywgYXBwcm92ZWQsIGlkIH0pID0+ICh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnJvbTogbW9tZW50KGZyb20pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bzogbW9tZW50KHRvKS51bml4KCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXBwcm92ZWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2LmZyb20sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2LnRvXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJwZXJtaXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIllvdSBkbyBub3QgaGF2ZSB0aGUgcGVybWlzc2lvbiB0byBkbyB0aGlzLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0YXN5bmMgZnVuY3Rpb24odikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB1c2VyID0gdGhpcy5vcHRpb25zLmNvbnRleHRbXCJ1c2VyXCJdIGFzIFVzZXI7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IGFsbG93IGd1ZXN0IHRvIGNyZWF0ZSBib29raW5ncyBvbiBpdHNlbGYuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh1c2VyLnJvbGUgPT09IFJvbGUuR1VFU1QgJiYgdi51c2VySWQgPT09IHVzZXIuaWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IGFsbG93IGJvb2tpbmdzIG9uIHVzZXJzIHdpdGggdGhlIHNhbWUgY2xpZW50LlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUiB8fFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5BRE1JTlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRVc2VyID0gYXdhaXQgVXNlci5maW5kQnlQayh1c2VyLmlkKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFyZ2V0VXNlci5jbGllbnRJZCA9PT0gdXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHVzZXIucm9sZSA9PT0gUm9sZS5NQVNURVIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2FzZSBBUElfT1BFUkFUSU9OLkRFTEVURToge1xyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWEuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdGFwcHJvdmVkOiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdC5ib29sZWFuKClcclxuXHRcdFx0XHRcdFx0XHRcdC5udWxsYWJsZSgpXHJcblx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJub3QtYXBwcm92ZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJCb29raW5nIGhhcyBhbHJlYWR5IGJlZW4gYXBwcm92ZWQgYW5kIGNhbm5vdCBiZSBkZWxldGVkLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZSA9PiB2YWx1ZSAhPT0gdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBzY2hlbWE7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgWXVwIGZyb20gXCJ5dXBcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyLCBWZWhpY2xlIGFzIFZlaGljbGVNb2RlbCwgVmVoaWNsZUF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFJvbGUsIEJvb2tpbmdDaGFyZ2VVbml0IH0gZnJvbSBcIi4uLy4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgeyBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IFVwZGF0ZVZlaGljbGVPcHRpb25zLCBDcmVhdGVWZWhpY2xlT3B0aW9ucyB9IGZyb20gXCIuLi9WZWhpY2xlXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciwgRGF0YUNhc3RlciB9IGZyb20gXCIuXCI7XHJcblxyXG50eXBlIFZhbGlkYXRvclBhcmFtZXRlcnMgPSBQYXJhbWV0ZXJzPHR5cGVvZiBWZWhpY2xlLmdldFZhbGlkYXRvcj47XHJcblxyXG50eXBlIFZlaGljbGVWYWxpZGF0b3JDb250ZXh0V2l0aFNjaGVtYSA9IFtcclxuXHRWYWxpZGF0b3JQYXJhbWV0ZXJzWzBdLFxyXG5cdEFQSV9PUEVSQVRJT04sXHJcblx0VmVoaWNsZU1vZGVsLFxyXG5cdFVwZGF0ZVZlaGljbGVPcHRpb25zIHwgQ3JlYXRlVmVoaWNsZU9wdGlvbnMsXHJcblx0Ym9vbGVhbixcclxuXHRZdXAuT2JqZWN0U2NoZW1hPFZlaGljbGVBdHRyaWJ1dGVzPlxyXG5dO1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmVoaWNsZSB7XHJcblx0cHVibGljIHN0YXRpYyBnZXRWYWxpZGF0b3IgPSAoXHJcblx0XHR1c2VyOiBVc2VyLFxyXG5cdFx0b3BlcmF0aW9uOiBBUElfT1BFUkFUSU9OLFxyXG5cdFx0ZGF0YT86IHtcclxuXHRcdFx0dGFyZ2V0PzogVmVoaWNsZU1vZGVsO1xyXG5cdFx0XHRuZXdEYXRhPzogVXBkYXRlVmVoaWNsZU9wdGlvbnMgfCBDcmVhdGVWZWhpY2xlT3B0aW9ucztcclxuXHRcdH1cclxuXHQpID0+IG5ldyBWYWxpZGF0b3IoVmVoaWNsZS52YWxpZGF0b3JTY2hlbWEsIHVzZXIsIG9wZXJhdGlvbiwgZGF0YSk7XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIHZhbGlkYXRvclNjaGVtYSA9IFl1cC5vYmplY3Q8XHJcblx0XHRPbWl0PFZlaGljbGVBdHRyaWJ1dGVzLCBcImlkXCIgfCBcImNyZWF0ZWRBdFwiIHwgXCJ1cGRhdGVkQXRcIj5cclxuXHQ+KClcclxuXHRcdC5zaGFwZSh7XHJcblx0XHRcdGJyYW5kOiBZdXAuc3RyaW5nKCksXHJcblx0XHRcdG1vZGVsOiBZdXAuc3RyaW5nKCksXHJcblx0XHRcdHBsYXRlTnVtYmVyOiBZdXAuc3RyaW5nKCksXHJcblx0XHRcdHZpbjogWXVwLnN0cmluZygpLFxyXG5cdFx0XHRkZWZsZWV0ZWQ6IFl1cC5ib29sZWFuKCksXHJcblx0XHRcdHBhcmtpbmdMb2NhdGlvbjogWXVwLnN0cmluZygpLm51bGxhYmxlKCksXHJcblx0XHRcdHZlaGljbGVJbWFnZVNyYzogWXVwLnN0cmluZygpLm51bGxhYmxlKCksXHJcblx0XHRcdGJvb2tpbmdDaGFyZ2VDb3VudDogWXVwLm51bWJlcigpLFxyXG5cdFx0XHRib29raW5nQ2hhcmdlVW5pdDogWXVwLm1peGVkKClcclxuXHRcdFx0XHQub25lT2YoT2JqZWN0LnZhbHVlcyhCb29raW5nQ2hhcmdlVW5pdCkpXHJcblx0XHRcdFx0Lm51bGxhYmxlKCksXHJcblx0XHRcdGJvb2tpbmdDaGFyZ2U6IFl1cC5udW1iZXIoKSxcclxuXHRcdFx0Y2xpZW50SWQ6IFl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRsb2NhdGlvbklkOiBZdXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0d2lhbG9uVW5pdElkOiBZdXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0YXZhaWxhYmxlOiBZdXAuYm9vbGVhbigpXHJcblx0XHR9KVxyXG5cdFx0LndoZW4oXHJcblx0XHRcdFtcIiR1c2VyXCIsIFwiJG9wZXJhdGlvblwiLCBcIiR0YXJnZXRcIiwgXCIkZGF0YVwiLCBcIiRjYXN0aW5nXCJdLFxyXG5cdFx0XHQoLi4uYXJnczogVmVoaWNsZVZhbGlkYXRvckNvbnRleHRXaXRoU2NoZW1hKSA9PiB7XHJcblx0XHRcdFx0bGV0IFt1c2VyLCBvcGVyYXRpb24sIHRhcmdldCwgZGF0YSwgY2FzdGluZywgc2NoZW1hXSA9IGFyZ3M7XHJcblxyXG5cdFx0XHRcdHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcblx0XHRcdFx0XHRjYXNlIEFQSV9PUEVSQVRJT04uUkVBRDoge1xyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWEuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdGlkOiBZdXAubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2FzZSBBUElfT1BFUkFUSU9OLkNSRUFURToge1xyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWFcclxuXHRcdFx0XHRcdFx0XHQuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJhbmQ6IFl1cC5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0bW9kZWw6IFl1cC5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym9va2luZ0NoYXJnZUNvdW50OiBZdXAubnVtYmVyKCkuZGVmYXVsdCgwKSxcclxuXHRcdFx0XHRcdFx0XHRcdGJvb2tpbmdDaGFyZ2U6IFl1cC5udW1iZXIoKS5kZWZhdWx0KDApXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFwicGVybWlzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJZb3UgZG8gbm90IGhhdmUgdGhlIHBlcm1pc3Npb24gdG8gZG8gdGhpcy5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdXNlci5yb2xlID09PSBSb2xlLk1BU1RFUjtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5VUERBVEU6IHtcclxuXHRcdFx0XHRcdFx0c2NoZW1hID0gc2NoZW1hXHJcblx0XHRcdFx0XHRcdFx0LnNoYXBlKHsgaWQ6IFl1cC5udW1iZXIoKS5yZXF1aXJlZCgpIH0pXHJcblx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcInBlcm1pc3Npb25cIixcclxuXHRcdFx0XHRcdFx0XHRcdFwiWW91IGRvIG5vdCBoYXZlIHRoZSBwZXJtaXNzaW9uIHRvIGRvIHRoaXMuXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5NQVNURVIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuQURNSU4gfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldC5jbGllbnRJZCA9PT0gdXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gc2NoZW1hO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG59XHJcbiIsImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IEFQSV9PUEVSQVRJT04gfSBmcm9tIFwiLi4vXCI7XHJcbmltcG9ydCB7IE9iamVjdFNjaGVtYSB9IGZyb20gXCJ5dXBcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL0Jvb2tpbmdcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vVmVoaWNsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvcjxTY2hlbWEgZXh0ZW5kcyBvYmplY3QsIFRhcmdldCwgTmV3RGF0YT4ge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBzY2hlbWE6IE9iamVjdFNjaGVtYTxTY2hlbWE+LFxyXG5cdFx0cHJpdmF0ZSB1c2VyOiBVc2VyLFxyXG5cdFx0cHJpdmF0ZSBvcGVyYXRpb246IEFQSV9PUEVSQVRJT04sXHJcblx0XHRwcml2YXRlIHRhcmdldD86IFRhcmdldFxyXG5cdCkge31cclxuXHJcblx0cHVibGljIGNhc3QgPSAodmFsdWU6IHVua25vd24pOiBTY2hlbWEgPT4ge1xyXG5cdFx0Y29uc3QgeyB1c2VyLCBvcGVyYXRpb24sIHNjaGVtYSwgdGFyZ2V0IH0gPSB0aGlzO1xyXG5cclxuXHRcdHJldHVybiBzY2hlbWEuY2FzdCh2YWx1ZSwge1xyXG5cdFx0XHRzdHJpcFVua25vd246IHRydWUsXHJcblx0XHRcdGNvbnRleHQ6IHtcclxuXHRcdFx0XHR1c2VyLFxyXG5cdFx0XHRcdG9wZXJhdGlvbixcclxuXHRcdFx0XHR0YXJnZXQsXHJcblx0XHRcdFx0ZGF0YTogdmFsdWUsXHJcblx0XHRcdFx0Y2FzdGluZzogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgdmFsaWRhdGUgPSAodmFsdWU6IHVua25vd24pID0+IHtcclxuXHRcdGNvbnN0IHsgdXNlciwgb3BlcmF0aW9uLCBzY2hlbWEsIHRhcmdldCB9ID0gdGhpcztcclxuXHRcdHJldHVybiBzY2hlbWEudmFsaWRhdGUodmFsdWUsIHtcclxuXHRcdFx0YWJvcnRFYXJseTogZmFsc2UsXHJcblx0XHRcdGNvbnRleHQ6IHtcclxuXHRcdFx0XHR1c2VyLFxyXG5cdFx0XHRcdG9wZXJhdGlvbixcclxuXHRcdFx0XHR0YXJnZXQ6IHRhcmdldCxcclxuXHRcdFx0XHRkYXRhOiB2YWx1ZSxcclxuXHRcdFx0XHRjYXN0aW5nOiBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUNhc3RlcjxBdHRyaWJ1dGVzIGV4dGVuZHMgb2JqZWN0PiB7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzY2hlbWE6IE9iamVjdFNjaGVtYTxBdHRyaWJ1dGVzPiwgcHJpdmF0ZSB1c2VyOiBVc2VyKSB7fVxyXG5cclxuXHRwdWJsaWMgY2FzdCA9IChkYXRhOiB1bmtub3duKTogQXR0cmlidXRlcyA9PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5zY2hlbWEuY2FzdChkYXRhLCB7XHJcblx0XHRcdGNvbnRleHQ6IHtcclxuXHRcdFx0XHRvcGVyYXRpb246IEFQSV9PUEVSQVRJT04uUkVBRCxcclxuXHRcdFx0XHR1c2VyOiB0aGlzLnVzZXJcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyB5dXAgZnJvbSBcInl1cFwiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uLy4uLy4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBTY2hlbWEgfSBmcm9tIFwiZXhwcmVzcy12YWxpZGF0b3JcIjtcclxuXHJcbnR5cGUgU2NoZW1hSGVscGVyPFQ+ID0gKHNjaGVtYTogVCkgPT4gVDtcclxuXHJcbnR5cGUgVGVzdFNjaGVtYUhlbHBlciA9IChcclxuXHR0aGlzOiB5dXAuVGVzdENvbnRleHQsXHJcblx0dmFsdWU/OiBhbnlcclxuKSA9PiBib29sZWFuIHwgeXVwLlZhbGlkYXRpb25FcnJvciB8IFByb21pc2U8Ym9vbGVhbiB8IHl1cC5WYWxpZGF0aW9uRXJyb3I+O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBzY2hlbWEgWXVwIHNjaGVtYVxyXG4gKiBAcGFyYW0gc3RyaXBGb3VuZFxyXG4gKiBAdmFsdWUgdHJ1ZSAtIHN0cmlwIGZpZWxkIGlmIGZvdW5kLlxyXG4gKiBAdmFsdWUgZmFsc2UgLSBzdHJpcCBmaWVsZCBpZiBub3QgZm91bmQuXHJcbiAqIEBwYXJhbSByb2xlcyByb2xlcyB0byBzZWFyY2guXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVxdWlyZVJvbGUgPSA8VD4ocm9sZXM6IFJvbGVbXSk6IFRlc3RTY2hlbWFIZWxwZXIgPT5cclxuXHRmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLm9wdGlvbnMuY29udGV4dFtcInVzZXJcIl0gYXMgVXNlcjtcclxuXHRcdGNvbnN0IGV4aXN0cyA9IHJvbGVzLmluY2x1ZGVzKHVzZXIucm9sZSk7XHJcblxyXG5cdFx0aWYgKCFleGlzdHMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG4vKipcclxuICogQHBhcmFtIGtleSBLZXkgb2Ygb2JqZWN0IHdoZXJlIHRoZSB1c2VyIElkIHdpbGwgYmUgY29tcGFyZWQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2VsZk9ubHkgPSAoa2V5OiBzdHJpbmcgPSBcInVzZXJJZFwiKTogVGVzdFNjaGVtYUhlbHBlciA9PlxyXG5cdGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRjb25zdCB1c2VyID0gdGhpcy5vcHRpb25zLmNvbnRleHRbXCJ1c2VyXCJdIGFzIFVzZXI7XHJcblx0XHRpZiAodmFsdWVba2V5XSA9PT0gdXNlci5pZCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBzY2hlbWEgWXVwIHNjaGVtYVxyXG4gKiBAcGFyYW0gc3RyaXBGb3VuZFxyXG4gKiBAdmFsdWUgdHJ1ZSAtIHN0cmlwIGZpZWxkIGlmIGZvdW5kLlxyXG4gKiBAdmFsdWUgZmFsc2UgLSBzdHJpcCBmaWVsZCBpZiBub3QgZm91bmQuXHJcbiAqIEBwYXJhbSByb2xlcyByb2xlcyB0byBzZWFyY2guXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc3RyaXBGaWVsZCA9IDxUIGV4dGVuZHMgeXVwLlNjaGVtYTxhbnk+PihcclxuXHRzY2hlbWE6IFQsXHJcblx0cm9sZXM6IFJvbGVbXSxcclxuXHRzdHJpcEZvdW5kOiBib29sZWFuID0gZmFsc2VcclxuKTogeXVwLkxhenkgPT4ge1xyXG5cdHJldHVybiB5dXAubGF6eTxUPigodmFsdWUsIG9wdGlvbnMpID0+IHtcclxuXHRcdGNvbnN0IHVzZXIgPSBvcHRpb25zLmNvbnRleHRbXCJ1c2VyXCJdIGFzIFVzZXI7XHJcblx0XHRjb25zdCBleGlzdHMgPSByb2xlcy5pbmNsdWRlcyh1c2VyLnJvbGUpO1xyXG5cclxuXHRcdGlmIChleGlzdHMgJiYgc3RyaXBGb3VuZCkge1xyXG5cdFx0XHRyZXR1cm4geXVwLm1peGVkKCkuc3RyaXAodHJ1ZSk7XHJcblx0XHR9IGVsc2UgaWYgKCFleGlzdHMgJiYgIXN0cmlwRm91bmQpIHtcclxuXHRcdFx0cmV0dXJuIHl1cC5taXhlZCgpLnN0cmlwKHRydWUpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHNjaGVtYTtcclxuXHR9KTtcclxufTtcclxuIiwiY29uc3Qge1xyXG5cdERBVEFCQVNFX05BTUUsXHJcblx0REFUQUJBU0VfVVNFUk5BTUUsXHJcblx0REFUQUJBU0VfUEFTU1dPUkQsXHJcblx0REFUQUJBU0VfSE9TVCxcclxuXHREQVRBQkFTRV9QT1JULFxyXG5cdE1BSUxfVVNFUixcclxuXHRNQUlMX1BBU1MsXHJcblx0TUFJTF9QT1JULFxyXG5cdE1BSUxfSE9TVCxcclxuXHRTRVJWRVJfUE9SVCxcclxuXHRTRVJWRVJfVVJMLFxyXG5cdFNFQ1JFVF9LRVlcclxufSA9IHByb2Nlc3MuZW52O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGRhdGFiYXNlOiB7XHJcblx0XHRuYW1lOiBEQVRBQkFTRV9OQU1FLFxyXG5cdFx0dXNlcm5hbWU6IERBVEFCQVNFX1VTRVJOQU1FLFxyXG5cdFx0cGFzc3dvcmQ6IERBVEFCQVNFX1BBU1NXT1JELFxyXG5cdFx0aG9zdDogREFUQUJBU0VfSE9TVCxcclxuXHRcdHBvcnQ6IERBVEFCQVNFX1BPUlQsXHJcblx0XHRzZXF1ZWxpemU6IHtcclxuXHRcdFx0ZGlhbGVjdDogPGNvbnN0PlwibXlzcWxcIixcclxuXHRcdFx0cG9vbDoge1xyXG5cdFx0XHRcdG1heDogNSxcclxuXHRcdFx0XHRtaW46IDAsXHJcblx0XHRcdFx0YWNxdWlyZTogMzAwMDAsXHJcblx0XHRcdFx0aWRsZTogMTAwMDBcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWFpbDoge1xyXG5cdFx0YXV0aDoge1xyXG5cdFx0XHR1c2VyOiBNQUlMX1VTRVIsXHJcblx0XHRcdHBhc3M6IE1BSUxfUEFTU1xyXG5cdFx0fSxcclxuXHRcdHBvcnQ6IE1BSUxfUE9SVCxcclxuXHRcdHNlY3VyZTogdHJ1ZSxcclxuXHRcdGhvc3Q6IE1BSUxfSE9TVFxyXG5cdH0sXHJcblx0c2VydmVyUG9ydDogU0VSVkVSX1BPUlQsXHJcblx0c2VydmVyVXJsOiBTRVJWRVJfVVJMLFxyXG5cdHNlY3JldEtleTogU0VDUkVUX0tFWVxyXG59O1xyXG4iLCJpbXBvcnQgRGF0YVNvdXJjZSBmcm9tIFwiLi9EYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IFJvbGUsIE9wZXJhdGlvbiwgUmVzb3VyY2UgfSBmcm9tIFwiLi4vdmFyaWFibGVzL2VudW1zXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbixcclxuXHRJbnZhbGlkSW5wdXRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBleGNlcHRGaWVsZHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjaWRlbnQgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHR1c2VyOiBVc2VyQWNjZXNzb3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiOiBhbnksIHVzZXJBY2Nlc3NvcjogVXNlckFjY2Vzc29yKSB7XHJcblx0XHRzdXBlcihkYik7XHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyQWNjZXNzb3I7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXQoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQWNjaWRlbnQgPSBhd2FpdCB0aGlzLmdldEFjY2lkZW50KGlkLCB7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKFxyXG5cdFx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRBY2NpZGVudCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5BQ0NJREVOVFMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZEFjY2lkZW50XHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmb3VuZEFjY2lkZW50O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQWNjaWRlbnRzID0gYXdhaXQgdGhpcy5nZXRBY2NpZGVudHMoe1xyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhcclxuXHRcdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0XHRPcGVyYXRpb24uUkVBRCxcclxuXHRcdFx0XHRcdFJlc291cmNlLkFDQ0lERU5UU1xyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgYm9va2luZ3MgPSBbXTtcclxuXHRcdGZvciAobGV0IGJvb2tpbmcgb2YgZm91bmRBY2NpZGVudHMpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0XHRyb2xlLFxyXG5cdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFJlc291cmNlLkFDQ0lERU5UUyxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdFx0dGFyZ2V0OiBib29raW5nXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoYWNjZXNzaWJsZSkge1xyXG5cdFx0XHRcdGJvb2tpbmdzLnB1c2goYm9va2luZyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYm9va2luZ3M7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGUoaWQ6IG51bWJlciwgZGF0YTogYW55KTogUHJvbWlzZTxbYW55LCBhbnldPiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQWNjaWRlbnQgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLlVQREFURSxcclxuXHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kQWNjaWRlbnQsXHJcblx0XHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRhd2FpdCBmb3VuZEFjY2lkZW50LnVwZGF0ZShkYXRhKTtcclxuXHJcblx0XHRpZiAoZGF0YS5yZWFkKSB7XHJcblx0XHRcdGxldCBmb3VuZFVzZXIgPSBhd2FpdCB0aGlzLmdldFVzZXIodGhpcy51c2VyLmlkKTtcclxuXHRcdFx0Zm91bmRBY2NpZGVudC5zZXRVc2VyU3RhdHVzKGZvdW5kVXNlciwge1xyXG5cdFx0XHRcdHRocm91Z2g6IHsgcmVhZDogdHJ1ZSB9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFtmb3VuZEFjY2lkZW50LCB0aGlzLmdldChpZCldO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZEFjY2lkZW50ID0gYXdhaXQgdGhpcy5nZXQoaWQpO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4oXHJcblx0XHRcdHJvbGUsXHJcblx0XHRcdE9wZXJhdGlvbi5ERUxFVEUsXHJcblx0XHRcdFJlc291cmNlLkFDQ0lERU5UUyxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0dGFyZ2V0OiBmb3VuZEFjY2lkZW50XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRBY2NpZGVudC5kZXN0cm95KCk7XHJcblx0XHRyZXR1cm4gZm91bmRBY2NpZGVudDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZShkYXRhOiBhbnkpIHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLkNSRUFURSxcclxuXHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHRib2R5OiBkYXRhXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0XHRjb25zdCBhY2NpZGVudFZlaGljbGUgPSBhd2FpdCB0aGlzLmdldFZlaGljbGUoZGF0YS52ZWhpY2xlSWQpO1xyXG5cclxuXHRcdGlmICghYWNjaWRlbnRWZWhpY2xlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkSW5wdXRFeGNlcHRpb24oXCJWZWhpY2xlIGlzIG5vdCBmb3VuZC5cIiwgW1widmVoaWNsZUlkXCJdKTtcclxuXHRcdH1cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRhd2FpdCBhY2NpZGVudFZlaGljbGUudXBkYXRlKHtcclxuXHRcdFx0ZGVmbGVldGVkOiB0cnVlXHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVBY2NpZGVudChcclxuXHRcdFx0ZXhjZXB0RmllbGRzKFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0UkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhyb2xlLCBPcGVyYXRpb24uQ1JFQVRFLCBSZXNvdXJjZS5BQ0NJREVOVFMpXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IFdpYWxvbiB9IGZyb20gXCJub2RlLXdpYWxvblwiO1xyXG5pbXBvcnQgeyBPcCB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgVXNlckFjY2Vzc29yIGZyb20gXCIuL3R5cGVzL1VzZXJBY2Nlc3NvclwiO1xyXG5pbXBvcnQgUkJBQyBmcm9tIFwiLi4vdXRpbHMvcmJhY1wiO1xyXG5pbXBvcnQge1xyXG5cdEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLFxyXG5cdFJlc291cmNlTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyB0b015U1FMRGF0ZSwgZXhjZXB0RmllbGRzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdUeXBlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgeyBVc2VyLCBWZWhpY2xlLCBMb2NhdGlvbiB9IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoXCJtb21lbnRcIik7XHJcbmltcG9ydCB7IHNlbmRCb29raW5nTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG5cdHVzZXI6IFVzZXJBY2Nlc3NvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiKTtcclxuXHRcdHRoaXMudXNlciA9IHVzZXJBY2Nlc3NvcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldChpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRCb29raW5nID0gYXdhaXQgdGhpcy5nZXRCb29raW5nKGlkLCB7XHJcblx0XHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RlbDogVXNlclxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XSxcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRCb29raW5nKSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkJPT0tJTkdTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRCb29raW5nXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm91bmRCb29raW5nO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQm9va2luZ3MgPSBhd2FpdCB0aGlzLmdldEJvb2tpbmdzKHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbmNsdWRlOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bW9kZWw6IFVzZXJcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdFx0bGV0IGJvb2tpbmdzID0gW107XHJcblx0XHRmb3IgKGxldCBib29raW5nIG9mIGZvdW5kQm9va2luZ3MpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuQk9PS0lOR1MsIHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogYm9va2luZ1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHRib29raW5ncy5wdXNoKGJvb2tpbmcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJvb2tpbmdzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGlkOiBudW1iZXIsIGRhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQm9va2luZyA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5VUERBVEUsIFJlc291cmNlLkJPT0tJTkdTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRCb29raW5nLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEucmVwbGFjZVZlaGljbGUpIHtcclxuXHRcdFx0Y29uc3QgcmVwbGFjZVZlaGljbGUgPSBhd2FpdCB0aGlzLmRiLlJlcGxhY2VWZWhpY2xlLmZpbmRCeVBrKFxyXG5cdFx0XHRcdGZvdW5kQm9va2luZy5yZXBsYWNlVmVoaWNsZUlkXHJcblx0XHRcdCk7XHJcblx0XHRcdGlmIChyZXBsYWNlVmVoaWNsZSkge1xyXG5cdFx0XHRcdGF3YWl0IHJlcGxhY2VWZWhpY2xlLnVwZGF0ZShkYXRhLnJlcGxhY2VWZWhpY2xlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhd2FpdCByZXBsYWNlVmVoaWNsZS5jcmVhdGUoZGF0YS5yZXBsYWNlVmVoaWNsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdGZvdW5kQm9va2luZy5yZXBsYWNlVmVoaWNsZSAhPT0gbnVsbCAmJlxyXG5cdFx0XHRkYXRhLnJlcGxhY2VWZWhpY2xlID09PSB1bmRlZmluZWRcclxuXHRcdCkge1xyXG5cdFx0XHRjb25zdCByZXBsYWNlVmVoaWNsZSA9IGF3YWl0IHRoaXMuZGIuUmVwbGFjZVZlaGljbGUuZmluZEJ5UGsoXHJcblx0XHRcdFx0Zm91bmRCb29raW5nLnJlcGxhY2VWZWhpY2xlSWRcclxuXHRcdFx0KTtcclxuXHRcdFx0cmVwbGFjZVZlaGljbGUuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IGZvdW5kQm9va2luZy51cGRhdGUoe1xyXG5cdFx0XHQuLi5kYXRhLFxyXG5cdFx0XHRmcm9tOiBkYXRhLmZyb20gJiYgdG9NeVNRTERhdGUoZGF0YS5mcm9tKSxcclxuXHRcdFx0dG86IGRhdGEuZnJvbSAmJiB0b015U1FMRGF0ZShkYXRhLnRvKVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoaWQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZEJvb2tpbmcgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uREVMRVRFLCBSZXNvdXJjZS5CT09LSU5HUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHR0YXJnZXQ6IGZvdW5kQm9va2luZ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRCb29raW5nLmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZEJvb2tpbmc7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGUoZGF0YTogYW55KSB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLkNSRUFURSwgUmVzb3VyY2UuQk9PS0lOR1MsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgcmVwbGFjZW1lbnRWZWhpY2xlO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkYXRhLmJvb2tpbmdUeXBlID09PSBCb29raW5nVHlwZS5SRVBMQUNFTUVOVCkge1xyXG5cdFx0XHRcdGNvbnN0IHsgYnJhbmQsIG1vZGVsLCBwbGF0ZU51bWJlciwgdmluIH0gPSBkYXRhO1xyXG5cdFx0XHRcdHJlcGxhY2VtZW50VmVoaWNsZSA9IGF3YWl0IHRoaXMuZGIuUmVwbGFjZVZlaGljbGUuY3JlYXRlKHtcclxuXHRcdFx0XHRcdGJyYW5kLFxyXG5cdFx0XHRcdFx0bW9kZWwsXHJcblx0XHRcdFx0XHRwbGF0ZU51bWJlcixcclxuXHRcdFx0XHRcdHZpblxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgZXhjZXB0aW9ucyA9IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMoXHJcblx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRPcGVyYXRpb24uQ1JFQVRFLFxyXG5cdFx0XHRcdFJlc291cmNlLkJPT0tJTkdTXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRsZXQgY3JlYXRlZEJvb2tpbmcgPSBhd2FpdCB0aGlzLmNyZWF0ZUJvb2tpbmcoe1xyXG5cdFx0XHRcdHVzZXJJZDogcm9sZSA9PT0gUm9sZS5HVUVTVCA/IHRoaXMudXNlci5pZCA6IGRhdGEudXNlcklkLFxyXG5cdFx0XHRcdC4uLmV4Y2VwdEZpZWxkcyhkYXRhLCBleGNlcHRpb25zKSxcclxuXHRcdFx0XHR0bzogdG9NeVNRTERhdGUoZGF0YS50byksXHJcblx0XHRcdFx0ZnJvbTogdG9NeVNRTERhdGUoZGF0YS5mcm9tKSxcclxuXHRcdFx0XHRyZXBsYWNlVmVoaWNsZUlkOiAocmVwbGFjZW1lbnRWZWhpY2xlICYmIHJlcGxhY2VtZW50VmVoaWNsZS5pZCkgfHwgbnVsbFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCB1c2VyID0gYXdhaXQgdGhpcy5nZXRVc2VyKFxyXG5cdFx0XHRcdHJvbGUgPT09IFJvbGUuR1VFU1QgPyB0aGlzLnVzZXIuaWQgOiBkYXRhLnVzZXJJZFxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdFx0VXNlci5maW5kQWxsKHtcclxuXHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdGNsaWVudElkOiB1c2VyLmNsaWVudElkLFxyXG5cdFx0XHRcdFx0XHRyb2xlOiB7XHJcblx0XHRcdFx0XHRcdFx0W09wLmluXTogW1JvbGUuQURNSU4sIFJvbGUuS0VZX01BTkFHRVJdXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS50aGVuKGFzeW5jIHVzZXJzID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHZlaGljbGUgPSBhd2FpdCBWZWhpY2xlLmZpbmRCeVBrKGRhdGEudmVoaWNsZUlkKTtcclxuXHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgTG9jYXRpb24uZmluZEJ5UGsodmVoaWNsZS5sb2NhdGlvbklkKTtcclxuXHJcblx0XHRcdFx0XHRsZXQgbG5nID0gbG9jYXRpb24ubG5nO1xyXG5cdFx0XHRcdFx0bGV0IGxhdCA9IGxvY2F0aW9uLmxhdDtcclxuXHJcblx0XHRcdFx0XHRpZiAodmVoaWNsZS53aWFsb25Vbml0SWQpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdyA9IGF3YWl0IFdpYWxvbi5sb2dpbih7XHJcblx0XHRcdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdW5pdCA9IGF3YWl0IHcuQ29yZS5zZWFyY2hJdGVtKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogdmVoaWNsZS53aWFsb25Vbml0SWQsXHJcblx0XHRcdFx0XHRcdFx0ZmxhZ3M6IDEwMjQgKyA4MTkyXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodW5pdCkge1xyXG5cdFx0XHRcdFx0XHRcdGxhdCA9IHVuaXQuaXRlbSAmJiB1bml0Lml0ZW0ucG9zICYmIHVuaXQuaXRlbS5wb3MueTtcclxuXHRcdFx0XHRcdFx0XHRsbmcgPSB1bml0Lml0ZW0gJiYgdW5pdC5pdGVtLnBvcyAmJiB1bml0Lml0ZW0ucG9zLng7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbmRCb29raW5nTm90aWZpY2F0aW9uKHtcclxuXHRcdFx0XHRcdFx0XHRcdGVtYWlsOiB1c2VyLmVtYWlsLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGJvb2tpbmdJZDogY3JlYXRlZEJvb2tpbmcuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21lckVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXHJcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21lck5hbWU6IGAke3RoaXMudXNlci5maXJzdE5hbWV9ICR7dGhpcy51c2VyLmxhc3ROYW1lfWAsXHJcblx0XHRcdFx0XHRcdFx0XHRmcm9tOiBjcmVhdGVkQm9va2luZy5mcm9tLFxyXG5cdFx0XHRcdFx0XHRcdFx0dG86IGNyZWF0ZWRCb29raW5nLnRvLFxyXG5cdFx0XHRcdFx0XHRcdFx0bGF0LFxyXG5cdFx0XHRcdFx0XHRcdFx0bG5nLFxyXG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb246IGxvY2F0aW9uLm5hbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRtb2JpbGU6IHRoaXMudXNlci5tb2JpbGVOdW1iZXIsXHJcblx0XHRcdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlciB8fCBcIk4vQVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0dmVoaWNsZTogYCR7dmVoaWNsZS5icmFuZH0gJHt2ZWhpY2xlLm1vZGVsfWAsXHJcblx0XHRcdFx0XHRcdFx0XHR2ZWhpY2xlSWQ6IHZlaGljbGUuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHR0aW1lWm9uZTogdXNlci50aW1lWm9uZVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjcmVhdGVkQm9va2luZztcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVwbGFjZW1lbnRWZWhpY2xlICYmIChhd2FpdCByZXBsYWNlbWVudFZlaGljbGUuZGVzdHJveSgpKTtcclxuXHRcdFx0dGhyb3cgZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgVXNlckFjY2Vzc29yIGZyb20gXCIuL3R5cGVzL1VzZXJBY2Nlc3NvclwiO1xyXG5pbXBvcnQgUkJBQyBmcm9tIFwiLi4vdXRpbHMvcmJhY1wiO1xyXG5pbXBvcnQge1xyXG5cdEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLFxyXG5cdFJlc291cmNlTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50IGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiLCB1c2VyQWNjZXNzb3IsIFJlc291cmNlLkNMSUVOVFMpO1xyXG5cdH1cclxuXHJcblx0Z2V0ID0gYXN5bmMgKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZENsaWVudCA9IGF3YWl0IHRoaXMuZ2V0Q2xpZW50KGlkLCB7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5DTElFTlRTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRDbGllbnQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24oXHJcblx0XHRcdFx0YENsaWVudCB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5DTElFTlRTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRDbGllbnRcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvdW5kQ2xpZW50O1xyXG5cdH07XHJcblxyXG5cdGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZENsaWVudHMgPSBhd2FpdCB0aGlzLmdldENsaWVudHMoe1xyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuQ0xJRU5UUylcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgdmVoaWNsZXMgPSBbXTtcclxuXHRcdGZvciAobGV0IHZlaGljbGUgb2YgZm91bmRDbGllbnRzKSB7XHJcblx0XHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkNMSUVOVFMsIHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogdmVoaWNsZVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHR2ZWhpY2xlcy5wdXNoKHZlaGljbGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZlaGljbGVzO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlID0gYXN5bmMgKGlkOiBudW1iZXIsIGRhdGE/OiBhbnkpOiBQcm9taXNlPFthbnksIGFueV0+ID0+IHtcclxuXHRcdGxldCBmb3VuZENsaWVudCA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRjb25zdCB7IGFjY2VzcywgZXhjbHVkZWRGaWVsZHMgfSA9IGF3YWl0IHRoaXMuZ2V0VXNlclBlcm1pc3Npb25zKFxyXG5cdFx0XHRPcGVyYXRpb24uVVBEQVRFLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kQ2xpZW50XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0XHRpZiAoIWFjY2Vzcykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhLmxvY2F0aW9ucyAmJiAhZXhjbHVkZWRGaWVsZHMuaW5jbHVkZXMoXCJsb2NhdGlvbnNcIikpIHtcclxuXHRcdFx0YXdhaXQgZm91bmRDbGllbnQuc2V0TG9jYXRpb25zKGRhdGEubG9jYXRpb25zKTtcclxuXHRcdFx0YXdhaXQgVmVoaWNsZS51cGRhdGUoXHJcblx0XHRcdFx0eyBjbGllbnRJZDogbnVsbCB9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHdoZXJlOiB7IGNsaWVudElkOiBpZCwgbG9jYXRpb25JZDogeyBbT3Aubm90SW5dOiBkYXRhLmxvY2F0aW9ucyB9IH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YS51c2VycyAmJiAhZXhjbHVkZWRGaWVsZHMuaW5jbHVkZXMoXCJ1c2Vyc1wiKSkge1xyXG5cdFx0XHRhd2FpdCBmb3VuZENsaWVudC5zZXRVc2VycyhkYXRhLnVzZXJzKTtcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhLnZlaGljbGVzICYmICFleGNsdWRlZEZpZWxkcy5pbmNsdWRlcyhcInZlaGljbGVzXCIpKSB7XHJcblx0XHRcdGF3YWl0IGZvdW5kQ2xpZW50LnNldFZlaGljbGVzKGRhdGEudmVoaWNsZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IGZvdW5kQ2xpZW50LnVwZGF0ZShcclxuXHRcdFx0Xy5vbWl0KGRhdGEsIFsuLi5leGNsdWRlZEZpZWxkcywgXCJsb2NhdGlvbnNcIiwgXCJ1c2Vyc1wiLCBcInZlaGljbGVzXCJdKVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gW2ZvdW5kQ2xpZW50LCBhd2FpdCB0aGlzLmdldChpZCldO1xyXG5cdH07XHJcblxyXG5cdGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRDbGllbnQgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uREVMRVRFLCBSZXNvdXJjZS5DTElFTlRTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRDbGllbnRcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kQ2xpZW50LmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZENsaWVudDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZShkYXRhOiBvYmplY3QpIHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uQ1JFQVRFLCBSZXNvdXJjZS5DTElFTlRTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGNyZWF0ZWRDbGllbnQgPSBhd2FpdCB0aGlzLmNyZWF0ZUNsaWVudChkYXRhKTtcclxuXHRcdHJldHVybiBjcmVhdGVkQ2xpZW50O1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgVXNlckFjY2Vzc29yIGZyb20gXCIuL3R5cGVzL1VzZXJBY2Nlc3NvclwiO1xyXG5pbXBvcnQgUkJBQyBmcm9tIFwiLi4vdXRpbHMvcmJhY1wiO1xyXG5pbXBvcnQgeyBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgRGF0YVNvdXJjZSB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcm90ZWN0ZWQgZGI6IGFueSxcclxuXHRcdHByb3RlY3RlZCB1c2VyPzogVXNlckFjY2Vzc29yLFxyXG5cdFx0cHJvdGVjdGVkIHJlc291cmNlPzogUmVzb3VyY2VcclxuXHQpIHt9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRVc2VyUGVybWlzc2lvbnMgPSBhc3luYyAoXHJcblx0XHRhY3Rpb246IE9wZXJhdGlvbixcclxuXHRcdHBhcmFtcz86IGFueVxyXG5cdCk6IFByb21pc2U8eyBhY2Nlc3M6IGJvb2xlYW47IGV4Y2x1ZGVkRmllbGRzOiBzdHJpbmdbXSB9PiA9PiB7XHJcblx0XHRpZiAodGhpcy51c2VyICYmIHRoaXMucmVzb3VyY2UpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRhY2Nlc3M6IGF3YWl0IFJCQUMuY2FuKHRoaXMudXNlci5yb2xlLCBhY3Rpb24sIHRoaXMucmVzb3VyY2UsIHBhcmFtcyksXHJcblx0XHRcdFx0ZXhjbHVkZWRGaWVsZHM6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMoXHJcblx0XHRcdFx0XHR0aGlzLnVzZXIucm9sZSxcclxuXHRcdFx0XHRcdGFjdGlvbixcclxuXHRcdFx0XHRcdHRoaXMucmVzb3VyY2VcclxuXHRcdFx0XHQpXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geyBhY2Nlc3M6IGZhbHNlLCBleGNsdWRlZEZpZWxkczogW10gfTtcclxuXHR9O1xyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlVmVoaWNsZShkYXRhOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuVmVoaWNsZS5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VmVoaWNsZXMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5WZWhpY2xlLmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VmVoaWNsZShpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLlZlaGljbGUuZmluZEJ5UGsoaWQsIHtcclxuXHRcdFx0Li4ub3B0aW9ucyxcclxuXHRcdFx0aW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjcmVhdGVVc2VyKGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Vc2VyLmNyZWF0ZShkYXRhKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRVc2VycyhvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLlVzZXIuZmluZEFsbCh7IC4uLm9wdGlvbnMsIGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XSB9KTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRVc2VyKGlkOiBudW1iZXIsIG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuVXNlci5maW5kQnlQayhpZCwgeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlTG9jYXRpb24oZGF0YTogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkxvY2F0aW9uLmNyZWF0ZShkYXRhKTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldExvY2F0aW9ucyhvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkxvY2F0aW9uLmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRMb2NhdGlvbihpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkxvY2F0aW9uLmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlQm9va2luZyhkYXRhOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuQm9va2luZy5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRCb29raW5ncyhvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkJvb2tpbmcuZmluZEFsbCh7IC4uLm9wdGlvbnMsIGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XSB9KTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldEJvb2tpbmcoaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Cb29raW5nLmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlQWNjaWRlbnQoZGF0YTogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkFjY2lkZW50LmNyZWF0ZShkYXRhKTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldEFjY2lkZW50cyhvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkFjY2lkZW50LmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRBY2NpZGVudChpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkFjY2lkZW50LmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlQ2xpZW50KGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DbGllbnQuY3JlYXRlKGRhdGEpO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0Q2xpZW50cyhvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkNsaWVudC5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0Q2xpZW50KGlkOiBudW1iZXIsIG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuQ2xpZW50LmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlQ2F0ZWdvcnkoZGF0YTogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkNhdGVnb3J5LmNyZWF0ZShkYXRhKTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldENhdGVnb3J5cyhvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkNhdGVnb3J5LmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRDYXRlZ29yeShpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkNhdGVnb3J5LmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCBEYXRhU291cmNlIGZyb20gXCIuL0RhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgUm9sZSwgT3BlcmF0aW9uLCBSZXNvdXJjZSB9IGZyb20gXCIuLi92YXJpYWJsZXMvZW51bXNcIjtcclxuaW1wb3J0IFVzZXJBY2Nlc3NvciBmcm9tIFwiLi90eXBlcy9Vc2VyQWNjZXNzb3JcIjtcclxuaW1wb3J0IFJCQUMgZnJvbSBcIi4uL3V0aWxzL3JiYWNcIjtcclxuaW1wb3J0IHtcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbixcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYXRpb24gZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHR1c2VyOiBVc2VyQWNjZXNzb3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiOiBhbnksIHVzZXJBY2Nlc3NvcjogVXNlckFjY2Vzc29yKSB7XHJcblx0XHRzdXBlcihkYik7XHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyQWNjZXNzb3I7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXQoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb24gPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uKGlkLCB7XHJcblx0XHRcdGluY2x1ZGU6IFt7IG1vZGVsOiBDbGllbnQgfV0sXHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKFxyXG5cdFx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFx0UmVzb3VyY2UuTE9DQVRJT05TXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRMb2NhdGlvbikge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5MT0NBVElPTlMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZExvY2F0aW9uXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmb3VuZExvY2F0aW9uO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb25zID0gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbnMoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogQ2xpZW50IH1dLFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhcclxuXHRcdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0XHRPcGVyYXRpb24uUkVBRCxcclxuXHRcdFx0XHRcdFJlc291cmNlLkxPQ0FUSU9OU1xyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgbG9jYXRpb25zID0gW107XHJcblx0XHRmb3IgKGxldCBsb2NhdGlvbiBvZiBmb3VuZExvY2F0aW9ucykge1xyXG5cdFx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0T3BlcmF0aW9uLlJFQUQsXHJcblx0XHRcdFx0UmVzb3VyY2UuTE9DQVRJT05TLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0XHR0YXJnZXQ6IGxvY2F0aW9uXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoYWNjZXNzaWJsZSkge1xyXG5cdFx0XHRcdGxvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBsb2NhdGlvbnM7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGUoaWQ6IG51bWJlciwgZGF0YT86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb24gPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLlVQREFURSxcclxuXHRcdFx0UmVzb3VyY2UuTE9DQVRJT05TLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kTG9jYXRpb24sXHJcblx0XHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kTG9jYXRpb24udXBkYXRlKGRhdGEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0KGlkKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRMb2NhdGlvbiA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRyb2xlLFxyXG5cdFx0XHRPcGVyYXRpb24uREVMRVRFLFxyXG5cdFx0XHRSZXNvdXJjZS5MT0NBVElPTlMsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogZm91bmRMb2NhdGlvblxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kTG9jYXRpb24uZGVzdHJveSgpO1xyXG5cdFx0cmV0dXJuIGZvdW5kTG9jYXRpb247XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGUoZGF0YTogb2JqZWN0KSB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4oXHJcblx0XHRcdHJvbGUsXHJcblx0XHRcdE9wZXJhdGlvbi5DUkVBVEUsXHJcblx0XHRcdFJlc291cmNlLkxPQ0FUSU9OUyxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGNyZWF0ZWRVc2VyID0gYXdhaXQgdGhpcy5jcmVhdGVMb2NhdGlvbihkYXRhKTtcclxuXHRcdHJldHVybiBjcmVhdGVkVXNlcjtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBPcGVyYXRpb24sIFJlc291cmNlLCBSb2xlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgVXNlckFjY2Vzc29yIGZyb20gXCIuL3R5cGVzL1VzZXJBY2Nlc3NvclwiO1xyXG5pbXBvcnQgUkJBQyBmcm9tIFwiLi4vdXRpbHMvcmJhY1wiO1xyXG5pbXBvcnQgeyBleGNlcHRGaWVsZHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbixcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHR1c2VyOiBVc2VyQWNjZXNzb3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiOiBhbnksIHVzZXJBY2Nlc3NvcjogVXNlckFjY2Vzc29yKSB7XHJcblx0XHRzdXBlcihkYik7XHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyQWNjZXNzb3I7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXQoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVXNlciA9IGF3YWl0IHRoaXMuZ2V0VXNlcihpZCwge1xyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogW1xyXG5cdFx0XHRcdFx0Li4uUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuVVNFUlMpLFxyXG5cdFx0XHRcdFx0XCJwYXNzd29yZFwiXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRVc2VyKSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRVc2VyXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZvdW5kVXNlcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFVzZXJzID0gYXdhaXQgdGhpcy5nZXRVc2Vycyh7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBbXHJcblx0XHRcdFx0XHQuLi5SQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5VU0VSUyksXHJcblx0XHRcdFx0XHRcInBhc3N3b3JkXCJcclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bGV0IHVzZXJzID0gW107XHJcblx0XHRmb3IgKGxldCB1c2VyIG9mIGZvdW5kVXNlcnMpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuVVNFUlMsIHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogdXNlclxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHR1c2Vycy5wdXNoKHVzZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVzZXJzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGlkOiBudW1iZXIsIGRhdGE/OiBvYmplY3QsIG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFVzZXIgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblx0XHRpZiAoIWZvdW5kVXNlcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5VUERBVEUsIFJlc291cmNlLlVTRVJTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRVc2VyLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGxldCBoYXNoZWRQYXNzd29yZCA9XHJcblx0XHRcdGRhdGFbXCJwYXNzd29yZFwiXSAmJiAoYXdhaXQgYmNyeXB0Lmhhc2goZGF0YVtcInBhc3N3b3JkXCJdLCAxMCkpO1xyXG5cdFx0YXdhaXQgZm91bmRVc2VyLnVwZGF0ZShcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC4uLmV4Y2VwdEZpZWxkcyhkYXRhLCBbXCJjYXRlZ29yaWVzXCJdKSxcclxuXHRcdFx0XHRwYXNzd29yZDogZGF0YVtcInBhc3N3b3JkXCJdICYmIGhhc2hlZFBhc3N3b3JkXHJcblx0XHRcdH0sXHJcblx0XHRcdG9wdGlvbnNcclxuXHRcdCk7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoaWQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFVzZXIgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblx0XHRpZiAoIWZvdW5kVXNlcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5ERUxFVEUsIFJlc291cmNlLlVTRVJTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRVc2VyXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kVXNlci5kZXN0cm95KCk7XHJcblx0XHRyZXR1cm4gZm91bmRVc2VyO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlKGRhdGE6IGFueSwgb3B0aW9uczogeyBpbnZpdGVkPzogYm9vbGVhbiB9ID0ge30pOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IGNyZWF0ZWRVc2VyID0gYXdhaXQgdGhpcy5jcmVhdGVVc2VyKHtcclxuXHRcdFx0Li4uZGF0YSxcclxuXHRcdFx0cm9sZTogb3B0aW9ucy5pbnZpdGVkID8gUm9sZS5HVUVTVCA6IGRhdGEucm9sZSxcclxuXHRcdFx0YXBwcm92ZWQ6ICFvcHRpb25zLmludml0ZWRcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGNyZWF0ZWRVc2VyO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgRGF0YVNvdXJjZSBmcm9tIFwiLi9EYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IFJvbGUsIE9wZXJhdGlvbiwgUmVzb3VyY2UgfSBmcm9tIFwiLi4vdmFyaWFibGVzL2VudW1zXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IGV4Y2VwdEZpZWxkcyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVoaWNsZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG5cdHVzZXI6IFVzZXJBY2Nlc3NvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiKTtcclxuXHRcdHRoaXMudXNlciA9IHVzZXJBY2Nlc3NvcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldChpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRWZWhpY2xlID0gYXdhaXQgdGhpcy5nZXRWZWhpY2xlKGlkLCB7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5WRUhJQ0xFUylcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWZvdW5kVmVoaWNsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5WRUhJQ0xFUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHR0YXJnZXQ6IGZvdW5kVmVoaWNsZVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm91bmRWZWhpY2xlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVmVoaWNsZXMgPSBhd2FpdCB0aGlzLmdldFZlaGljbGVzKHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlZFSElDTEVTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGxldCB2ZWhpY2xlcyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgdmVoaWNsZSBvZiBmb3VuZFZlaGljbGVzKSB7XHJcblx0XHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlZFSElDTEVTLCB7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IHZlaGljbGVcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdFx0dmVoaWNsZXMucHVzaCh2ZWhpY2xlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2ZWhpY2xlcztcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZShpZDogbnVtYmVyLCBkYXRhPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRWZWhpY2xlID0gYXdhaXQgdGhpcy5nZXQoaWQpO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlVQREFURSwgUmVzb3VyY2UuVkVISUNMRVMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZFZlaGljbGUsXHJcblx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kVmVoaWNsZS51cGRhdGUoZXhjZXB0RmllbGRzKGRhdGEsIFtcImNhdGVnb3JpZXNcIl0pKTtcclxuXHRcdHJldHVybiB0aGlzLmdldChpZCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZWxldGUoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVmVoaWNsZSA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5ERUxFVEUsIFJlc291cmNlLlZFSElDTEVTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRWZWhpY2xlXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRhd2FpdCBmb3VuZFZlaGljbGUuZGVzdHJveSgpO1xyXG5cdFx0cmV0dXJuIGZvdW5kVmVoaWNsZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZShkYXRhOiBvYmplY3QpIHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uQ1JFQVRFLCBSZXNvdXJjZS5WRUhJQ0xFUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGxldCBjcmVhdGVkVXNlciA9IGF3YWl0IHRoaXMuY3JlYXRlVmVoaWNsZShkYXRhKTtcclxuXHRcdHJldHVybiBjcmVhdGVkVXNlcjtcclxuXHR9XHJcbn1cclxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBVc2VyIH0gZnJvbSBcIi4vVXNlclwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJvb2tpbmcgfSBmcm9tIFwiLi9Cb29raW5nXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVmVoaWNsZSB9IGZyb20gXCIuL1ZlaGljbGVcIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMb2NhdGlvbiB9IGZyb20gXCIuL0xvY2F0aW9uXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2xpZW50IH0gZnJvbSBcIi4vQ2xpZW50XCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQWNjaWRlbnQgfSBmcm9tIFwiLi9BY2NpZGVudFwiO1xyXG4iLCJpbXBvcnQgZW52IGZyb20gXCJkb3RlbnZcIjtcclxuZW52LmNvbmZpZygpO1xyXG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XHJcbmltcG9ydCB7IFN0cmF0ZWd5IH0gZnJvbSBcInBhc3Nwb3J0LWxvY2FsXCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcbmltcG9ydCBjb3JzIGZyb20gXCJjb3JzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xyXG5pbXBvcnQgZXhwcmVzc1Nlc3Npb24gZnJvbSBcImV4cHJlc3Mtc2Vzc2lvblwiO1xyXG5cclxuaW1wb3J0IHsgZ2V0U3RhdGljRmlsZXNQYXRoIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVc2VyLCBDYXRlZ29yeSB9IGZyb20gXCIuL21vZGVsc1wiO1xyXG5pbXBvcnQgYXV0aFJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvYXV0aFwiO1xyXG5pbXBvcnQgdXNlclJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvdXNlcnNcIjtcclxuaW1wb3J0IGludml0ZVJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvaW52aXRlc1wiO1xyXG5pbXBvcnQgdmVoaWNsZVJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvdmVoaWNsZXNcIjtcclxuaW1wb3J0IGJvb2tpbmdSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2Jvb2tpbmdzXCI7XHJcbmltcG9ydCBsb2NhdGlvblJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvbG9jYXRpb25zXCI7XHJcbmltcG9ydCBhY2NpZGVudFJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvYWNjaWRlbnRzXCI7XHJcbmltcG9ydCBjYXRlZ29yeVJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvY2F0ZWdvcmllc1wiO1xyXG5pbXBvcnQgY2xpZW50Um91dGVzIGZyb20gXCIuL3JvdXRlcy9jbGllbnRzXCI7XHJcbmltcG9ydCB2ZWhpY2VsSXNzdWVSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL3ZlaGljbGVJc3N1ZXNcIjtcclxuaW1wb3J0IHdpYWxvblJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvd2lhbG9uXCI7XHJcbmltcG9ydCByZXBvcnRSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL3JlcG9ydHNcIjtcclxuXHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuLy8gUEFTU1BPUlQgQ09ORklHVVJBVElPTlNcclxucGFzc3BvcnQudXNlKFxyXG5cdG5ldyBTdHJhdGVneShhc3luYyAodXNlcm5hbWUsIHBhc3N3b3JkLCBjYikgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IGV4aXN0aW5nVXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7XHJcblx0XHRcdFx0d2hlcmU6IHsgdXNlcm5hbWUgfVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChleGlzdGluZ1VzZXIpIHtcclxuXHRcdFx0XHRsZXQgdmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgZXhpc3RpbmdVc2VyLnBhc3N3b3JkKTtcclxuXHJcblx0XHRcdFx0aWYgKCF2YWxpZCB8fCBleGlzdGluZ1VzZXIuYmxvY2tlZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNiKG51bGwsIGZhbHNlKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0ZXhpc3RpbmdVc2VyLnJvbGUgIT09IFJvbGUuTUFTVEVSICYmXHJcblx0XHRcdFx0XHRleGlzdGluZ1VzZXIuY2xpZW50SWQgPT09IG51bGxcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcclxuXHRcdFx0XHRcdFx0XCJZb3VyIGFjY291bnQgZG9lcyBub3QgYmVsb25nIHRvIGEgY2xpZW50LiBQbGVhc2UgY29udGFjdCBjdXN0b21lciBzdXBwb3J0LlwiXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2IobnVsbCwgZXhpc3RpbmdVc2VyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGNiKG51bGwsIGZhbHNlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmV0dXJuIGNiKGUpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5wYXNzcG9ydC5zZXJpYWxpemVVc2VyKGZ1bmN0aW9uKHVzZXI6IHsgaWQ6IG51bWJlciB9LCBjYikge1xyXG5cdGNiKG51bGwsIHVzZXIuaWQpO1xyXG59KTtcclxuXHJcbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihhc3luYyAoaWQ6IG51bWJlciwgY2IpID0+IHtcclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5UGsoaWQsIHtcclxuXHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IENhdGVnb3J5IH1dLFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogW1wicGFzc3dvcmRcIl1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y2IobnVsbCwgdXNlcik7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0Y2IoZSk7XHJcblx0fVxyXG59KTtcclxuLy8gRVhQUkVTUyBDT05GSUdVUkFUSU9OU1xyXG5cclxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XHJcbmFwcC51c2UoXHJcblx0ZXhwcmVzc1Nlc3Npb24oe1xyXG5cdFx0c2VjcmV0OiBjb25maWcuc2VjcmV0S2V5LFxyXG5cdFx0cmVzYXZlOiBmYWxzZSxcclxuXHRcdHNhdmVVbmluaXRpYWxpemVkOiBmYWxzZVxyXG5cdH0pXHJcbik7XHJcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xyXG4vLyBUT0RPOiBVc2UgY29uZmlnLmpzIGZvciBjb3JzIG9wdGlvbnMuXHJcbmFwcC51c2UoY29ycyh7IG9yaWdpbjogcHJvY2Vzcy5lbnYuQ0xJRU5UX1VSTCwgY3JlZGVudGlhbHM6IHRydWUgfSkpO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSBQYXNzcG9ydCBhbmQgcmVzdG9yZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSwgaWYgYW55LCBmcm9tIHRoZVxyXG4vLyBzZXNzaW9uLlxyXG5hcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XHJcbmFwcC51c2UocGFzc3BvcnQuc2Vzc2lvbigpKTtcclxuXHJcbi8vIEV4cHJlc3Mgcm91dGVzXHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvYXV0aFwiLCBhdXRoUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy91c2Vyc1wiLCB1c2VyUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9pbnZpdGVzXCIsIGludml0ZVJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvdmVoaWNsZXNcIiwgdmVoaWNsZVJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvYm9va2luZ3NcIiwgYm9va2luZ1JvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvbG9jYXRpb25zXCIsIGxvY2F0aW9uUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9hY2NpZGVudHNcIiwgYWNjaWRlbnRSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2NhdGVnb3JpZXNcIiwgY2F0ZWdvcnlSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2NsaWVudHNcIiwgY2xpZW50Um91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9pc3N1ZXNcIiwgdmVoaWNlbElzc3VlUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy93aWFsb25cIiwgd2lhbG9uUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9yZXBvcnRzXCIsIHJlcG9ydFJvdXRlcyk7XHJcblxyXG5hcHAudXNlKFwiL3N0YXRpY1wiLCBleHByZXNzLnN0YXRpYyhnZXRTdGF0aWNGaWxlc1BhdGgoKSkpO1xyXG5hcHAudXNlKFwiL3N0YXRpY1wiLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcInB1YmxpY1wiKSkpO1xyXG5cclxuYXBwLmxpc3Rlbihjb25maWcuc2VydmVyUG9ydCwgKCkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKGBMaXN0ZW5pbmcgb24gcG9ydCAke2NvbmZpZy5zZXJ2ZXJQb3J0fWApO1xyXG59KTtcclxuIiwiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBkZWxldGVGaWxlRnJvbVVybCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxudHlwZSBmaWxlVVJJID0geyB1cmw6IHN0cmluZzsgcGF0aDogc3RyaW5nIH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoXHJcblx0eyBmaWxlLCBmaWxlcyB9OiB7IGZpbGU/OiBmaWxlVVJJOyBmaWxlcz86IHsgW2tleTogc3RyaW5nXTogZmlsZVVSSSB9IH0sXHJcblx0cmVzLFxyXG5cdG5leHRcclxuKSA9PiB7XHJcblx0aWYgKHJlcy5zdGF0dXNDb2RlID49IDQwMCkge1xyXG5cdFx0aWYgKGZpbGUpIHtcclxuXHRcdFx0aWYgKGZpbGUudXJsKSBkZWxldGVGaWxlRnJvbVVybChmaWxlLnVybCk7XHJcblx0XHRcdGVsc2UgaWYgKGZpbGUucGF0aCkgZnMucHJvbWlzZXMudW5saW5rKGZpbGUucGF0aCk7XHJcblx0XHR9XHJcblx0XHRpZiAoZmlsZXMpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gT2JqZWN0LmtleXMoZmlsZXMpKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlsZSA9IGZpbGVzW2tleV07XHJcblx0XHRcdFx0aWYgKGZpbGUudXJsKSBkZWxldGVGaWxlRnJvbVVybChmaWxlLnVybCk7XHJcblx0XHRcdFx0ZWxzZSBpZiAoZmlsZS5wYXRoKSBmcy5wcm9taXNlcy51bmxpbmsoZmlsZS5wYXRoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRuZXh0KCk7XHJcbn07XHJcbiIsImltcG9ydCB7IGRlbGV0ZUZpbGVGcm9tVXJsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuXHJcbnR5cGUgUmVwbGFjZUZpbGVVUkkgPSB7XHJcblx0dXJsOiBzdHJpbmc7XHJcblx0bW9kZWw6IE1vZGVsVHlwZTtcclxuXHRmaWVsZDogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFJlcGxhY2VkRmlsZXMgPSAoXHJcblx0cmVzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgbG9jYWxzOiBhbnkgfSxcclxuXHR7IHVybCwgbW9kZWwsIGZpZWxkIH06IFJlcGxhY2VGaWxlVVJJXHJcbikgPT4ge1xyXG5cdHJlcy5sb2NhbHMucmVwbGFjZWRGaWxlc1xyXG5cdFx0PyByZXMubG9jYWxzLnJlcGxhY2VkRmlsZXMucHVzaCh7IHVybCwgbW9kZWwsIGZpZWxkIH0pXHJcblx0XHQ6IChyZXMubG9jYWxzLnJlcGxhY2VkRmlsZXMgPSBbeyB1cmwsIG1vZGVsLCBmaWVsZCB9XSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVsZXRlUmVwbGFjZWRGaWxlcyA9IGFzeW5jIChcclxuXHRyZXEsXHJcblx0eyBsb2NhbHMgfTogeyBsb2NhbHM6IGFueTsgW2tleTogc3RyaW5nXTogYW55IH0sXHJcblx0bmV4dFxyXG4pID0+IHtcclxuXHRpZiAobG9jYWxzLnJlcGxhY2VkRmlsZXMpIHtcclxuXHRcdGZvciAobGV0IGZpbGUgb2YgbG9jYWxzLnJlcGxhY2VkRmlsZXMpIHtcclxuXHRcdFx0aWYgKGZpbGUudXJsICYmIGZpbGUubW9kZWwgJiYgZmlsZS5maWVsZCkge1xyXG5cdFx0XHRcdGZpbGUubW9kZWxcclxuXHRcdFx0XHRcdC5maW5kQWxsKHtcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRbZmlsZS5maWVsZF06IGZpbGUudXJsXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQudGhlbihmb3VuZCA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICghZm91bmQubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlRmlsZUZyb21VcmwoZmlsZS51cmwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmV4dCgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVsZXRlUmVwbGFjZWRGaWxlcztcclxuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi92YXJpYWJsZXMvZW51bXNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRpZiAocmVxLnVzZXIucm9sZSAhPT0gUm9sZS5HVUVTVCkge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCBhcyBhIGd1ZXN0LlwiKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9XHJcbn07XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3JlcXVpcmVSb2xlXCI7XHJcbiIsImltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBtdWx0ZXIgZnJvbSBcIm11bHRlclwiO1xyXG5pbXBvcnQgeyBnZXRTdGF0aWNGaWxlc1BhdGgsIG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0IH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5jb25zdCB1cGxvYWQgPSAodXBsb2FkUGF0aCwgb3B0aW9ucz8pID0+IHtcclxuXHRyZXR1cm4gbXVsdGVyKHtcclxuXHRcdHN0b3JhZ2U6IG11bHRlci5kaXNrU3RvcmFnZSh7XHJcblx0XHRcdGRlc3RpbmF0aW9uOiBmdW5jdGlvbihyZXEsIGZpbGUsIGNiKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oZ2V0U3RhdGljRmlsZXNQYXRoKCksIHVwbG9hZFBhdGgpO1xyXG5cdFx0XHRcdG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0KGZpbGVQYXRoKVxyXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4gY2IobnVsbCwgZmlsZVBhdGgpKVxyXG5cdFx0XHRcdFx0LmNhdGNoKGUgPT4gY2IoZSwgZmlsZVBhdGgpKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmlsZW5hbWU6IGZ1bmN0aW9uKHJlcSwgZmlsZSwgY2IpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhmaWxlKTtcclxuXHRcdFx0XHRjYihudWxsLCBgJHtEYXRlLm5vdygpfS0ke2ZpbGUub3JpZ2luYWxuYW1lfWApOyAvL3VzZSBEYXRlLm5vdygpIGZvciB1bmlxdWUgZmlsZSBrZXlzXHJcblx0XHRcdH1cclxuXHRcdH0pLFxyXG5cdFx0bGltaXRzOiB7XHJcblx0XHRcdGZpbGVTaXplOiAxMDAwMDAwMCxcclxuXHRcdFx0Li4uKG9wdGlvbnMgJiYgb3B0aW9ucy5saW1pdHMpXHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHVwbG9hZDtcclxuIiwiZXhwb3J0IGRlZmF1bHQgKHsgYm9keSB9LCByZXMsIG5leHQpID0+IHtcclxuXHRmb3IgKGxldCBrZXkgaW4gYm9keSkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ym9keVtrZXldID0gSlNPTi5wYXJzZShib2R5W2tleV0pO1xyXG5cdFx0fSBjYXRjaCAoZSkge31cclxuXHR9XHJcblx0bmV4dCgpO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0aWYgKCFyZXEudXNlcikge1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQuIFBsZWFzZSBsb2dpbi5cIik7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKGZhbHNlKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBIYW5kbGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IFJvbGVVdGlscyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlcXVpcmVSb2xlID0gKHJvbGU6IFJvbGUgfCBSb2xlW10pOiBIYW5kbGVyID0+IChcclxuXHRyZXEsXHJcblx0cmVzLFxyXG5cdG5leHRcclxuKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0aWYgKFxyXG5cdFx0cmVxLnVzZXIgJiZcclxuXHRcdCgocm9sZSBpbnN0YW5jZW9mIEFycmF5ICYmXHJcblx0XHRcdHJvbGUuZmluZEluZGV4KHJvbGUgPT4gcmVxLnVzZXIucm9sZSA9PT0gcm9sZSkgPj0gMCkgfHxcclxuXHRcdFx0cm9sZSA9PT0gcmVxLnVzZXIucm9sZSlcclxuXHQpIHtcclxuXHRcdG5leHQoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQgdG8gYWNjZXNzIHRoaXMgcmVzb3VyY2UuXCIpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDEpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0U3VjY2VzcyhmYWxzZSk7XHJcblx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlcXVpcmVIaWdoZXJPckVxdWFsUm9sZSA9IChyb2xlOiBSb2xlKTogSGFuZGxlciA9PiAoXHJcblx0cmVxLFxyXG5cdHJlcyxcclxuXHRuZXh0XHJcbikgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGlmIChyZXEudXNlciAmJiBSb2xlVXRpbHMuaXNSb2xlQmV0dGVyKHJvbGUsIHJlcS51c2VyLnJvbGUpKSB7XHJcblx0XHRuZXh0KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkIHRvIGFjY2VzcyB0aGlzIHJlc291cmNlLlwiKTtcclxuXHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3MoZmFsc2UpO1xyXG5cdFx0cmVzLnN0YXR1cyg0MDEpO1xyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdH1cclxufTtcclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0RGF0YVR5cGUsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEJlbG9uZ3NUb01hbnksXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBBY2NpZGVudEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgVXNlciwgVmVoaWNsZSwgQm9va2luZywgQWNjaWRlbnRVc2VyU3RhdHVzIH0gZnJvbSBcIi5cIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQWNjaWRlbnQgZXh0ZW5kcyBNb2RlbDxBY2NpZGVudD4gaW1wbGVtZW50cyBBY2NpZGVudEF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oe1xyXG5cdFx0dHlwZTogRGF0YVR5cGUuU1RSSU5HKDUwMCksXHJcblx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0dmFsaWRhdGU6IHtcclxuXHRcdFx0bm90TnVsbDogeyBtc2c6IFwiTWVzc2FnZSBpcyByZXF1aXJlZC5cIiB9XHJcblx0XHR9XHJcblx0fSlcclxuXHRwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGFjY2lkZW50SW1hZ2VTcmM6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBhY2NpZGVudFZpZGVvU3JjOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgbGF0OiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgbG5nOiBudW1iZXI7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFVzZXIpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdXNlcklkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVXNlcilcclxuXHR1c2VyOiBVc2VyO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBWZWhpY2xlKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHZlaGljbGVJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFZlaGljbGUpXHJcblx0dmVoaWNsZTogVmVoaWNsZTtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gQm9va2luZylcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBib29raW5nSWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBCb29raW5nKVxyXG5cdGJvb2tpbmc6IEJvb2tpbmc7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBVc2VyLFxyXG5cdFx0KCkgPT4gQWNjaWRlbnRVc2VyU3RhdHVzLFxyXG5cdFx0XCJhY2NpZGVudElkXCJcclxuXHQpXHJcblx0dXNlclN0YXR1c2VzOiBBcnJheTxBY2NpZGVudFVzZXJTdGF0dXM+O1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXRcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQWNjaWRlbnQsIFVzZXIgfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBY2NpZGVudFVzZXJTdGF0dXNBdHRyaWJ1dGVzIHtcclxuXHRyZWFkOiBib29sZWFuO1xyXG5cdGRlbGV0ZWQ6IGJvb2xlYW47XHJcblx0YWNjaWRlbnRJZDogbnVtYmVyO1xyXG5cdHVzZXJJZDogbnVtYmVyO1xyXG5cclxuXHRyZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblx0cmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEFjY2lkZW50VXNlclN0YXR1cyBleHRlbmRzIE1vZGVsPEFjY2lkZW50VXNlclN0YXR1cz5cclxuXHRpbXBsZW1lbnRzIEFjY2lkZW50VXNlclN0YXR1c0F0dHJpYnV0ZXMge1xyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHJlYWQ6IGJvb2xlYW47XHJcblxyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGRlbGV0ZWQ6IGJvb2xlYW47XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IEFjY2lkZW50KVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGFjY2lkZW50SWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBBY2NpZGVudClcclxuXHRwdWJsaWMgYWNjaWRlbnQ6IEFjY2lkZW50O1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHVzZXJJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFVzZXIpXHJcblx0cHVibGljIHVzZXI6IFVzZXI7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdERhdGFUeXBlLFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBVc2VyLCBWZWhpY2xlLCBSZXBsYWNlVmVoaWNsZSB9IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdUeXBlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb29raW5nQXR0cmlidXRlcyB7XHJcblx0aWQ6IG51bWJlcjtcclxuXHRwYWlkOiBib29sZWFuO1xyXG5cdGFtb3VudDogbnVtYmVyIHwgbnVsbDtcclxuXHRmcm9tOiBEYXRlO1xyXG5cdHRvOiBEYXRlO1xyXG5cdGFwcHJvdmVkOiBib29sZWFuIHwgbnVsbDtcclxuXHRmaW5pc2hlZDogYm9vbGVhbjtcclxuXHRzdGFydE1pbGVhZ2U6IG51bWJlciB8IG51bGw7XHJcblx0ZW5kTWlsZWFnZTogbnVtYmVyIHwgbnVsbDtcclxuXHRzdGFydEZ1ZWw6IG51bWJlciB8IG51bGw7XHJcblx0ZW5kRnVlbDogbnVtYmVyIHwgbnVsbDtcclxuXHR1c2VySWQ6IG51bWJlcjtcclxuXHR2ZWhpY2xlSWQ6IG51bWJlcjtcclxuXHRib29raW5nVHlwZTogQm9va2luZ1R5cGU7XHJcblx0cmVwbGFjZVZlaGljbGVJZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0cmVhZG9ubHkgY3JlYXRlZEF0OiBudW1iZXI7XHJcblx0cmVhZG9ubHkgdXBkYXRlZEF0OiBudW1iZXI7XHJcbn1cclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQm9va2luZyBleHRlbmRzIE1vZGVsPEJvb2tpbmc+IGltcGxlbWVudHMgQm9va2luZ0F0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHBhaWQ6IGJvb2xlYW47XHJcblxyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuXHRwdWJsaWMgYW1vdW50OiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgdHlwZTogRGF0YVR5cGUuREFURSB9KVxyXG5cdHB1YmxpYyBmcm9tOiBEYXRlO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgdHlwZTogRGF0YVR5cGUuREFURSB9KVxyXG5cdHB1YmxpYyB0bzogRGF0ZTtcclxuXHJcblx0QENvbHVtbih7IGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG5cdHB1YmxpYyBhcHByb3ZlZDogYm9vbGVhbiB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGZpbmlzaGVkOiBib29sZWFuO1xyXG5cclxuXHRAQ29sdW1uKERhdGFUeXBlLkZMT0FUKVxyXG5cdHB1YmxpYyBzdGFydE1pbGVhZ2U6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oRGF0YVR5cGUuRkxPQVQpXHJcblx0cHVibGljIGVuZE1pbGVhZ2U6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oRGF0YVR5cGUuRkxPQVQpXHJcblx0cHVibGljIHN0YXJ0RnVlbDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbihEYXRhVHlwZS5GTE9BVClcclxuXHRwdWJsaWMgZW5kRnVlbDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVXNlcilcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVmVoaWNsZSlcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB2ZWhpY2xlSWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIHR5cGU6IERhdGFUeXBlLlNUUklORyB9KVxyXG5cdHB1YmxpYyByZWFkb25seSBib29raW5nVHlwZTogQm9va2luZ1R5cGU7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFJlcGxhY2VWZWhpY2xlKVxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgcmVwbGFjZVZlaGljbGVJZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IG51bWJlcjtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBVc2VyKVxyXG5cdHB1YmxpYyByZWFkb25seSB1c2VyOiBVc2VyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFZlaGljbGUpXHJcblx0cHVibGljIHJlYWRvbmx5IHZlaGljbGU6IFZlaGljbGU7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gUmVwbGFjZVZlaGljbGUpXHJcblx0cHVibGljIHJlYWRvbmx5IHJlcGxhY2VWZWhpY2xlOiBSZXBsYWNlVmVoaWNsZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0QmVsb25nc1RvTWFueSxcclxuXHRDcmVhdGVkQXRcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQ2xpZW50LCBWZWhpY2xlLCBWZWhpY2xlQ2F0ZWdvcnkgfSBmcm9tIFwiLi9cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2F0ZWdvcnlBdHRyaWJ1dGVzIHtcclxuXHRpZDogbnVtYmVyO1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRjbGllbnRJZDogbnVtYmVyO1xyXG5cclxuXHRyZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblx0cmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgTW9kZWw8Q2F0ZWdvcnk+IGltcGxlbWVudHMgQ2F0ZWdvcnlBdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IENsaWVudClcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBjbGllbnRJZDogbnVtYmVyO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gQ2xpZW50KVxyXG5cdHB1YmxpYyByZWFkb25seSBjbGllbnQ6IENsaWVudDtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBWZWhpY2xlLFxyXG5cdFx0KCkgPT4gVmVoaWNsZUNhdGVnb3J5XHJcblx0KVxyXG5cdHB1YmxpYyByZWFkb25seSB2ZWhpY2xlczogVmVoaWNsZVtdO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXQsXHJcblx0SGFzTWFueVxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBVc2VyLCBWZWhpY2xlLCBDYXRlZ29yeSwgTG9jYXRpb24sIENsaWVudExvY2F0aW9uIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50QXR0cmlidXRlcyB7XHJcblx0aWQ6IG51bWJlcjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblxyXG5cdHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHRyZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcbn1cclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQ2xpZW50IGV4dGVuZHMgTW9kZWw8Q2xpZW50PiBpbXBsZW1lbnRzIENsaWVudEF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBVc2VyKVxyXG5cdHB1YmxpYyByZWFkb25seSB1c2VyczogVXNlcltdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBWZWhpY2xlKVxyXG5cdHB1YmxpYyByZWFkb25seSB2ZWhpY2xlczogVmVoaWNsZVtdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBDYXRlZ29yeSlcclxuXHRwdWJsaWMgcmVhZG9ubHkgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBMb2NhdGlvbixcclxuXHRcdCgpID0+IENsaWVudExvY2F0aW9uXHJcblx0KVxyXG5cdHB1YmxpYyByZWFkb25seSBsb2NhdGlvbnM6IExvY2F0aW9uW107XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBDbGllbnQsIExvY2F0aW9uIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50TG9jYXRpb25BdHRyaWJ1dGVzIHtcclxuXHRsb2NhdGlvbklkOiBudW1iZXI7XHJcblx0Y2xpZW50SWQ6IG51bWJlcjtcclxuXHJcblx0cmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cdHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRMb2NhdGlvbiBleHRlbmRzIE1vZGVsPENsaWVudExvY2F0aW9uPlxyXG5cdGltcGxlbWVudHMgQ2xpZW50TG9jYXRpb25BdHRyaWJ1dGVzIHtcclxuXHRARm9yZWlnbktleSgoKSA9PiBDbGllbnQpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgY2xpZW50SWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDbGllbnQpXHJcblx0cHVibGljIGNsaWVudDogQ2xpZW50O1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBMb2NhdGlvbilcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBsb2NhdGlvbklkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gTG9jYXRpb24pXHJcblx0cHVibGljIGxvY2F0aW9uOiBMb2NhdGlvbjtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXQsXHJcblx0SGFzTWFueVxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlLCBDbGllbnQsIENsaWVudExvY2F0aW9uIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9jYXRpb25BdHRyaWJ1dGVzIHtcclxuXHRpZDogbnVtYmVyO1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRsYXQ6IG51bWJlcjtcclxuXHRsbmc6IG51bWJlcjtcclxuXHRhZGRyZXNzOiBzdHJpbmc7XHJcblx0bG9jYXRpb25JbWFnZVNyYzogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0cmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cdHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBMb2NhdGlvbiBleHRlbmRzIE1vZGVsPExvY2F0aW9uPiBpbXBsZW1lbnRzIExvY2F0aW9uQXR0cmlidXRlcyB7XHJcblx0QFByaW1hcnlLZXlcclxuXHRAQXV0b0luY3JlbWVudFxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgaWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBsYXQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgbG5nOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGFkZHJlc3M6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBsb2NhdGlvbkltYWdlU3JjOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBCZWxvbmdzVG9NYW55KFxyXG5cdFx0KCkgPT4gQ2xpZW50LFxyXG5cdFx0KCkgPT4gQ2xpZW50TG9jYXRpb25cclxuXHQpXHJcblx0cHVibGljIHJlYWRvbmx5IGNsaWVudHM6IENsaWVudFtdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBWZWhpY2xlKVxyXG5cdHB1YmxpYyByZWFkb25seSB2ZWhpY2xlcz86IFZlaGljbGVbXTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdCxcclxuXHRIYXNPbmVcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQm9va2luZyB9IGZyb20gXCIuXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcGxhY2VWZWhpY2xlQXR0cmlidXRlcyB7XHJcblx0aWQ6IG51bWJlcjtcclxuXHRwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cdGJyYW5kOiBzdHJpbmc7XHJcblx0bW9kZWw6IHN0cmluZztcclxuXHR2aW46IHN0cmluZztcclxuXHJcblx0cmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cdHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBSZXBsYWNlVmVoaWNsZSBleHRlbmRzIE1vZGVsPFJlcGxhY2VWZWhpY2xlPlxyXG5cdGltcGxlbWVudHMgUmVwbGFjZVZlaGljbGVBdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIHBsYXRlTnVtYmVyOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgYnJhbmQ6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBtb2RlbDogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIHZpbjogc3RyaW5nO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBIYXNPbmUoKCkgPT4gQm9va2luZylcclxuXHRwdWJsaWMgcmVhZG9ubHkgYm9va2luZz86IEJvb2tpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHREYXRhVHlwZSxcclxuXHRVcGRhdGVkQXQsXHJcblx0QmVsb25nc1RvTWFueSxcclxuXHRIYXNNYW55XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7XHJcblx0Q2xpZW50LFxyXG5cdEFjY2lkZW50LFxyXG5cdEFjY2lkZW50VXNlclN0YXR1cyxcclxuXHRDYXRlZ29yeSxcclxuXHRVc2VyVmVoaWNsZUNhdGVnb3J5LFxyXG5cdEJvb2tpbmdcclxufSBmcm9tIFwiLi9cIjtcclxuaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi92YXJpYWJsZXMvZW51bXNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlckF0dHJpYnV0ZXMge1xyXG5cdGlkOiBudW1iZXI7XHJcblx0dXNlcm5hbWU6IHN0cmluZztcclxuXHRmaXJzdE5hbWU6IHN0cmluZztcclxuXHRsYXN0TmFtZTogc3RyaW5nO1xyXG5cdGVtYWlsOiBzdHJpbmc7XHJcblx0cGFzc3dvcmQ6IHN0cmluZztcclxuXHRtb2JpbGVOdW1iZXI6IHN0cmluZztcclxuXHRjb250cmFjdE5vOiBzdHJpbmcgfCBudWxsO1xyXG5cdG9iamVjdE5vOiBzdHJpbmcgfCBudWxsO1xyXG5cdGxhc3RMb2dpbjogc3RyaW5nIHwgbnVsbDtcclxuXHR1c2VySW1hZ2VTcmM6IHN0cmluZyB8IG51bGw7XHJcblx0bGljZW5zZUltYWdlU3JjOiBzdHJpbmcgfCBudWxsO1xyXG5cdGJsb2NrZWQ6IGJvb2xlYW47XHJcblx0ZW1haWxDb25maXJtZWQ6IGJvb2xlYW47XHJcblx0Y2xpZW50SWQ6IG51bWJlciB8IG51bGw7XHJcblx0cm9sZTogUm9sZTtcclxuXHR1c2VyQ3JlYXRvcklkOiBudW1iZXI7XHJcblx0dGltZVpvbmU6IHN0cmluZztcclxuXHJcblx0cmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cdHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBVc2VyIGV4dGVuZHMgTW9kZWw8VXNlcj4gaW1wbGVtZW50cyBVc2VyQXR0cmlidXRlcyB7XHJcblx0QFByaW1hcnlLZXlcclxuXHRAQXV0b0luY3JlbWVudFxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgaWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7XHJcblx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0dW5pcXVlOiB7IG5hbWU6IFwiZW1haWxcIiwgbXNnOiBcIkVtYWlsIGFkZHJlc3MgYWxyZWFkeSBpbiB1c2UuXCIgfVxyXG5cdH0pXHJcblx0cHVibGljIHVzZXJuYW1lOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHtcclxuXHRcdGFsbG93TnVsbDogZmFsc2UsXHJcblx0XHR1bmlxdWU6IHsgbmFtZTogXCJlbWFpbFwiLCBtc2c6IFwiRW1haWwgYWRkcmVzcyBhbHJlYWR5IGluIHVzZS5cIiB9XHJcblx0fSlcclxuXHRwdWJsaWMgZW1haWw6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7XHJcblx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0dW5pcXVlOiB7IG5hbWU6IFwiZW1haWxcIiwgbXNnOiBcIkVtYWlsIGFkZHJlc3MgYWxyZWFkeSBpbiB1c2UuXCIgfVxyXG5cdH0pXHJcblx0cHVibGljIG1vYmlsZU51bWJlcjogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGNvbnRyYWN0Tm86IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgb2JqZWN0Tm86IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgbGFzdExvZ2luOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIHVzZXJJbWFnZVNyYzogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBsaWNlbnNlSW1hZ2VTcmM6IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pXHJcblx0cHVibGljIGJsb2NrZWQ6IGJvb2xlYW47XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pXHJcblx0cHVibGljIGVtYWlsQ29uZmlybWVkOiBib29sZWFuO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBDbGllbnQpXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBjbGllbnRJZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbih7IHR5cGU6IERhdGFUeXBlLlNUUklORywgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyByb2xlOiBSb2xlO1xyXG5cclxuXHRAQ29sdW1uKHsgdHlwZTogRGF0YVR5cGUuU1RSSU5HLCBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHRpbWVab25lOiBzdHJpbmc7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFVzZXIpXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyB1c2VyQ3JlYXRvcklkOiBudW1iZXI7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDbGllbnQpXHJcblx0Y2xpZW50OiBDbGllbnQ7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVXNlciwgXCJ1c2VyQ3JlYXRvcklkXCIpXHJcblx0dXNlckNyZWF0b3I6IFVzZXI7XHJcblxyXG5cdEBCZWxvbmdzVG9NYW55KFxyXG5cdFx0KCkgPT4gQWNjaWRlbnQsXHJcblx0XHQoKSA9PiBBY2NpZGVudFVzZXJTdGF0dXNcclxuXHQpXHJcblx0YWNjaWRlbnRTdGF0dXNlczogQWNjaWRlbnRVc2VyU3RhdHVzW107XHJcblxyXG5cdEBCZWxvbmdzVG9NYW55KFxyXG5cdFx0KCkgPT4gQ2F0ZWdvcnksXHJcblx0XHQoKSA9PiBVc2VyVmVoaWNsZUNhdGVnb3J5XHJcblx0KVxyXG5cdGNhdGVnb3JpZXM6IENhdGVnb3J5W107XHJcblxyXG5cdEBIYXNNYW55KCgpID0+IEJvb2tpbmcpXHJcblx0Ym9va2luZ3M6IEJvb2tpbmdbXTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRDcmVhdGVkQXQsXHJcblx0VXBkYXRlZEF0XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IFVzZXIsIENhdGVnb3J5IH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclZlaGljbGVDYXRlZ29yeUF0dHJpYnV0ZXMge1xyXG5cdHVzZXJJZDogbnVtYmVyO1xyXG5cdGNhdGVnb3J5SWQ6IG51bWJlcjtcclxuXHJcblx0cmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cdHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBVc2VyVmVoaWNsZUNhdGVnb3J5IGV4dGVuZHMgTW9kZWw8VXNlclZlaGljbGVDYXRlZ29yeT5cclxuXHRpbXBsZW1lbnRzIFVzZXJWZWhpY2xlQ2F0ZWdvcnlBdHRyaWJ1dGVzIHtcclxuXHRARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHVzZXJJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFVzZXIpXHJcblx0cHVibGljIHVzZXI6IFVzZXI7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IENhdGVnb3J5KVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGNhdGVnb3J5SWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDYXRlZ29yeSlcclxuXHRwdWJsaWMgY2F0ZWdvcnk6IENhdGVnb3J5O1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXQsXHJcblx0SGFzTWFueSxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdERhdGFUeXBlXHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7XHJcblx0Q2xpZW50LFxyXG5cdExvY2F0aW9uLFxyXG5cdEJvb2tpbmcsXHJcblx0VmVoaWNsZUlzc3VlLFxyXG5cdENhdGVnb3J5LFxyXG5cdFZlaGljbGVDYXRlZ29yeSxcclxuXHRBY2NpZGVudFxyXG59IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdDaGFyZ2VVbml0IH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWZWhpY2xlQXR0cmlidXRlcyB7XHJcblx0aWQ6IG51bWJlcjtcclxuXHRicmFuZDogc3RyaW5nO1xyXG5cdG1vZGVsOiBzdHJpbmc7XHJcblx0cGxhdGVOdW1iZXI6IHN0cmluZztcclxuXHR2aW46IHN0cmluZztcclxuXHRkZWZsZWV0ZWQ6IGJvb2xlYW47XHJcblx0cGFya2luZ0xvY2F0aW9uOiBzdHJpbmcgfCBudWxsO1xyXG5cdHZlaGljbGVJbWFnZVNyYzogc3RyaW5nIHwgbnVsbDtcclxuXHRib29raW5nQ2hhcmdlQ291bnQ6IG51bWJlcjtcclxuXHRib29raW5nQ2hhcmdlOiBudW1iZXI7XHJcblx0d2lhbG9uVW5pdElkOiBudW1iZXIgfCBudWxsO1xyXG5cdGJvb2tpbmdDaGFyZ2VVbml0OiBCb29raW5nQ2hhcmdlVW5pdCB8IG51bGw7XHJcblx0Y2xpZW50SWQ6IG51bWJlciB8IG51bGw7XHJcblx0bG9jYXRpb25JZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0cmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cdHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBWZWhpY2xlIGV4dGVuZHMgTW9kZWw8VmVoaWNsZT4gaW1wbGVtZW50cyBWZWhpY2xlQXR0cmlidXRlcyB7XHJcblx0QFByaW1hcnlLZXlcclxuXHRAQXV0b0luY3JlbWVudFxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgaWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgYnJhbmQ6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgbW9kZWw6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgcGxhdGVOdW1iZXI6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdmluOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pXHJcblx0cHVibGljIGRlZmxlZXRlZDogYm9vbGVhbjtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBwYXJraW5nTG9jYXRpb246IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgdmVoaWNsZUltYWdlU3JjOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgZGVmYXVsdFZhbHVlOiAwIH0pXHJcblx0cHVibGljIGJvb2tpbmdDaGFyZ2VDb3VudDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgZGVmYXVsdFZhbHVlOiAwIH0pXHJcblx0cHVibGljIGJvb2tpbmdDaGFyZ2U6IG51bWJlcjtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyB3aWFsb25Vbml0SWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oeyB0eXBlOiBEYXRhVHlwZS5TVFJJTkcgfSlcclxuXHRwdWJsaWMgYm9va2luZ0NoYXJnZVVuaXQ6IEJvb2tpbmdDaGFyZ2VVbml0IHwgbnVsbDtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gQ2xpZW50KVxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgY2xpZW50SWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IExvY2F0aW9uKVxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgbG9jYXRpb25JZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBCb29raW5nKVxyXG5cdHB1YmxpYyByZWFkb25seSBib29raW5nczogQm9va2luZ1tdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBBY2NpZGVudClcclxuXHRwdWJsaWMgcmVhZG9ubHkgYWNjaWRlbnRzOiBBY2NpZGVudFtdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBWZWhpY2xlSXNzdWUpXHJcblx0cHVibGljIHJlYWRvbmx5IHZlaGljbGVJc3N1ZXM6IFZlaGljbGVJc3N1ZVtdO1xyXG5cclxuXHRAQmVsb25nc1RvTWFueShcclxuXHRcdCgpID0+IENhdGVnb3J5LFxyXG5cdFx0KCkgPT4gVmVoaWNsZUNhdGVnb3J5XHJcblx0KVxyXG5cdHB1YmxpYyByZWFkb25seSBjYXRlZ29yaWVzOiBDYXRlZ29yeVtdO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IENsaWVudClcclxuXHRwdWJsaWMgcmVhZG9ubHkgY2xpZW50OiBDbGllbnQ7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gTG9jYXRpb24pXHJcblx0cHVibGljIHJlYWRvbmx5IGxvY2F0aW9uOiBMb2NhdGlvbjtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRDcmVhdGVkQXQsXHJcblx0VXBkYXRlZEF0XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IENhdGVnb3J5LCBWZWhpY2xlIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmVoaWNsZUNhdGVnb3J5QXR0cmlidXRlcyB7XHJcblx0Y2F0ZWdvcnlJZDogbnVtYmVyO1xyXG5cdHZlaGljbGVJZDogbnVtYmVyO1xyXG5cclxuXHRyZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblx0cmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFZlaGljbGVDYXRlZ29yeSBleHRlbmRzIE1vZGVsPFZlaGljbGVDYXRlZ29yeT5cclxuXHRpbXBsZW1lbnRzIFZlaGljbGVDYXRlZ29yeUF0dHJpYnV0ZXMge1xyXG5cdEBGb3JlaWduS2V5KCgpID0+IENhdGVnb3J5KVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGNhdGVnb3J5SWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDYXRlZ29yeSlcclxuXHRwdWJsaWMgY2F0ZWdvcnk6IENhdGVnb3J5O1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBWZWhpY2xlKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHZlaGljbGVJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFZlaGljbGUpXHJcblx0cHVibGljIHZlaGljbGU6IFZlaGljbGU7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdCxcclxuXHRIYXNNYW55LFxyXG5cdEJlbG9uZ3NUb01hbnlcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgVmVoaWNsZSB9IGZyb20gXCIuXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZlaGljbGVJc3N1ZUF0dHJpYnV0ZXMge1xyXG5cdGlkOiBudW1iZXI7XHJcblx0bWVzc2FnZTogc3RyaW5nO1xyXG5cdHZlaGljbGVJZDogbnVtYmVyO1xyXG5cclxuXHRyZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblx0cmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFZlaGljbGVJc3N1ZSBleHRlbmRzIE1vZGVsPFZlaGljbGVJc3N1ZT5cclxuXHRpbXBsZW1lbnRzIFZlaGljbGVJc3N1ZUF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIG1lc3NhZ2U6IHN0cmluZztcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVmVoaWNsZSlcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB2ZWhpY2xlSWQ6IG51bWJlcjtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFZlaGljbGUpXHJcblx0cHVibGljIHJlYWRvbmx5IHZlaGljbGU6IFZlaGljbGU7XHJcbn1cclxuIiwiaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHtcclxuXHRSb2xlIGFzIFJvbGVFbnVtLFxyXG5cdEJvb2tpbmdUeXBlIGFzIEJvb2tpbmdUeXBlRW51bSxcclxuXHRCb29raW5nQ2hhcmdlVW5pdCBhcyBCb29raW5nQ2hhcmdlVW5pdEVudW1cclxufSBmcm9tIFwiLi4vdmFyaWFibGVzL2VudW1zXCI7XHJcbmltcG9ydCB7IGNvbnZlcnRTZXF1ZWxpemVEYXRlc1RvVW5peCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vQWNjaWRlbnRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQWNjaWRlbnRVc2VyU3RhdHVzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0Jvb2tpbmdcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQ2xpZW50XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0NsaWVudExvY2F0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0xvY2F0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1JlcGxhY2VWZWhpY2xlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1VzZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vVXNlclZlaGljbGVDYXRlZ29yeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1ZlaGljbGVDYXRlZ29yeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9WZWhpY2xlSXNzdWVcIjtcclxuXHJcbmltcG9ydCB7IEFjY2lkZW50IH0gZnJvbSBcIi4vQWNjaWRlbnRcIjtcclxuaW1wb3J0IHsgQWNjaWRlbnRVc2VyU3RhdHVzIH0gZnJvbSBcIi4vQWNjaWRlbnRVc2VyU3RhdHVzXCI7XHJcbmltcG9ydCB7IEJvb2tpbmcgfSBmcm9tIFwiLi9Cb29raW5nXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4vQ2xpZW50XCI7XHJcbmltcG9ydCB7IENsaWVudExvY2F0aW9uIH0gZnJvbSBcIi4vQ2xpZW50TG9jYXRpb25cIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiLi9Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBSZXBsYWNlVmVoaWNsZSB9IGZyb20gXCIuL1JlcGxhY2VWZWhpY2xlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9Vc2VyXCI7XHJcbmltcG9ydCB7IFVzZXJWZWhpY2xlQ2F0ZWdvcnkgfSBmcm9tIFwiLi9Vc2VyVmVoaWNsZUNhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFZlaGljbGUgfSBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcbmltcG9ydCB7IFZlaGljbGVDYXRlZ29yeSB9IGZyb20gXCIuL1ZlaGljbGVDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlSXNzdWUgfSBmcm9tIFwiLi9WZWhpY2xlSXNzdWVcIjtcclxuXHJcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoXHJcblx0Y29uZmlnLmRhdGFiYXNlLm5hbWUsXHJcblx0Y29uZmlnLmRhdGFiYXNlLnVzZXJuYW1lLFxyXG5cdGNvbmZpZy5kYXRhYmFzZS5wYXNzd29yZCxcclxuXHR7XHJcblx0XHRsb2dnaW5nOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiID8gY29uc29sZS5sb2cgOiBmYWxzZSxcclxuXHRcdGhvc3Q6IGNvbmZpZy5kYXRhYmFzZS5ob3N0LFxyXG5cdFx0cG9ydDogcGFyc2VJbnQoY29uZmlnLmRhdGFiYXNlLnBvcnQpLFxyXG5cdFx0bW9kZWxzOiBbXHJcblx0XHRcdEFjY2lkZW50LFxyXG5cdFx0XHRBY2NpZGVudFVzZXJTdGF0dXMsXHJcblx0XHRcdEJvb2tpbmcsXHJcblx0XHRcdENhdGVnb3J5LFxyXG5cdFx0XHRDbGllbnQsXHJcblx0XHRcdENsaWVudExvY2F0aW9uLFxyXG5cdFx0XHRMb2NhdGlvbixcclxuXHRcdFx0UmVwbGFjZVZlaGljbGUsXHJcblx0XHRcdFVzZXIsXHJcblx0XHRcdFVzZXJWZWhpY2xlQ2F0ZWdvcnksXHJcblx0XHRcdFZlaGljbGUsXHJcblx0XHRcdFZlaGljbGVDYXRlZ29yeSxcclxuXHRcdFx0VmVoaWNsZUlzc3VlXHJcblx0XHRdLFxyXG5cdFx0Li4uY29uZmlnLmRhdGFiYXNlLnNlcXVlbGl6ZVxyXG5cdH1cclxuKTtcclxuXHJcbnNlcXVlbGl6ZVxyXG5cdC5hdXRoZW50aWNhdGUoKVxyXG5cdC50aGVuKCgpID0+IGluaXQoc2VxdWVsaXplLCB7IHN5bmM6IHt9IH0pKVxyXG5cdC50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBoYXMgYmVlbiBlc3RhYmxpc2hlZCBzdWNjZXNzZnVsbHkuXCIpKVxyXG5cdC5jYXRjaChlcnIgPT4ge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZVxcblwiLCBlcnIpO1xyXG5cdH0pO1xyXG5cclxuY29uc3QgaW5pdCA9IGFzeW5jIChzZXF1ZWxpemU6IFNlcXVlbGl6ZSwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRpZiAocGFyYW1zLnN5bmMpIHtcclxuXHRcdGF3YWl0IHNlcXVlbGl6ZS5zeW5jKHBhcmFtcy5zeW5jLm9wdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0bGV0IHVzZXJzID0gYXdhaXQgVXNlci5maW5kQWxsKCk7XHJcblxyXG5cdGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcclxuXHRcdC8vIENyZWF0ZSByb290IHVzZXIuLi5cclxuXHRcdGxldCByb290UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChjb25maWcuZGF0YWJhc2UucGFzc3dvcmQsIDEwKTtcclxuXHRcdGF3YWl0IFVzZXIuY3JlYXRlKHtcclxuXHRcdFx0dXNlcm5hbWU6IFwicm9vdFwiLFxyXG5cdFx0XHRwYXNzd29yZDogcm9vdFBhc3N3b3JkLFxyXG5cdFx0XHRmaXJzdE5hbWU6IFwiUm9vdFwiLFxyXG5cdFx0XHRsYXN0TmFtZTogXCJBY2NvdW50XCIsXHJcblx0XHRcdGVtYWlsOiBcInN1cHBvcnRAYXRzdWFlLm5ldFwiLFxyXG5cdFx0XHRyb2xlOiBSb2xlRW51bS5NQVNURVIsXHJcblx0XHRcdG1vYmlsZU51bWJlcjogXCJcIixcclxuXHRcdFx0YXBwcm92ZWQ6IHRydWVcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRBY2NpZGVudCxcclxuXHRBY2NpZGVudFVzZXJTdGF0dXMsXHJcblx0Qm9va2luZyxcclxuXHRDYXRlZ29yeSxcclxuXHRDbGllbnQsXHJcblx0Q2xpZW50TG9jYXRpb24sXHJcblx0TG9jYXRpb24sXHJcblx0UmVwbGFjZVZlaGljbGUsXHJcblx0VXNlcixcclxuXHRVc2VyVmVoaWNsZUNhdGVnb3J5LFxyXG5cdFZlaGljbGUsXHJcblx0VmVoaWNsZUNhdGVnb3J5LFxyXG5cdFZlaGljbGVJc3N1ZVxyXG59O1xyXG4iLCJpbXBvcnQgeyBSb2xlIGFzIFJvbGVFbnVtIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtcy9cIjtcclxuaW1wb3J0IFJlc291cmNlVHlwZSBmcm9tIFwiLi4vdmFyaWFibGVzL2VudW1zL1Jlc291cmNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUkJBQyB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHJvbGVzOiBSb2xlW107XHJcblx0Y29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5yb2xlcyA9IFtdO1xyXG5cdH1cclxuXHRhZGRSb2xlKHJvbGU6IFJvbGUpOiB2b2lkIHtcclxuXHRcdGxldCBleGlzdGluZyA9IHRoaXMucm9sZXMuZmluZChcclxuXHRcdFx0KHJvbGVJdGVtOiBSb2xlKSA9PiByb2xlSXRlbS5uYW1lID09PSByb2xlLm5hbWVcclxuXHRcdCk7XHJcblx0XHRpZiAoZXhpc3RpbmcpIHRocm93IG5ldyBFcnJvcihcIlJvbGUgYWxyZWFkeSBleGlzdHNcIik7XHJcblx0XHR0aGlzLnJvbGVzLnB1c2gocm9sZSk7XHJcblx0fVxyXG5cclxuXHRjYW4oXHJcblx0XHRyb2xlOiBSb2xlIHwgUm9sZUVudW0sXHJcblx0XHRhY3Rpb246IHN0cmluZyxcclxuXHRcdHJlc291cmNlOiBSZXNvdXJjZSB8IFJlc291cmNlVHlwZSxcclxuXHRcdHBhcmFtczogYW55XHJcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcblx0XHRcdGxldCBleGlzdGluZ1JvbGU6IFJvbGUgfCB1bmRlZmluZWQgPSB0aGlzLnJvbGVzLmZpbmQoKHJvbGVJdGVtOiBSb2xlKSA9PiB7XHJcblx0XHRcdFx0aWYgKHJvbGUgaW5zdGFuY2VvZiBSb2xlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcm9sZS5uYW1lID09PSByb2xlSXRlbS5uYW1lO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gcm9sZSA9PT0gcm9sZUl0ZW0ubmFtZTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICghZXhpc3RpbmdSb2xlKSB0aHJvdyBuZXcgRXJyb3IoXCJSb2xlIGRvZXMgbm90IGV4aXN0LlwiKTtcclxuXHRcdFx0bGV0IHBlcm1pdHRlZCA9IGF3YWl0IGV4aXN0aW5nUm9sZS5jYW4oYWN0aW9uLCByZXNvdXJjZSwgcGFyYW1zKTtcclxuXHRcdFx0cmVzb2x2ZShwZXJtaXR0ZWQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRFeGNsdWRlZEZpZWxkcyhyb2xlOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nLCByZXNvdXJjZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0bGV0ICRyb2xlOiBSb2xlIHwgdW5kZWZpbmVkID0gdGhpcy5yb2xlcy5maW5kKFxyXG5cdFx0XHQoJHJvbGU6IFJvbGUpID0+ICRyb2xlLm5hbWUgPT09IHJvbGVcclxuXHRcdCk7XHJcblx0XHRpZiAoJHJvbGUpIHtcclxuXHRcdFx0bGV0IGV4Y2x1ZGVkRmllbGRzID0gW107XHJcblx0XHRcdGlmICgkcm9sZS5leHRlbmRzKSB7XHJcblx0XHRcdFx0Zm9yIChsZXQgcm9sZSBvZiAkcm9sZS5leHRlbmRzKSB7XHJcblx0XHRcdFx0XHRsZXQgJGFjdGlvbiA9IHJvbGUuYWN0aW9ucy5maW5kKFxyXG5cdFx0XHRcdFx0XHQkYWN0aW9uID0+XHJcblx0XHRcdFx0XHRcdFx0JGFjdGlvbi5uYW1lID09PSBhY3Rpb24gJiYgJGFjdGlvbi5yZXNvdXJjZS5uYW1lID09PSByZXNvdXJjZVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGlmICgkYWN0aW9uKSB7XHJcblx0XHRcdFx0XHRcdGV4Y2x1ZGVkRmllbGRzLnB1c2goLi4uJGFjdGlvbi5leGNsdWRlZEZpZWxkcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGxldCAkYWN0aW9uID0gJHJvbGUuYWN0aW9ucy5maW5kKFxyXG5cdFx0XHRcdCRhY3Rpb24gPT4gJGFjdGlvbi5uYW1lID09PSBhY3Rpb24gJiYgJGFjdGlvbi5yZXNvdXJjZS5uYW1lID09PSByZXNvdXJjZVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoJGFjdGlvbikge1xyXG5cdFx0XHRcdGV4Y2x1ZGVkRmllbGRzLnB1c2goLi4uJGFjdGlvbi5leGNsdWRlZEZpZWxkcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGV4Y2x1ZGVkRmllbGRzO1xyXG5cdFx0fSBlbHNlIHRocm93IG5ldyBFcnJvcihcIlJvbGUgZG9lcyBub3QgZXhpc3QuXCIpO1xyXG5cdH1cclxuXHR0b09iamVjdCgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcclxuXHRcdFx0cm9sZXM6IHRoaXMucm9sZXMubWFwKHJvbGUgPT4gKHtcclxuXHRcdFx0XHRuYW1lOiByb2xlLm5hbWUsXHJcblx0XHRcdFx0YWNjZXNzOiByb2xlLmFjdGlvbnMucmVkdWNlKFxyXG5cdFx0XHRcdFx0KGFjYzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgYWN0aW9uKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICghYWNjLnJlc291cmNlc1thY3Rpb24ucmVzb3VyY2UubmFtZV0pIHtcclxuXHRcdFx0XHRcdFx0XHRhY2MucmVzb3VyY2VzW2FjdGlvbi5yZXNvdXJjZS5uYW1lXSA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdHBlcm1pc3Npb25zOiB7fVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0YWNjLnJlc291cmNlc1thY3Rpb24ucmVzb3VyY2UubmFtZV0ucGVybWlzc2lvbnNbYWN0aW9uLm5hbWVdID0ge1xyXG5cdFx0XHRcdFx0XHRcdGNvbmRpdGlvbmFsOiBhY3Rpb24uY29uZGl0aW9uID8gdHJ1ZSA6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdGV4Y2x1ZGVkRmllbGRzOiBhY3Rpb24uZXhjbHVkZWRGaWVsZHNcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHJlc291cmNlczoge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdGV4dGVuZHM6IHJvbGUuZXh0ZW5kcy5tYXAocm9sZSA9PiByb2xlLm5hbWUpXHJcblx0XHRcdH0pKVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2xlIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0YWN0aW9uczogQWN0aW9uW107XHJcblx0ZXh0ZW5kczogUm9sZVtdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmFjdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMuZXh0ZW5kcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0YWRkUGVybWlzc2lvbihhY3Rpb246IEFjdGlvbikge1xyXG5cdFx0bGV0IGV4aXN0aW5nQWN0aW9uID0gdGhpcy5hY3Rpb25zLmZpbmQoXHJcblx0XHRcdGN1cnJlbnRBY3Rpb24gPT5cclxuXHRcdFx0XHRjdXJyZW50QWN0aW9uLm5hbWUgPT09IGFjdGlvbi5uYW1lICYmXHJcblx0XHRcdFx0Y3VycmVudEFjdGlvbi5yZXNvdXJjZS5uYW1lID09PSBhY3Rpb24ucmVzb3VyY2UubmFtZVxyXG5cdFx0KTtcclxuXHRcdGlmIChleGlzdGluZ0FjdGlvbikgdGhyb3cgbmV3IEVycm9yKFwiQWN0aW9uIGFscmVhZHkgZXhpc3RzLlwiKTtcclxuXHRcdHRoaXMuYWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcblx0fVxyXG5cclxuXHRleHRlbmQocm9sZTogUm9sZSkge1xyXG5cdFx0dGhpcy5leHRlbmRzLnB1c2gocm9sZSk7XHJcblx0fVxyXG5cdGNhbihcclxuXHRcdGFjdGlvbjogc3RyaW5nLFxyXG5cdFx0cmVzb3VyY2U6IFJlc291cmNlIHwgUmVzb3VyY2VUeXBlLFxyXG5cdFx0cGFyYW1zOiBhbnlcclxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcclxuXHRcdFx0bGV0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XHJcblx0XHRcdGxldCByZXNvdXJjZU5hbWUgPVxyXG5cdFx0XHRcdHJlc291cmNlIGluc3RhbmNlb2YgUmVzb3VyY2UgPyByZXNvdXJjZS5uYW1lIDogcmVzb3VyY2U7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBjdXJyZW50QWN0aW9uOiBBY3Rpb24gPSBhY3Rpb25zW2ldO1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdGFjdGlvbiA9PT0gY3VycmVudEFjdGlvbi5uYW1lICYmXHJcblx0XHRcdFx0XHRjdXJyZW50QWN0aW9uLnJlc291cmNlLm5hbWUgPT09IHJlc291cmNlTmFtZVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0bGV0IHBlcm1pdHRlZDtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHBlcm1pdHRlZCA9IGF3YWl0IGN1cnJlbnRBY3Rpb24ucGVyZm9ybShwYXJhbXMpO1xyXG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRwZXJtaXR0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChwZXJtaXR0ZWQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUocGVybWl0dGVkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ29udGluZSBsb29raW5nIGZvciBtYXRjaGluZyBhY3Rpb25zLCBpbmNhc2Ugcm9sZSBpcyBleHRlbmRlZC5cclxuXHRcdFx0aWYgKHRoaXMuZXh0ZW5kcykge1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5leHRlbmRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsZXQgZXh0ZW5kZWRSb2xlID0gdGhpcy5leHRlbmRzW2ldO1xyXG5cdFx0XHRcdFx0bGV0IHBlcm1pdHRlZDogYm9vbGVhbiA9IGF3YWl0IGV4dGVuZGVkUm9sZS5jYW4oXHJcblx0XHRcdFx0XHRcdGFjdGlvbixcclxuXHRcdFx0XHRcdFx0cmVzb3VyY2UsXHJcblx0XHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGlmIChwZXJtaXR0ZWQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUocGVybWl0dGVkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0cmVzb3VyY2U6IFJlc291cmNlO1xyXG5cdGNvbmRpdGlvbj86ICgocGFyYW1zPzogYW55KSA9PiBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbikgfCBudWxsO1xyXG5cdGV4Y2x1ZGVkRmllbGRzOiBzdHJpbmdbXTtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdG5hbWU6IHN0cmluZyxcclxuXHRcdHJlc291cmNlOiBSZXNvdXJjZSxcclxuXHRcdGNvbmRpdGlvbj86ICgocGFyYW1zPzogYW55KSA9PiBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbikgfCBudWxsLFxyXG5cdFx0ZXhjbHVkZWRGaWVsZHM6IHN0cmluZ1tdID0gW11cclxuXHQpIHtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLnJlc291cmNlID0gcmVzb3VyY2U7XHJcblx0XHR0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuXHRcdHRoaXMuZXhjbHVkZWRGaWVsZHMgPSBleGNsdWRlZEZpZWxkcztcclxuXHR9XHJcblx0cGVyZm9ybShwYXJhbXM/OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmNvbmRpdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb25kaXRpb24ocGFyYW1zKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJCQUM7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcblxyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IHtcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzLFxyXG5cdGFkZFJlcGxhY2VkRmlsZXNcclxufSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlUmVwbGFjZWRGaWxlc1wiO1xyXG5pbXBvcnQgcGFyc2VCb2R5IGZyb20gXCIuLi9taWRkbGV3YXJlcy9wYXJzZUJvZHlcIjtcclxuaW1wb3J0IHVwbG9hZCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkXCI7XHJcbmltcG9ydCBkZWxldGVGaWxlT25FcnJvciBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlRmlsZU9uRXJyb3JcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyLCBnZXRGaWxlVVJMIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IEFjY2lkZW50IH0gZnJvbSBcIi4uL2RhdGFzb3VyY2VcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIGFzeW5jICh7IHVzZXIgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBBY2NpZGVudERhdGFTb3VyY2UgPSBuZXcgQWNjaWRlbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgYWNjaWRlbnRzID0gYXdhaXQgQWNjaWRlbnREYXRhU291cmNlLmdldEFsbCgpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShhY2NpZGVudHMpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHthY2NpZGVudHMubGVuZ3RofSBhY2NpZGVudHMuYCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFxyXG5cdFwiL1wiLFxyXG5cdHVwbG9hZChcImNhcmJvb2tpbmcvbWVkaWEvYWNjaWRlbnRzXCIpLmZpZWxkcyhbXHJcblx0XHR7IG5hbWU6IFwiYWNjaWRlbnRJbWFnZVNyY1wiIH0sXHJcblx0XHR7IG5hbWU6IFwiYWNjaWRlbnRWaWRlb1NyY1wiIH1cclxuXHRdKSxcclxuXHRwYXJzZUJvZHksXHJcblx0YXN5bmMgKHsgdXNlciwgYm9keSwgZmlsZXMgfSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IEFjY2lkZW50RGF0YVNvdXJjZSA9IG5ldyBBY2NpZGVudChkYiwgdXNlcik7XHJcblx0XHRjb25zdCBhY2NpZGVudEltYWdlU3JjID1cclxuXHRcdFx0ZmlsZXMgJiZcclxuXHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyYyAmJlxyXG5cdFx0XHRmaWxlcy5hY2NpZGVudEltYWdlU3JjWzBdICYmXHJcblx0XHRcdGZpbGVzLmFjY2lkZW50SW1hZ2VTcmNbMF0uZmlsZW5hbWUgJiZcclxuXHRcdFx0Z2V0RmlsZVVSTChcclxuXHRcdFx0XHRcImNhcmJvb2tpbmcvbWVkaWEvYWNjaWRlbnRzXCIsXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyY1swXS5maWxlbmFtZVxyXG5cdFx0XHQpO1xyXG5cdFx0Y29uc3QgYWNjaWRlbnRWaWRlb1NyYyA9XHJcblx0XHRcdGZpbGVzICYmXHJcblx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmMgJiZcclxuXHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyY1swXSAmJlxyXG5cdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjWzBdLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXHJcblx0XHRcdFx0XCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiLFxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0uZmlsZW5hbWVcclxuXHRcdFx0KTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBjcmVhdGVkQWNjaWRlbnQgPSBhd2FpdCBBY2NpZGVudERhdGFTb3VyY2UuY3JlYXRlKHtcclxuXHRcdFx0XHQuLi5ib2R5LFxyXG5cdFx0XHRcdGFjY2lkZW50SW1hZ2VTcmMsXHJcblx0XHRcdFx0YWNjaWRlbnRWaWRlb1NyY1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoY3JlYXRlZEFjY2lkZW50KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkFjY2lkZW50IGhhcyBiZWVuIGNyZWF0ZWQuXCIsIHJlcyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3JcclxuKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IEFjY2lkZW50RGF0YVNvdXJjZSA9IG5ldyBBY2NpZGVudChkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZEFjY2lkZW50ID0gYXdhaXQgQWNjaWRlbnREYXRhU291cmNlLmdldChwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZEFjY2lkZW50LmdldCh7IHBsYWluOiB0cnVlIH0pKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kIGFjY2lkZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9YCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcclxuXHRcIi86aWRcIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiKS5maWVsZHMoW1xyXG5cdFx0eyBuYW1lOiBcImFjY2lkZW50SW1hZ2VTcmNcIiB9LFxyXG5cdFx0eyBuYW1lOiBcImFjY2lkZW50VmlkZW9TcmNcIiB9XHJcblx0XSksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGFzeW5jICh7IHVzZXIsIHBhcmFtcywgYm9keSwgZmlsZXMgfSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IEFjY2lkZW50RGF0YVNvdXJjZSA9IG5ldyBBY2NpZGVudChkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgYWNjaWRlbnRJbWFnZVNyYyA9XHJcblx0XHRcdFx0ZmlsZXMgJiZcclxuXHRcdFx0XHRmaWxlcy5hY2NpZGVudEltYWdlU3JjICYmXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyY1swXSAmJlxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50SW1hZ2VTcmNbMF0uZmlsZW5hbWUgJiZcclxuXHRcdFx0XHRnZXRGaWxlVVJMKFxyXG5cdFx0XHRcdFx0XCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiLFxyXG5cdFx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyY1swXS5maWxlbmFtZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdGNvbnN0IGFjY2lkZW50VmlkZW9TcmMgPVxyXG5cdFx0XHRcdGZpbGVzICYmXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyYyAmJlxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0gJiZcclxuXHRcdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjWzBdLmZpbGVuYW1lICYmXHJcblx0XHRcdFx0Z2V0RmlsZVVSTChcclxuXHRcdFx0XHRcdFwiY2FyYm9va2luZy9tZWRpYS9hY2NpZGVudHNcIixcclxuXHRcdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0uZmlsZW5hbWVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRjb25zdCBbcHJldmlvdXNWYWx1ZSwgdXBkYXRlZEFjY2lkZW50XSA9IGF3YWl0IEFjY2lkZW50RGF0YVNvdXJjZS51cGRhdGUoXHJcblx0XHRcdFx0cGFyYW1zLmlkLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC4uLmJvZHksXHJcblx0XHRcdFx0XHRhY2NpZGVudEltYWdlU3JjLFxyXG5cdFx0XHRcdFx0YWNjaWRlbnRWaWRlb1NyY1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdFx0YWNjaWRlbnRJbWFnZVNyYyAmJlxyXG5cdFx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0XHR1cmw6IHByZXZpb3VzVmFsdWUuYWNjaWRlbnRJbWFnZVNyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5BY2NpZGVudCxcclxuXHRcdFx0XHRcdGZpZWxkOiBcImFjY2lkZW50SW1hZ2VTcmNcIlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRhY2NpZGVudFZpZGVvU3JjICYmXHJcblx0XHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHRcdHVybDogcHJldmlvdXNWYWx1ZS5hY2NpZGVudFZpZGVvU3JjLFxyXG5cdFx0XHRcdFx0bW9kZWw6IGRiLkFjY2lkZW50LFxyXG5cdFx0XHRcdFx0ZmllbGQ6IFwiYWNjaWRlbnRWaWRlb1NyY1wiXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZEFjY2lkZW50KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0XHRgQWNjaWRlbnQgd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gdXBkYXRlZC5gLFxyXG5cdFx0XHRcdHJlc1xyXG5cdFx0XHQpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3IsXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQWNjaWRlbnREYXRhU291cmNlID0gbmV3IEFjY2lkZW50KGRiLCB1c2VyKTtcclxuXHR0cnkge1xyXG5cdFx0YXdhaXQgQWNjaWRlbnREYXRhU291cmNlLmRlbGV0ZShwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0YEFjY2lkZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIGRlbGV0ZWQuYCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRuZXh0KCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQgcGFzc3BvcnQgZnJvbSBcInBhc3Nwb3J0XCI7XHJcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IHsgY2hlY2ssIG9uZU9mLCB2YWxpZGF0aW9uUmVzdWx0IH0gZnJvbSBcImV4cHJlc3MtdmFsaWRhdG9yXCI7XHJcblxyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgc2VuZFBhc3N3b3JkUmVzZXRUb2tlbiB9IGZyb20gXCIuLi91dGlscy9tYWlsXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHsgUGFzc3dvcmRSZXNldFRva2VuIH0gZnJvbSBcIi4uL3R5cGluZ3NcIjtcclxuXHJcbmNvbnN0IHsgc2VjcmV0S2V5IH0gPSBjb25maWc7XHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL21lXCIsIHJlcXVpcmVMb2dpbiwgZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShyZXEudXNlcik7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIllvdSBhcmUgbG9nZ2VkIGluLlwiKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5yb3V0ZXIucGF0Y2goXCIvbWVcIiwgcmVxdWlyZUxvZ2luLCBhc3luYyBmdW5jdGlvbih7IHVzZXIsIGJvZHkgfSwgcmVzKSB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGxldCBtZSA9IHVzZXIgJiYgKGF3YWl0IGRiLlVzZXIuZmluZEJ5UGsodXNlci5pZCkpO1xyXG5cdGlmIChtZSkge1xyXG5cdFx0aWYgKGJvZHkucGFzc3dvcmQgJiYgYm9keS5wYXNzd29yZE9sZCkge1xyXG5cdFx0XHRsZXQgc2FtZVBhc3N3b3JkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoYm9keS5wYXNzd29yZCwgbWUucGFzc3dvcmQpO1xyXG5cdFx0XHRpZiAoIXNhbWVQYXNzd29yZCkge1xyXG5cdFx0XHRcdGxldCB2YWxpZE9sZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXHJcblx0XHRcdFx0XHRib2R5LnBhc3N3b3JkT2xkLFxyXG5cdFx0XHRcdFx0bWUucGFzc3dvcmRcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdGxldCBuZXdQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKGJvZHkucGFzc3dvcmQsIDEwKTtcclxuXHRcdFx0XHRpZiAodmFsaWRPbGRQYXNzd29yZCkge1xyXG5cdFx0XHRcdFx0YXdhaXQgbWUudXBkYXRlKHsgcGFzc3dvcmQ6IG5ld1Bhc3N3b3JkIH0pO1xyXG5cdFx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdFx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlN1Y2Nlc3NmdWxseSB1cGRhdGVkLlwiKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAwKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJJbnZhbGlkIG9sZCBwYXNzd29yZC5cIik7XHJcblx0XHRcdFx0XHRyZXMuc3RhdHVzKDQwMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAwKTtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiT2xkIHBhc3N3b3JkIGlzIHNhbWUgYXMgdGhlIG5ldyBvbmUuXCIpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiVW5hdXRob3JpemVkLiBBcmUgeW91IGxvZ2dlZCBpbj9cIik7XHJcblx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcclxuXHRcIi9sb2dpblwiLFxyXG5cdGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0XHRwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJsb2NhbFwiLCBmdW5jdGlvbihlcnIsIHVzZXIsIGluZm8pIHtcclxuXHRcdFx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShlcnIubWVzc2FnZSk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDEpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdFx0XHRyZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghdXNlcikge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJJbnZhbGlkIGxvZ2luIGRldGFpbHNcIik7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDEpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdFx0XHRyZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJlcS5sb2dJbih1c2VyLCBmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0XHQvLyBUT0RPOiBVcGRhdGVkIGxhc3QgbG9naW4gaW4gdXNlci5cclxuXHRcdFx0XHRkYi5Vc2VyLmZpbmRCeVBrKHVzZXIuaWQpLnRoZW4odXNlciA9PiB7XHJcblx0XHRcdFx0XHR1c2VyICYmXHJcblx0XHRcdFx0XHRcdHVzZXIudXBkYXRlKHsgbGFzdExvZ2luOiBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpIH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRcdHJldHVybiBuZXh0KGVycik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXCJMb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5XCIsIHJlcyk7XHJcblxyXG5cdFx0XHRcdHJldHVybiByZXMuanNvbihyZXNwb25zZS50b09iamVjdCgpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KShyZXEsIHJlcywgbmV4dCk7XHJcblx0fSxcclxuXHRmdW5jdGlvbihyZXEsIHJlcykge1xyXG5cdFx0cmVzLmpzb24ocmVxLnVzZXIpO1xyXG5cdH1cclxuKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvbG9nb3V0XCIsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiU3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQuXCIpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVxLmxvZ291dCgpO1xyXG5cdHJlcy5zdGF0dXMoMjAwKTtcclxuXHRyZXMuc2VuZChyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXHJcblx0XCIvZm9yZ290XCIsXHJcblx0b25lT2YoW1xyXG5cdFx0Y2hlY2soXCJlbWFpbFwiKVxyXG5cdFx0XHQuZXhpc3RzKHsgY2hlY2tOdWxsOiB0cnVlIH0pXHJcblx0XHRcdC53aXRoTWVzc2FnZShcIkVtYWlsIGNhbm5vdCBiZSBlbXB0eVwiKVxyXG5cdFx0XHQuaXNFbWFpbCgpXHJcblx0XHRcdC53aXRoTWVzc2FnZShcIkludmFsaWQgZW1haWxcIiksXHJcblx0XHRbXHJcblx0XHRcdGNoZWNrKFwidG9rZW5cIilcclxuXHRcdFx0XHQuZXhpc3RzKHsgY2hlY2tOdWxsOiB0cnVlIH0pXHJcblx0XHRcdFx0LndpdGhNZXNzYWdlKFwiWW91IGRvIG5vdCBoYXZlIGEgcmVzZXQgdG9rZW4uXCIpLFxyXG5cdFx0XHRjaGVjayhcInBhc3N3b3JkXCIpXHJcblx0XHRcdFx0LmV4aXN0cyh7IGNoZWNrTnVsbDogdHJ1ZSB9KVxyXG5cdFx0XHRcdC5pc0xlbmd0aCh7IG1pbjogOCwgbWF4OiAzMiB9KVxyXG5cdFx0XHRcdC53aXRoTWVzc2FnZShcIkEgbmV3IHBhc3N3b3JkIHNob3VsZCBiZSBwcm92aWRlZFwiKVxyXG5cdFx0XVxyXG5cdF0pLFxyXG5cdGFzeW5jIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0XHRjb25zdCBlcnJvcnMgPSB2YWxpZGF0aW9uUmVzdWx0KHJlcSk7XHJcblx0XHRpZiAoIWVycm9ycy5pc0VtcHR5KCkpIHtcclxuXHRcdFx0Zm9yIChsZXQgZXJyb3Igb2YgZXJyb3JzLmFycmF5KCkpIHJlc3BvbnNlLmFwcGVuZEVycm9yKGVycm9yLm1zZyk7XHJcblx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJJbnZhbGlkIGZpZWxkc1wiKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MjIpO1xyXG5cdFx0XHRyZXR1cm4gcmVzLnN0YXR1cyg0MjIpLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgeyBlbWFpbCwgdG9rZW4sIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcclxuXHJcblx0XHRpZiAodG9rZW4pIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCB2YWxpZFRva2VuID0gand0LnZlcmlmeSh0b2tlbiwgc2VjcmV0S2V5KSBhcyBQYXNzd29yZFJlc2V0VG9rZW47XHJcblx0XHRcdFx0aWYgKHZhbGlkVG9rZW4gJiYgdmFsaWRUb2tlbi5wYXNzd29yZFJlc2V0KSB7XHJcblx0XHRcdFx0XHRjb25zdCB1c2VyID0gYXdhaXQgZGIuVXNlci5maW5kT25lKHtcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHsgZW1haWw6IHZhbGlkVG9rZW4uZW1haWwgfVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRjb25zdCBuZXdQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMCk7XHJcblx0XHRcdFx0XHR1c2VyICYmIChhd2FpdCB1c2VyLnVwZGF0ZSh7IHBhc3N3b3JkOiBuZXdQYXNzd29yZCB9KSk7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdFx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlBhc3N3b3JkIGhhcyBiZWVuIHJlc2V0LlwiKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdFx0XHRcdHJldHVybiByZXMuanNvbihyZXNwb25zZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiSW52YWxpZCB0b2tlblwiKTtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQyMik7XHJcblx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChlbWFpbCkge1xyXG5cdFx0XHRjb25zdCBmb3VuZEVtYWlsID0gYXdhaXQgZGIuVXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWwgfSB9KTtcclxuXHRcdFx0aWYgKGZvdW5kRW1haWwpIHtcclxuXHRcdFx0XHRzZW5kUGFzc3dvcmRSZXNldFRva2VuKHtcclxuXHRcdFx0XHRcdGVtYWlsLFxyXG5cdFx0XHRcdFx0dXJsOiBgJHtwcm9jZXNzLmVudi5DTElFTlRfVVJMfS9sb2dpbi9mb3Jnb3RgXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIkEgcmVzZXQgY29kZSBoYXMgYmVlbiBzZW50LlwiKTtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC5jYXRjaChlID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJVbmtub3duIGVycm9yLlwiKTtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg1MDApO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIkVtYWlsIGlzIG5vdCByZWdpc3RlcmVkLlwiKTtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwNCk7XHJcblx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHJlcXVpcmVMb2dpbiBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luXCI7XHJcbmltcG9ydCB7IEJvb2tpbmcsIEJvb2tpbmdDcmVhdGVPcHRpb25zLCBCb29raW5nVXBkYXRlT3B0aW9ucyB9IGZyb20gXCIuLi9hcGlcIjtcclxuaW1wb3J0IHsgQm9va2luZ0F0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxuXHJcbnJvdXRlci5nZXQ8dW5kZWZpbmVkLCBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz5bXT4sIHVuZGVmaW5lZD4oXHJcblx0XCIvXCIsXHJcblx0YXN5bmMgKHsgdXNlciB9LCByZXMpID0+IHtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPltdPigpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgZm91bmRCb29raW5ncyA9IGF3YWl0IEJvb2tpbmcuZ2V0QWxsKHVzZXIpO1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRcdGBGb3VuZCAke2ZvdW5kQm9va2luZ3MuZGF0YS5sZW5ndGh9IGJvb2tpbmdzLmAsXHJcblx0XHRcdFx0cmVzXHJcblx0XHRcdCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoZm91bmRCb29raW5ncy5jYXN0KHVzZXIpKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0fVxyXG4pO1xyXG5cclxucm91dGVyLnBvc3Q8XHJcblx0dW5kZWZpbmVkLFxyXG5cdFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPj4sXHJcblx0Qm9va2luZ0NyZWF0ZU9wdGlvbnNcclxuPihcIi9cIiwgYXN5bmMgKHsgdXNlciwgYm9keSB9LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+KCk7XHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGNyZWF0ZWRCb29raW5nID0gYXdhaXQgQm9va2luZy5jcmVhdGUodXNlciwgYm9keSk7XHJcblxyXG5cdFx0Y3JlYXRlZEJvb2tpbmcuc2V0RW1haWxOb3RpZmljYXRpb25zVG9Cb29raW5nTWFuYWdlcnMoKTtcclxuXHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGNyZWF0ZWRCb29raW5nLmNhc3QodXNlcikpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkJvb2tpbmcgaGFzIGJlZW4gY3JlYXRlZC5cIiwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmdldDxcclxuXHR7IGlkOiBzdHJpbmcgfSxcclxuXHRSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+LFxyXG5cdHVuZGVmaW5lZFxyXG4+KFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+KCk7XHJcblx0dHJ5IHtcclxuXHRcdGxldCBmb3VuZEJvb2tpbmcgPSBhd2FpdCBCb29raW5nLmdldCh1c2VyLCBwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZEJvb2tpbmcuY2FzdCh1c2VyKSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBCb29raW5nIHdpdGggSUQgb2YgJHtwYXJhbXMuaWR9IGZvdW5kLmAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaDxcclxuXHR7IGlkOiBzdHJpbmcgfSxcclxuXHRSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+LFxyXG5cdEJvb2tpbmdVcGRhdGVPcHRpb25zXHJcbj4oXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcywgYm9keSB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPj4oKTtcclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgYm9va2luZ1ByZXZpb3VzVmFsdWUgPSBhd2FpdCBCb29raW5nLmdldCh1c2VyLCBwYXJhbXMuaWQpO1xyXG5cdFx0Y29uc3QgdXBkYXRlZEJvb2tpbmcgPSBhd2FpdCBib29raW5nUHJldmlvdXNWYWx1ZS51cGRhdGUodXNlciwgYm9keSk7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHRib2R5LmFtb3VudCAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdGJvZHkuYW1vdW50ICE9PSBudWxsICYmXHJcblx0XHRcdGJvb2tpbmdQcmV2aW91c1ZhbHVlLmRhdGEuYW1vdW50ID09PSBudWxsXHJcblx0XHQpIHtcclxuXHRcdFx0dXBkYXRlZEJvb2tpbmcuc2VuZEludm9pY2UoYm9keS5hbW91bnQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGJvZHkuYXBwcm92ZWQgPT09IHRydWUgJiYgYm9va2luZ1ByZXZpb3VzVmFsdWUuZGF0YS5hcHByb3ZlZCA9PT0gbnVsbCkge1xyXG5cdFx0XHR1cGRhdGVkQm9va2luZy5zZW5kQm9va2luZ0NvbmZpcm1hdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZEJvb2tpbmcuY2FzdCh1c2VyKSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiQm9va2luZyBoYXMgYmVlbiB1cGRhdGVkXCIsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5kZWxldGU8XHJcblx0eyBpZDogc3RyaW5nIH0sXHJcblx0UmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PixcclxuXHR1bmRlZmluZWRcclxuPihcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PigpO1xyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZEJvb2tpbmcgPSBhd2FpdCBCb29raW5nLmdldCh1c2VyLCBwYXJhbXMuaWQpO1xyXG5cdFx0YXdhaXQgZm91bmRCb29raW5nLmRlc3Ryb3kodXNlcik7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGZvdW5kQm9va2luZy5jYXN0KHVzZXIpKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdGBCb29raW5nIHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIGRlbGV0ZWQuYCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcblxyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHMvXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBkYi5DYXRlZ29yeS5maW5kQWxsKCk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShjYXRlZ29yaWVzKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKG51bGwpO1xyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcIi9cIiwgcmVxdWlyZUxvZ2luLCBhc3luYyAoeyBib2R5IH0sIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBjcmVhdGVkID0gYXdhaXQgZGIuQ2F0ZWdvcnkuY3JlYXRlKHtcclxuXHRcdG5hbWU6IGJvZHkubmFtZSxcclxuXHRcdGNsaWVudElkOiBib2R5LmNsaWVudElkXHJcblx0fSk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShjcmVhdGVkKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKG51bGwpO1xyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXCIvOmlkXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgcGFyYW1zLCBib2R5IH0sIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBmb3VuZCA9IGF3YWl0IGRiLkNhdGVnb3J5LmZpbmRCeVBrKHBhcmFtcy5pZCk7XHJcblx0Zm91bmQgJiYgZm91bmQudXBkYXRlKHsgbmFtZTogYm9keS5uYW1lLCBjbGllbnRJZDogYm9keS5jbGllbnRJZCB9KTtcclxuXHRyZXNwb25zZS5zZXREYXRhKGZvdW5kKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKG51bGwpO1xyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZGVsZXRlKFwiLzppZFwiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IHBhcmFtcyB9LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgZm91bmQgPSBhd2FpdCBkYi5DYXRlZ29yeS5maW5kQnlQayhwYXJhbXMuaWQpO1xyXG5cdGZvdW5kICYmIChhd2FpdCBmb3VuZC5kZXN0cm95KCkpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoZm91bmQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MsIHsgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uL2RhdGFzb3VyY2VcIjtcclxuaW1wb3J0IGRiLCB7XHJcblx0TG9jYXRpb25BdHRyaWJ1dGVzLFxyXG5cdExvY2F0aW9uLFxyXG5cdENsaWVudCBhcyBDbGllbnRNb2RlbCxcclxufSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQge1xyXG5cdFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24sXHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIGFzeW5jICh7IHVzZXIgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBDbGllbnREYXRhU291cmNlID0gbmV3IENsaWVudChkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBjbGllbnRzID0gYXdhaXQgQ2xpZW50RGF0YVNvdXJjZS5nZXRBbGwoKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoY2xpZW50cyk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBGb3VuZCAke2NsaWVudHMubGVuZ3RofSBhY2NpZGVudHMuYCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFwiL1wiLCBhc3luYyAoeyB1c2VyLCBib2R5IH06IGFueSwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IENsaWVudERhdGFTb3VyY2UgPSBuZXcgQ2xpZW50KGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGNyZWF0ZWRDbGllbnQgPSBhd2FpdCBDbGllbnREYXRhU291cmNlLmNyZWF0ZSh7XHJcblx0XHRcdC4uLmJvZHksXHJcblx0XHRcdGNsaWVudElkOiB1c2VyLmNsaWVudElkXHJcblx0XHR9KTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoY3JlYXRlZENsaWVudCk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiQ2xpZW50IGhhcyBiZWVuIGNyZWF0ZWRcIiwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IENsaWVudERhdGFTb3VyY2UgPSBuZXcgQ2xpZW50KGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGZvdW5kQ2xpZW50ID0gYXdhaXQgQ2xpZW50RGF0YVNvdXJjZS5nZXQocGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoe1xyXG5cdFx0XHQuLi5mb3VuZENsaWVudC5nZXQoeyBwbGFpbjogdHJ1ZSB9KSxcclxuXHRcdFx0bG9jYXRpb25zOiAoYXdhaXQgZm91bmRDbGllbnQuZ2V0TG9jYXRpb25zKCkpLm1hcChjID0+IGMuaWQpXHJcblx0XHR9KTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kIGFjY2lkZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9YCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zLCBib2R5IH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQ2xpZW50RGF0YVNvdXJjZSA9IG5ldyBDbGllbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgW3ByZXZpb3VzVmFsdWUsIHVwZGF0ZWRWYWx1ZV0gPSBhd2FpdCBDbGllbnREYXRhU291cmNlLnVwZGF0ZShcclxuXHRcdFx0cGFyYW1zLmlkLFxyXG5cdFx0XHRib2R5XHJcblx0XHQpO1xyXG5cclxuXHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZFZhbHVlKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdGBDbGllbnQgd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gdXBkYXRlZC5gLFxyXG5cdFx0XHRyZXNcclxuXHRcdCk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZGVsZXRlKFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBDbGllbnREYXRhU291cmNlID0gbmV3IENsaWVudChkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0YXdhaXQgQ2xpZW50RGF0YVNvdXJjZS5kZWxldGUocGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdGBDbGllbnQgd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gZGVsZXRlZC5gLFxyXG5cdFx0XHRyZXNcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmdldDx7IGlkOiBzdHJpbmcgfT4oXHJcblx0XCIvOmlkL2xvY2F0aW9uc1wiLFxyXG5cdHJlcXVpcmVMb2dpbixcclxuXHRhc3luYyAoeyB1c2VyLCBwYXJhbXMgfSwgcmVzKSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXI8TG9jYXRpb25BdHRyaWJ1dGVzW10+KCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogQWJzdHJhY3Rpb24gb2YgYXBpc1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGZvdW5kQ2xpZW50ID0gYXdhaXQgQ2xpZW50TW9kZWwuZmluZEJ5UGsocGFyYW1zLmlkKTtcclxuXHJcblx0XHRcdGlmICghZm91bmRDbGllbnQpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRcdGBVc2VyIHdpdGggSUQgJHtwYXJhbXMuaWR9IGNhbm5vdCBiZSBmb3VuZC5gXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodXNlci5yb2xlICE9PSBSb2xlLk1BU1RFUiAmJiBmb3VuZENsaWVudC5pZCAhPT0gdXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBjbGllbnRMb2NhdGlvbnMgPSBhd2FpdCBMb2NhdGlvbi5maW5kQWxsKHtcclxuXHRcdFx0XHRpbmNsdWRlOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG1vZGVsOiBDbGllbnRNb2RlbCxcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRpZDogZm91bmRDbGllbnQuaWRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKGNsaWVudExvY2F0aW9ucyk7XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGBGb3VuZCAke2NsaWVudExvY2F0aW9ucy5sZW5ndGh9IGxvY2F0aW9ucy5gKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UudG9PYmplY3QoKSk7XHJcblx0fVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IHNlbmRJbnZpdGUgfSBmcm9tIFwiLi4vdXRpbHMvbWFpbFwiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IGRpc2FsbG93R3Vlc3RzIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kaXNhbGxvd0d1ZXN0c1wiO1xyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxucm91dGVyLnVzZShyZXF1aXJlTG9naW4pO1xyXG5yb3V0ZXIudXNlKGRpc2FsbG93R3Vlc3RzKTtcclxuXHJcbi8vVE9ETzogY2hlY2sgaWYgZW1haWwgYWxyZWFkeSBleGlzdHMgaW4gREIuXHJcbi8vIFNlbmQgYW4gaW52aXRlIHRvIGFuIGVtYWlsXHJcbnJvdXRlci5wb3N0KFwiL1wiLCBhc3luYyAoeyBib2R5LCB1c2VyIH06IGFueSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cclxuXHQvLyBDaGVjayBpZiBlbWFpbCBpcyBwcm92aWRlZC5cclxuXHRpZiAoYm9keS5lbWFpbCkge1xyXG5cdFx0Ly8gU2VuZCBlbWFpbCBpbnZpdGVcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBleGlzdGluZ0VtYWlsID0gYXdhaXQgZGIuVXNlci5maW5kT25lKHtcclxuXHRcdFx0XHR3aGVyZTogeyBlbWFpbDogYm9keS5lbWFpbCB9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoIWV4aXN0aW5nRW1haWwpIHtcclxuXHRcdFx0XHRhd2FpdCBzZW5kSW52aXRlKHsgZW1haWw6IGJvZHkuZW1haWwsIGNsaWVudElkOiB1c2VyLmNsaWVudElkIH0pO1xyXG5cdFx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEludml0ZSBoYXMgYmVlbiBzZW50IHRvICR7Ym9keS5lbWFpbH1gLCByZXMpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkVtYWlsIGlzIGFscmVhZHkgcmVnaXN0ZXJlZC5cIik7XHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlBsZWFzZSBwcm92aWRlIGFuIGVtYWlsIGFkZHJlc3MuXCIpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MjIpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHJlcXVpcmVMb2dpbiBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luXCI7XHJcbmltcG9ydCBkaXNhbGxvd0d1ZXN0cyBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGlzYWxsb3dHdWVzdHNcIjtcclxuaW1wb3J0IHBhcnNlQm9keSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcGFyc2VCb2R5XCI7XHJcbmltcG9ydCBkZWxldGVGaWxlT25FcnJvciBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlRmlsZU9uRXJyb3JcIjtcclxuaW1wb3J0IHtcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzLFxyXG5cdGFkZFJlcGxhY2VkRmlsZXNcclxufSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlUmVwbGFjZWRGaWxlc1wiO1xyXG5pbXBvcnQgdXBsb2FkIGZyb20gXCIuLi9taWRkbGV3YXJlcy9tdWx0ZXJVcGxvYWRcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgZ2V0RmlsZVVSTCwgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIi4uL2RhdGFzb3VyY2VcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIGFzeW5jICh7IHVzZXIgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBMb2NhdGlvbkRhdGFTb3VyY2UgPSBuZXcgTG9jYXRpb24oZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgbG9jYXRpb25zID0gYXdhaXQgTG9jYXRpb25EYXRhU291cmNlLmdldEFsbCgpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShsb2NhdGlvbnMpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHtsb2NhdGlvbnMubGVuZ3RofSBsb2NhdGlvbnMuIGAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcclxuXHRcIi9cIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL2xvY2F0aW9uc1wiKS5zaW5nbGUoXCJsb2NhdGlvbkltYWdlU3JjXCIpLFxyXG5cdHBhcnNlQm9keSxcclxuXHRkaXNhbGxvd0d1ZXN0cyxcclxuXHRhc3luYyAoeyB1c2VyLCBib2R5IH0sIHJlcykgPT4ge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRjb25zdCBMb2NhdGlvbkRhdGFTb3VyY2UgPSBuZXcgTG9jYXRpb24oZGIsIHVzZXIpO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGNyZWF0ZWRMb2NhdGlvbiA9IGF3YWl0IExvY2F0aW9uRGF0YVNvdXJjZS5jcmVhdGUoYm9keSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoY3JlYXRlZExvY2F0aW9uKTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkxvY2F0aW9uIGhhcyBiZWVuIGNyZWF0ZWQuXCIsIHJlcyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3JcclxuKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IExvY2F0aW9uRGF0YVNvdXJjZSA9IG5ldyBMb2NhdGlvbihkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRsZXQgZm91bmRMb2NhdGlvbiA9IGF3YWl0IExvY2F0aW9uRGF0YVNvdXJjZS5nZXQocGFyYW1zLmlkKTtcclxuXHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGZvdW5kTG9jYXRpb24uZ2V0KHsgcGxhaW46IHRydWUgfSkpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0YEZvdW5kIGxvY2F0aW9uIHdpdGggSUQgb2YgJHtmb3VuZExvY2F0aW9uLmlkfWAsXHJcblx0XHRcdHJlc1xyXG5cdFx0KTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcclxuXHRcIi86aWRcIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL2xvY2F0aW9uc1wiKS5zaW5nbGUoXCJsb2NhdGlvbkltYWdlU3JjXCIpLFxyXG5cdHBhcnNlQm9keSxcclxuXHRkaXNhbGxvd0d1ZXN0cyxcclxuXHRhc3luYyAoeyB1c2VyLCBwYXJhbXMsIGJvZHksIGZpbGUgPSB7fSB9LCByZXMpID0+IHtcclxuXHRcdGNvbnN0IGZpbGVMb2NhdGlvbiA9XHJcblx0XHRcdGZpbGUgJiZcclxuXHRcdFx0ZmlsZS5maWxlbmFtZSAmJlxyXG5cdFx0XHRnZXRGaWxlVVJMKFwiY2FyYm9va2luZy9tZWRpYS91c2Vycy9wcm9maWxlXCIsIGZpbGUuZmlsZW5hbWUpO1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRjb25zdCBMb2NhdGlvbkRhdGFTb3VyY2UgPSBuZXcgTG9jYXRpb24oZGIsIHVzZXIpO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHVwZGF0ZWRMb2NhdGlvbiA9IGF3YWl0IExvY2F0aW9uRGF0YVNvdXJjZS51cGRhdGUocGFyYW1zLmlkLCBib2R5KTtcclxuXHRcdFx0ZmlsZUxvY2F0aW9uICYmXHJcblx0XHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHRcdHVybDogdXBkYXRlZExvY2F0aW9uLmxvY2F0aW9uSW1hZ2VTcmMsXHJcblx0XHRcdFx0XHRtb2RlbDogZGIuTG9jYXRpb24sXHJcblx0XHRcdFx0XHRmaWVsZDogXCJsb2NhdGlvbkltYWdlU3JjXCJcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZExvY2F0aW9uLmdldCh7IHBsYWluOiB0cnVlIH0pKTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgTG9jYXRpb24gd2l0aCBJRCAke3BhcmFtcy5pZH0gdXBkYXRlZC5gLCByZXMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9LFxyXG5cclxuXHRkZWxldGVGaWxlT25FcnJvcixcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzXHJcbik7XHJcblxyXG5yb3V0ZXIuZGVsZXRlKFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgTG9jYXRpb25EYXRhU291cmNlID0gbmV3IExvY2F0aW9uKGRiLCB1c2VyKTtcclxuXHR0cnkge1xyXG5cdFx0bGV0IGRlbGV0ZWRMb2NhdGlvbiA9IGF3YWl0IExvY2F0aW9uRGF0YVNvdXJjZS5kZWxldGUocGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoZGVsZXRlZExvY2F0aW9uLmdldCh7IHBsYWluOiB0cnVlIH0pKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdGBMb2NhdGlvbiB3aXRoIElEICR7cGFyYW1zLmlkfSBoYXMgYmVlbiBkZWxldGVkLmAsXHJcblx0XHRcdHJlc1xyXG5cdFx0KTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBXaWFsb24gfSBmcm9tIFwibm9kZS13aWFsb25cIjtcclxuaW1wb3J0IHsgT3AsIEZpbHRlcmFibGUgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcblxyXG5pbXBvcnQgeyByZXF1aXJlSGlnaGVyT3JFcXVhbFJvbGUgfSBmcm9tIFwiLi4vbWlkZGxld2FyZXNcIjtcclxuaW1wb3J0IHtcclxuXHRWZWhpY2xlLFxyXG5cdEJvb2tpbmcsXHJcblx0QWNjaWRlbnQsXHJcblx0VmVoaWNsZUlzc3VlLFxyXG5cdExvY2F0aW9uLFxyXG5cdENhdGVnb3J5XHJcbn0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIsIFJvbGVVdGlscyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UocmVxdWlyZUhpZ2hlck9yRXF1YWxSb2xlKFJvbGUuS0VZX01BTkFHRVIpKTtcclxuXHJcbmludGVyZmFjZSBVbml0U3VtbWFyeVJlc3BvbnNlIHtcclxuXHRwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cdGJyYW5kOiBzdHJpbmc7XHJcblx0bW9kZWw6IHN0cmluZztcclxuXHRvZG9tZXRlcjogbnVtYmVyIHwgbnVsbDtcclxuXHRhY2NpZGVudHM6IG51bWJlcjtcclxuXHRib29raW5nczogbnVtYmVyO1xyXG5cdGNhdGVnb3JpZXM6IHN0cmluZ1tdO1xyXG5cdGlzc3VlczogbnVtYmVyO1xyXG5cdGRlZmxlZXRlZDogYm9vbGVhbjtcclxuXHR3aWFsb25Vbml0OiBib29sZWFuO1xyXG5cdHdpYWxvblVuaXROYW1lPzogc3RyaW5nIHwgbnVsbDtcclxuXHRjbGllbnQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbnJvdXRlci5nZXQoXCIvdW5pdC1zdW1tYXJ5XCIsIGFzeW5jICh7IHVzZXIgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxVbml0U3VtbWFyeVJlc3BvbnNlW10+KCk7XHJcblx0Y29uc3QgdyA9IGF3YWl0IFdpYWxvbi5sb2dpbih7IHRva2VuOiBwcm9jZXNzLmVudi5XSUFMT05fVE9LRU4gfSk7XHJcblxyXG5cdGxldCB3aGVyZU9wdGlvbnM6IEZpbHRlcmFibGVbXCJ3aGVyZVwiXSA9IHsgY2xpZW50SWQ6IHVzZXIuY2xpZW50SWQgfTtcclxuXHJcblx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5NQVNURVIpIHtcclxuXHRcdHdoZXJlT3B0aW9ucyA9IHt9O1xyXG5cdH1cclxuXHJcblx0bGV0IGNsaWVudFVzZXJzSWRzID0gKFxyXG5cdFx0YXdhaXQgVmVoaWNsZS5maW5kQWxsKHtcclxuXHRcdFx0d2hlcmU6IHdoZXJlT3B0aW9uc1xyXG5cdFx0fSlcclxuXHQpLm1hcCh1c2VyID0+IHVzZXIuaWQpO1xyXG5cclxuXHRsZXQgY2xpZW50VmVoaWNsZXMgPSBhd2FpdCBWZWhpY2xlLmZpbmRBbGwoe1xyXG5cdFx0d2hlcmU6IHdoZXJlT3B0aW9ucyxcclxuXHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG1vZGVsOiBBY2NpZGVudCxcclxuXHRcdFx0XHRhczogXCJhY2NpZGVudHNcIixcclxuXHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0dXNlcklkOiB7XHJcblx0XHRcdFx0XHRcdFtPcC5pbl06IGNsaWVudFVzZXJzSWRzXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRyZXF1aXJlZDogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG1vZGVsOiBCb29raW5nLFxyXG5cdFx0XHRcdGFzOiBcImJvb2tpbmdzXCIsXHJcblx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdHVzZXJJZDoge1xyXG5cdFx0XHRcdFx0XHRbT3AuaW5dOiBjbGllbnRVc2Vyc0lkc1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRtb2RlbDogQ2F0ZWdvcnksXHJcblx0XHRcdFx0YXM6IFwiY2F0ZWdvcmllc1wiLFxyXG5cdFx0XHRcdHdoZXJlOiB3aGVyZU9wdGlvbnMsXHJcblx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRtb2RlbDogVmVoaWNsZUlzc3VlLFxyXG5cdFx0XHRcdGFzOiBcInZlaGljbGVJc3N1ZXNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRMb2NhdGlvblxyXG5cdFx0XVxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB1bml0cyA9IGF3YWl0IHcuVXRpbHMuZ2V0VW5pdHMoeyBmbGFnczogODE5MiArIDEgfSk7XHJcblxyXG5cdGNvbnN0IGRhdGEgPSBjbGllbnRWZWhpY2xlcy5tYXA8VW5pdFN1bW1hcnlSZXNwb25zZT4odmVoaWNsZSA9PiB7XHJcblx0XHRjb25zdCB3aWFsb25Vbml0ID0gdW5pdHMuaXRlbXMuZmluZChcclxuXHRcdFx0dW5pdCA9PiB1bml0LmlkID09PSB2ZWhpY2xlLndpYWxvblVuaXRJZFxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlcixcclxuXHRcdFx0YnJhbmQ6IHZlaGljbGUuYnJhbmQsXHJcblx0XHRcdG1vZGVsOiB2ZWhpY2xlLm1vZGVsLFxyXG5cdFx0XHRvZG9tZXRlcjogKHdpYWxvblVuaXQgJiYgd2lhbG9uVW5pdC5jbm0pIHx8IG51bGwsXHJcblx0XHRcdGFjY2lkZW50czogdmVoaWNsZS5hY2NpZGVudHMubGVuZ3RoLFxyXG5cdFx0XHRib29raW5nczogdmVoaWNsZS5ib29raW5ncy5maWx0ZXIoYm9va2luZyA9PiBib29raW5nLmZpbmlzaGVkKS5sZW5ndGgsXHJcblx0XHRcdGNhdGVnb3JpZXM6IHZlaGljbGUuY2F0ZWdvcmllcy5tYXAoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkubmFtZSksXHJcblx0XHRcdGlzc3VlczogdmVoaWNsZS52ZWhpY2xlSXNzdWVzLmxlbmd0aCxcclxuXHRcdFx0ZGVmbGVldGVkOiB2ZWhpY2xlLmRlZmxlZXRlZCxcclxuXHRcdFx0d2lhbG9uVW5pdDogQm9vbGVhbih3aWFsb25Vbml0KSxcclxuXHRcdFx0d2lhbG9uVW5pdE5hbWU6IFJvbGVVdGlscy5pc1JvbGVCZXR0ZXIoUm9sZS5NQVNURVIsIHVzZXIucm9sZSlcclxuXHRcdFx0XHQ/ICh3aWFsb25Vbml0ICYmIHdpYWxvblVuaXQubm0pIHx8IG51bGxcclxuXHRcdFx0XHQ6IHVuZGVmaW5lZCxcclxuXHRcdFx0Y2xpZW50OiBSb2xlVXRpbHMuaXNSb2xlQmV0dGVyKFJvbGUuTUFTVEVSLCB1c2VyLnJvbGUpXHJcblx0XHRcdFx0PyB2ZWhpY2xlLmNsaWVudCAmJiB2ZWhpY2xlLmNsaWVudC5uYW1lXHJcblx0XHRcdFx0OiB1bmRlZmluZWRcclxuXHRcdH07XHJcblx0fSk7XHJcblxyXG5cdHJlc3BvbnNlLnNldERhdGEoZGF0YSk7XHJcblx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIlJlcG9ydCBzdWNjZXNzZnVsLlwiLCByZXMpO1xyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmltcG9ydCB7XHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlcyxcclxuXHRhZGRSZXBsYWNlZEZpbGVzXHJcbn0gZnJvbSBcIi4uL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXNcIjtcclxuaW1wb3J0IGRlbGV0ZUZpbGVPbkVycm9yIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvclwiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IGRpc2FsbG93R3Vlc3RzIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kaXNhbGxvd0d1ZXN0c1wiO1xyXG5pbXBvcnQgcGFyc2VCb2R5IGZyb20gXCIuLi9taWRkbGV3YXJlcy9wYXJzZUJvZHlcIjtcclxuaW1wb3J0IHVwbG9hZCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciwgZ2V0RmlsZVVSTCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9kYXRhc291cmNlXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IEludml0ZVRva2VuIH0gZnJvbSBcIi4uL3R5cGluZ3NcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IHVzZXIgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBVc2VyRGF0YVNvdXJjZSA9IG5ldyBVc2VyKGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlckRhdGFTb3VyY2UuZ2V0QWxsKCk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHVzZXJzKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kICR7dXNlcnMubGVuZ3RofSB1c2Vycy5gLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXHJcblx0XCIvXCIsXHJcblx0dXBsb2FkKFwiY2FyYm9va2luZy9tZWRpYS91c2Vycy9wcm9maWxlXCIpLnNpbmdsZShcInVzZXJJbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0YXN5bmMgKHsgdXNlciwgYm9keSwgZmlsZSA9IHt9IH0sIHJlcywgbmV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgeyBsb2NhdGlvbjogZmlsZUxvY2F0aW9uID0gbnVsbCB9ID0gZmlsZTtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0Y29uc3QgVXNlckRhdGFTb3VyY2UgPSBuZXcgVXNlcihkYiwgdXNlcik7XHJcblx0XHRsZXQgaW52aXRlVG9rZW5Vc2VkID0gZmFsc2U7XHJcblx0XHRsZXQgZW1haWwgPSBib2R5LmVtYWlsO1xyXG5cdFx0bGV0IGNsaWVudElkOiBudW1iZXIgfCBudWxsID0gKHVzZXIgJiYgdXNlci5jbGllbnRJZCkgfHwgbnVsbDtcclxuXHJcblx0XHQvLyBDb25zdW1lIGludml0ZSB0b2tlblxyXG5cdFx0aWYgKGJvZHkuaW52aXRlVG9rZW4pIHtcclxuXHRcdFx0Y29uc3QgaW52aXRlVG9rZW4gPSBqd3QudmVyaWZ5KFxyXG5cdFx0XHRcdGJvZHkuaW52aXRlVG9rZW4sXHJcblx0XHRcdFx0Y29uZmlnLnNlY3JldEtleVxyXG5cdFx0XHQpIGFzIEludml0ZVRva2VuO1xyXG5cdFx0XHRpZiAoaW52aXRlVG9rZW4pIHtcclxuXHRcdFx0XHRpbnZpdGVUb2tlblVzZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGVtYWlsID0gaW52aXRlVG9rZW4uZW1haWw7XHJcblx0XHRcdFx0Y2xpZW50SWQgPSBpbnZpdGVUb2tlbi5jbGllbnRJZCB8fCBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2goYm9keS5wYXNzd29yZCwgMTApO1xyXG5cdFx0XHRsZXQgY3JlYXRlZFVzZXIgPSBhd2FpdCBVc2VyRGF0YVNvdXJjZS5jcmVhdGUoXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Li4uYm9keSxcclxuXHRcdFx0XHRcdHVzZXJJbWFnZVNyYzogZmlsZUxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0ZW1haWwsXHJcblx0XHRcdFx0XHRwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXHJcblx0XHRcdFx0XHRjbGllbnRJZDogY2xpZW50SWRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGludml0ZWQ6IGludml0ZVRva2VuVXNlZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoe1xyXG5cdFx0XHRcdGNyZWF0ZWRVc2VyLFxyXG5cdFx0XHRcdGNhdGVnb3JpZXM6IChhd2FpdCBjcmVhdGVkVXNlci5nZXRDYXRlZ29yaWVzKCkpLm1hcChjID0+IGMuaWQpXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlVzZXIgaGFzIGJlZW4gY3JlYXRlZC5cIik7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0cmVzLnN0YXR1cygyMDApO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGUubWVzc2FnZSk7XHJcblx0XHRcdGlmIChlIGluc3RhbmNlb2YgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24pIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQyMik7XHJcblx0XHRcdFx0cmVzLnN0YXR1cyg0MjIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoZS5tZXNzYWdlKTtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMyk7XHJcblx0XHRcdFx0cmVzLnN0YXR1cyg0MDMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZS5lcnJvcnMgJiYgZS5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGUuZXJyb3JzLmZvckVhY2goZXJyb3IgPT4gcmVzcG9uc2UuYXBwZW5kRXJyb3IoZXJyb3IucGF0aCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3JcclxuKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgVXNlckRhdGFTb3VyY2UgPSBuZXcgVXNlcihkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZFVzZXIgPSBhd2FpdCBVc2VyRGF0YVNvdXJjZS5nZXQocGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoe1xyXG5cdFx0XHQuLi5mb3VuZFVzZXIuZ2V0KHsgcGxhaW46IHRydWUgfSksXHJcblx0XHRcdGNhdGVnb3JpZXM6IChhd2FpdCBmb3VuZFVzZXIuZ2V0Q2F0ZWdvcmllcygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0fSk7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGBVc2VyIHdpdGggSUQgJHtwYXJhbXMuaWR9IGZvdW5kLmApO1xyXG5cdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRpZiAoZSBpbnN0YW5jZW9mIFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24pIHtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MDQpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwNCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwMyk7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAzKTtcclxuXHRcdH1cclxuXHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoZS5tZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXHJcblx0XCIvOmlkXCIsXHJcblx0cmVxdWlyZUxvZ2luLFxyXG5cdHVwbG9hZChcImNhcmJvb2tpbmcvbWVkaWEvdXNlcnMvcHJvZmlsZVwiKS5zaW5nbGUoXCJ1c2VySW1hZ2VTcmNcIiksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGFzeW5jICh7IHVzZXIsIGJvZHksIGZpbGUgPSB7fSwgcGFyYW1zIH0sIHJlcywgbmV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgZmlsZUxvY2F0aW9uID1cclxuXHRcdFx0ZmlsZSAmJlxyXG5cdFx0XHRmaWxlLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXCJjYXJib29raW5nL21lZGlhL3VzZXJzL3Byb2ZpbGVcIiwgZmlsZS5maWxlbmFtZSk7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRjb25zdCBVc2VyRGF0YVNvdXJjZSA9IG5ldyBVc2VyKGRiLCB1c2VyKTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgZm91bmRVc2VyID0gYXdhaXQgVXNlckRhdGFTb3VyY2UuZ2V0KGJvZHkuaWQpO1xyXG5cclxuXHRcdFx0ZmlsZUxvY2F0aW9uICYmXHJcblx0XHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHRcdHVybDogZm91bmRVc2VyLnVzZXJJbWFnZVNyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5Vc2VyLFxyXG5cdFx0XHRcdFx0ZmllbGQ6IFwidXNlckltYWdlU3JjXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0aWYgKGJvZHkuY2F0ZWdvcmllcykge1xyXG5cdFx0XHRcdGxldCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEFsbCh7XHJcblx0XHRcdFx0XHR3aGVyZTogeyBpZDogYm9keS5jYXRlZ29yaWVzIH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRhd2FpdCBmb3VuZFVzZXIuJHNldChcImNhdGVnb3JpZXNcIiwgY2F0ZWdvcmllcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IHVwZGF0ZWRVc2VyID0gYXdhaXQgVXNlckRhdGFTb3VyY2UudXBkYXRlKGZvdW5kVXNlci5pZCwge1xyXG5cdFx0XHRcdC4uLmJvZHksXHJcblx0XHRcdFx0dXNlckltYWdlU3JjOiBmaWxlTG9jYXRpb24gfHwgZm91bmRVc2VyLnVzZXJJbWFnZVNyY1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZFVzZXIuZ2V0KHsgcGxhaW46IHRydWUgfSkpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoYFVzZXIgd2l0aCBJRCAke3BhcmFtcy5pZH0gdXBkYXRlZC5gKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdGlmIChlIGluc3RhbmNlb2YgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24pIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGUubWVzc2FnZSk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MjIpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDIyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMyk7XHJcblx0XHRcdFx0cmVzLnN0YXR1cyg0MDMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChlLmVycm9ycyAmJiBlLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0ZS5lcnJvcnMuZm9yRWFjaChlcnJvciA9PiByZXNwb25zZS5hcHBlbmRFcnJvcihlcnJvci5wYXRoKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0XHRuZXh0KCk7XHJcblx0fSxcclxuXHRkZWxldGVGaWxlT25FcnJvcixcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzXHJcbik7XHJcblxyXG5yb3V0ZXIuZGVsZXRlKFxyXG5cdFwiLzppZFwiLFxyXG5cdHJlcXVpcmVMb2dpbixcclxuXHRkaXNhbGxvd0d1ZXN0cyxcclxuXHRhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0XHRjb25zdCBVc2VyRGF0YVNvdXJjZSA9IG5ldyBVc2VyKGRiLCB1c2VyKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBkZWxldGVkVXNlciA9IGF3YWl0IFVzZXJEYXRhU291cmNlLmRlbGV0ZShwYXJhbXMuaWQpO1xyXG5cclxuXHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHR1cmw6IGRlbGV0ZWRVc2VyLnVzZXJJbWFnZVNyYyxcclxuXHRcdFx0XHRtb2RlbDogZGIuVXNlcixcclxuXHRcdFx0XHRmaWVsZDogXCJ1c2VySW1hZ2VTcmNcIlxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgVXNlciB3aXRoIElEICR7cGFyYW1zLmlkfSBoYXMgYmVlbiBkZWxldGVkLmApO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRpZiAoZSBpbnN0YW5jZW9mIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDIyKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQyMik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDMpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZS5lcnJvcnMgJiYgZS5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGUuZXJyb3JzLmZvckVhY2goZXJyb3IgPT4gcmVzcG9uc2UuYXBwZW5kRXJyb3IoZXJyb3IucGF0aCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzL1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCByZXF1aXJlTG9naW4sIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuVmVoaWNsZUlzc3VlLmZpbmRBbGwoKTtcclxuXHRyZXNwb25zZS5zZXREYXRhKGNhdGVnb3JpZXMpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFwiL1wiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IGJvZHkgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGNyZWF0ZWQgPSBhd2FpdCBkYi5WZWhpY2xlSXNzdWUuY3JlYXRlKHtcclxuXHRcdG1lc3NhZ2U6IGJvZHkubWVzc2FnZSxcclxuXHRcdHZlaGljbGVJZDogYm9keS52ZWhpY2xlSWRcclxuXHR9KTtcclxuXHRyZXNwb25zZS5zZXREYXRhKGNyZWF0ZWQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcIi86aWRcIiwgcmVxdWlyZUxvZ2luLCBhc3luYyAoeyBwYXJhbXMsIGJvZHkgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGZvdW5kID0gYXdhaXQgZGIuVmVoaWNsZUlzc3VlLmZpbmRCeVBrKHBhcmFtcy5pZCk7XHJcblx0Zm91bmQgJiYgZm91bmQudXBkYXRlKHsgbWVzc2FnZTogYm9keS5tZXNzYWdlIH0pO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoZm91bmQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgcGFyYW1zIH0sIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBmb3VuZCA9IGF3YWl0IGRiLlZlaGljbGVJc3N1ZS5maW5kQnlQayhwYXJhbXMuaWQpO1xyXG5cdGZvdW5kICYmIChhd2FpdCBmb3VuZC5kZXN0cm95KCkpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoZm91bmQpO1xyXG5cdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UobnVsbCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgV2lhbG9uIH0gZnJvbSBcIm5vZGUtd2lhbG9uXCI7XHJcblxyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IHtcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzLFxyXG5cdGFkZFJlcGxhY2VkRmlsZXNcclxufSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlUmVwbGFjZWRGaWxlc1wiO1xyXG5pbXBvcnQgZGlzYWxsb3dHdWVzdHMgZnJvbSBcIi4uL21pZGRsZXdhcmVzL2Rpc2FsbG93R3Vlc3RzXCI7XHJcbmltcG9ydCBwYXJzZUJvZHkgZnJvbSBcIi4uL21pZGRsZXdhcmVzL3BhcnNlQm9keVwiO1xyXG5pbXBvcnQgdXBsb2FkIGZyb20gXCIuLi9taWRkbGV3YXJlcy9tdWx0ZXJVcGxvYWRcIjtcclxuaW1wb3J0IGRlbGV0ZUZpbGVPbkVycm9yIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvclwiO1xyXG5pbXBvcnQgZGIsIHtcclxuXHRWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRWZWhpY2xlIGFzIFZlaGljbGVNb2RlbCxcclxuXHRMb2NhdGlvbixcclxuXHRMb2NhdGlvbkF0dHJpYnV0ZXNcclxufSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciwgZ2V0RmlsZVVSTCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIH0gZnJvbSBcIi4uL2FwaVwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIGFzIFZlaGljbGVEUyB9IGZyb20gXCIuLi9kYXRhc291cmNlXCI7IC8vIERlcHJlY2F0ZVxyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi92YXJpYWJsZXMvZW51bXNcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIGFzeW5jICh7IHVzZXIsIHF1ZXJ5IH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0dHJ5IHtcclxuXHRcdGxldCB2ZWhpY2xlczogUGFydGlhbDxWZWhpY2xlQXR0cmlidXRlcz5bXSA9IFtdO1xyXG5cdFx0Y29uc3QgZnJvbSA9IHF1ZXJ5LmZyb20gJiYgTnVtYmVyKHF1ZXJ5LmZyb20pO1xyXG5cdFx0Y29uc3QgdG8gPSBxdWVyeS50byAmJiBOdW1iZXIocXVlcnkudG8pO1xyXG5cdFx0aWYgKGZyb20gJiYgdG8pIHtcclxuXHRcdFx0dmVoaWNsZXMgPSAoXHJcblx0XHRcdFx0YXdhaXQgVmVoaWNsZS5nZXRBbGwodXNlciwge1xyXG5cdFx0XHRcdFx0ZnJvbTogbW9tZW50KGZyb20sIFwiWFwiKS50b0RhdGUoKSxcclxuXHRcdFx0XHRcdHRvOiBtb21lbnQodG8sIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdCkuY2FzdCh1c2VyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZlaGljbGVzID0gKGF3YWl0IFZlaGljbGUuZ2V0QWxsKHVzZXIpKS5jYXN0KHVzZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlc3BvbnNlLnNldERhdGEodmVoaWNsZXMpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHt2ZWhpY2xlcy5sZW5ndGh9IHZlaGljbGVzLmAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdChcclxuXHRcIi9cIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL3ZlaGljbGVzXCIpLnNpbmdsZShcInZlaGljbGVJbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHsgdXNlciwgYm9keSwgZmlsZSB9LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGNvbnN0IGZpbGVMb2NhdGlvbiA9XHJcblx0XHRcdGZpbGUgJiZcclxuXHRcdFx0ZmlsZS5maWxlbmFtZSAmJlxyXG5cdFx0XHRnZXRGaWxlVVJMKFwiY2FyYm9va2luZy9tZWRpYS92ZWhpY2xlc1wiLCBmaWxlLmZpbGVuYW1lKTtcclxuXHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IFZlaGljbGVEYXRhU291cmNlID0gbmV3IFZlaGljbGVEUyhkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IGNyZWF0ZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZURhdGFTb3VyY2UuY3JlYXRlKHtcclxuXHRcdFx0XHQuLi5ib2R5LFxyXG5cdFx0XHRcdHZlaGljbGVJbWFnZVNyYzogZmlsZUxvY2F0aW9uXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKGJvZHkuY2F0ZWdvcmllcykge1xyXG5cdFx0XHRcdGxldCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEFsbCh7XHJcblx0XHRcdFx0XHR3aGVyZTogeyBpZDogYm9keS5jYXRlZ29yaWVzIH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRhd2FpdCBjcmVhdGVkVmVoaWNsZS5zZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoe1xyXG5cdFx0XHRcdC4uLmNyZWF0ZWRWZWhpY2xlLmdldCh7IHBsYWluOiB0cnVlIH0pLFxyXG5cdFx0XHRcdGNhdGVnb3JpZXM6IGF3YWl0IGNyZWF0ZWRWZWhpY2xlLmdldENhdGVnb3JpZXMoKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIlZlaGljbGUgaGFzIGJlZW4gY3JlYXRlZC5cIiwgcmVzKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0XHRuZXh0KCk7XHJcblx0fSxcclxuXHRkZWxldGVGaWxlT25FcnJvclxyXG4pO1xyXG5cclxucm91dGVyLmdldChcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IFZlaGljbGVEYXRhU291cmNlID0gbmV3IFZlaGljbGVEUyhkYiwgdXNlcik7XHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGZvdW5kVmVoaWNsZSA9IGF3YWl0IFZlaGljbGVEYXRhU291cmNlLmdldChwYXJhbXMuaWQpO1xyXG5cdFx0Y29uc3QgZm91bmRWZWhpY2xlUGxhaW4gPSB7XHJcblx0XHRcdC4uLmZvdW5kVmVoaWNsZS5nZXQoeyBwbGFpbjogdHJ1ZSB9KSxcclxuXHRcdFx0cG9zaXRpb246IG51bGwsXHJcblx0XHRcdG1pbGVhZ2U6IG51bGwsXHJcblx0XHRcdGNhdGVnb3JpZXM6IChhd2FpdCBmb3VuZFZlaGljbGUuZ2V0Q2F0ZWdvcmllcygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0fTtcclxuXHRcdGlmIChmb3VuZFZlaGljbGUud2lhbG9uVW5pdElkKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bGV0IHcgPSBhd2FpdCBXaWFsb24ubG9naW4oe1xyXG5cdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGNvbnN0IHVuaXQgPSBhd2FpdCB3LkNvcmUuc2VhcmNoSXRlbSh7XHJcblx0XHRcdFx0XHRpZDogZm91bmRWZWhpY2xlUGxhaW4ud2lhbG9uVW5pdElkLFxyXG5cdFx0XHRcdFx0ZmxhZ3M6IDEwMjQgKyA4MTkyXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Y29uc3QgbG5nID0gdW5pdC5pdGVtLnBvcy54O1xyXG5cdFx0XHRcdGNvbnN0IGxhdCA9IHVuaXQuaXRlbS5wb3MueTtcclxuXHRcdFx0XHRjb25zdCBtaWxlYWdlID0gdW5pdC5pdGVtLmNubTtcclxuXHRcdFx0XHRmb3VuZFZlaGljbGVQbGFpbi5wb3NpdGlvbiA9IGxhdCAmJiBsbmcgPyB7IGxhdCwgbG5nIH0gOiBudWxsO1xyXG5cdFx0XHRcdGZvdW5kVmVoaWNsZVBsYWluLm1pbGVhZ2UgPSBtaWxlYWdlIHx8IG51bGw7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGZvdW5kVmVoaWNsZVBsYWluKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYFZlaGljbGUgd2l0aCBJRCAke3BhcmFtcy5pZH0gZm91bmQuYCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcclxuXHRcIi86aWRcIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL3ZlaGljbGVzXCIpLnNpbmdsZShcInZlaGljbGVJbWFnZVNyY1wiKSxcclxuXHRwYXJzZUJvZHksXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRjb25zdCB7IHVzZXIsIHBhcmFtcywgYm9keSwgZmlsZSB9ID0gcmVxO1xyXG5cdFx0Y29uc3QgZmlsZUxvY2F0aW9uID1cclxuXHRcdFx0ZmlsZSAmJlxyXG5cdFx0XHRmaWxlLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXCJjYXJib29raW5nL21lZGlhL3ZlaGljbGVzXCIsIGZpbGUuZmlsZW5hbWUpO1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0Y29uc3QgVmVoaWNsZURhdGFTb3VyY2UgPSBuZXcgVmVoaWNsZURTKGRiLCB1c2VyKTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgdXBkYXRlZFZlaGljbGUgPSBhd2FpdCBWZWhpY2xlRGF0YVNvdXJjZS51cGRhdGUocGFyYW1zLmlkLCB7XHJcblx0XHRcdFx0Li4uYm9keSxcclxuXHRcdFx0XHR2ZWhpY2xlSW1hZ2VTcmM6IGZpbGVMb2NhdGlvblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGZpbGVMb2NhdGlvbiAmJlxyXG5cdFx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0XHR1cmw6IHVwZGF0ZWRWZWhpY2xlLnZlaGljbGVJbWFnZVNyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5WZWhpY2xlLFxyXG5cdFx0XHRcdFx0ZmllbGQ6IFwidmVoaWNsZUltYWdlU3JjXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0aWYgKGJvZHkuY2F0ZWdvcmllcykge1xyXG5cdFx0XHRcdGxldCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEFsbCh7XHJcblx0XHRcdFx0XHR3aGVyZTogeyBpZDogYm9keS5jYXRlZ29yaWVzIH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRhd2FpdCB1cGRhdGVkVmVoaWNsZS5zZXRDYXRlZ29yaWVzKGNhdGVnb3JpZXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHtcclxuXHRcdFx0XHQuLi51cGRhdGVkVmVoaWNsZS5nZXQoeyBwbGFpbjogdHJ1ZSB9KSxcclxuXHRcdFx0XHRjYXRlZ29yaWVzOiAoYXdhaXQgdXBkYXRlZFZlaGljbGUuZ2V0Q2F0ZWdvcmllcygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgVmVoaWNsZSB3aXRoIElEICR7cGFyYW1zLmlkfSB1cGRhdGVkLmAsIHJlcyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3IsXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcclxuXHRcIi86aWRcIixcclxuXHRkaXNhbGxvd0d1ZXN0cyxcclxuXHRhc3luYyAoeyB1c2VyLCBwYXJhbXMgfTogYW55LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0XHRjb25zdCBWZWhpY2xlRGF0YVNvdXJjZSA9IG5ldyBWZWhpY2xlRFMoZGIsIHVzZXIpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgZGVsZXRlZFZlaGljbGUgPSBhd2FpdCBWZWhpY2xlRGF0YVNvdXJjZS5kZWxldGUocGFyYW1zLmlkKTtcclxuXHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHR1cmw6IGRlbGV0ZWRWZWhpY2xlLnZlaGljbGVJbWFnZVNyYyxcclxuXHRcdFx0XHRtb2RlbDogZGIuVmVoaWNsZSxcclxuXHRcdFx0XHRmaWVsZDogXCJ2ZWhpY2xlSW1hZ2VTcmNcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YShkZWxldGVkVmVoaWNsZS5nZXQoeyBwbGFpbjogdHJ1ZSB9KSk7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXHJcblx0XHRcdFx0YFZlaGljbGUgd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gZGVsZXRlZC5gLFxyXG5cdFx0XHRcdHJlc1xyXG5cdFx0XHQpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdG5leHQoKTtcclxuXHR9LFxyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXNcclxuKTtcclxuXHJcbnJvdXRlci5nZXQ8eyBpZDogc3RyaW5nIH0+KFwiLzppZC9sb2NhdGlvblwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMgfSwgcmVzKSA9PiB7XHJcblx0Ly8gVE9ETzogQWJzdHJhY3Rpb24gb2YgQVBJXHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPExvY2F0aW9uQXR0cmlidXRlcz4oKTtcclxuXHRjb25zdCB2ZWhpY2xlID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRCeVBrKHBhcmFtcy5pZCwge1xyXG5cdFx0aW5jbHVkZTogW0xvY2F0aW9uXVxyXG5cdH0pO1xyXG5cdGlmICghdmVoaWNsZSkge1xyXG5cdFx0cmVzLnN0YXR1cyg0MDQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgVmVoaWNsZSB3aXRoIGlkICR7cGFyYW1zLmlkfSBub3QgZm91bmQuYCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSIHx8IHZlaGljbGUuY2xpZW50SWQgPT09IHVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YSh2ZWhpY2xlLmxvY2F0aW9uIHx8IG51bGwpO1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiTG9jYXRpb24gZm91bmQuXCIsIHJlcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgWW91IGNhbm5vdCBhY2Nlc3MgdGhpcyB2ZWhpY2xlLmApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZS50b09iamVjdCgpKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFdpYWxvbiB9IGZyb20gXCJub2RlLXdpYWxvblwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgSXRlbU5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSBcIi4uL2FwaS9leGNlcHRpb25zXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldChcIi91bml0c1wiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IHcgPSBhd2FpdCBXaWFsb24ubG9naW4oeyB0b2tlbjogcHJvY2Vzcy5lbnYuV0lBTE9OX1RPS0VOIH0pO1xyXG5cdFx0Y29uc3QgdW5pdHMgPSBhd2FpdCB3LlV0aWxzLmdldFVuaXRzKHsgZmxhZ3M6IDEwMjUgfSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBGb3VuZCAke3VuaXRzLml0ZW1zLmxlbmd0aH0gdW5pdHMuYCwgcmVzKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEodW5pdHMuaXRlbXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmdldChcIi91bml0cy86aWRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHsgdG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTiB9KTtcclxuXHRcdGNvbnN0IHVuaXRzID0gYXdhaXQgdy5VdGlscy5nZXRVbml0cyh7IGZsYWdzOiAxMDI1IH0pO1xyXG5cdFx0Y29uc3QgdW5pdCA9IHVuaXRzLml0ZW1zLmZpbmQodW5pdCA9PiB1bml0LmlkID09PSByZXEucXVlcnkuaWQpO1xyXG5cdFx0aWYgKHVuaXQpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHt1bml0cy5pdGVtcy5sZW5ndGh9IHVuaXRzLmAsIHJlcyk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodW5pdHMuaXRlbXMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDQpO1xyXG5cdFx0XHR0aHJvdyBuZXcgSXRlbU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVbml0IHdpdGggSUQgJHtyZXEucXVlcnkuaWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbixcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4vZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQge1xyXG5cdEZvcm1FeGNlcHRpb24sXHJcblx0RmllbGRFcnJvcixcclxuXHRJdGVtTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vYXBpL2V4Y2VwdGlvbnNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2VCdWlsZGVyPFQgPSB1bmtub3duPiB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGRhdGE6IFQgPSBudWxsLFxyXG5cdFx0cHJpdmF0ZSBzdWNjZXNzID0gZmFsc2UsXHJcblx0XHRwcml2YXRlIG1lc3NhZ2UgPSBcIlVua25vd24gc2VydmVyIGVycm9yLlwiLFxyXG5cdFx0cHJpdmF0ZSBlcnJvcnM6IEZpZWxkRXJyb3JbXSA9IFtdLFxyXG5cdFx0cHJpdmF0ZSBjb2RlID0gNTAwXHJcblx0KSB7fVxyXG5cclxuXHRzZXREYXRhKGRhdGE6IFQpIHtcclxuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XHJcblx0fVxyXG5cclxuXHRzZXRTdWNjZXNzKHN1Y2Nlc3M6IGJvb2xlYW4pIHtcclxuXHRcdHRoaXMuc3VjY2VzcyA9IHN1Y2Nlc3M7XHJcblx0fVxyXG5cclxuXHRhcHBlbmRFcnJvcihlcnJvcjogRmllbGRFcnJvcikge1xyXG5cdFx0dGhpcy5lcnJvcnMucHVzaChlcnJvcik7XHJcblx0fVxyXG5cclxuXHRzZXRDb2RlKGNvZGU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5jb2RlID0gY29kZTtcclxuXHR9XHJcblxyXG5cdHNldE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlRXJyb3IoZTogRXJyb3IsIHJlczogUmVzcG9uc2UpIHtcclxuXHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0aWYgKGUgaW5zdGFuY2VvZiBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbikge1xyXG5cdFx0XHR0aGlzLnNldENvZGUoNDIyKTtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MjIpO1xyXG5cdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0ZSBpbnN0YW5jZW9mIFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24gfHxcclxuXHRcdFx0ZSBpbnN0YW5jZW9mIEl0ZW1Ob3RGb3VuZEV4Y2VwdGlvblxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuc2V0Q29kZSg0MDQpO1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwNCk7XHJcblx0XHR9IGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBGb3JtRXhjZXB0aW9uKSB7XHJcblx0XHRcdGUuZmllbGRzLmZvckVhY2goZXJyb3IgPT4gdGhpcy5hcHBlbmRFcnJvcihlcnJvcikpO1xyXG5cdFx0XHRyZXMuc3RhdHVzKDQwMyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDUwMCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldE1lc3NhZ2UoZS5tZXNzYWdlKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZVN1Y2Nlc3MobWVzc2FnZTogc3RyaW5nLCByZXM6IFJlc3BvbnNlKSB7XHJcblx0XHR0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XHJcblx0XHR0aGlzLnNldENvZGUoMjAwKTtcclxuXHRcdHRoaXMuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdHJlcy5zdGF0dXMoMjAwKTtcclxuXHR9XHJcblxyXG5cdHRvT2JqZWN0KCkge1xyXG5cdFx0Y29uc3QgeyBtZXNzYWdlLCBjb2RlLCBlcnJvcnMsIHN1Y2Nlc3MsIGRhdGEgfSA9IHRoaXM7XHJcblx0XHRyZXR1cm4geyBtZXNzYWdlLCBjb2RlLCBlcnJvcnMsIHN1Y2Nlc3MsIGRhdGEgfTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi92YXJpYWJsZXMvZW51bXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb2xlVXRpbHMge1xyXG5cdC8qKlxyXG5cdCAqIExvd2VyIGluZGV4LCBoaWdoZXIgcGVybWlzc2lvbnMuXHJcblx0ICovXHJcblx0c3RhdGljIHJvbGVSYW5rcyA9IFtSb2xlLk1BU1RFUiwgUm9sZS5BRE1JTiwgUm9sZS5LRVlfTUFOQUdFUiwgUm9sZS5HVUVTVF07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSByZXF1aXJlZFJvbGUgVGhlIHJvbGUgcmVxdWlyZWQgdG8gYmUgaGlnaGVyIG9yIGVxdWFsIHRvLlxyXG5cdCAqIEBwYXJhbSByb2xlIFRoZSByb2xlIHRvIGJlIGNvbXBhcmVkLlxyXG5cdCAqL1xyXG5cdHN0YXRpYyBpc1JvbGVCZXR0ZXIgPSAocmVxdWlyZWRSb2xlOiBSb2xlLCByb2xlOiBSb2xlIHwgc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcblx0XHRjb25zdCByZXF1aXJlZFJvbGVJbmRleCA9IFJvbGVVdGlscy5yb2xlUmFua3MuZmluZEluZGV4KFxyXG5cdFx0XHR2YWx1ZSA9PiB2YWx1ZSA9PT0gcmVxdWlyZWRSb2xlXHJcblx0XHQpO1xyXG5cclxuXHRcdGNvbnN0IHJvbGVJbmRleCA9IFJvbGVVdGlscy5yb2xlUmFua3MuZmluZEluZGV4KHZhbHVlID0+IHZhbHVlID09PSByb2xlKTtcclxuXHJcblx0XHRpZiAocmVxdWlyZWRSb2xlSW5kZXggPj0gMCAmJiByb2xlSW5kZXggPj0gMCkge1xyXG5cdFx0XHRyZXR1cm4gcm9sZUluZGV4IDw9IHJlcXVpcmVkUm9sZUluZGV4O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9O1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWRJbnB1dEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuXHRmaWVsZHM6IHN0cmluZ1tdO1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgZmllbGRzOiBzdHJpbmdbXSA9IFtdKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHRcdHRoaXMuZmllbGRzID0gZmllbGRzO1xyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdG1lc3NhZ2U6IHN0cmluZyA9IFwiWW91IGRvIG5vdCBoYXZlIHRoZSBwZXJtaXNzaW9uIHRvIGFjY2VzcyB0aGlzIHJlc291cmNlLlwiXHJcblx0KSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XHJcblx0Y29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuIiwiZXhwb3J0IHtcclxuXHRkZWZhdWx0IGFzIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4vSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb25cIjtcclxuZXhwb3J0IHtcclxuXHRkZWZhdWx0IGFzIFJlc291cmNlTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi9SZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW52YWxpZElucHV0RXhjZXB0aW9uIH0gZnJvbSBcIi4vSW52YWxpZElucHV0RXhjZXB0aW9uXCI7XHJcbiIsImltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgeyBVUkwgfSBmcm9tIFwidXJsXCI7XHJcblxyXG5pbXBvcnQgeyBCb29raW5nU3RhdHVzIH0gZnJvbSBcIi4uL3ZhcmlhYmxlcy9lbnVtc1wiO1xyXG5pbXBvcnQgeyBFeHRyYWN0QXJyYXkgfSBmcm9tIFwiLi4vdHlwaW5nc1wiO1xyXG5pbXBvcnQgeyBCb29raW5nIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5cclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi9SZXNwb25zZUJ1aWxkZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrQW5kTWVyZ2UgPSA8XHJcblx0VDEgZXh0ZW5kcyBvYmplY3QsXHJcblx0VDIgZXh0ZW5kcyBvYmplY3QsXHJcblx0SyBleHRlbmRzIGtleW9mIFQyXHJcbj4oXHJcblx0b2JqMTogVDEsXHJcblx0b2JqMjogVDIsXHJcblx0ZmllbGRzOiBLW10gPSBbXVxyXG4pOiBQaWNrPFQyLCBLPiAmIFQxID0+IHtcclxuXHRyZXR1cm4geyAuLi5vYmoxLCAuLi5fLnBpY2sob2JqMiwgZmllbGRzKSB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFycmF5ID0gPFQ+KGFycmF5OiBUKTogRXh0cmFjdEFycmF5PFQ+W10gPT4ge1xyXG5cdHJldHVybiBhcnJheSBpbnN0YW5jZW9mIEFycmF5ID8gYXJyYXkgOiBbXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrRmllbGRzID0gKHRhcmdldDogb2JqZWN0LCBmaWVsZHM6IHN0cmluZ1tdKTogb2JqZWN0ID0+IHtcclxuXHRjb25zdCByZXN1bHQgPSB7fTtcclxuXHRmb3IgKGxldCBrZXkgaW4gdGFyZ2V0KSB7XHJcblx0XHRpZiAoZmllbGRzLmluZGV4T2Yoa2V5KSA+PSAwKSByZXN1bHRba2V5XSA9IHRhcmdldFtrZXldO1xyXG5cdH1cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4Y2VwdEZpZWxkcyA9ICh0YXJnZXQ6IG9iamVjdCwgZmllbGRzOiBzdHJpbmdbXSk6IG9iamVjdCA9PiB7XHJcblx0bGV0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRmb3IgKGxldCBrZXkgaW4gdGFyZ2V0KSB7XHJcblx0XHRpZiAoZmllbGRzLmluZGV4T2Yoa2V5KSA8IDApIHJlc3VsdFtrZXldID0gdGFyZ2V0W2tleV07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbnZlcnRTZXF1ZWxpemVEYXRlc1RvVW5peCA9IChvYmo6IGFueSk6IHZvaWQgPT4ge1xyXG5cdGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0Zm9yIChsZXQgdmFsdWUgb2Ygb2JqKSB7XHJcblx0XHRcdGNvbnZlcnRTZXF1ZWxpemVEYXRlc1RvVW5peCh2YWx1ZSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmIChvYmogJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0Y29uc3QgdmFsdWVzID0gb2JqLmRhdGFWYWx1ZXMgPyBvYmouZGF0YVZhbHVlcyA6IG9iajtcclxuXHJcblx0XHRmb3IgKGxldCBrZXkgaW4gdmFsdWVzKSB7XHJcblx0XHRcdGlmICh2YWx1ZXNba2V5XSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0XHR2YWx1ZXNba2V5XSA9IG1vbWVudCh2YWx1ZXNba2V5XSkudW5peCgpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZXNba2V5XSA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdGNvbnZlcnRTZXF1ZWxpemVEYXRlc1RvVW5peCh2YWx1ZXNba2V5XSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc3FsRGF0ZVRvTW9tZW50ID0gKGRhdGU6IHN0cmluZyk6IE1vbWVudCA9PlxyXG5cdG1vbWVudChkYXRlLCBcIllZWVktTU0tRERUSEg6bW06c3NcIiwgXCJVVENcIik7XHJcblxyXG5leHBvcnQgY29uc3QgdG9NeVNRTERhdGUgPSAodW5peFM6IG51bWJlcik6IHN0cmluZyA9PlxyXG5cdG1vbWVudCh1bml4UywgXCJYXCIpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIik7XHJcblxyXG5leHBvcnQgY29uc3QgdG9Vbml4ID0gKGRhdGU6IHN0cmluZyk6IG51bWJlciA9PiBzcWxEYXRlVG9Nb21lbnQoZGF0ZSkudW5peCgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY0ZpbGVzUGF0aCA9ICgpOiBzdHJpbmcgPT5cclxuXHRwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuQ0FSX1JFTlRBTF9NQU5BR0VNRU5UX0FQSV9TVE9SQUdFX1BBVEgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEZpbGVVUkwgPSAoZmlsZVBhdGg6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyA9PlxyXG5cdG5ldyBVUkwoYCR7cHJvY2Vzcy5lbnYuU0VSVkVSX1VSTH0vc3RhdGljLyR7ZmlsZVBhdGh9LyR7ZmlsZU5hbWV9YCkuaHJlZjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQYXRoRnJvbVVSTCA9IChmaWxlVVJMOiBzdHJpbmcpOiBzdHJpbmcgPT5cclxuXHRwYXRoLmpvaW4oXHJcblx0XHRnZXRTdGF0aWNGaWxlc1BhdGgoKSxcclxuXHRcdGZpbGVVUkwucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtwcm9jZXNzLmVudi5TRVJWRVJfVVJMfS9zdGF0aWNgKSwgXCJcIilcclxuXHQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0ID0gKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRmcy5ta2RpcihmaWxlUGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSwgZXJyID0+IHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoZmlsZVBhdGgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVGaWxlRnJvbVVybCA9IChmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+XHJcblx0ZnMucHJvbWlzZXMudW5saW5rKGdldFBhdGhGcm9tVVJMKGZpbGVVcmwpKTtcclxuXHJcbnR5cGUgQ29udmVydGVkPFQ+ID0ge1xyXG5cdFtQIGluIGtleW9mIFRdOiBUW1BdIGV4dGVuZHMgRGF0ZVxyXG5cdFx0PyBudW1iZXJcclxuXHRcdDogVFtQXSBleHRlbmRzIE9iamVjdFxyXG5cdFx0PyBDb252ZXJ0ZWQ8VFtQXT5cclxuXHRcdDogVFtQXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb252ZXJ0RGF0ZXNUb1VuaXggPSA8VCBleHRlbmRzIG9iamVjdD4oXHJcblx0b2JqZWN0OiBUXHJcbik6IENvbnZlcnRlZDxUPiA9PiB7XHJcblx0Y29uc3QgY2xvbmUgPSA8Q29udmVydGVkPFQ+Pl8uY2xvbmVEZWVwKG9iamVjdCk7XHJcblxyXG5cdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGNsb25lKSkge1xyXG5cdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRjbG9uZVtrZXldID0gPG51bWJlcj5tb21lbnQodmFsdWUpLnVuaXgoKTtcclxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdGNvbnZlcnREYXRlc1RvVW5peCh2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY2xvbmU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Qm9va2luZ1N0YXR1cyA9IChib29raW5nOiB7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0YXBwcm92ZWQ6IGJvb2xlYW4gfCBudWxsO1xyXG59KTogQm9va2luZ1N0YXR1cyA9PiB7XHJcblx0bGV0IHN0YXR1cyA9IEJvb2tpbmdTdGF0dXMuVU5LTk9XTjtcclxuXHRsZXQgY3VycmVudFRpbWUgPSBtb21lbnQoKTtcclxuXHRsZXQgaGFzUGFzc2VkRnJvbSA9IG1vbWVudChib29raW5nLmZyb20sIFwiWFwiKS5pc1NhbWVPckJlZm9yZShjdXJyZW50VGltZSk7XHJcblx0bGV0IGhhc1Bhc3NlZFRvID0gbW9tZW50KGJvb2tpbmcudG8sIFwiWFwiKS5pc1NhbWVPckJlZm9yZShjdXJyZW50VGltZSk7XHJcblx0aWYgKGJvb2tpbmcuYXBwcm92ZWQpIHtcclxuXHRcdGlmIChoYXNQYXNzZWRGcm9tICYmICFoYXNQYXNzZWRUbykgc3RhdHVzID0gQm9va2luZ1N0YXR1cy5PTkdPSU5HO1xyXG5cdFx0ZWxzZSBpZiAoaGFzUGFzc2VkVG8pIHN0YXR1cyA9IEJvb2tpbmdTdGF0dXMuRklOSVNIRUQ7XHJcblx0XHRlbHNlIHN0YXR1cyA9IEJvb2tpbmdTdGF0dXMuQVBQUk9WRUQ7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmIChib29raW5nLmFwcHJvdmVkID09PSBudWxsKSB7XHJcblx0XHRcdGlmIChoYXNQYXNzZWRGcm9tKSBzdGF0dXMgPSBCb29raW5nU3RhdHVzLkVYUElSRUQ7XHJcblx0XHRcdGVsc2Ugc3RhdHVzID0gQm9va2luZ1N0YXR1cy5QRU5ESU5HO1xyXG5cdFx0fSBlbHNlIGlmIChib29raW5nLmFwcHJvdmVkID09PSBmYWxzZSkgc3RhdHVzID0gQm9va2luZ1N0YXR1cy5ERU5JRUQ7XHJcblx0fVxyXG5cdHJldHVybiBzdGF0dXM7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaGFzQWN0aXZlQm9va2luZyA9IChcclxuXHRib29raW5nczogQXJyYXk8e1xyXG5cdFx0ZnJvbTogbnVtYmVyO1xyXG5cdFx0dG86IG51bWJlcjtcclxuXHRcdGFwcHJvdmVkOiBib29sZWFuIHwgbnVsbDtcclxuXHRcdGlkOiBudW1iZXI7XHJcblx0fT4sXHJcblx0Ym9va2luZ0lkPzogbnVtYmVyXHJcbik6IGJvb2xlYW4gPT4ge1xyXG5cdGxldCBhY3RpdmUgPSBmYWxzZTtcclxuXHRpZiAoYm9va2luZ3MpIHtcclxuXHRcdGZvciAoY29uc3QgYm9va2luZyBvZiBib29raW5ncykge1xyXG5cdFx0XHRsZXQgc3RhdHVzID0gZ2V0Qm9va2luZ1N0YXR1cyhib29raW5nKTtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHN0YXR1cyA9PT0gQm9va2luZ1N0YXR1cy5QRU5ESU5HIHx8XHJcblx0XHRcdFx0c3RhdHVzID09PSBCb29raW5nU3RhdHVzLk9OR09JTkcgfHxcclxuXHRcdFx0XHRzdGF0dXMgPT09IEJvb2tpbmdTdGF0dXMuQVBQUk9WRURcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0aWYgKCFib29raW5nSWQgfHwgYm9va2luZ0lkICE9PSBib29raW5nLmlkKSByZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gYWN0aXZlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzQm9va2luZ1RpbWVTbG90VGFrZW4gPSAoXHJcblx0Ym9va2luZ3M6IEFycmF5PHtcclxuXHRcdGZyb206IG51bWJlcjtcclxuXHRcdHRvOiBudW1iZXI7XHJcblx0XHRpZDogbnVtYmVyO1xyXG5cdH0+LFxyXG5cdGZyb206IG51bWJlcixcclxuXHR0bzogbnVtYmVyLFxyXG5cdGJvb2tpbmdJZD86IG51bWJlclxyXG4pOiBib29sZWFuID0+IHtcclxuXHRsZXQgdGFrZW4gPSBmYWxzZTtcclxuXHJcblx0Zm9yIChjb25zdCBib29raW5nIG9mIGJvb2tpbmdzKSB7XHJcblx0XHR0YWtlbiA9IHJhbmdlT3ZlcmxhcChmcm9tLCB0bywgYm9va2luZy5mcm9tLCBib29raW5nLnRvKTtcclxuXHRcdGlmICgodGFrZW4gJiYgIWJvb2tpbmdJZCkgfHwgYm9va2luZ0lkICE9PSBib29raW5nLmlkKSB7XHJcblx0XHRcdHJldHVybiB0YWtlbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YWtlbjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByYW5nZU92ZXJsYXAgPSAoXHJcblx0eDE6IG51bWJlcixcclxuXHR4MjogbnVtYmVyLFxyXG5cdHkxOiBudW1iZXIsXHJcblx0eTI6IG51bWJlclxyXG4pOiBib29sZWFuID0+IHtcclxuXHRyZXR1cm4gTWF0aC5tYXgoeDEsIHkxKSA8PSBNYXRoLm1pbih4MiwgeTIpO1xyXG59O1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vUm9sZVV0aWxzXCI7XHJcbiIsImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcGlsZSB9IGZyb20gXCJoYW5kbGViYXJzXCI7XHJcbmltcG9ydCBtam1sMmh0bWwgZnJvbSBcIm1qbWxcIjtcclxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xyXG5pbXBvcnQgU3RhdGljTWFwcyBmcm9tIFwic3RhdGljbWFwc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWdcIjtcclxuaW1wb3J0IHsgZ2V0U3RhdGljRmlsZXNQYXRoLCBtYWtlRGlyZWN0b3J5SWZOb3RFeGlzdCB9IGZyb20gXCIuLlwiO1xyXG5cclxuY29uc3QgeyBtYWlsLCBzZWNyZXRLZXkgfSA9IGNvbmZpZztcclxuXHJcbmNvbnN0IGdldFRlbXBsYXRlID0gKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cclxuXHRmcy5yZWFkRmlsZVN5bmMoXHJcblx0XHRwYXRoLnJlc29sdmUoYCR7X19kaXJuYW1lfS90ZW1wbGF0ZXMvJHtmaWxlTmFtZX0ubWptbGApLFxyXG5cdFx0XCJ1dGY4XCJcclxuXHQpO1xyXG5cclxuY29uc3QgZ2V0VHJhbnNwb3J0ID0gKCkgPT5cclxuXHRub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcblx0XHRhdXRoOiBtYWlsLmF1dGgsXHJcblx0XHRwb3J0OiBOdW1iZXIobWFpbC5wb3J0KSxcclxuXHRcdHNlY3VyZTogbWFpbC5zZWN1cmUsXHJcblx0XHRob3N0OiBtYWlsLmhvc3RcclxuXHR9KTtcclxuXHJcbmNvbnN0IGNvbXBpbGVUZW1wbGF0ZSA9IChtam1sOiBzdHJpbmcsIGNvbnRleHQ6IGFueSkgPT4gY29tcGlsZShtam1sKShjb250ZXh0KTtcclxuXHJcbmNvbnN0IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lID0gKHRpbWVzdGFtcDogbnVtYmVyLCB0aW1lWm9uZTogc3RyaW5nKSA9PiB7XHJcblx0cmV0dXJuIG1vbWVudCh0aW1lc3RhbXAsIFwiWFwiKVxyXG5cdFx0LnR6KHRpbWVab25lKVxyXG5cdFx0LmZvcm1hdChcIkxMTFwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUGFzc3dvcmRSZXNldFRva2VuID0gKHtcclxuXHRlbWFpbCxcclxuXHR1cmxcclxufToge1xyXG5cdGVtYWlsOiBzdHJpbmc7XHJcblx0dXJsOiBzdHJpbmc7XHJcbn0pOiBhbnkgPT4ge1xyXG5cdC8vIFNlbmQgZW1haWwgaW52aXRlXHJcblx0bGV0IHRva2VuID0gand0LnNpZ24oeyBlbWFpbCwgcGFzc3dvcmRSZXNldDogdHJ1ZSB9LCBzZWNyZXRLZXksIHtcclxuXHRcdGV4cGlyZXNJbjogXCIxaFwiXHJcblx0fSk7XHJcblx0cmV0dXJuIGdldFRyYW5zcG9ydCgpLnNlbmRNYWlsKHtcclxuXHRcdGZyb206IFwibm8tcmVwbHlAYXRzdWFlLm5ldFwiLFxyXG5cdFx0dG86IGVtYWlsLFxyXG5cdFx0c3ViamVjdDogXCJQYXNzd29yZCBSZXNldFwiLFxyXG5cdFx0aHRtbDogYDxoMT5IZWxsbzwvaDE+PGEgaHJlZj1cIiR7dXJsfT90b2tlbj0ke3Rva2VufVwiPkNsaWNrIGhlcmUgdG8gcmVzZXQgcGFzc3dvcmQhPC9hPmBcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kSW52aXRlID0gKHtcclxuXHRlbWFpbCxcclxuXHRjbGllbnRJZFxyXG59OiB7XHJcblx0ZW1haWw6IHN0cmluZztcclxuXHRjbGllbnRJZDogbnVtYmVyO1xyXG59KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuXHRjb25zdCB0cmFuc3BvcnRlciA9IGdldFRyYW5zcG9ydCgpO1xyXG5cdGxldCB0b2tlbiA9IGp3dC5zaWduKHsgZW1haWwsIGNsaWVudElkIH0sIHNlY3JldEtleSwgeyBleHBpcmVzSW46IFwiN2RcIiB9KTtcclxuXHRjb25zdCBjb21waWxlZCA9IGNvbXBpbGVUZW1wbGF0ZShnZXRUZW1wbGF0ZShcImludml0ZVwiKSwge1xyXG5cdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdHNpZ25VcExpbms6IGAke3Byb2Nlc3MuZW52LkNMSUVOVF9VUkx9L3NpZ251cD90b2tlbj0ke3Rva2VufWBcclxuXHR9KTtcclxuXHRjb25zdCB0ZW1wbGF0ZSA9IG1qbWwyaHRtbChjb21waWxlZCk7XHJcblx0Y29uc3QgbWFpbk9wdGlvbnMgPSB7XHJcblx0XHRmcm9tOiBcIkxlYXNlUGxhbiBSZW50YWxzIDxuby1yZXBseUBhdHN1YWUubmV0PlwiLFxyXG5cdFx0dG86IGVtYWlsLFxyXG5cdFx0c3ViamVjdDogXCJZb3UgYXJlIGludml0ZWQgdG8gTGVhc2VQbGFuIENhciBCb29raW5nIVwiLFxyXG5cdFx0aHRtbDogdGVtcGxhdGUuaHRtbFxyXG5cdH07XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haW5PcHRpb25zLCBmdW5jdGlvbihlcnIsIGluZm8pIHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoaW5mby5yZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRJbnZvaWNlID0gKHtcclxuXHRlbWFpbCxcclxuXHRhbW91bnQsXHJcblx0Y3VzdG9tZXJOYW1lLFxyXG5cdHZlaGljbGVOYW1lLFxyXG5cdGZyb20sXHJcblx0dG8sXHJcblx0Ym9va2luZ0lkLFxyXG5cdHRpbWVab25lXHJcbn06IHtcclxuXHRlbWFpbDogc3RyaW5nO1xyXG5cdGFtb3VudDogbnVtYmVyO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdHZlaGljbGVOYW1lOiBzdHJpbmc7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0Ym9va2luZ0lkOiBudW1iZXI7XHJcblx0dGltZVpvbmU6IHN0cmluZztcclxufSkgPT4ge1xyXG5cdGNvbnN0IHRyYW5zcG9ydGVyID0gZ2V0VHJhbnNwb3J0KCk7XHJcblx0Y29uc3QgY29tcGlsZWQgPSBjb21waWxlVGVtcGxhdGUoZ2V0VGVtcGxhdGUoXCJpbnZvaWNlXCIpLCB7XHJcblx0XHRjb21wYW55OiBcIkxlYXNlUGxhblwiLFxyXG5cdFx0Y3VzdG9tZXJOYW1lLFxyXG5cdFx0dmVoaWNsZU5hbWUsXHJcblx0XHRmcm9tOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZShmcm9tLCB0aW1lWm9uZSksXHJcblx0XHR0bzogZ2V0RGF0ZVN0cmluZ0Zyb21Vc2VyVGltZXpvbmUodG8sIHRpbWVab25lKSxcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdGFtb3VudCxcclxuXHRcdGJvb2tpbmdJZFxyXG5cdH0pO1xyXG5cdGNvbnN0IHRlbXBsYXRlID0gbWptbDJodG1sKGNvbXBpbGVkKTtcclxuXHRjb25zdCBtYWluT3B0aW9ucyA9IHtcclxuXHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHR0bzogZW1haWwsXHJcblx0XHRzdWJqZWN0OiBcIllvdXIgY2FyIGJvb2tpbmcgcmVjZWlwdCBpcyBoZXJlIVwiLFxyXG5cdFx0aHRtbDogdGVtcGxhdGUuaHRtbFxyXG5cdH07XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haW5PcHRpb25zLCBmdW5jdGlvbihlcnIsIGluZm8pIHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoaW5mby5yZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZW5kQm9va2luZ05vdGlmaWNhdGlvbk9wdGlvbnMge1xyXG5cdGVtYWlsOiBzdHJpbmc7XHJcblx0Y3VzdG9tZXJFbWFpbDogc3RyaW5nO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdG1vYmlsZTogc3RyaW5nO1xyXG5cdGJvb2tpbmdJZDogbnVtYmVyO1xyXG5cdGZyb206IG51bWJlcjtcclxuXHR0bzogbnVtYmVyO1xyXG5cdHZlaGljbGVJZDogbnVtYmVyO1xyXG5cdHZlaGljbGU6IHN0cmluZztcclxuXHRwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cdGxvY2F0aW9uOiBzdHJpbmc7XHJcblx0bGF0OiBudW1iZXI7XHJcblx0bG5nOiBudW1iZXI7XHJcblx0Y29tcGFueTogc3RyaW5nO1xyXG5cdHRpbWVab25lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kQm9va2luZ05vdGlmaWNhdGlvbiA9IGFzeW5jICh7XHJcblx0ZW1haWwsXHJcblx0Y3VzdG9tZXJFbWFpbCxcclxuXHRjdXN0b21lck5hbWUsXHJcblx0bW9iaWxlLFxyXG5cdGJvb2tpbmdJZCxcclxuXHRmcm9tLFxyXG5cdHRvLFxyXG5cdHZlaGljbGVJZCxcclxuXHR2ZWhpY2xlLFxyXG5cdHBsYXRlTnVtYmVyLFxyXG5cdGxvY2F0aW9uLFxyXG5cdGxhdCxcclxuXHRsbmcsXHJcblx0Y29tcGFueSxcclxuXHR0aW1lWm9uZVxyXG59OiBTZW5kQm9va2luZ05vdGlmaWNhdGlvbk9wdGlvbnMpID0+IHtcclxuXHRjb25zdCB0cmFuc3BvcnRlciA9IGdldFRyYW5zcG9ydCgpO1xyXG5cclxuXHRjb25zdCBtYXAgPSBuZXcgU3RhdGljTWFwcyh7XHJcblx0XHR3aWR0aDogMTIwMCxcclxuXHRcdGhlaWdodDogODAwLFxyXG5cdFx0dGlsZVVybDogXCJodHRwczovL21hcHMud2lraW1lZGlhLm9yZy9vc20taW50bC97en0ve3h9L3t5fS5wbmc/bGFuZz1lblwiXHJcblx0fSk7XHJcblx0bWFwLmFkZE1hcmtlcih7XHJcblx0XHRpbWc6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vcHVibGljL2ltYWdlcy9Mb2NhdGlvbk1hcmtlci5wbmdcIiksXHJcblx0XHRjb29yZDogW2xuZywgbGF0XSxcclxuXHRcdG9mZnNldFg6IDUwLFxyXG5cdFx0b2Zmc2V0WTogMTAwLFxyXG5cdFx0d2lkdGg6IDEwMCxcclxuXHRcdGhlaWdodDogMTAwXHJcblx0fSk7XHJcblx0YXdhaXQgbWFwLnJlbmRlcihbbG5nLCBsYXRdLCAxMCk7XHJcblx0Y29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oZ2V0U3RhdGljRmlsZXNQYXRoKCksIFwiL21hcHNcIik7XHJcblx0Y29uc3QgZmlsZU5hbWUgPSBgJHtEYXRlLm5vdygpfS5wbmdgO1xyXG5cdGNvbnN0IGZpbGVTYXZlUGF0aCA9IHBhdGguam9pbihmaWxlUGF0aCwgZmlsZU5hbWUpO1xyXG5cdGF3YWl0IG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0KGZpbGVQYXRoKTtcclxuXHRhd2FpdCBtYXAuaW1hZ2Uuc2F2ZShmaWxlU2F2ZVBhdGgpO1xyXG5cdGNvbnN0IGNvbXBpbGVkID0gY29tcGlsZVRlbXBsYXRlKGdldFRlbXBsYXRlKFwiYm9va2luZ05vdGlmaWNhdGlvblwiKSwge1xyXG5cdFx0Y3VzdG9tZXJFbWFpbCxcclxuXHRcdGN1c3RvbWVyTmFtZSxcclxuXHRcdG1vYmlsZSxcclxuXHRcdGJvb2tpbmdJZCxcclxuXHRcdGZyb206IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lKGZyb20sIHRpbWVab25lKSxcclxuXHRcdHRvOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZSh0bywgdGltZVpvbmUpLFxyXG5cdFx0dmVoaWNsZUlkLFxyXG5cdFx0dmVoaWNsZSxcclxuXHRcdHBsYXRlTnVtYmVyLFxyXG5cdFx0bG9jYXRpb24sXHJcblx0XHRsYXQsXHJcblx0XHRsbmcsXHJcblx0XHRjb21wYW55LFxyXG5cdFx0bWFwVVJMOiBgY2lkOiR7ZmlsZU5hbWV9YCxcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYFxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB0ZW1wbGF0ZSA9IG1qbWwyaHRtbChjb21waWxlZCk7XHJcblxyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHR0cmFuc3BvcnRlci5zZW5kTWFpbChcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHRcdFx0dG86IGVtYWlsLFxyXG5cdFx0XHRcdHN1YmplY3Q6IGBCb29raW5nIHJlcXVlc3Qgb24gJHt2ZWhpY2xlfWAsXHJcblx0XHRcdFx0aHRtbDogdGVtcGxhdGUuaHRtbCxcclxuXHRcdFx0XHRhdHRhY2htZW50czogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRmaWxlbmFtZTogXCJNYXAgTG9jYXRpb24ucG5nXCIsXHJcblx0XHRcdFx0XHRcdHBhdGg6IGZpbGVTYXZlUGF0aCxcclxuXHRcdFx0XHRcdFx0Y2lkOiBmaWxlTmFtZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb24oZXJyLCBpbmZvKSB7XHJcblx0XHRcdFx0ZnMucHJvbWlzZXMudW5saW5rKGZpbGVTYXZlUGF0aCk7XHJcblx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShpbmZvLnJlc3BvbnNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZEJvb2tpbmdDb25maXJtYXRpb24gPSBhc3luYyAoe1xyXG5cdGVtYWlsLFxyXG5cdGN1c3RvbWVyTmFtZSxcclxuXHR2ZWhpY2xlTmFtZSxcclxuXHRmcm9tLFxyXG5cdHRvLFxyXG5cdGJvb2tpbmdJZCxcclxuXHRwYXJraW5nTG9jYXRpb24sXHJcblx0bGF0LFxyXG5cdGxuZyxcclxuXHRhZGRyZXNzLFxyXG5cdHRpbWVab25lXHJcbn06IHtcclxuXHRlbWFpbDogc3RyaW5nO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdHZlaGljbGVOYW1lOiBzdHJpbmc7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0Ym9va2luZ0lkOiBudW1iZXI7XHJcblx0cGFya2luZ0xvY2F0aW9uOiBzdHJpbmc7XHJcblx0bGF0OiBudW1iZXI7XHJcblx0bG5nOiBudW1iZXI7XHJcblx0YWRkcmVzczogc3RyaW5nO1xyXG5cdHRpbWVab25lOiBzdHJpbmc7XHJcbn0pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG5cdGNvbnN0IHRyYW5zcG9ydGVyID0gZ2V0VHJhbnNwb3J0KCk7XHJcblxyXG5cdGNvbnN0IG1hcCA9IG5ldyBTdGF0aWNNYXBzKHtcclxuXHRcdHdpZHRoOiAxMjAwLFxyXG5cdFx0aGVpZ2h0OiA4MDAsXHJcblx0XHR0aWxlVXJsOiBcImh0dHBzOi8vbWFwcy53aWtpbWVkaWEub3JnL29zbS1pbnRsL3t6fS97eH0ve3l9LnBuZz9sYW5nPWVuXCJcclxuXHR9KTtcclxuXHRtYXAuYWRkTWFya2VyKHtcclxuXHRcdGltZzogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi9wdWJsaWMvaW1hZ2VzL0xvY2F0aW9uTWFya2VyLnBuZ1wiKSxcclxuXHRcdGNvb3JkOiBbbG5nLCBsYXRdLFxyXG5cdFx0b2Zmc2V0WDogNTAsXHJcblx0XHRvZmZzZXRZOiAxMDAsXHJcblx0XHR3aWR0aDogMTAwLFxyXG5cdFx0aGVpZ2h0OiAxMDBcclxuXHR9KTtcclxuXHRhd2FpdCBtYXAucmVuZGVyKFtsbmcsIGxhdF0sIDEwKTtcclxuXHRjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihnZXRTdGF0aWNGaWxlc1BhdGgoKSwgXCIvbWFwc1wiKTtcclxuXHRjb25zdCBmaWxlTmFtZSA9IGAke0RhdGUubm93KCl9LnBuZ2A7XHJcblx0Y29uc3QgZmlsZVNhdmVQYXRoID0gcGF0aC5qb2luKGZpbGVQYXRoLCBmaWxlTmFtZSk7XHJcblx0YXdhaXQgbWFrZURpcmVjdG9yeUlmTm90RXhpc3QoZmlsZVBhdGgpO1xyXG5cdGF3YWl0IG1hcC5pbWFnZS5zYXZlKGZpbGVTYXZlUGF0aCk7XHJcblx0Y29uc3QgY29tcGlsZWQgPSBjb21waWxlVGVtcGxhdGUoZ2V0VGVtcGxhdGUoXCJjb25maXJtQm9va2luZ1wiKSwge1xyXG5cdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdGJvb2tpbmdJZCxcclxuXHRcdGZyb206IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lKGZyb20sIHRpbWVab25lKSxcclxuXHRcdHRvOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZSh0bywgdGltZVpvbmUpLFxyXG5cdFx0dmVoaWNsZU5hbWUsXHJcblx0XHRjdXN0b21lck5hbWUsXHJcblx0XHRtYXBVUkw6IGBjaWQ6JHtmaWxlTmFtZX1gLFxyXG5cdFx0bGF0LFxyXG5cdFx0bG5nLFxyXG5cdFx0cGFya2luZ0xvY2F0aW9uLFxyXG5cdFx0YWRkcmVzc1xyXG5cdH0pO1xyXG5cdGNvbnN0IHRlbXBsYXRlID0gbWptbDJodG1sKGNvbXBpbGVkKTtcclxuXHRjb25zdCBtYWluT3B0aW9ucyA9IHtcclxuXHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHR0bzogZW1haWwsXHJcblx0XHRzdWJqZWN0OiBcIllvdXIgYm9va2luZyBoYXMgYmVlbiBjb25maXJtZWQhXCIsXHJcblx0XHRodG1sOiB0ZW1wbGF0ZS5odG1sLFxyXG5cdFx0YXR0YWNobWVudHM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpbGVuYW1lOiBcIk1hcCBMb2NhdGlvbi5wbmdcIixcclxuXHRcdFx0XHRwYXRoOiBmaWxlU2F2ZVBhdGgsXHJcblx0XHRcdFx0Y2lkOiBmaWxlTmFtZVxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fTtcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0dHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbk9wdGlvbnMsIGZ1bmN0aW9uKGVyciwgaW5mbykge1xyXG5cdFx0XHRmcy5wcm9taXNlcy51bmxpbmsoZmlsZVNhdmVQYXRoKTtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShpbmZvLnJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcbiIsImltcG9ydCBSQkFDLCB7IFJvbGUsIFJlc291cmNlLCBBY3Rpb24gfSBmcm9tIFwiLi4vcmJhY1wiO1xyXG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwiLi4vdmFyaWFibGVzL2VudW1zXCI7XHJcblxyXG5jb25zdCB7IFJFQUQsIFVQREFURSwgREVMRVRFLCBDUkVBVEUgfSA9IGVudW1zLk9wZXJhdGlvbjtcclxuY29uc3QgYWNjZXNzQ29udHJvbCA9IG5ldyBSQkFDKFwiQ2FyIEJvb2tpbmdcIik7XHJcbmNvbnN0IG1hc3RlclJvbGUgPSBuZXcgUm9sZShlbnVtcy5Sb2xlLk1BU1RFUik7XHJcbmNvbnN0IGFkbWluUm9sZSA9IG5ldyBSb2xlKGVudW1zLlJvbGUuQURNSU4pO1xyXG5jb25zdCBrZXlNYW5hZ2VyUm9sZSA9IG5ldyBSb2xlKGVudW1zLlJvbGUuS0VZX01BTkFHRVIpO1xyXG5jb25zdCBndWVzdFJvbGUgPSBuZXcgUm9sZShlbnVtcy5Sb2xlLkdVRVNUKTtcclxuXHJcbmNvbnN0IHZlaGljbGVzID0gbmV3IFJlc291cmNlKGVudW1zLlJlc291cmNlLlZFSElDTEVTKTtcclxuY29uc3QgbG9jYXRpb25zID0gbmV3IFJlc291cmNlKGVudW1zLlJlc291cmNlLkxPQ0FUSU9OUyk7XHJcbmNvbnN0IGJvb2tpbmdzID0gbmV3IFJlc291cmNlKGVudW1zLlJlc291cmNlLkJPT0tJTkdTKTtcclxuY29uc3QgdXNlcnMgPSBuZXcgUmVzb3VyY2UoZW51bXMuUmVzb3VyY2UuVVNFUlMpO1xyXG5jb25zdCBhY2NpZGVudHMgPSBuZXcgUmVzb3VyY2UoZW51bXMuUmVzb3VyY2UuQUNDSURFTlRTKTtcclxuY29uc3QgY2F0ZWdvcmllcyA9IG5ldyBSZXNvdXJjZShlbnVtcy5SZXNvdXJjZS5DQVRFR09SSUVTKTtcclxuY29uc3QgY2xpZW50cyA9IG5ldyBSZXNvdXJjZShlbnVtcy5SZXNvdXJjZS5DTElFTlRTKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBHVUVTVFMgUk9MRSBDT05GSUcgLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gQ1JFQVRFIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihcclxuXHRcdENSRUFURSxcclxuXHRcdGJvb2tpbmdzLFxyXG5cdFx0KHsgYWNjZXNzb3IsIGJvZHkgfTogYW55KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGFjY2Vzc29yLmlkICE9PSB1bmRlZmluZWQgJiYgYWNjZXNzb3IuaWQgPT09IGJvZHkudXNlcklkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRbXCJ1c2VySWRcIiwgXCJwYWlkXCIsIFwiY2xpZW50SWRcIl1cclxuXHQpXHJcbik7XHJcblxyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFxyXG5cdFx0Q1JFQVRFLFxyXG5cdFx0YWNjaWRlbnRzLFxyXG5cdFx0KHsgYWNjZXNzb3IsIGJvZHkgfTogYW55KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGFjY2Vzc29yLmlkICE9PSB1bmRlZmluZWQgJiYgYWNjZXNzb3IuaWQgPT09IGJvZHkudXNlcklkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRbXCJ1c2VySWRcIiwgXCJib29raW5nSWRcIiwgXCJjbGllbnRJZFwiXVxyXG5cdClcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyAgUkVBRCAgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmlkICYmIGFjY2Vzc29yLmlkID09PSB0YXJnZXQudXNlcklkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihcclxuXHRcdFJFQUQsXHJcblx0XHR2ZWhpY2xlcyxcclxuXHRcdCh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFtcImJvb2tpbmdDaGFyZ2VVbml0SWRcIiwgXCJib29raW5nQ2hhcmdlQ291bnRcIiwgXCJib29raW5nQ2hhcmdlXCJdXHJcblx0KVxyXG4pO1xyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFxyXG5cdFx0UkVBRCxcclxuXHRcdGxvY2F0aW9ucyxcclxuXHRcdCh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0YWNjZXNzb3IuY2xpZW50SWQgJiZcclxuXHRcdFx0XHRcdHRhcmdldC5jbGllbnRzLmZpbmQoY2xpZW50ID0+IGNsaWVudC5pZCA9PT0gYWNjZXNzb3IuY2xpZW50SWQpXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRbXCJjbGllbnRJZFwiXVxyXG5cdClcclxuKTtcclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihcclxuXHRcdFJFQUQsXHJcblx0XHRjYXRlZ29yaWVzLFxyXG5cdFx0KHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0W1wiY2xpZW50SWRcIl1cclxuXHQpXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gVVBEQVRFIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihVUERBVEUsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmlkID09PSB0YXJnZXQudXNlcklkICYmIHRhcmdldC5hcHByb3ZlZCA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vIERFTEVURSAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oREVMRVRFLCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5pZCA9PT0gdGFyZ2V0LnVzZXJJZCAmJiB0YXJnZXQuYXBwcm92ZWQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIEtFWV9NQU5BR0VSIFJPTEUgQ09ORklHIC8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gIFJFQUQgIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQudXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgdXNlcnMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgdmVoaWNsZXMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgYWNjaWRlbnRzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGxvY2F0aW9ucywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRhY2Nlc3Nvci5jbGllbnRJZCAmJlxyXG5cdFx0XHRcdHRhcmdldC5jbGllbnRzLmZpbmQoY2xpZW50ID0+IGNsaWVudC5pZCA9PT0gYWNjZXNzb3IuY2xpZW50SWQpXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgY2F0ZWdvcmllcywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyBVUERBVEUgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oXHJcblx0XHRVUERBVEUsXHJcblx0XHR2ZWhpY2xlcyxcclxuXHRcdCh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFtcImNhdGVnb3JpZXNcIiwgXCJvYmplY3RJZFwiLCBcInBsYXRlTnVtYmVyXCIsIFwidmluXCIsIFwid2lhbG9uVW5pdElkXCJdXHJcblx0KVxyXG4pO1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFVQREFURSwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC51c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihVUERBVEUsIGFjY2lkZW50cywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyBERUxFVEUgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oREVMRVRFLCBhY2NpZGVudHMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0YWNjZXNzb3IuY2xpZW50SWQgJiZcclxuXHRcdFx0XHRhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkICYmXHJcblx0XHRcdFx0dGFyZ2V0LmFwcHJvdmVkID09PSBmYWxzZVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gQURNSU4gUk9MRSBDT05GSUcgLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyBDUkVBVEUgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKENSRUFURSwgdXNlcnMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKENSRUFURSwgY2F0ZWdvcmllcywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyAgUkVBRCAgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQudXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFVQREFURSwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC51c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgbG9jYXRpb25zLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdGFjY2Vzc29yLmNsaWVudElkICYmXHJcblx0XHRcdFx0dGFyZ2V0LmNsaWVudHMuZmluZChjbGllbnQgPT4gY2xpZW50LmlkID09PSBhY2Nlc3Nvci5jbGllbnRJZClcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgdXNlcnMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIHZlaGljbGVzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBhY2NpZGVudHMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGNhdGVnb3JpZXMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gVVBEQVRFIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihVUERBVEUsIHVzZXJzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihcclxuXHRcdFVQREFURSxcclxuXHRcdHZlaGljbGVzLFxyXG5cdFx0KHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0W1wib2JqZWN0SWRcIiwgXCJwbGF0ZU51bWJlclwiLCBcInZpblwiLCBcIndpYWxvblVuaXRJZFwiXVxyXG5cdClcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oVVBEQVRFLCBhY2NpZGVudHMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFVQREFURSwgY2F0ZWdvcmllcywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyAgREVMRVRFICAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oREVMRVRFLCBjYXRlZ29yaWVzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihERUxFVEUsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdGFjY2Vzc29yLmNsaWVudElkICYmXHJcblx0XHRcdFx0YWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC51c2VyLmNsaWVudElkICYmXHJcblx0XHRcdFx0dGFyZ2V0LmFwcHJvdmVkID09PSBmYWxzZVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIE1BU1RFUiBST0xFIENPTkZJRyAvL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKENSRUFURSwgdXNlcnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oQ1JFQVRFLCB2ZWhpY2xlcykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihDUkVBVEUsIGNsaWVudHMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oQ1JFQVRFLCBsb2NhdGlvbnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oQ1JFQVRFLCBjYXRlZ29yaWVzKSk7XHJcblxyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihSRUFELCB1c2VycykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihSRUFELCB2ZWhpY2xlcykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihSRUFELCBib29raW5ncykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihSRUFELCBjbGllbnRzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFJFQUQsIGFjY2lkZW50cykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihSRUFELCBsb2NhdGlvbnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oUkVBRCwgY2F0ZWdvcmllcykpO1xyXG5cclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oVVBEQVRFLCB1c2VycykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihVUERBVEUsIHZlaGljbGVzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFVQREFURSwgYm9va2luZ3MpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oVVBEQVRFLCBjbGllbnRzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFVQREFURSwgYWNjaWRlbnRzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFVQREFURSwgbG9jYXRpb25zKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFVQREFURSwgY2F0ZWdvcmllcykpO1xyXG5cclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oREVMRVRFLCB1c2VycykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihERUxFVEUsIHZlaGljbGVzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKERFTEVURSwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAodGFyZ2V0LmFwcHJvdmVkID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKERFTEVURSwgY2xpZW50cykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihERUxFVEUsIGFjY2lkZW50cykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihERUxFVEUsIGxvY2F0aW9ucykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihERUxFVEUsIGNhdGVnb3JpZXMpKTtcclxuXHJcbmFjY2Vzc0NvbnRyb2wuYWRkUm9sZShtYXN0ZXJSb2xlKTtcclxuYWNjZXNzQ29udHJvbC5hZGRSb2xlKGFkbWluUm9sZSk7XHJcbmFjY2Vzc0NvbnRyb2wuYWRkUm9sZShrZXlNYW5hZ2VyUm9sZSk7XHJcbmFjY2Vzc0NvbnRyb2wuYWRkUm9sZShndWVzdFJvbGUpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWNjZXNzQ29udHJvbDtcclxuXHJcbmV4cG9ydCBjb25zdCByb2xlcyA9IHtcclxuXHRhZG1pbjogYWRtaW5Sb2xlLFxyXG5cdGtleU1hbmFnZXI6IGtleU1hbmFnZXJSb2xlLFxyXG5cdGd1ZXN0OiBndWVzdFJvbGUsXHJcblx0bWFzdGVyOiBtYXN0ZXJSb2xlXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb3VyY2VzID0ge1xyXG5cdGJvb2tpbmdzLFxyXG5cdHZlaGljbGVzLFxyXG5cdGxvY2F0aW9ucyxcclxuXHR1c2VycyxcclxuXHRhY2NpZGVudHMsXHJcblx0Y2F0ZWdvcmllcyxcclxuXHRjbGllbnRzXHJcbn07XHJcbiIsImVudW0gQm9va2luZ0NoYXJnZVVuaXQge1xyXG5cdEtJTE9NRVRFUiA9IFwiS21cIixcclxuXHRTRUNPTkQgPSBcIlNlY29uZFwiLFxyXG5cdEhPVVIgPSBcIkhvdXJcIixcclxuXHREQVkgPSBcIkRheVwiLFxyXG5cdFdFRUsgPSBcIldlZWtcIixcclxuXHRNT05USCA9IFwiTW9udGhcIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCb29raW5nQ2hhcmdlVW5pdDtcclxuIiwiZW51bSBCb29raW5nU3RhdHVzIHtcclxuXHRVTktOT1dOID0gXCJVTktOT1dOXCIsXHJcblx0T05HT0lORyA9IFwiT05HT0lOR1wiLFxyXG5cdEZJTklTSEVEID0gXCJGSU5JU0hFRFwiLFxyXG5cdEFQUFJPVkVEID0gXCJBUFBST1ZFRFwiLFxyXG5cdEVYUElSRUQgPSBcIkVYUElSRURcIixcclxuXHRERU5JRUQgPSBcIkRFTklFRFwiLFxyXG5cdFBFTkRJTkcgPSBcIlBFTkRJTkdcIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCb29raW5nU3RhdHVzO1xyXG4iLCJlbnVtIEJvb2tpbmdUeXBlIHtcclxuXHRQUklWQVRFID0gXCJQUklWQVRFXCIsXHJcblx0QlVTSU5FU1MgPSBcIkJVU0lORVNTXCIsXHJcblx0U0VSVklDRSA9IFwiU0VSVklDRVwiLFxyXG5cdFJFUExBQ0VNRU5UID0gXCJSRVBMQUNFTUVOVFwiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJvb2tpbmdUeXBlO1xyXG4iLCJlbnVtIE9wZXJhdGlvbiB7XHJcblx0UkVBRCA9IFwiUkVBRFwiLFxyXG5cdFVQREFURSA9IFwiVVBEQVRFXCIsXHJcblx0REVMRVRFID0gXCJERUxFVEVcIixcclxuXHRDUkVBVEUgPSBcIkNSRUFURVwiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9wZXJhdGlvbjtcclxuIiwiZW51bSBSZXNvdXJjZSB7XHJcblx0Qk9PS0lOR1MgPSBcIkJPT0tJTkdTXCIsXHJcblx0TE9DQVRJT05TID0gXCJMT0NBVElPTlNcIixcclxuXHRWRUhJQ0xFUyA9IFwiVkVISUNMRVNcIixcclxuXHRVU0VSUyA9IFwiVVNFUlNcIixcclxuXHRFTlVNUyA9IFwiRU5VTVNcIixcclxuXHRJTlZJVEVTID0gXCJJTlZJVEVTXCIsXHJcblx0QUNDSURFTlRTID0gXCJBQ0NJREVOVFNcIixcclxuXHRDTElFTlRTID0gXCJDTElFTlRTXCIsXHJcblx0Q0FURUdPUklFUyA9IFwiQ0FURUdPUklFU1wiXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlc291cmNlO1xyXG4iLCJlbnVtIFJvbGUge1xyXG5cdE1BU1RFUiA9IFwiTUFTVEVSXCIsXHJcblx0QURNSU4gPSBcIkFETUlOXCIsXHJcblx0S0VZX01BTkFHRVIgPSBcIktFWV9NQU5BR0VSXCIsXHJcblx0R1VFU1QgPSBcIkdVRVNUXCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9sZTtcclxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBPcGVyYXRpb24gfSBmcm9tIFwiLi9PcGVyYXRpb25cIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZXNvdXJjZSB9IGZyb20gXCIuL1Jlc291cmNlXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUm9sZSB9IGZyb20gXCIuL1JvbGVcIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb29raW5nVHlwZSB9IGZyb20gXCIuL0Jvb2tpbmdUeXBlXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQm9va2luZ1N0YXR1cyB9IGZyb20gXCIuL0Jvb2tpbmdTdGF0dXNcIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb29raW5nQ2hhcmdlVW5pdCB9IGZyb20gXCIuL0Jvb2tpbmdDaGFyZ2VVbml0XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1zZXNzaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtam1sXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnQtdGltZXpvbmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtd2lhbG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGVtYWlsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RhdGljbWFwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieXVwXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=