import { ApiException } from ".";

export interface FieldError {
	field: string;
	message: string;
	name: string;
}
export class FormException extends ApiException {
	constructor(message: string, public fields: FieldError[]) {
		super(message);
	}
	public throw = () => {
		if (this.fields) {
			throw this;
		}
	};
}
