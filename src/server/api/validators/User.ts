import * as yup from "yup";
import { User as UserModel, Vehicle as VehicleModel } from "../../models";
import {
	Role,
	UserServerParamsPatch,
	UserServerParamsPost,
	ExtractServerResponseData,
	UserAttributes,
	DatePropsToUnix,
	UserServerResponseGet
} from "../../../shared/typings";
import { InviteToken } from "../../typings";
import { API_OPERATION } from "..";
import { Validator } from ".";
import { YupValidatorBuilder } from "./YupValidatorBuilder";
import moment = require("moment");

export abstract class User {
	public static getValidator = (
		user: UserModel,
		operation: API_OPERATION,
		data?: {
			target?: VehicleModel;
			newData?:
				| ExtractServerResponseData<UserServerParamsPatch>
				| ExtractServerResponseData<UserServerParamsPost>;
		}
	) => new Validator(User.validatorSchema, user, operation, data);

	public static validatorSchema = new YupValidatorBuilder(
		yup.object<ExtractServerResponseData<UserServerResponseGet>>().shape({
			username: yup.string(),
			firstName: yup.string(),
			lastName: yup.string(),
			emaill: yup.string(),
			password: yup.string(),
			mobileNumber: yup.string(),
			userImageSrc: yup.string().nullable(),
			blocked: yup.boolean(),
			emailConfirmed: yup.boolean(),
			clientId: yup.number().nullable(),
			role: yup.mixed().oneOf(Object.values(Role)),
			timezone: yup.string()
		})
	)
		.read<never, never, { id: number; lastLogin: number | null }>(
			({ schema }) => {
				return schema.shape({
					id: yup.number(),
					lastLogin: yup
						.number()
						.nullable()
						.transform(
							(v, originalValue) =>
								(originalValue && moment(originalValue as Date).unix()) ||
								originalValue
						)
				});
			}
		)
		.create(({ schema }) => {
			return schema.shape({
				username: yup
					.string()
					.min(4)
					.required(),
				firstName: yup.string().required(),
				lastName: yup.string().required(),
				email: yup
					.string()
					.required()
					.when("$token", function(token: InviteToken, schema) {
						if (token?.email) {
							return schema.transform(() => token.email);
						}
						return schema;
					}),
				password: yup
					.string()
					.min(8)
					.required(),
				mobileNumber: yup.string().required(),
				userImageSrc: yup.string().nullable(),
				licenceImagesrc: yup.string().nullable(),
				blocked: yup.boolean(),
				clientId: yup
					.number()
					.nullable()
					.when("$token", function(token: InviteToken, schema) {
						if (token?.clientId) {
							return schema.transform(() => token.clientId);
						}
						return schema;
					}),
				role: yup.string().oneOf(Object.values(Role))
			});
		})
		.update(({ schema }) => {
			return schema.shape({
				username: yup.string(),
				firstName: yup.string(),
				lastName: yup.string(),
				email: yup.string(),
				password: yup.string(),
				mobileNumber: yup.string(),
				userImageSrc: yup.string().nullable(),
				blocked: yup.boolean(),
				role: yup.string().oneOf(Object.values(Role))
			});
		}).schema;
}
