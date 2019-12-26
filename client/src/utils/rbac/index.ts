import RBAC, { Role, Resource, Action } from "../../rbac";
import * as enums from "../../variables/enums";

const { READ, UPDATE, DELETE, CREATE } = enums.Action;
const accessControl = new RBAC("Car Booking");
const masterRole = new Role(enums.Role.MASTER);
const adminRole = new Role(enums.Role.ADMIN);
const keyManagerRole = new Role(enums.Role.KEY_MANAGER);
const guestRole = new Role(enums.Role.GUEST);

const vehicles = new Resource(enums.Resource.VEHICLES);
const locations = new Resource(enums.Resource.LOCATIONS);
const bookings = new Resource(enums.Resource.BOOKINGS);
const users = new Resource(enums.Resource.USERS);
const accidents = new Resource(enums.Resource.ACCIDENTS);
const categories = new Resource(enums.Resource.CATEGORIES);
const clients = new Resource(enums.Resource.CLIENTS);

////////////////////////
// GUESTS ROLE CONFIG //
////////////////////////

////////////
// CREATE //
////////////

guestRole.addPermission(
	new Action(
		CREATE,
		bookings,
		({ accessor, body }: any) => {
			try {
				if (accessor.id !== undefined && accessor.id === body.userId) {
					return true;
				}
				return false;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
		["userId", "paid", "clientId"]
	)
);

guestRole.addPermission(
	new Action(
		CREATE,
		accidents,
		({ accessor, body }: any) => {
			try {
				if (accessor.id !== undefined && accessor.id === body.userId) {
					return true;
				}
				return false;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
		["userId", "bookingId", "clientId"]
	)
);

////////////
//  READ  //
////////////

guestRole.addPermission(
	new Action(READ, bookings, ({ accessor, target }: any) => {
		try {
			if (accessor.id && accessor.id === target.user.userId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);
guestRole.addPermission(
	new Action(
		READ,
		vehicles,
		({ accessor, target }: any) => {
			try {
				if (accessor.clientId && accessor.clientId === target.clientId) {
					return true;
				}
				return false;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
		["bookingChargeUnitId", "bookingChargeCount", "bookingCharge"]
	)
);
guestRole.addPermission(
	new Action(
		READ,
		locations,
		({ accessor, target }: any) => {
			try {
				if (
					accessor.clientId &&
					target.clients.find(client => client.id === accessor.clientId)
				) {
					return true;
				}
				return false;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
		["clientId"]
	)
);
guestRole.addPermission(
	new Action(
		READ,
		categories,
		({ accessor, target }: any) => {
			try {
				if (accessor.clientId && accessor.clientId === target.clientId) {
					return true;
				}
				return false;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
		["clientId"]
	)
);

////////////
// UPDATE //
////////////

guestRole.addPermission(
	new Action(UPDATE, bookings, ({ accessor, target }: any) => {
		try {
			if (accessor.id === target.user.userId && target.approved === false) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

////////////
// DELETE //
////////////

guestRole.addPermission(
	new Action(DELETE, bookings, ({ accessor, target }: any) => {
		try {
			if (accessor.id === target.user.userId && target.approved === false) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

/////////////////////////////
// KEY_MANAGER ROLE CONFIG //
/////////////////////////////

////////////
//  READ  //
////////////

keyManagerRole.addPermission(
	new Action(READ, bookings, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.user.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

keyManagerRole.addPermission(
	new Action(READ, users, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

keyManagerRole.addPermission(
	new Action(READ, vehicles, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

keyManagerRole.addPermission(
	new Action(READ, accidents, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

keyManagerRole.addPermission(
	new Action(READ, locations, ({ accessor, target }: any) => {
		try {
			if (
				accessor.clientId &&
				target.clients.find(client => client.id === accessor.clientId)
			) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

keyManagerRole.addPermission(
	new Action(READ, categories, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

////////////
// UPDATE //
////////////

keyManagerRole.addPermission(
	new Action(
		UPDATE,
		vehicles,
		({ accessor, target }: any) => {
			try {
				if (accessor.clientId && accessor.clientId === target.clientId) {
					return true;
				}
				return false;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
		["categories", "objectId", "plateNumber", "vin", "wialonUnitId"]
	)
);

keyManagerRole.addPermission(
	new Action(UPDATE, bookings, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.user.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

keyManagerRole.addPermission(
	new Action(UPDATE, accidents, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

////////////
// DELETE //
////////////

keyManagerRole.addPermission(
	new Action(DELETE, accidents, ({ accessor, target }: any) => {
		try {
			if (
				accessor.clientId &&
				accessor.clientId === target.clientId &&
				target.approved === false
			) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

///////////////////////
// ADMIN ROLE CONFIG //
///////////////////////

////////////
// CREATE //
////////////

adminRole.addPermission(
	new Action(CREATE, users, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(CREATE, categories, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

////////////
//  READ  //
////////////

adminRole.addPermission(
	new Action(READ, bookings, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.user.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(UPDATE, bookings, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.user.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(READ, locations, ({ accessor, target }: any) => {
		try {
			if (
				accessor.clientId &&
				target.clients.find(client => client.id === accessor.clientId)
			) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(READ, users, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(READ, vehicles, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(READ, accidents, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(READ, categories, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

////////////
// UPDATE //
////////////

adminRole.addPermission(
	new Action(UPDATE, users, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(
		UPDATE,
		vehicles,
		({ accessor, target }: any) => {
			try {
				if (accessor.clientId && accessor.clientId === target.clientId) {
					return true;
				}
				return false;
			} catch (e) {
				console.error(e);
				return false;
			}
		},
		["objectId", "plateNumber", "vin", "wialonUnitId"]
	)
);

adminRole.addPermission(
	new Action(UPDATE, accidents, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(UPDATE, categories, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

////////////
//  DELETE  //
////////////

adminRole.addPermission(
	new Action(DELETE, categories, ({ accessor, target }: any) => {
		try {
			if (accessor.clientId && accessor.clientId === target.clientId) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

adminRole.addPermission(
	new Action(DELETE, bookings, ({ accessor, target }: any) => {
		try {
			if (
				accessor.clientId &&
				accessor.clientId === target.user.clientId &&
				target.approved === false
			) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);

////////////////////////
// MASTER ROLE CONFIG //
////////////////////////

masterRole.addPermission(new Action(CREATE, users));
masterRole.addPermission(new Action(CREATE, vehicles));
masterRole.addPermission(new Action(CREATE, clients));
masterRole.addPermission(new Action(CREATE, locations));
masterRole.addPermission(new Action(CREATE, categories));

masterRole.addPermission(new Action(READ, users));
masterRole.addPermission(new Action(READ, vehicles));
masterRole.addPermission(new Action(READ, bookings));
masterRole.addPermission(new Action(READ, clients));
masterRole.addPermission(new Action(READ, accidents));
masterRole.addPermission(new Action(READ, locations));
masterRole.addPermission(new Action(READ, categories));

masterRole.addPermission(new Action(UPDATE, users));
masterRole.addPermission(new Action(UPDATE, vehicles));
masterRole.addPermission(new Action(UPDATE, bookings));
masterRole.addPermission(new Action(UPDATE, clients));
masterRole.addPermission(new Action(UPDATE, accidents));
masterRole.addPermission(new Action(UPDATE, locations));
masterRole.addPermission(new Action(UPDATE, categories));

masterRole.addPermission(new Action(DELETE, users));
masterRole.addPermission(new Action(DELETE, vehicles));
masterRole.addPermission(
	new Action(DELETE, bookings, ({ accessor, target }: any) => {
		try {
			if (target.approved === false) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	})
);
masterRole.addPermission(new Action(DELETE, clients));
masterRole.addPermission(new Action(DELETE, accidents));
masterRole.addPermission(new Action(DELETE, locations));
masterRole.addPermission(new Action(DELETE, categories));

accessControl.addRole(masterRole);
accessControl.addRole(adminRole);
accessControl.addRole(keyManagerRole);
accessControl.addRole(guestRole);

export default accessControl;

export const roles = {
	admin: adminRole,
	keyManager: keyManagerRole,
	guest: guestRole,
	master: masterRole
};

export const resources = {
	bookings: bookings,
	vehicles: vehicles,
	locations: locations,
	users: users,
	accidents: accidents,
	clients: clients
};
