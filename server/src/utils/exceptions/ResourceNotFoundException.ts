export default class InvalidPermissionException extends Error {
	constructor(message: string) {
		super(message);
	}
}
