import { validate } from "class-validator";

export default class InvalidInputException extends Error {
	fields: string[];
	constructor(message: string, fields: string[] = []) {
		super(message);
		this.fields = fields;
	}
	static validate = async (data: Object) => {
		const errors = await validate(data);

		if (errors.length) {
			throw new InvalidInputException(
				"Incorrect inputs",
				errors.map(e => e.property)
			);
		}
	};
}
