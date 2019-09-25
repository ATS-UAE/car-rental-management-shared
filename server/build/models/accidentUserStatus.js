"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    let Accident = sequelize.define("AccidentUserStatus", {
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Accident;
};
