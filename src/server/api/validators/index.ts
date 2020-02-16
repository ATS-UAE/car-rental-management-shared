import { User } from "../../models";
import { API_OPERATION } from "../";
import { ObjectSchema } from "yup";

export * from "./Booking";
export * from "./Vehicle";
export * from "./User";

export class Validator<Schema extends object, Target, NewData> {
	constructor(
		private schema: ObjectSchema<Schema>,
		private user: User,
		private operation: API_OPERATION,
		private target?: Target
	) {}

	public cast = (value: unknown): Schema => {
		const { user, operation, schema, target } = this;

		return schema.cast(value, {
			stripUnknown: true,
			context: {
				user,
				operation,
				target,
				data: value,
				casting: true
			}
		});
	};

	public validate = (value: unknown) => {
		const { user, operation, schema, target } = this;
		return schema.validate(value, {
			abortEarly: false,
			context: {
				user,
				operation,
				target: target,
				data: value,
				casting: false
			}
		});
	};
}

export class DataCaster<Attributes extends object> {
	constructor(private schema: ObjectSchema<Attributes>, private user: User) {}

	public cast = (data: unknown): Attributes => {
		return this.schema.cast(data, {
			context: {
				operation: API_OPERATION.READ,
				user: this.user
			}
		});
	};
}
