const { RBAC, Resource } = require("./");
const { ROLES, RESOURCES } = require("../utils/variables");
let bookings = new Resource(RESOURCES.BOOKINGS);
let locations = new Resource(RESOURCES.LOCATIONS);
let vehicles = new Resource(RESOURCES.VEHICLES);
let users = new Resource(RESOURCES.USERS);

let { CREATE, READ, UPDATE, DELETE } = Resource.OPERATIONS;

const accessControl = new RBAC({
	[ROLES.ADMIN]: {
		can: [
			...locations.getPermission([CREATE, READ, UPDATE, DELETE]),
			...vehicles.getPermission([CREATE, READ, UPDATE, DELETE]),
			...users.getPermission([CREATE, READ, UPDATE, DELETE])
		],
		inherits: [ROLES.KEY_MANAGER]
	},
	[ROLES.KEY_MANAGER]: {
		can: [...bookings.getPermission([READ, UPDATE, DELETE])],
		inherits: [ROLES.GUEST]
	},
	[ROLES.GUEST]: {
		can: [
			bookings.getPermission(CREATE),
			bookings.getPermission(READ, ({ currentUserId, resourceOwnerId }, cb) => {
				// Can only read own bookings
				if (
					currentUserId &&
					resourceOwnerId &&
					currentUserId === resourceOwnerId
				) {
					cb(undefined, true);
				}
			}),
			bookings.getPermission(
				UPDATE,
				({ currentUserId, resourceOwnerId }, cb) => {
					// Can only update own bookings
					if (
						currentUserId &&
						resourceOwnerId &&
						currentUserId === resourceOwnerId
					) {
						cb(undefined, true);
					}
				}
			),
			bookings.getPermission(
				DELETE,
				({ currentUserId, resourceOwnerId }, cb) => {
					// Can only delete own bookings
					if (
						currentUserId &&
						resourceOwnerId &&
						currentUserId === resourceOwnerId
					) {
						cb(undefined, true);
					}
				}
			)
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
	op: { CREATE, READ, UPDATE, DELETE }
};
