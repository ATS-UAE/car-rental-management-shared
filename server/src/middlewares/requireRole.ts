import { Handler } from "express";
import { ResponseBuilder } from "../utils";
import { RoleUtils } from "../utils";
import { Role } from "../variables/enums";

export const requireRole = (role: Role | Role[]): Handler => (
	req,
	res,
	next
) => {
	const response = new ResponseBuilder();
	if (
		req.user &&
		((role instanceof Array &&
			role.findIndex(role => req.user.role.name === role) >= 0) ||
			role === req.user.role.name)
	) {
		next();
	} else {
		response.setMessage("You are not authorized to access this resource.");
		response.setCode(401);
		response.setSuccess(false);
		res.status(401);
		res.json(response);
	}
};

export const requireHigherOrEqualRole = (role: Role): Handler => (
	req,
	res,
	next
) => {
	const response = new ResponseBuilder();
	if (req.user && RoleUtils.isRoleBetter(role, req.user.role.name)) {
		next();
	} else {
		response.setMessage("You are not authorized to access this resource.");
		response.setCode(401);
		response.setSuccess(false);
		res.status(401);
		res.json(response);
	}
};
