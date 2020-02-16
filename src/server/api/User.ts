import { User as UserModel } from "../models";
import {
	UserServerResponseGet,
	ExtractServerResponseData
} from "../../shared/typings";
import { Castable, API_OPERATION } from ".";
import { User as UserValidators } from "./validators";

export class User
	implements Castable<ExtractServerResponseData<UserServerResponseGet>> {
	constructor(public data: UserModel) {}
	public cast = (user: UserModel) =>
		UserValidators.getValidator(user, API_OPERATION.READ).cast(this.data);
}
