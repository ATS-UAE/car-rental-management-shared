export * from "./utils";
export * from "./enums";
export * from "./models";
export * from "./api";

// TODO remove RBAC
export enum Operation {
	READ = "READ",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
	CREATE = "CREATE"
}

export enum Resource {
	BOOKINGS = "BOOKINGS",
	LOCATIONS = "LOCATIONS",
	VEHICLES = "VEHICLES",
	USERS = "USERS",
	ENUMS = "ENUMS",
	INVITES = "INVITES",
	ACCIDENTS = "ACCIDENTS",
	CLIENTS = "CLIENTS",
	CATEGORIES = "CATEGORIES"
}
