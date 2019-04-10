const { RBAC, Role, Resource, Action } = require("./");
const { ROLES, RESOURCES } = require("../utils/variables");
const { READ, UPDATE, DELETE, CREATE } = Action.OPERATIONS;
const accessControl = new RBAC("Car Booking");
const adminRole = new Role(ROLES.ADMIN);
const keyManagerRole = new Role(ROLES.KEY_MANAGER);
const guestRole = new Role(ROLES.GUEST);

const vehicleResource = new Resource(RESOURCES.VEHICLES);
const locationsResource = new Resource(RESOURCES.LOCATIONS);
const bookingsResource = new Resource(RESOURCES.BOOKINGS);
const usersResource = new Resource(RESOURCES.USERS);
const enumsResource = new Resource(RESOURCES.ENUMS);

////////////////////////
// GUESTS ROLE CONFIG //
////////////////////////
// Vehicle permissions.
guestRole.addPermission(new Action(READ, vehicleResource), [
	/*Do not include sensitive data*/
]);
guestRole.addPermission(new Action(UPDATE, vehicleResource), [
	/*Do not include sensitive data*/
]);
guestRole.addPermission(new Action(READ, locationsResource));
// Booking permissions.
guestRole.addPermission(new Action(CREATE, bookingsResource));
guestRole.addPermission(
	new Action(UPDATE, bookingsResource, () => {
		// Bookings that are not yet finalized / ongoing / approved.
	}),
	[
		/* Exclude booking status */
	]
);
guestRole.addPermission(
	new Action(READ, bookingsResource, ({ booking, user }) => {
		// Bookings only own bookings.
	})
);
guestRole.addPermission(
	new Action(DELETE, bookingsResource, () => {
		// Bookings that are not yet finalized / paid / ongoing / approved.
	})
);
guestRole.addPermission(
	new Action(
		UPDATE,
		usersResource,
		(updateUser, currentUser) => updateUser.id === currentUser.id
	)
);
guestRole.addPermission(new Action(READ, enumsResource));

/////////////////////////////
// KEY_MANAGER ROLE CONFIG //
/////////////////////////////
keyManagerRole.extend(guestRole);
// Vehicle Permissions. Extended from guest.

keyManagerRole.addPermission(new Action(UPDATE, vehicleResource), [
	/*Do not include sensitive data*/
]);
// Locations permissions. Extended from guest.
keyManagerRole.addPermission(new Action(CREATE, locationsResource));
keyManagerRole.addPermission(new Action(UPDATE, locationsResource));
keyManagerRole.addPermission(new Action(DELETE, locationsResource));

// Booking permissions. Extended from guest.
keyManagerRole.addPermission(new Action(READ, bookingsResource));

// Users permission
keyManagerRole.addPermission(new Action(READ, usersResource));
keyManagerRole.addPermission(
	new Action(
		CREATE,
		usersResource,
		({ booking, user }) => booking.userId === user.id
	)
);

///////////////////////
// ADMIN ROLE CONFIG //
///////////////////////
adminRole.extend(keyManagerRole);
// Vehicle Permissions.
adminRole.addPermission(new Action(CREATE, vehicleResource));
adminRole.addPermission(new Action(READ, vehicleResource));
adminRole.addPermission(new Action(UPDATE, vehicleResource));
adminRole.addPermission(new Action(DELETE, vehicleResource));

adminRole.addPermission(new Action(READ, bookingsResource));

adminRole.addPermission(
	new Action(UPDATE, usersResource, () => {
		// Do not allow guest updating.
	})
);

accessControl.addRole(adminRole);
accessControl.addRole(keyManagerRole);
accessControl.addRole(guestRole);

module.exports = {
	RBAC: accessControl,
	OPERATIONS: Action.OPERATIONS,
	roles: {
		admin: adminRole,
		keyManager: keyManagerRole,
		guest: guestRole
	},
	resources: {
		bookings: bookingsResource,
		vehicles: vehicleResource,
		locations: locationsResource,
		users: usersResource,
		enums: enumsResource
	}
};

// const { RBAC, Resource } = require("./");
// const { ROLES, RESOURCES, BOOKING_STATUS } = require("../utils/variables");
// const { containsField } = require("../utils");
// let bookings = new Resource(RESOURCES.BOOKINGS);
// let locations = new Resource(RESOURCES.LOCATIONS);
// let vehicles = new Resource(RESOURCES.VEHICLES);
// let users = new Resource(RESOURCES.USERS);
// let enums = new Resource(RESOURCES.ENUMS);

// let { CREATE, READ, UPDATE, DELETE } = Resource.OPERATIONS;

// // Users
// // 	Can
// //		Bookings
// //			Create bookings.
// //			Read own bookings.
// //			Update own bookings.
// //			Delete own bookings.
// //			Cannot update/delete active bookings.
// // 		Vehicles
// //			Read available vehicles.
// // Key Managers
// // 	Can
// //		Bookings
// //			CRUD
// // 		Vehicles
// //			CRUD
// //		Locations
// //			CRUD
// //		Users
// //			CRU

// const accessControl = new RBAC({
// 	[ROLES.ADMIN]: {
// 		can: [users.getPermission(DELETE)],
// 		inherits: [ROLES.KEY_MANAGER]
// 	},
// 	[ROLES.KEY_MANAGER]: {
// 		can: [
// 			...bookings.getPermission([READ, UPDATE, DELETE]),
// 			...locations.getPermission([READ, UPDATE, DELETE]),
// 			// TODO: Disallow on update confidential data.
// 			...users.getPermission([READ, UPDATE, CREATE]),
// 			...vehicles.getPermission([UPDATE, CREATE, DELETE])
// 		],
// 		inherits: [ROLES.GUEST]
// 	},
// 	[ROLES.GUEST]: {
// 		can: [
// 			bookings.getPermission(CREATE),
// 			bookings.getPermission(READ, ({ booking, user }, cb) => {
// 				// Can only read own bookings
// 				cb(undefined, booking.userId === user.id);
// 			}),
// 			bookings.getPermission(UPDATE, ({ booking, user, update }, cb) => {
// 				// Can only update own bookings
// 				// Do not allow updates on booking status.
// 				if (booking.bookingStatus.name === BOOKING_STATUS.FINISHED) {
// 					cb(undefined, false);
// 				} else {
// 					let unallowedFields = containsField(
// 						["bookingStatusId", "paid", "userId"],
// 						update
// 					);
// 					let ownBooking = booking.userId === user.id;
// 					cb(undefined, ownBooking && unallowedFields.length);
// 				}
// 			}),
// 			bookings.getPermission(DELETE, ({ booking, user }, cb) => {
// 				// Booking status is pending. Then it is not final.
// 				let isBookingFinal = booking.status !== BOOKING_STATUS.PENDING;
// 				// Can only delete own bookings
// 				let ownBooking = booking.userId === user.id;
// 				cb(undefined, !isBookingFinal && ownBooking);
// 			}),
// 			users.getPermission(UPDATE, ({ updateUser, currentUser }, cb) => {
// 				// TODO: Disallow on update confidential data.
// 				// Can only update self
// 				cb(undefined, updateUser.id === currentUser.id);
// 			}),
// 			vehicles.getPermission(READ),
// 			enums.getPermission(READ)
// 		]
// 	}
// });

// module.exports = {
// 	accessControl,
// 	bookings,
// 	locations,
// 	vehicles,
// 	users,
// 	ROLES,
// 	RESOURCES,
// 	op: { CREATE, READ, UPDATE, DELETE }
// };
