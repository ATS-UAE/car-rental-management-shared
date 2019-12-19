import { DataBaseException } from "./";

export class ItemNotFoundException extends DataBaseException {
	constructor(message) {
		super(message);
	}
}
