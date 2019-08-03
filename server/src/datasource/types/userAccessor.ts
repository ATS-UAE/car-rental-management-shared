import UserTypes from "../../variables/enums/UserType";

type userAccessor = {
	id: number;
	role: { name: UserTypes; id?: number };
	[key: string]: any;
};

export default userAccessor;
