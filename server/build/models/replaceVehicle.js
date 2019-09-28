"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    let Vehicle = sequelize.define("ReplaceVehicle", {
        brand: {
            type: DataTypes.STRING
        },
        model: {
            type: DataTypes.STRING
        },
        plateNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vin: {
            type: DataTypes.STRING
        }
    });
    return Vehicle;
};
