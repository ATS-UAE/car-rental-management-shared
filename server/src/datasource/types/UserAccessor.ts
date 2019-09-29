import { Role } from "../../variables/enums";

interface UserAccessor {
	id: number;
	role: { name: Role; id?: number };
	[key: string]: any;
}

export default UserAccessor;
