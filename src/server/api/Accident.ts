import { Castable, API_OPERATION } from ".";
import { AccidentAttributes, Role } from "../../shared/typings";
import { User, Accident as AccidentModel, Vehicle } from "../models";
import { Accident as AccidentValidator } from "./validators";
import {
	InvalidPermissionException,
	ResourceNotFoundException,
	FormException
} from "./exceptions";
import { UseParameters } from ".";

type CreateAccidentOptions = UseParameters<
	AccidentAttributes,
	"message" | "accidentImageSrc" | "lat" | "lng" | "userId" | "bookingId",
	"accidentVideoSrc"
>;

export class Accident implements Castable<Partial<AccidentAttributes>> {
	constructor(public data: AccidentModel) {}

	public cast = (user: User) =>
		AccidentValidator.getValidator(user, API_OPERATION.READ).cast(this.data);

	public static getAll = async (user: User) => {
		let accidents: AccidentModel[];

		if (user.role === Role.MASTER) {
			accidents = await AccidentModel.findAll();
		} else if ([Role.ADMIN, Role.KEY_MANAGER].includes(user.role)) {
			accidents = await AccidentModel.findAll({
				include: [
					{
						model: User,
						where: {
							clientId: user.clientId
						}
					}
				]
			});
		} else if (user.role === Role.GUEST) {
			accidents = await AccidentModel.findAll({
				where: {
					userId: user.id
				}
			});
		} else {
			throw new InvalidPermissionException(
				"You do not have the permission to access accidents."
			);
		}
		return accidents.map(a => new Accident(a));
	};

	public static get = async (user: User, id: number) => {
		let accident = await AccidentModel.findByPk(id, {
			include: [User]
		});
		if (!accident) {
			throw new ResourceNotFoundException(
				`Accident with ID ${id} is not found.`
			);
		}

		if (user.role === Role.MASTER) {
			return new Accident(accident);
		} else if ([Role.KEY_MANAGER, Role.ADMIN].includes(user.role)) {
			if (accident.user.clientId === user.clientId) {
				return new Accident(accident);
			}
		} else if (user.role === Role.GUEST) {
			if (accident.userId === user.id) {
				return new Accident(accident);
			}
		}
		throw new InvalidPermissionException("You cannot access this resource.");
	};

	public static create = async (user: User, options: CreateAccidentOptions) => {
		const validator = AccidentValidator.getValidator(
			user,
			API_OPERATION.CREATE
		);
		try {
			await validator.validate(options);
		} catch (e) {
			FormException.handleFieldErrors(e);
		}
	};
}
