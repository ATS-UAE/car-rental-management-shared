"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    let Accident = sequelize.define("Accident", {
        message: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notNull: { msg: "Message is required." }
            }
        },
        accidentImageSrc: {
            type: DataTypes.STRING
        },
        accidentVideoSrc: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.FLOAT
        },
        lng: {
            type: DataTypes.FLOAT
        }
    });
    Accident.associate = models => {
        models.Accident.belongsTo(models.User, {
            foreignKey: {
                name: "userId"
            },
            as: "user",
            allowNull: false,
            validate: {
                notNull: { msg: "User is required." }
            }
        });
        models.Accident.belongsTo(models.Vehicle, {
            foreignKey: { name: "vehicleId" },
            as: "vehicle",
            allowNull: false,
            validate: {
                notNull: { msg: "Vehicle is required." }
            }
        });
        models.Accident.belongsTo(models.Booking, {
            foreignKey: { name: "bookingId" },
            as: "booking",
            allowNull: false,
            validate: {
                notNull: { msg: "Booking is required." }
            }
        });
        models.Accident.belongsToMany(models.User, {
            through: models.AccidentUserStatus,
            as: "userStatus",
            foreignKey: "accidentId"
        });
    };
    return Accident;
};
