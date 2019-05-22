module.exports = (sequelize, DataTypes) => {
	let Accident = sequelize.define("Accident", {
		message: {
			type: DataTypes.STRING(500),
			allowNull: false,
			validate: {
				notNull: { msg: "Message is required." }
			}
		},
		read: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		accidentImageSrc: {
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
			as: "user"
		});
		models.Accident.belongsTo(models.Vehicle, {
			foreignKey: { name: "vehicleId" },
			as: "vehicle"
		});
		models.Accident.belongsTo(models.Booking, {
			foreignKey: { name: "bookingId" },
			as: "booking"
		});
	};
	return Accident;
};
