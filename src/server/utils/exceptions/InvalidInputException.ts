export default class InvalidInputException extends Error {
	fields: string[];
	constructor(message: string, fields: string[] = []) {
		super(message);
		this.fields = fields;
	}
}
