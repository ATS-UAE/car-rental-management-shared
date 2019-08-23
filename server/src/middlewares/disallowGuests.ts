import { Role } from "../variables/enums";
import { ResponseBuilder } from "../utils/helpers";

export default (req, res, next) => {
	if (req.user.role !== Role.GUEST) {
		next();
	} else {
		let response = new ResponseBuilder();
		response.setCode(401);
		response.setMessage("You are not authorized as a guest.");
		res.status(401);
		res.json(response);
	}
};