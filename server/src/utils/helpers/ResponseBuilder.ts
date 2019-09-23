import { Response } from "express";
import {
	InvalidPermissionException,
	ResourceNotFoundException,
	InvalidInputException
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

	handleError(e: any, res: Response) {
		if (e instanceof InvalidPermissionException) {
			this.setCode(422);
			res.status(422);
		} else if (e instanceof ResourceNotFoundException) {
			this.setCode(404);
			res.status(404);
		} else if (e instanceof InvalidInputException) {
			this.setCode(403);
			res.status(403);
		} else {
			res.status(500);
		}
		this.setMessage(e.message);
		if (e.fields && e.fields.length > 0) {
			e.fields.forEach((error: string) => this.appendError(error));
		}
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
