const { toUnix } = require("../utils");

module.exports = (sequelize, DataTypes) => {
	let Booking = sequelize.define(
		"Booking",
		{
			paid: { type: DataTypes.BOOLEAN, defaultValue: false },
			amount: { type: DataTypes.FLOAT, defaultValue: null },
			from: { type: DataTypes.DATE, allowNull: false },
			to: { type: DataTypes.DATE, allowNull: false },
			// null means pending, false means denied, true means approved.
			approved: { type: DataTypes.BOOLEAN, defaultValue: null },
			finished: { type: DataTypes.BOOLEAN, defaultValue: false }
		},
		{
			hooks: {
				afterFind: results => {
					if (results) {
						let isArray = Array.isArray(results);
						if (isArray) {
							return results.map(result => {
								result.dataValues["from"] = toUnix(result["from"]);
								result.dataValues["to"] = toUnix(result["to"]);
							});
						}
						results.dataValues["from"] = toUnix(results["from"]);
						results.dataValues["to"] = toUnix(results["to"]);
					}
					return results;
				}
			}
		}
	);
	Booking.associate = models => {
		models.Booking.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
				validate: {
					notNull: { msg: "User is required." }
				}
			},
			as: "user"
		});
		models.Booking.belongsTo(models.Vehicle, {
			foreignKey: {
				name: "vehicleId",
				allowNull: false,
				validate: {
					notNull: { msg: "Vehicle is required." }
				}
			},
			as: "vehicle"
		});
		models.Booking.belongsTo(models.BookingType, {
			foreignKey: {
				name: "bookingTypeId",
				allowNull: false,
				validate: {
					notNull: { msg: "Booking type is required." }
				}
			},
			as: "bookingType"
		});
		models.Booking.belongsTo(models.ReplacementVehicle, {
			foreignKey: {
				name: "replacementVehicleId"
			},
			as: "replaceVehicle"
		});
	};
	return Booking;
};
