const { RBAC, Role, Resource, Action } = require("./");
const { ROLES, RESOURCES } = require("../utils/variables");
const { READ, UPDATE, DELETE, CREATE } = Action.OPERATIONS;
const accessControl = new RBAC("Car Booking");
const generalRole = new Role("GENERAL");
const adminRole = new Role(ROLES.ADMIN);
const keyManagerRole = new Role(ROLES.KEY_MANAGER);
const guestRole = new Role(ROLES.GUEST);

const vehicleResource = new Resource(RESOURCES.VEHICLES);
const locationsResource = new Resource(RESOURCES.LOCATIONS);
const bookingsResource = new Resource(RESOURCES.BOOKINGS);
const usersResource = new Resource(RESOURCES.USERS);
const enumsResource = new Resource(RESOURCES.ENUMS);
const accidentsResource = new Resource(RESOURCES.ACCIDENTS);

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
generalRole.addPermission(
	new Action(UPDATE, bookingsResource, () => {
		// Bookings that are not yet finalized / ongoing / approved.
	})
);

generalRole.addPermission(
	new Action(DELETE, bookingsResource, () => {
		// Bookings that are not yet finalized / paid / ongoing / approved.
	})
);
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
		({ user, targetUser }) => user.id === targetUser.id
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
guestRole.addPermission(new Action(CREATE, accidentsResource, null));

/////////////////////////////
// KEY_MANAGER ROLE CONFIG //
/////////////////////////////
keyManagerRole.extend(generalRole);
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
keyManagerRole.addPermission(new Action(UPDATE, bookingsResource));

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

adminRole.addPermission(new Action(DELETE, bookingsResource));

adminRole.addPermission(
	new Action(
		CREATE,
		usersResource,
		({ role }) => role && role.name !== roleEnums.GUEST
	)
);
adminRole.addPermission(
	new Action(
		UPDATE,
		usersResource,
		({ role }) => role && role.name !== roleEnums.GUEST,
		["password", "passwordConfirm"]
	)
);

// Accidents Permissions
adminRole.addPermission(new Action(DELETE, accidentsResource));

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
		enums: enumsResource,
		accidents: accidentsResource
	}
};
