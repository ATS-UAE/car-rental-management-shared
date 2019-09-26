import { Role } from "./enums";

const { ADMIN, KEY_MANAGER, MASTER, GUEST } = Role;

export interface Permission {
	[key: string]: Role[];
}

export const permission: Permission = {
	INVITE: [ADMIN, KEY_MANAGER, MASTER],
	CREATE_VEHICLE: [MASTER],
	UPDATE_VEHICLE: [ADMIN, MASTER, KEY_MANAGER],
	REPORT_ACCIDENTS: [GUEST],
	CREATE_LOCATIONS: [MASTER],
	UPDATE_LOCATIONS: [MASTER]
};
