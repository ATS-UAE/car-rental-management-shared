import { ObjectSchema } from "yup";
import { FieldError, FormException } from "../api/exceptions";

interface FormErrorBuilderRequiredField {
	value: any;
}

export class FormErrorBuilder {
	public fields: FieldError[] = [];

	public add = (field: string, message: string) => {
		this.fields.push({ field, message });
	};

	public addIf = (condition: boolean, field: string, message: string) => {
		if (condition) {
			this.add(field, message);
		}
	};

	public throw(message: string = "An error has occured in one of the fields.") {
		if (this.fields.length) {
			throw new FormException(message, this.fields);
		}
	}
}
