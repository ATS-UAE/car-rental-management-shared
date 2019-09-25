import { Role } from "./roles";
export interface UserResponse extends User {}

export interface User {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	clientId: number;
	role: Role;
}
