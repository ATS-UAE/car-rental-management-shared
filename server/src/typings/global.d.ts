import { User as UserModel } from "../models";
declare global {
	namespace Express {
		interface User extends UserModel {}
		interface Request {
			user?: User;
		}
	}
}
