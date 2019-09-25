"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
exports.addReplacedFiles = (res, { url, model, field }) => {
    res.locals.replacedFiles
        ? res.locals.replacedFiles.push({ url, model, field })
        : (res.locals.replacedFiles = [{ url, model, field }]);
};
exports.deleteReplacedFiles = async (req, { locals }, next) => {
    if (locals.replacedFiles) {
        for (let file of locals.replacedFiles) {
            if (file.url && file.model && file.field) {
                file.model
                    .findAll({
                    where: {
                        [file.field]: file.url
                    }
                })
                    .then(found => {
                    if (!found.length) {
                        helpers_1.deleteFileFromUrl(file.url);
                    }
                });
            }
        }
    }
    next();
};
exports.default = exports.deleteReplacedFiles;
