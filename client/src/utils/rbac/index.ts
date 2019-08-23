import RBAC, { Role, Resource, Action } from "../rbac";
import * as enums from "../variables/enums";

const { READ, UPDATE, DELETE, CREATE } = enums.Operation;
const accessControl = new RBAC("Car Booking");
const generalRole = new Role("GENERAL");
const masterRole = new Role(enums.Role.MASTER);
const adminRole = new Role(enums.Role.ADMIN);
const keyManagerRole = new Role(enums.Role.KEY_MANAGER);
const guestRole = new Role(enums.Role.GUEST);

const vehicleResource = new Resource(enums.Resource.VEHICLES);
const locationsResource = new Resource(enums.Resource.LOCATIONS);
const bookingsResource = new Resource(enums.Resource.BOOKINGS);
const usersResource = new Resource(enums.Resource.USERS);
const enumsResource = new Resource(enums.Resource.ENUMS);
const accidentsResource = new Resource(enums.Resource.ACCIDENTS);

/////////////////////////
// GENERAL ROLE CONFIG //
/////////////////////////
// All roles will extend this role.
// Users permission.
generalRole.addPermission(
	new Action(
		READ,
		usersResource,
		({ targetUser, user }) => targetUser.id === user.id,
		["password", "passwordConfirm"]
	)
);

// Vehicle permissions.
generalRole.addPermission(
	new Action(READ, vehicleResource, null, ["objectId"])
);
generalRole.addPermission(new Action(READ, locationsResource));
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
generalRole.addPermission(
	new Action(
		READ,
		bookingsResource,
		({ booking, user }) => booking.userId === user.id,
		["userId"]
	)
);

// Users permission.
generalRole.addPermission(
	new Action(
		UPDATE,
		usersResource,
		({ user, targetUser }) => user.id === targetUser.id,
		["roleId"]
	)
);

// Enums permission.
generalRole.addPermission(new Action(READ, enumsResource));

// Accidents permissions.
generalRole.addPermission(
	new Action(
		READ,
		accidentsResource,
		({ accident, user }) => accident.userId === user.id
	)
);
generalRole.addPermission(
	new Action(UPDATE, accidentsResource, ({ accident, user, body }) => true)
);

////////////////////////
// GUESTS ROLE CONFIG //
////////////////////////
guestRole.extend(generalRole);
// Bookings permissions.
// Only guests can create bookings.
guestRole.addPermission(
	new Action(CREATE, bookingsResource, null, ["userId", "paid"])
);

// Accidents permissions.
guestRole.addPermission(
	new Action(CREATE, accidentsResource, null, ["userId", "bookingId"])
);

/////////////////////////////
// KEY_MANAGER ROLE CONFIG //
/////////////////////////////
keyManagerRole.extend(generalRole);
// Vehicle Permissions. Extended from guest.

keyManagerRole.addPermission(new Action(UPDATE, vehicleResource));
// Locations permissions. Extended from guest.
keyManagerRole.addPermission(new Action(CREATE, locationsResource));
keyManagerRole.addPermission(new Action(UPDATE, locationsResource));
keyManagerRole.addPermission(new Action(DELETE, locationsResource));

// Booking permissions. Extended from guest.
keyManagerRole.addPermission(new Action(READ, bookingsResource));
keyManagerRole.addPermission(
	new Action(UPDATE, bookingsResource, null, ["userId"])
);

// Users permission
keyManagerRole.addPermission(
	new Action(READ, usersResource, null, ["password", "passwordConfirm"])
);

// Accidents permission
keyManagerRole.addPermission(new Action(READ, accidentsResource));

///////////////////////
// ADMIN ROLE CONFIG //
///////////////////////
adminRole.extend(keyManagerRole);
// Vehicle Permissions.
adminRole.addPermission(new Action(CREATE, vehicleResource));
adminRole.addPermission(new Action(READ, vehicleResource));
adminRole.addPermission(new Action(UPDATE, vehicleResource));
adminRole.addPermission(new Action(DELETE, vehicleResource));

// Booking permissions.
adminRole.addPermission(new Action(DELETE, bookingsResource));
adminRole.addPermission(new Action(CREATE, bookingsResource));

// User permissions.
adminRole.addPermission(new Action(CREATE, usersResource));
adminRole.addPermission(new Action(UPDATE, usersResource, null, ["roleId"]));
adminRole.addPermission(new Action(DELETE, usersResource));

// Accidents Permissions
adminRole.addPermission(new Action(DELETE, accidentsResource));

accessControl.addRole(adminRole);
accessControl.addRole(keyManagerRole);
accessControl.addRole(guestRole);

////////////////////////
// MASTER ROLE CONFIG //
////////////////////////

export default accessControl;

export const roles = {
	admin: adminRole,
	keyManager: keyManagerRole,
	guest: guestRole
};

export const resources = {
	bookings: bookingsResource,
	vehicles: vehicleResource,
	locations: locationsResource,
	users: usersResource,
	enums: enumsResource,
	accidents: accidentsResource
};
