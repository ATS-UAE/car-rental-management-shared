import { Schema, ValidateOptions } from "yup";
import { Role } from "../../variables/enums";
import { User } from "../../models";

export * from "./ApiErrorHandler";
export * from "./FormErrorBuilder";

/**
 * @param schema Yup schema
 * @param stripFound
 * @value true - strip field if found.
 * @value false - strip field if not found.
 * @param roles roles to search.
 */

export const oneOfRoles = <T>(
	schema: Schema<T>,
	stripFound: boolean,
	roles: Role[]
) => (value: T, options: ValidateOptions): Schema<T> => {
	const user = options.context["user"] as User;
	const exists = roles.includes(user.role);

	if (exists && stripFound) {
		return schema.strip(true);
	} else if (!exists && !stripFound) {
		return schema.strip(true);
	}
	return schema;
};
