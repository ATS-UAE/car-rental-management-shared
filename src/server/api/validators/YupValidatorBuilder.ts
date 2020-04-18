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
	constructor(public schema: ObjectSchema<Attributes>) {}

	public getSchema = () => {
		return this.schema;
	};

	public read = <Target, Data, ReplacementAttributes extends object>(
		schemaBuilder: SchemaCallBack<
			Target,
			Data,
			Attributes,
			ReplacementAttributes
		>
	) => {
		this.schema = this.schema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			function(
				user: User,
				operation: API_OPERATION,
				target: Target,
				data: Data,
				casting: boolean,
				schema: ObjectSchema<Attributes>
			) {
				if (operation === API_OPERATION.READ) {
					return schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
				return schema;
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
		this.schema = this.schema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			function(
				user: User,
				operation: API_OPERATION,
				target: Target,
				data: Data,
				casting: boolean,
				schema: ObjectSchema<Attributes>
			) {
				if (operation === API_OPERATION.UPDATE) {
					return schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
				return schema;
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
		this.schema = this.schema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			function(
				user: User,
				operation: API_OPERATION,
				target: Target,
				data: Data,
				casting: boolean,
				schema: ObjectSchema<Attributes>
			) {
				if (operation === API_OPERATION.DELETE) {
					return schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
				return schema;
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
		this.schema = this.schema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			function(
				user: User,
				operation: API_OPERATION,
				target: Target,
				data: Data,
				casting: boolean,
				schema: ObjectSchema<Attributes>
			) {
				if (operation === API_OPERATION.CREATE) {
					return schemaBuilder({
						user,
						target,
						operation,
						data,
						casting,
						schema
					});
				}
				return schema;
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
		this.schema = this.schema.when(
			["$user", "$operation", "$target", "$data", "$casting"],
			function(
				user: User,
				operation: API_OPERATION,
				target: Target,
				data: Data,
				casting: boolean,
				schema: ObjectSchema<Attributes>
			) {
				return schemaBuilder({
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
}
