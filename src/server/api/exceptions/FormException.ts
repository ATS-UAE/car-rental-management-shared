import { ApiException } from ".";

export type FieldError =
	| {
			key: string;
			value: string;
			// TODO: Remove this
			name?: string;
	  }
	| string;
export class FormException extends ApiException {
	constructor(message: string, public fields: FieldError[]) {
		super(message);
	}
}
