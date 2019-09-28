"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    let Vehicle = sequelize.define("Vehicle", {
        objectId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { args: true, msg: "Object ID already in use!" }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Brand is required" }
            }
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Model is required" }
            }
        },
        plateNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { args: true, msg: "Plate number already in use!" }
        },
        vin: {
            type: DataTypes.STRING,
            unique: { args: true, msg: "VIN already in use!" }
        },
        defleeted: { type: DataTypes.BOOLEAN, defaultValue: false },
        parkingLocation: { type: DataTypes.STRING },
        vehicleImageSrc: { type: DataTypes.STRING }
    });
    Vehicle.associate = models => {
        models.Vehicle.belongsTo(models.Client, {
            as: "client",
            foreignKey: {
                name: "clientId",
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Please specify which client this vehicle belongs to."
                    }
                }
            }
        });
        models.Vehicle.belongsTo(models.Location, {
            as: "location",
            foreignKey: "locationId"
        });
        models.Vehicle.hasMany(models.Booking, {
            as: "bookings",
            foreignKey: "vehicleId"
        });
        models.Vehicle.belongsToMany(models.Category, {
            as: "categories",
            through: "VehicleCategories",
            foreignKey: "vehicleId",
            otherKey: "categoryId"
        });
    };
    return Vehicle;
};