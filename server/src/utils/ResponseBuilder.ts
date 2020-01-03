import { Response } from "express";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "./exceptions";
import { FormException, FieldError } from "../api/exceptions";
export default class ResponseBuilder<T = unknown> {
	constructor(
		private data: T = null,
		private success = false,
		private message = "Unknown server error.",
		private errors: FieldError[] = [],
		private code = 500
	) {}

	setData(data: T) {
		this.data = data;
	}

	setSuccess(success: boolean) {
		this.success = success;
	}

	appendError(error: FieldError) {
		this.errors.push(error);
	}

	setCode(code: number) {
		this.code = code;
	}

	setMessage(message: string) {
		this.message = message;
	}

	handleError(e: any, res: Response) {
		if (e instanceof InvalidPermissionException) {
			this.setCode(422);
			res.status(422);
		} else if (e instanceof ResourceNotFoundException) {
			this.setCode(404);
			res.status(404);
		} else if (e instanceof FormException) {
			e.fields.forEach(error => this.appendError(error));
			res.status(403);
		} else {
			res.status(500);
		}
		this.setMessage(e.message);
	}

	handleSuccess(message: string, res: Response) {
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
