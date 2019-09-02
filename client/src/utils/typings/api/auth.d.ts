import Role from "../../../variables/enums";
export interface IAuth {
	id: number;
	role: {
		id: number;
		name: Role;
	};
}
