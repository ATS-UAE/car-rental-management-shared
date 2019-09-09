"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    let BookingType = sequelize.define("BookingType", {
        name: { type: DataTypes.STRING, unique: true, allowNull: false }
    });
    return BookingType;
};
