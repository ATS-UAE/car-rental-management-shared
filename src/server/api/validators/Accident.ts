import * as yup from "yup";
import { Op } from "sequelize";
import { User } from "../../models";
import { Role } from "../../../shared/typings";
import moment from "moment";

export abstract class Accident {
	static create = yup
		.object()
		.shape({
			message: yup.string().required(),
			accidentImageSrc: yup.string(),
			lat: yup.string().required(),
			lng: yup.string().required(),
			userId: yup.string().required(),
			vehicleId: yup.string().required(),
			bookingId: yup.string().required()
		})
		.test(
			"permission",
			"You do not have the permission to do this.",
			async function(v) {
				const user = this.options.context["user"] as User;

				if (user.role === Role.GUEST) {
					const userBookings = await user.$get("bookings", {
						where: {
							from: {
								[Op.lte]: moment().toDate()
							},
							to: {
								[Op.gte]: moment().toDate()
							},
							approved: true,
							finished: false
						}
					});
					for (const booking of userBookings) {
						if (
							booking.vehicleId === v.vehicleId &&
							booking.id === v.bookingId
						) {
							return true;
						}
					}
				}
				return false;
			}
		);
}
