const ROLES = {
	ADMIN: "ADMIN",
	KEY_MANAGER: "KEY_MANAGER",
	GUEST: "GUEST"
};

const RESOURCES = {
	BOOKINGS: "BOOKINGS",
	LOCATIONS: "LOCATIONS",
	VEHICLES: "VEHICLES",
	USERS: "USERS",
	ROLES: "ROLES"
};

const errorCodes = {
	UNAUTHORIZED: {
		message: "You do not have the permission to access this resource.",
		statusCode: 403
	}
};

module.exports = { ROLES, RESOURCES, errorCodes };
