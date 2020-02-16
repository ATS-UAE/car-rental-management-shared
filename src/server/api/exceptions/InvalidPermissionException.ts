import { ApiException } from ".";

export class InvalidPermissionException extends ApiException {
	constructor(message: string = "You cannot access this resource.") {
		super(message);
	}
}
