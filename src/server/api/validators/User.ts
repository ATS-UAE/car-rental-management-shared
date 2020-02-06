import * as yup from "yup";
import { User as UserModel } from "../../models";
import { Role } from "../../variables/enums";
import { InviteToken } from "../../typings";

export abstract class User {
	public static create = yup
		.object()
		.shape({
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
		})
		.test("permission", "You do not have the permission to do this.", function(
			v
		) {
			const user = this.options.context["user"] as UserModel;
			const token = this.options.context["token"] as InviteToken;

			if (user.role === Role.GUEST) {
				if (token) {
					return true;
				}
			} else if (user.role === Role.ADMIN) {
				if (v.clientId === user.clientId) {
					return true;
				}
			} else if (user.role === Role.MASTER) {
				return true;
			}
			return false;
		});

	public static update = yup.object().shape({
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
}
