import { Role } from "../../variables/enums";
export interface UserResponse extends User {}

export interface User {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	clientId: number;
	role: Role;
	mobileNumber: string;
	email: string;
	createdAt: number;
	updatedAt: number;
}
