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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(3);
const bcryptjs_1 = __importDefault(__webpack_require__(11));
const config_1 = __importDefault(__webpack_require__(12));
const typings_1 = __webpack_require__(2);
const Accident_1 = __webpack_require__(31);
const AccidentUserStatus_1 = __webpack_require__(32);
const Booking_1 = __webpack_require__(33);
const Category_1 = __webpack_require__(34);
const Client_1 = __webpack_require__(35);
const ClientLocation_1 = __webpack_require__(36);
const Location_1 = __webpack_require__(37);
const ReplaceVehicle_1 = __webpack_require__(38);
const User_1 = __webpack_require__(39);
const UserVehicleCategory_1 = __webpack_require__(40);
const Vehicle_1 = __webpack_require__(41);
const VehicleCategory_1 = __webpack_require__(42);
const VehicleIssue_1 = __webpack_require__(43);
__export(__webpack_require__(31));
__export(__webpack_require__(32));
__export(__webpack_require__(33));
__export(__webpack_require__(34));
__export(__webpack_require__(35));
__export(__webpack_require__(36));
__export(__webpack_require__(37));
__export(__webpack_require__(38));
__export(__webpack_require__(39));
__export(__webpack_require__(40));
__export(__webpack_require__(41));
__export(__webpack_require__(42));
__export(__webpack_require__(43));
const sequelize = new sequelize_typescript_1.Sequelize(config_1.default.database.name, config_1.default.database.username, config_1.default.database.password, {
    logging:  false ? undefined : false,
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(__webpack_require__(30));
const path_1 = __importDefault(__webpack_require__(16));
const fs_1 = __importDefault(__webpack_require__(26));
const lodash_1 = __importDefault(__webpack_require__(27));
const url_1 = __webpack_require__(52);
const typings_1 = __webpack_require__(2);
var ResponseBuilder_1 = __webpack_require__(58);
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
__export(__webpack_require__(67));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(53));
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("sequelize-typescript");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(62));
__export(__webpack_require__(63));
__export(__webpack_require__(64));
__export(__webpack_require__(65));
__export(__webpack_require__(66));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InvalidPermissionException_1 = __webpack_require__(59);
exports.InvalidPermissionException = InvalidPermissionException_1.default;
var ResourceNotFoundException_1 = __webpack_require__(60);
exports.ResourceNotFoundException = ResourceNotFoundException_1.default;
var InvalidInputException_1 = __webpack_require__(61);
exports.InvalidInputException = InvalidInputException_1.default;


/***/ }),
/* 8 */
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
const rbac_1 = __importStar(__webpack_require__(77));
const enums = __importStar(__webpack_require__(2));
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(85));
__export(__webpack_require__(91));
__export(__webpack_require__(45));
var API_OPERATION;
(function (API_OPERATION) {
    API_OPERATION["CREATE"] = "CREATE";
    API_OPERATION["DELETE"] = "DELETE";
    API_OPERATION["UPDATE"] = "UPDATE";
    API_OPERATION["READ"] = "READ";
})(API_OPERATION = exports.API_OPERATION || (exports.API_OPERATION = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rbac_1 = __importDefault(__webpack_require__(8));
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
/* 11 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __webpack_require__(76);
exports.User = User_1.default;
var Booking_1 = __webpack_require__(78);
exports.Booking = Booking_1.default;
var Vehicle_1 = __webpack_require__(79);
exports.Vehicle = Vehicle_1.default;
var Location_1 = __webpack_require__(80);
exports.Location = Location_1.default;
var Client_1 = __webpack_require__(81);
exports.Client = Client_1.default;
var Accident_1 = __webpack_require__(82);
exports.Accident = Accident_1.default;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("node-wialon");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(26));
const path_1 = __importDefault(__webpack_require__(16));
const handlebars_1 = __webpack_require__(70);
const mjml_1 = __importDefault(__webpack_require__(71));
const nodemailer_1 = __importDefault(__webpack_require__(72));
const jsonwebtoken_1 = __importDefault(__webpack_require__(28));
const moment_timezone_1 = __importDefault(__webpack_require__(30));
const staticmaps_1 = __importDefault(__webpack_require__(73));
const config_1 = __importDefault(__webpack_require__(12));
const __1 = __webpack_require__(1);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(26));
const utils_1 = __webpack_require__(1);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(1);
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(__webpack_require__(16));
const multer_1 = __importDefault(__webpack_require__(75));
const utils_1 = __webpack_require__(1);
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(9);
__export(__webpack_require__(86));
__export(__webpack_require__(88));
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
/* 25 */
/***/ (function(module, exports) {

module.exports = require("yup");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 31 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 32 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 33 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
const typings_1 = __webpack_require__(2);
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
/* 34 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 35 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 36 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 37 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 38 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 39 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
const typings_1 = __webpack_require__(2);
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
/* 40 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 41 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
const typings_1 = __webpack_require__(2);
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
/* 42 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 43 */
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
const sequelize_typescript_1 = __webpack_require__(3);
const _1 = __webpack_require__(0);
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = __webpack_require__(25);
const exceptions_1 = __webpack_require__(5);
__export(__webpack_require__(89));
__export(__webpack_require__(90));
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
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
const dotenv_1 = __importDefault(__webpack_require__(47));
dotenv_1.default.config();
const express_1 = __importDefault(__webpack_require__(4));
const passport_1 = __importDefault(__webpack_require__(29));
const passport_local_1 = __webpack_require__(48);
const bcryptjs_1 = __importDefault(__webpack_require__(11));
const cors_1 = __importDefault(__webpack_require__(49));
const path_1 = __importDefault(__webpack_require__(16));
const body_parser_1 = __importDefault(__webpack_require__(50));
const express_session_1 = __importDefault(__webpack_require__(51));
const utils_1 = __webpack_require__(1);
const typings_1 = __webpack_require__(2);
const config_1 = __importDefault(__webpack_require__(12));
const models_1 = __webpack_require__(0);
const auth_1 = __importDefault(__webpack_require__(68));
const users_1 = __importDefault(__webpack_require__(74));
const invites_1 = __importDefault(__webpack_require__(83));
const vehicles_1 = __importDefault(__webpack_require__(84));
const bookings_1 = __importDefault(__webpack_require__(92));
const locations_1 = __importDefault(__webpack_require__(93));
const accidents_1 = __importDefault(__webpack_require__(94));
const categories_1 = __importDefault(__webpack_require__(95));
const clients_1 = __importDefault(__webpack_require__(96));
const vehicleIssues_1 = __importDefault(__webpack_require__(97));
const wialon_1 = __importDefault(__webpack_require__(98));
const reports_1 = __importDefault(__webpack_require__(99));
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
/* 47 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(54));
__export(__webpack_require__(55));
__export(__webpack_require__(56));
__export(__webpack_require__(57));


/***/ }),
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __webpack_require__(7);
const exceptions_2 = __webpack_require__(5);
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(5);
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(5);
class DataBaseException extends _1.ApiException {
    constructor(message) {
        super(message);
    }
}
exports.DataBaseException = DataBaseException;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(5);
class InvalidPermissionException extends _1.ApiException {
    constructor(message) {
        super(message);
    }
}
exports.InvalidPermissionException = InvalidPermissionException;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(5);
class ItemNotFoundException extends _1.DataBaseException {
    constructor(message) {
        super(message);
    }
}
exports.ItemNotFoundException = ItemNotFoundException;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = __webpack_require__(2);
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const passport_1 = __importDefault(__webpack_require__(29));
const express_1 = __importDefault(__webpack_require__(4));
const moment_1 = __importDefault(__webpack_require__(17));
const bcryptjs_1 = __importDefault(__webpack_require__(11));
const jsonwebtoken_1 = __importDefault(__webpack_require__(28));
const express_validator_1 = __webpack_require__(69);
const utils_1 = __webpack_require__(1);
const mail_1 = __webpack_require__(18);
const models_1 = __importDefault(__webpack_require__(0));
const requireLogin_1 = __importDefault(__webpack_require__(6));
const config_1 = __importDefault(__webpack_require__(12));
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
/* 69 */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("mjml");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("staticmaps");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const bcryptjs_1 = __importDefault(__webpack_require__(11));
const jsonwebtoken_1 = __importDefault(__webpack_require__(28));
const deleteReplacedFiles_1 = __webpack_require__(19);
const deleteFileOnError_1 = __importDefault(__webpack_require__(20));
const requireLogin_1 = __importDefault(__webpack_require__(6));
const disallowGuests_1 = __importDefault(__webpack_require__(21));
const parseBody_1 = __importDefault(__webpack_require__(22));
const multerUpload_1 = __importDefault(__webpack_require__(23));
const models_1 = __importDefault(__webpack_require__(0));
const utils_1 = __webpack_require__(1);
const config_1 = __importDefault(__webpack_require__(12));
const datasource_1 = __webpack_require__(13);
const exceptions_1 = __webpack_require__(7);
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
/* 75 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(__webpack_require__(11));
const DataSource_1 = __importDefault(__webpack_require__(10));
const typings_1 = __webpack_require__(2);
const rbac_1 = __importDefault(__webpack_require__(8));
const utils_1 = __webpack_require__(1);
const exceptions_1 = __webpack_require__(7);
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
/* 77 */
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_wialon_1 = __webpack_require__(14);
const sequelize_1 = __webpack_require__(15);
const DataSource_1 = __importDefault(__webpack_require__(10));
const typings_1 = __webpack_require__(2);
const rbac_1 = __importDefault(__webpack_require__(8));
const exceptions_1 = __webpack_require__(7);
const utils_1 = __webpack_require__(1);
const typings_2 = __webpack_require__(2);
const models_1 = __webpack_require__(0);
const mail_1 = __webpack_require__(18);
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(__webpack_require__(10));
const typings_1 = __webpack_require__(2);
const rbac_1 = __importDefault(__webpack_require__(8));
const exceptions_1 = __webpack_require__(7);
const utils_1 = __webpack_require__(1);
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(__webpack_require__(10));
const typings_1 = __webpack_require__(2);
const rbac_1 = __importDefault(__webpack_require__(8));
const exceptions_1 = __webpack_require__(7);
const models_1 = __webpack_require__(0);
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __webpack_require__(15);
const lodash_1 = __importDefault(__webpack_require__(27));
const DataSource_1 = __importDefault(__webpack_require__(10));
const models_1 = __webpack_require__(0);
const typings_1 = __webpack_require__(2);
const rbac_1 = __importDefault(__webpack_require__(8));
const exceptions_1 = __webpack_require__(7);
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = __importDefault(__webpack_require__(10));
const typings_1 = __webpack_require__(2);
const rbac_1 = __importDefault(__webpack_require__(8));
const exceptions_1 = __webpack_require__(7);
const utils_1 = __webpack_require__(1);
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const utils_1 = __webpack_require__(1);
const mail_1 = __webpack_require__(18);
const requireLogin_1 = __importDefault(__webpack_require__(6));
const disallowGuests_1 = __importDefault(__webpack_require__(21));
const models_1 = __importDefault(__webpack_require__(0));
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
/* 84 */
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
const express_1 = __importDefault(__webpack_require__(4));
const node_wialon_1 = __webpack_require__(14);
const requireLogin_1 = __importDefault(__webpack_require__(6));
const deleteReplacedFiles_1 = __webpack_require__(19);
const disallowGuests_1 = __importDefault(__webpack_require__(21));
const parseBody_1 = __importDefault(__webpack_require__(22));
const multerUpload_1 = __importDefault(__webpack_require__(23));
const deleteFileOnError_1 = __importDefault(__webpack_require__(20));
const models_1 = __importStar(__webpack_require__(0));
const typings_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(1);
const api_1 = __webpack_require__(9);
const datasource_1 = __webpack_require__(13); // Deprecate
const moment_1 = __importDefault(__webpack_require__(17));
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_wialon_1 = __webpack_require__(14);
const sequelize_1 = __webpack_require__(15);
const moment_1 = __importDefault(__webpack_require__(17));
const validators_1 = __webpack_require__(24);
const typings_1 = __webpack_require__(2);
const models_1 = __webpack_require__(0);
const exceptions_1 = __webpack_require__(5);
const _1 = __webpack_require__(9);
const utils_1 = __webpack_require__(44);
const Collection_1 = __webpack_require__(45);
const mail_1 = __webpack_require__(18);
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
/* 86 */
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
const yup = __importStar(__webpack_require__(25));
const moment_1 = __importDefault(__webpack_require__(17));
const models_1 = __webpack_require__(0);
const typings_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(87);
const utils_2 = __webpack_require__(1);
const __1 = __webpack_require__(9);
const _1 = __webpack_require__(24);
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
/* 87 */
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
const yup = __importStar(__webpack_require__(25));
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
/* 88 */
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
const Yup = __importStar(__webpack_require__(25));
const __1 = __webpack_require__(9);
const _1 = __webpack_require__(24);
const typings_1 = __webpack_require__(2);
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __webpack_require__(5);
const exceptions_2 = __webpack_require__(5);
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __webpack_require__(5);
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __webpack_require__(15);
const lodash_1 = __importDefault(__webpack_require__(27));
const models_1 = __webpack_require__(0);
const typings_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(1);
const exceptions_1 = __webpack_require__(5);
const validators_1 = __webpack_require__(24);
const utils_2 = __webpack_require__(44);
const _1 = __webpack_require__(9);
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const requireLogin_1 = __importDefault(__webpack_require__(6));
const api_1 = __webpack_require__(9);
const utils_1 = __webpack_require__(1);
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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const requireLogin_1 = __importDefault(__webpack_require__(6));
const disallowGuests_1 = __importDefault(__webpack_require__(21));
const parseBody_1 = __importDefault(__webpack_require__(22));
const deleteFileOnError_1 = __importDefault(__webpack_require__(20));
const deleteReplacedFiles_1 = __webpack_require__(19);
const multerUpload_1 = __importDefault(__webpack_require__(23));
const models_1 = __importDefault(__webpack_require__(0));
const utils_1 = __webpack_require__(1);
const datasource_1 = __webpack_require__(13);
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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const requireLogin_1 = __importDefault(__webpack_require__(6));
const deleteReplacedFiles_1 = __webpack_require__(19);
const parseBody_1 = __importDefault(__webpack_require__(22));
const multerUpload_1 = __importDefault(__webpack_require__(23));
const deleteFileOnError_1 = __importDefault(__webpack_require__(20));
const models_1 = __importDefault(__webpack_require__(0));
const utils_1 = __webpack_require__(1);
const datasource_1 = __webpack_require__(13);
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const models_1 = __importDefault(__webpack_require__(0));
const utils_1 = __webpack_require__(1);
const requireLogin_1 = __importDefault(__webpack_require__(6));
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
/* 96 */
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
const express_1 = __importDefault(__webpack_require__(4));
const utils_1 = __webpack_require__(1);
const datasource_1 = __webpack_require__(13);
const models_1 = __importStar(__webpack_require__(0));
const requireLogin_1 = __importDefault(__webpack_require__(6));
const typings_1 = __webpack_require__(2);
const exceptions_1 = __webpack_require__(7);
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const models_1 = __importDefault(__webpack_require__(0));
const utils_1 = __webpack_require__(1);
const requireLogin_1 = __importDefault(__webpack_require__(6));
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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const node_wialon_1 = __webpack_require__(14);
const utils_1 = __webpack_require__(1);
const exceptions_1 = __webpack_require__(5);
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(4));
const node_wialon_1 = __webpack_require__(14);
const sequelize_1 = __webpack_require__(15);
const middlewares_1 = __webpack_require__(100);
const models_1 = __webpack_require__(0);
const utils_1 = __webpack_require__(1);
const typings_1 = __webpack_require__(2);
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(101));


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(1);
const utils_2 = __webpack_require__(1);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGluZ3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL2V4Y2VwdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci91dGlscy9yYmFjLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvZGF0YXNvdXJjZS9EYXRhU291cmNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9jb25maWcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtd2lhbG9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvbWFpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2Rpc2FsbG93R3Vlc3RzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcGFyc2VCb2R5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL3ZhbGlkYXRvcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwieXVwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC10aW1lem9uZVwiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0FjY2lkZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0FjY2lkZW50VXNlclN0YXR1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Cb29raW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NhdGVnb3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL0NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9DbGllbnRMb2NhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Mb2NhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9SZXBsYWNlVmVoaWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9Vc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kZWxzL1VzZXJWZWhpY2xlQ2F0ZWdvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvVmVoaWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZGVscy9WZWhpY2xlQ2F0ZWdvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9tb2RlbHMvVmVoaWNsZUlzc3VlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL0NvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwaW5ncy9lbnVtcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3R5cGluZ3MvZW51bXMvQm9va2luZ0NoYXJnZVVuaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC90eXBpbmdzL2VudW1zL0Jvb2tpbmdTdGF0dXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC90eXBpbmdzL2VudW1zL0Jvb2tpbmdUeXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvdHlwaW5ncy9lbnVtcy9Sb2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvUmVzcG9uc2VCdWlsZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvZXhjZXB0aW9ucy9JbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL2V4Y2VwdGlvbnMvUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL2V4Y2VwdGlvbnMvSW52YWxpZElucHV0RXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL2V4Y2VwdGlvbnMvQXBpRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL2V4Y2VwdGlvbnMvRm9ybUV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS9leGNlcHRpb25zL0RhdGFCYXNlRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL2V4Y2VwdGlvbnMvSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvZXhjZXB0aW9ucy9SZXNvdXJjZU5vdEZvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbHMvUm9sZVV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2F1dGgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzcy12YWxpZGF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWptbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGVtYWlsZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdGF0aWNtYXBzXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvdXNlcnMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibXVsdGVyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYXRhc291cmNlL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yYmFjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvZGF0YXNvdXJjZS9Cb29raW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvZGF0YXNvdXJjZS9WZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvZGF0YXNvdXJjZS9Mb2NhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RhdGFzb3VyY2UvQ2xpZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvZGF0YXNvdXJjZS9BY2NpZGVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9pbnZpdGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL3ZlaGljbGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL0Jvb2tpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdmFsaWRhdG9ycy9Cb29raW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL3ZhbGlkYXRvcnMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9hcGkvdmFsaWRhdG9ycy9WZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL3V0aWxzL0FwaUVycm9ySGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2FwaS91dGlscy9Gb3JtRXJyb3JCdWlsZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvYXBpL1ZlaGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvYm9va2luZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvbG9jYXRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2FjY2lkZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9jYXRlZ29yaWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm91dGVzL2NsaWVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvdmVoaWNsZUlzc3Vlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy93aWFsb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9yb3V0ZXMvcmVwb3J0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZXMvcmVxdWlyZVJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxzREFBaUQ7QUFDakQsNERBQThCO0FBRTlCLDBEQUErQjtBQUMvQix5Q0FBd0Q7QUFFeEQsMkNBQXNDO0FBQ3RDLHFEQUEwRDtBQUMxRCwwQ0FBb0M7QUFDcEMsMkNBQXNDO0FB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QUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNyRCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksYUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3JELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDcEQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUN0RCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksYUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFFdkQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwRCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksYUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN0RCxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksYUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3hELFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUV6RCxVQUFVLENBQUMsYUFB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QUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxzQkFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNsRSxJQUFJLFFBQVEsR0FBRyxJQUFJLHVCQUFlLEVBQUUsQ0FBQztJQUNyQyxNQUFNLEtBQUssR0FBRyxNQUFNLGdCQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEQsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsc0JBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM3RCxJQUFJLFFBQVEsR0FBRyxJQUFJLHVCQUFlLEVB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QUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNuQjtBQUNGLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDYpO1xuIiwiaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcclxuaW1wb3J0IHsgUm9sZSBhcyBSb2xlRW51bSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuaW1wb3J0IHsgQWNjaWRlbnQgfSBmcm9tIFwiLi9BY2NpZGVudFwiO1xyXG5pbXBvcnQgeyBBY2NpZGVudFVzZXJTdGF0dXMgfSBmcm9tIFwiLi9BY2NpZGVudFVzZXJTdGF0dXNcIjtcclxuaW1wb3J0IHsgQm9va2luZyB9IGZyb20gXCIuL0Jvb2tpbmdcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi9DbGllbnRcIjtcclxuaW1wb3J0IHsgQ2xpZW50TG9jYXRpb24gfSBmcm9tIFwiLi9DbGllbnRMb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCIuL0xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IFJlcGxhY2VWZWhpY2xlIH0gZnJvbSBcIi4vUmVwbGFjZVZlaGljbGVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuaW1wb3J0IHsgVXNlclZlaGljbGVDYXRlZ29yeSB9IGZyb20gXCIuL1VzZXJWZWhpY2xlQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgVmVoaWNsZSB9IGZyb20gXCIuL1ZlaGljbGVcIjtcclxuaW1wb3J0IHsgVmVoaWNsZUNhdGVnb3J5IH0gZnJvbSBcIi4vVmVoaWNsZUNhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFZlaGljbGVJc3N1ZSB9IGZyb20gXCIuL1ZlaGljbGVJc3N1ZVwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vQWNjaWRlbnRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQWNjaWRlbnRVc2VyU3RhdHVzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0Jvb2tpbmdcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQ2xpZW50XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0NsaWVudExvY2F0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0xvY2F0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1JlcGxhY2VWZWhpY2xlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1VzZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vVXNlclZlaGljbGVDYXRlZ29yeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1ZlaGljbGVDYXRlZ29yeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9WZWhpY2xlSXNzdWVcIjtcclxuXHJcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoXHJcblx0Y29uZmlnLmRhdGFiYXNlLm5hbWUsXHJcblx0Y29uZmlnLmRhdGFiYXNlLnVzZXJuYW1lLFxyXG5cdGNvbmZpZy5kYXRhYmFzZS5wYXNzd29yZCxcclxuXHR7XHJcblx0XHRsb2dnaW5nOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiID8gY29uc29sZS5sb2cgOiBmYWxzZSxcclxuXHRcdGhvc3Q6IGNvbmZpZy5kYXRhYmFzZS5ob3N0LFxyXG5cdFx0cG9ydDogcGFyc2VJbnQoY29uZmlnLmRhdGFiYXNlLnBvcnQpLFxyXG5cdFx0bW9kZWxzOiBbXHJcblx0XHRcdEFjY2lkZW50LFxyXG5cdFx0XHRBY2NpZGVudFVzZXJTdGF0dXMsXHJcblx0XHRcdEJvb2tpbmcsXHJcblx0XHRcdENhdGVnb3J5LFxyXG5cdFx0XHRDbGllbnQsXHJcblx0XHRcdENsaWVudExvY2F0aW9uLFxyXG5cdFx0XHRMb2NhdGlvbixcclxuXHRcdFx0UmVwbGFjZVZlaGljbGUsXHJcblx0XHRcdFVzZXIsXHJcblx0XHRcdFVzZXJWZWhpY2xlQ2F0ZWdvcnksXHJcblx0XHRcdFZlaGljbGUsXHJcblx0XHRcdFZlaGljbGVDYXRlZ29yeSxcclxuXHRcdFx0VmVoaWNsZUlzc3VlXHJcblx0XHRdLFxyXG5cdFx0Li4uY29uZmlnLmRhdGFiYXNlLnNlcXVlbGl6ZVxyXG5cdH1cclxuKTtcclxuXHJcbnNlcXVlbGl6ZVxyXG5cdC5hdXRoZW50aWNhdGUoKVxyXG5cdC50aGVuKCgpID0+IGluaXQoc2VxdWVsaXplLCB7IHN5bmM6IHt9IH0pKVxyXG5cdC50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBoYXMgYmVlbiBlc3RhYmxpc2hlZCBzdWNjZXNzZnVsbHkuXCIpKVxyXG5cdC5jYXRjaChlcnIgPT4ge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZVxcblwiLCBlcnIpO1xyXG5cdH0pO1xyXG5cclxuY29uc3QgaW5pdCA9IGFzeW5jIChzZXF1ZWxpemU6IFNlcXVlbGl6ZSwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRpZiAocGFyYW1zLnN5bmMpIHtcclxuXHRcdGF3YWl0IHNlcXVlbGl6ZS5zeW5jKHBhcmFtcy5zeW5jLm9wdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0bGV0IHVzZXJzID0gYXdhaXQgVXNlci5maW5kQWxsKCk7XHJcblxyXG5cdGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcclxuXHRcdC8vIENyZWF0ZSByb290IHVzZXIuLi5cclxuXHRcdGxldCByb290UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChjb25maWcuZGF0YWJhc2UucGFzc3dvcmQsIDEwKTtcclxuXHRcdGF3YWl0IFVzZXIuY3JlYXRlKHtcclxuXHRcdFx0dXNlcm5hbWU6IFwicm9vdFwiLFxyXG5cdFx0XHRwYXNzd29yZDogcm9vdFBhc3N3b3JkLFxyXG5cdFx0XHRmaXJzdE5hbWU6IFwiUm9vdFwiLFxyXG5cdFx0XHRsYXN0TmFtZTogXCJBY2NvdW50XCIsXHJcblx0XHRcdGVtYWlsOiBcInN1cHBvcnRAYXRzdWFlLm5ldFwiLFxyXG5cdFx0XHRyb2xlOiBSb2xlRW51bS5NQVNURVIsXHJcblx0XHRcdG1vYmlsZU51bWJlcjogXCJcIixcclxuXHRcdFx0YXBwcm92ZWQ6IHRydWVcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRBY2NpZGVudCxcclxuXHRBY2NpZGVudFVzZXJTdGF0dXMsXHJcblx0Qm9va2luZyxcclxuXHRDYXRlZ29yeSxcclxuXHRDbGllbnQsXHJcblx0Q2xpZW50TG9jYXRpb24sXHJcblx0TG9jYXRpb24sXHJcblx0UmVwbGFjZVZlaGljbGUsXHJcblx0VXNlcixcclxuXHRVc2VyVmVoaWNsZUNhdGVnb3J5LFxyXG5cdFZlaGljbGUsXHJcblx0VmVoaWNsZUNhdGVnb3J5LFxyXG5cdFZlaGljbGVJc3N1ZVxyXG59O1xyXG4iLCJpbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnQtdGltZXpvbmVcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgVVJMIH0gZnJvbSBcInVybFwiO1xyXG5cclxuaW1wb3J0IHsgRmxhdHRlbklmQXJyYXksQm9va2luZ1N0YXR1cyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi9SZXNwb25zZUJ1aWxkZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrQW5kTWVyZ2UgPSA8XHJcblx0VDEgZXh0ZW5kcyBvYmplY3QsXHJcblx0VDIgZXh0ZW5kcyBvYmplY3QsXHJcblx0SyBleHRlbmRzIGtleW9mIFQyXHJcbj4oXHJcblx0b2JqMTogVDEsXHJcblx0b2JqMjogVDIsXHJcblx0ZmllbGRzOiBLW10gPSBbXVxyXG4pOiBQaWNrPFQyLCBLPiAmIFQxID0+IHtcclxuXHRyZXR1cm4geyAuLi5vYmoxLCAuLi5fLnBpY2sob2JqMiwgZmllbGRzKSB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFycmF5ID0gPFQ+KGFycmF5OiBUKTogRmxhdHRlbklmQXJyYXk8VD5bXSA9PiB7XHJcblx0cmV0dXJuIGFycmF5IGluc3RhbmNlb2YgQXJyYXkgPyBhcnJheSA6IFtdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBpY2tGaWVsZHMgPSAodGFyZ2V0OiBvYmplY3QsIGZpZWxkczogc3RyaW5nW10pOiBvYmplY3QgPT4ge1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cdGZvciAobGV0IGtleSBpbiB0YXJnZXQpIHtcclxuXHRcdGlmIChmaWVsZHMuaW5kZXhPZihrZXkpID49IDApIHJlc3VsdFtrZXldID0gdGFyZ2V0W2tleV07XHJcblx0fVxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXhjZXB0RmllbGRzID0gKHRhcmdldDogb2JqZWN0LCBmaWVsZHM6IHN0cmluZ1tdKTogb2JqZWN0ID0+IHtcclxuXHRsZXQgcmVzdWx0ID0ge307XHJcblxyXG5cdGZvciAobGV0IGtleSBpbiB0YXJnZXQpIHtcclxuXHRcdGlmIChmaWVsZHMuaW5kZXhPZihrZXkpIDwgMCkgcmVzdWx0W2tleV0gPSB0YXJnZXRba2V5XTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29udmVydFNlcXVlbGl6ZURhdGVzVG9Vbml4ID0gKG9iajogYW55KTogdm9pZCA9PiB7XHJcblx0aWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblx0XHRmb3IgKGxldCB2YWx1ZSBvZiBvYmopIHtcclxuXHRcdFx0Y29udmVydFNlcXVlbGl6ZURhdGVzVG9Vbml4KHZhbHVlKTtcclxuXHRcdH1cclxuXHR9IGVsc2UgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRjb25zdCB2YWx1ZXMgPSBvYmouZGF0YVZhbHVlcyA/IG9iai5kYXRhVmFsdWVzIDogb2JqO1xyXG5cclxuXHRcdGZvciAobGV0IGtleSBpbiB2YWx1ZXMpIHtcclxuXHRcdFx0aWYgKHZhbHVlc1trZXldIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRcdHZhbHVlc1trZXldID0gbW9tZW50KHZhbHVlc1trZXldKS51bml4KCk7XHJcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlc1trZXldID09PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdFx0Y29udmVydFNlcXVlbGl6ZURhdGVzVG9Vbml4KHZhbHVlc1trZXldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzcWxEYXRlVG9Nb21lbnQgPSAoZGF0ZTogc3RyaW5nKTogTW9tZW50ID0+XHJcblx0bW9tZW50KGRhdGUsIFwiWVlZWS1NTS1ERFRISDptbTpzc1wiLCBcIlVUQ1wiKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b015U1FMRGF0ZSA9ICh1bml4UzogbnVtYmVyKTogc3RyaW5nID0+XHJcblx0bW9tZW50KHVuaXhTLCBcIlhcIikuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzc1wiKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b1VuaXggPSAoZGF0ZTogc3RyaW5nKTogbnVtYmVyID0+IHNxbERhdGVUb01vbWVudChkYXRlKS51bml4KCk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U3RhdGljRmlsZXNQYXRoID0gKCk6IHN0cmluZyA9PlxyXG5cdHBhdGguam9pbihwcm9jZXNzLmVudi5DQVJfUkVOVEFMX01BTkFHRU1FTlRfQVBJX1NUT1JBR0VfUEFUSCk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0RmlsZVVSTCA9IChmaWxlUGF0aDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nID0+XHJcblx0bmV3IFVSTChgJHtwcm9jZXNzLmVudi5TRVJWRVJfVVJMfS9zdGF0aWMvJHtmaWxlUGF0aH0vJHtmaWxlTmFtZX1gKS5ocmVmO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBhdGhGcm9tVVJMID0gKGZpbGVVUkw6IHN0cmluZyk6IHN0cmluZyA9PlxyXG5cdHBhdGguam9pbihcclxuXHRcdGdldFN0YXRpY0ZpbGVzUGF0aCgpLFxyXG5cdFx0ZmlsZVVSTC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpY2ApLCBcIlwiKVxyXG5cdCk7XHJcblxyXG5leHBvcnQgY29uc3QgbWFrZURpcmVjdG9yeUlmTm90RXhpc3QgPSAoZmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdGZzLm1rZGlyKGZpbGVQYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9LCBlcnIgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0cmVqZWN0KGVycik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzb2x2ZShmaWxlUGF0aCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUZpbGVGcm9tVXJsID0gKGZpbGVVcmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cclxuXHRmcy5wcm9taXNlcy51bmxpbmsoZ2V0UGF0aEZyb21VUkwoZmlsZVVybCkpO1xyXG5cclxudHlwZSBDb252ZXJ0ZWQ8VD4gPSB7XHJcblx0W1AgaW4ga2V5b2YgVF06IFRbUF0gZXh0ZW5kcyBEYXRlXHJcblx0XHQ/IG51bWJlclxyXG5cdFx0OiBUW1BdIGV4dGVuZHMgT2JqZWN0XHJcblx0XHQ/IENvbnZlcnRlZDxUW1BdPlxyXG5cdFx0OiBUW1BdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbnZlcnREYXRlc1RvVW5peCA9IDxUIGV4dGVuZHMgb2JqZWN0PihcclxuXHRvYmplY3Q6IFRcclxuKTogQ29udmVydGVkPFQ+ID0+IHtcclxuXHRjb25zdCBjbG9uZSA9IDxDb252ZXJ0ZWQ8VD4+Xy5jbG9uZURlZXAob2JqZWN0KTtcclxuXHJcblx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoY2xvbmUpKSB7XHJcblx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRcdGNsb25lW2tleV0gPSA8bnVtYmVyPm1vbWVudCh2YWx1ZSkudW5peCgpO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0Y29udmVydERhdGVzVG9Vbml4KHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBjbG9uZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCb29raW5nU3RhdHVzID0gKGJvb2tpbmc6IHtcclxuXHRmcm9tOiBudW1iZXI7XHJcblx0dG86IG51bWJlcjtcclxuXHRhcHByb3ZlZDogYm9vbGVhbiB8IG51bGw7XHJcbn0pOiBCb29raW5nU3RhdHVzID0+IHtcclxuXHRsZXQgc3RhdHVzID0gQm9va2luZ1N0YXR1cy5VTktOT1dOO1xyXG5cdGxldCBjdXJyZW50VGltZSA9IG1vbWVudCgpO1xyXG5cdGxldCBoYXNQYXNzZWRGcm9tID0gbW9tZW50KGJvb2tpbmcuZnJvbSwgXCJYXCIpLmlzU2FtZU9yQmVmb3JlKGN1cnJlbnRUaW1lKTtcclxuXHRsZXQgaGFzUGFzc2VkVG8gPSBtb21lbnQoYm9va2luZy50bywgXCJYXCIpLmlzU2FtZU9yQmVmb3JlKGN1cnJlbnRUaW1lKTtcclxuXHRpZiAoYm9va2luZy5hcHByb3ZlZCkge1xyXG5cdFx0aWYgKGhhc1Bhc3NlZEZyb20gJiYgIWhhc1Bhc3NlZFRvKSBzdGF0dXMgPSBCb29raW5nU3RhdHVzLk9OR09JTkc7XHJcblx0XHRlbHNlIGlmIChoYXNQYXNzZWRUbykgc3RhdHVzID0gQm9va2luZ1N0YXR1cy5GSU5JU0hFRDtcclxuXHRcdGVsc2Ugc3RhdHVzID0gQm9va2luZ1N0YXR1cy5BUFBST1ZFRDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0aWYgKGJvb2tpbmcuYXBwcm92ZWQgPT09IG51bGwpIHtcclxuXHRcdFx0aWYgKGhhc1Bhc3NlZEZyb20pIHN0YXR1cyA9IEJvb2tpbmdTdGF0dXMuRVhQSVJFRDtcclxuXHRcdFx0ZWxzZSBzdGF0dXMgPSBCb29raW5nU3RhdHVzLlBFTkRJTkc7XHJcblx0XHR9IGVsc2UgaWYgKGJvb2tpbmcuYXBwcm92ZWQgPT09IGZhbHNlKSBzdGF0dXMgPSBCb29raW5nU3RhdHVzLkRFTklFRDtcclxuXHR9XHJcblx0cmV0dXJuIHN0YXR1cztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYXNBY3RpdmVCb29raW5nID0gKFxyXG5cdGJvb2tpbmdzOiBBcnJheTx7XHJcblx0XHRmcm9tOiBudW1iZXI7XHJcblx0XHR0bzogbnVtYmVyO1xyXG5cdFx0YXBwcm92ZWQ6IGJvb2xlYW4gfCBudWxsO1xyXG5cdFx0aWQ6IG51bWJlcjtcclxuXHR9PixcclxuXHRib29raW5nSWQ/OiBudW1iZXJcclxuKTogYm9vbGVhbiA9PiB7XHJcblx0bGV0IGFjdGl2ZSA9IGZhbHNlO1xyXG5cdGlmIChib29raW5ncykge1xyXG5cdFx0Zm9yIChjb25zdCBib29raW5nIG9mIGJvb2tpbmdzKSB7XHJcblx0XHRcdGxldCBzdGF0dXMgPSBnZXRCb29raW5nU3RhdHVzKGJvb2tpbmcpO1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0c3RhdHVzID09PSBCb29raW5nU3RhdHVzLlBFTkRJTkcgfHxcclxuXHRcdFx0XHRzdGF0dXMgPT09IEJvb2tpbmdTdGF0dXMuT05HT0lORyB8fFxyXG5cdFx0XHRcdHN0YXR1cyA9PT0gQm9va2luZ1N0YXR1cy5BUFBST1ZFRFxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRpZiAoIWJvb2tpbmdJZCB8fCBib29raW5nSWQgIT09IGJvb2tpbmcuaWQpIHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBhY3RpdmU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNCb29raW5nVGltZVNsb3RUYWtlbiA9IChcclxuXHRib29raW5nczogQXJyYXk8e1xyXG5cdFx0ZnJvbTogbnVtYmVyO1xyXG5cdFx0dG86IG51bWJlcjtcclxuXHRcdGlkOiBudW1iZXI7XHJcblx0fT4sXHJcblx0ZnJvbTogbnVtYmVyLFxyXG5cdHRvOiBudW1iZXIsXHJcblx0Ym9va2luZ0lkPzogbnVtYmVyXHJcbik6IGJvb2xlYW4gPT4ge1xyXG5cdGxldCB0YWtlbiA9IGZhbHNlO1xyXG5cclxuXHRmb3IgKGNvbnN0IGJvb2tpbmcgb2YgYm9va2luZ3MpIHtcclxuXHRcdHRha2VuID0gcmFuZ2VPdmVybGFwKGZyb20sIHRvLCBib29raW5nLmZyb20sIGJvb2tpbmcudG8pO1xyXG5cdFx0aWYgKCh0YWtlbiAmJiAhYm9va2luZ0lkKSB8fCBib29raW5nSWQgIT09IGJvb2tpbmcuaWQpIHtcclxuXHRcdFx0cmV0dXJuIHRha2VuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRha2VuO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmdlT3ZlcmxhcCA9IChcclxuXHR4MTogbnVtYmVyLFxyXG5cdHgyOiBudW1iZXIsXHJcblx0eTE6IG51bWJlcixcclxuXHR5MjogbnVtYmVyXHJcbik6IGJvb2xlYW4gPT4ge1xyXG5cdHJldHVybiBNYXRoLm1heCh4MSwgeTEpIDw9IE1hdGgubWluKHgyLCB5Mik7XHJcbn07XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9Sb2xlVXRpbHNcIjtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZW51bXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbW9kZWxzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2FwaVwiO1xyXG5cclxuXHJcbi8vIFRPRE8gcmVtb3ZlIFJCQUNcclxuZXhwb3J0IGVudW0gT3BlcmF0aW9uIHtcclxuXHRSRUFEID0gXCJSRUFEXCIsXHJcblx0VVBEQVRFID0gXCJVUERBVEVcIixcclxuXHRERUxFVEUgPSBcIkRFTEVURVwiLFxyXG5cdENSRUFURSA9IFwiQ1JFQVRFXCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUmVzb3VyY2Uge1xyXG5cdEJPT0tJTkdTID0gXCJCT09LSU5HU1wiLFxyXG5cdExPQ0FUSU9OUyA9IFwiTE9DQVRJT05TXCIsXHJcblx0VkVISUNMRVMgPSBcIlZFSElDTEVTXCIsXHJcblx0VVNFUlMgPSBcIlVTRVJTXCIsXHJcblx0RU5VTVMgPSBcIkVOVU1TXCIsXHJcblx0SU5WSVRFUyA9IFwiSU5WSVRFU1wiLFxyXG5cdEFDQ0lERU5UUyA9IFwiQUNDSURFTlRTXCIsXHJcblx0Q0xJRU5UUyA9IFwiQ0xJRU5UU1wiLFxyXG5cdENBVEVHT1JJRVMgPSBcIkNBVEVHT1JJRVNcIlxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwiZXhwb3J0ICogZnJvbSBcIi4vQXBpRXhjZXB0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0Zvcm1FeGNlcHRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vRGF0YUJhc2VFeGNlcHRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vUmVzb3VyY2VOb3RGb3VuZFwiO1xyXG4iLCJpbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0aWYgKCFyZXEudXNlcikge1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQuIFBsZWFzZSBsb2dpbi5cIik7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKGZhbHNlKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH1cclxufVxyXG4iLCJleHBvcnQge1xyXG5cdGRlZmF1bHQgYXMgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb25cclxufSBmcm9tIFwiLi9JbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvblwiO1xyXG5leHBvcnQge1xyXG5cdGRlZmF1bHQgYXMgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuL1Jlc291cmNlTm90Rm91bmRFeGNlcHRpb25cIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnZhbGlkSW5wdXRFeGNlcHRpb24gfSBmcm9tIFwiLi9JbnZhbGlkSW5wdXRFeGNlcHRpb25cIjtcclxuIiwiaW1wb3J0IFJCQUMsIHsgUm9sZSwgUmVzb3VyY2UsIEFjdGlvbiB9IGZyb20gXCIuLi9yYmFjXCI7XHJcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuY29uc3QgeyBSRUFELCBVUERBVEUsIERFTEVURSwgQ1JFQVRFIH0gPSBlbnVtcy5PcGVyYXRpb247XHJcbmNvbnN0IGFjY2Vzc0NvbnRyb2wgPSBuZXcgUkJBQyhcIkNhciBCb29raW5nXCIpO1xyXG5jb25zdCBtYXN0ZXJSb2xlID0gbmV3IFJvbGUoZW51bXMuUm9sZS5NQVNURVIpO1xyXG5jb25zdCBhZG1pblJvbGUgPSBuZXcgUm9sZShlbnVtcy5Sb2xlLkFETUlOKTtcclxuY29uc3Qga2V5TWFuYWdlclJvbGUgPSBuZXcgUm9sZShlbnVtcy5Sb2xlLktFWV9NQU5BR0VSKTtcclxuY29uc3QgZ3Vlc3RSb2xlID0gbmV3IFJvbGUoZW51bXMuUm9sZS5HVUVTVCk7XHJcblxyXG5jb25zdCB2ZWhpY2xlcyA9IG5ldyBSZXNvdXJjZShlbnVtcy5SZXNvdXJjZS5WRUhJQ0xFUyk7XHJcbmNvbnN0IGxvY2F0aW9ucyA9IG5ldyBSZXNvdXJjZShlbnVtcy5SZXNvdXJjZS5MT0NBVElPTlMpO1xyXG5jb25zdCBib29raW5ncyA9IG5ldyBSZXNvdXJjZShlbnVtcy5SZXNvdXJjZS5CT09LSU5HUyk7XHJcbmNvbnN0IHVzZXJzID0gbmV3IFJlc291cmNlKGVudW1zLlJlc291cmNlLlVTRVJTKTtcclxuY29uc3QgYWNjaWRlbnRzID0gbmV3IFJlc291cmNlKGVudW1zLlJlc291cmNlLkFDQ0lERU5UUyk7XHJcbmNvbnN0IGNhdGVnb3JpZXMgPSBuZXcgUmVzb3VyY2UoZW51bXMuUmVzb3VyY2UuQ0FURUdPUklFUyk7XHJcbmNvbnN0IGNsaWVudHMgPSBuZXcgUmVzb3VyY2UoZW51bXMuUmVzb3VyY2UuQ0xJRU5UUyk7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gR1VFU1RTIFJPTEUgQ09ORklHIC8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vIENSRUFURSAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oXHJcblx0XHRDUkVBVEUsXHJcblx0XHRib29raW5ncyxcclxuXHRcdCh7IGFjY2Vzc29yLCBib2R5IH06IGFueSkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChhY2Nlc3Nvci5pZCAhPT0gdW5kZWZpbmVkICYmIGFjY2Vzc29yLmlkID09PSBib2R5LnVzZXJJZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0W1widXNlcklkXCIsIFwicGFpZFwiLCBcImNsaWVudElkXCJdXHJcblx0KVxyXG4pO1xyXG5cclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihcclxuXHRcdENSRUFURSxcclxuXHRcdGFjY2lkZW50cyxcclxuXHRcdCh7IGFjY2Vzc29yLCBib2R5IH06IGFueSkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChhY2Nlc3Nvci5pZCAhPT0gdW5kZWZpbmVkICYmIGFjY2Vzc29yLmlkID09PSBib2R5LnVzZXJJZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0W1widXNlcklkXCIsIFwiYm9va2luZ0lkXCIsIFwiY2xpZW50SWRcIl1cclxuXHQpXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gIFJFQUQgIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5pZCAmJiBhY2Nlc3Nvci5pZCA9PT0gdGFyZ2V0LnVzZXJJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oXHJcblx0XHRSRUFELFxyXG5cdFx0dmVoaWNsZXMsXHJcblx0XHQoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRbXCJib29raW5nQ2hhcmdlVW5pdElkXCIsIFwiYm9va2luZ0NoYXJnZUNvdW50XCIsIFwiYm9va2luZ0NoYXJnZVwiXVxyXG5cdClcclxuKTtcclxuZ3Vlc3RSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihcclxuXHRcdFJFQUQsXHJcblx0XHRsb2NhdGlvbnMsXHJcblx0XHQoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdGFjY2Vzc29yLmNsaWVudElkICYmXHJcblx0XHRcdFx0XHR0YXJnZXQuY2xpZW50cy5maW5kKGNsaWVudCA9PiBjbGllbnQuaWQgPT09IGFjY2Vzc29yLmNsaWVudElkKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0W1wiY2xpZW50SWRcIl1cclxuXHQpXHJcbik7XHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oXHJcblx0XHRSRUFELFxyXG5cdFx0Y2F0ZWdvcmllcyxcclxuXHRcdCh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFtcImNsaWVudElkXCJdXHJcblx0KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vIFVQREFURSAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmd1ZXN0Um9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oVVBEQVRFLCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5pZCA9PT0gdGFyZ2V0LnVzZXJJZCAmJiB0YXJnZXQuYXBwcm92ZWQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vL1xyXG4vLyBERUxFVEUgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5ndWVzdFJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKERFTEVURSwgYm9va2luZ3MsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuaWQgPT09IHRhcmdldC51c2VySWQgJiYgdGFyZ2V0LmFwcHJvdmVkID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBLRVlfTUFOQUdFUiBST0xFIENPTkZJRyAvL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vICBSRUFEICAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LnVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIHVzZXJzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIHZlaGljbGVzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGFjY2lkZW50cywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBsb2NhdGlvbnMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0YWNjZXNzb3IuY2xpZW50SWQgJiZcclxuXHRcdFx0XHR0YXJnZXQuY2xpZW50cy5maW5kKGNsaWVudCA9PiBjbGllbnQuaWQgPT09IGFjY2Vzc29yLmNsaWVudElkKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGNhdGVnb3JpZXMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gVVBEQVRFIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFxyXG5cdFx0VVBEQVRFLFxyXG5cdFx0dmVoaWNsZXMsXHJcblx0XHQoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRbXCJjYXRlZ29yaWVzXCIsIFwib2JqZWN0SWRcIiwgXCJwbGF0ZU51bWJlclwiLCBcInZpblwiLCBcIndpYWxvblVuaXRJZFwiXVxyXG5cdClcclxuKTtcclxuXHJcbmtleU1hbmFnZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihVUERBVEUsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQudXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5rZXlNYW5hZ2VyUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oVVBEQVRFLCBhY2NpZGVudHMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gREVMRVRFIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxua2V5TWFuYWdlclJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKERFTEVURSwgYWNjaWRlbnRzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdGFjY2Vzc29yLmNsaWVudElkICYmXHJcblx0XHRcdFx0YWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCAmJlxyXG5cdFx0XHRcdHRhcmdldC5hcHByb3ZlZCA9PT0gZmFsc2VcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIEFETUlOIFJPTEUgQ09ORklHIC8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gQ1JFQVRFIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihDUkVBVEUsIHVzZXJzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihDUkVBVEUsIGNhdGVnb3JpZXMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gIFJFQUQgIC8vXHJcbi8vLy8vLy8vLy8vL1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LnVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihVUERBVEUsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQudXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIGxvY2F0aW9ucywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRhY2Nlc3Nvci5jbGllbnRJZCAmJlxyXG5cdFx0XHRcdHRhcmdldC5jbGllbnRzLmZpbmQoY2xpZW50ID0+IGNsaWVudC5pZCA9PT0gYWNjZXNzb3IuY2xpZW50SWQpXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFJFQUQsIHVzZXJzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCB2ZWhpY2xlcywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oUkVBRCwgYWNjaWRlbnRzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihSRUFELCBjYXRlZ29yaWVzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuLy8vLy8vLy8vLy8vXHJcbi8vIFVQREFURSAvL1xyXG4vLy8vLy8vLy8vLy9cclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oVVBEQVRFLCB1c2VycywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oXHJcblx0XHRVUERBVEUsXHJcblx0XHR2ZWhpY2xlcyxcclxuXHRcdCh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFtcIm9iamVjdElkXCIsIFwicGxhdGVOdW1iZXJcIiwgXCJ2aW5cIiwgXCJ3aWFsb25Vbml0SWRcIl1cclxuXHQpXHJcbik7XHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKFVQREFURSwgYWNjaWRlbnRzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGFjY2Vzc29yLmNsaWVudElkICYmIGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5cclxuYWRtaW5Sb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihVUERBVEUsIGNhdGVnb3JpZXMsICh7IGFjY2Vzc29yLCB0YXJnZXQgfTogYW55KSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoYWNjZXNzb3IuY2xpZW50SWQgJiYgYWNjZXNzb3IuY2xpZW50SWQgPT09IHRhcmdldC5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH0pXHJcbik7XHJcblxyXG4vLy8vLy8vLy8vLy9cclxuLy8gIERFTEVURSAgLy9cclxuLy8vLy8vLy8vLy8vXHJcblxyXG5hZG1pblJvbGUuYWRkUGVybWlzc2lvbihcclxuXHRuZXcgQWN0aW9uKERFTEVURSwgY2F0ZWdvcmllcywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY2Nlc3Nvci5jbGllbnRJZCAmJiBhY2Nlc3Nvci5jbGllbnRJZCA9PT0gdGFyZ2V0LmNsaWVudElkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbmFkbWluUm9sZS5hZGRQZXJtaXNzaW9uKFxyXG5cdG5ldyBBY3Rpb24oREVMRVRFLCBib29raW5ncywgKHsgYWNjZXNzb3IsIHRhcmdldCB9OiBhbnkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRhY2Nlc3Nvci5jbGllbnRJZCAmJlxyXG5cdFx0XHRcdGFjY2Vzc29yLmNsaWVudElkID09PSB0YXJnZXQudXNlci5jbGllbnRJZCAmJlxyXG5cdFx0XHRcdHRhcmdldC5hcHByb3ZlZCA9PT0gZmFsc2VcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBNQVNURVIgUk9MRSBDT05GSUcgLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihDUkVBVEUsIHVzZXJzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKENSRUFURSwgdmVoaWNsZXMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oQ1JFQVRFLCBjbGllbnRzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKENSRUFURSwgbG9jYXRpb25zKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKENSRUFURSwgY2F0ZWdvcmllcykpO1xyXG5cclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oUkVBRCwgdXNlcnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oUkVBRCwgdmVoaWNsZXMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oUkVBRCwgYm9va2luZ3MpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oUkVBRCwgY2xpZW50cykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihSRUFELCBhY2NpZGVudHMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oUkVBRCwgbG9jYXRpb25zKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFJFQUQsIGNhdGVnb3JpZXMpKTtcclxuXHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFVQREFURSwgdXNlcnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oVVBEQVRFLCB2ZWhpY2xlcykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihVUERBVEUsIGJvb2tpbmdzKSk7XHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKFVQREFURSwgY2xpZW50cykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihVUERBVEUsIGFjY2lkZW50cykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihVUERBVEUsIGxvY2F0aW9ucykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihVUERBVEUsIGNhdGVnb3JpZXMpKTtcclxuXHJcbm1hc3RlclJvbGUuYWRkUGVybWlzc2lvbihuZXcgQWN0aW9uKERFTEVURSwgdXNlcnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oREVMRVRFLCB2ZWhpY2xlcykpO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24oXHJcblx0bmV3IEFjdGlvbihERUxFVEUsIGJvb2tpbmdzLCAoeyBhY2Nlc3NvciwgdGFyZ2V0IH06IGFueSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKHRhcmdldC5hcHByb3ZlZCA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9KVxyXG4pO1xyXG5tYXN0ZXJSb2xlLmFkZFBlcm1pc3Npb24obmV3IEFjdGlvbihERUxFVEUsIGNsaWVudHMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oREVMRVRFLCBhY2NpZGVudHMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oREVMRVRFLCBsb2NhdGlvbnMpKTtcclxubWFzdGVyUm9sZS5hZGRQZXJtaXNzaW9uKG5ldyBBY3Rpb24oREVMRVRFLCBjYXRlZ29yaWVzKSk7XHJcblxyXG5hY2Nlc3NDb250cm9sLmFkZFJvbGUobWFzdGVyUm9sZSk7XHJcbmFjY2Vzc0NvbnRyb2wuYWRkUm9sZShhZG1pblJvbGUpO1xyXG5hY2Nlc3NDb250cm9sLmFkZFJvbGUoa2V5TWFuYWdlclJvbGUpO1xyXG5hY2Nlc3NDb250cm9sLmFkZFJvbGUoZ3Vlc3RSb2xlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjY2Vzc0NvbnRyb2w7XHJcblxyXG5leHBvcnQgY29uc3Qgcm9sZXMgPSB7XHJcblx0YWRtaW46IGFkbWluUm9sZSxcclxuXHRrZXlNYW5hZ2VyOiBrZXlNYW5hZ2VyUm9sZSxcclxuXHRndWVzdDogZ3Vlc3RSb2xlLFxyXG5cdG1hc3RlcjogbWFzdGVyUm9sZVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc291cmNlcyA9IHtcclxuXHRib29raW5ncyxcclxuXHR2ZWhpY2xlcyxcclxuXHRsb2NhdGlvbnMsXHJcblx0dXNlcnMsXHJcblx0YWNjaWRlbnRzLFxyXG5cdGNhdGVnb3JpZXMsXHJcblx0Y2xpZW50c1xyXG59O1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9Cb29raW5nXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1ZlaGljbGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQ29sbGVjdGlvblwiO1xyXG5cclxuZXhwb3J0IGVudW0gQVBJX09QRVJBVElPTiB7XHJcblx0Q1JFQVRFID0gXCJDUkVBVEVcIixcclxuXHRERUxFVEUgPSBcIkRFTEVURVwiLFxyXG5cdFVQREFURSA9IFwiVVBEQVRFXCIsXHJcblx0UkVBRCA9IFwiUkVBRFwiXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFVzZVBhcmFtZXRlcnM8XHJcblx0QWxsUGFyYW1zLFxyXG5cdFJlcXVpcmVkUGFyYW1zIGV4dGVuZHMga2V5b2YgQWxsUGFyYW1zID0gdW5kZWZpbmVkLFxyXG5cdFBhcnRpYWxQYXJhbXMgZXh0ZW5kcyBrZXlvZiBBbGxQYXJhbXMgPSB1bmRlZmluZWRcclxuPiA9IFBpY2s8QWxsUGFyYW1zLCBSZXF1aXJlZFBhcmFtcz4gJiBQaWNrPFBhcnRpYWw8QWxsUGFyYW1zPiwgUGFydGlhbFBhcmFtcz47XHJcbiIsImltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7IE9wZXJhdGlvbiwgUmVzb3VyY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERhdGFTb3VyY2Uge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJvdGVjdGVkIGRiOiBhbnksXHJcblx0XHRwcm90ZWN0ZWQgdXNlcj86IFVzZXJBY2Nlc3NvcixcclxuXHRcdHByb3RlY3RlZCByZXNvdXJjZT86IFJlc291cmNlXHJcblx0KSB7fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VXNlclBlcm1pc3Npb25zID0gYXN5bmMgKFxyXG5cdFx0YWN0aW9uOiBPcGVyYXRpb24sXHJcblx0XHRwYXJhbXM/OiBhbnlcclxuXHQpOiBQcm9taXNlPHsgYWNjZXNzOiBib29sZWFuOyBleGNsdWRlZEZpZWxkczogc3RyaW5nW10gfT4gPT4ge1xyXG5cdFx0aWYgKHRoaXMudXNlciAmJiB0aGlzLnJlc291cmNlKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0YWNjZXNzOiBhd2FpdCBSQkFDLmNhbih0aGlzLnVzZXIucm9sZSwgYWN0aW9uLCB0aGlzLnJlc291cmNlLCBwYXJhbXMpLFxyXG5cdFx0XHRcdGV4Y2x1ZGVkRmllbGRzOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKFxyXG5cdFx0XHRcdFx0dGhpcy51c2VyLnJvbGUsXHJcblx0XHRcdFx0XHRhY3Rpb24sXHJcblx0XHRcdFx0XHR0aGlzLnJlc291cmNlXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHsgYWNjZXNzOiBmYWxzZSwgZXhjbHVkZWRGaWVsZHM6IFtdIH07XHJcblx0fTtcclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZVZlaGljbGUoZGF0YTogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLlZlaGljbGUuY3JlYXRlKGRhdGEpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldFZlaGljbGVzKG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuVmVoaWNsZS5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldFZlaGljbGUoaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5WZWhpY2xlLmZpbmRCeVBrKGlkLCB7XHJcblx0XHRcdC4uLm9wdGlvbnMsXHJcblx0XHRcdGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlVXNlcihkYXRhOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuVXNlci5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VXNlcnMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Vc2VyLmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0VXNlcihpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLlVzZXIuZmluZEJ5UGsoaWQsIHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUxvY2F0aW9uKGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Mb2NhdGlvbi5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRMb2NhdGlvbnMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Mb2NhdGlvbi5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0TG9jYXRpb24oaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Mb2NhdGlvbi5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUJvb2tpbmcoZGF0YTogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkJvb2tpbmcuY3JlYXRlKGRhdGEpO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0Qm9va2luZ3Mob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5Cb29raW5nLmZpbmRBbGwoeyAuLi5vcHRpb25zLCBpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV0gfSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRCb29raW5nKGlkOiBudW1iZXIsIG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuQm9va2luZy5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUFjY2lkZW50KGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5BY2NpZGVudC5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRBY2NpZGVudHMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5BY2NpZGVudC5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0QWNjaWRlbnQoaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5BY2NpZGVudC5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUNsaWVudChkYXRhOiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIuQ2xpZW50LmNyZWF0ZShkYXRhKTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldENsaWVudHMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DbGllbnQuZmluZEFsbCh7IC4uLm9wdGlvbnMsIGluY2x1ZGU6IFt7IGFsbDogdHJ1ZSB9XSB9KTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIGdldENsaWVudChpZDogbnVtYmVyLCBvcHRpb25zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiB0aGlzLmRiLkNsaWVudC5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNyZWF0ZUNhdGVnb3J5KGRhdGE6IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DYXRlZ29yeS5jcmVhdGUoZGF0YSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBnZXRDYXRlZ29yeXMob3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DYXRlZ29yeS5maW5kQWxsKHsgLi4ub3B0aW9ucywgaW5jbHVkZTogW3sgYWxsOiB0cnVlIH1dIH0pO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgZ2V0Q2F0ZWdvcnkoaWQ6IG51bWJlciwgb3B0aW9ucz86IG9iamVjdCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYi5DYXRlZ29yeS5maW5kQnlQayhpZCwge1xyXG5cdFx0XHQuLi5vcHRpb25zLFxyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJjb25zdCB7XHJcblx0REFUQUJBU0VfTkFNRSxcclxuXHREQVRBQkFTRV9VU0VSTkFNRSxcclxuXHREQVRBQkFTRV9QQVNTV09SRCxcclxuXHREQVRBQkFTRV9IT1NULFxyXG5cdERBVEFCQVNFX1BPUlQsXHJcblx0TUFJTF9VU0VSLFxyXG5cdE1BSUxfUEFTUyxcclxuXHRNQUlMX1BPUlQsXHJcblx0TUFJTF9IT1NULFxyXG5cdFNFUlZFUl9QT1JULFxyXG5cdFNFUlZFUl9VUkwsXHJcblx0U0VDUkVUX0tFWVxyXG59ID0gcHJvY2Vzcy5lbnY7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0ZGF0YWJhc2U6IHtcclxuXHRcdG5hbWU6IERBVEFCQVNFX05BTUUsXHJcblx0XHR1c2VybmFtZTogREFUQUJBU0VfVVNFUk5BTUUsXHJcblx0XHRwYXNzd29yZDogREFUQUJBU0VfUEFTU1dPUkQsXHJcblx0XHRob3N0OiBEQVRBQkFTRV9IT1NULFxyXG5cdFx0cG9ydDogREFUQUJBU0VfUE9SVCxcclxuXHRcdHNlcXVlbGl6ZToge1xyXG5cdFx0XHRkaWFsZWN0OiA8Y29uc3Q+XCJteXNxbFwiLFxyXG5cdFx0XHRwb29sOiB7XHJcblx0XHRcdFx0bWF4OiA1LFxyXG5cdFx0XHRcdG1pbjogMCxcclxuXHRcdFx0XHRhY3F1aXJlOiAzMDAwMCxcclxuXHRcdFx0XHRpZGxlOiAxMDAwMFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRtYWlsOiB7XHJcblx0XHRhdXRoOiB7XHJcblx0XHRcdHVzZXI6IE1BSUxfVVNFUixcclxuXHRcdFx0cGFzczogTUFJTF9QQVNTXHJcblx0XHR9LFxyXG5cdFx0cG9ydDogTUFJTF9QT1JULFxyXG5cdFx0c2VjdXJlOiB0cnVlLFxyXG5cdFx0aG9zdDogTUFJTF9IT1NUXHJcblx0fSxcclxuXHRzZXJ2ZXJQb3J0OiBTRVJWRVJfUE9SVCxcclxuXHRzZXJ2ZXJVcmw6IFNFUlZFUl9VUkwsXHJcblx0c2VjcmV0S2V5OiBTRUNSRVRfS0VZXHJcbn07XHJcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb29raW5nIH0gZnJvbSBcIi4vQm9va2luZ1wiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFZlaGljbGUgfSBmcm9tIFwiLi9WZWhpY2xlXCI7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTG9jYXRpb24gfSBmcm9tIFwiLi9Mb2NhdGlvblwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIENsaWVudCB9IGZyb20gXCIuL0NsaWVudFwiO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFjY2lkZW50IH0gZnJvbSBcIi4vQWNjaWRlbnRcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS13aWFsb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcGlsZSB9IGZyb20gXCJoYW5kbGViYXJzXCI7XHJcbmltcG9ydCBtam1sMmh0bWwgZnJvbSBcIm1qbWxcIjtcclxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xyXG5pbXBvcnQgU3RhdGljTWFwcyBmcm9tIFwic3RhdGljbWFwc1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi9jb25maWdcIjtcclxuaW1wb3J0IHsgZ2V0U3RhdGljRmlsZXNQYXRoLCBtYWtlRGlyZWN0b3J5SWZOb3RFeGlzdCB9IGZyb20gXCIuLlwiO1xyXG5cclxuY29uc3QgeyBtYWlsLCBzZWNyZXRLZXkgfSA9IGNvbmZpZztcclxuXHJcbmNvbnN0IGdldFRlbXBsYXRlID0gKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT5cclxuXHRmcy5yZWFkRmlsZVN5bmMoXHJcblx0XHRwYXRoLnJlc29sdmUoYCR7X19kaXJuYW1lfS90ZW1wbGF0ZXMvJHtmaWxlTmFtZX0ubWptbGApLFxyXG5cdFx0XCJ1dGY4XCJcclxuXHQpO1xyXG5cclxuY29uc3QgZ2V0VHJhbnNwb3J0ID0gKCkgPT5cclxuXHRub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcblx0XHRhdXRoOiBtYWlsLmF1dGgsXHJcblx0XHRwb3J0OiBOdW1iZXIobWFpbC5wb3J0KSxcclxuXHRcdHNlY3VyZTogbWFpbC5zZWN1cmUsXHJcblx0XHRob3N0OiBtYWlsLmhvc3RcclxuXHR9KTtcclxuXHJcbmNvbnN0IGNvbXBpbGVUZW1wbGF0ZSA9IChtam1sOiBzdHJpbmcsIGNvbnRleHQ6IGFueSkgPT4gY29tcGlsZShtam1sKShjb250ZXh0KTtcclxuXHJcbmNvbnN0IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lID0gKHRpbWVzdGFtcDogbnVtYmVyLCB0aW1lWm9uZTogc3RyaW5nKSA9PiB7XHJcblx0cmV0dXJuIG1vbWVudCh0aW1lc3RhbXAsIFwiWFwiKVxyXG5cdFx0LnR6KHRpbWVab25lKVxyXG5cdFx0LmZvcm1hdChcIkxMTFwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kUGFzc3dvcmRSZXNldFRva2VuID0gKHtcclxuXHRlbWFpbCxcclxuXHR1cmxcclxufToge1xyXG5cdGVtYWlsOiBzdHJpbmc7XHJcblx0dXJsOiBzdHJpbmc7XHJcbn0pOiBhbnkgPT4ge1xyXG5cdC8vIFNlbmQgZW1haWwgaW52aXRlXHJcblx0bGV0IHRva2VuID0gand0LnNpZ24oeyBlbWFpbCwgcGFzc3dvcmRSZXNldDogdHJ1ZSB9LCBzZWNyZXRLZXksIHtcclxuXHRcdGV4cGlyZXNJbjogXCIxaFwiXHJcblx0fSk7XHJcblx0cmV0dXJuIGdldFRyYW5zcG9ydCgpLnNlbmRNYWlsKHtcclxuXHRcdGZyb206IFwibm8tcmVwbHlAYXRzdWFlLm5ldFwiLFxyXG5cdFx0dG86IGVtYWlsLFxyXG5cdFx0c3ViamVjdDogXCJQYXNzd29yZCBSZXNldFwiLFxyXG5cdFx0aHRtbDogYDxoMT5IZWxsbzwvaDE+PGEgaHJlZj1cIiR7dXJsfT90b2tlbj0ke3Rva2VufVwiPkNsaWNrIGhlcmUgdG8gcmVzZXQgcGFzc3dvcmQhPC9hPmBcclxuXHR9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kSW52aXRlID0gKHtcclxuXHRlbWFpbCxcclxuXHRjbGllbnRJZFxyXG59OiB7XHJcblx0ZW1haWw6IHN0cmluZztcclxuXHRjbGllbnRJZDogbnVtYmVyO1xyXG59KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuXHRjb25zdCB0cmFuc3BvcnRlciA9IGdldFRyYW5zcG9ydCgpO1xyXG5cdGxldCB0b2tlbiA9IGp3dC5zaWduKHsgZW1haWwsIGNsaWVudElkIH0sIHNlY3JldEtleSwgeyBleHBpcmVzSW46IFwiN2RcIiB9KTtcclxuXHRjb25zdCBjb21waWxlZCA9IGNvbXBpbGVUZW1wbGF0ZShnZXRUZW1wbGF0ZShcImludml0ZVwiKSwge1xyXG5cdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdHNpZ25VcExpbms6IGAke3Byb2Nlc3MuZW52LkNMSUVOVF9VUkx9L3NpZ251cD90b2tlbj0ke3Rva2VufWBcclxuXHR9KTtcclxuXHRjb25zdCB0ZW1wbGF0ZSA9IG1qbWwyaHRtbChjb21waWxlZCk7XHJcblx0Y29uc3QgbWFpbk9wdGlvbnMgPSB7XHJcblx0XHRmcm9tOiBcIkxlYXNlUGxhbiBSZW50YWxzIDxuby1yZXBseUBhdHN1YWUubmV0PlwiLFxyXG5cdFx0dG86IGVtYWlsLFxyXG5cdFx0c3ViamVjdDogXCJZb3UgYXJlIGludml0ZWQgdG8gTGVhc2VQbGFuIENhciBCb29raW5nIVwiLFxyXG5cdFx0aHRtbDogdGVtcGxhdGUuaHRtbFxyXG5cdH07XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haW5PcHRpb25zLCBmdW5jdGlvbihlcnIsIGluZm8pIHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoaW5mby5yZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlbmRJbnZvaWNlID0gKHtcclxuXHRlbWFpbCxcclxuXHRhbW91bnQsXHJcblx0Y3VzdG9tZXJOYW1lLFxyXG5cdHZlaGljbGVOYW1lLFxyXG5cdGZyb20sXHJcblx0dG8sXHJcblx0Ym9va2luZ0lkLFxyXG5cdHRpbWVab25lXHJcbn06IHtcclxuXHRlbWFpbDogc3RyaW5nO1xyXG5cdGFtb3VudDogbnVtYmVyO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdHZlaGljbGVOYW1lOiBzdHJpbmc7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0Ym9va2luZ0lkOiBudW1iZXI7XHJcblx0dGltZVpvbmU6IHN0cmluZztcclxufSkgPT4ge1xyXG5cdGNvbnN0IHRyYW5zcG9ydGVyID0gZ2V0VHJhbnNwb3J0KCk7XHJcblx0Y29uc3QgY29tcGlsZWQgPSBjb21waWxlVGVtcGxhdGUoZ2V0VGVtcGxhdGUoXCJpbnZvaWNlXCIpLCB7XHJcblx0XHRjb21wYW55OiBcIkxlYXNlUGxhblwiLFxyXG5cdFx0Y3VzdG9tZXJOYW1lLFxyXG5cdFx0dmVoaWNsZU5hbWUsXHJcblx0XHRmcm9tOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZShmcm9tLCB0aW1lWm9uZSksXHJcblx0XHR0bzogZ2V0RGF0ZVN0cmluZ0Zyb21Vc2VyVGltZXpvbmUodG8sIHRpbWVab25lKSxcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdGFtb3VudCxcclxuXHRcdGJvb2tpbmdJZFxyXG5cdH0pO1xyXG5cdGNvbnN0IHRlbXBsYXRlID0gbWptbDJodG1sKGNvbXBpbGVkKTtcclxuXHRjb25zdCBtYWluT3B0aW9ucyA9IHtcclxuXHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHR0bzogZW1haWwsXHJcblx0XHRzdWJqZWN0OiBcIllvdXIgY2FyIGJvb2tpbmcgcmVjZWlwdCBpcyBoZXJlIVwiLFxyXG5cdFx0aHRtbDogdGVtcGxhdGUuaHRtbFxyXG5cdH07XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haW5PcHRpb25zLCBmdW5jdGlvbihlcnIsIGluZm8pIHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc29sdmUoaW5mby5yZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZW5kQm9va2luZ05vdGlmaWNhdGlvbk9wdGlvbnMge1xyXG5cdGVtYWlsOiBzdHJpbmc7XHJcblx0Y3VzdG9tZXJFbWFpbDogc3RyaW5nO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdG1vYmlsZTogc3RyaW5nO1xyXG5cdGJvb2tpbmdJZDogbnVtYmVyO1xyXG5cdGZyb206IG51bWJlcjtcclxuXHR0bzogbnVtYmVyO1xyXG5cdHZlaGljbGVJZDogbnVtYmVyO1xyXG5cdHZlaGljbGU6IHN0cmluZztcclxuXHRwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cdGxvY2F0aW9uOiBzdHJpbmc7XHJcblx0bGF0OiBudW1iZXI7XHJcblx0bG5nOiBudW1iZXI7XHJcblx0Y29tcGFueTogc3RyaW5nO1xyXG5cdHRpbWVab25lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kQm9va2luZ05vdGlmaWNhdGlvbiA9IGFzeW5jICh7XHJcblx0ZW1haWwsXHJcblx0Y3VzdG9tZXJFbWFpbCxcclxuXHRjdXN0b21lck5hbWUsXHJcblx0bW9iaWxlLFxyXG5cdGJvb2tpbmdJZCxcclxuXHRmcm9tLFxyXG5cdHRvLFxyXG5cdHZlaGljbGVJZCxcclxuXHR2ZWhpY2xlLFxyXG5cdHBsYXRlTnVtYmVyLFxyXG5cdGxvY2F0aW9uLFxyXG5cdGxhdCxcclxuXHRsbmcsXHJcblx0Y29tcGFueSxcclxuXHR0aW1lWm9uZVxyXG59OiBTZW5kQm9va2luZ05vdGlmaWNhdGlvbk9wdGlvbnMpID0+IHtcclxuXHRjb25zdCB0cmFuc3BvcnRlciA9IGdldFRyYW5zcG9ydCgpO1xyXG5cclxuXHRjb25zdCBtYXAgPSBuZXcgU3RhdGljTWFwcyh7XHJcblx0XHR3aWR0aDogMTIwMCxcclxuXHRcdGhlaWdodDogODAwLFxyXG5cdFx0dGlsZVVybDogXCJodHRwczovL21hcHMud2lraW1lZGlhLm9yZy9vc20taW50bC97en0ve3h9L3t5fS5wbmc/bGFuZz1lblwiXHJcblx0fSk7XHJcblx0bWFwLmFkZE1hcmtlcih7XHJcblx0XHRpbWc6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vcHVibGljL2ltYWdlcy9Mb2NhdGlvbk1hcmtlci5wbmdcIiksXHJcblx0XHRjb29yZDogW2xuZywgbGF0XSxcclxuXHRcdG9mZnNldFg6IDUwLFxyXG5cdFx0b2Zmc2V0WTogMTAwLFxyXG5cdFx0d2lkdGg6IDEwMCxcclxuXHRcdGhlaWdodDogMTAwXHJcblx0fSk7XHJcblx0YXdhaXQgbWFwLnJlbmRlcihbbG5nLCBsYXRdLCAxMCk7XHJcblx0Y29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oZ2V0U3RhdGljRmlsZXNQYXRoKCksIFwiL21hcHNcIik7XHJcblx0Y29uc3QgZmlsZU5hbWUgPSBgJHtEYXRlLm5vdygpfS5wbmdgO1xyXG5cdGNvbnN0IGZpbGVTYXZlUGF0aCA9IHBhdGguam9pbihmaWxlUGF0aCwgZmlsZU5hbWUpO1xyXG5cdGF3YWl0IG1ha2VEaXJlY3RvcnlJZk5vdEV4aXN0KGZpbGVQYXRoKTtcclxuXHRhd2FpdCBtYXAuaW1hZ2Uuc2F2ZShmaWxlU2F2ZVBhdGgpO1xyXG5cdGNvbnN0IGNvbXBpbGVkID0gY29tcGlsZVRlbXBsYXRlKGdldFRlbXBsYXRlKFwiYm9va2luZ05vdGlmaWNhdGlvblwiKSwge1xyXG5cdFx0Y3VzdG9tZXJFbWFpbCxcclxuXHRcdGN1c3RvbWVyTmFtZSxcclxuXHRcdG1vYmlsZSxcclxuXHRcdGJvb2tpbmdJZCxcclxuXHRcdGZyb206IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lKGZyb20sIHRpbWVab25lKSxcclxuXHRcdHRvOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZSh0bywgdGltZVpvbmUpLFxyXG5cdFx0dmVoaWNsZUlkLFxyXG5cdFx0dmVoaWNsZSxcclxuXHRcdHBsYXRlTnVtYmVyLFxyXG5cdFx0bG9jYXRpb24sXHJcblx0XHRsYXQsXHJcblx0XHRsbmcsXHJcblx0XHRjb21wYW55LFxyXG5cdFx0bWFwVVJMOiBgY2lkOiR7ZmlsZU5hbWV9YCxcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYFxyXG5cdH0pO1xyXG5cclxuXHRjb25zdCB0ZW1wbGF0ZSA9IG1qbWwyaHRtbChjb21waWxlZCk7XHJcblxyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHR0cmFuc3BvcnRlci5zZW5kTWFpbChcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHRcdFx0dG86IGVtYWlsLFxyXG5cdFx0XHRcdHN1YmplY3Q6IGBCb29raW5nIHJlcXVlc3Qgb24gJHt2ZWhpY2xlfWAsXHJcblx0XHRcdFx0aHRtbDogdGVtcGxhdGUuaHRtbCxcclxuXHRcdFx0XHRhdHRhY2htZW50czogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRmaWxlbmFtZTogXCJNYXAgTG9jYXRpb24ucG5nXCIsXHJcblx0XHRcdFx0XHRcdHBhdGg6IGZpbGVTYXZlUGF0aCxcclxuXHRcdFx0XHRcdFx0Y2lkOiBmaWxlTmFtZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb24oZXJyLCBpbmZvKSB7XHJcblx0XHRcdFx0ZnMucHJvbWlzZXMudW5saW5rKGZpbGVTYXZlUGF0aCk7XHJcblx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShpbmZvLnJlc3BvbnNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2VuZEJvb2tpbmdDb25maXJtYXRpb24gPSBhc3luYyAoe1xyXG5cdGVtYWlsLFxyXG5cdGN1c3RvbWVyTmFtZSxcclxuXHR2ZWhpY2xlTmFtZSxcclxuXHRmcm9tLFxyXG5cdHRvLFxyXG5cdGJvb2tpbmdJZCxcclxuXHRwYXJraW5nTG9jYXRpb24sXHJcblx0bGF0LFxyXG5cdGxuZyxcclxuXHRhZGRyZXNzLFxyXG5cdHRpbWVab25lXHJcbn06IHtcclxuXHRlbWFpbDogc3RyaW5nO1xyXG5cdGN1c3RvbWVyTmFtZTogc3RyaW5nO1xyXG5cdHZlaGljbGVOYW1lOiBzdHJpbmc7XHJcblx0ZnJvbTogbnVtYmVyO1xyXG5cdHRvOiBudW1iZXI7XHJcblx0Ym9va2luZ0lkOiBudW1iZXI7XHJcblx0cGFya2luZ0xvY2F0aW9uOiBzdHJpbmc7XHJcblx0bGF0OiBudW1iZXI7XHJcblx0bG5nOiBudW1iZXI7XHJcblx0YWRkcmVzczogc3RyaW5nO1xyXG5cdHRpbWVab25lOiBzdHJpbmc7XHJcbn0pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG5cdGNvbnN0IHRyYW5zcG9ydGVyID0gZ2V0VHJhbnNwb3J0KCk7XHJcblxyXG5cdGNvbnN0IG1hcCA9IG5ldyBTdGF0aWNNYXBzKHtcclxuXHRcdHdpZHRoOiAxMjAwLFxyXG5cdFx0aGVpZ2h0OiA4MDAsXHJcblx0XHR0aWxlVXJsOiBcImh0dHBzOi8vbWFwcy53aWtpbWVkaWEub3JnL29zbS1pbnRsL3t6fS97eH0ve3l9LnBuZz9sYW5nPWVuXCJcclxuXHR9KTtcclxuXHRtYXAuYWRkTWFya2VyKHtcclxuXHRcdGltZzogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi9wdWJsaWMvaW1hZ2VzL0xvY2F0aW9uTWFya2VyLnBuZ1wiKSxcclxuXHRcdGNvb3JkOiBbbG5nLCBsYXRdLFxyXG5cdFx0b2Zmc2V0WDogNTAsXHJcblx0XHRvZmZzZXRZOiAxMDAsXHJcblx0XHR3aWR0aDogMTAwLFxyXG5cdFx0aGVpZ2h0OiAxMDBcclxuXHR9KTtcclxuXHRhd2FpdCBtYXAucmVuZGVyKFtsbmcsIGxhdF0sIDEwKTtcclxuXHRjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihnZXRTdGF0aWNGaWxlc1BhdGgoKSwgXCIvbWFwc1wiKTtcclxuXHRjb25zdCBmaWxlTmFtZSA9IGAke0RhdGUubm93KCl9LnBuZ2A7XHJcblx0Y29uc3QgZmlsZVNhdmVQYXRoID0gcGF0aC5qb2luKGZpbGVQYXRoLCBmaWxlTmFtZSk7XHJcblx0YXdhaXQgbWFrZURpcmVjdG9yeUlmTm90RXhpc3QoZmlsZVBhdGgpO1xyXG5cdGF3YWl0IG1hcC5pbWFnZS5zYXZlKGZpbGVTYXZlUGF0aCk7XHJcblx0Y29uc3QgY29tcGlsZWQgPSBjb21waWxlVGVtcGxhdGUoZ2V0VGVtcGxhdGUoXCJjb25maXJtQm9va2luZ1wiKSwge1xyXG5cdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdGNvbnRhY3RFbWFpbDogXCJzdXBwb3J0QGF0c3VhZS5uZXRcIixcclxuXHRcdGxvZ29TcmM6IGAke3Byb2Nlc3MuZW52LlNFUlZFUl9VUkx9L3N0YXRpYy9pbWFnZXMvbWFpbC1oZWFkZXIucG5nYCxcclxuXHRcdGJvb2tpbmdJZCxcclxuXHRcdGZyb206IGdldERhdGVTdHJpbmdGcm9tVXNlclRpbWV6b25lKGZyb20sIHRpbWVab25lKSxcclxuXHRcdHRvOiBnZXREYXRlU3RyaW5nRnJvbVVzZXJUaW1lem9uZSh0bywgdGltZVpvbmUpLFxyXG5cdFx0dmVoaWNsZU5hbWUsXHJcblx0XHRjdXN0b21lck5hbWUsXHJcblx0XHRtYXBVUkw6IGBjaWQ6JHtmaWxlTmFtZX1gLFxyXG5cdFx0bGF0LFxyXG5cdFx0bG5nLFxyXG5cdFx0cGFya2luZ0xvY2F0aW9uLFxyXG5cdFx0YWRkcmVzc1xyXG5cdH0pO1xyXG5cdGNvbnN0IHRlbXBsYXRlID0gbWptbDJodG1sKGNvbXBpbGVkKTtcclxuXHRjb25zdCBtYWluT3B0aW9ucyA9IHtcclxuXHRcdGZyb206IFwiTGVhc2VQbGFuIFJlbnRhbHMgPG5vLXJlcGx5QGF0c3VhZS5uZXQ+XCIsXHJcblx0XHR0bzogZW1haWwsXHJcblx0XHRzdWJqZWN0OiBcIllvdXIgYm9va2luZyBoYXMgYmVlbiBjb25maXJtZWQhXCIsXHJcblx0XHRodG1sOiB0ZW1wbGF0ZS5odG1sLFxyXG5cdFx0YXR0YWNobWVudHM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpbGVuYW1lOiBcIk1hcCBMb2NhdGlvbi5wbmdcIixcclxuXHRcdFx0XHRwYXRoOiBmaWxlU2F2ZVBhdGgsXHJcblx0XHRcdFx0Y2lkOiBmaWxlTmFtZVxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fTtcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0dHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbk9wdGlvbnMsIGZ1bmN0aW9uKGVyciwgaW5mbykge1xyXG5cdFx0XHRmcy5wcm9taXNlcy51bmxpbmsoZmlsZVNhdmVQYXRoKTtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShpbmZvLnJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcbiIsImltcG9ydCB7IGRlbGV0ZUZpbGVGcm9tVXJsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuXHJcbnR5cGUgUmVwbGFjZUZpbGVVUkkgPSB7XHJcblx0dXJsOiBzdHJpbmc7XHJcblx0bW9kZWw6IE1vZGVsVHlwZTtcclxuXHRmaWVsZDogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZFJlcGxhY2VkRmlsZXMgPSAoXHJcblx0cmVzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgbG9jYWxzOiBhbnkgfSxcclxuXHR7IHVybCwgbW9kZWwsIGZpZWxkIH06IFJlcGxhY2VGaWxlVVJJXHJcbikgPT4ge1xyXG5cdHJlcy5sb2NhbHMucmVwbGFjZWRGaWxlc1xyXG5cdFx0PyByZXMubG9jYWxzLnJlcGxhY2VkRmlsZXMucHVzaCh7IHVybCwgbW9kZWwsIGZpZWxkIH0pXHJcblx0XHQ6IChyZXMubG9jYWxzLnJlcGxhY2VkRmlsZXMgPSBbeyB1cmwsIG1vZGVsLCBmaWVsZCB9XSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVsZXRlUmVwbGFjZWRGaWxlcyA9IGFzeW5jIChcclxuXHRyZXEsXHJcblx0eyBsb2NhbHMgfTogeyBsb2NhbHM6IGFueTsgW2tleTogc3RyaW5nXTogYW55IH0sXHJcblx0bmV4dFxyXG4pID0+IHtcclxuXHRpZiAobG9jYWxzLnJlcGxhY2VkRmlsZXMpIHtcclxuXHRcdGZvciAobGV0IGZpbGUgb2YgbG9jYWxzLnJlcGxhY2VkRmlsZXMpIHtcclxuXHRcdFx0aWYgKGZpbGUudXJsICYmIGZpbGUubW9kZWwgJiYgZmlsZS5maWVsZCkge1xyXG5cdFx0XHRcdGZpbGUubW9kZWxcclxuXHRcdFx0XHRcdC5maW5kQWxsKHtcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRbZmlsZS5maWVsZF06IGZpbGUudXJsXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQudGhlbihmb3VuZCA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICghZm91bmQubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlRmlsZUZyb21VcmwoZmlsZS51cmwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmV4dCgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVsZXRlUmVwbGFjZWRGaWxlcztcclxuIiwiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBkZWxldGVGaWxlRnJvbVVybCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxudHlwZSBmaWxlVVJJID0geyB1cmw6IHN0cmluZzsgcGF0aDogc3RyaW5nIH07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoXHJcblx0eyBmaWxlLCBmaWxlcyB9OiB7IGZpbGU/OiBmaWxlVVJJOyBmaWxlcz86IHsgW2tleTogc3RyaW5nXTogZmlsZVVSSSB9IH0sXHJcblx0cmVzLFxyXG5cdG5leHRcclxuKSA9PiB7XHJcblx0aWYgKHJlcy5zdGF0dXNDb2RlID49IDQwMCkge1xyXG5cdFx0aWYgKGZpbGUpIHtcclxuXHRcdFx0aWYgKGZpbGUudXJsKSBkZWxldGVGaWxlRnJvbVVybChmaWxlLnVybCk7XHJcblx0XHRcdGVsc2UgaWYgKGZpbGUucGF0aCkgZnMucHJvbWlzZXMudW5saW5rKGZpbGUucGF0aCk7XHJcblx0XHR9XHJcblx0XHRpZiAoZmlsZXMpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gT2JqZWN0LmtleXMoZmlsZXMpKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlsZSA9IGZpbGVzW2tleV07XHJcblx0XHRcdFx0aWYgKGZpbGUudXJsKSBkZWxldGVGaWxlRnJvbVVybChmaWxlLnVybCk7XHJcblx0XHRcdFx0ZWxzZSBpZiAoZmlsZS5wYXRoKSBmcy5wcm9taXNlcy51bmxpbmsoZmlsZS5wYXRoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRuZXh0KCk7XHJcbn07XHJcbiIsImltcG9ydCB7IFJvbGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuXHRpZiAocmVxLnVzZXIucm9sZSAhPT0gUm9sZS5HVUVTVCkge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCBhcyBhIGd1ZXN0LlwiKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9XHJcbn07XHJcbiIsImV4cG9ydCBkZWZhdWx0ICh7IGJvZHkgfSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0Zm9yIChsZXQga2V5IGluIGJvZHkpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGJvZHlba2V5XSA9IEpTT04ucGFyc2UoYm9keVtrZXldKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHt9XHJcblx0fVxyXG5cdG5leHQoKTtcclxufTtcclxuIiwiaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IG11bHRlciBmcm9tIFwibXVsdGVyXCI7XHJcbmltcG9ydCB7IGdldFN0YXRpY0ZpbGVzUGF0aCwgbWFrZURpcmVjdG9yeUlmTm90RXhpc3QgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmNvbnN0IHVwbG9hZCA9ICh1cGxvYWRQYXRoLCBvcHRpb25zPykgPT4ge1xyXG5cdHJldHVybiBtdWx0ZXIoe1xyXG5cdFx0c3RvcmFnZTogbXVsdGVyLmRpc2tTdG9yYWdlKHtcclxuXHRcdFx0ZGVzdGluYXRpb246IGZ1bmN0aW9uKHJlcSwgZmlsZSwgY2IpIHtcclxuXHRcdFx0XHRjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihnZXRTdGF0aWNGaWxlc1BhdGgoKSwgdXBsb2FkUGF0aCk7XHJcblx0XHRcdFx0bWFrZURpcmVjdG9yeUlmTm90RXhpc3QoZmlsZVBhdGgpXHJcblx0XHRcdFx0XHQudGhlbigoKSA9PiBjYihudWxsLCBmaWxlUGF0aCkpXHJcblx0XHRcdFx0XHQuY2F0Y2goZSA9PiBjYihlLCBmaWxlUGF0aCkpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRmaWxlbmFtZTogZnVuY3Rpb24ocmVxLCBmaWxlLCBjYikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGZpbGUpO1xyXG5cdFx0XHRcdGNiKG51bGwsIGAke0RhdGUubm93KCl9LSR7ZmlsZS5vcmlnaW5hbG5hbWV9YCk7IC8vdXNlIERhdGUubm93KCkgZm9yIHVuaXF1ZSBmaWxlIGtleXNcclxuXHRcdFx0fVxyXG5cdFx0fSksXHJcblx0XHRsaW1pdHM6IHtcclxuXHRcdFx0ZmlsZVNpemU6IDEwMDAwMDAwLFxyXG5cdFx0XHQuLi4ob3B0aW9ucyAmJiBvcHRpb25zLmxpbWl0cylcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgdXBsb2FkO1xyXG4iLCJpbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi4uL1wiO1xyXG5pbXBvcnQgeyBPYmplY3RTY2hlbWEgfSBmcm9tIFwieXVwXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9Cb29raW5nXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1ZlaGljbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3I8U2NoZW1hIGV4dGVuZHMgb2JqZWN0LCBUYXJnZXQsIE5ld0RhdGE+IHtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgc2NoZW1hOiBPYmplY3RTY2hlbWE8U2NoZW1hPixcclxuXHRcdHByaXZhdGUgdXNlcjogVXNlcixcclxuXHRcdHByaXZhdGUgb3BlcmF0aW9uOiBBUElfT1BFUkFUSU9OLFxyXG5cdFx0cHJpdmF0ZSB0YXJnZXQ/OiBUYXJnZXRcclxuXHQpIHt9XHJcblxyXG5cdHB1YmxpYyBjYXN0ID0gKHZhbHVlOiB1bmtub3duKTogU2NoZW1hID0+IHtcclxuXHRcdGNvbnN0IHsgdXNlciwgb3BlcmF0aW9uLCBzY2hlbWEsIHRhcmdldCB9ID0gdGhpcztcclxuXHJcblx0XHRyZXR1cm4gc2NoZW1hLmNhc3QodmFsdWUsIHtcclxuXHRcdFx0c3RyaXBVbmtub3duOiB0cnVlLFxyXG5cdFx0XHRjb250ZXh0OiB7XHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRvcGVyYXRpb24sXHJcblx0XHRcdFx0dGFyZ2V0LFxyXG5cdFx0XHRcdGRhdGE6IHZhbHVlLFxyXG5cdFx0XHRcdGNhc3Rpbmc6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0cHVibGljIHZhbGlkYXRlID0gKHZhbHVlOiB1bmtub3duKSA9PiB7XHJcblx0XHRjb25zdCB7IHVzZXIsIG9wZXJhdGlvbiwgc2NoZW1hLCB0YXJnZXQgfSA9IHRoaXM7XHJcblx0XHRyZXR1cm4gc2NoZW1hLnZhbGlkYXRlKHZhbHVlLCB7XHJcblx0XHRcdGFib3J0RWFybHk6IGZhbHNlLFxyXG5cdFx0XHRjb250ZXh0OiB7XHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRvcGVyYXRpb24sXHJcblx0XHRcdFx0dGFyZ2V0OiB0YXJnZXQsXHJcblx0XHRcdFx0ZGF0YTogdmFsdWUsXHJcblx0XHRcdFx0Y2FzdGluZzogZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFDYXN0ZXI8QXR0cmlidXRlcyBleHRlbmRzIG9iamVjdD4ge1xyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2NoZW1hOiBPYmplY3RTY2hlbWE8QXR0cmlidXRlcz4sIHByaXZhdGUgdXNlcjogVXNlcikge31cclxuXHJcblx0cHVibGljIGNhc3QgPSAoZGF0YTogdW5rbm93bik6IEF0dHJpYnV0ZXMgPT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuc2NoZW1hLmNhc3QoZGF0YSwge1xyXG5cdFx0XHRjb250ZXh0OiB7XHJcblx0XHRcdFx0b3BlcmF0aW9uOiBBUElfT1BFUkFUSU9OLlJFQUQsXHJcblx0XHRcdFx0dXNlcjogdGhpcy51c2VyXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieXVwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50LXRpbWV6b25lXCIpOyIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdERhdGFUeXBlLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRCZWxvbmdzVG9NYW55LFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXRcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQWNjaWRlbnRBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7IFVzZXIsIFZlaGljbGUsIEJvb2tpbmcsIEFjY2lkZW50VXNlclN0YXR1cyB9IGZyb20gXCIuXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEFjY2lkZW50IGV4dGVuZHMgTW9kZWw8QWNjaWRlbnQ+IGltcGxlbWVudHMgQWNjaWRlbnRBdHRyaWJ1dGVzIHtcclxuXHRAUHJpbWFyeUtleVxyXG5cdEBBdXRvSW5jcmVtZW50XHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBpZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHtcclxuXHRcdHR5cGU6IERhdGFUeXBlLlNUUklORyg1MDApLFxyXG5cdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdHZhbGlkYXRlOiB7XHJcblx0XHRcdG5vdE51bGw6IHsgbXNnOiBcIk1lc3NhZ2UgaXMgcmVxdWlyZWQuXCIgfVxyXG5cdFx0fVxyXG5cdH0pXHJcblx0cHVibGljIG1lc3NhZ2U6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBhY2NpZGVudEltYWdlU3JjOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgYWNjaWRlbnRWaWRlb1NyYzogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGxhdDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGxuZzogbnVtYmVyO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHVzZXJJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFVzZXIpXHJcblx0dXNlcjogVXNlcjtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVmVoaWNsZSlcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB2ZWhpY2xlSWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBWZWhpY2xlKVxyXG5cdHZlaGljbGU6IFZlaGljbGU7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IEJvb2tpbmcpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgYm9va2luZ0lkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gQm9va2luZylcclxuXHRib29raW5nOiBCb29raW5nO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBCZWxvbmdzVG9NYW55KFxyXG5cdFx0KCkgPT4gVXNlcixcclxuXHRcdCgpID0+IEFjY2lkZW50VXNlclN0YXR1cyxcclxuXHRcdFwiYWNjaWRlbnRJZFwiXHJcblx0KVxyXG5cdHVzZXJTdGF0dXNlczogQXJyYXk8QWNjaWRlbnRVc2VyU3RhdHVzPjtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRDcmVhdGVkQXQsXHJcblx0VXBkYXRlZEF0XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEFjY2lkZW50VXNlclN0YXR1c0F0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgQWNjaWRlbnQsIFVzZXIgfSBmcm9tIFwiLlwiO1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBBY2NpZGVudFVzZXJTdGF0dXMgZXh0ZW5kcyBNb2RlbDxBY2NpZGVudFVzZXJTdGF0dXM+XHJcblx0aW1wbGVtZW50cyBBY2NpZGVudFVzZXJTdGF0dXNBdHRyaWJ1dGVzIHtcclxuXHRAQ29sdW1uKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSwgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyByZWFkOiBib29sZWFuO1xyXG5cclxuXHRAQ29sdW1uKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSwgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBkZWxldGVkOiBib29sZWFuO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBBY2NpZGVudClcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBhY2NpZGVudElkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gQWNjaWRlbnQpXHJcblx0cHVibGljIGFjY2lkZW50OiBBY2NpZGVudDtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVXNlcilcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB1c2VySWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBVc2VyKVxyXG5cdHB1YmxpYyB1c2VyOiBVc2VyO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdENyZWF0ZWRBdCxcclxuXHREYXRhVHlwZSxcclxuXHRVcGRhdGVkQXRcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgVXNlciwgVmVoaWNsZSwgUmVwbGFjZVZlaGljbGUgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBCb29raW5nVHlwZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgeyBCb29raW5nQXR0cmlidXRlcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBCb29raW5nIGV4dGVuZHMgTW9kZWw8Qm9va2luZz4gaW1wbGVtZW50cyBCb29raW5nQXR0cmlidXRlcyB7XHJcblx0QFByaW1hcnlLZXlcclxuXHRAQXV0b0luY3JlbWVudFxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgaWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UsIGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgcGFpZDogYm9vbGVhbjtcclxuXHJcblx0QENvbHVtbih7IGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG5cdHB1YmxpYyBhbW91bnQ6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCB0eXBlOiBEYXRhVHlwZS5EQVRFIH0pXHJcblx0cHVibGljIGZyb206IERhdGU7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCB0eXBlOiBEYXRhVHlwZS5EQVRFIH0pXHJcblx0cHVibGljIHRvOiBEYXRlO1xyXG5cclxuXHRAQ29sdW1uKHsgZGVmYXVsdFZhbHVlOiBudWxsIH0pXHJcblx0cHVibGljIGFwcHJvdmVkOiBib29sZWFuIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UsIGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgZmluaXNoZWQ6IGJvb2xlYW47XHJcblxyXG5cdEBDb2x1bW4oRGF0YVR5cGUuRkxPQVQpXHJcblx0cHVibGljIHN0YXJ0TWlsZWFnZTogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbihEYXRhVHlwZS5GTE9BVClcclxuXHRwdWJsaWMgZW5kTWlsZWFnZTogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbihEYXRhVHlwZS5GTE9BVClcclxuXHRwdWJsaWMgc3RhcnRGdWVsOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uKERhdGFUeXBlLkZMT0FUKVxyXG5cdHB1YmxpYyBlbmRGdWVsOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHVzZXJJZDogbnVtYmVyO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBWZWhpY2xlKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHZlaGljbGVJZDogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgdHlwZTogRGF0YVR5cGUuU1RSSU5HIH0pXHJcblx0cHVibGljIHJlYWRvbmx5IGJvb2tpbmdUeXBlOiBCb29raW5nVHlwZTtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gUmVwbGFjZVZlaGljbGUpXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyByZXBsYWNlVmVoaWNsZUlkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVXNlcilcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXNlcjogVXNlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBWZWhpY2xlKVxyXG5cdHB1YmxpYyByZWFkb25seSB2ZWhpY2xlOiBWZWhpY2xlO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFJlcGxhY2VWZWhpY2xlKVxyXG5cdHB1YmxpYyByZWFkb25seSByZXBsYWNlVmVoaWNsZTogUmVwbGFjZVZlaGljbGU7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEZvcmVpZ25LZXksXHJcblx0QmVsb25nc1RvLFxyXG5cdEJlbG9uZ3NUb01hbnksXHJcblx0Q3JlYXRlZEF0XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IENsaWVudCwgVmVoaWNsZSwgVmVoaWNsZUNhdGVnb3J5IH0gZnJvbSBcIi4vXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5QXR0cmlidXRlcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIE1vZGVsPENhdGVnb3J5PiBpbXBsZW1lbnRzIENhdGVnb3J5QXR0cmlidXRlcyB7XHJcblx0QFByaW1hcnlLZXlcclxuXHRAQXV0b0luY3JlbWVudFxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgaWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBDbGllbnQpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgY2xpZW50SWQ6IG51bWJlcjtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IENsaWVudClcclxuXHRwdWJsaWMgcmVhZG9ubHkgY2xpZW50OiBDbGllbnQ7XHJcblxyXG5cdEBCZWxvbmdzVG9NYW55KFxyXG5cdFx0KCkgPT4gVmVoaWNsZSxcclxuXHRcdCgpID0+IFZlaGljbGVDYXRlZ29yeVxyXG5cdClcclxuXHRwdWJsaWMgcmVhZG9ubHkgdmVoaWNsZXM6IFZlaGljbGVbXTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0QmVsb25nc1RvTWFueSxcclxuXHRDcmVhdGVkQXQsXHJcblx0VXBkYXRlZEF0LFxyXG5cdEhhc01hbnlcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgVXNlciwgVmVoaWNsZSwgQ2F0ZWdvcnksIExvY2F0aW9uLCBDbGllbnRMb2NhdGlvbiB9IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IENsaWVudEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQ2xpZW50IGV4dGVuZHMgTW9kZWw8Q2xpZW50PiBpbXBsZW1lbnRzIENsaWVudEF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBVc2VyKVxyXG5cdHB1YmxpYyByZWFkb25seSB1c2VyczogVXNlcltdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBWZWhpY2xlKVxyXG5cdHB1YmxpYyByZWFkb25seSB2ZWhpY2xlczogVmVoaWNsZVtdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBDYXRlZ29yeSlcclxuXHRwdWJsaWMgcmVhZG9ubHkgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBMb2NhdGlvbixcclxuXHRcdCgpID0+IENsaWVudExvY2F0aW9uXHJcblx0KVxyXG5cdHB1YmxpYyByZWFkb25seSBsb2NhdGlvbnM6IExvY2F0aW9uW107XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBDbGllbnQsIExvY2F0aW9uIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgQ2xpZW50TG9jYXRpb25BdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIENsaWVudExvY2F0aW9uIGV4dGVuZHMgTW9kZWw8Q2xpZW50TG9jYXRpb24+XHJcblx0aW1wbGVtZW50cyBDbGllbnRMb2NhdGlvbkF0dHJpYnV0ZXMge1xyXG5cdEBGb3JlaWduS2V5KCgpID0+IENsaWVudClcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBjbGllbnRJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IENsaWVudClcclxuXHRwdWJsaWMgY2xpZW50OiBDbGllbnQ7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IExvY2F0aW9uKVxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGxvY2F0aW9uSWQ6IG51bWJlcjtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBMb2NhdGlvbilcclxuXHRwdWJsaWMgbG9jYXRpb246IExvY2F0aW9uO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdEJlbG9uZ3NUb01hbnksXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdCxcclxuXHRIYXNNYW55XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IFZlaGljbGUsIENsaWVudCwgQ2xpZW50TG9jYXRpb24gfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbkF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgTG9jYXRpb24gZXh0ZW5kcyBNb2RlbDxMb2NhdGlvbj4gaW1wbGVtZW50cyBMb2NhdGlvbkF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgbGF0OiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGxuZzogbnVtYmVyO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBhZGRyZXNzOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgbG9jYXRpb25JbWFnZVNyYzogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQmVsb25nc1RvTWFueShcclxuXHRcdCgpID0+IENsaWVudCxcclxuXHRcdCgpID0+IENsaWVudExvY2F0aW9uXHJcblx0KVxyXG5cdHB1YmxpYyByZWFkb25seSBjbGllbnRzOiBDbGllbnRbXTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gVmVoaWNsZSlcclxuXHRwdWJsaWMgcmVhZG9ubHkgdmVoaWNsZXM/OiBWZWhpY2xlW107XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0UHJpbWFyeUtleSxcclxuXHRBdXRvSW5jcmVtZW50LFxyXG5cdENyZWF0ZWRBdCxcclxuXHRVcGRhdGVkQXQsXHJcblx0SGFzT25lXHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEJvb2tpbmcgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgUmVwbGFjZVZlaGljbGUgZXh0ZW5kcyBNb2RlbDxSZXBsYWNlVmVoaWNsZT5cclxuXHRpbXBsZW1lbnRzIFJlcGxhY2VWZWhpY2xlQXR0cmlidXRlcyB7XHJcblx0QFByaW1hcnlLZXlcclxuXHRAQXV0b0luY3JlbWVudFxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgaWQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGJyYW5kOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgbW9kZWw6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyB2aW46IHN0cmluZztcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRASGFzT25lKCgpID0+IEJvb2tpbmcpXHJcblx0cHVibGljIHJlYWRvbmx5IGJvb2tpbmc/OiBCb29raW5nO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRDcmVhdGVkQXQsXHJcblx0RGF0YVR5cGUsXHJcblx0VXBkYXRlZEF0LFxyXG5cdEJlbG9uZ3NUb01hbnksXHJcblx0SGFzTWFueVxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQge1xyXG5cdENsaWVudCxcclxuXHRBY2NpZGVudCxcclxuXHRBY2NpZGVudFVzZXJTdGF0dXMsXHJcblx0Q2F0ZWdvcnksXHJcblx0VXNlclZlaGljbGVDYXRlZ29yeSxcclxuXHRCb29raW5nXHJcbn0gZnJvbSBcIi4vXCI7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgVXNlckF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIE1vZGVsPFVzZXI+IGltcGxlbWVudHMgVXNlckF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oe1xyXG5cdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdHVuaXF1ZTogeyBuYW1lOiBcImVtYWlsXCIsIG1zZzogXCJFbWFpbCBhZGRyZXNzIGFscmVhZHkgaW4gdXNlLlwiIH1cclxuXHR9KVxyXG5cdHB1YmxpYyB1c2VybmFtZTogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBmaXJzdE5hbWU6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgbGFzdE5hbWU6IHN0cmluZztcclxuXHJcblx0QENvbHVtbih7XHJcblx0XHRhbGxvd051bGw6IGZhbHNlLFxyXG5cdFx0dW5pcXVlOiB7IG5hbWU6IFwiZW1haWxcIiwgbXNnOiBcIkVtYWlsIGFkZHJlc3MgYWxyZWFkeSBpbiB1c2UuXCIgfVxyXG5cdH0pXHJcblx0cHVibGljIGVtYWlsOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHBhc3N3b3JkOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oe1xyXG5cdFx0YWxsb3dOdWxsOiBmYWxzZSxcclxuXHRcdHVuaXF1ZTogeyBuYW1lOiBcImVtYWlsXCIsIG1zZzogXCJFbWFpbCBhZGRyZXNzIGFscmVhZHkgaW4gdXNlLlwiIH1cclxuXHR9KVxyXG5cdHB1YmxpYyBtb2JpbGVOdW1iZXI6IHN0cmluZztcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyBjb250cmFjdE5vOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIG9iamVjdE5vOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGxhc3RMb2dpbjogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENvbHVtblxyXG5cdHB1YmxpYyB1c2VySW1hZ2VTcmM6IHN0cmluZyB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgbGljZW5zZUltYWdlU3JjOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBibG9ja2VkOiBib29sZWFuO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBlbWFpbENvbmZpcm1lZDogYm9vbGVhbjtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gQ2xpZW50KVxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgY2xpZW50SWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDb2x1bW4oeyB0eXBlOiBEYXRhVHlwZS5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgcm9sZTogUm9sZTtcclxuXHJcblx0QENvbHVtbih7IHR5cGU6IERhdGFUeXBlLlNUUklORywgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB0aW1lWm9uZTogc3RyaW5nO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgdXNlckNyZWF0b3JJZDogbnVtYmVyO1xyXG5cclxuXHRAQ3JlYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QFVwZGF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSB1cGRhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gQ2xpZW50KVxyXG5cdGNsaWVudDogQ2xpZW50O1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFVzZXIsIFwidXNlckNyZWF0b3JJZFwiKVxyXG5cdHVzZXJDcmVhdG9yOiBVc2VyO1xyXG5cclxuXHRAQmVsb25nc1RvTWFueShcclxuXHRcdCgpID0+IEFjY2lkZW50LFxyXG5cdFx0KCkgPT4gQWNjaWRlbnRVc2VyU3RhdHVzXHJcblx0KVxyXG5cdGFjY2lkZW50U3RhdHVzZXM6IEFjY2lkZW50VXNlclN0YXR1c1tdO1xyXG5cclxuXHRAQmVsb25nc1RvTWFueShcclxuXHRcdCgpID0+IENhdGVnb3J5LFxyXG5cdFx0KCkgPT4gVXNlclZlaGljbGVDYXRlZ29yeVxyXG5cdClcclxuXHRjYXRlZ29yaWVzOiBDYXRlZ29yeVtdO1xyXG5cclxuXHRASGFzTWFueSgoKSA9PiBCb29raW5nKVxyXG5cdGJvb2tpbmdzOiBCb29raW5nW107XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBVc2VyLCBDYXRlZ29yeSB9IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IFVzZXJWZWhpY2xlQ2F0ZWdvcnlBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFVzZXJWZWhpY2xlQ2F0ZWdvcnkgZXh0ZW5kcyBNb2RlbDxVc2VyVmVoaWNsZUNhdGVnb3J5PlxyXG5cdGltcGxlbWVudHMgVXNlclZlaGljbGVDYXRlZ29yeUF0dHJpYnV0ZXMge1xyXG5cdEBGb3JlaWduS2V5KCgpID0+IFVzZXIpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdXNlcklkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVXNlcilcclxuXHRwdWJsaWMgdXNlcjogVXNlcjtcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gQ2F0ZWdvcnkpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgY2F0ZWdvcnlJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IENhdGVnb3J5KVxyXG5cdHB1YmxpYyBjYXRlZ29yeTogQ2F0ZWdvcnk7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFRhYmxlLFxyXG5cdENvbHVtbixcclxuXHRNb2RlbCxcclxuXHRQcmltYXJ5S2V5LFxyXG5cdEF1dG9JbmNyZW1lbnQsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdCxcclxuXHRIYXNNYW55LFxyXG5cdEJlbG9uZ3NUb01hbnksXHJcblx0RGF0YVR5cGVcclxufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHtcclxuXHRDbGllbnQsXHJcblx0TG9jYXRpb24sXHJcblx0Qm9va2luZyxcclxuXHRWZWhpY2xlSXNzdWUsXHJcblx0Q2F0ZWdvcnksXHJcblx0VmVoaWNsZUNhdGVnb3J5LFxyXG5cdEFjY2lkZW50XHJcbn0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgQm9va2luZ0NoYXJnZVVuaXQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgVmVoaWNsZUF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgVmVoaWNsZSBleHRlbmRzIE1vZGVsPFZlaGljbGU+IGltcGxlbWVudHMgVmVoaWNsZUF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIGJyYW5kOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIG1vZGVsOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHBsYXRlTnVtYmVyOiBzdHJpbmc7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIHZpbjogc3RyaW5nO1xyXG5cclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyBkZWZsZWV0ZWQ6IGJvb2xlYW47XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgcGFya2luZ0xvY2F0aW9uOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uXHJcblx0cHVibGljIHZlaGljbGVJbWFnZVNyYzogc3RyaW5nIHwgbnVsbDtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGRlZmF1bHRWYWx1ZTogMCB9KVxyXG5cdHB1YmxpYyBib29raW5nQ2hhcmdlQ291bnQ6IG51bWJlcjtcclxuXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGRlZmF1bHRWYWx1ZTogMCB9KVxyXG5cdHB1YmxpYyBib29raW5nQ2hhcmdlOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW5cclxuXHRwdWJsaWMgd2lhbG9uVW5pdElkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRAQ29sdW1uKHsgdHlwZTogRGF0YVR5cGUuU1RSSU5HIH0pXHJcblx0cHVibGljIGJvb2tpbmdDaGFyZ2VVbml0OiBCb29raW5nQ2hhcmdlVW5pdCB8IG51bGw7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IENsaWVudClcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGNsaWVudElkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRARm9yZWlnbktleSgoKSA9PiBMb2NhdGlvbilcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGxvY2F0aW9uSWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdEBDcmVhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgY3JlYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAVXBkYXRlZEF0XHJcblx0cHVibGljIHJlYWRvbmx5IHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gQm9va2luZylcclxuXHRwdWJsaWMgcmVhZG9ubHkgYm9va2luZ3M6IEJvb2tpbmdbXTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gQWNjaWRlbnQpXHJcblx0cHVibGljIHJlYWRvbmx5IGFjY2lkZW50czogQWNjaWRlbnRbXTtcclxuXHJcblx0QEhhc01hbnkoKCkgPT4gVmVoaWNsZUlzc3VlKVxyXG5cdHB1YmxpYyByZWFkb25seSB2ZWhpY2xlSXNzdWVzOiBWZWhpY2xlSXNzdWVbXTtcclxuXHJcblx0QEJlbG9uZ3NUb01hbnkoXHJcblx0XHQoKSA9PiBDYXRlZ29yeSxcclxuXHRcdCgpID0+IFZlaGljbGVDYXRlZ29yeVxyXG5cdClcclxuXHRwdWJsaWMgcmVhZG9ubHkgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcclxuXHJcblx0QEJlbG9uZ3NUbygoKSA9PiBDbGllbnQpXHJcblx0cHVibGljIHJlYWRvbmx5IGNsaWVudDogQ2xpZW50O1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IExvY2F0aW9uKVxyXG5cdHB1YmxpYyByZWFkb25seSBsb2NhdGlvbjogTG9jYXRpb247XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuXHRUYWJsZSxcclxuXHRDb2x1bW4sXHJcblx0TW9kZWwsXHJcblx0Rm9yZWlnbktleSxcclxuXHRCZWxvbmdzVG8sXHJcblx0Q3JlYXRlZEF0LFxyXG5cdFVwZGF0ZWRBdFxyXG59IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSwgVmVoaWNsZSB9IGZyb20gXCIuXCI7XHJcbmltcG9ydCB7IFZlaGljbGVDYXRlZ29yeUF0dHJpYnV0ZXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgVmVoaWNsZUNhdGVnb3J5IGV4dGVuZHMgTW9kZWw8VmVoaWNsZUNhdGVnb3J5PlxyXG5cdGltcGxlbWVudHMgVmVoaWNsZUNhdGVnb3J5QXR0cmlidXRlcyB7XHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gQ2F0ZWdvcnkpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgY2F0ZWdvcnlJZDogbnVtYmVyO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IENhdGVnb3J5KVxyXG5cdHB1YmxpYyBjYXRlZ29yeTogQ2F0ZWdvcnk7XHJcblxyXG5cdEBGb3JlaWduS2V5KCgpID0+IFZlaGljbGUpXHJcblx0QENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UgfSlcclxuXHRwdWJsaWMgdmVoaWNsZUlkOiBudW1iZXI7XHJcblxyXG5cdEBCZWxvbmdzVG8oKCkgPT4gVmVoaWNsZSlcclxuXHRwdWJsaWMgdmVoaWNsZTogVmVoaWNsZTtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG59XHJcbiIsImltcG9ydCB7XHJcblx0VGFibGUsXHJcblx0Q29sdW1uLFxyXG5cdE1vZGVsLFxyXG5cdFByaW1hcnlLZXksXHJcblx0QXV0b0luY3JlbWVudCxcclxuXHRGb3JlaWduS2V5LFxyXG5cdEJlbG9uZ3NUbyxcclxuXHRDcmVhdGVkQXQsXHJcblx0VXBkYXRlZEF0XHJcbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IFZlaGljbGUgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlSXNzdWVBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFZlaGljbGVJc3N1ZSBleHRlbmRzIE1vZGVsPFZlaGljbGVJc3N1ZT5cclxuXHRpbXBsZW1lbnRzIFZlaGljbGVJc3N1ZUF0dHJpYnV0ZXMge1xyXG5cdEBQcmltYXJ5S2V5XHJcblx0QEF1dG9JbmNyZW1lbnRcclxuXHRAQ29sdW1uXHJcblx0cHVibGljIGlkOiBudW1iZXI7XHJcblxyXG5cdEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlIH0pXHJcblx0cHVibGljIG1lc3NhZ2U6IHN0cmluZztcclxuXHJcblx0QEZvcmVpZ25LZXkoKCkgPT4gVmVoaWNsZSlcclxuXHRAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSB9KVxyXG5cdHB1YmxpYyB2ZWhpY2xlSWQ6IG51bWJlcjtcclxuXHJcblx0QENyZWF0ZWRBdFxyXG5cdHB1YmxpYyByZWFkb25seSBjcmVhdGVkQXQ6IERhdGU7XHJcblxyXG5cdEBVcGRhdGVkQXRcclxuXHRwdWJsaWMgcmVhZG9ubHkgdXBkYXRlZEF0OiBEYXRlO1xyXG5cclxuXHRAQmVsb25nc1RvKCgpID0+IFZlaGljbGUpXHJcblx0cHVibGljIHJlYWRvbmx5IHZlaGljbGU6IFZlaGljbGU7XHJcbn1cclxuIiwiaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9yIH0gZnJvbSBcInl1cFwiO1xyXG5pbXBvcnQgeyBGaWVsZEVycm9yLCBGb3JtRXhjZXB0aW9uIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnNcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL0FwaUVycm9ySGFuZGxlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9Gb3JtRXJyb3JCdWlsZGVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VmFsaWRhdGlvbkVycm9ycyA9IChlcnJvcnM6IFZhbGlkYXRpb25FcnJvcik6IEZpZWxkRXJyb3JbXSA9PlxyXG5cdGVycm9ycy5pbm5lci5tYXAoZXJyb3IgPT4gKHtcclxuXHRcdGZpZWxkOiBlcnJvci5wYXRoLFxyXG5cdFx0bWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuXHRcdG5hbWU6IGVycm9yLm5hbWVcclxuXHR9KSk7XHJcblxyXG5leHBvcnQgY29uc3QgY2F0Y2hZdXBWYWRhdGlvbkVycm9ycyA9IGFzeW5jIChcclxuXHR2YWxpZGF0b3I6ICgpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XHJcbikgPT4ge1xyXG5cdGxldCBlcnJvcnM6IEZpZWxkRXJyb3JbXSA9IFtdO1xyXG5cdHRyeSB7XHJcblx0XHRhd2FpdCB2YWxpZGF0b3IoKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRpZiAoZSBpbnN0YW5jZW9mIFZhbGlkYXRpb25FcnJvcikge1xyXG5cdFx0XHRlcnJvcnMgPSBnZXRWYWxpZGF0aW9uRXJyb3JzKGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGVycm9ycy5sZW5ndGgpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEZvcm1FeGNlcHRpb24oXHJcblx0XHRcdFx0XCJBbiBlcnJvciBoYXMgb2NjdXJlZCBpbiBvbmUgb2YgdGhlIGZpZWxkcy5cIixcclxuXHRcdFx0XHRlcnJvcnNcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbiIsImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhc3RhYmxlPFI+IHtcclxuXHRjYXN0OiAodXNlcjogVXNlcikgPT4gUjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb248UiwgVCBleHRlbmRzIENhc3RhYmxlPFI+PiB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIGRhdGE6IFRbXSkge31cclxuXHJcblx0cHVibGljIGNhc3QgPSAodXNlcjogVXNlcikgPT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNhc3QodXNlcikpO1xyXG5cdH07XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2ZpcnN0ICovXHJcbmltcG9ydCBlbnYgZnJvbSBcImRvdGVudlwiO1xyXG5lbnYuY29uZmlnKCk7XHJcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBwYXNzcG9ydCBmcm9tIFwicGFzc3BvcnRcIjtcclxuaW1wb3J0IHsgU3RyYXRlZ3kgfSBmcm9tIFwicGFzc3BvcnQtbG9jYWxcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGNvcnMgZnJvbSBcImNvcnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XHJcbmltcG9ydCBleHByZXNzU2Vzc2lvbiBmcm9tIFwiZXhwcmVzcy1zZXNzaW9uXCI7XHJcblxyXG5pbXBvcnQgeyBnZXRTdGF0aWNGaWxlc1BhdGggfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IFVzZXIsIENhdGVnb3J5IH0gZnJvbSBcIi4vbW9kZWxzXCI7XHJcbmltcG9ydCBhdXRoUm91dGVzIGZyb20gXCIuL3JvdXRlcy9hdXRoXCI7XHJcbmltcG9ydCB1c2VyUm91dGVzIGZyb20gXCIuL3JvdXRlcy91c2Vyc1wiO1xyXG5pbXBvcnQgaW52aXRlUm91dGVzIGZyb20gXCIuL3JvdXRlcy9pbnZpdGVzXCI7XHJcbmltcG9ydCB2ZWhpY2xlUm91dGVzIGZyb20gXCIuL3JvdXRlcy92ZWhpY2xlc1wiO1xyXG5pbXBvcnQgYm9va2luZ1JvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvYm9va2luZ3NcIjtcclxuaW1wb3J0IGxvY2F0aW9uUm91dGVzIGZyb20gXCIuL3JvdXRlcy9sb2NhdGlvbnNcIjtcclxuaW1wb3J0IGFjY2lkZW50Um91dGVzIGZyb20gXCIuL3JvdXRlcy9hY2NpZGVudHNcIjtcclxuaW1wb3J0IGNhdGVnb3J5Um91dGVzIGZyb20gXCIuL3JvdXRlcy9jYXRlZ29yaWVzXCI7XHJcbmltcG9ydCBjbGllbnRSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2NsaWVudHNcIjtcclxuaW1wb3J0IHZlaGljZWxJc3N1ZVJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvdmVoaWNsZUlzc3Vlc1wiO1xyXG5pbXBvcnQgd2lhbG9uUm91dGVzIGZyb20gXCIuL3JvdXRlcy93aWFsb25cIjtcclxuaW1wb3J0IHJlcG9ydFJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvcmVwb3J0c1wiO1xyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG4vLyBQQVNTUE9SVCBDT05GSUdVUkFUSU9OU1xyXG5wYXNzcG9ydC51c2UoXHJcblx0bmV3IFN0cmF0ZWd5KGFzeW5jICh1c2VybmFtZSwgcGFzc3dvcmQsIGNiKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgZXhpc3RpbmdVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcclxuXHRcdFx0XHR3aGVyZTogeyB1c2VybmFtZSB9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKGV4aXN0aW5nVXNlcikge1xyXG5cdFx0XHRcdGxldCB2YWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCBleGlzdGluZ1VzZXIucGFzc3dvcmQpO1xyXG5cclxuXHRcdFx0XHRpZiAoIXZhbGlkIHx8IGV4aXN0aW5nVXNlci5ibG9ja2VkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY2IobnVsbCwgZmFsc2UpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRleGlzdGluZ1VzZXIucm9sZSAhPT0gUm9sZS5NQVNURVIgJiZcclxuXHRcdFx0XHRcdGV4aXN0aW5nVXNlci5jbGllbnRJZCA9PT0gbnVsbFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxyXG5cdFx0XHRcdFx0XHRcIllvdXIgYWNjb3VudCBkb2VzIG5vdCBiZWxvbmcgdG8gYSBjbGllbnQuIFBsZWFzZSBjb250YWN0IGN1c3RvbWVyIHN1cHBvcnQuXCJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiBjYihudWxsLCBleGlzdGluZ1VzZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY2IobnVsbCwgZmFsc2UpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXR1cm4gY2IoZSk7XHJcblx0XHR9XHJcblx0fSlcclxuKTtcclxuXHJcbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoZnVuY3Rpb24odXNlcjogeyBpZDogbnVtYmVyIH0sIGNiKSB7XHJcblx0Y2IobnVsbCwgdXNlci5pZCk7XHJcbn0pO1xyXG5cclxucGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKGFzeW5jIChpZDogbnVtYmVyLCBjYikgPT4ge1xyXG5cdHRyeSB7XHJcblx0XHRjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlQayhpZCwge1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogQ2F0ZWdvcnkgfV0sXHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBbXCJwYXNzd29yZFwiXVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRjYihudWxsLCB1c2VyKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRjYihlKTtcclxuXHR9XHJcbn0pO1xyXG4vLyBFWFBSRVNTIENPTkZJR1VSQVRJT05TXHJcblxyXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcclxuYXBwLnVzZShcclxuXHRleHByZXNzU2Vzc2lvbih7XHJcblx0XHRzZWNyZXQ6IGNvbmZpZy5zZWNyZXRLZXksXHJcblx0XHRyZXNhdmU6IGZhbHNlLFxyXG5cdFx0c2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlXHJcblx0fSlcclxuKTtcclxuYXBwLnVzZShleHByZXNzLmpzb24oKSk7XHJcbi8vIFRPRE86IFVzZSBjb25maWcuanMgZm9yIGNvcnMgb3B0aW9ucy5cclxuYXBwLnVzZShjb3JzKHsgb3JpZ2luOiBwcm9jZXNzLmVudi5DTElFTlRfVVJMLCBjcmVkZW50aWFsczogdHJ1ZSB9KSk7XHJcblxyXG4vLyBJbml0aWFsaXplIFBhc3Nwb3J0IGFuZCByZXN0b3JlIGF1dGhlbnRpY2F0aW9uIHN0YXRlLCBpZiBhbnksIGZyb20gdGhlXHJcbi8vIHNlc3Npb24uXHJcbmFwcC51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcclxuYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xyXG5cclxuLy8gRXhwcmVzcyByb3V0ZXNcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9hdXRoXCIsIGF1dGhSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL3VzZXJzXCIsIHVzZXJSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2ludml0ZXNcIiwgaW52aXRlUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy92ZWhpY2xlc1wiLCB2ZWhpY2xlUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9ib29raW5nc1wiLCBib29raW5nUm91dGVzKTtcclxuYXBwLnVzZShcIi9hcGkvY2FyYm9va2luZy9sb2NhdGlvbnNcIiwgbG9jYXRpb25Sb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2FjY2lkZW50c1wiLCBhY2NpZGVudFJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvY2F0ZWdvcmllc1wiLCBjYXRlZ29yeVJvdXRlcyk7XHJcbmFwcC51c2UoXCIvYXBpL2NhcmJvb2tpbmcvY2xpZW50c1wiLCBjbGllbnRSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL2lzc3Vlc1wiLCB2ZWhpY2VsSXNzdWVSb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL3dpYWxvblwiLCB3aWFsb25Sb3V0ZXMpO1xyXG5hcHAudXNlKFwiL2FwaS9jYXJib29raW5nL3JlcG9ydHNcIiwgcmVwb3J0Um91dGVzKTtcclxuXHJcbmFwcC51c2UoXCIvc3RhdGljXCIsIGV4cHJlc3Muc3RhdGljKGdldFN0YXRpY0ZpbGVzUGF0aCgpKSk7XHJcbmFwcC51c2UoXCIvc3RhdGljXCIsIGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwicHVibGljXCIpKSk7XHJcblxyXG5hcHAubGlzdGVuKGNvbmZpZy5zZXJ2ZXJQb3J0LCAoKSA9PiB7XHJcblx0Y29uc29sZS5sb2coYExpc3RlbmluZyBvbiBwb3J0ICR7Y29uZmlnLnNlcnZlclBvcnR9YCk7XHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLXNlc3Npb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsImV4cG9ydCAqIGZyb20gXCIuL0Jvb2tpbmdDaGFyZ2VVbml0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0Jvb2tpbmdTdGF0dXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQm9va2luZ1R5cGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vUm9sZVwiO1xyXG4iLCJleHBvcnQgZW51bSBCb29raW5nQ2hhcmdlVW5pdCB7XHJcblx0S0lMT01FVEVSID0gXCJLbVwiLFxyXG5cdFNFQ09ORCA9IFwiU2Vjb25kXCIsXHJcblx0SE9VUiA9IFwiSG91clwiLFxyXG5cdERBWSA9IFwiRGF5XCIsXHJcblx0V0VFSyA9IFwiV2Vla1wiLFxyXG5cdE1PTlRIID0gXCJNb250aFwiXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gQm9va2luZ1N0YXR1cyB7XHJcblx0VU5LTk9XTiA9IFwiVU5LTk9XTlwiLFxyXG5cdE9OR09JTkcgPSBcIk9OR09JTkdcIixcclxuXHRGSU5JU0hFRCA9IFwiRklOSVNIRURcIixcclxuXHRBUFBST1ZFRCA9IFwiQVBQUk9WRURcIixcclxuXHRFWFBJUkVEID0gXCJFWFBJUkVEXCIsXHJcblx0REVOSUVEID0gXCJERU5JRURcIixcclxuXHRQRU5ESU5HID0gXCJQRU5ESU5HXCJcclxufVxyXG4iLCJleHBvcnQgZW51bSBCb29raW5nVHlwZSB7XHJcblx0UFJJVkFURSA9IFwiUFJJVkFURVwiLFxyXG5cdEJVU0lORVNTID0gXCJCVVNJTkVTU1wiLFxyXG5cdFNFUlZJQ0UgPSBcIlNFUlZJQ0VcIixcclxuXHRSRVBMQUNFTUVOVCA9IFwiUkVQTEFDRU1FTlRcIlxyXG59XHJcbiIsImV4cG9ydCBlbnVtIFJvbGUge1xyXG5cdE1BU1RFUiA9IFwiTUFTVEVSXCIsXHJcblx0QURNSU4gPSBcIkFETUlOXCIsXHJcblx0S0VZX01BTkFHRVIgPSBcIktFWV9NQU5BR0VSXCIsXHJcblx0R1VFU1QgPSBcIkdVRVNUXCJcclxufVxyXG4iLCJpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuL2V4Y2VwdGlvbnNcIjtcclxuaW1wb3J0IHtcclxuXHRGb3JtRXhjZXB0aW9uLFxyXG5cdEZpZWxkRXJyb3IsXHJcblx0SXRlbU5vdEZvdW5kRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4uL2FwaS9leGNlcHRpb25zXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlQnVpbGRlcjxUID0gdW5rbm93bj4ge1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBkYXRhOiBUID0gbnVsbCxcclxuXHRcdHByaXZhdGUgc3VjY2VzcyA9IGZhbHNlLFxyXG5cdFx0cHJpdmF0ZSBtZXNzYWdlID0gXCJVbmtub3duIHNlcnZlciBlcnJvci5cIixcclxuXHRcdHByaXZhdGUgZXJyb3JzOiBGaWVsZEVycm9yW10gPSBbXSxcclxuXHRcdHByaXZhdGUgY29kZSA9IDUwMFxyXG5cdCkge31cclxuXHJcblx0c2V0RGF0YShkYXRhOiBUKSB7XHJcblx0XHR0aGlzLmRhdGEgPSBkYXRhO1xyXG5cdH1cclxuXHJcblx0c2V0U3VjY2VzcyhzdWNjZXNzOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLnN1Y2Nlc3MgPSBzdWNjZXNzO1xyXG5cdH1cclxuXHJcblx0YXBwZW5kRXJyb3IoZXJyb3I6IEZpZWxkRXJyb3IpIHtcclxuXHRcdHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xyXG5cdH1cclxuXHJcblx0c2V0Q29kZShjb2RlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuY29kZSA9IGNvZGU7XHJcblx0fVxyXG5cclxuXHRzZXRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9yKGU6IEVycm9yLCByZXM6IFJlc3BvbnNlKSB7XHJcblx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHRcdGlmIChlIGluc3RhbmNlb2YgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24pIHtcclxuXHRcdFx0dGhpcy5zZXRDb2RlKDQyMik7XHJcblx0XHRcdHJlcy5zdGF0dXMoNDIyKTtcclxuXHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdGUgaW5zdGFuY2VvZiBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uIHx8XHJcblx0XHRcdGUgaW5zdGFuY2VvZiBJdGVtTm90Rm91bmRFeGNlcHRpb25cclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnNldENvZGUoNDA0KTtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MDQpO1xyXG5cdFx0fSBlbHNlIGlmIChlIGluc3RhbmNlb2YgRm9ybUV4Y2VwdGlvbikge1xyXG5cdFx0XHRlLmZpZWxkcy5mb3JFYWNoKGVycm9yID0+IHRoaXMuYXBwZW5kRXJyb3IoZXJyb3IpKTtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MDMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzLnN0YXR1cyg1MDApO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRNZXNzYWdlKGUubWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVTdWNjZXNzKG1lc3NhZ2U6IHN0cmluZywgcmVzOiBSZXNwb25zZSkge1xyXG5cdFx0dGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xyXG5cdFx0dGhpcy5zZXRDb2RlKDIwMCk7XHJcblx0XHR0aGlzLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRyZXMuc3RhdHVzKDIwMCk7XHJcblx0fVxyXG5cclxuXHR0b09iamVjdCgpIHtcclxuXHRcdGNvbnN0IHsgbWVzc2FnZSwgY29kZSwgZXJyb3JzLCBzdWNjZXNzLCBkYXRhIH0gPSB0aGlzO1xyXG5cdFx0cmV0dXJuIHsgbWVzc2FnZSwgY29kZSwgZXJyb3JzLCBzdWNjZXNzLCBkYXRhIH07XHJcblx0fVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0bWVzc2FnZTogc3RyaW5nID0gXCJZb3UgZG8gbm90IGhhdmUgdGhlIHBlcm1pc3Npb24gdG8gYWNjZXNzIHRoaXMgcmVzb3VyY2UuXCJcclxuXHQpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkSW5wdXRFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XHJcblx0ZmllbGRzOiBzdHJpbmdbXTtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGZpZWxkczogc3RyaW5nW10gPSBbXSkge1xyXG5cdFx0c3VwZXIobWVzc2FnZSk7XHJcblx0XHR0aGlzLmZpZWxkcyA9IGZpZWxkcztcclxuXHR9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEFwaUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWVsZEVycm9yIHtcclxuXHRmaWVsZDogc3RyaW5nO1xyXG5cdG1lc3NhZ2U6IHN0cmluZztcclxuXHRuYW1lOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIEZvcm1FeGNlcHRpb24gZXh0ZW5kcyBBcGlFeGNlcHRpb24ge1xyXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgcHVibGljIGZpZWxkczogRmllbGRFcnJvcltdKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcblx0cHVibGljIHRocm93ID0gKCkgPT4ge1xyXG5cdFx0aWYgKHRoaXMuZmllbGRzKSB7XHJcblx0XHRcdHRocm93IHRoaXM7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFCYXNlRXhjZXB0aW9uIGV4dGVuZHMgQXBpRXhjZXB0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tIFwiLlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uIGV4dGVuZHMgQXBpRXhjZXB0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKG1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBEYXRhQmFzZUV4Y2VwdGlvbiB9IGZyb20gXCIuL1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEl0ZW1Ob3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIERhdGFCYXNlRXhjZXB0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XHJcblx0XHRzdXBlcihtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUm9sZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvbGVVdGlscyB7XHJcblx0LyoqXHJcblx0ICogTG93ZXIgaW5kZXgsIGhpZ2hlciBwZXJtaXNzaW9ucy5cclxuXHQgKi9cclxuXHRzdGF0aWMgcm9sZVJhbmtzID0gW1JvbGUuTUFTVEVSLCBSb2xlLkFETUlOLCBSb2xlLktFWV9NQU5BR0VSLCBSb2xlLkdVRVNUXTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHJlcXVpcmVkUm9sZSBUaGUgcm9sZSByZXF1aXJlZCB0byBiZSBoaWdoZXIgb3IgZXF1YWwgdG8uXHJcblx0ICogQHBhcmFtIHJvbGUgVGhlIHJvbGUgdG8gYmUgY29tcGFyZWQuXHJcblx0ICovXHJcblx0c3RhdGljIGlzUm9sZUJldHRlciA9IChyZXF1aXJlZFJvbGU6IFJvbGUsIHJvbGU6IFJvbGUgfCBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuXHRcdGNvbnN0IHJlcXVpcmVkUm9sZUluZGV4ID0gUm9sZVV0aWxzLnJvbGVSYW5rcy5maW5kSW5kZXgoXHJcblx0XHRcdHZhbHVlID0+IHZhbHVlID09PSByZXF1aXJlZFJvbGVcclxuXHRcdCk7XHJcblxyXG5cdFx0Y29uc3Qgcm9sZUluZGV4ID0gUm9sZVV0aWxzLnJvbGVSYW5rcy5maW5kSW5kZXgodmFsdWUgPT4gdmFsdWUgPT09IHJvbGUpO1xyXG5cclxuXHRcdGlmIChyZXF1aXJlZFJvbGVJbmRleCA+PSAwICYmIHJvbGVJbmRleCA+PSAwKSB7XHJcblx0XHRcdHJldHVybiByb2xlSW5kZXggPD0gcmVxdWlyZWRSb2xlSW5kZXg7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH07XHJcbn1cclxuIiwiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHBhc3Nwb3J0IGZyb20gXCJwYXNzcG9ydFwiO1xyXG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcbmltcG9ydCB7IGNoZWNrLCBvbmVPZiwgdmFsaWRhdGlvblJlc3VsdCB9IGZyb20gXCJleHByZXNzLXZhbGlkYXRvclwiO1xyXG5cclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IHNlbmRQYXNzd29yZFJlc2V0VG9rZW4gfSBmcm9tIFwiLi4vdXRpbHMvbWFpbFwiO1xyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IFBhc3N3b3JkUmVzZXRUb2tlbiB9IGZyb20gXCIuLi90eXBpbmdzXCI7XHJcblxyXG5jb25zdCB7IHNlY3JldEtleSB9ID0gY29uZmlnO1xyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldChcIi9tZVwiLCByZXF1aXJlTG9naW4sIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEocmVxLnVzZXIpO1xyXG5cdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJZb3UgYXJlIGxvZ2dlZCBpbi5cIik7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxucm91dGVyLnBhdGNoKFwiL21lXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgZnVuY3Rpb24oeyB1c2VyLCBib2R5IH0sIHJlcykge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRsZXQgbWUgPSB1c2VyICYmIChhd2FpdCBkYi5Vc2VyLmZpbmRCeVBrKHVzZXIuaWQpKTtcclxuXHRpZiAobWUpIHtcclxuXHRcdGlmIChib2R5LnBhc3N3b3JkICYmIGJvZHkucGFzc3dvcmRPbGQpIHtcclxuXHRcdFx0bGV0IHNhbWVQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGJvZHkucGFzc3dvcmQsIG1lLnBhc3N3b3JkKTtcclxuXHRcdFx0aWYgKCFzYW1lUGFzc3dvcmQpIHtcclxuXHRcdFx0XHRsZXQgdmFsaWRPbGRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKFxyXG5cdFx0XHRcdFx0Ym9keS5wYXNzd29yZE9sZCxcclxuXHRcdFx0XHRcdG1lLnBhc3N3b3JkXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHRsZXQgbmV3UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChib2R5LnBhc3N3b3JkLCAxMCk7XHJcblx0XHRcdFx0aWYgKHZhbGlkT2xkUGFzc3dvcmQpIHtcclxuXHRcdFx0XHRcdGF3YWl0IG1lLnVwZGF0ZSh7IHBhc3N3b3JkOiBuZXdQYXNzd29yZCB9KTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJTdWNjZXNzZnVsbHkgdXBkYXRlZC5cIik7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMCk7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiSW52YWxpZCBvbGQgcGFzc3dvcmQuXCIpO1xyXG5cdFx0XHRcdFx0cmVzLnN0YXR1cyg0MDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMCk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIk9sZCBwYXNzd29yZCBpcyBzYW1lIGFzIHRoZSBuZXcgb25lLlwiKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDEpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlVuYXV0aG9yaXplZC4gQXJlIHlvdSBsb2dnZWQgaW4/XCIpO1xyXG5cdFx0cmVzLnN0YXR1cyg0MDEpO1xyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXHJcblx0XCIvbG9naW5cIixcclxuXHRmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xyXG5cdFx0cGFzc3BvcnQuYXV0aGVudGljYXRlKFwibG9jYWxcIiwgZnVuY3Rpb24oZXJyLCB1c2VyLCBpbmZvKSB7XHJcblx0XHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoZXJyLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXVzZXIpIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiSW52YWxpZCBsb2dpbiBkZXRhaWxzXCIpO1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMSk7XHJcblx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXEubG9nSW4odXNlciwgZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdFx0Ly8gVE9ETzogVXBkYXRlZCBsYXN0IGxvZ2luIGluIHVzZXIuXHJcblx0XHRcdFx0ZGIuVXNlci5maW5kQnlQayh1c2VyLmlkKS50aGVuKHVzZXIgPT4ge1xyXG5cdFx0XHRcdFx0dXNlciAmJlxyXG5cdFx0XHRcdFx0XHR1c2VyLnVwZGF0ZSh7IGxhc3RMb2dpbjogbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzc1wiKSB9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV4dChlcnIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiTG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiLCByZXMpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UudG9PYmplY3QoKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSkocmVxLCByZXMsIG5leHQpO1xyXG5cdH0sXHJcblx0ZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuXHRcdHJlcy5qc29uKHJlcS51c2VyKTtcclxuXHR9XHJcbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL2xvZ291dFwiLCBmdW5jdGlvbihyZXEsIHJlcykge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIlN1Y2Nlc3NmdWxseSBsb2dnZWQgb3V0LlwiKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlcS5sb2dvdXQoKTtcclxuXHRyZXMuc3RhdHVzKDIwMCk7XHJcblx0cmVzLnNlbmQocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFxyXG5cdFwiL2ZvcmdvdFwiLFxyXG5cdG9uZU9mKFtcclxuXHRcdGNoZWNrKFwiZW1haWxcIilcclxuXHRcdFx0LmV4aXN0cyh7IGNoZWNrTnVsbDogdHJ1ZSB9KVxyXG5cdFx0XHQud2l0aE1lc3NhZ2UoXCJFbWFpbCBjYW5ub3QgYmUgZW1wdHlcIilcclxuXHRcdFx0LmlzRW1haWwoKVxyXG5cdFx0XHQud2l0aE1lc3NhZ2UoXCJJbnZhbGlkIGVtYWlsXCIpLFxyXG5cdFx0W1xyXG5cdFx0XHRjaGVjayhcInRva2VuXCIpXHJcblx0XHRcdFx0LmV4aXN0cyh7IGNoZWNrTnVsbDogdHJ1ZSB9KVxyXG5cdFx0XHRcdC53aXRoTWVzc2FnZShcIllvdSBkbyBub3QgaGF2ZSBhIHJlc2V0IHRva2VuLlwiKSxcclxuXHRcdFx0Y2hlY2soXCJwYXNzd29yZFwiKVxyXG5cdFx0XHRcdC5leGlzdHMoeyBjaGVja051bGw6IHRydWUgfSlcclxuXHRcdFx0XHQuaXNMZW5ndGgoeyBtaW46IDgsIG1heDogMzIgfSlcclxuXHRcdFx0XHQud2l0aE1lc3NhZ2UoXCJBIG5ldyBwYXNzd29yZCBzaG91bGQgYmUgcHJvdmlkZWRcIilcclxuXHRcdF1cclxuXHRdKSxcclxuXHRhc3luYyBmdW5jdGlvbihyZXEsIHJlcykge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblxyXG5cdFx0Y29uc3QgZXJyb3JzID0gdmFsaWRhdGlvblJlc3VsdChyZXEpO1xyXG5cdFx0aWYgKCFlcnJvcnMuaXNFbXB0eSgpKSB7XHJcblx0XHRcdGZvciAobGV0IGVycm9yIG9mIGVycm9ycy5hcnJheSgpKSByZXNwb25zZS5hcHBlbmRFcnJvcihlcnJvci5tc2cpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiSW52YWxpZCBmaWVsZHNcIik7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDIyKTtcclxuXHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDIyKS5qc29uKHJlc3BvbnNlKTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHsgZW1haWwsIHRva2VuLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XHJcblxyXG5cdFx0aWYgKHRva2VuKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgdmFsaWRUb2tlbiA9IGp3dC52ZXJpZnkodG9rZW4sIHNlY3JldEtleSkgYXMgUGFzc3dvcmRSZXNldFRva2VuO1xyXG5cdFx0XHRcdGlmICh2YWxpZFRva2VuICYmIHZhbGlkVG9rZW4ucGFzc3dvcmRSZXNldCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgdXNlciA9IGF3YWl0IGRiLlVzZXIuZmluZE9uZSh7XHJcblx0XHRcdFx0XHRcdHdoZXJlOiB7IGVtYWlsOiB2YWxpZFRva2VuLmVtYWlsIH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xyXG5cdFx0XHRcdFx0dXNlciAmJiAoYXdhaXQgdXNlci51cGRhdGUoeyBwYXNzd29yZDogbmV3UGFzc3dvcmQgfSkpO1xyXG5cdFx0XHRcdFx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJQYXNzd29yZCBoYXMgYmVlbiByZXNldC5cIik7XHJcblx0XHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShcIkludmFsaWQgdG9rZW5cIik7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MjIpO1xyXG5cdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbihyZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoZW1haWwpIHtcclxuXHRcdFx0Y29uc3QgZm91bmRFbWFpbCA9IGF3YWl0IGRiLlVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSk7XHJcblx0XHRcdGlmIChmb3VuZEVtYWlsKSB7XHJcblx0XHRcdFx0c2VuZFBhc3N3b3JkUmVzZXRUb2tlbih7XHJcblx0XHRcdFx0XHRlbWFpbCxcclxuXHRcdFx0XHRcdHVybDogYCR7cHJvY2Vzcy5lbnYuQ0xJRU5UX1VSTH0vbG9naW4vZm9yZ290YFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJBIHJlc2V0IGNvZGUgaGFzIGJlZW4gc2VudC5cIik7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQuY2F0Y2goZSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiVW5rbm93biBlcnJvci5cIik7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNTAwKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJFbWFpbCBpcyBub3QgcmVnaXN0ZXJlZC5cIik7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDQpO1xyXG5cdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbihyZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtdmFsaWRhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWptbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlbWFpbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0YXRpY21hcHNcIik7IiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcblxyXG5pbXBvcnQge1xyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXMsXHJcblx0YWRkUmVwbGFjZWRGaWxlc1xyXG59IGZyb20gXCIuLi9taWRkbGV3YXJlcy9kZWxldGVSZXBsYWNlZEZpbGVzXCI7XHJcbmltcG9ydCBkZWxldGVGaWxlT25FcnJvciBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlRmlsZU9uRXJyb3JcIjtcclxuaW1wb3J0IHJlcXVpcmVMb2dpbiBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luXCI7XHJcbmltcG9ydCBkaXNhbGxvd0d1ZXN0cyBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGlzYWxsb3dHdWVzdHNcIjtcclxuaW1wb3J0IHBhcnNlQm9keSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcGFyc2VCb2R5XCI7XHJcbmltcG9ydCB1cGxvYWQgZnJvbSBcIi4uL21pZGRsZXdhcmVzL211bHRlclVwbG9hZFwiO1xyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIsIGdldEZpbGVVUkwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZGF0YXNvdXJjZVwiO1xyXG5pbXBvcnQge1xyXG5cdEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLFxyXG5cdFJlc291cmNlTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBJbnZpdGVUb2tlbiB9IGZyb20gXCIuLi90eXBpbmdzXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldChcIi9cIiwgcmVxdWlyZUxvZ2luLCBhc3luYyAoeyB1c2VyIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgVXNlckRhdGFTb3VyY2UgPSBuZXcgVXNlcihkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCB1c2VycyA9IGF3YWl0IFVzZXJEYXRhU291cmNlLmdldEFsbCgpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YSh1c2Vycyk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBGb3VuZCAke3VzZXJzLmxlbmd0aH0gdXNlcnMuYCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFxyXG5cdFwiL1wiLFxyXG5cdHVwbG9hZChcImNhcmJvb2tpbmcvbWVkaWEvdXNlcnMvcHJvZmlsZVwiKS5zaW5nbGUoXCJ1c2VySW1hZ2VTcmNcIiksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGFzeW5jICh7IHVzZXIsIGJvZHksIGZpbGUgPSB7fSB9LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGNvbnN0IHsgbG9jYXRpb246IGZpbGVMb2NhdGlvbiA9IG51bGwgfSA9IGZpbGU7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IFVzZXJEYXRhU291cmNlID0gbmV3IFVzZXIoZGIsIHVzZXIpO1xyXG5cdFx0bGV0IGludml0ZVRva2VuVXNlZCA9IGZhbHNlO1xyXG5cdFx0bGV0IGVtYWlsID0gYm9keS5lbWFpbDtcclxuXHRcdGxldCBjbGllbnRJZDogbnVtYmVyIHwgbnVsbCA9ICh1c2VyICYmIHVzZXIuY2xpZW50SWQpIHx8IG51bGw7XHJcblxyXG5cdFx0Ly8gQ29uc3VtZSBpbnZpdGUgdG9rZW5cclxuXHRcdGlmIChib2R5Lmludml0ZVRva2VuKSB7XHJcblx0XHRcdGNvbnN0IGludml0ZVRva2VuID0gand0LnZlcmlmeShcclxuXHRcdFx0XHRib2R5Lmludml0ZVRva2VuLFxyXG5cdFx0XHRcdGNvbmZpZy5zZWNyZXRLZXlcclxuXHRcdFx0KSBhcyBJbnZpdGVUb2tlbjtcclxuXHRcdFx0aWYgKGludml0ZVRva2VuKSB7XHJcblx0XHRcdFx0aW52aXRlVG9rZW5Vc2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRlbWFpbCA9IGludml0ZVRva2VuLmVtYWlsO1xyXG5cdFx0XHRcdGNsaWVudElkID0gaW52aXRlVG9rZW4uY2xpZW50SWQgfHwgbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKGJvZHkucGFzc3dvcmQsIDEwKTtcclxuXHRcdFx0bGV0IGNyZWF0ZWRVc2VyID0gYXdhaXQgVXNlckRhdGFTb3VyY2UuY3JlYXRlKFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC4uLmJvZHksXHJcblx0XHRcdFx0XHR1c2VySW1hZ2VTcmM6IGZpbGVMb2NhdGlvbixcclxuXHRcdFx0XHRcdGVtYWlsLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLFxyXG5cdFx0XHRcdFx0Y2xpZW50SWQ6IGNsaWVudElkXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRpbnZpdGVkOiBpbnZpdGVUb2tlblVzZWRcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHtcclxuXHRcdFx0XHRjcmVhdGVkVXNlcixcclxuXHRcdFx0XHRjYXRlZ29yaWVzOiAoYXdhaXQgY3JlYXRlZFVzZXIuZ2V0Q2F0ZWdvcmllcygpKS5tYXAoYyA9PiBjLmlkKVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJVc2VyIGhhcyBiZWVuIGNyZWF0ZWQuXCIpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdHJlcy5zdGF0dXMoMjAwKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShlLm1lc3NhZ2UpO1xyXG5cdFx0XHRpZiAoZSBpbnN0YW5jZW9mIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MjIpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDIyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGUubWVzc2FnZSk7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDMpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGUuZXJyb3JzICYmIGUuZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRlLmVycm9ycy5mb3JFYWNoKGVycm9yID0+IHJlc3BvbnNlLmFwcGVuZEVycm9yKGVycm9yLnBhdGgpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdG5leHQoKTtcclxuXHR9LFxyXG5cdGRlbGV0ZUZpbGVPbkVycm9yXHJcbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiLzppZFwiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IFVzZXJEYXRhU291cmNlID0gbmV3IFVzZXIoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgZm91bmRVc2VyID0gYXdhaXQgVXNlckRhdGFTb3VyY2UuZ2V0KHBhcmFtcy5pZCk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHtcclxuXHRcdFx0Li4uZm91bmRVc2VyLmdldCh7IHBsYWluOiB0cnVlIH0pLFxyXG5cdFx0XHRjYXRlZ29yaWVzOiAoYXdhaXQgZm91bmRVc2VyLmdldENhdGVnb3JpZXMoKSkubWFwKGMgPT4gYy5pZClcclxuXHRcdH0pO1xyXG5cdFx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShgVXNlciB3aXRoIElEICR7cGFyYW1zLmlkfSBmb3VuZC5gKTtcclxuXHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0aWYgKGUgaW5zdGFuY2VvZiBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoNDA0KTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MDMpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMyk7XHJcblx0XHR9XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGUubWVzc2FnZSk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBhdGNoKFxyXG5cdFwiLzppZFwiLFxyXG5cdHJlcXVpcmVMb2dpbixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL3VzZXJzL3Byb2ZpbGVcIikuc2luZ2xlKFwidXNlckltYWdlU3JjXCIpLFxyXG5cdHBhcnNlQm9keSxcclxuXHRhc3luYyAoeyB1c2VyLCBib2R5LCBmaWxlID0ge30sIHBhcmFtcyB9LCByZXMsIG5leHQpID0+IHtcclxuXHRcdGNvbnN0IGZpbGVMb2NhdGlvbiA9XHJcblx0XHRcdGZpbGUgJiZcclxuXHRcdFx0ZmlsZS5maWxlbmFtZSAmJlxyXG5cdFx0XHRnZXRGaWxlVVJMKFwiY2FyYm9va2luZy9tZWRpYS91c2Vycy9wcm9maWxlXCIsIGZpbGUuZmlsZW5hbWUpO1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdFx0Y29uc3QgVXNlckRhdGFTb3VyY2UgPSBuZXcgVXNlcihkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IGZvdW5kVXNlciA9IGF3YWl0IFVzZXJEYXRhU291cmNlLmdldChib2R5LmlkKTtcclxuXHJcblx0XHRcdGZpbGVMb2NhdGlvbiAmJlxyXG5cdFx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0XHR1cmw6IGZvdW5kVXNlci51c2VySW1hZ2VTcmMsXHJcblx0XHRcdFx0XHRtb2RlbDogZGIuVXNlcixcclxuXHRcdFx0XHRcdGZpZWxkOiBcInVzZXJJbWFnZVNyY1wiXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdGlmIChib2R5LmNhdGVnb3JpZXMpIHtcclxuXHRcdFx0XHRsZXQgY2F0ZWdvcmllcyA9IGF3YWl0IGRiLkNhdGVnb3J5LmZpbmRBbGwoe1xyXG5cdFx0XHRcdFx0d2hlcmU6IHsgaWQ6IGJvZHkuY2F0ZWdvcmllcyB9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YXdhaXQgZm91bmRVc2VyLiRzZXQoXCJjYXRlZ29yaWVzXCIsIGNhdGVnb3JpZXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCB1cGRhdGVkVXNlciA9IGF3YWl0IFVzZXJEYXRhU291cmNlLnVwZGF0ZShmb3VuZFVzZXIuaWQsIHtcclxuXHRcdFx0XHQuLi5ib2R5LFxyXG5cdFx0XHRcdHVzZXJJbWFnZVNyYzogZmlsZUxvY2F0aW9uIHx8IGZvdW5kVXNlci51c2VySW1hZ2VTcmNcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHVwZGF0ZWRVc2VyLmdldCh7IHBsYWluOiB0cnVlIH0pKTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSgyMDApO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKGBVc2VyIHdpdGggSUQgJHtwYXJhbXMuaWR9IHVwZGF0ZWQuYCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHRpZiAoZSBpbnN0YW5jZW9mIEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0TWVzc2FnZShlLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDIyKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQyMik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzcG9uc2Uuc2V0Q29kZSg0MDMpO1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZS5lcnJvcnMgJiYgZS5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGUuZXJyb3JzLmZvckVhY2goZXJyb3IgPT4gcmVzcG9uc2UuYXBwZW5kRXJyb3IoZXJyb3IucGF0aCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3IsXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcclxuXHRcIi86aWRcIixcclxuXHRyZXF1aXJlTG9naW4sXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblxyXG5cdFx0Y29uc3QgVXNlckRhdGFTb3VyY2UgPSBuZXcgVXNlcihkYiwgdXNlcik7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgZGVsZXRlZFVzZXIgPSBhd2FpdCBVc2VyRGF0YVNvdXJjZS5kZWxldGUocGFyYW1zLmlkKTtcclxuXHJcblx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0dXJsOiBkZWxldGVkVXNlci51c2VySW1hZ2VTcmMsXHJcblx0XHRcdFx0bW9kZWw6IGRiLlVzZXIsXHJcblx0XHRcdFx0ZmllbGQ6IFwidXNlckltYWdlU3JjXCJcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoYFVzZXIgd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gZGVsZXRlZC5gKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0aWYgKGUgaW5zdGFuY2VvZiBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoZS5tZXNzYWdlKTtcclxuXHRcdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQyMik7XHJcblx0XHRcdFx0cmVzLnN0YXR1cyg0MjIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDAzKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGUuZXJyb3JzICYmIGUuZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRlLmVycm9ycy5mb3JFYWNoKGVycm9yID0+IHJlc3BvbnNlLmFwcGVuZEVycm9yKGVycm9yLnBhdGgpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdG5leHQoKTtcclxuXHR9LFxyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXNcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpOyIsImltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcbmltcG9ydCBEYXRhU291cmNlIGZyb20gXCIuL0RhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgT3BlcmF0aW9uLCBSZXNvdXJjZSwgUm9sZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgVXNlckFjY2Vzc29yIGZyb20gXCIuL3R5cGVzL1VzZXJBY2Nlc3NvclwiO1xyXG5pbXBvcnQgUkJBQyBmcm9tIFwiLi4vdXRpbHMvcmJhY1wiO1xyXG5pbXBvcnQgeyBleGNlcHRGaWVsZHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbixcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4Y2VwdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuXHR1c2VyOiBVc2VyQWNjZXNzb3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiOiBhbnksIHVzZXJBY2Nlc3NvcjogVXNlckFjY2Vzc29yKSB7XHJcblx0XHRzdXBlcihkYik7XHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyQWNjZXNzb3I7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXQoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVXNlciA9IGF3YWl0IHRoaXMuZ2V0VXNlcihpZCwge1xyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogW1xyXG5cdFx0XHRcdFx0Li4uUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuVVNFUlMpLFxyXG5cdFx0XHRcdFx0XCJwYXNzd29yZFwiXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRVc2VyKSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRVc2VyXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZvdW5kVXNlcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFVzZXJzID0gYXdhaXQgdGhpcy5nZXRVc2Vycyh7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBbXHJcblx0XHRcdFx0XHQuLi5SQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5VU0VSUyksXHJcblx0XHRcdFx0XHRcInBhc3N3b3JkXCJcclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bGV0IHVzZXJzID0gW107XHJcblx0XHRmb3IgKGxldCB1c2VyIG9mIGZvdW5kVXNlcnMpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuVVNFUlMsIHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogdXNlclxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHR1c2Vycy5wdXNoKHVzZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVzZXJzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGlkOiBudW1iZXIsIGRhdGE/OiBvYmplY3QsIG9wdGlvbnM/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFVzZXIgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblx0XHRpZiAoIWZvdW5kVXNlcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5VUERBVEUsIFJlc291cmNlLlVTRVJTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRVc2VyLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGxldCBoYXNoZWRQYXNzd29yZCA9XHJcblx0XHRcdGRhdGFbXCJwYXNzd29yZFwiXSAmJiAoYXdhaXQgYmNyeXB0Lmhhc2goZGF0YVtcInBhc3N3b3JkXCJdLCAxMCkpO1xyXG5cdFx0YXdhaXQgZm91bmRVc2VyLnVwZGF0ZShcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC4uLmV4Y2VwdEZpZWxkcyhkYXRhLCBbXCJjYXRlZ29yaWVzXCJdKSxcclxuXHRcdFx0XHRwYXNzd29yZDogZGF0YVtcInBhc3N3b3JkXCJdICYmIGhhc2hlZFBhc3N3b3JkXHJcblx0XHRcdH0sXHJcblx0XHRcdG9wdGlvbnNcclxuXHRcdCk7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoaWQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZFVzZXIgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblx0XHRpZiAoIWZvdW5kVXNlcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5ERUxFVEUsIFJlc291cmNlLlVTRVJTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRVc2VyXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kVXNlci5kZXN0cm95KCk7XHJcblx0XHRyZXR1cm4gZm91bmRVc2VyO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlKGRhdGE6IGFueSwgb3B0aW9uczogeyBpbnZpdGVkPzogYm9vbGVhbiB9ID0ge30pOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IGNyZWF0ZWRVc2VyID0gYXdhaXQgdGhpcy5jcmVhdGVVc2VyKHtcclxuXHRcdFx0Li4uZGF0YSxcclxuXHRcdFx0cm9sZTogb3B0aW9ucy5pbnZpdGVkID8gUm9sZS5HVUVTVCA6IGRhdGEucm9sZSxcclxuXHRcdFx0YXBwcm92ZWQ6ICFvcHRpb25zLmludml0ZWRcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIGNyZWF0ZWRVc2VyO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdFJvbGUgYXMgUm9sZUVudW0sXHJcblx0UmVzb3VyY2UgYXMgUmVzb3VyY2VUeXBlXHJcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUkJBQyB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHJvbGVzOiBSb2xlW107XHJcblx0Y29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy5yb2xlcyA9IFtdO1xyXG5cdH1cclxuXHRhZGRSb2xlKHJvbGU6IFJvbGUpOiB2b2lkIHtcclxuXHRcdGxldCBleGlzdGluZyA9IHRoaXMucm9sZXMuZmluZChcclxuXHRcdFx0KHJvbGVJdGVtOiBSb2xlKSA9PiByb2xlSXRlbS5uYW1lID09PSByb2xlLm5hbWVcclxuXHRcdCk7XHJcblx0XHRpZiAoZXhpc3RpbmcpIHRocm93IG5ldyBFcnJvcihcIlJvbGUgYWxyZWFkeSBleGlzdHNcIik7XHJcblx0XHR0aGlzLnJvbGVzLnB1c2gocm9sZSk7XHJcblx0fVxyXG5cclxuXHRjYW4oXHJcblx0XHRyb2xlOiBSb2xlIHwgUm9sZUVudW0sXHJcblx0XHRhY3Rpb246IHN0cmluZyxcclxuXHRcdHJlc291cmNlOiBSZXNvdXJjZSB8IFJlc291cmNlVHlwZSxcclxuXHRcdHBhcmFtczogYW55XHJcblx0KTogUHJvbWlzZTxib29sZWFuPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcblx0XHRcdGxldCBleGlzdGluZ1JvbGU6IFJvbGUgfCB1bmRlZmluZWQgPSB0aGlzLnJvbGVzLmZpbmQoKHJvbGVJdGVtOiBSb2xlKSA9PiB7XHJcblx0XHRcdFx0aWYgKHJvbGUgaW5zdGFuY2VvZiBSb2xlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcm9sZS5uYW1lID09PSByb2xlSXRlbS5uYW1lO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gcm9sZSA9PT0gcm9sZUl0ZW0ubmFtZTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICghZXhpc3RpbmdSb2xlKSB0aHJvdyBuZXcgRXJyb3IoXCJSb2xlIGRvZXMgbm90IGV4aXN0LlwiKTtcclxuXHRcdFx0bGV0IHBlcm1pdHRlZCA9IGF3YWl0IGV4aXN0aW5nUm9sZS5jYW4oYWN0aW9uLCByZXNvdXJjZSwgcGFyYW1zKTtcclxuXHRcdFx0cmVzb2x2ZShwZXJtaXR0ZWQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRFeGNsdWRlZEZpZWxkcyhyb2xlOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nLCByZXNvdXJjZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0bGV0ICRyb2xlOiBSb2xlIHwgdW5kZWZpbmVkID0gdGhpcy5yb2xlcy5maW5kKFxyXG5cdFx0XHQoJHJvbGU6IFJvbGUpID0+ICRyb2xlLm5hbWUgPT09IHJvbGVcclxuXHRcdCk7XHJcblx0XHRpZiAoJHJvbGUpIHtcclxuXHRcdFx0bGV0IGV4Y2x1ZGVkRmllbGRzID0gW107XHJcblx0XHRcdGlmICgkcm9sZS5leHRlbmRzKSB7XHJcblx0XHRcdFx0Zm9yIChsZXQgcm9sZSBvZiAkcm9sZS5leHRlbmRzKSB7XHJcblx0XHRcdFx0XHRsZXQgJGFjdGlvbiA9IHJvbGUuYWN0aW9ucy5maW5kKFxyXG5cdFx0XHRcdFx0XHQkYWN0aW9uID0+XHJcblx0XHRcdFx0XHRcdFx0JGFjdGlvbi5uYW1lID09PSBhY3Rpb24gJiYgJGFjdGlvbi5yZXNvdXJjZS5uYW1lID09PSByZXNvdXJjZVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGlmICgkYWN0aW9uKSB7XHJcblx0XHRcdFx0XHRcdGV4Y2x1ZGVkRmllbGRzLnB1c2goLi4uJGFjdGlvbi5leGNsdWRlZEZpZWxkcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGxldCAkYWN0aW9uID0gJHJvbGUuYWN0aW9ucy5maW5kKFxyXG5cdFx0XHRcdCRhY3Rpb24gPT4gJGFjdGlvbi5uYW1lID09PSBhY3Rpb24gJiYgJGFjdGlvbi5yZXNvdXJjZS5uYW1lID09PSByZXNvdXJjZVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoJGFjdGlvbikge1xyXG5cdFx0XHRcdGV4Y2x1ZGVkRmllbGRzLnB1c2goLi4uJGFjdGlvbi5leGNsdWRlZEZpZWxkcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGV4Y2x1ZGVkRmllbGRzO1xyXG5cdFx0fSBlbHNlIHRocm93IG5ldyBFcnJvcihcIlJvbGUgZG9lcyBub3QgZXhpc3QuXCIpO1xyXG5cdH1cclxuXHR0b09iamVjdCgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcclxuXHRcdFx0cm9sZXM6IHRoaXMucm9sZXMubWFwKHJvbGUgPT4gKHtcclxuXHRcdFx0XHRuYW1lOiByb2xlLm5hbWUsXHJcblx0XHRcdFx0YWNjZXNzOiByb2xlLmFjdGlvbnMucmVkdWNlKFxyXG5cdFx0XHRcdFx0KGFjYzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgYWN0aW9uKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICghYWNjLnJlc291cmNlc1thY3Rpb24ucmVzb3VyY2UubmFtZV0pIHtcclxuXHRcdFx0XHRcdFx0XHRhY2MucmVzb3VyY2VzW2FjdGlvbi5yZXNvdXJjZS5uYW1lXSA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdHBlcm1pc3Npb25zOiB7fVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0YWNjLnJlc291cmNlc1thY3Rpb24ucmVzb3VyY2UubmFtZV0ucGVybWlzc2lvbnNbYWN0aW9uLm5hbWVdID0ge1xyXG5cdFx0XHRcdFx0XHRcdGNvbmRpdGlvbmFsOiBhY3Rpb24uY29uZGl0aW9uID8gdHJ1ZSA6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdGV4Y2x1ZGVkRmllbGRzOiBhY3Rpb24uZXhjbHVkZWRGaWVsZHNcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHJlc291cmNlczoge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdGV4dGVuZHM6IHJvbGUuZXh0ZW5kcy5tYXAocm9sZSA9PiByb2xlLm5hbWUpXHJcblx0XHRcdH0pKVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2xlIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0YWN0aW9uczogQWN0aW9uW107XHJcblx0ZXh0ZW5kczogUm9sZVtdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLmFjdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMuZXh0ZW5kcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0YWRkUGVybWlzc2lvbihhY3Rpb246IEFjdGlvbikge1xyXG5cdFx0bGV0IGV4aXN0aW5nQWN0aW9uID0gdGhpcy5hY3Rpb25zLmZpbmQoXHJcblx0XHRcdGN1cnJlbnRBY3Rpb24gPT5cclxuXHRcdFx0XHRjdXJyZW50QWN0aW9uLm5hbWUgPT09IGFjdGlvbi5uYW1lICYmXHJcblx0XHRcdFx0Y3VycmVudEFjdGlvbi5yZXNvdXJjZS5uYW1lID09PSBhY3Rpb24ucmVzb3VyY2UubmFtZVxyXG5cdFx0KTtcclxuXHRcdGlmIChleGlzdGluZ0FjdGlvbikgdGhyb3cgbmV3IEVycm9yKFwiQWN0aW9uIGFscmVhZHkgZXhpc3RzLlwiKTtcclxuXHRcdHRoaXMuYWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcblx0fVxyXG5cclxuXHRleHRlbmQocm9sZTogUm9sZSkge1xyXG5cdFx0dGhpcy5leHRlbmRzLnB1c2gocm9sZSk7XHJcblx0fVxyXG5cdGNhbihcclxuXHRcdGFjdGlvbjogc3RyaW5nLFxyXG5cdFx0cmVzb3VyY2U6IFJlc291cmNlIHwgUmVzb3VyY2VUeXBlLFxyXG5cdFx0cGFyYW1zOiBhbnlcclxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcclxuXHRcdFx0bGV0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XHJcblx0XHRcdGxldCByZXNvdXJjZU5hbWUgPVxyXG5cdFx0XHRcdHJlc291cmNlIGluc3RhbmNlb2YgUmVzb3VyY2UgPyByZXNvdXJjZS5uYW1lIDogcmVzb3VyY2U7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBjdXJyZW50QWN0aW9uOiBBY3Rpb24gPSBhY3Rpb25zW2ldO1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdGFjdGlvbiA9PT0gY3VycmVudEFjdGlvbi5uYW1lICYmXHJcblx0XHRcdFx0XHRjdXJyZW50QWN0aW9uLnJlc291cmNlLm5hbWUgPT09IHJlc291cmNlTmFtZVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0bGV0IHBlcm1pdHRlZDtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHBlcm1pdHRlZCA9IGF3YWl0IGN1cnJlbnRBY3Rpb24ucGVyZm9ybShwYXJhbXMpO1xyXG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRwZXJtaXR0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChwZXJtaXR0ZWQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUocGVybWl0dGVkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ29udGluZSBsb29raW5nIGZvciBtYXRjaGluZyBhY3Rpb25zLCBpbmNhc2Ugcm9sZSBpcyBleHRlbmRlZC5cclxuXHRcdFx0aWYgKHRoaXMuZXh0ZW5kcykge1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5leHRlbmRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsZXQgZXh0ZW5kZWRSb2xlID0gdGhpcy5leHRlbmRzW2ldO1xyXG5cdFx0XHRcdFx0bGV0IHBlcm1pdHRlZDogYm9vbGVhbiA9IGF3YWl0IGV4dGVuZGVkUm9sZS5jYW4oXHJcblx0XHRcdFx0XHRcdGFjdGlvbixcclxuXHRcdFx0XHRcdFx0cmVzb3VyY2UsXHJcblx0XHRcdFx0XHRcdHBhcmFtc1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGlmIChwZXJtaXR0ZWQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUocGVybWl0dGVkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJlc29sdmUoZmFsc2UpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0cmVzb3VyY2U6IFJlc291cmNlO1xyXG5cdGNvbmRpdGlvbj86ICgocGFyYW1zPzogYW55KSA9PiBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbikgfCBudWxsO1xyXG5cdGV4Y2x1ZGVkRmllbGRzOiBzdHJpbmdbXTtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdG5hbWU6IHN0cmluZyxcclxuXHRcdHJlc291cmNlOiBSZXNvdXJjZSxcclxuXHRcdGNvbmRpdGlvbj86ICgocGFyYW1zPzogYW55KSA9PiBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbikgfCBudWxsLFxyXG5cdFx0ZXhjbHVkZWRGaWVsZHM6IHN0cmluZ1tdID0gW11cclxuXHQpIHtcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblx0XHR0aGlzLnJlc291cmNlID0gcmVzb3VyY2U7XHJcblx0XHR0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuXHRcdHRoaXMuZXhjbHVkZWRGaWVsZHMgPSBleGNsdWRlZEZpZWxkcztcclxuXHR9XHJcblx0cGVyZm9ybShwYXJhbXM/OiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLmNvbmRpdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb25kaXRpb24ocGFyYW1zKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJCQUM7XHJcbiIsImltcG9ydCB7IFdpYWxvbiB9IGZyb20gXCJub2RlLXdpYWxvblwiO1xyXG5pbXBvcnQgeyBPcCB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IHRvTXlTUUxEYXRlLCBleGNlcHRGaWVsZHMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgQm9va2luZ1R5cGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgVXNlciwgVmVoaWNsZSwgTG9jYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IHNlbmRCb29raW5nTm90aWZpY2F0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG5cdHVzZXI6IFVzZXJBY2Nlc3NvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiKTtcclxuXHRcdHRoaXMudXNlciA9IHVzZXJBY2Nlc3NvcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldChpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRCb29raW5nID0gYXdhaXQgdGhpcy5nZXRCb29raW5nKGlkLCB7XHJcblx0XHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RlbDogVXNlclxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XSxcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRCb29raW5nKSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkJPT0tJTkdTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRCb29raW5nXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm91bmRCb29raW5nO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQm9va2luZ3MgPSBhd2FpdCB0aGlzLmdldEJvb2tpbmdzKHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlVTRVJTKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbmNsdWRlOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bW9kZWw6IFVzZXJcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdFx0bGV0IGJvb2tpbmdzID0gW107XHJcblx0XHRmb3IgKGxldCBib29raW5nIG9mIGZvdW5kQm9va2luZ3MpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuQk9PS0lOR1MsIHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogYm9va2luZ1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHRib29raW5ncy5wdXNoKGJvb2tpbmcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJvb2tpbmdzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGlkOiBudW1iZXIsIGRhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQm9va2luZyA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5VUERBVEUsIFJlc291cmNlLkJPT0tJTkdTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRCb29raW5nLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEucmVwbGFjZVZlaGljbGUpIHtcclxuXHRcdFx0Y29uc3QgcmVwbGFjZVZlaGljbGUgPSBhd2FpdCB0aGlzLmRiLlJlcGxhY2VWZWhpY2xlLmZpbmRCeVBrKFxyXG5cdFx0XHRcdGZvdW5kQm9va2luZy5yZXBsYWNlVmVoaWNsZUlkXHJcblx0XHRcdCk7XHJcblx0XHRcdGlmIChyZXBsYWNlVmVoaWNsZSkge1xyXG5cdFx0XHRcdGF3YWl0IHJlcGxhY2VWZWhpY2xlLnVwZGF0ZShkYXRhLnJlcGxhY2VWZWhpY2xlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhd2FpdCByZXBsYWNlVmVoaWNsZS5jcmVhdGUoZGF0YS5yZXBsYWNlVmVoaWNsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdGZvdW5kQm9va2luZy5yZXBsYWNlVmVoaWNsZSAhPT0gbnVsbCAmJlxyXG5cdFx0XHRkYXRhLnJlcGxhY2VWZWhpY2xlID09PSB1bmRlZmluZWRcclxuXHRcdCkge1xyXG5cdFx0XHRjb25zdCByZXBsYWNlVmVoaWNsZSA9IGF3YWl0IHRoaXMuZGIuUmVwbGFjZVZlaGljbGUuZmluZEJ5UGsoXHJcblx0XHRcdFx0Zm91bmRCb29raW5nLnJlcGxhY2VWZWhpY2xlSWRcclxuXHRcdFx0KTtcclxuXHRcdFx0cmVwbGFjZVZlaGljbGUuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IGZvdW5kQm9va2luZy51cGRhdGUoe1xyXG5cdFx0XHQuLi5kYXRhLFxyXG5cdFx0XHRmcm9tOiBkYXRhLmZyb20gJiYgdG9NeVNRTERhdGUoZGF0YS5mcm9tKSxcclxuXHRcdFx0dG86IGRhdGEuZnJvbSAmJiB0b015U1FMRGF0ZShkYXRhLnRvKVxyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXQoaWQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZEJvb2tpbmcgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uREVMRVRFLCBSZXNvdXJjZS5CT09LSU5HUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHR0YXJnZXQ6IGZvdW5kQm9va2luZ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0YXdhaXQgZm91bmRCb29raW5nLmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZEJvb2tpbmc7XHJcblx0fVxyXG5cclxuXHRhc3luYyBjcmVhdGUoZGF0YTogYW55KSB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLkNSRUFURSwgUmVzb3VyY2UuQk9PS0lOR1MsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgcmVwbGFjZW1lbnRWZWhpY2xlO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkYXRhLmJvb2tpbmdUeXBlID09PSBCb29raW5nVHlwZS5SRVBMQUNFTUVOVCkge1xyXG5cdFx0XHRcdGNvbnN0IHsgYnJhbmQsIG1vZGVsLCBwbGF0ZU51bWJlciwgdmluIH0gPSBkYXRhO1xyXG5cdFx0XHRcdHJlcGxhY2VtZW50VmVoaWNsZSA9IGF3YWl0IHRoaXMuZGIuUmVwbGFjZVZlaGljbGUuY3JlYXRlKHtcclxuXHRcdFx0XHRcdGJyYW5kLFxyXG5cdFx0XHRcdFx0bW9kZWwsXHJcblx0XHRcdFx0XHRwbGF0ZU51bWJlcixcclxuXHRcdFx0XHRcdHZpblxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgZXhjZXB0aW9ucyA9IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMoXHJcblx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRPcGVyYXRpb24uQ1JFQVRFLFxyXG5cdFx0XHRcdFJlc291cmNlLkJPT0tJTkdTXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRsZXQgY3JlYXRlZEJvb2tpbmcgPSBhd2FpdCB0aGlzLmNyZWF0ZUJvb2tpbmcoe1xyXG5cdFx0XHRcdHVzZXJJZDogcm9sZSA9PT0gUm9sZS5HVUVTVCA/IHRoaXMudXNlci5pZCA6IGRhdGEudXNlcklkLFxyXG5cdFx0XHRcdC4uLmV4Y2VwdEZpZWxkcyhkYXRhLCBleGNlcHRpb25zKSxcclxuXHRcdFx0XHR0bzogdG9NeVNRTERhdGUoZGF0YS50byksXHJcblx0XHRcdFx0ZnJvbTogdG9NeVNRTERhdGUoZGF0YS5mcm9tKSxcclxuXHRcdFx0XHRyZXBsYWNlVmVoaWNsZUlkOiAocmVwbGFjZW1lbnRWZWhpY2xlICYmIHJlcGxhY2VtZW50VmVoaWNsZS5pZCkgfHwgbnVsbFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGxldCB1c2VyID0gYXdhaXQgdGhpcy5nZXRVc2VyKFxyXG5cdFx0XHRcdHJvbGUgPT09IFJvbGUuR1VFU1QgPyB0aGlzLnVzZXIuaWQgOiBkYXRhLnVzZXJJZFxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdFx0VXNlci5maW5kQWxsKHtcclxuXHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdGNsaWVudElkOiB1c2VyLmNsaWVudElkLFxyXG5cdFx0XHRcdFx0XHRyb2xlOiB7XHJcblx0XHRcdFx0XHRcdFx0W09wLmluXTogW1JvbGUuQURNSU4sIFJvbGUuS0VZX01BTkFHRVJdXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KS50aGVuKGFzeW5jIHVzZXJzID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHZlaGljbGUgPSBhd2FpdCBWZWhpY2xlLmZpbmRCeVBrKGRhdGEudmVoaWNsZUlkKTtcclxuXHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgTG9jYXRpb24uZmluZEJ5UGsodmVoaWNsZS5sb2NhdGlvbklkKTtcclxuXHJcblx0XHRcdFx0XHRsZXQgbG5nID0gbG9jYXRpb24ubG5nO1xyXG5cdFx0XHRcdFx0bGV0IGxhdCA9IGxvY2F0aW9uLmxhdDtcclxuXHJcblx0XHRcdFx0XHRpZiAodmVoaWNsZS53aWFsb25Vbml0SWQpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdyA9IGF3YWl0IFdpYWxvbi5sb2dpbih7XHJcblx0XHRcdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdW5pdCA9IGF3YWl0IHcuQ29yZS5zZWFyY2hJdGVtKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogdmVoaWNsZS53aWFsb25Vbml0SWQsXHJcblx0XHRcdFx0XHRcdFx0ZmxhZ3M6IDEwMjQgKyA4MTkyXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodW5pdCkge1xyXG5cdFx0XHRcdFx0XHRcdGxhdCA9IHVuaXQuaXRlbSAmJiB1bml0Lml0ZW0ucG9zICYmIHVuaXQuaXRlbS5wb3MueTtcclxuXHRcdFx0XHRcdFx0XHRsbmcgPSB1bml0Lml0ZW0gJiYgdW5pdC5pdGVtLnBvcyAmJiB1bml0Lml0ZW0ucG9zLng7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbmRCb29raW5nTm90aWZpY2F0aW9uKHtcclxuXHRcdFx0XHRcdFx0XHRcdGVtYWlsOiB1c2VyLmVtYWlsLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGJvb2tpbmdJZDogY3JlYXRlZEJvb2tpbmcuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21lckVtYWlsOiB0aGlzLnVzZXIuZW1haWwsXHJcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21lck5hbWU6IGAke3RoaXMudXNlci5maXJzdE5hbWV9ICR7dGhpcy51c2VyLmxhc3ROYW1lfWAsXHJcblx0XHRcdFx0XHRcdFx0XHRmcm9tOiBjcmVhdGVkQm9va2luZy5mcm9tLFxyXG5cdFx0XHRcdFx0XHRcdFx0dG86IGNyZWF0ZWRCb29raW5nLnRvLFxyXG5cdFx0XHRcdFx0XHRcdFx0bGF0LFxyXG5cdFx0XHRcdFx0XHRcdFx0bG5nLFxyXG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb246IGxvY2F0aW9uLm5hbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRtb2JpbGU6IHRoaXMudXNlci5tb2JpbGVOdW1iZXIsXHJcblx0XHRcdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlciB8fCBcIk4vQVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0dmVoaWNsZTogYCR7dmVoaWNsZS5icmFuZH0gJHt2ZWhpY2xlLm1vZGVsfWAsXHJcblx0XHRcdFx0XHRcdFx0XHR2ZWhpY2xlSWQ6IHZlaGljbGUuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHR0aW1lWm9uZTogdXNlci50aW1lWm9uZVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjcmVhdGVkQm9va2luZztcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVwbGFjZW1lbnRWZWhpY2xlICYmIChhd2FpdCByZXBsYWNlbWVudFZlaGljbGUuZGVzdHJveSgpKTtcclxuXHRcdFx0dGhyb3cgZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IGV4Y2VwdEZpZWxkcyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVoaWNsZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG5cdHVzZXI6IFVzZXJBY2Nlc3NvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiKTtcclxuXHRcdHRoaXMudXNlciA9IHVzZXJBY2Nlc3NvcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldChpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRWZWhpY2xlID0gYXdhaXQgdGhpcy5nZXRWZWhpY2xlKGlkLCB7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5WRUhJQ0xFUylcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWZvdW5kVmVoaWNsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgUmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVXNlciB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5WRUhJQ0xFUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHR0YXJnZXQ6IGZvdW5kVmVoaWNsZVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm91bmRWZWhpY2xlO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVmVoaWNsZXMgPSBhd2FpdCB0aGlzLmdldFZlaGljbGVzKHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlZFSElDTEVTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGxldCB2ZWhpY2xlcyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgdmVoaWNsZSBvZiBmb3VuZFZlaGljbGVzKSB7XHJcblx0XHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLlZFSElDTEVTLCB7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IHZlaGljbGVcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdFx0dmVoaWNsZXMucHVzaCh2ZWhpY2xlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2ZWhpY2xlcztcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZShpZDogbnVtYmVyLCBkYXRhPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRWZWhpY2xlID0gYXdhaXQgdGhpcy5nZXQoaWQpO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlVQREFURSwgUmVzb3VyY2UuVkVISUNMRVMsIHtcclxuXHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0dGFyZ2V0OiBmb3VuZFZlaGljbGUsXHJcblx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kVmVoaWNsZS51cGRhdGUoZXhjZXB0RmllbGRzKGRhdGEsIFtcImNhdGVnb3JpZXNcIl0pKTtcclxuXHRcdHJldHVybiB0aGlzLmdldChpZCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZWxldGUoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kVmVoaWNsZSA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5ERUxFVEUsIFJlc291cmNlLlZFSElDTEVTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRWZWhpY2xlXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRhd2FpdCBmb3VuZFZlaGljbGUuZGVzdHJveSgpO1xyXG5cdFx0cmV0dXJuIGZvdW5kVmVoaWNsZTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZShkYXRhOiBvYmplY3QpIHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uQ1JFQVRFLCBSZXNvdXJjZS5WRUhJQ0xFUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRib2R5OiBkYXRhXHJcblx0XHR9KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGxldCBjcmVhdGVkVXNlciA9IGF3YWl0IHRoaXMuY3JlYXRlVmVoaWNsZShkYXRhKTtcclxuXHRcdHJldHVybiBjcmVhdGVkVXNlcjtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IERhdGFTb3VyY2UgZnJvbSBcIi4vRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBSb2xlLCBPcGVyYXRpb24sIFJlc291cmNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCBVc2VyQWNjZXNzb3IgZnJvbSBcIi4vdHlwZXMvVXNlckFjY2Vzc29yXCI7XHJcbmltcG9ydCBSQkFDIGZyb20gXCIuLi91dGlscy9yYmFjXCI7XHJcbmltcG9ydCB7XHJcblx0SW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24sXHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2F0aW9uIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcblx0dXNlcjogVXNlckFjY2Vzc29yO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihkYjogYW55LCB1c2VyQWNjZXNzb3I6IFVzZXJBY2Nlc3Nvcikge1xyXG5cdFx0c3VwZXIoZGIpO1xyXG5cdFx0dGhpcy51c2VyID0gdXNlckFjY2Vzc29yO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0KGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZExvY2F0aW9uID0gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbihpZCwge1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogQ2xpZW50IH1dLFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhcclxuXHRcdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0XHRPcGVyYXRpb24uUkVBRCxcclxuXHRcdFx0XHRcdFJlc291cmNlLkxPQ0FUSU9OU1xyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWZvdW5kTG9jYXRpb24pIHtcclxuXHRcdFx0dGhyb3cgbmV3IFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24oXHJcblx0XHRcdFx0YFVzZXIgd2l0aCBJRCBvZiAke2lkfSBpcyBub3QgZm91bmQuYFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuTE9DQVRJT05TLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRMb2NhdGlvblxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZm91bmRMb2NhdGlvbjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZExvY2F0aW9ucyA9IGF3YWl0IHRoaXMuZ2V0TG9jYXRpb25zKHtcclxuXHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IENsaWVudCB9XSxcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMoXHJcblx0XHRcdFx0XHRyb2xlLFxyXG5cdFx0XHRcdFx0T3BlcmF0aW9uLlJFQUQsXHJcblx0XHRcdFx0XHRSZXNvdXJjZS5MT0NBVElPTlNcclxuXHRcdFx0XHQpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bGV0IGxvY2F0aW9ucyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgbG9jYXRpb24gb2YgZm91bmRMb2NhdGlvbnMpIHtcclxuXHRcdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0XHRyb2xlLFxyXG5cdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFJlc291cmNlLkxPQ0FUSU9OUyxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdFx0dGFyZ2V0OiBsb2NhdGlvblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHRsb2NhdGlvbnMucHVzaChsb2NhdGlvbik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbG9jYXRpb25zO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlKGlkOiBudW1iZXIsIGRhdGE/OiBvYmplY3QpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZExvY2F0aW9uID0gYXdhaXQgdGhpcy5nZXQoaWQpO1xyXG5cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4oXHJcblx0XHRcdHJvbGUsXHJcblx0XHRcdE9wZXJhdGlvbi5VUERBVEUsXHJcblx0XHRcdFJlc291cmNlLkxPQ0FUSU9OUyxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0dGFyZ2V0OiBmb3VuZExvY2F0aW9uLFxyXG5cdFx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRhd2FpdCBmb3VuZExvY2F0aW9uLnVwZGF0ZShkYXRhKTtcclxuXHRcdHJldHVybiB0aGlzLmdldChpZCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZWxldGUoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kTG9jYXRpb24gPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLkRFTEVURSxcclxuXHRcdFx0UmVzb3VyY2UuTE9DQVRJT05TLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kTG9jYXRpb25cclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRhd2FpdCBmb3VuZExvY2F0aW9uLmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZExvY2F0aW9uO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlKGRhdGE6IG9iamVjdCkge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRyb2xlLFxyXG5cdFx0XHRPcGVyYXRpb24uQ1JFQVRFLFxyXG5cdFx0XHRSZXNvdXJjZS5MT0NBVElPTlMsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGxldCBjcmVhdGVkVXNlciA9IGF3YWl0IHRoaXMuY3JlYXRlTG9jYXRpb24oZGF0YSk7XHJcblx0XHRyZXR1cm4gY3JlYXRlZFVzZXI7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IE9wIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBEYXRhU291cmNlIGZyb20gXCIuL0RhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgVmVoaWNsZSB9IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgUm9sZSwgT3BlcmF0aW9uLCBSZXNvdXJjZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgVXNlckFjY2Vzc29yIGZyb20gXCIuL3R5cGVzL1VzZXJBY2Nlc3NvclwiO1xyXG5pbXBvcnQgUkJBQyBmcm9tIFwiLi4vdXRpbHMvcmJhY1wiO1xyXG5pbXBvcnQge1xyXG5cdEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uLFxyXG5cdFJlc291cmNlTm90Rm91bmRFeGNlcHRpb25cclxufSBmcm9tIFwiLi4vdXRpbHMvZXhjZXB0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50IGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiLCB1c2VyQWNjZXNzb3IsIFJlc291cmNlLkNMSUVOVFMpO1xyXG5cdH1cclxuXHJcblx0Z2V0ID0gYXN5bmMgKGlkOiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZENsaWVudCA9IGF3YWl0IHRoaXMuZ2V0Q2xpZW50KGlkLCB7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5DTElFTlRTKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICghZm91bmRDbGllbnQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFJlc291cmNlTm90Rm91bmRFeGNlcHRpb24oXHJcblx0XHRcdFx0YENsaWVudCB3aXRoIElEIG9mICR7aWR9IGlzIG5vdCBmb3VuZC5gXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKHJvbGUsIE9wZXJhdGlvbi5SRUFELCBSZXNvdXJjZS5DTElFTlRTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRDbGllbnRcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvdW5kQ2xpZW50O1xyXG5cdH07XHJcblxyXG5cdGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHRcdGxldCBmb3VuZENsaWVudHMgPSBhd2FpdCB0aGlzLmdldENsaWVudHMoe1xyXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XHJcblx0XHRcdFx0ZXhjbHVkZTogUkJBQy5nZXRFeGNsdWRlZEZpZWxkcyhyb2xlLCBPcGVyYXRpb24uUkVBRCwgUmVzb3VyY2UuQ0xJRU5UUylcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRsZXQgdmVoaWNsZXMgPSBbXTtcclxuXHRcdGZvciAobGV0IHZlaGljbGUgb2YgZm91bmRDbGllbnRzKSB7XHJcblx0XHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkNMSUVOVFMsIHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogdmVoaWNsZVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGFjY2Vzc2libGUpIHtcclxuXHRcdFx0XHR2ZWhpY2xlcy5wdXNoKHZlaGljbGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZlaGljbGVzO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlID0gYXN5bmMgKGlkOiBudW1iZXIsIGRhdGE/OiBhbnkpOiBQcm9taXNlPFthbnksIGFueV0+ID0+IHtcclxuXHRcdGxldCBmb3VuZENsaWVudCA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRjb25zdCB7IGFjY2VzcywgZXhjbHVkZWRGaWVsZHMgfSA9IGF3YWl0IHRoaXMuZ2V0VXNlclBlcm1pc3Npb25zKFxyXG5cdFx0XHRPcGVyYXRpb24uVVBEQVRFLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kQ2xpZW50XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0XHRpZiAoIWFjY2Vzcykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhLmxvY2F0aW9ucyAmJiAhZXhjbHVkZWRGaWVsZHMuaW5jbHVkZXMoXCJsb2NhdGlvbnNcIikpIHtcclxuXHRcdFx0YXdhaXQgZm91bmRDbGllbnQuc2V0TG9jYXRpb25zKGRhdGEubG9jYXRpb25zKTtcclxuXHRcdFx0YXdhaXQgVmVoaWNsZS51cGRhdGUoXHJcblx0XHRcdFx0eyBjbGllbnRJZDogbnVsbCB9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHdoZXJlOiB7IGNsaWVudElkOiBpZCwgbG9jYXRpb25JZDogeyBbT3Aubm90SW5dOiBkYXRhLmxvY2F0aW9ucyB9IH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0XHRpZiAoZGF0YS51c2VycyAmJiAhZXhjbHVkZWRGaWVsZHMuaW5jbHVkZXMoXCJ1c2Vyc1wiKSkge1xyXG5cdFx0XHRhd2FpdCBmb3VuZENsaWVudC5zZXRVc2VycyhkYXRhLnVzZXJzKTtcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhLnZlaGljbGVzICYmICFleGNsdWRlZEZpZWxkcy5pbmNsdWRlcyhcInZlaGljbGVzXCIpKSB7XHJcblx0XHRcdGF3YWl0IGZvdW5kQ2xpZW50LnNldFZlaGljbGVzKGRhdGEudmVoaWNsZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IGZvdW5kQ2xpZW50LnVwZGF0ZShcclxuXHRcdFx0Xy5vbWl0KGRhdGEsIFsuLi5leGNsdWRlZEZpZWxkcywgXCJsb2NhdGlvbnNcIiwgXCJ1c2Vyc1wiLCBcInZlaGljbGVzXCJdKVxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gW2ZvdW5kQ2xpZW50LCBhd2FpdCB0aGlzLmdldChpZCldO1xyXG5cdH07XHJcblxyXG5cdGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRDbGllbnQgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uREVMRVRFLCBSZXNvdXJjZS5DTElFTlRTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdHRhcmdldDogZm91bmRDbGllbnRcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYWNjZXNzaWJsZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGF3YWl0IGZvdW5kQ2xpZW50LmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZENsaWVudDtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZShkYXRhOiBvYmplY3QpIHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihyb2xlLCBPcGVyYXRpb24uQ1JFQVRFLCBSZXNvdXJjZS5DTElFTlRTLCB7XHJcblx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGNyZWF0ZWRDbGllbnQgPSBhd2FpdCB0aGlzLmNyZWF0ZUNsaWVudChkYXRhKTtcclxuXHRcdHJldHVybiBjcmVhdGVkQ2xpZW50O1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgRGF0YVNvdXJjZSBmcm9tIFwiLi9EYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IFJvbGUsIE9wZXJhdGlvbiwgUmVzb3VyY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IFVzZXJBY2Nlc3NvciBmcm9tIFwiLi90eXBlcy9Vc2VyQWNjZXNzb3JcIjtcclxuaW1wb3J0IFJCQUMgZnJvbSBcIi4uL3V0aWxzL3JiYWNcIjtcclxuaW1wb3J0IHtcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbixcclxuXHRSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uLFxyXG5cdEludmFsaWRJbnB1dEV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IGV4Y2VwdEZpZWxkcyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NpZGVudCBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG5cdHVzZXI6IFVzZXJBY2Nlc3NvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGI6IGFueSwgdXNlckFjY2Vzc29yOiBVc2VyQWNjZXNzb3IpIHtcclxuXHRcdHN1cGVyKGRiKTtcclxuXHRcdHRoaXMudXNlciA9IHVzZXJBY2Nlc3NvcjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldChpZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRBY2NpZGVudCA9IGF3YWl0IHRoaXMuZ2V0QWNjaWRlbnQoaWQsIHtcclxuXHRcdFx0YXR0cmlidXRlczoge1xyXG5cdFx0XHRcdGV4Y2x1ZGU6IFJCQUMuZ2V0RXhjbHVkZWRGaWVsZHMoXHJcblx0XHRcdFx0XHRyb2xlLFxyXG5cdFx0XHRcdFx0T3BlcmF0aW9uLlJFQUQsXHJcblx0XHRcdFx0XHRSZXNvdXJjZS5BQ0NJREVOVFNcclxuXHRcdFx0XHQpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFmb3VuZEFjY2lkZW50KSB7XHJcblx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBVc2VyIHdpdGggSUQgb2YgJHtpZH0gaXMgbm90IGZvdW5kLmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGxldCBhY2Nlc3NpYmxlID0gYXdhaXQgUkJBQy5jYW4ocm9sZSwgT3BlcmF0aW9uLlJFQUQsIFJlc291cmNlLkFDQ0lERU5UUywge1xyXG5cdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHR0YXJnZXQ6IGZvdW5kQWNjaWRlbnRcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvdW5kQWNjaWRlbnQ7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXRBbGwoKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRBY2NpZGVudHMgPSBhd2FpdCB0aGlzLmdldEFjY2lkZW50cyh7XHJcblx0XHRcdGF0dHJpYnV0ZXM6IHtcclxuXHRcdFx0XHRleGNsdWRlOiBSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKFxyXG5cdFx0XHRcdFx0cm9sZSxcclxuXHRcdFx0XHRcdE9wZXJhdGlvbi5SRUFELFxyXG5cdFx0XHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGxldCBib29raW5ncyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgYm9va2luZyBvZiBmb3VuZEFjY2lkZW50cykge1xyXG5cdFx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRcdHJvbGUsXHJcblx0XHRcdFx0T3BlcmF0aW9uLlJFQUQsXHJcblx0XHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGFjY2Vzc29yOiB0aGlzLnVzZXIsXHJcblx0XHRcdFx0XHR0YXJnZXQ6IGJvb2tpbmdcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHRcdGlmIChhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdFx0Ym9va2luZ3MucHVzaChib29raW5nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBib29raW5ncztcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVwZGF0ZShpZDogbnVtYmVyLCBkYXRhOiBhbnkpOiBQcm9taXNlPFthbnksIGFueV0+IHtcclxuXHRcdGxldCByb2xlOiBSb2xlID0gdGhpcy51c2VyLnJvbGU7XHJcblx0XHRsZXQgZm91bmRBY2NpZGVudCA9IGF3YWl0IHRoaXMuZ2V0KGlkKTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRyb2xlLFxyXG5cdFx0XHRPcGVyYXRpb24uVVBEQVRFLFxyXG5cdFx0XHRSZXNvdXJjZS5BQ0NJREVOVFMsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdHRhcmdldDogZm91bmRBY2NpZGVudCxcclxuXHRcdFx0XHRib2R5OiBkYXRhXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IGZvdW5kQWNjaWRlbnQudXBkYXRlKGRhdGEpO1xyXG5cclxuXHRcdGlmIChkYXRhLnJlYWQpIHtcclxuXHRcdFx0bGV0IGZvdW5kVXNlciA9IGF3YWl0IHRoaXMuZ2V0VXNlcih0aGlzLnVzZXIuaWQpO1xyXG5cdFx0XHRmb3VuZEFjY2lkZW50LnNldFVzZXJTdGF0dXMoZm91bmRVc2VyLCB7XHJcblx0XHRcdFx0dGhyb3VnaDogeyByZWFkOiB0cnVlIH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gW2ZvdW5kQWNjaWRlbnQsIHRoaXMuZ2V0KGlkKV07XHJcblx0fVxyXG5cclxuXHRhc3luYyBkZWxldGUoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcm9sZTogUm9sZSA9IHRoaXMudXNlci5yb2xlO1xyXG5cdFx0bGV0IGZvdW5kQWNjaWRlbnQgPSBhd2FpdCB0aGlzLmdldChpZCk7XHJcblxyXG5cdFx0bGV0IGFjY2Vzc2libGUgPSBhd2FpdCBSQkFDLmNhbihcclxuXHRcdFx0cm9sZSxcclxuXHRcdFx0T3BlcmF0aW9uLkRFTEVURSxcclxuXHRcdFx0UmVzb3VyY2UuQUNDSURFTlRTLFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YWNjZXNzb3I6IHRoaXMudXNlcixcclxuXHRcdFx0XHR0YXJnZXQ6IGZvdW5kQWNjaWRlbnRcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAoIWFjY2Vzc2libGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRhd2FpdCBmb3VuZEFjY2lkZW50LmRlc3Ryb3koKTtcclxuXHRcdHJldHVybiBmb3VuZEFjY2lkZW50O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlKGRhdGE6IGFueSkge1xyXG5cdFx0bGV0IHJvbGU6IFJvbGUgPSB0aGlzLnVzZXIucm9sZTtcclxuXHJcblx0XHRsZXQgYWNjZXNzaWJsZSA9IGF3YWl0IFJCQUMuY2FuKFxyXG5cdFx0XHRyb2xlLFxyXG5cdFx0XHRPcGVyYXRpb24uQ1JFQVRFLFxyXG5cdFx0XHRSZXNvdXJjZS5BQ0NJREVOVFMsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhY2Nlc3NvcjogdGhpcy51c2VyLFxyXG5cdFx0XHRcdGJvZHk6IGRhdGFcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHRcdGNvbnN0IGFjY2lkZW50VmVoaWNsZSA9IGF3YWl0IHRoaXMuZ2V0VmVoaWNsZShkYXRhLnZlaGljbGVJZCk7XHJcblxyXG5cdFx0aWYgKCFhY2NpZGVudFZlaGljbGUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEludmFsaWRJbnB1dEV4Y2VwdGlvbihcIlZlaGljbGUgaXMgbm90IGZvdW5kLlwiLCBbXCJ2ZWhpY2xlSWRcIl0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFhY2Nlc3NpYmxlKSB7XHJcblx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IGFjY2lkZW50VmVoaWNsZS51cGRhdGUoe1xyXG5cdFx0XHRkZWZsZWV0ZWQ6IHRydWVcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmNyZWF0ZUFjY2lkZW50KFxyXG5cdFx0XHRleGNlcHRGaWVsZHMoXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRSQkFDLmdldEV4Y2x1ZGVkRmllbGRzKHJvbGUsIE9wZXJhdGlvbi5DUkVBVEUsIFJlc291cmNlLkFDQ0lERU5UUylcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuXHJcbmltcG9ydCB7IFJlc3BvbnNlQnVpbGRlciB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBzZW5kSW52aXRlIH0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuaW1wb3J0IHJlcXVpcmVMb2dpbiBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luXCI7XHJcbmltcG9ydCBkaXNhbGxvd0d1ZXN0cyBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGlzYWxsb3dHdWVzdHNcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxucm91dGVyLnVzZShkaXNhbGxvd0d1ZXN0cyk7XHJcblxyXG4vL1RPRE86IGNoZWNrIGlmIGVtYWlsIGFscmVhZHkgZXhpc3RzIGluIERCLlxyXG4vLyBTZW5kIGFuIGludml0ZSB0byBhbiBlbWFpbFxyXG5yb3V0ZXIucG9zdChcIi9cIiwgYXN5bmMgKHsgYm9keSwgdXNlciB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHJcblx0Ly8gQ2hlY2sgaWYgZW1haWwgaXMgcHJvdmlkZWQuXHJcblx0aWYgKGJvZHkuZW1haWwpIHtcclxuXHRcdC8vIFNlbmQgZW1haWwgaW52aXRlXHJcblx0XHR0cnkge1xyXG5cdFx0XHRsZXQgZXhpc3RpbmdFbWFpbCA9IGF3YWl0IGRiLlVzZXIuZmluZE9uZSh7XHJcblx0XHRcdFx0d2hlcmU6IHsgZW1haWw6IGJvZHkuZW1haWwgfVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKCFleGlzdGluZ0VtYWlsKSB7XHJcblx0XHRcdFx0YXdhaXQgc2VuZEludml0ZSh7IGVtYWlsOiBib2R5LmVtYWlsLCBjbGllbnRJZDogdXNlci5jbGllbnRJZCB9KTtcclxuXHRcdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBJbnZpdGUgaGFzIGJlZW4gc2VudCB0byAke2JvZHkuZW1haWx9YCwgcmVzKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFbWFpbCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJQbGVhc2UgcHJvdmlkZSBhbiBlbWFpbCBhZGRyZXNzLlwiKTtcclxuXHRcdHJlc3BvbnNlLnNldENvZGUoNDIyKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IFdpYWxvbiB9IGZyb20gXCJub2RlLXdpYWxvblwiO1xyXG5cclxuaW1wb3J0IHJlcXVpcmVMb2dpbiBmcm9tIFwiLi4vbWlkZGxld2FyZXMvcmVxdWlyZUxvZ2luXCI7XHJcbmltcG9ydCB7XHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlcyxcclxuXHRhZGRSZXBsYWNlZEZpbGVzXHJcbn0gZnJvbSBcIi4uL21pZGRsZXdhcmVzL2RlbGV0ZVJlcGxhY2VkRmlsZXNcIjtcclxuaW1wb3J0IGRpc2FsbG93R3Vlc3RzIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kaXNhbGxvd0d1ZXN0c1wiO1xyXG5pbXBvcnQgcGFyc2VCb2R5IGZyb20gXCIuLi9taWRkbGV3YXJlcy9wYXJzZUJvZHlcIjtcclxuaW1wb3J0IHVwbG9hZCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkXCI7XHJcbmltcG9ydCBkZWxldGVGaWxlT25FcnJvciBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlRmlsZU9uRXJyb3JcIjtcclxuaW1wb3J0IGRiLCB7IFZlaGljbGUgYXMgVmVoaWNsZU1vZGVsLCBMb2NhdGlvbiB9IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHtcclxuXHRWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRMb2NhdGlvbkF0dHJpYnV0ZXMsXHJcblx0Um9sZVxyXG59IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIsIGdldEZpbGVVUkwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgVmVoaWNsZSB9IGZyb20gXCIuLi9hcGlcIjtcclxuaW1wb3J0IHsgVmVoaWNsZSBhcyBWZWhpY2xlRFMgfSBmcm9tIFwiLi4vZGF0YXNvdXJjZVwiOyAvLyBEZXByZWNhdGVcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5yb3V0ZXIudXNlKHJlcXVpcmVMb2dpbik7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCBhc3luYyAoeyB1c2VyLCBxdWVyeSB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdHRyeSB7XHJcblx0XHRsZXQgdmVoaWNsZXM6IFBhcnRpYWw8VmVoaWNsZUF0dHJpYnV0ZXM+W10gPSBbXTtcclxuXHRcdGNvbnN0IGZyb20gPSBxdWVyeS5mcm9tICYmIE51bWJlcihxdWVyeS5mcm9tKTtcclxuXHRcdGNvbnN0IHRvID0gcXVlcnkudG8gJiYgTnVtYmVyKHF1ZXJ5LnRvKTtcclxuXHRcdGlmIChmcm9tICYmIHRvKSB7XHJcblx0XHRcdHZlaGljbGVzID0gKFxyXG5cdFx0XHRcdGF3YWl0IFZlaGljbGUuZ2V0QWxsKHVzZXIsIHtcclxuXHRcdFx0XHRcdGZyb206IG1vbWVudChmcm9tLCBcIlhcIikudG9EYXRlKCksXHJcblx0XHRcdFx0XHR0bzogbW9tZW50KHRvLCBcIlhcIikudG9EYXRlKClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpLmNhc3QodXNlcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2ZWhpY2xlcyA9IChhd2FpdCBWZWhpY2xlLmdldEFsbCh1c2VyKSkuY2FzdCh1c2VyKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHZlaGljbGVzKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kICR7dmVoaWNsZXMubGVuZ3RofSB2ZWhpY2xlcy5gLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXHJcblx0XCIvXCIsXHJcblx0dXBsb2FkKFwiY2FyYm9va2luZy9tZWRpYS92ZWhpY2xlc1wiKS5zaW5nbGUoXCJ2ZWhpY2xlSW1hZ2VTcmNcIiksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGRpc2FsbG93R3Vlc3RzLFxyXG5cdGFzeW5jICh7IHVzZXIsIGJvZHksIGZpbGUgfSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRjb25zdCBmaWxlTG9jYXRpb24gPVxyXG5cdFx0XHRmaWxlICYmXHJcblx0XHRcdGZpbGUuZmlsZW5hbWUgJiZcclxuXHRcdFx0Z2V0RmlsZVVSTChcImNhcmJvb2tpbmcvbWVkaWEvdmVoaWNsZXNcIiwgZmlsZS5maWxlbmFtZSk7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0XHRjb25zdCBWZWhpY2xlRGF0YVNvdXJjZSA9IG5ldyBWZWhpY2xlRFMoZGIsIHVzZXIpO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCBjcmVhdGVkVmVoaWNsZSA9IGF3YWl0IFZlaGljbGVEYXRhU291cmNlLmNyZWF0ZSh7XHJcblx0XHRcdFx0Li4uYm9keSxcclxuXHRcdFx0XHR2ZWhpY2xlSW1hZ2VTcmM6IGZpbGVMb2NhdGlvblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChib2R5LmNhdGVnb3JpZXMpIHtcclxuXHRcdFx0XHRsZXQgY2F0ZWdvcmllcyA9IGF3YWl0IGRiLkNhdGVnb3J5LmZpbmRBbGwoe1xyXG5cdFx0XHRcdFx0d2hlcmU6IHsgaWQ6IGJvZHkuY2F0ZWdvcmllcyB9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YXdhaXQgY3JlYXRlZFZlaGljbGUuc2V0Q2F0ZWdvcmllcyhjYXRlZ29yaWVzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHtcclxuXHRcdFx0XHQuLi5jcmVhdGVkVmVoaWNsZS5nZXQoeyBwbGFpbjogdHJ1ZSB9KSxcclxuXHRcdFx0XHRjYXRlZ29yaWVzOiBhd2FpdCBjcmVhdGVkVmVoaWNsZS5nZXRDYXRlZ29yaWVzKCkubWFwKGMgPT4gYy5pZClcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXCJWZWhpY2xlIGhhcyBiZWVuIGNyZWF0ZWQuXCIsIHJlcyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3JcclxuKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBWZWhpY2xlRGF0YVNvdXJjZSA9IG5ldyBWZWhpY2xlRFMoZGIsIHVzZXIpO1xyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZFZlaGljbGUgPSBhd2FpdCBWZWhpY2xlRGF0YVNvdXJjZS5nZXQocGFyYW1zLmlkKTtcclxuXHRcdGNvbnN0IGZvdW5kVmVoaWNsZVBsYWluID0ge1xyXG5cdFx0XHQuLi5mb3VuZFZlaGljbGUuZ2V0KHsgcGxhaW46IHRydWUgfSksXHJcblx0XHRcdHBvc2l0aW9uOiBudWxsLFxyXG5cdFx0XHRtaWxlYWdlOiBudWxsLFxyXG5cdFx0XHRjYXRlZ29yaWVzOiAoYXdhaXQgZm91bmRWZWhpY2xlLmdldENhdGVnb3JpZXMoKSkubWFwKGMgPT4gYy5pZClcclxuXHRcdH07XHJcblx0XHRpZiAoZm91bmRWZWhpY2xlLndpYWxvblVuaXRJZCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGxldCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHtcclxuXHRcdFx0XHRcdHRva2VuOiBwcm9jZXNzLmVudi5XSUFMT05fVE9LRU5cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRjb25zdCB1bml0ID0gYXdhaXQgdy5Db3JlLnNlYXJjaEl0ZW0oe1xyXG5cdFx0XHRcdFx0aWQ6IGZvdW5kVmVoaWNsZVBsYWluLndpYWxvblVuaXRJZCxcclxuXHRcdFx0XHRcdGZsYWdzOiAxMDI0ICsgODE5MlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGNvbnN0IGxuZyA9IHVuaXQuaXRlbS5wb3MueDtcclxuXHRcdFx0XHRjb25zdCBsYXQgPSB1bml0Lml0ZW0ucG9zLnk7XHJcblx0XHRcdFx0Y29uc3QgbWlsZWFnZSA9IHVuaXQuaXRlbS5jbm07XHJcblx0XHRcdFx0Zm91bmRWZWhpY2xlUGxhaW4ucG9zaXRpb24gPSBsYXQgJiYgbG5nID8geyBsYXQsIGxuZyB9IDogbnVsbDtcclxuXHRcdFx0XHRmb3VuZFZlaGljbGVQbGFpbi5taWxlYWdlID0gbWlsZWFnZSB8fCBudWxsO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZFZlaGljbGVQbGFpbik7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBWZWhpY2xlIHdpdGggSUQgJHtwYXJhbXMuaWR9IGZvdW5kLmAsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2goXHJcblx0XCIvOmlkXCIsXHJcblx0dXBsb2FkKFwiY2FyYm9va2luZy9tZWRpYS92ZWhpY2xlc1wiKS5zaW5nbGUoXCJ2ZWhpY2xlSW1hZ2VTcmNcIiksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGRpc2FsbG93R3Vlc3RzLFxyXG5cdGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG5cdFx0Y29uc3QgeyB1c2VyLCBwYXJhbXMsIGJvZHksIGZpbGUgfSA9IHJlcTtcclxuXHRcdGNvbnN0IGZpbGVMb2NhdGlvbiA9XHJcblx0XHRcdGZpbGUgJiZcclxuXHRcdFx0ZmlsZS5maWxlbmFtZSAmJlxyXG5cdFx0XHRnZXRGaWxlVVJMKFwiY2FyYm9va2luZy9tZWRpYS92ZWhpY2xlc1wiLCBmaWxlLmZpbGVuYW1lKTtcclxuXHRcdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IFZlaGljbGVEYXRhU291cmNlID0gbmV3IFZlaGljbGVEUyhkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bGV0IHVwZGF0ZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZURhdGFTb3VyY2UudXBkYXRlKHBhcmFtcy5pZCwge1xyXG5cdFx0XHRcdC4uLmJvZHksXHJcblx0XHRcdFx0dmVoaWNsZUltYWdlU3JjOiBmaWxlTG9jYXRpb25cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRmaWxlTG9jYXRpb24gJiZcclxuXHRcdFx0XHRhZGRSZXBsYWNlZEZpbGVzKHJlcywge1xyXG5cdFx0XHRcdFx0dXJsOiB1cGRhdGVkVmVoaWNsZS52ZWhpY2xlSW1hZ2VTcmMsXHJcblx0XHRcdFx0XHRtb2RlbDogZGIuVmVoaWNsZSxcclxuXHRcdFx0XHRcdGZpZWxkOiBcInZlaGljbGVJbWFnZVNyY1wiXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdGlmIChib2R5LmNhdGVnb3JpZXMpIHtcclxuXHRcdFx0XHRsZXQgY2F0ZWdvcmllcyA9IGF3YWl0IGRiLkNhdGVnb3J5LmZpbmRBbGwoe1xyXG5cdFx0XHRcdFx0d2hlcmU6IHsgaWQ6IGJvZHkuY2F0ZWdvcmllcyB9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0YXdhaXQgdXBkYXRlZFZlaGljbGUuc2V0Q2F0ZWdvcmllcyhjYXRlZ29yaWVzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YSh7XHJcblx0XHRcdFx0Li4udXBkYXRlZFZlaGljbGUuZ2V0KHsgcGxhaW46IHRydWUgfSksXHJcblx0XHRcdFx0Y2F0ZWdvcmllczogKGF3YWl0IHVwZGF0ZWRWZWhpY2xlLmdldENhdGVnb3JpZXMoKSkubWFwKGMgPT4gYy5pZClcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYFZlaGljbGUgd2l0aCBJRCAke3BhcmFtcy5pZH0gdXBkYXRlZC5gLCByZXMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRcdG5leHQoKTtcclxuXHR9LFxyXG5cdGRlbGV0ZUZpbGVPbkVycm9yLFxyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXNcclxuKTtcclxuXHJcbnJvdXRlci5kZWxldGUoXHJcblx0XCIvOmlkXCIsXHJcblx0ZGlzYWxsb3dHdWVzdHMsXHJcblx0YXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblxyXG5cdFx0Y29uc3QgVmVoaWNsZURhdGFTb3VyY2UgPSBuZXcgVmVoaWNsZURTKGRiLCB1c2VyKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGRlbGV0ZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZURhdGFTb3VyY2UuZGVsZXRlKHBhcmFtcy5pZCk7XHJcblx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0dXJsOiBkZWxldGVkVmVoaWNsZS52ZWhpY2xlSW1hZ2VTcmMsXHJcblx0XHRcdFx0bW9kZWw6IGRiLlZlaGljbGUsXHJcblx0XHRcdFx0ZmllbGQ6IFwidmVoaWNsZUltYWdlU3JjXCJcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoZGVsZXRlZFZlaGljbGUuZ2V0KHsgcGxhaW46IHRydWUgfSkpO1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRcdGBWZWhpY2xlIHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIGRlbGV0ZWQuYCxcclxuXHRcdFx0XHRyZXNcclxuXHRcdFx0KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0XHRuZXh0KCk7XHJcblx0fSxcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzXHJcbik7XHJcblxyXG5yb3V0ZXIuZ2V0PHsgaWQ6IHN0cmluZyB9PihcIi86aWQvbG9jYXRpb25cIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH0sIHJlcykgPT4ge1xyXG5cdC8vIFRPRE86IEFic3RyYWN0aW9uIG9mIEFQSVxyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxMb2NhdGlvbkF0dHJpYnV0ZXM+KCk7XHJcblx0Y29uc3QgdmVoaWNsZSA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQnlQayhwYXJhbXMuaWQsIHtcclxuXHRcdGluY2x1ZGU6IFtMb2NhdGlvbl1cclxuXHR9KTtcclxuXHRpZiAoIXZlaGljbGUpIHtcclxuXHRcdHJlcy5zdGF0dXMoNDA0KTtcclxuXHRcdHJlc3BvbnNlLnNldENvZGUoNDA0KTtcclxuXHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoYFZlaGljbGUgd2l0aCBpZCAke3BhcmFtcy5pZH0gbm90IGZvdW5kLmApO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUiB8fCB2ZWhpY2xlLmNsaWVudElkID09PSB1c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodmVoaWNsZS5sb2NhdGlvbiB8fCBudWxsKTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkxvY2F0aW9uIGZvdW5kLlwiLCByZXMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzLnN0YXR1cyg0MDEpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoYFlvdSBjYW5ub3QgYWNjZXNzIHRoaXMgdmVoaWNsZS5gKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmVzLmpzb24ocmVzcG9uc2UudG9PYmplY3QoKSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgeyBXaWFsb24gfSBmcm9tIFwibm9kZS13aWFsb25cIjtcclxuaW1wb3J0IHsgT3AgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuaW1wb3J0IHsgQm9va2luZyBhcyBCb29raW5nVmFsaWRhdG9ycyB9IGZyb20gXCIuL3ZhbGlkYXRvcnNcIjtcclxuaW1wb3J0IHtcclxuXHRCb29raW5nQXR0cmlidXRlcyxcclxuXHRSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMsUm9sZVxyXG59IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQge1xyXG5cdFVzZXIsXHJcblx0Qm9va2luZyBhcyBCb29raW5nTW9kZWwsXHJcblx0UmVwbGFjZVZlaGljbGUsXHJcblx0TG9jYXRpb24sXHJcblx0VmVoaWNsZVxyXG59IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgSXRlbU5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSBcIi4vZXhjZXB0aW9uc1wiO1xyXG5pbXBvcnQgeyBVc2VQYXJhbWV0ZXJzLCBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHsgQXBpRXJyb3JIYW5kbGVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgQ2FzdGFibGUsIENvbGxlY3Rpb24gfSBmcm9tIFwiLi9Db2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7XHJcblx0c2VuZEJvb2tpbmdOb3RpZmljYXRpb24sXHJcblx0c2VuZEludm9pY2UgYXMgc2VuZEludm9pY2VFbWFpbCxcclxuXHRzZW5kQm9va2luZ0NvbmZpcm1hdGlvbiBhcyBzZW5kQm9va2luZ0NvbmZpcm1hdGlvbkVtYWlsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL21haWxcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEJvb2tpbmdDcmVhdGVPcHRpb25zID0gVXNlUGFyYW1ldGVyczxcclxuXHRCb29raW5nQXR0cmlidXRlcyxcclxuXHRcImZyb21cIiB8IFwidG9cIiB8IFwiYm9va2luZ1R5cGVcIixcclxuXHRcInVzZXJJZFwiIHwgXCJ2ZWhpY2xlSWRcIlxyXG4+ICYge1xyXG5cdHJlcGxhY2VWZWhpY2xlPzogVXNlUGFyYW1ldGVyczxcclxuXHRcdFJlcGxhY2VWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRcdFwidmluXCIgfCBcImJyYW5kXCIgfCBcIm1vZGVsXCIgfCBcInBsYXRlTnVtYmVyXCJcclxuXHQ+O1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQm9va2luZ1VwZGF0ZU9wdGlvbnMgPSBVc2VQYXJhbWV0ZXJzPFxyXG5cdEJvb2tpbmdBdHRyaWJ1dGVzLFxyXG5cdFwiaWRcIixcclxuXHR8IFwidXNlcklkXCJcclxuXHR8IFwicGFpZFwiXHJcblx0fCBcImFtb3VudFwiXHJcblx0fCBcImZyb21cIlxyXG5cdHwgXCJ0b1wiXHJcblx0fCBcImFwcHJvdmVkXCJcclxuXHR8IFwiZmluaXNoZWRcIlxyXG5cdHwgXCJzdGFydE1pbGVhZ2VcIlxyXG5cdHwgXCJlbmRNaWxlYWdlXCJcclxuXHR8IFwic3RhcnRGdWVsXCJcclxuXHR8IFwiZW5kRnVlbFwiXHJcblx0fCBcInZlaGljbGVJZFwiXHJcblx0fCBcImJvb2tpbmdUeXBlXCJcclxuPiAmIHtcclxuXHRyZXBsYWNlVmVoaWNsZT86IFVzZVBhcmFtZXRlcnM8XHJcblx0XHRSZXBsYWNlVmVoaWNsZUF0dHJpYnV0ZXMsXHJcblx0XHRcInZpblwiIHwgXCJicmFuZFwiIHwgXCJtb2RlbFwiIHwgXCJwbGF0ZU51bWJlclwiXHJcblx0PjtcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb29raW5nIGltcGxlbWVudHMgQ2FzdGFibGU8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+IHtcclxuXHRwcml2YXRlIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhOiBCb29raW5nTW9kZWwpIHt9XHJcblxyXG5cdHB1YmxpYyBjYXN0ID0gKHVzZXI6IFVzZXIpID0+XHJcblx0XHRCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IodXNlciwgQVBJX09QRVJBVElPTi5SRUFEKS5jYXN0KHRoaXMuZGF0YSk7XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0QWxsID0gYXN5bmMgKHVzZXI6IFVzZXIpID0+IHtcclxuXHRcdGxldCBib29raW5nczogQm9va2luZ01vZGVsW10gPSBbXTtcclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdC8vIEdldCBib29raW5ncyBvbiBzZWxmLlxyXG5cdFx0XHRib29raW5ncyA9IGF3YWl0IHVzZXIuJGdldChcImJvb2tpbmdzXCIsIHtcclxuXHRcdFx0XHRpbmNsdWRlOiBbVmVoaWNsZSwgUmVwbGFjZVZlaGljbGVdXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuQURNSU4gfHwgdXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSKSB7XHJcblx0XHRcdC8vIEdldCBib29raW5ncyBvbiBzZWxmIGNsaWVudC5cclxuXHRcdFx0Ym9va2luZ3MgPSBhd2FpdCBCb29raW5nTW9kZWwuZmluZEFsbCh7XHJcblx0XHRcdFx0aW5jbHVkZTogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtb2RlbDogVXNlcixcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRjbGllbnRJZDogdXNlci5jbGllbnRJZFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0VmVoaWNsZSxcclxuXHRcdFx0XHRcdFJlcGxhY2VWZWhpY2xlXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSBpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0XHQvLyBHZXQgYWxsIGJvb2tpbmdzLlxyXG5cdFx0XHRib29raW5ncyA9IGF3YWl0IEJvb2tpbmdNb2RlbC5maW5kQWxsKHtcclxuXHRcdFx0XHRpbmNsdWRlOiBbVmVoaWNsZSwgUmVwbGFjZVZlaGljbGVdXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ldyBDb2xsZWN0aW9uPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+LCBCb29raW5nPihcclxuXHRcdFx0Ym9va2luZ3MubWFwKGIgPT4gbmV3IEJvb2tpbmcoYikpXHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IEJvb2tpbmdDcmVhdGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCB2YWxpZGF0b3IgPSBCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLkNSRUFURVxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0Ly8gVmFsaWRhdGUgSlNPTiBzY2hlbWEuXHJcblx0XHRcdGF3YWl0IHZhbGlkYXRvci52YWxpZGF0ZShvcHRpb25zKTtcclxuXHRcdFx0Ly8gQ2FzdCB0aGUgSlNPTlxyXG5cdFx0XHRjb25zdCBib29raW5nT3B0aW9ucyA9IHZhbGlkYXRvci5jYXN0KG9wdGlvbnMpIGFzIFBhcnRpYWw8XHJcblx0XHRcdFx0Qm9va2luZ0NyZWF0ZU9wdGlvbnNcclxuXHRcdFx0PjtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSByZXBsYWNlZCB2ZWhpY2xlLlxyXG5cdFx0XHRjb25zdCByZXBsYWNlZFZlaGljbGUgPVxyXG5cdFx0XHRcdGJvb2tpbmdPcHRpb25zLnJlcGxhY2VWZWhpY2xlICYmXHJcblx0XHRcdFx0KGF3YWl0IFJlcGxhY2VWZWhpY2xlLmNyZWF0ZShib29raW5nT3B0aW9ucy5yZXBsYWNlVmVoaWNsZSkpO1xyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIGJvb2tpbmdcclxuXHRcdFx0Ly8gVE9ETzogSW5jbHVkZSBcInBhaWRcIiwgYW5kIFwiYW1vdW50XCIgaW4gc2NoZW1hLlxyXG5cdFx0XHRjb25zdCBjcmVhdGVkQm9va2luZyA9IGF3YWl0IEJvb2tpbmdNb2RlbC5jcmVhdGUoe1xyXG5cdFx0XHRcdHBhaWQ6IGZhbHNlLFxyXG5cdFx0XHRcdGFtb3VudDogbnVsbCxcclxuXHRcdFx0XHQuLi5ib29raW5nT3B0aW9ucyxcclxuXHRcdFx0XHRyZXBsYWNlVmVoaWNsZUlkOiByZXBsYWNlZFZlaGljbGU/LmlkIHx8IG51bGxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IEJvb2tpbmcoY3JlYXRlZEJvb2tpbmcpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRuZXcgQXBpRXJyb3JIYW5kbGVyKGUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0ID0gYXN5bmMgKHVzZXI6IFVzZXIsIGJvb2tpbmdJZDogbnVtYmVyKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nID0gYXdhaXQgQm9va2luZ01vZGVsLmZpbmRCeVBrKGJvb2tpbmdJZCwge1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBhbGw6IHRydWUgfV1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghYm9va2luZykge1xyXG5cdFx0XHR0aHJvdyBuZXcgSXRlbU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdGBCb29raW5nIHdpdGggJHtib29raW5nSWR9IGRvZXMgbm90IGV4aXN0LmBcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUKSB7XHJcblx0XHRcdC8vIFJldHVybiBvbmx5IG93biBib29raW5ncy5cclxuXHRcdFx0aWYgKGJvb2tpbmcudXNlcklkID09PSB1c2VyLmlkKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBCb29raW5nKGJvb2tpbmcpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUiB8fCB1c2VyLnJvbGUgPT09IFJvbGUuQURNSU4pIHtcclxuXHRcdFx0aWYgKGJvb2tpbmcudXNlci5jbGllbnRJZCA9PT0gdXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgQm9va2luZyhib29raW5nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSKSB7XHJcblx0XHRcdHJldHVybiBuZXcgQm9va2luZyhib29raW5nKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgdXBkYXRlID0gYXN5bmMgKHVzZXI6IFVzZXIsIG9wdGlvbnM6IEJvb2tpbmdVcGRhdGVPcHRpb25zKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBib29raW5nID0gYXdhaXQgdGhpcy5kYXRhLnJlbG9hZCh7XHJcblx0XHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IFJlcGxhY2VWZWhpY2xlIH1dXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zdCB2YWxpZGF0b3IgPSBCb29raW5nVmFsaWRhdG9ycy5nZXRWYWxpZGF0b3IoXHJcblx0XHRcdFx0dXNlcixcclxuXHRcdFx0XHRBUElfT1BFUkFUSU9OLlVQREFURSxcclxuXHRcdFx0XHRib29raW5nXHJcblx0XHRcdCk7XHJcblx0XHRcdC8vIFZhbGlkYXRlIEpTT04gc2NoZW1hLlxyXG5cdFx0XHRhd2FpdCB2YWxpZGF0b3IudmFsaWRhdGUob3B0aW9ucyk7XHJcblx0XHRcdC8vIENhc3QgdGhlIEpTT05cclxuXHRcdFx0Y29uc3QgYm9va2luZ09wdGlvbnMgPSB2YWxpZGF0b3IuY2FzdChvcHRpb25zKSBhcyBQYXJ0aWFsPFxyXG5cdFx0XHRcdEJvb2tpbmdVcGRhdGVPcHRpb25zXHJcblx0XHRcdD47XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgcmVwbGFjZWQgdmVoaWNsZS5cclxuXHRcdFx0Y29uc3QgcmVwbGFjZWRWZWhpY2xlID1cclxuXHRcdFx0XHRib29raW5nT3B0aW9ucy5yZXBsYWNlVmVoaWNsZSAmJlxyXG5cdFx0XHRcdChhd2FpdCBSZXBsYWNlVmVoaWNsZS5jcmVhdGUoYm9va2luZ09wdGlvbnMucmVwbGFjZVZlaGljbGUpKTtcclxuXHRcdFx0Ly8gRGVsZXRlIHJlcGxhY2VkIHZlaGljbGVcclxuXHRcdFx0aWYgKHJlcGxhY2VkVmVoaWNsZSAmJiBib29raW5nLnJlcGxhY2VWZWhpY2xlSWQpIHtcclxuXHRcdFx0XHRhd2FpdCBSZXBsYWNlVmVoaWNsZS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ3JlYXRlIGJvb2tpbmdcclxuXHJcblx0XHRcdGNvbnN0IHVwZGF0ZWRCb29raW5nID0gYXdhaXQgdGhpcy5kYXRhLnVwZGF0ZSh7XHJcblx0XHRcdFx0Li4uYm9va2luZ09wdGlvbnMsXHJcblx0XHRcdFx0cmVwbGFjZVZlaGljbGVJZDogcmVwbGFjZWRWZWhpY2xlPy5pZFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgQm9va2luZyh1cGRhdGVkQm9va2luZyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHRwdWJsaWMgZGVzdHJveSA9IGFzeW5jICh1c2VyOiBVc2VyKSA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBWYWxpZGF0ZSBKU09OIHNjaGVtYS5cclxuXHRcdFx0YXdhaXQgQm9va2luZ1ZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKFxyXG5cdFx0XHRcdHVzZXIsXHJcblx0XHRcdFx0QVBJX09QRVJBVElPTi5ERUxFVEUsXHJcblx0XHRcdFx0dGhpcy5kYXRhXHJcblx0XHRcdCkudmFsaWRhdGUodGhpcy5kYXRhKTtcclxuXHJcblx0XHRcdGF3YWl0IHRoaXMuZGF0YS5kZXN0cm95KCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cHVibGljIHNldEVtYWlsTm90aWZpY2F0aW9uc1RvQm9va2luZ01hbmFnZXJzID0gYXN5bmMgKCkgPT4ge1xyXG5cdFx0Y29uc3QgYm9va2luZ0RhdGEgPSBhd2FpdCB0aGlzLmRhdGEucmVsb2FkKHtcclxuXHRcdFx0aW5jbHVkZTogW3sgbW9kZWw6IFVzZXIgfV1cclxuXHRcdH0pO1xyXG5cdFx0YXdhaXQgVXNlci5maW5kQWxsKHtcclxuXHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRjbGllbnRJZDogYm9va2luZ0RhdGEudXNlci5jbGllbnRJZCxcclxuXHRcdFx0XHRyb2xlOiB7XHJcblx0XHRcdFx0XHRbT3AuaW5dOiBbUm9sZS5BRE1JTiwgUm9sZS5LRVlfTUFOQUdFUl1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pLnRoZW4oYXN5bmMgdXNlcnMgPT4ge1xyXG5cdFx0XHRjb25zdCB2ZWhpY2xlID0gYXdhaXQgVmVoaWNsZS5maW5kQnlQayhib29raW5nRGF0YS52ZWhpY2xlSWQpO1xyXG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IHZlaGljbGUgJiYgKGF3YWl0IExvY2F0aW9uLmZpbmRCeVBrKHZlaGljbGUubG9jYXRpb25JZCkpO1xyXG5cclxuXHRcdFx0bGV0IGxuZyA9IGxvY2F0aW9uLmxuZztcclxuXHRcdFx0bGV0IGxhdCA9IGxvY2F0aW9uLmxhdDtcclxuXHJcblx0XHRcdGlmICh2ZWhpY2xlLndpYWxvblVuaXRJZCkge1xyXG5cdFx0XHRcdGNvbnN0IHcgPSBhd2FpdCBXaWFsb24ubG9naW4oe1xyXG5cdFx0XHRcdFx0dG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGNvbnN0IHVuaXQgPSBhd2FpdCB3LkNvcmUuc2VhcmNoSXRlbSh7XHJcblx0XHRcdFx0XHRpZDogdmVoaWNsZS53aWFsb25Vbml0SWQsXHJcblx0XHRcdFx0XHRmbGFnczogMTAyNCArIDgxOTJcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpZiAodW5pdCkge1xyXG5cdFx0XHRcdFx0bGF0ID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy55O1xyXG5cdFx0XHRcdFx0bG5nID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy54O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IgKGNvbnN0IHVzZXIgb2YgdXNlcnMpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0c2VuZEJvb2tpbmdOb3RpZmljYXRpb24oe1xyXG5cdFx0XHRcdFx0XHRlbWFpbDogdXNlci5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Y29tcGFueTogXCJMZWFzZVBsYW5cIixcclxuXHRcdFx0XHRcdFx0Ym9va2luZ0lkOiBib29raW5nRGF0YS5pZCxcclxuXHRcdFx0XHRcdFx0Y3VzdG9tZXJFbWFpbDogYm9va2luZ0RhdGEudXNlci5lbWFpbCxcclxuXHRcdFx0XHRcdFx0Y3VzdG9tZXJOYW1lOiBgJHtib29raW5nRGF0YS51c2VyLmZpcnN0TmFtZX0gJHtib29raW5nRGF0YS51c2VyLmxhc3ROYW1lfWAsXHJcblx0XHRcdFx0XHRcdGZyb206IG1vbWVudChib29raW5nRGF0YS5mcm9tKS51bml4KCksXHJcblx0XHRcdFx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0bGF0LFxyXG5cdFx0XHRcdFx0XHRsbmcsXHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiBsb2NhdGlvbi5uYW1lLFxyXG5cdFx0XHRcdFx0XHRtb2JpbGU6IGJvb2tpbmdEYXRhLnVzZXIubW9iaWxlTnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogdmVoaWNsZS5wbGF0ZU51bWJlciB8fCBcIk4vQVwiLFxyXG5cdFx0XHRcdFx0XHR2ZWhpY2xlOiBgJHt2ZWhpY2xlLmJyYW5kfSAke3ZlaGljbGUubW9kZWx9YCxcclxuXHRcdFx0XHRcdFx0dmVoaWNsZUlkOiB2ZWhpY2xlLmlkLFxyXG5cdFx0XHRcdFx0XHR0aW1lWm9uZTogdXNlci50aW1lWm9uZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge31cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0cHVibGljIHNlbmRJbnZvaWNlID0gYXN5bmMgKGFtb3VudDogbnVtYmVyKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHRoaXMuZGF0YS5yZWxvYWQoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogVXNlciB9LCB7IG1vZGVsOiBWZWhpY2xlIH1dXHJcblx0XHR9KTtcclxuXHRcdGF3YWl0IHNlbmRJbnZvaWNlRW1haWwoe1xyXG5cdFx0XHRlbWFpbDogYm9va2luZ0RhdGEudXNlci5lbWFpbCxcclxuXHRcdFx0YW1vdW50OiBhbW91bnQsXHJcblx0XHRcdGN1c3RvbWVyTmFtZTogYm9va2luZ0RhdGEudXNlci5maXJzdE5hbWUsXHJcblx0XHRcdHZlaGljbGVOYW1lOiBgJHtib29raW5nRGF0YS52ZWhpY2xlLmJyYW5kfSAke2Jvb2tpbmdEYXRhLnZlaGljbGUubW9kZWx9YCxcclxuXHRcdFx0ZnJvbTogbW9tZW50KGJvb2tpbmdEYXRhLmZyb20sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdGJvb2tpbmdJZDogYm9va2luZ0RhdGEuaWQsXHJcblx0XHRcdHRpbWVab25lOiBib29raW5nRGF0YS51c2VyLnRpbWVab25lXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgc2VuZEJvb2tpbmdDb25maXJtYXRpb24gPSBhc3luYyAoKSA9PiB7XHJcblx0XHRjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHRoaXMuZGF0YS5yZWxvYWQoe1xyXG5cdFx0XHRpbmNsdWRlOiBbeyBtb2RlbDogVXNlciB9LCB7IG1vZGVsOiBWZWhpY2xlIH1dXHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHZlaGljbGVMb2NhdGlvbiA9IGF3YWl0IExvY2F0aW9uLmZpbmRCeVBrKFxyXG5cdFx0XHRib29raW5nRGF0YS52ZWhpY2xlLmxvY2F0aW9uSWRcclxuXHRcdCk7XHJcblx0XHRsZXQgbG5nID0gdmVoaWNsZUxvY2F0aW9uLmxuZztcclxuXHRcdGxldCBsYXQgPSB2ZWhpY2xlTG9jYXRpb24ubGF0O1xyXG5cclxuXHRcdGlmIChib29raW5nRGF0YS52ZWhpY2xlLndpYWxvblVuaXRJZCkge1xyXG5cdFx0XHRjb25zdCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHtcclxuXHRcdFx0XHR0b2tlbjogcHJvY2Vzcy5lbnYuV0lBTE9OX1RPS0VOXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zdCB1bml0ID0gYXdhaXQgdy5Db3JlLnNlYXJjaEl0ZW0oe1xyXG5cdFx0XHRcdGlkOiBib29raW5nRGF0YS52ZWhpY2xlLndpYWxvblVuaXRJZCxcclxuXHRcdFx0XHRmbGFnczogMTAyNCArIDgxOTJcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh1bml0KSB7XHJcblx0XHRcdFx0bGF0ID0gdW5pdC5pdGVtICYmIHVuaXQuaXRlbS5wb3MgJiYgdW5pdC5pdGVtLnBvcy55O1xyXG5cdFx0XHRcdGxuZyA9IHVuaXQuaXRlbSAmJiB1bml0Lml0ZW0ucG9zICYmIHVuaXQuaXRlbS5wb3MueDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0YXdhaXQgc2VuZEJvb2tpbmdDb25maXJtYXRpb25FbWFpbCh7XHJcblx0XHRcdGVtYWlsOiBib29raW5nRGF0YS51c2VyLmVtYWlsLFxyXG5cdFx0XHRjdXN0b21lck5hbWU6IGJvb2tpbmdEYXRhLnVzZXIuZmlyc3ROYW1lLFxyXG5cdFx0XHR2ZWhpY2xlTmFtZTogYCR7Ym9va2luZ0RhdGEudmVoaWNsZS5icmFuZH0gJHtib29raW5nRGF0YS52ZWhpY2xlLm1vZGVsfSAke2Jvb2tpbmdEYXRhLnZlaGljbGUucGxhdGVOdW1iZXJ9YCxcclxuXHRcdFx0ZnJvbTogbW9tZW50KGJvb2tpbmdEYXRhLmZyb20sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdHRvOiBtb21lbnQoYm9va2luZ0RhdGEudG8sIFwiWFwiKS51bml4KCksXHJcblx0XHRcdGJvb2tpbmdJZDogYm9va2luZ0RhdGEuaWQsXHJcblx0XHRcdGFkZHJlc3M6IHZlaGljbGVMb2NhdGlvbiAmJiB2ZWhpY2xlTG9jYXRpb24uYWRkcmVzcyxcclxuXHRcdFx0cGFya2luZ0xvY2F0aW9uOiBib29raW5nRGF0YS52ZWhpY2xlLnBhcmtpbmdMb2NhdGlvbixcclxuXHRcdFx0bGF0LFxyXG5cdFx0XHRsbmcsXHJcblx0XHRcdHRpbWVab25lOiBib29raW5nRGF0YS51c2VyLnRpbWVab25lXHJcblx0XHR9KTtcclxuXHR9O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHl1cCBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuaW1wb3J0IHtcclxuXHRVc2VyLFxyXG5cdFZlaGljbGUsXHJcblx0Qm9va2luZyBhcyBCb29raW5nTW9kZWwsXHJcblx0UmVwbGFjZVZlaGljbGVcclxufSBmcm9tIFwiLi4vLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IEJvb2tpbmdBdHRyaWJ1dGVzLCBCb29raW5nVHlwZSwgUm9sZSB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgeyBzdHJpcEZpZWxkIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgaXNCb29raW5nVGltZVNsb3RUYWtlbiB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBCb29raW5nQ3JlYXRlT3B0aW9ucywgQm9va2luZ1VwZGF0ZU9wdGlvbnMgfSBmcm9tIFwiLi4vQm9va2luZ1wiO1xyXG5pbXBvcnQgeyBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuXCI7XHJcblxyXG50eXBlIFZhbGlkYXRvclBhcmFtZXRlcnMgPSBQYXJhbWV0ZXJzPHR5cGVvZiBCb29raW5nLmdldFZhbGlkYXRvcj47XHJcblxyXG5pbnRlcmZhY2UgQm9va2luZ1ZhbGlkYXRpb25EYXRhXHJcblx0ZXh0ZW5kcyBPbWl0PEJvb2tpbmdBdHRyaWJ1dGVzLCBcImZyb21cIiB8IFwidG9cIiB8IFwiY3JlYXRlZEF0XCIgfCBcInVwZGF0ZWRBdFwiPiB7XHJcblx0ZnJvbTogbnVtYmVyIHwgRGF0ZTtcclxuXHR0bzogbnVtYmVyIHwgRGF0ZTtcclxuXHRjcmVhdGVkQXQ6IG51bWJlciB8IERhdGU7XHJcblx0Y3JlYXRlZGF0OiBudW1iZXIgfCBEYXRlO1xyXG59XHJcblxyXG50eXBlIEJvb2tpbmdWYWxpZGF0b3JDb250ZXh0V2l0aFNjaGVtYSA9IFtcclxuXHRWYWxpZGF0b3JQYXJhbWV0ZXJzWzBdLFxyXG5cdEFQSV9PUEVSQVRJT04sXHJcblx0Qm9va2luZ01vZGVsLFxyXG5cdEJvb2tpbmdVcGRhdGVPcHRpb25zIHwgQm9va2luZ0NyZWF0ZU9wdGlvbnMsXHJcblx0Ym9vbGVhbixcclxuXHR5dXAuT2JqZWN0U2NoZW1hPEJvb2tpbmdWYWxpZGF0aW9uRGF0YT5cclxuXTtcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJvb2tpbmcge1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0VmFsaWRhdG9yID0gKFxyXG5cdFx0dXNlcjogVXNlcixcclxuXHRcdG9wZXJhdGlvbjogQVBJX09QRVJBVElPTixcclxuXHRcdHRhcmdldD86IEJvb2tpbmdNb2RlbFxyXG5cdCkgPT4gbmV3IFZhbGlkYXRvcihCb29raW5nLnZhbGlkYXRvclNjaGVtYSwgdXNlciwgb3BlcmF0aW9uLCB0YXJnZXQpO1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyB2YWxpZGF0b3JTY2hlbWEgPSB5dXBcclxuXHRcdC5vYmplY3QoKVxyXG5cdFx0LnNoYXBlKHtcclxuXHRcdFx0cGFpZDogeXVwLmJvb2xlYW4oKSxcclxuXHRcdFx0YW1vdW50OiB5dXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0ZnJvbTogeXVwXHJcblx0XHRcdFx0LmRhdGUoKVxyXG5cdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHR0eXBlb2Ygb3JpZ2luYWxWYWx1ZSA9PT0gXCJudW1iZXJcIlxyXG5cdFx0XHRcdFx0XHQ/IG1vbWVudChvcmlnaW5hbFZhbHVlLCBcIlhcIikudG9EYXRlKClcclxuXHRcdFx0XHRcdFx0OiBvcmlnaW5hbFZhbHVlXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0dG86IHl1cFxyXG5cdFx0XHRcdC5kYXRlKClcclxuXHRcdFx0XHQudHJhbnNmb3JtKCh2LCBvcmlnaW5hbFZhbHVlKSA9PlxyXG5cdFx0XHRcdFx0dHlwZW9mIG9yaWdpbmFsVmFsdWUgPT09IFwibnVtYmVyXCJcclxuXHRcdFx0XHRcdFx0PyBtb21lbnQob3JpZ2luYWxWYWx1ZSwgXCJYXCIpLnRvRGF0ZSgpXHJcblx0XHRcdFx0XHRcdDogb3JpZ2luYWxWYWx1ZVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdGFwcHJvdmVkOiB5dXAuYm9vbGVhbigpLm51bGxhYmxlKCksXHJcblx0XHRcdGZpbmlzaGVkOiB5dXAuYm9vbGVhbigpLFxyXG5cdFx0XHRzdGFydE1pbGVhZ2U6IHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRlbmRNaWxlYWdlOiB5dXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0c3RhcnRGdWVsOiB5dXAubnVtYmVyKCkubnVsbGFibGUoKSxcclxuXHRcdFx0ZW5kRnVlbDogeXVwLm51bWJlcigpLm51bGxhYmxlKCksXHJcblx0XHRcdHVzZXJJZDogeXVwLm51bWJlcigpLFxyXG5cdFx0XHR2ZWhpY2xlSWQ6IHl1cC5udW1iZXIoKSxcclxuXHRcdFx0Ym9va2luZ1R5cGU6IHl1cC5taXhlZDxCb29raW5nVHlwZT4oKS5vbmVPZihPYmplY3QudmFsdWVzKEJvb2tpbmdUeXBlKSksXHJcblx0XHRcdHJlcGxhY2VWZWhpY2xlSWQ6IHl1cC5udW1iZXIoKS5udWxsYWJsZSgpXHJcblx0XHR9KVxyXG5cdFx0LndoZW4oXHJcblx0XHRcdFtcIiR1c2VyXCIsIFwiJG9wZXJhdGlvblwiLCBcIiR0YXJnZXRcIiwgXCIkZGF0YVwiLCBcIiRjYXN0aW5nXCJdLFxyXG5cdFx0XHQoLi4uYXJnczogQm9va2luZ1ZhbGlkYXRvckNvbnRleHRXaXRoU2NoZW1hKSA9PiB7XHJcblx0XHRcdFx0bGV0IFt1c2VyLCBvcGVyYXRpb24sIHRhcmdldCwgZGF0YSwgY2FzdGluZywgc2NoZW1hXSA9IGFyZ3M7XHJcblx0XHRcdFx0c3dpdGNoIChvcGVyYXRpb24pIHtcclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5SRUFEOiB7XHJcblx0XHRcdFx0XHRcdGlmIChkYXRhLmJvb2tpbmdUeXBlID09PSBCb29raW5nVHlwZS5SRVBMQUNFTUVOVCkge1xyXG5cdFx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXBsYWNlVmVoaWNsZTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5vYmplY3QoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyYW5kOiB5dXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogeXVwLnN0cmluZygpLm51bGxhYmxlKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmluOiB5dXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogeXVwLnN0cmluZygpLm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWEuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdGlkOiB5dXAubnVtYmVyKCksXHJcblx0XHRcdFx0XHRcdFx0ZnJvbTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudChvcmlnaW5hbFZhbHVlIGFzIERhdGUpLnVuaXgoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR0bzogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oKHYsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudChvcmlnaW5hbFZhbHVlIGFzIERhdGUpLnVuaXgoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRjcmVhdGVkQXQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCh2LCBvcmlnaW5hbFZhbHVlKSA9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQob3JpZ2luYWxWYWx1ZSBhcyBEYXRlKS51bml4KClcclxuXHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0dXBkYXRlZEF0OiB5dXBcclxuXHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdC50cmFuc2Zvcm0oXHJcblx0XHRcdFx0XHRcdFx0XHRcdCh2LCBvcmlnaW5hbFZhbHVlKSA9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdChvcmlnaW5hbFZhbHVlICYmIG1vbWVudChvcmlnaW5hbFZhbHVlIGFzIERhdGUpLnVuaXgoKSkgfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRudWxsXHJcblx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdHZlaGljbGU6IHl1cC5vYmplY3QoKS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRpZDogeXVwLm51bWJlcigpLFxyXG5cdFx0XHRcdFx0XHRcdFx0YnJhbmQ6IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdG1vZGVsOiB5dXAuc3RyaW5nKCksXHJcblx0XHRcdFx0XHRcdFx0XHR2aW46IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKClcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIEFQSV9PUEVSQVRJT04uVVBEQVRFOiB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHVwZGF0ZURhdGEgPSBkYXRhIGFzIEJvb2tpbmdVcGRhdGVPcHRpb25zO1xyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWEuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdGZyb206IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0LmRhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodmFsdWUsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vbWVudChvcmlnaW5hbFZhbHVlLCBcIlhcIikudG9EYXRlKClcclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIm5vLWFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwiQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuIGFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNoYW5nZWQgPVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8uZnJvbSAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLmZyb20gIT09IHRhcmdldC5mcm9tO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEd1ZXN0LCBkZW55IGNoYW5nZXMgaWYgYXBwcm92ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5HVUVTVCAmJiB0YXJnZXQuYXBwcm92ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQuZmluaXNoZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEtleSBNYW5hZ2VyLCBkZW55IGlmIGJvb2tpbmcgaGFzIGZpbmlzaGVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR0bzogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQuZGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCh2YWx1ZSwgb3JpZ2luYWxWYWx1ZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwibm8tYXBwcm92ZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJCb29raW5nIGhhcyBhbHJlYWR5IGJlZW4gYXBwcm92ZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhPy50byAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLnRvICE9PSB0YXJnZXQudG87XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiBHdWVzdCwgZGVueSBjaGFuZ2VzIGlmIGFwcHJvdmVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh1c2VyLnJvbGUgPT09IFJvbGUuR1VFU1QgJiYgdGFyZ2V0LmFwcHJvdmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUiAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LmZpbmlzaGVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiBLZXkgTWFuYWdlciwgZGVueSBpZiBib29raW5nIGhhcyBmaW5pc2hlZC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0ZmluaXNoZWQ6IHN0cmlwRmllbGQoXHJcblx0XHRcdFx0XHRcdFx0XHR5dXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmJvb2xlYW4oKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcInRpbWVzbG90LWF2YWlsYWJsZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiVGhpcyBib29raW5nIGlzIGludGVyc2VjdHMgd2l0aCBhbm90aGVyIGJvb2tpbmcgYXQgdGhlIHRpbWUgc3BlY2lmaWVkLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LmZpbmlzaGVkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YS5maW5pc2hlZCAhPT0gdGFyZ2V0LmZpbmlzaGVkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBib29rZWRWZWhpY2xlID0gYXdhaXQgVmVoaWNsZS5maW5kQnlQayhcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LnZlaGljbGVJZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGluY2x1ZGU6IFt7IG1vZGVsOiBCb29raW5nTW9kZWwgfV1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAhaXNCb29raW5nVGltZVNsb3RUYWtlbihcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ym9va2VkVmVoaWNsZS5ib29raW5ncy5tYXAoKHsgZnJvbSwgdG8sIGlkIH0pID0+ICh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnJvbTogbW9tZW50KGZyb20pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bzogbW9tZW50KHRvKS51bml4KCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSkpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb21lbnQodGFyZ2V0LmZyb20pLnVuaXgoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KHRhcmdldC5mcm9tKS51bml4KCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5pZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRbUm9sZS5NQVNURVIsIFJvbGUuQURNSU4sIFJvbGUuS0VZX01BTkFHRVJdXHJcblx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR1c2VySWQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJuby1hcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIkJvb2tpbmcgaGFzIGFscmVhZHkgYmVlbiBhcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LnVzZXJJZCAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLnVzZXJJZCAhPT0gdGFyZ2V0LnVzZXJJZDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEd1ZXN0LCBkZW55IGNoYW5nZXMgaWYgYXBwcm92ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5HVUVTVCAmJiB0YXJnZXQuYXBwcm92ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlci5yb2xlID09PSBSb2xlLktFWV9NQU5BR0VSICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YXJnZXQuZmluaXNoZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEtleSBNYW5hZ2VyLCBkZW55IGlmIGJvb2tpbmcgaGFzIGZpbmlzaGVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHR2ZWhpY2xlSWQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0Lm51bWJlcigpXHJcblx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XCJuby1hcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcIkJvb2tpbmcgaGFzIGFscmVhZHkgYmVlbiBhcHByb3ZlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LnZlaGljbGVJZCAhPT0gdW5kZWZpbmVkICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLnZlaGljbGVJZCAhPT0gdGFyZ2V0LnZlaGljbGVJZDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIEd1ZXN0IG9yIEtNLCBkZW55IGNoYW5nZXMgaWYgYXBwcm92ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlci5yb2xlID09PSBSb2xlLkdVRVNUIHx8XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0YXJnZXQuYXBwcm92ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRzdGFydEZ1ZWw6IHN0cmlwRmllbGQoeXVwLm51bWJlcigpLm51bGxhYmxlKCksIFtcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuTUFTVEVSLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5BRE1JTixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHRzdGFydE1pbGVhZ2U6IHN0cmlwRmllbGQoeXVwLm51bWJlcigpLm51bGxhYmxlKCksIFtcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuTUFTVEVSLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5BRE1JTixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuS0VZX01BTkFHRVJcclxuXHRcdFx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHRcdFx0XHRhcHByb3ZlZDogc3RyaXBGaWVsZChcclxuXHRcdFx0XHRcdFx0XHRcdHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuYm9vbGVhbigpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5udWxsYWJsZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibm8tZmluaXNoZWQtYm9va2luZ1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiVGhpcyBib29raW5nIGhhcyBhbHJlYWR5IGZpbmlzaGVkLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LmFwcHJvdmVkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YS5hcHByb3ZlZCAhPT0gdGFyZ2V0LmFwcHJvdmVkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gIXRhcmdldC5maW5pc2hlZDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJwZW5kaW5nLW9ubHlcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBgQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuICR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5hcHByb3ZlZCA/IFwiYXBwcm92ZWRcIiA6IFwiZGVuaWVkXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1gO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBjaGFuZ2VkID1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YT8uYXBwcm92ZWQgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVEYXRhLmFwcHJvdmVkICE9PSB0YXJnZXQuYXBwcm92ZWQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBjaGFuZ2VkID8gdGFyZ2V0LmFwcHJvdmVkID09PSBudWxsIDogdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJib29raW5nLWV4cGlyZWRcIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcIkJvb2tpbmcgaGFzIGFscmVhZHkgZXhwaXJlZFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgY2hhbmdlZCA9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGE/LmFwcHJvdmVkICE9PSB1bmRlZmluZWQgJiZcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXBkYXRlRGF0YS5hcHByb3ZlZCAhPT0gdGFyZ2V0LmFwcHJvdmVkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghY2hhbmdlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9tZW50KHRhcmdldC5mcm9tKS5pc0FmdGVyKG1vbWVudCgpKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRbUm9sZS5NQVNURVIsIFJvbGUuQURNSU4sIFJvbGUuS0VZX01BTkFHRVJdXHJcblx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRlbmRGdWVsOiBzdHJpcEZpZWxkKHl1cC5udW1iZXIoKS5udWxsYWJsZSgpLCBbXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLk1BU1RFUixcclxuXHRcdFx0XHRcdFx0XHRcdFJvbGUuQURNSU4sXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLktFWV9NQU5BR0VSXHJcblx0XHRcdFx0XHRcdFx0XSksXHJcblx0XHRcdFx0XHRcdFx0ZW5kTWlsZWFnZTogc3RyaXBGaWVsZCh5dXAubnVtYmVyKCkubnVsbGFibGUoKSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5NQVNURVIsXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLkFETUlOLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHBhaWQ6IHN0cmlwRmllbGQoeXVwLmJvb2xlYW4oKSwgW1xyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5NQVNURVIsXHJcblx0XHRcdFx0XHRcdFx0XHRSb2xlLkFETUlOLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdFx0XHRcdHJlcGxhY2VWZWhpY2xlOiB5dXAubGF6eShmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSWYgYm9va2luZyB0eXBlIGhhcyBiZWVuIGNoYW5nZWQgdG8gcmVwbGFjZW1lbnQsIHRoZW4gcmVxdWlyZSBhIHJlcGxhY2VtZW50IHZlaGljbGUuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZURhdGEuYm9va2luZ1R5cGUgPT09IEJvb2tpbmdUeXBlLlJFUExBQ0VNRU5UICYmXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRhcmdldC5ib29raW5nVHlwZSAhPT0gQm9va2luZ1R5cGUuUkVQTEFDRU1FTlRcclxuXHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9iamVjdCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpbjogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmFuZDogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogeXVwLnN0cmluZygpLnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5yZXF1aXJlZCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0YXJnZXQuYm9va2luZ1R5cGUgPT09IEJvb2tpbmdUeXBlLlJFUExBQ0VNRU5UKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIGV4aXN0aW5nIGJvb2tpbmcgdHlwZSBpcyBSZXBsYWNlbWVudCwgYWxsb3cgdXBkYXRpbmcgcGFydGlhbGx5LlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9iamVjdCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBsYXRlTnVtYmVyOiB5dXAuc3RyaW5nKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2aW46IHl1cC5zdHJpbmcoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyYW5kOiB5dXAuc3RyaW5nKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogeXVwLnN0cmluZygpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKHYgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVwbGFjZVZlaGljbGUgPSBSZXBsYWNlVmVoaWNsZS5maW5kQnlQayhcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LnJlcGxhY2VWZWhpY2xlSWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4geyAuLi52LCAuLi5yZXBsYWNlVmVoaWNsZSB9O1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubWl4ZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubm90UmVxdWlyZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCgpID0+IG51bGwpO1xyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIEFQSV9PUEVSQVRJT04uQ1JFQVRFOiB7XHJcblx0XHRcdFx0XHRcdHNjaGVtYVxyXG5cdFx0XHRcdFx0XHRcdC5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRwYWlkOiBzdHJpcEZpZWxkKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR5dXAuYm9vbGVhbigpLmRlZmF1bHQoZmFsc2UpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRbUm9sZS5HVUVTVF0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHRhbW91bnQ6IHN0cmlwRmllbGQoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5udWxsYWJsZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmRlZmF1bHQobnVsbCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFtSb2xlLkdVRVNUXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdHVzZXJJZDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVxdWlyZWQoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcImRiLW5vLWV4aXN0XCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KHsgdmFsdWUgfSkgPT4gYFVzZXIgd2l0aCBJRCAke3ZhbHVlfSBkb2VzIG5vdCBleGlzdC5gLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jIHZhbHVlID0+IEJvb2xlYW4oYXdhaXQgVXNlci5maW5kQnlQayh2YWx1ZSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRcdFx0XHR2ZWhpY2xlSWQ6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQubnVtYmVyKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJkYi1uby1leGlzdFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCh7IHZhbHVlIH0pID0+IGBWZWhpY2xlIHdpdGggSUQgJHt2YWx1ZX0gZG9lcyBub3QgZXhpc3QuYCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhc3luYyB2YWx1ZSA9PiBCb29sZWFuKGF3YWl0IFZlaGljbGUuZmluZEJ5UGsodmFsdWUpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZnJvbTogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5kYXRlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodmFsdWUsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0dG86IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuZGF0ZSgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXF1aXJlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwibm8tbG93ZXItdGhhbi1vdGhlclwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGBCb29raW5nIHRpbWUgZW5kIGNhbm5vdCBiZSBsb3dlciB0aGFuIHN0YXJ0aW5nIHRpbWUuYCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgeyBwYXJlbnQgfSA9IHRoaXM7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gbW9tZW50KHZhbHVlLCBcIlhcIikgPCBwYXJlbnQuZnJvbTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRyYW5zZm9ybSgodmFsdWUsIG9yaWdpbmFsVmFsdWUpID0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9tZW50KG9yaWdpbmFsVmFsdWUsIFwiWFwiKS50b0RhdGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym9va2luZ1R5cGU6IHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuc3RyaW5nKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0Lm9uZU9mKE9iamVjdC52YWx1ZXMoQm9va2luZ1R5cGUpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdHJlcGxhY2VWZWhpY2xlOiB5dXAubGF6eShmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB7IGNvbnRleHQgfSA9IG9wdGlvbnM7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0W1wiYm9va2luZ09wdGlvbnNcIl0uYm9va2luZ1R5cGUgPT09XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Qm9va2luZ1R5cGUuUkVQTEFDRU1FTlRcclxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9iamVjdCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuc2hhcGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwbGF0ZU51bWJlcjogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpbjogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyYW5kOiB5dXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kZWw6IHl1cC5zdHJpbmcoKS5yZXF1aXJlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnJlcXVpcmVkKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHl1cFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5taXhlZCgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm51bGxhYmxlKClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudHJhbnNmb3JtKCgpID0+IG51bGwpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm5vdFJlcXVpcmVkKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcInRpbWVzbG90LWF2YWlsYWJsZVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJUaGUgdmVoaWNsZSBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgdGltZSBzcGVjaWZpZWQuXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRhc3luYyBmdW5jdGlvbih2KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh2ICYmIHYudmVoaWNsZUlkICYmIHYuZnJvbSAmJiB2LnRvKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgYm9va2VkVmVoaWNsZSA9IGF3YWl0IFZlaGljbGUuZmluZEJ5UGsodi52ZWhpY2xlSWQsIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGluY2x1ZGU6IFt7IG1vZGVsOiBCb29raW5nTW9kZWwgfV1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gIWlzQm9va2luZ1RpbWVTbG90VGFrZW4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib29rZWRWZWhpY2xlLmJvb2tpbmdzLm1hcChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KHsgZnJvbSwgdG8sIGFwcHJvdmVkLCBpZCB9KSA9PiAoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZyb206IG1vbWVudChmcm9tKS51bml4KCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG86IG1vbWVudCh0bykudW5peCgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFwcHJvdmVkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0di5mcm9tLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0di50b1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFwicGVybWlzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJZb3UgZG8gbm90IGhhdmUgdGhlIHBlcm1pc3Npb24gdG8gZG8gdGhpcy5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGFzeW5jIGZ1bmN0aW9uKHYpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdXNlciA9IHRoaXMub3B0aW9ucy5jb250ZXh0W1widXNlclwiXSBhcyBVc2VyO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBhbGxvdyBndWVzdCB0byBjcmVhdGUgYm9va2luZ3Mgb24gaXRzZWxmLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLkdVRVNUICYmIHYudXNlcklkID09PSB1c2VyLmlkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBhbGxvdyBib29raW5ncyBvbiB1c2VycyB3aXRoIHRoZSBzYW1lIGNsaWVudC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuS0VZX01BTkFHRVIgfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VyLnJvbGUgPT09IFJvbGUuQURNSU5cclxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0VXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5UGsodXNlci5pZCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldFVzZXIuY2xpZW50SWQgPT09IHVzZXIuY2xpZW50SWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5ERUxFVEU6IHtcclxuXHRcdFx0XHRcdFx0c2NoZW1hID0gc2NoZW1hLnNoYXBlKHtcclxuXHRcdFx0XHRcdFx0XHRhcHByb3ZlZDogeXVwXHJcblx0XHRcdFx0XHRcdFx0XHQuYm9vbGVhbigpXHJcblx0XHRcdFx0XHRcdFx0XHQubnVsbGFibGUoKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnRlc3QoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwibm90LWFwcHJvdmVkXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFwiQm9va2luZyBoYXMgYWxyZWFkeSBiZWVuIGFwcHJvdmVkIGFuZCBjYW5ub3QgYmUgZGVsZXRlZC5cIixcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgPT4gdmFsdWUgIT09IHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gc2NoZW1hO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHl1cCBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcImV4cHJlc3MtdmFsaWRhdG9yXCI7XHJcblxyXG50eXBlIFNjaGVtYUhlbHBlcjxUPiA9IChzY2hlbWE6IFQpID0+IFQ7XHJcblxyXG50eXBlIFRlc3RTY2hlbWFIZWxwZXIgPSAoXHJcblx0dGhpczogeXVwLlRlc3RDb250ZXh0LFxyXG5cdHZhbHVlPzogYW55XHJcbikgPT4gYm9vbGVhbiB8IHl1cC5WYWxpZGF0aW9uRXJyb3IgfCBQcm9taXNlPGJvb2xlYW4gfCB5dXAuVmFsaWRhdGlvbkVycm9yPjtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gc2NoZW1hIFl1cCBzY2hlbWFcclxuICogQHBhcmFtIHN0cmlwRm91bmRcclxuICogQHZhbHVlIHRydWUgLSBzdHJpcCBmaWVsZCBpZiBmb3VuZC5cclxuICogQHZhbHVlIGZhbHNlIC0gc3RyaXAgZmllbGQgaWYgbm90IGZvdW5kLlxyXG4gKiBAcGFyYW0gcm9sZXMgcm9sZXMgdG8gc2VhcmNoLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlcXVpcmVSb2xlID0gPFQ+KHJvbGVzOiBSb2xlW10pOiBUZXN0U2NoZW1hSGVscGVyID0+XHJcblx0ZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zdCB1c2VyID0gdGhpcy5vcHRpb25zLmNvbnRleHRbXCJ1c2VyXCJdIGFzIFVzZXI7XHJcblx0XHRjb25zdCBleGlzdHMgPSByb2xlcy5pbmNsdWRlcyh1c2VyLnJvbGUpO1xyXG5cclxuXHRcdGlmICghZXhpc3RzKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBrZXkgS2V5IG9mIG9iamVjdCB3aGVyZSB0aGUgdXNlciBJZCB3aWxsIGJlIGNvbXBhcmVkLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNlbGZPbmx5ID0gKGtleTogc3RyaW5nID0gXCJ1c2VySWRcIik6IFRlc3RTY2hlbWFIZWxwZXIgPT5cclxuXHRmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMub3B0aW9ucy5jb250ZXh0W1widXNlclwiXSBhcyBVc2VyO1xyXG5cdFx0aWYgKHZhbHVlW2tleV0gPT09IHVzZXIuaWQpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gc2NoZW1hIFl1cCBzY2hlbWFcclxuICogQHBhcmFtIHN0cmlwRm91bmRcclxuICogQHZhbHVlIHRydWUgLSBzdHJpcCBmaWVsZCBpZiBmb3VuZC5cclxuICogQHZhbHVlIGZhbHNlIC0gc3RyaXAgZmllbGQgaWYgbm90IGZvdW5kLlxyXG4gKiBAcGFyYW0gcm9sZXMgcm9sZXMgdG8gc2VhcmNoLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHN0cmlwRmllbGQgPSA8VCBleHRlbmRzIHl1cC5TY2hlbWE8YW55Pj4oXHJcblx0c2NoZW1hOiBULFxyXG5cdHJvbGVzOiBSb2xlW10sXHJcblx0c3RyaXBGb3VuZDogYm9vbGVhbiA9IGZhbHNlXHJcbik6IHl1cC5MYXp5ID0+IHtcclxuXHRyZXR1cm4geXVwLmxhenk8VD4oKHZhbHVlLCBvcHRpb25zKSA9PiB7XHJcblx0XHRjb25zdCB1c2VyID0gb3B0aW9ucy5jb250ZXh0W1widXNlclwiXSBhcyBVc2VyO1xyXG5cdFx0Y29uc3QgZXhpc3RzID0gcm9sZXMuaW5jbHVkZXModXNlci5yb2xlKTtcclxuXHJcblx0XHRpZiAoZXhpc3RzICYmIHN0cmlwRm91bmQpIHtcclxuXHRcdFx0cmV0dXJuIHl1cC5taXhlZCgpLnN0cmlwKHRydWUpO1xyXG5cdFx0fSBlbHNlIGlmICghZXhpc3RzICYmICFzdHJpcEZvdW5kKSB7XHJcblx0XHRcdHJldHVybiB5dXAubWl4ZWQoKS5zdHJpcCh0cnVlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzY2hlbWE7XHJcblx0fSk7XHJcbn07XHJcbiIsImltcG9ydCAqIGFzIFl1cCBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuaW1wb3J0IHsgVXNlciwgVmVoaWNsZSBhcyBWZWhpY2xlTW9kZWwgfSBmcm9tIFwiLi4vLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IEFQSV9PUEVSQVRJT04gfSBmcm9tIFwiLi5cIjtcclxuaW1wb3J0IHsgVXBkYXRlVmVoaWNsZU9wdGlvbnMsIENyZWF0ZVZlaGljbGVPcHRpb25zIH0gZnJvbSBcIi4uL1ZlaGljbGVcIjtcclxuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi5cIjtcclxuaW1wb3J0IHtcclxuXHRWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRSb2xlLFxyXG5cdEJvb2tpbmdDaGFyZ2VVbml0XHJcbn0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbnR5cGUgVmFsaWRhdG9yUGFyYW1ldGVycyA9IFBhcmFtZXRlcnM8dHlwZW9mIFZlaGljbGUuZ2V0VmFsaWRhdG9yPjtcclxuXHJcbnR5cGUgVmVoaWNsZVZhbGlkYXRvckNvbnRleHRXaXRoU2NoZW1hID0gW1xyXG5cdFZhbGlkYXRvclBhcmFtZXRlcnNbMF0sXHJcblx0QVBJX09QRVJBVElPTixcclxuXHRWZWhpY2xlTW9kZWwsXHJcblx0VXBkYXRlVmVoaWNsZU9wdGlvbnMgfCBDcmVhdGVWZWhpY2xlT3B0aW9ucyxcclxuXHRib29sZWFuLFxyXG5cdFl1cC5PYmplY3RTY2hlbWE8VmVoaWNsZUF0dHJpYnV0ZXM+XHJcbl07XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWZWhpY2xlIHtcclxuXHRwdWJsaWMgc3RhdGljIGdldFZhbGlkYXRvciA9IChcclxuXHRcdHVzZXI6IFVzZXIsXHJcblx0XHRvcGVyYXRpb246IEFQSV9PUEVSQVRJT04sXHJcblx0XHRkYXRhPzoge1xyXG5cdFx0XHR0YXJnZXQ/OiBWZWhpY2xlTW9kZWw7XHJcblx0XHRcdG5ld0RhdGE/OiBVcGRhdGVWZWhpY2xlT3B0aW9ucyB8IENyZWF0ZVZlaGljbGVPcHRpb25zO1xyXG5cdFx0fVxyXG5cdCkgPT4gbmV3IFZhbGlkYXRvcihWZWhpY2xlLnZhbGlkYXRvclNjaGVtYSwgdXNlciwgb3BlcmF0aW9uLCBkYXRhKTtcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgdmFsaWRhdG9yU2NoZW1hID0gWXVwLm9iamVjdDxcclxuXHRcdE9taXQ8VmVoaWNsZUF0dHJpYnV0ZXMsIFwiaWRcIiB8IFwiY3JlYXRlZEF0XCIgfCBcInVwZGF0ZWRBdFwiPlxyXG5cdD4oKVxyXG5cdFx0LnNoYXBlKHtcclxuXHRcdFx0YnJhbmQ6IFl1cC5zdHJpbmcoKSxcclxuXHRcdFx0bW9kZWw6IFl1cC5zdHJpbmcoKSxcclxuXHRcdFx0cGxhdGVOdW1iZXI6IFl1cC5zdHJpbmcoKSxcclxuXHRcdFx0dmluOiBZdXAuc3RyaW5nKCksXHJcblx0XHRcdGRlZmxlZXRlZDogWXVwLmJvb2xlYW4oKSxcclxuXHRcdFx0cGFya2luZ0xvY2F0aW9uOiBZdXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0dmVoaWNsZUltYWdlU3JjOiBZdXAuc3RyaW5nKCkubnVsbGFibGUoKSxcclxuXHRcdFx0Ym9va2luZ0NoYXJnZUNvdW50OiBZdXAubnVtYmVyKCksXHJcblx0XHRcdGJvb2tpbmdDaGFyZ2VVbml0OiBZdXAubWl4ZWQoKVxyXG5cdFx0XHRcdC5vbmVPZihPYmplY3QudmFsdWVzKEJvb2tpbmdDaGFyZ2VVbml0KSlcclxuXHRcdFx0XHQubnVsbGFibGUoKSxcclxuXHRcdFx0Ym9va2luZ0NoYXJnZTogWXVwLm51bWJlcigpLFxyXG5cdFx0XHRjbGllbnRJZDogWXVwLm51bWJlcigpLm51bGxhYmxlKCksXHJcblx0XHRcdGxvY2F0aW9uSWQ6IFl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHR3aWFsb25Vbml0SWQ6IFl1cC5udW1iZXIoKS5udWxsYWJsZSgpLFxyXG5cdFx0XHRhdmFpbGFibGU6IFl1cC5ib29sZWFuKClcclxuXHRcdH0pXHJcblx0XHQud2hlbihcclxuXHRcdFx0W1wiJHVzZXJcIiwgXCIkb3BlcmF0aW9uXCIsIFwiJHRhcmdldFwiLCBcIiRkYXRhXCIsIFwiJGNhc3RpbmdcIl0sXHJcblx0XHRcdCguLi5hcmdzOiBWZWhpY2xlVmFsaWRhdG9yQ29udGV4dFdpdGhTY2hlbWEpID0+IHtcclxuXHRcdFx0XHRsZXQgW3VzZXIsIG9wZXJhdGlvbiwgdGFyZ2V0LCBkYXRhLCBjYXN0aW5nLCBzY2hlbWFdID0gYXJncztcclxuXHJcblx0XHRcdFx0c3dpdGNoIChvcGVyYXRpb24pIHtcclxuXHRcdFx0XHRcdGNhc2UgQVBJX09QRVJBVElPTi5SRUFEOiB7XHJcblx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYS5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IFl1cC5udW1iZXIoKVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIEFQSV9PUEVSQVRJT04uQ1JFQVRFOiB7XHJcblx0XHRcdFx0XHRcdHNjaGVtYSA9IHNjaGVtYVxyXG5cdFx0XHRcdFx0XHRcdC5zaGFwZSh7XHJcblx0XHRcdFx0XHRcdFx0XHRicmFuZDogWXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRtb2RlbDogWXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcblx0XHRcdFx0XHRcdFx0XHRib29raW5nQ2hhcmdlQ291bnQ6IFl1cC5udW1iZXIoKS5kZWZhdWx0KDApLFxyXG5cdFx0XHRcdFx0XHRcdFx0Ym9va2luZ0NoYXJnZTogWXVwLm51bWJlcigpLmRlZmF1bHQoMClcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC50ZXN0KFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJwZXJtaXNzaW9uXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIllvdSBkbyBub3QgaGF2ZSB0aGUgcGVybWlzc2lvbiB0byBkbyB0aGlzLlwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB1c2VyLnJvbGUgPT09IFJvbGUuTUFTVEVSO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2FzZSBBUElfT1BFUkFUSU9OLlVQREFURToge1xyXG5cdFx0XHRcdFx0XHRzY2hlbWEgPSBzY2hlbWFcclxuXHRcdFx0XHRcdFx0XHQuc2hhcGUoeyBpZDogWXVwLm51bWJlcigpLnJlcXVpcmVkKCkgfSlcclxuXHRcdFx0XHRcdFx0XHQudGVzdChcclxuXHRcdFx0XHRcdFx0XHRcdFwicGVybWlzc2lvblwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCJZb3UgZG8gbm90IGhhdmUgdGhlIHBlcm1pc3Npb24gdG8gZG8gdGhpcy5cIixcclxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5BRE1JTiB8fFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXIucm9sZSA9PT0gUm9sZS5LRVlfTUFOQUdFUlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFyZ2V0LmNsaWVudElkID09PSB1c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBzY2hlbWE7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBpRXhjZXB0aW9uLCBGb3JtRXhjZXB0aW9uIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnNcIjtcclxuaW1wb3J0IHsgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24gfSBmcm9tIFwiLi4vZXhjZXB0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwaUVycm9ySGFuZGxlciB7XHJcblx0Y29uc3RydWN0b3IoZTogRXJyb3IpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiQXBpRXJyb3JIYW5kbGVyXCIsIGUpO1xyXG5cdFx0aWYgKGUgaW5zdGFuY2VvZiBGb3JtRXhjZXB0aW9uKSB7XHJcblx0XHRcdC8vIEFkZCBmaWVsZHMgdG8gZXJyb3JzXHJcblx0XHRcdGZvciAoY29uc3QgZXJyb3Igb2YgZS5maWVsZHMpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImVycm9yIGZpZWxkc1wiLGVycm9yKTtcclxuXHRcdFx0XHRpZiAoZXJyb3IubmFtZSA9PT0gXCJwZXJtaXNzaW9uXCIpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbihlcnJvci5tZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhyb3cgZTtcclxuXHRcdH1cclxuXHRcdC8vIFVua25vd24gZXJyb3IuXHJcblx0XHR0aHJvdyBuZXcgQXBpRXhjZXB0aW9uKFwiQW4gdW5rbm93biBlcnJvciBoYXMgb2NjdXJyZWQuXCIpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBGaWVsZEVycm9yLCBGb3JtRXhjZXB0aW9uIH0gZnJvbSBcIi4uL2V4Y2VwdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtRXJyb3JCdWlsZGVyIHtcclxuXHRwdWJsaWMgZmllbGRzOiBGaWVsZEVycm9yW10gPSBbXTtcclxuXHJcblx0cHVibGljIGFkZCA9IChmaWVsZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0dGhpcy5maWVsZHMucHVzaCh7IGZpZWxkLCBtZXNzYWdlLCBuYW1lIH0pO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0cHVibGljIGFkZElmID0gKFxyXG5cdFx0Y29uZGl0aW9uOiBib29sZWFuLFxyXG5cdFx0ZmllbGQ6IHN0cmluZyxcclxuXHRcdG1lc3NhZ2U6IHN0cmluZyxcclxuXHRcdG5hbWU6IHN0cmluZ1xyXG5cdCkgPT4ge1xyXG5cdFx0aWYgKGNvbmRpdGlvbikge1xyXG5cdFx0XHR0aGlzLmFkZChmaWVsZCwgbWVzc2FnZSwgbmFtZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgdGhyb3cobWVzc2FnZTogc3RyaW5nID0gXCJBbiBlcnJvciBoYXMgb2NjdXJlZCBpbiBvbmUgb2YgdGhlIGZpZWxkcy5cIikge1xyXG5cdFx0aWYgKHRoaXMuZmllbGRzLmxlbmd0aCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRm9ybUV4Y2VwdGlvbihtZXNzYWdlLCB0aGlzLmZpZWxkcyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IE9wLCBGaW5kT3B0aW9ucyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBWZWhpY2xlIGFzIFZlaGljbGVNb2RlbCwgVXNlciwgQm9va2luZywgQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFZlaGljbGVBdHRyaWJ1dGVzLCBCb29raW5nU3RhdHVzLCBSb2xlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7IGdldEJvb2tpbmdTdGF0dXMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgSW52YWxpZFBlcm1pc3Npb25FeGNlcHRpb24gfSBmcm9tIFwiLi9leGNlcHRpb25zXCI7XHJcbmltcG9ydCB7IFZlaGljbGUgYXMgVmVoaWNsZVZhbGlkYXRvcnMgfSBmcm9tIFwiLi92YWxpZGF0b3JzXCI7XHJcbmltcG9ydCB7IEFwaUVycm9ySGFuZGxlciB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IFVzZVBhcmFtZXRlcnMsIENvbGxlY3Rpb24sIENhc3RhYmxlLCBBUElfT1BFUkFUSU9OIH0gZnJvbSBcIi5cIjtcclxuXHJcbmV4cG9ydCB0eXBlIENyZWF0ZVZlaGljbGVPcHRpb25zID0gVXNlUGFyYW1ldGVyczxcclxuXHRWZWhpY2xlQXR0cmlidXRlcyxcclxuXHRcImJyYW5kXCIgfCBcIm1vZGVsXCIgfCBcInZpblwiLFxyXG5cdHwgXCJwbGF0ZU51bWJlclwiXHJcblx0fCBcImRlZmxlZXRlZFwiXHJcblx0fCBcInBhcmtpbmdMb2NhdGlvblwiXHJcblx0fCBcInZlaGljbGVJbWFnZVNyY1wiXHJcblx0fCBcImJvb2tpbmdDaGFyZ2VDb3VudFwiXHJcblx0fCBcImJvb2tpbmdDaGFyZ2VcIlxyXG5cdHwgXCJ3aWFsb25Vbml0SWRcIlxyXG5cdHwgXCJib29raW5nQ2hhcmdlVW5pdFwiXHJcblx0fCBcImNsaWVudElkXCJcclxuXHR8IFwibG9jYXRpb25JZFwiXHJcbj47XHJcblxyXG5leHBvcnQgdHlwZSBVcGRhdGVWZWhpY2xlT3B0aW9ucyA9IFVzZVBhcmFtZXRlcnM8XHJcblx0VmVoaWNsZUF0dHJpYnV0ZXMsXHJcblx0XCJicmFuZFwiIHwgXCJtb2RlbFwiIHwgXCJ2aW5cIixcclxuXHR8IFwicGxhdGVOdW1iZXJcIlxyXG5cdHwgXCJkZWZsZWV0ZWRcIlxyXG5cdHwgXCJwYXJraW5nTG9jYXRpb25cIlxyXG5cdHwgXCJ2ZWhpY2xlSW1hZ2VTcmNcIlxyXG5cdHwgXCJib29raW5nQ2hhcmdlQ291bnRcIlxyXG5cdHwgXCJib29raW5nQ2hhcmdlXCJcclxuXHR8IFwid2lhbG9uVW5pdElkXCJcclxuXHR8IFwiYm9va2luZ0NoYXJnZVVuaXRcIlxyXG5cdHwgXCJjbGllbnRJZFwiXHJcblx0fCBcImxvY2F0aW9uSWRcIlxyXG4+O1xyXG5leHBvcnQgY2xhc3MgVmVoaWNsZSBpbXBsZW1lbnRzIENhc3RhYmxlPFBhcnRpYWw8VmVoaWNsZUF0dHJpYnV0ZXM+PiB7XHJcblx0cHJpdmF0ZSBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0YTogVmVoaWNsZU1vZGVsKSB7fVxyXG5cclxuXHRwdWJsaWMgY2FzdCA9ICh1c2VyOiBVc2VyKSA9PlxyXG5cdFx0VmVoaWNsZVZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKHVzZXIsIEFQSV9PUEVSQVRJT04uUkVBRCkuY2FzdCh0aGlzLmRhdGEpO1xyXG5cclxuXHRwdWJsaWMgYXZhaWxhYmxlRm9yQm9va2luZyA9IGFzeW5jIChcclxuXHRcdGZyb206IG51bWJlcixcclxuXHRcdHRvOiBudW1iZXIsXHJcblx0XHRib29raW5nczogQm9va2luZ1tdXHJcblx0KSA9PiB7XHJcblx0XHRpZiAodGhpcy5kYXRhLmRlZmxlZXRlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgdmVoaWNsZUJvb2tpbmdzID0gYm9va2luZ3MgfHwgKGF3YWl0IHRoaXMuZGF0YS4kZ2V0KFwiYm9va2luZ3NcIikpO1xyXG5cclxuXHRcdGZvciAoY29uc3QgYm9va2luZyBvZiB2ZWhpY2xlQm9va2luZ3MpIHtcclxuXHRcdFx0Y29uc3Qgc3RhdHVzID0gZ2V0Qm9va2luZ1N0YXR1cyh7XHJcblx0XHRcdFx0ZnJvbSxcclxuXHRcdFx0XHR0byxcclxuXHRcdFx0XHRhcHByb3ZlZDogYm9va2luZy5hcHByb3ZlZFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHN0YXR1cyA9PT0gQm9va2luZ1N0YXR1cy5QRU5ESU5HIHx8XHJcblx0XHRcdFx0c3RhdHVzID09PSBCb29raW5nU3RhdHVzLkFQUFJPVkVEIHx8XHJcblx0XHRcdFx0c3RhdHVzID09PSBCb29raW5nU3RhdHVzLk9OR09JTkdcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fTtcclxuXHJcblx0cHVibGljIHN0YXRpYyBnZXQgPSBhc3luYyAodXNlcjogVXNlciwgaWQ6IG51bWJlcikgPT4ge1xyXG5cdFx0Y29uc3QgdmVoaWNsZSA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQnlQayhpZCk7XHJcblxyXG5cdFx0aWYgKHVzZXIucm9sZSA9PT0gUm9sZS5NQVNURVIpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBWZWhpY2xlKHZlaGljbGUpO1xyXG5cdFx0fSBlbHNlIGlmICh1c2VyLmNsaWVudElkID09PSB2ZWhpY2xlLmNsaWVudElkKSB7XHJcblx0XHRcdHJldHVybiBuZXcgVmVoaWNsZSh2ZWhpY2xlKTtcclxuXHRcdH1cclxuXHRcdHRocm93IG5ldyBJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvbihcIllvdSBjYW5ub3QgYWNjZXNzIHRoaXMgdmVoaWNsZS5cIik7XHJcblx0fTtcclxuXHJcblx0cHVibGljIHVwZGF0ZSA9IGFzeW5jICh1c2VyOiBVc2VyLCBvcHRpb25zOiBVcGRhdGVWZWhpY2xlT3B0aW9ucykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YXdhaXQgVmVoaWNsZVZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKHVzZXIsIEFQSV9PUEVSQVRJT04uVVBEQVRFLCB7XHJcblx0XHRcdFx0bmV3RGF0YTogb3B0aW9ucyxcclxuXHRcdFx0XHR0YXJnZXQ6IHRoaXMuZGF0YVxyXG5cdFx0XHR9KS52YWxpZGF0ZShvcHRpb25zKTtcclxuXHJcblx0XHRcdGNvbnN0IHZlaGljbGVPcHRpb25zID0gVmVoaWNsZVZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKFxyXG5cdFx0XHRcdHVzZXIsXHJcblx0XHRcdFx0QVBJX09QRVJBVElPTi5VUERBVEUsXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmV3RGF0YTogb3B0aW9ucyxcclxuXHRcdFx0XHRcdHRhcmdldDogdGhpcy5kYXRhXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpLmNhc3Qob3B0aW9ucyk7XHJcblxyXG5cdFx0XHRhd2FpdCB0aGlzLmRhdGEudXBkYXRlKHZlaGljbGVPcHRpb25zKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0bmV3IEFwaUVycm9ySGFuZGxlcihlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgc3RhdGljIGNyZWF0ZSA9IGFzeW5jICh1c2VyOiBVc2VyLCBvcHRpb25zOiBDcmVhdGVWZWhpY2xlT3B0aW9ucykgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YXdhaXQgVmVoaWNsZVZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKHVzZXIsIEFQSV9PUEVSQVRJT04uQ1JFQVRFLCB7XHJcblx0XHRcdFx0bmV3RGF0YTogb3B0aW9uc1xyXG5cdFx0XHR9KS52YWxpZGF0ZShvcHRpb25zKTtcclxuXHJcblx0XHRcdGNvbnN0IHZlaGljbGVPcHRpb25zID0gYXdhaXQgVmVoaWNsZVZhbGlkYXRvcnMuZ2V0VmFsaWRhdG9yKFxyXG5cdFx0XHRcdHVzZXIsXHJcblx0XHRcdFx0QVBJX09QRVJBVElPTi5DUkVBVEUsXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmV3RGF0YTogb3B0aW9uc1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0KS5jYXN0KG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0Y29uc3QgY3JlYXRlZFZlaGljbGUgPSBhd2FpdCBWZWhpY2xlTW9kZWwuY3JlYXRlKHZlaGljbGVPcHRpb25zKTtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgQm9va2luZyhjcmVhdGVkVmVoaWNsZSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdG5ldyBBcGlFcnJvckhhbmRsZXIoZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cHVibGljIHN0YXRpYyBnZXRBbGwgPSBhc3luYyAoXHJcblx0XHR1c2VyOiBVc2VyLFxyXG5cdFx0b3B0aW9ucz86IHsgZnJvbTogRGF0ZTsgdG86IERhdGUgfVxyXG5cdCkgPT4ge1xyXG5cdFx0bGV0IHZlaGljbGVzOiBWZWhpY2xlTW9kZWxbXSA9IFtdO1xyXG5cdFx0Y29uc3QgYmFzZUZpbmRPcHRpb25zOiBGaW5kT3B0aW9ucyA9XHJcblx0XHRcdG9wdGlvbnM/LmZyb20gJiYgb3B0aW9ucz8udG9cclxuXHRcdFx0XHQ/IHtcclxuXHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRcIiRib29raW5ncy52ZWhpY2xlSWQkXCI6IG51bGxcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0aW5jbHVkZTogW1xyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdG1vZGVsOiBCb29raW5nLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIGludGVydmFscyBkb2VzIG5vdCBpbnRlcnNlY3Qgd2l0aCBvdGhlciBib29raW5ncy5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dG86IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRbT3AubHRlXTogb3B0aW9ucy50b1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRmcm9tOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0W09wLmd0ZV06IG9wdGlvbnMuZnJvbVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0ICB9XHJcblx0XHRcdFx0OiB7fTtcclxuXHJcblx0XHRpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0XHR2ZWhpY2xlcyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQWxsKGJhc2VGaW5kT3B0aW9ucyk7XHJcblx0XHR9IGVsc2UgaWYgKHVzZXIucm9sZSA9PT0gUm9sZS5HVUVTVCkge1xyXG5cdFx0XHQvLyBHZXQgb25seSBhdmFpbGFibGUgdmVoaWNsZXMgaW4gdGhlIHNhbWUgY2xpZW50LlxyXG5cdFx0XHQvLyBPbmx5IHZlaGljbGVzIHdoaWNoIGhhdmUgdGhlIHNhbWUgY2F0ZWdvcmllcyBhcyB0aGUgdXNlci5cclxuXHRcdFx0Y29uc3QgdXNlckNhdGVnb3JpZXMgPSBhd2FpdCB1c2VyLiRnZXQoXCJjYXRlZ29yaWVzXCIpO1xyXG5cclxuXHRcdFx0Ly8gR2V0IGFsbCB2ZWhpY2xlcyBpbiB0aGUgY2xpZW50IGlmIHVzZXIgZG9lcyBub3QgY29udGFpbiBhIGNhdGVnb3J5LlxyXG5cdFx0XHRpZiAoIXVzZXJDYXRlZ29yaWVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHZlaGljbGVzID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRBbGwoXHJcblx0XHRcdFx0XHRfLm1lcmdlKFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRcdGNsaWVudElkOiB1c2VyLmNsaWVudElkXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRiYXNlRmluZE9wdGlvbnNcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZlaGljbGVzID0gYXdhaXQgVmVoaWNsZU1vZGVsLmZpbmRBbGwoXHJcblx0XHRcdFx0XHRfLm1lcmdlKFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRcdGNsaWVudElkOiB1c2VyLmNsaWVudElkXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRpbmNsdWRlOiBbXHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG1vZGVsOiBDYXRlZ29yeSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0d2hlcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZDogeyBbT3AuaW5dOiB1c2VyQ2F0ZWdvcmllcy5tYXAoYyA9PiBjLmlkKSB9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRdXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdGJhc2VGaW5kT3B0aW9uc1xyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAodXNlci5jbGllbnRJZCkge1xyXG5cdFx0XHR2ZWhpY2xlcyA9IGF3YWl0IFZlaGljbGVNb2RlbC5maW5kQWxsKFxyXG5cdFx0XHRcdF8ubWVyZ2UoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0Y2xpZW50SWQ6IHVzZXIuY2xpZW50SWRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGJhc2VGaW5kT3B0aW9uc1xyXG5cdFx0XHRcdClcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IENvbGxlY3Rpb248UGFydGlhbDxWZWhpY2xlQXR0cmlidXRlcz4sIFZlaGljbGU+KFxyXG5cdFx0XHR2ZWhpY2xlcy5tYXAodiA9PiBuZXcgVmVoaWNsZSh2KSlcclxuXHRcdCk7XHJcblx0fTtcclxufVxyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IHsgQm9va2luZywgQm9va2luZ0NyZWF0ZU9wdGlvbnMsIEJvb2tpbmdVcGRhdGVPcHRpb25zIH0gZnJvbSBcIi4uL2FwaVwiO1xyXG5pbXBvcnQgeyBCb29raW5nQXR0cmlidXRlcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdHlwaW5nc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIudXNlKHJlcXVpcmVMb2dpbik7XHJcblxyXG5yb3V0ZXIuZ2V0PHVuZGVmaW5lZCwgUmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+W10+LCB1bmRlZmluZWQ+KFxyXG5cdFwiL1wiLFxyXG5cdGFzeW5jICh7IHVzZXIgfSwgcmVzKSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz5bXT4oKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGZvdW5kQm9va2luZ3MgPSBhd2FpdCBCb29raW5nLmdldEFsbCh1c2VyKTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0XHRgRm91bmQgJHtmb3VuZEJvb2tpbmdzLmRhdGEubGVuZ3RofSBib29raW5ncy5gLFxyXG5cdFx0XHRcdHJlc1xyXG5cdFx0XHQpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKGZvdW5kQm9va2luZ3MuY2FzdCh1c2VyKSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdH1cclxuKTtcclxuXHJcbnJvdXRlci5wb3N0PFxyXG5cdHVuZGVmaW5lZCxcclxuXHRSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+LFxyXG5cdEJvb2tpbmdDcmVhdGVPcHRpb25zXHJcbj4oXCIvXCIsIGFzeW5jICh7IHVzZXIsIGJvZHkgfSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PigpO1xyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBjcmVhdGVkQm9va2luZyA9IGF3YWl0IEJvb2tpbmcuY3JlYXRlKHVzZXIsIGJvZHkpO1xyXG5cclxuXHRcdGNyZWF0ZWRCb29raW5nLnNldEVtYWlsTm90aWZpY2F0aW9uc1RvQm9va2luZ01hbmFnZXJzKCk7XHJcblxyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShjcmVhdGVkQm9va2luZy5jYXN0KHVzZXIpKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXCJCb29raW5nIGhhcyBiZWVuIGNyZWF0ZWQuXCIsIHJlcyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHR9XHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQ8XHJcblx0eyBpZDogc3RyaW5nIH0sXHJcblx0UmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PixcclxuXHR1bmRlZmluZWRcclxuPihcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PigpO1xyXG5cdHRyeSB7XHJcblx0XHRsZXQgZm91bmRCb29raW5nID0gYXdhaXQgQm9va2luZy5nZXQodXNlciwgcGFyYW1zLmlkKTtcclxuXHRcdHJlc3BvbnNlLnNldERhdGEoZm91bmRCb29raW5nLmNhc3QodXNlcikpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgQm9va2luZyB3aXRoIElEIG9mICR7cGFyYW1zLmlkfSBmb3VuZC5gLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIucGF0Y2g8XHJcblx0eyBpZDogc3RyaW5nIH0sXHJcblx0UmVzcG9uc2VCdWlsZGVyPFBhcnRpYWw8Qm9va2luZ0F0dHJpYnV0ZXM+PixcclxuXHRCb29raW5nVXBkYXRlT3B0aW9uc1xyXG4+KFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMsIGJvZHkgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXI8UGFydGlhbDxCb29raW5nQXR0cmlidXRlcz4+KCk7XHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGJvb2tpbmdQcmV2aW91c1ZhbHVlID0gYXdhaXQgQm9va2luZy5nZXQodXNlciwgcGFyYW1zLmlkKTtcclxuXHRcdGNvbnN0IHVwZGF0ZWRCb29raW5nID0gYXdhaXQgYm9va2luZ1ByZXZpb3VzVmFsdWUudXBkYXRlKHVzZXIsIGJvZHkpO1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0Ym9keS5hbW91bnQgIT09IHVuZGVmaW5lZCAmJlxyXG5cdFx0XHRib2R5LmFtb3VudCAhPT0gbnVsbCAmJlxyXG5cdFx0XHRib29raW5nUHJldmlvdXNWYWx1ZS5kYXRhLmFtb3VudCA9PT0gbnVsbFxyXG5cdFx0KSB7XHJcblx0XHRcdHVwZGF0ZWRCb29raW5nLnNlbmRJbnZvaWNlKGJvZHkuYW1vdW50KTtcclxuXHRcdH1cclxuXHRcdGlmIChib2R5LmFwcHJvdmVkID09PSB0cnVlICYmIGJvb2tpbmdQcmV2aW91c1ZhbHVlLmRhdGEuYXBwcm92ZWQgPT09IG51bGwpIHtcclxuXHRcdFx0dXBkYXRlZEJvb2tpbmcuc2VuZEJvb2tpbmdDb25maXJtYXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHVwZGF0ZWRCb29raW5nLmNhc3QodXNlcikpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkJvb2tpbmcgaGFzIGJlZW4gdXBkYXRlZFwiLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZGVsZXRlPFxyXG5cdHsgaWQ6IHN0cmluZyB9LFxyXG5cdFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPj4sXHJcblx0dW5kZWZpbmVkXHJcbj4oXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxQYXJ0aWFsPEJvb2tpbmdBdHRyaWJ1dGVzPj4oKTtcclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgZm91bmRCb29raW5nID0gYXdhaXQgQm9va2luZy5nZXQodXNlciwgcGFyYW1zLmlkKTtcclxuXHRcdGF3YWl0IGZvdW5kQm9va2luZy5kZXN0cm95KHVzZXIpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZEJvb2tpbmcuY2FzdCh1c2VyKSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRgQm9va2luZyB3aXRoIElEICR7cGFyYW1zLmlkfSBoYXMgYmVlbiBkZWxldGVkLmAsXHJcblx0XHRcdHJlc1xyXG5cdFx0KTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IGRpc2FsbG93R3Vlc3RzIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kaXNhbGxvd0d1ZXN0c1wiO1xyXG5pbXBvcnQgcGFyc2VCb2R5IGZyb20gXCIuLi9taWRkbGV3YXJlcy9wYXJzZUJvZHlcIjtcclxuaW1wb3J0IGRlbGV0ZUZpbGVPbkVycm9yIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kZWxldGVGaWxlT25FcnJvclwiO1xyXG5pbXBvcnQge1xyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXMsXHJcblx0YWRkUmVwbGFjZWRGaWxlc1xyXG59IGZyb20gXCIuLi9taWRkbGV3YXJlcy9kZWxldGVSZXBsYWNlZEZpbGVzXCI7XHJcbmltcG9ydCB1cGxvYWQgZnJvbSBcIi4uL21pZGRsZXdhcmVzL211bHRlclVwbG9hZFwiO1xyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBnZXRGaWxlVVJMLCBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiLi4vZGF0YXNvdXJjZVwiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxucm91dGVyLnVzZShyZXF1aXJlTG9naW4pO1xyXG5cclxucm91dGVyLmdldChcIi9cIiwgYXN5bmMgKHsgdXNlciB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IExvY2F0aW9uRGF0YVNvdXJjZSA9IG5ldyBMb2NhdGlvbihkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBsb2NhdGlvbnMgPSBhd2FpdCBMb2NhdGlvbkRhdGFTb3VyY2UuZ2V0QWxsKCk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKGxvY2F0aW9ucyk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBGb3VuZCAke2xvY2F0aW9ucy5sZW5ndGh9IGxvY2F0aW9ucy4gYCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFxyXG5cdFwiL1wiLFxyXG5cdHVwbG9hZChcImNhcmJvb2tpbmcvbWVkaWEvbG9jYXRpb25zXCIpLnNpbmdsZShcImxvY2F0aW9uSW1hZ2VTcmNcIiksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGRpc2FsbG93R3Vlc3RzLFxyXG5cdGFzeW5jICh7IHVzZXIsIGJvZHkgfSwgcmVzKSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IExvY2F0aW9uRGF0YVNvdXJjZSA9IG5ldyBMb2NhdGlvbihkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgY3JlYXRlZExvY2F0aW9uID0gYXdhaXQgTG9jYXRpb25EYXRhU291cmNlLmNyZWF0ZShib2R5KTtcclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YShjcmVhdGVkTG9jYXRpb24pO1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiTG9jYXRpb24gaGFzIGJlZW4gY3JlYXRlZC5cIiwgcmVzKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlRXJyb3IoZSwgcmVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXMuanNvbihyZXNwb25zZSk7XHJcblx0fSxcclxuXHRkZWxldGVGaWxlT25FcnJvclxyXG4pO1xyXG5cclxucm91dGVyLmdldChcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgTG9jYXRpb25EYXRhU291cmNlID0gbmV3IExvY2F0aW9uKGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGxldCBmb3VuZExvY2F0aW9uID0gYXdhaXQgTG9jYXRpb25EYXRhU291cmNlLmdldChwYXJhbXMuaWQpO1xyXG5cclxuXHRcdHJlc3BvbnNlLnNldERhdGEoZm91bmRMb2NhdGlvbi5nZXQoeyBwbGFpbjogdHJ1ZSB9KSk7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFxyXG5cdFx0XHRgRm91bmQgbG9jYXRpb24gd2l0aCBJRCBvZiAke2ZvdW5kTG9jYXRpb24uaWR9YCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBhdGNoKFxyXG5cdFwiLzppZFwiLFxyXG5cdHVwbG9hZChcImNhcmJvb2tpbmcvbWVkaWEvbG9jYXRpb25zXCIpLnNpbmdsZShcImxvY2F0aW9uSW1hZ2VTcmNcIiksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGRpc2FsbG93R3Vlc3RzLFxyXG5cdGFzeW5jICh7IHVzZXIsIHBhcmFtcywgYm9keSwgZmlsZSA9IHt9IH0sIHJlcykgPT4ge1xyXG5cdFx0Y29uc3QgZmlsZUxvY2F0aW9uID1cclxuXHRcdFx0ZmlsZSAmJlxyXG5cdFx0XHRmaWxlLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXCJjYXJib29raW5nL21lZGlhL3VzZXJzL3Byb2ZpbGVcIiwgZmlsZS5maWxlbmFtZSk7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IExvY2F0aW9uRGF0YVNvdXJjZSA9IG5ldyBMb2NhdGlvbihkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgdXBkYXRlZExvY2F0aW9uID0gYXdhaXQgTG9jYXRpb25EYXRhU291cmNlLnVwZGF0ZShwYXJhbXMuaWQsIGJvZHkpO1xyXG5cdFx0XHRmaWxlTG9jYXRpb24gJiZcclxuXHRcdFx0XHRhZGRSZXBsYWNlZEZpbGVzKHJlcywge1xyXG5cdFx0XHRcdFx0dXJsOiB1cGRhdGVkTG9jYXRpb24ubG9jYXRpb25JbWFnZVNyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5Mb2NhdGlvbixcclxuXHRcdFx0XHRcdGZpZWxkOiBcImxvY2F0aW9uSW1hZ2VTcmNcIlxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmVzcG9uc2Uuc2V0RGF0YSh1cGRhdGVkTG9jYXRpb24uZ2V0KHsgcGxhaW46IHRydWUgfSkpO1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKGBMb2NhdGlvbiB3aXRoIElEICR7cGFyYW1zLmlkfSB1cGRhdGVkLmAsIHJlcyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdH0sXHJcblxyXG5cdGRlbGV0ZUZpbGVPbkVycm9yLFxyXG5cdGRlbGV0ZVJlcGxhY2VkRmlsZXNcclxuKTtcclxuXHJcbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBMb2NhdGlvbkRhdGFTb3VyY2UgPSBuZXcgTG9jYXRpb24oZGIsIHVzZXIpO1xyXG5cdHRyeSB7XHJcblx0XHRsZXQgZGVsZXRlZExvY2F0aW9uID0gYXdhaXQgTG9jYXRpb25EYXRhU291cmNlLmRlbGV0ZShwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShkZWxldGVkTG9jYXRpb24uZ2V0KHsgcGxhaW46IHRydWUgfSkpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0YExvY2F0aW9uIHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIGRlbGV0ZWQuYCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcblxyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IHtcclxuXHRkZWxldGVSZXBsYWNlZEZpbGVzLFxyXG5cdGFkZFJlcGxhY2VkRmlsZXNcclxufSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlUmVwbGFjZWRGaWxlc1wiO1xyXG5pbXBvcnQgcGFyc2VCb2R5IGZyb20gXCIuLi9taWRkbGV3YXJlcy9wYXJzZUJvZHlcIjtcclxuaW1wb3J0IHVwbG9hZCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvbXVsdGVyVXBsb2FkXCI7XHJcbmltcG9ydCBkZWxldGVGaWxlT25FcnJvciBmcm9tIFwiLi4vbWlkZGxld2FyZXMvZGVsZXRlRmlsZU9uRXJyb3JcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyLCBnZXRGaWxlVVJMIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IEFjY2lkZW50IH0gZnJvbSBcIi4uL2RhdGFzb3VyY2VcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbnJvdXRlci51c2UocmVxdWlyZUxvZ2luKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIGFzeW5jICh7IHVzZXIgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBBY2NpZGVudERhdGFTb3VyY2UgPSBuZXcgQWNjaWRlbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgYWNjaWRlbnRzID0gYXdhaXQgQWNjaWRlbnREYXRhU291cmNlLmdldEFsbCgpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShhY2NpZGVudHMpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHthY2NpZGVudHMubGVuZ3RofSBhY2NpZGVudHMuYCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KFxyXG5cdFwiL1wiLFxyXG5cdHVwbG9hZChcImNhcmJvb2tpbmcvbWVkaWEvYWNjaWRlbnRzXCIpLmZpZWxkcyhbXHJcblx0XHR7IG5hbWU6IFwiYWNjaWRlbnRJbWFnZVNyY1wiIH0sXHJcblx0XHR7IG5hbWU6IFwiYWNjaWRlbnRWaWRlb1NyY1wiIH1cclxuXHRdKSxcclxuXHRwYXJzZUJvZHksXHJcblx0YXN5bmMgKHsgdXNlciwgYm9keSwgZmlsZXMgfSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IEFjY2lkZW50RGF0YVNvdXJjZSA9IG5ldyBBY2NpZGVudChkYiwgdXNlcik7XHJcblx0XHRjb25zdCBhY2NpZGVudEltYWdlU3JjID1cclxuXHRcdFx0ZmlsZXMgJiZcclxuXHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyYyAmJlxyXG5cdFx0XHRmaWxlcy5hY2NpZGVudEltYWdlU3JjWzBdICYmXHJcblx0XHRcdGZpbGVzLmFjY2lkZW50SW1hZ2VTcmNbMF0uZmlsZW5hbWUgJiZcclxuXHRcdFx0Z2V0RmlsZVVSTChcclxuXHRcdFx0XHRcImNhcmJvb2tpbmcvbWVkaWEvYWNjaWRlbnRzXCIsXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyY1swXS5maWxlbmFtZVxyXG5cdFx0XHQpO1xyXG5cdFx0Y29uc3QgYWNjaWRlbnRWaWRlb1NyYyA9XHJcblx0XHRcdGZpbGVzICYmXHJcblx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmMgJiZcclxuXHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyY1swXSAmJlxyXG5cdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjWzBdLmZpbGVuYW1lICYmXHJcblx0XHRcdGdldEZpbGVVUkwoXHJcblx0XHRcdFx0XCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiLFxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0uZmlsZW5hbWVcclxuXHRcdFx0KTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBjcmVhdGVkQWNjaWRlbnQgPSBhd2FpdCBBY2NpZGVudERhdGFTb3VyY2UuY3JlYXRlKHtcclxuXHRcdFx0XHQuLi5ib2R5LFxyXG5cdFx0XHRcdGFjY2lkZW50SW1hZ2VTcmMsXHJcblx0XHRcdFx0YWNjaWRlbnRWaWRlb1NyY1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoY3JlYXRlZEFjY2lkZW50KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcIkFjY2lkZW50IGhhcyBiZWVuIGNyZWF0ZWQuXCIsIHJlcyk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3JcclxuKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IEFjY2lkZW50RGF0YVNvdXJjZSA9IG5ldyBBY2NpZGVudChkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBmb3VuZEFjY2lkZW50ID0gYXdhaXQgQWNjaWRlbnREYXRhU291cmNlLmdldChwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZEFjY2lkZW50LmdldCh7IHBsYWluOiB0cnVlIH0pKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kIGFjY2lkZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9YCwgcmVzKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5wYXRjaChcclxuXHRcIi86aWRcIixcclxuXHR1cGxvYWQoXCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiKS5maWVsZHMoW1xyXG5cdFx0eyBuYW1lOiBcImFjY2lkZW50SW1hZ2VTcmNcIiB9LFxyXG5cdFx0eyBuYW1lOiBcImFjY2lkZW50VmlkZW9TcmNcIiB9XHJcblx0XSksXHJcblx0cGFyc2VCb2R5LFxyXG5cdGFzeW5jICh7IHVzZXIsIHBhcmFtcywgYm9keSwgZmlsZXMgfSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRcdGNvbnN0IEFjY2lkZW50RGF0YVNvdXJjZSA9IG5ldyBBY2NpZGVudChkYiwgdXNlcik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgYWNjaWRlbnRJbWFnZVNyYyA9XHJcblx0XHRcdFx0ZmlsZXMgJiZcclxuXHRcdFx0XHRmaWxlcy5hY2NpZGVudEltYWdlU3JjICYmXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRJbWFnZVNyY1swXSAmJlxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50SW1hZ2VTcmNbMF0uZmlsZW5hbWUgJiZcclxuXHRcdFx0XHRnZXRGaWxlVVJMKFxyXG5cdFx0XHRcdFx0XCJjYXJib29raW5nL21lZGlhL2FjY2lkZW50c1wiLFxyXG5cdFx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyY1swXS5maWxlbmFtZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdGNvbnN0IGFjY2lkZW50VmlkZW9TcmMgPVxyXG5cdFx0XHRcdGZpbGVzICYmXHJcblx0XHRcdFx0ZmlsZXMuYWNjaWRlbnRWaWRlb1NyYyAmJlxyXG5cdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0gJiZcclxuXHRcdFx0XHRmaWxlcy5hY2NpZGVudFZpZGVvU3JjWzBdLmZpbGVuYW1lICYmXHJcblx0XHRcdFx0Z2V0RmlsZVVSTChcclxuXHRcdFx0XHRcdFwiY2FyYm9va2luZy9tZWRpYS9hY2NpZGVudHNcIixcclxuXHRcdFx0XHRcdGZpbGVzLmFjY2lkZW50VmlkZW9TcmNbMF0uZmlsZW5hbWVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRjb25zdCBbcHJldmlvdXNWYWx1ZSwgdXBkYXRlZEFjY2lkZW50XSA9IGF3YWl0IEFjY2lkZW50RGF0YVNvdXJjZS51cGRhdGUoXHJcblx0XHRcdFx0cGFyYW1zLmlkLFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC4uLmJvZHksXHJcblx0XHRcdFx0XHRhY2NpZGVudEltYWdlU3JjLFxyXG5cdFx0XHRcdFx0YWNjaWRlbnRWaWRlb1NyY1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdFx0YWNjaWRlbnRJbWFnZVNyYyAmJlxyXG5cdFx0XHRcdGFkZFJlcGxhY2VkRmlsZXMocmVzLCB7XHJcblx0XHRcdFx0XHR1cmw6IHByZXZpb3VzVmFsdWUuYWNjaWRlbnRJbWFnZVNyYyxcclxuXHRcdFx0XHRcdG1vZGVsOiBkYi5BY2NpZGVudCxcclxuXHRcdFx0XHRcdGZpZWxkOiBcImFjY2lkZW50SW1hZ2VTcmNcIlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRhY2NpZGVudFZpZGVvU3JjICYmXHJcblx0XHRcdFx0YWRkUmVwbGFjZWRGaWxlcyhyZXMsIHtcclxuXHRcdFx0XHRcdHVybDogcHJldmlvdXNWYWx1ZS5hY2NpZGVudFZpZGVvU3JjLFxyXG5cdFx0XHRcdFx0bW9kZWw6IGRiLkFjY2lkZW50LFxyXG5cdFx0XHRcdFx0ZmllbGQ6IFwiYWNjaWRlbnRWaWRlb1NyY1wiXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEodXBkYXRlZEFjY2lkZW50KTtcclxuXHRcdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0XHRgQWNjaWRlbnQgd2l0aCBJRCAke3BhcmFtcy5pZH0gaGFzIGJlZW4gdXBkYXRlZC5gLFxyXG5cdFx0XHRcdHJlc1xyXG5cdFx0XHQpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdFx0fVxyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0sXHJcblx0ZGVsZXRlRmlsZU9uRXJyb3IsXHJcblx0ZGVsZXRlUmVwbGFjZWRGaWxlc1xyXG4pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzLCBuZXh0KSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQWNjaWRlbnREYXRhU291cmNlID0gbmV3IEFjY2lkZW50KGRiLCB1c2VyKTtcclxuXHR0cnkge1xyXG5cdFx0YXdhaXQgQWNjaWRlbnREYXRhU291cmNlLmRlbGV0ZShwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0YEFjY2lkZW50IHdpdGggSUQgJHtwYXJhbXMuaWR9IGhhcyBiZWVuIGRlbGV0ZWQuYCxcclxuXHRcdFx0cmVzXHJcblx0XHQpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHRuZXh0KCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzL1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCByZXF1aXJlTG9naW4sIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEFsbCgpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoY2F0ZWdvcmllcyk7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShudWxsKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXCIvXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgYm9keSB9LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgY3JlYXRlZCA9IGF3YWl0IGRiLkNhdGVnb3J5LmNyZWF0ZSh7XHJcblx0XHRuYW1lOiBib2R5Lm5hbWUsXHJcblx0XHRjbGllbnRJZDogYm9keS5jbGllbnRJZFxyXG5cdH0pO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoY3JlYXRlZCk7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShudWxsKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBhdGNoKFwiLzppZFwiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IHBhcmFtcywgYm9keSB9LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgZm91bmQgPSBhd2FpdCBkYi5DYXRlZ29yeS5maW5kQnlQayhwYXJhbXMuaWQpO1xyXG5cdGZvdW5kICYmIGZvdW5kLnVwZGF0ZSh7IG5hbWU6IGJvZHkubmFtZSwgY2xpZW50SWQ6IGJvZHkuY2xpZW50SWQgfSk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZCk7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShudWxsKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgcmVxdWlyZUxvZ2luLCBhc3luYyAoeyBwYXJhbXMgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGZvdW5kID0gYXdhaXQgZGIuQ2F0ZWdvcnkuZmluZEJ5UGsocGFyYW1zLmlkKTtcclxuXHRmb3VuZCAmJiAoYXdhaXQgZm91bmQuZGVzdHJveSgpKTtcclxuXHRyZXNwb25zZS5zZXREYXRhKGZvdW5kKTtcclxuXHRyZXNwb25zZS5zZXRTdWNjZXNzKHRydWUpO1xyXG5cdHJlc3BvbnNlLnNldENvZGUoMjAwKTtcclxuXHRyZXNwb25zZS5zZXRNZXNzYWdlKG51bGwpO1xyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzLCB7IFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi9kYXRhc291cmNlXCI7XHJcbmltcG9ydCBkYiwgeyBMb2NhdGlvbiwgQ2xpZW50IGFzIENsaWVudE1vZGVsIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgcmVxdWlyZUxvZ2luIGZyb20gXCIuLi9taWRkbGV3YXJlcy9yZXF1aXJlTG9naW5cIjtcclxuaW1wb3J0IHsgUm9sZSwgTG9jYXRpb25BdHRyaWJ1dGVzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcbmltcG9ydCB7XHJcblx0UmVzb3VyY2VOb3RGb3VuZEV4Y2VwdGlvbixcclxuXHRJbnZhbGlkUGVybWlzc2lvbkV4Y2VwdGlvblxyXG59IGZyb20gXCIuLi91dGlscy9leGNlcHRpb25zXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldChcIi9cIiwgYXN5bmMgKHsgdXNlciB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IENsaWVudERhdGFTb3VyY2UgPSBuZXcgQ2xpZW50KGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IGNsaWVudHMgPSBhd2FpdCBDbGllbnREYXRhU291cmNlLmdldEFsbCgpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShjbGllbnRzKTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kICR7Y2xpZW50cy5sZW5ndGh9IGFjY2lkZW50cy5gLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXCIvXCIsIGFzeW5jICh7IHVzZXIsIGJvZHkgfTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQ2xpZW50RGF0YVNvdXJjZSA9IG5ldyBDbGllbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgY3JlYXRlZENsaWVudCA9IGF3YWl0IENsaWVudERhdGFTb3VyY2UuY3JlYXRlKHtcclxuXHRcdFx0Li4uYm9keSxcclxuXHRcdFx0Y2xpZW50SWQ6IHVzZXIuY2xpZW50SWRcclxuXHRcdH0pO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YShjcmVhdGVkQ2xpZW50KTtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoXCJDbGllbnQgaGFzIGJlZW4gY3JlYXRlZFwiLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmdldChcIi86aWRcIiwgYXN5bmMgKHsgdXNlciwgcGFyYW1zIH06IGFueSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgQ2xpZW50RGF0YVNvdXJjZSA9IG5ldyBDbGllbnQoZGIsIHVzZXIpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgZm91bmRDbGllbnQgPSBhd2FpdCBDbGllbnREYXRhU291cmNlLmdldChwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YSh7XHJcblx0XHRcdC4uLmZvdW5kQ2xpZW50LmdldCh7IHBsYWluOiB0cnVlIH0pLFxyXG5cdFx0XHRsb2NhdGlvbnM6IChhd2FpdCBmb3VuZENsaWVudC5nZXRMb2NhdGlvbnMoKSkubWFwKGMgPT4gYy5pZClcclxuXHRcdH0pO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgYWNjaWRlbnQgd2l0aCBJRCAke3BhcmFtcy5pZH1gLCByZXMpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBhdGNoKFwiLzppZFwiLCBhc3luYyAoeyB1c2VyLCBwYXJhbXMsIGJvZHkgfTogYW55LCByZXMpID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRjb25zdCBDbGllbnREYXRhU291cmNlID0gbmV3IENsaWVudChkYiwgdXNlcik7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBbcHJldmlvdXNWYWx1ZSwgdXBkYXRlZFZhbHVlXSA9IGF3YWl0IENsaWVudERhdGFTb3VyY2UudXBkYXRlKFxyXG5cdFx0XHRwYXJhbXMuaWQsXHJcblx0XHRcdGJvZHlcclxuXHRcdCk7XHJcblxyXG5cdFx0cmVzcG9uc2Uuc2V0RGF0YSh1cGRhdGVkVmFsdWUpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0YENsaWVudCB3aXRoIElEICR7cGFyYW1zLmlkfSBoYXMgYmVlbiB1cGRhdGVkLmAsXHJcblx0XHRcdHJlc1xyXG5cdFx0KTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9OiBhbnksIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IENsaWVudERhdGFTb3VyY2UgPSBuZXcgQ2xpZW50KGRiLCB1c2VyKTtcclxuXHJcblx0dHJ5IHtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRhd2FpdCBDbGllbnREYXRhU291cmNlLmRlbGV0ZShwYXJhbXMuaWQpO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhcclxuXHRcdFx0YENsaWVudCB3aXRoIElEICR7cGFyYW1zLmlkfSBoYXMgYmVlbiBkZWxldGVkLmAsXHJcblx0XHRcdHJlc1xyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5yb3V0ZXIuZ2V0PHsgaWQ6IHN0cmluZyB9PihcclxuXHRcIi86aWQvbG9jYXRpb25zXCIsXHJcblx0cmVxdWlyZUxvZ2luLFxyXG5cdGFzeW5jICh7IHVzZXIsIHBhcmFtcyB9LCByZXMpID0+IHtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcjxMb2NhdGlvbkF0dHJpYnV0ZXNbXT4oKTtcclxuXHJcblx0XHQvLyBUT0RPOiBBYnN0cmFjdGlvbiBvZiBhcGlzXHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgZm91bmRDbGllbnQgPSBhd2FpdCBDbGllbnRNb2RlbC5maW5kQnlQayhwYXJhbXMuaWQpO1xyXG5cclxuXHRcdFx0aWYgKCFmb3VuZENsaWVudCkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBSZXNvdXJjZU5vdEZvdW5kRXhjZXB0aW9uKFxyXG5cdFx0XHRcdFx0YFVzZXIgd2l0aCBJRCAke3BhcmFtcy5pZH0gY2Fubm90IGJlIGZvdW5kLmBcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh1c2VyLnJvbGUgIT09IFJvbGUuTUFTVEVSICYmIGZvdW5kQ2xpZW50LmlkICE9PSB1c2VyLmNsaWVudElkKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEludmFsaWRQZXJtaXNzaW9uRXhjZXB0aW9uKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGNsaWVudExvY2F0aW9ucyA9IGF3YWl0IExvY2F0aW9uLmZpbmRBbGwoe1xyXG5cdFx0XHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bW9kZWw6IENsaWVudE1vZGVsLFxyXG5cdFx0XHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0XHRcdGlkOiBmb3VuZENsaWVudC5pZFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldERhdGEoY2xpZW50TG9jYXRpb25zKTtcclxuXHJcblx0XHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3ModHJ1ZSk7XHJcblx0XHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoYEZvdW5kICR7Y2xpZW50TG9jYXRpb25zLmxlbmd0aH0gbG9jYXRpb25zLmApO1xyXG5cdFx0XHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0XHR9XHJcblx0XHRyZXMuanNvbihyZXNwb25zZS50b09iamVjdCgpKTtcclxuXHR9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcblxyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHMvXCI7XHJcbmltcG9ydCByZXF1aXJlTG9naW4gZnJvbSBcIi4uL21pZGRsZXdhcmVzL3JlcXVpcmVMb2dpblwiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBkYi5WZWhpY2xlSXNzdWUuZmluZEFsbCgpO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoY2F0ZWdvcmllcyk7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShudWxsKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoXCIvXCIsIHJlcXVpcmVMb2dpbiwgYXN5bmMgKHsgYm9keSB9LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgY3JlYXRlZCA9IGF3YWl0IGRiLlZlaGljbGVJc3N1ZS5jcmVhdGUoe1xyXG5cdFx0bWVzc2FnZTogYm9keS5tZXNzYWdlLFxyXG5cdFx0dmVoaWNsZUlkOiBib2R5LnZlaGljbGVJZFxyXG5cdH0pO1xyXG5cdHJlc3BvbnNlLnNldERhdGEoY3JlYXRlZCk7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShudWxsKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLnBhdGNoKFwiLzppZFwiLCByZXF1aXJlTG9naW4sIGFzeW5jICh7IHBhcmFtcywgYm9keSB9LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblx0Y29uc3QgZm91bmQgPSBhd2FpdCBkYi5WZWhpY2xlSXNzdWUuZmluZEJ5UGsocGFyYW1zLmlkKTtcclxuXHRmb3VuZCAmJiBmb3VuZC51cGRhdGUoeyBtZXNzYWdlOiBib2R5Lm1lc3NhZ2UgfSk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZCk7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShudWxsKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgcmVxdWlyZUxvZ2luLCBhc3luYyAoeyBwYXJhbXMgfSwgcmVzKSA9PiB7XHJcblx0bGV0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGNvbnN0IGZvdW5kID0gYXdhaXQgZGIuVmVoaWNsZUlzc3VlLmZpbmRCeVBrKHBhcmFtcy5pZCk7XHJcblx0Zm91bmQgJiYgKGF3YWl0IGZvdW5kLmRlc3Ryb3koKSk7XHJcblx0cmVzcG9uc2Uuc2V0RGF0YShmb3VuZCk7XHJcblx0cmVzcG9uc2Uuc2V0U3VjY2Vzcyh0cnVlKTtcclxuXHRyZXNwb25zZS5zZXRDb2RlKDIwMCk7XHJcblx0cmVzcG9uc2Uuc2V0TWVzc2FnZShudWxsKTtcclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBXaWFsb24gfSBmcm9tIFwibm9kZS13aWFsb25cIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VCdWlsZGVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IEl0ZW1Ob3RGb3VuZEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9hcGkvZXhjZXB0aW9uc1wiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoXCIvdW5pdHNcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyKCk7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHsgdG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTiB9KTtcclxuXHRcdGNvbnN0IHVuaXRzID0gYXdhaXQgdy5VdGlscy5nZXRVbml0cyh7IGZsYWdzOiAxMDI1IH0pO1xyXG5cdFx0cmVzcG9uc2UuaGFuZGxlU3VjY2VzcyhgRm91bmQgJHt1bml0cy5pdGVtcy5sZW5ndGh9IHVuaXRzLmAsIHJlcyk7XHJcblx0XHRyZXNwb25zZS5zZXREYXRhKHVuaXRzLml0ZW1zKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXNwb25zZS5oYW5kbGVFcnJvcihlLCByZXMpO1xyXG5cdH1cclxuXHJcblx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG59KTtcclxuXHJcbnJvdXRlci5nZXQoXCIvdW5pdHMvOmlkXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgdyA9IGF3YWl0IFdpYWxvbi5sb2dpbih7IHRva2VuOiBwcm9jZXNzLmVudi5XSUFMT05fVE9LRU4gfSk7XHJcblx0XHRjb25zdCB1bml0cyA9IGF3YWl0IHcuVXRpbHMuZ2V0VW5pdHMoeyBmbGFnczogMTAyNSB9KTtcclxuXHRcdGNvbnN0IHVuaXQgPSB1bml0cy5pdGVtcy5maW5kKHVuaXQgPT4gdW5pdC5pZCA9PT0gcmVxLnF1ZXJ5LmlkKTtcclxuXHRcdGlmICh1bml0KSB7XHJcblx0XHRcdHJlc3BvbnNlLmhhbmRsZVN1Y2Nlc3MoYEZvdW5kICR7dW5pdHMuaXRlbXMubGVuZ3RofSB1bml0cy5gLCByZXMpO1xyXG5cdFx0XHRyZXNwb25zZS5zZXREYXRhKHVuaXRzLml0ZW1zKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3BvbnNlLnNldENvZGUoNDA0KTtcclxuXHRcdFx0dGhyb3cgbmV3IEl0ZW1Ob3RGb3VuZEV4Y2VwdGlvbihcclxuXHRcdFx0XHRgVW5pdCB3aXRoIElEICR7cmVxLnF1ZXJ5LmlkfSBpcyBub3QgZm91bmQuYFxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlc3BvbnNlLmhhbmRsZUVycm9yKGUsIHJlcyk7XHJcblx0fVxyXG5cclxuXHRyZXMuanNvbihyZXNwb25zZSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBXaWFsb24gfSBmcm9tIFwibm9kZS13aWFsb25cIjtcclxuaW1wb3J0IHsgT3AsIEZpbHRlcmFibGUgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcblxyXG5pbXBvcnQgeyByZXF1aXJlSGlnaGVyT3JFcXVhbFJvbGUgfSBmcm9tIFwiLi4vbWlkZGxld2FyZXNcIjtcclxuaW1wb3J0IHtcclxuXHRWZWhpY2xlLFxyXG5cdEJvb2tpbmcsXHJcblx0QWNjaWRlbnQsXHJcblx0VmVoaWNsZUlzc3VlLFxyXG5cdExvY2F0aW9uLFxyXG5cdENhdGVnb3J5XHJcbn0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIsIFJvbGVVdGlscyB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBSb2xlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90eXBpbmdzXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLnVzZShyZXF1aXJlSGlnaGVyT3JFcXVhbFJvbGUoUm9sZS5LRVlfTUFOQUdFUikpO1xyXG5cclxuaW50ZXJmYWNlIFVuaXRTdW1tYXJ5UmVzcG9uc2Uge1xyXG5cdHBsYXRlTnVtYmVyOiBzdHJpbmc7XHJcblx0YnJhbmQ6IHN0cmluZztcclxuXHRtb2RlbDogc3RyaW5nO1xyXG5cdG9kb21ldGVyOiBudW1iZXIgfCBudWxsO1xyXG5cdGFjY2lkZW50czogbnVtYmVyO1xyXG5cdGJvb2tpbmdzOiBudW1iZXI7XHJcblx0Y2F0ZWdvcmllczogc3RyaW5nW107XHJcblx0aXNzdWVzOiBudW1iZXI7XHJcblx0ZGVmbGVldGVkOiBib29sZWFuO1xyXG5cdHdpYWxvblVuaXQ6IGJvb2xlYW47XHJcblx0d2lhbG9uVW5pdE5hbWU/OiBzdHJpbmcgfCBudWxsO1xyXG5cdGNsaWVudD86IHN0cmluZztcclxufVxyXG5cclxucm91dGVyLmdldChcIi91bml0LXN1bW1hcnlcIiwgYXN5bmMgKHsgdXNlciB9LCByZXMpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2VCdWlsZGVyPFVuaXRTdW1tYXJ5UmVzcG9uc2VbXT4oKTtcclxuXHRjb25zdCB3ID0gYXdhaXQgV2lhbG9uLmxvZ2luKHsgdG9rZW46IHByb2Nlc3MuZW52LldJQUxPTl9UT0tFTiB9KTtcclxuXHJcblx0bGV0IHdoZXJlT3B0aW9uczogRmlsdGVyYWJsZVtcIndoZXJlXCJdID0geyBjbGllbnRJZDogdXNlci5jbGllbnRJZCB9O1xyXG5cclxuXHRpZiAodXNlci5yb2xlID09PSBSb2xlLk1BU1RFUikge1xyXG5cdFx0d2hlcmVPcHRpb25zID0ge307XHJcblx0fVxyXG5cclxuXHRsZXQgY2xpZW50VXNlcnNJZHMgPSAoXHJcblx0XHRhd2FpdCBWZWhpY2xlLmZpbmRBbGwoe1xyXG5cdFx0XHR3aGVyZTogd2hlcmVPcHRpb25zXHJcblx0XHR9KVxyXG5cdCkubWFwKHVzZXIgPT4gdXNlci5pZCk7XHJcblxyXG5cdGxldCBjbGllbnRWZWhpY2xlcyA9IGF3YWl0IFZlaGljbGUuZmluZEFsbCh7XHJcblx0XHR3aGVyZTogd2hlcmVPcHRpb25zLFxyXG5cdFx0aW5jbHVkZTogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0bW9kZWw6IEFjY2lkZW50LFxyXG5cdFx0XHRcdGFzOiBcImFjY2lkZW50c1wiLFxyXG5cdFx0XHRcdHdoZXJlOiB7XHJcblx0XHRcdFx0XHR1c2VySWQ6IHtcclxuXHRcdFx0XHRcdFx0W09wLmluXTogY2xpZW50VXNlcnNJZHNcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHJlcXVpcmVkOiBmYWxzZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bW9kZWw6IEJvb2tpbmcsXHJcblx0XHRcdFx0YXM6IFwiYm9va2luZ3NcIixcclxuXHRcdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdFx0dXNlcklkOiB7XHJcblx0XHRcdFx0XHRcdFtPcC5pbl06IGNsaWVudFVzZXJzSWRzXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRyZXF1aXJlZDogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG1vZGVsOiBDYXRlZ29yeSxcclxuXHRcdFx0XHRhczogXCJjYXRlZ29yaWVzXCIsXHJcblx0XHRcdFx0d2hlcmU6IHdoZXJlT3B0aW9ucyxcclxuXHRcdFx0XHRyZXF1aXJlZDogZmFsc2VcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG1vZGVsOiBWZWhpY2xlSXNzdWUsXHJcblx0XHRcdFx0YXM6IFwidmVoaWNsZUlzc3Vlc1wiXHJcblx0XHRcdH0sXHJcblx0XHRcdExvY2F0aW9uXHJcblx0XHRdXHJcblx0fSk7XHJcblxyXG5cdGNvbnN0IHVuaXRzID0gYXdhaXQgdy5VdGlscy5nZXRVbml0cyh7IGZsYWdzOiA4MTkyICsgMSB9KTtcclxuXHJcblx0Y29uc3QgZGF0YSA9IGNsaWVudFZlaGljbGVzLm1hcDxVbml0U3VtbWFyeVJlc3BvbnNlPih2ZWhpY2xlID0+IHtcclxuXHRcdGNvbnN0IHdpYWxvblVuaXQgPSB1bml0cy5pdGVtcy5maW5kKFxyXG5cdFx0XHR1bml0ID0+IHVuaXQuaWQgPT09IHZlaGljbGUud2lhbG9uVW5pdElkXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHBsYXRlTnVtYmVyOiB2ZWhpY2xlLnBsYXRlTnVtYmVyLFxyXG5cdFx0XHRicmFuZDogdmVoaWNsZS5icmFuZCxcclxuXHRcdFx0bW9kZWw6IHZlaGljbGUubW9kZWwsXHJcblx0XHRcdG9kb21ldGVyOiAod2lhbG9uVW5pdCAmJiB3aWFsb25Vbml0LmNubSkgfHwgbnVsbCxcclxuXHRcdFx0YWNjaWRlbnRzOiB2ZWhpY2xlLmFjY2lkZW50cy5sZW5ndGgsXHJcblx0XHRcdGJvb2tpbmdzOiB2ZWhpY2xlLmJvb2tpbmdzLmZpbHRlcihib29raW5nID0+IGJvb2tpbmcuZmluaXNoZWQpLmxlbmd0aCxcclxuXHRcdFx0Y2F0ZWdvcmllczogdmVoaWNsZS5jYXRlZ29yaWVzLm1hcChjYXRlZ29yeSA9PiBjYXRlZ29yeS5uYW1lKSxcclxuXHRcdFx0aXNzdWVzOiB2ZWhpY2xlLnZlaGljbGVJc3N1ZXMubGVuZ3RoLFxyXG5cdFx0XHRkZWZsZWV0ZWQ6IHZlaGljbGUuZGVmbGVldGVkLFxyXG5cdFx0XHR3aWFsb25Vbml0OiBCb29sZWFuKHdpYWxvblVuaXQpLFxyXG5cdFx0XHR3aWFsb25Vbml0TmFtZTogUm9sZVV0aWxzLmlzUm9sZUJldHRlcihSb2xlLk1BU1RFUiwgdXNlci5yb2xlKVxyXG5cdFx0XHRcdD8gKHdpYWxvblVuaXQgJiYgd2lhbG9uVW5pdC5ubSkgfHwgbnVsbFxyXG5cdFx0XHRcdDogdW5kZWZpbmVkLFxyXG5cdFx0XHRjbGllbnQ6IFJvbGVVdGlscy5pc1JvbGVCZXR0ZXIoUm9sZS5NQVNURVIsIHVzZXIucm9sZSlcclxuXHRcdFx0XHQ/IHZlaGljbGUuY2xpZW50ICYmIHZlaGljbGUuY2xpZW50Lm5hbWVcclxuXHRcdFx0XHQ6IHVuZGVmaW5lZFxyXG5cdFx0fTtcclxuXHR9KTtcclxuXHJcblx0cmVzcG9uc2Uuc2V0RGF0YShkYXRhKTtcclxuXHRyZXNwb25zZS5oYW5kbGVTdWNjZXNzKFwiUmVwb3J0IHN1Y2Nlc3NmdWwuXCIsIHJlcyk7XHJcblxyXG5cdHJlcy5qc29uKHJlc3BvbnNlKTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3JlcXVpcmVSb2xlXCI7XHJcbiIsImltcG9ydCB7IEhhbmRsZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZUJ1aWxkZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgUm9sZVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IFJvbGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3R5cGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCByZXF1aXJlUm9sZSA9IChyb2xlOiBSb2xlIHwgUm9sZVtdKTogSGFuZGxlciA9PiAoXHJcblx0cmVxLFxyXG5cdHJlcyxcclxuXHRuZXh0XHJcbikgPT4ge1xyXG5cdGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlQnVpbGRlcigpO1xyXG5cdGlmIChcclxuXHRcdHJlcS51c2VyICYmXHJcblx0XHQoKHJvbGUgaW5zdGFuY2VvZiBBcnJheSAmJlxyXG5cdFx0XHRyb2xlLmZpbmRJbmRleChyb2xlID0+IHJlcS51c2VyLnJvbGUgPT09IHJvbGUpID49IDApIHx8XHJcblx0XHRcdHJvbGUgPT09IHJlcS51c2VyLnJvbGUpXHJcblx0KSB7XHJcblx0XHRuZXh0KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlc3BvbnNlLnNldE1lc3NhZ2UoXCJZb3UgYXJlIG5vdCBhdXRob3JpemVkIHRvIGFjY2VzcyB0aGlzIHJlc291cmNlLlwiKTtcclxuXHRcdHJlc3BvbnNlLnNldENvZGUoNDAxKTtcclxuXHRcdHJlc3BvbnNlLnNldFN1Y2Nlc3MoZmFsc2UpO1xyXG5cdFx0cmVzLnN0YXR1cyg0MDEpO1xyXG5cdFx0cmVzLmpzb24ocmVzcG9uc2UpO1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXF1aXJlSGlnaGVyT3JFcXVhbFJvbGUgPSAocm9sZTogUm9sZSk6IEhhbmRsZXIgPT4gKFxyXG5cdHJlcSxcclxuXHRyZXMsXHJcblx0bmV4dFxyXG4pID0+IHtcclxuXHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZUJ1aWxkZXIoKTtcclxuXHRpZiAocmVxLnVzZXIgJiYgUm9sZVV0aWxzLmlzUm9sZUJldHRlcihyb2xlLCByZXEudXNlci5yb2xlKSkge1xyXG5cdFx0bmV4dCgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXNwb25zZS5zZXRNZXNzYWdlKFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCB0byBhY2Nlc3MgdGhpcyByZXNvdXJjZS5cIik7XHJcblx0XHRyZXNwb25zZS5zZXRDb2RlKDQwMSk7XHJcblx0XHRyZXNwb25zZS5zZXRTdWNjZXNzKGZhbHNlKTtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKTtcclxuXHRcdHJlcy5qc29uKHJlc3BvbnNlKTtcclxuXHR9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=