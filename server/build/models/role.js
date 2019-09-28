"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    let Role = sequelize.define("Role", {
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
    return Role;
};
