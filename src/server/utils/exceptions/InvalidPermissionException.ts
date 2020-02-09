export default class InvalidPermissionException extends Error {
	constructor(
		message: string = "You do not have the permission to access this resource."
	) {
		super(message);
	}
}
