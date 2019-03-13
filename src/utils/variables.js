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

const BOOKING_TYPES = {
	PRIVATE: "PRIVATE",
	BUSINESS: "BUSINESS",
	SERVICE: "SERVICE"
};

const BOOKING_STATUS = {
	PENDING: "PENDING",
	ONGOING: "ONGOING",
	FINISHED: "FINISHED"
};
const errorCodes = {
	UNAUTHORIZED: {
		message: "You do not have the permission to access this resource.",
		statusCode: 403
	}
};

module.exports = {
	ROLES,
	RESOURCES,
	BOOKING_TYPES,
	BOOKING_STATUS,
	errorCodes
};
