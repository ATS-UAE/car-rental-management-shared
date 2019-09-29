import { Role } from "../../variables/enums";

type UserAccessor = {
	id: number;
	role: { name: Role; id?: number };
	[key: string]: any;
};

export default UserAccessor;
