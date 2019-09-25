import { Role } from "./enums";

export interface Permission {
	[key: string]: Role[];
}

export const permission: Permission = {
	INVITE: [Role.ADMIN, Role.KEY_MANAGER, Role.MASTER]
};
