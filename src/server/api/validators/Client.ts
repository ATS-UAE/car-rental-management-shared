import * as yup from "yup";
import { User } from "../../models";
import { Role } from "../../../shared/typings";

export abstract class Client {
	static create = yup
		.object()
		.shape({
			name: yup.string().required(),
			users: yup.array(yup.number()).default([]),
			vehicles: yup.array(yup.number()).default([]),
			categories: yup.array(yup.number()).default([]),
			locations: yup.array(yup.number()).default([])
		})
		.test(
			"permission",
			"You do not have the permission to do this",
			function() {
				const user = this.options.context["user"] as User;

				if (user.role === Role.MASTER) {
					return true;
				}
				return false;
			}
		);

	static update = yup
		.object()
		.shape({
			name: yup.string(),
			users: yup.array(yup.number()),
			vehicles: yup.array(yup.number()),
			categories: yup.array(yup.number()),
			locations: yup.array(yup.number())
		})
		.test(
			"permission",
			"You do not have the permission to do this",
			function() {
				const user = this.options.context["user"] as User;

				if (user.role === Role.MASTER) {
					return true;
				}
				return false;
			}
		);
}
