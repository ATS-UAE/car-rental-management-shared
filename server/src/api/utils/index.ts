import { Schema } from "yup";
import { Role } from "../../variables/enums";
import { UserAttributes } from "../../models";

export * from "./ApiErrorHandler";
export * from "./FormErrorBuilder";

export const notInRoles = <T>(schema: Schema<T>, roles: Role[]) => (
	value: unknown,
	options: { context: { user: UserAttributes } }
) => {
	return roles.includes(options.context.user.role)
		? schema
		: schema.strip(true);
};
