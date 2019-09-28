"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../utils/helpers");
const mail_1 = require("../utils/mail");
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const disallowGuests_1 = __importDefault(require("../middlewares/disallowGuests"));
const models_1 = __importDefault(require("../models"));
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.use(disallowGuests_1.default);
//TODO: check if email already exists in DB.
// Send an invite to an email
router.post("/", async ({ body, user }, res) => {
    let response = new helpers_1.ResponseBuilder();
    // Check if email is provided.
    if (body.email) {
        // Send email invite
        try {
            let existingEmail = await models_1.default.User.findOne({
                where: { email: body.email }
            });
            if (!existingEmail) {
                await mail_1.sendInvite({ email: body.email, clientId: user.clientId });
                response.handleSuccess(`Invite has been sent to ${body.email}`, res);
            }
            else {
                throw new Error("Email is already registered.");
            }
        }
        catch (e) {
            response.handleError(e, res);
        }
    }
    else {
        response.setMessage("Please provide an email address.");
        response.setCode(422);
    }
    res.json(response);
});
exports.default = router;
