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
	ENUMS: "ENUMS",
	INVITES: "INVITES",
	ACCIDENTS: "ACCIDENTS"
};

const BOOKING_TYPES = {
	PRIVATE: "PRIVATE",
	BUSINESS: "BUSINESS",
	SERVICE: "SERVICE",
	REPLACEMENT: "REPLACEMENT"
};

const BOOKING_STATUS = {
	PENDING: "PENDING", // When the booking is sent by the user.
	EXPIRED: "EXPIRED", // When the booking schedule has passed without being approved.
	APPROVED: "APPROVED", // When it is approved by the key manager / admin
	ONGOING: "ONGOING", // When the vehicle is picked up
	FINISHED: "FINISHED" // When the vehicle is returned
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
