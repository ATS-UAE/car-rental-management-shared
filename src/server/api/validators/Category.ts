import * as yup from "yup";
import { Client, User } from "../../models";
import { Role } from "../../../shared/typings";

export abstract class Category {
	public static create = yup
		.object()
		.shape({
			name: yup.string().required(),
			clientId: yup
				.number()
				.required()
				.test("db-exist", "Client does not exist.", async function(v) {
					const client = await Client.findByPk(v);

					return Boolean(client);
				})
		})
		.test("permisssion", "You do not have the permission to do this.", function(
			v
		) {
			const user = this.options.context["user"] as User;
			if (user.role === Role.MASTER) {
				return true;
			} else if (user.role === Role.ADMIN && user.clientId === v.clientId) {
				return true;
			}
			return false;
		});

	public static update = yup.object().shape({
		name: yup.string(),
		clientId: yup
			.string()
			.test(
				"permission",
				"You do not have the permission to do this.",
				function(v) {
					const user = this.options.context["user"] as User;
					if (user.role === Role.KEY_MANAGER || user.role === Role.ADMIN) {
						if (v === user.clientId) {
							return true;
						}
					} else if (user.role === Role.MASTER) {
						return true;
					}
					return false;
				}
			)
	});
}
