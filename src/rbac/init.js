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
	})
);
guestRole.addPermission(
	new Action(
		READ,
		bookingsResource,
		({ booking, user }) => booking.userId === user.id
	)
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
keyManagerRole.addPermission(
	new Action(READ, usersResource, null, ["password"])
);
keyManagerRole.addPermission(
	new Action(CREATE, usersResource, role => role && role.name !== ROLES.GUEST)
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
