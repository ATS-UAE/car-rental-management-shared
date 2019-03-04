const { RBAC, Resource } = require("./");

let bookings = new Resource("bookings");
let locations = new Resource("locations");
let vehicles = new Resource("vehicles");
let users = new Resource("users");

let { CREATE, READ, UPDATE, DELETE } = Resource.OPERATIONS;

const accessControl = new RBAC({
	admin: {
		can: [
			...locations.getPermission([CREATE, READ, UPDATE, DELETE]),
			...vehicles.getPermission([CREATE, READ, UPDATE, DELETE]),
			...users.getPermission([CREATE, READ, UPDATE, DELETE])
		],
		inherits: ["key_manager"]
	},
	key_manager: {
		can: [...bookings.getPermission([READ, UPDATE, DELETE])],
		inherits: ["guest"]
	},
	guest: {
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
	op: { CREATE, READ, UPDATE, DELETE }
};
