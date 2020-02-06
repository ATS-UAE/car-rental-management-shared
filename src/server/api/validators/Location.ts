import * as yup from "yup";
import { User } from "../../models";
import { Role } from "../../variables/enums";

export abstract class Location {
	static create = yup
		.object()
		.shape({
			name: yup.string().required(),
			lat: yup.number().required(),
			lng: yup.number().required(),
			address: yup.string().required(),
			locationImageSrc: yup.string()
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
			lat: yup.string().when("lng", {
				is: v => Boolean(v),
				then: yup.string().required()
			}),
			lng: yup.string().when("lat", {
				is: v => Boolean(v),
				then: yup.string().required()
			}),
			address: yup.string(),
			locationImageSrc: yup.string().nullable()
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
