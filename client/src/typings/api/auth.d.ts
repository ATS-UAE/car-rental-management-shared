import { Role } from "../../variables/enums";
export interface Auth {
	id: number;
	role: {
		id: number;
		name: Role;
	};
}
