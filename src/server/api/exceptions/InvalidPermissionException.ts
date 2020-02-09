import { ApiException } from ".";

export class InvalidPermissionException extends ApiException {
	constructor(message: string) {
		super(message);
	}
}
