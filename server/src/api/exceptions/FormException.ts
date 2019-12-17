export interface FieldError {
	field: string;
	message: string;
}

export class FormException extends Error {
	constructor(message: string, public fields: FieldError[]) {
		super(message);
	}
}
