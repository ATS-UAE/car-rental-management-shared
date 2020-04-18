import { User as UserModel, Location as LocationModel } from "../models";
import {
	UserServerResponseGet,
	ExtractServerResponseData,
	Role
} from "../../shared/typings";
import { Castable, API_OPERATION, Location } from ".";
import { User as UserValidators } from "./validators";
import {
	ResourceNotFoundException,
	InvalidPermissionException
} from "./exceptions";

export class User
	implements Castable<ExtractServerResponseData<UserServerResponseGet>> {
	constructor(public data: UserModel) {}
	public cast = (user: UserModel) =>
		UserValidators.getValidator(user, API_OPERATION.READ).cast(this.data);

	public static get = async (user: UserModel, id: number) => {
		const foundUser = await UserModel.findByPk(id);
		if (!foundUser) {
			throw new ResourceNotFoundException();
		}

		if (user.role === Role.MASTER) {
			return new User(foundUser);
		} else if (
			[Role.ADMIN, Role.KEY_MANAGER].includes(user.role) &&
			user.clientId === foundUser.clientId
		) {
			return new User(foundUser);
		} else if (user.role === Role.GUEST && user.id === foundUser.id) {
			return new User(foundUser);
		}
		throw new InvalidPermissionException();
	};
}
