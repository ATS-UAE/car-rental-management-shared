import { ResponseBuilder } from "../utils";

export default function(req, res, next) {
	if (!req.user) {
		let response = new ResponseBuilder();
		response.setMessage("You are not authorized. Please login.");
		response.setCode(401);
		response.setSuccess(false);
		res.status(401);
		res.json(response);
	} else {
		next();
	}
}
