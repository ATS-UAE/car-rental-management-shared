const { RBAC, Resource } = require("./");
const { ROLES, RESOURCES, BOOKING_STATUS } = require("../utils/variables");
let bookings = new Resource(RESOURCES.BOOKINGS);
let locations = new Resource(RESOURCES.LOCATIONS);
let vehicles = new Resource(RESOURCES.VEHICLES);
let users = new Resource(RESOURCES.USERS);
let roles = new Resource(RESOURCES.ROLES);

let { CREATE, READ, UPDATE, DELETE } = Resource.OPERATIONS;

// Users
// 	Can
//		Bookings
//			Create bookings.
//			Read own bookings.
//			Update own bookings.
//			Delete own bookings.
//			Cannot update/delete active bookings.
// 		Vehicles
//			Read available vehicles.
// Key Managers
// 	Can
//		Bookings
//			CRUD
// 		Vehicles
//			CRUD
//		Locations
//			CRUD
//		Users
//			CRU

const accessControl = new RBAC({
	[ROLES.ADMIN]: {
		can: [users.getPermission(DELETE)],
		inherits: [ROLES.KEY_MANAGER]
	},
	[ROLES.KEY_MANAGER]: {
		can: [
			...bookings.getPermission([READ, UPDATE, DELETE]),
			...locations.getPermission([READ, UPDATE, DELETE]),
			// TODO: Disallow on update confidential data.
			...users.getPermission([READ, UPDATE, CREATE]),
			...vehicles.getPermission([UPDATE, CREATE, DELETE])
		],
		inherits: [ROLES.GUEST]
	},
	[ROLES.GUEST]: {
		can: [
			bookings.getPermission(CREATE),
			bookings.getPermission(READ, ({ booking, user }, cb) => {
				// Can only read own bookings
				cb(undefined, booking.userId === user.id);
			}),
			bookings.getPermission(UPDATE, ({ booking, user }, cb) => {
				// Can only update own bookings
				cb(undefined, booking.userId === user.id);
			}),
			bookings.getPermission(DELETE, ({ booking, user }, cb) => {
				// Booking status is pending. Then it is not final.
				let isBookingFinal = booking.status !== BOOKING_STATUS.PENDING;
				// Can only delete own bookings
				let ownBooking = booking.userId === user.id;
				cb(undefined, !isBookingFinal && ownBooking);
			}),
			users.getPermission(UPDATE, ({ updateUser, currentUser }, cb) => {
				// TODO: Disallow on update confidential data.
				// Can only update self
				return cb(undefined, updateUser.id === currentUser.id);
			}),
			vehicles.getPermission(READ),
			roles.getPermission(READ)
		]
	}
});

module.exports = {
	accessControl,
	bookings,
	locations,
	vehicles,
	users,
	ROLES,
	RESOURCES,
	op: { CREATE, READ, UPDATE, DELETE }
};
