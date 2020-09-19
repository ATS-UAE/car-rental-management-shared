import { Role } from "..";

export interface UserAttributes {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string;
	lastLogin: Date | null;
	userImageSrc: string | null;
	licenseImageSrc: string | null;
	blocked: boolean;
	emailConfirmed: boolean;
	clientId: number | null;
	role: Role;
	timeZone: string;

	readonly createdAt: Date;
	readonly updatedAt: Date | null;
}
