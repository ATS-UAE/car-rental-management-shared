import { ObjectSchema } from "yup";
import { ReplaceAttributes } from "../../../shared/typings";
import { User } from "../../models";
import { API_OPERATION } from "..";

type SchemaCallBack<
	Target,
	Data,
	Attributes extends object,
	Enhancement extends object
> = (data: {
	user: User;
	target: Target;
	operation: API_OPERATION;
	data: Data;
	casting?: boolean;
	schema: ObjectSchema<Attributes>;
}) => ObjectSchema<ReplaceAttributes<Attributes, Enhancement>>;

export class YupValidatorBuilder<Attributes extends object = {}> {
	constructor(public baseSchema: ObjectSchema<Attributes>) {}

	public read = <Target, Data, ReplacementAttributes extends object>(
		schemaBuilder: SchemaCallBack<
			Target,
			Data,
			Attributes,
			ReplacementAttributes
		>
	) => {
		this.baseSchema = this.baseSchema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			([user, operation, target, data, casting, schema]) => {
				if (operation === API_OPERATION.READ) {
					schema = schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
			}
		);

		return this;
	};

	public update = <Target, Data, ReplacementAttributes extends object>(
		schemaBuilder: SchemaCallBack<
			Target,
			Data,
			Attributes,
			ReplacementAttributes
		>
	) => {
		this.baseSchema = this.baseSchema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			([user, operation, target, data, casting, schema]) => {
				if (operation === API_OPERATION.UPDATE) {
					schema = schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
			}
		);

		return this;
	};

	public destroy = <Target, Data, ReplacementAttributes extends object>(
		schemaBuilder: SchemaCallBack<
			Target,
			Data,
			Attributes,
			ReplacementAttributes
		>
	) => {
		this.baseSchema = this.baseSchema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			([user, operation, target, data, casting, schema]) => {
				if (operation === API_OPERATION.DELETE) {
					schema = schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
			}
		);

		return this;
	};

	public create = <Target, Data, ReplacementAttributes extends object>(
		schemaBuilder: SchemaCallBack<
			Target,
			Data,
			Attributes,
			ReplacementAttributes
		>
	) => {
		this.baseSchema = this.baseSchema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			([user, operation, target, data, casting, schema]) => {
				if (operation === API_OPERATION.CREATE) {
					schema = schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
			}
		);

		return this;
	};

	public any = <
		Target = unknown,
		Data = unknown,
		ReplacementAttributes extends object = any
	>(
		schemaBuilder: SchemaCallBack<
			Target,
			Data,
			Attributes,
			ReplacementAttributes
		>
	) => {
		this.baseSchema = this.baseSchema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			([user, operation, target, data, casting, schema]) => {
				schema = schemaBuilder({
					user,
					target,
					operation,
					data,
					casting,
					schema
				});
			}
		);

		return this;
	};

	get schema() {
		return this.baseSchema;
	}
}
