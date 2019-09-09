"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../utils/helpers");
exports.default = async ({ file, files }, res, next) => {
    if (res.statusCode >= 400) {
        if (file) {
            if (file.url)
                helpers_1.deleteFileFromUrl(file.url);
            else if (file.path)
                fs_1.default.promises.unlink(file.path);
        }
        if (files) {
            for (const key in Object.keys(files)) {
                const file = files[key];
                if (file.url)
                    helpers_1.deleteFileFromUrl(file.url);
                else if (file.path)
                    fs_1.default.promises.unlink(file.path);
            }
        }
    }
    next();
};
