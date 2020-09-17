import { Role } from "..";

export interface UserAttributes {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string;
	contractNo: string | null;
	objectNo: string | null;
	lastLogin: Date | null;
	userImageSrc: string | null;
	licenseImageSrc: string | null;
	blocked: boolean;
	emailConfirmed: boolean;
	clientId: number | null;
	role: Role;
	userCreatorId: number;
	timeZone: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}
