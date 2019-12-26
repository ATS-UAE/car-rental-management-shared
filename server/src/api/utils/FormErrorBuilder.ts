import { FieldError, FormException } from "../exceptions";

export class FormErrorBuilder {
	public fields: FieldError[] = [];

	public add = (field: string, message: string) => {
		this.fields.push({ field, message });
		return this;
	};

	public addIf = (condition: boolean, field: string, message: string) => {
		if (condition) {
			this.add(field, message);
		}
		return this;
	};

	public throw(message: string = "An error has occured in one of the fields.") {
		if (this.fields.length) {
			throw new FormException(message, this.fields);
		}
	}
}