import { Role } from "../../variables/enums";
import { Category } from ".";
export interface Auth {
	id: number;
	role: Role;
	clientId: number;
	categories: Category[];
}
