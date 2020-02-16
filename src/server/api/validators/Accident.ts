import * as yup from "yup";
import { User, Accident as AccidentModel } from "../../models";
import { AccidentAttributes } from "../../../shared/typings";
import { Validator, YupValidatorBuilder } from ".";
import { API_OPERATION } from "..";

export abstract class Accident {
	public static getValidator = (
		user: User,
		operation: API_OPERATION,
		target?: AccidentModel
	) => new Validator(Accident.validatorSchema, user, operation, target);

	public static validatorSchema = new YupValidatorBuilder<
		Partial<AccidentAttributes>
	>(
		yup.object().shape({
			message: yup.string(),
			accidentImageSrc: yup.string(),
			lat: yup.number(),
			lng: yup.number(),
			userId: yup.number(),
			vehicleId: yup.number(),
			bookingId: yup.number()
		})
	)
		.read(({ schema }) => {
			return schema.shape({
				id: yup.number()
			});
		})
		.create(({ schema }) => {
			return schema.shape({
				message: yup.string().required("Message is required."),
				accidentImageSrc: yup.string().required("An image is required."),
				lat: yup.number().required("Please specify location."),
				lng: yup.number().required("Please specify location."),
				userId: yup.number().required("Booking user required."),
				vehicleId: yup.number().required("Vehicle required."),
				bookingId: yup.number().required("Booking required.")
			});
		}).schema;
}
