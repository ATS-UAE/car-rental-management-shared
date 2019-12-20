import { ValidateOptions, Schema, Lazy } from "yup";
import { User as UserModel } from "../models";

declare global {
	namespace Express {
		interface User extends UserModel {}
		interface Request {
			user?: User;
		}
	}

	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_NAME: string;
			DATABASE_USERNAME: string;
			DATABASE_PASSWORD: string;
			DATABASE_HOST: string;
			DATABASE_PORT: string;
			MAIL_USER: string;
			MAIL_PASS: string;
			MAIL_PORT: string;
			MAIL_HOST: string;
			SERVER_PORT: string;
			SERVER_URL: string;
			SECRET_KEY: string;
		}
	}
}

declare module "yup" {
	export function lazy<T>(
		fn: (value: T, options: ValidateOptions) => Schema<T>
	): Lazy;
}
