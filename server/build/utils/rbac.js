"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rbac_1 = __importStar(require("../rbac"));
const enums = __importStar(require("../variables/enums"));
const { READ, UPDATE, DELETE, CREATE } = enums.Operation;
const accessControl = new rbac_1.default("Car Booking");
const generalRole = new rbac_1.Role("GENERAL");
const masterRole = new rbac_1.Role(enums.Role.MASTER);
const adminRole = new rbac_1.Role(enums.Role.ADMIN);
const keyManagerRole = new rbac_1.Role(enums.Role.KEY_MANAGER);
const guestRole = new rbac_1.Role(enums.Role.GUEST);
const vehicleResource = new rbac_1.Resource(enums.Resource.VEHICLES);
const locationsResource = new rbac_1.Resource(enums.Resource.LOCATIONS);
const bookingsResource = new rbac_1.Resource(enums.Resource.BOOKINGS);
const usersResource = new rbac_1.Resource(enums.Resource.USERS);
const enumsResource = new rbac_1.Resource(enums.Resource.ENUMS);
const accidentsResource = new rbac_1.Resource(enums.Resource.ACCIDENTS);
/////////////////////////
// GENERAL ROLE CONFIG //
/////////////////////////
// All roles will extend this role.
// Users permission.
generalRole.addPermission(new rbac_1.Action(READ, usersResource, ({ targetUser, user }) => targetUser.id === user.id, ["password", "passwordConfirm"]));
// Vehicle permissions.
generalRole.addPermission(new rbac_1.Action(READ, vehicleResource, null, ["objectId"]));
generalRole.addPermission(new rbac_1.Action(READ, locationsResource));
// Booking permissions.
// generalRole.addPermission(
// 	new Action(UPDATE, bookingsResource, () => {
// 		// Bookings that are not yet finalized / ongoing / approved.
// 	})
// );
// generalRole.addPermission(
// 	new Action(DELETE, bookingsResource, () => {
// 		// Bookings that are not yet finalized / paid / ongoing / approved.
// 	})
// );
generalRole.addPermission(new rbac_1.Action(READ, bookingsResource, ({ booking, user }) => booking.userId === user.id, ["userId"]));
// Users permission.
generalRole.addPermission(new rbac_1.Action(UPDATE, usersResource, ({ user, targetUser }) => user.id === targetUser.id, ["roleId"]));
// Enums permission.
generalRole.addPermission(new rbac_1.Action(READ, enumsResource));
// Accidents permissions.
generalRole.addPermission(new rbac_1.Action(READ, accidentsResource, ({ accident, user }) => accident.userId === user.id));
generalRole.addPermission(new rbac_1.Action(UPDATE, accidentsResource, ({ accident, user, body }) => true));
////////////////////////
// GUESTS ROLE CONFIG //
////////////////////////
guestRole.extend(generalRole);
// Bookings permissions.
// Only guests can create bookings.
guestRole.addPermission(new rbac_1.Action(CREATE, bookingsResource, null, ["userId", "paid"]));
// Accidents permissions.
guestRole.addPermission(new rbac_1.Action(CREATE, accidentsResource, null, ["userId", "bookingId"]));
/////////////////////////////
// KEY_MANAGER ROLE CONFIG //
/////////////////////////////
keyManagerRole.extend(generalRole);
// Vehicle Permissions. Extended from guest.
keyManagerRole.addPermission(new rbac_1.Action(UPDATE, vehicleResource));
// Locations permissions. Extended from guest.
keyManagerRole.addPermission(new rbac_1.Action(CREATE, locationsResource));
keyManagerRole.addPermission(new rbac_1.Action(UPDATE, locationsResource));
keyManagerRole.addPermission(new rbac_1.Action(DELETE, locationsResource));
// Booking permissions. Extended from guest.
keyManagerRole.addPermission(new rbac_1.Action(READ, bookingsResource));
keyManagerRole.addPermission(new rbac_1.Action(UPDATE, bookingsResource, null, ["userId"]));
// Users permission
keyManagerRole.addPermission(new rbac_1.Action(READ, usersResource, null, ["password", "passwordConfirm"]));
// Accidents permission
keyManagerRole.addPermission(new rbac_1.Action(READ, accidentsResource));
///////////////////////
// ADMIN ROLE CONFIG //
///////////////////////
adminRole.extend(keyManagerRole);
// Vehicle Permissions.
adminRole.addPermission(new rbac_1.Action(CREATE, vehicleResource));
adminRole.addPermission(new rbac_1.Action(READ, vehicleResource));
adminRole.addPermission(new rbac_1.Action(UPDATE, vehicleResource));
adminRole.addPermission(new rbac_1.Action(DELETE, vehicleResource));
// Booking permissions.
adminRole.addPermission(new rbac_1.Action(DELETE, bookingsResource));
adminRole.addPermission(new rbac_1.Action(CREATE, bookingsResource));
// User permissions.
adminRole.addPermission(new rbac_1.Action(CREATE, usersResource));
adminRole.addPermission(new rbac_1.Action(UPDATE, usersResource, null, ["roleId"]));
adminRole.addPermission(new rbac_1.Action(DELETE, usersResource));
// Accidents Permissions
adminRole.addPermission(new rbac_1.Action(DELETE, accidentsResource));
accessControl.addRole(adminRole);
accessControl.addRole(keyManagerRole);
accessControl.addRole(guestRole);
////////////////////////
// MASTER ROLE CONFIG //
////////////////////////
exports.default = accessControl;
exports.roles = {
    admin: adminRole,
    keyManager: keyManagerRole,
    guest: guestRole
};
exports.resources = {
    bookings: bookingsResource,
    vehicles: vehicleResource,
    locations: locationsResource,
    users: usersResource,
    enums: enumsResource,
    accidents: accidentsResource
};
