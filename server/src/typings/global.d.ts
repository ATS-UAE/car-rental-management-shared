import { ValidateOptions, Schema, Lazy } from "yup";
import { User as UserModel } from "../models";

declare global {
	namespace Express {
		interface User extends UserModel {}
		interface Request {
			user?: User;
		}
	}
}

declare module "yup" {
	export function lazy<T>(
		fn: (value: T, options: ValidateOptions) => Schema<T>
	): Lazy;
}
