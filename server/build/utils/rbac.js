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
}, ["clientId"]));
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
}, ["clientId"]));
guestRole.addPermission(new rbac_1.Action(READ, locations, ({ accessor, target }) => {
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
            target.clients.find(client => accessor.clientId === client.id)) {
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
}, ["categories", "objectId", "plateNumber", "vin", "wialonUnitId"]));
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
