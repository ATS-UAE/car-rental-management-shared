import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../exceptions";
export default class ResponseBuilder {
	private code: number = 500;
	private errors: string[] = [];
	private message: string = "Unknown server error.";
	private success: boolean = false;
	private data: any = null;
	setData(data: any) {
		this.data = data;
	}

	setSuccess(success: boolean) {
		this.success = success;
	}

	appendError(error: string) {
		this.errors.push(error);
	}

	setCode(code: number) {
		this.code = code;
	}

	setMessage(message: string) {
		this.message = message;
	}

	handleError(e: any, res: any) {
		if (e instanceof InvalidPermissionException) {
			this.setCode(422);
			res.status(422);
		} else if (e instanceof ResourceNotFoundException) {
			this.setCode(404);
			res.status(404);
		} else {
			this.setCode(403);
			res.status(403);
		}
		this.setMessage(e.message);
		if (e.errors && e.errors.length > 0) {
			e.errors.forEach((error: any) => this.appendError(error.path));
		}
	}

	handleSuccess(res: any, message: string) {
		this.setMessage(message);
		this.setCode(200);
		this.setSuccess(true);
		res.status(200);
	}

	toObject() {
		const { message, code, errors, success, data } = this;
		return { message, code, errors, success, data };
	}
}
