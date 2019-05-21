module.exports = (sequelize, DataTypes) => {
	let Vehicle = sequelize.define("Vehicle", {
		objectId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: { args: true, msg: "VIN already in use!" }
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
		parkingLocation: { type: DataTypes.STRING },
		vehicleImageSrc: { type: DataTypes.STRING }
	});
	Vehicle.associate = models => {
		models.Vehicle.belongsTo(models.Location, {
			foreignKey: {
				name: "locationId"
			},
			as: "location"
		});
		models.Vehicle.hasMany(models.Booking, {
			foreignKey: { name: "vehicleId" },
			as: "bookings"
		});
	};
	return Vehicle;
};
