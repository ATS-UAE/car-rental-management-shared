import { ApiException } from ".";

export class DataBaseException extends ApiException {
	constructor(message: string) {
		super(message);
	}
}
