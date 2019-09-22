import { Role } from "../../variables/enums";

type userAccessor = {
	id: number;
	role: { name: Role; id?: number };
	[key: string]: any;
};

export default userAccessor;
