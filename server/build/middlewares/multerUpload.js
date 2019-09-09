"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const helpers_1 = require("../utils/helpers");
const upload = (uploadPath, options) => {
    return multer_1.default({
        storage: multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                const filePath = path_1.default.join(helpers_1.getStaticFilesPath(), uploadPath);
                helpers_1.makeDirectoryIfNotExist(filePath)
                    .then(() => cb(null, filePath))
                    .catch(e => cb(e, filePath));
            },
            filename: function (req, file, cb) {
                console.log(file);
                cb(null, `${Date.now()}-${file.originalname}`); //use Date.now() for unique file keys
            }
        }),
        limits: Object.assign({ fileSize: 10000000 }, (options && options.limits))
    });
};
exports.default = upload;
