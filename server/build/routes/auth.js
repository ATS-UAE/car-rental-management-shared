"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const check_1 = require("express-validator/check");
const helpers_1 = require("../utils/helpers");
const mail_1 = require("../utils/mail");
const models_1 = __importDefault(require("../models"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const config_1 = __importDefault(require("../config"));
const { secretKey } = config_1.default;
const router = express_1.default.Router();
router.get("/me", requireLogin_1.default, function (req, res) {
    let response = new helpers_1.ResponseBuilder();
    response.setData(req.user);
    response.setMessage("You are logged in.");
    response.setSuccess(true);
    response.setCode(200);
    res.json(response);
});
router.patch("/me", async function ({ user, body }, res) {
    let response = new helpers_1.ResponseBuilder();
    let me = await models_1.default.User.findByPk(user.id);
    if (me) {
        if (body.password && body.passwordOld) {
            let samePassword = await bcryptjs_1.default.compare(body.password, me.password);
            if (!samePassword) {
                let validOldPassword = await bcryptjs_1.default.compare(body.passwordOld, me.password);
                let newPassword = await bcryptjs_1.default.hash(body.password, 10);
                if (validOldPassword) {
                    await me.update({ password: newPassword });
                    response.setCode(200);
                    response.setMessage("Successfully updated.");
                    response.setSuccess(true);
                }
                else {
                    response.setCode(400);
                    response.setMessage("Invalid old password.");
                    res.status(400);
                }
            }
            else {
                response.setCode(400);
                response.setMessage("Old password is same as the new one.");
                res.status(400);
            }
        }
    }
    else {
        response.setCode(401);
        response.setMessage("Unauthorized. Are you logged in?");
        res.status(401);
    }
    res.json(response);
});
router.post("/login", function (req, res, next) {
    passport_1.default.authenticate("local", function (err, user, info) {
        let response = new helpers_1.ResponseBuilder();
        if (err) {
            response.setMessage(err.message);
            response.setCode(401);
            res.status(401);
            return res.json(response);
        }
        if (!user) {
            response.setMessage("Invalid login details");
            response.setCode(401);
            res.status(401);
            return res.json(response);
        }
        req.logIn(user, function (err) {
            // TODO: Updated last login in user.
            models_1.default.User.findByPk(user.id).then(user => {
                user.update({ lastLogin: moment_1.default().format("YYYY-MM-DD HH:mm:ss") });
            });
            if (err) {
                return next(err);
            }
            response.handleSuccess("Logged in successfully", res);
            return res.json(response.toObject());
        });
    })(req, res, next);
}, function (req, res) {
    res.json(req.user);
});
router.get("/logout", function (req, res) {
    let response = new helpers_1.ResponseBuilder();
    response.setCode(200);
    response.setMessage("Successfully logged out.");
    response.setSuccess(true);
    req.logout();
    res.status(200);
    res.send(response);
});
router.post("/forgot", check_1.oneOf([
    check_1.check("email")
        .exists({ checkNull: true })
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email"),
    [
        check_1.check("token")
            .exists({ checkNull: true })
            .withMessage("You do not have a reset token."),
        check_1.check("password")
            .exists({ checkNull: true })
            .isLength({ min: 8, max: 32 })
            .withMessage("A new password should be provided")
    ]
]), async function (req, res) {
    const response = new helpers_1.ResponseBuilder();
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        for (let error of errors.array())
            response.appendError(error.msg);
        response.setMessage("Invalid fields");
        response.setCode(422);
        return res.status(422).json(response);
    }
    const { email, token, password } = req.body;
    if (token) {
        try {
            const validToken = jsonwebtoken_1.default.verify(token, secretKey);
            if (validToken && validToken.passwordReset) {
                const user = await models_1.default.User.findOne({
                    where: { email: validToken.email }
                });
                const newPassword = await bcryptjs_1.default.hash(password, 10);
                await user.update({ password: newPassword });
                response.setSuccess(true);
                response.setMessage("Password has been reset.");
                response.setCode(401);
                return res.json(response);
            }
        }
        catch (e) {
            response.setSuccess(true);
            response.setMessage("Invalid token");
            response.setCode(422);
            return res.status(401).json(response);
        }
    }
    else if (email) {
        const foundEmail = await models_1.default.User.findOne({ where: { email } });
        if (foundEmail) {
            mail_1.sendPasswordResetToken({
                email,
                url: `${process.env.CLIENT_URL}/login/forgot`
            })
                .then(() => {
                response.setSuccess(true);
                response.setMessage("A reset code has been sent.");
                response.setCode(200);
                return res.json(response);
            })
                .catch(e => {
                console.log(e);
                response.setMessage("Unknown error.");
                response.setCode(500);
                return res.status(500).json(response);
            });
        }
        else {
            response.setMessage("Email is not registered.");
            response.setCode(404);
            return res.status(404).json(response);
        }
    }
});
exports.default = router;
