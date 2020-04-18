import * as yup from "yup";
import { Role } from "../../../../shared/typings";
import { User } from "../../../models";
import { Schema } from "express-validator";

type SchemaHelper<T> = (schema: T) => T;

type TestSchemaHelper = (
	this: yup.TestContext,
	value?: any
) => boolean | yup.ValidationError | Promise<boolean | yup.ValidationError>;

/**
 * @param schema Yup schema
 * @param stripFound
 * @value true - strip field if found.
 * @value false - strip field if not found.
 * @param roles roles to search.
 */
export const requireRole = <T>(roles: Role[]): TestSchemaHelper =>
	function() {
		const user = this.options.context["user"] as User;
		const exists = roles.includes(user.role);

		if (!exists) {
			return false;
		}

		return true;
	};

/**
 * @param key Key of object where the user Id will be compared.
 */
export const selfOnly = (key: string = "userId"): TestSchemaHelper =>
	function(value) {
		const user = this.options.context["user"] as User;
		if (value[key] === user.id) {
			return true;
		}
	};

/**
 * @param schema Yup schema
 * @param stripFound
 * @value true - strip field if found.
 * @value false - strip field if not found.
 * @param roles roles to search.
 */
export const stripField = <T extends yup.Schema<any>>(
	schema: T,
	roles: Role[],
	stripFound: boolean = false
): yup.Lazy => {
	return yup.lazy<T>((value, options) => {
		const user = options.context["user"] as User;
		const exists = roles.includes(user.role);

		if (exists && stripFound) {
			return yup.mixed().strip(true);
		} else if (!exists && !stripFound) {
			return yup.mixed().strip(true);
		}
		return schema;
	});
};
