module.exports = (sequelize, DataTypes) => {
	let Vehicle = sequelize.define("Vehicle", {
		brand: { type: DataTypes.STRING, allowNull: false },
		model: { type: DataTypes.STRING, allowNull: false },
		plateNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
		vin: { type: DataTypes.STRING, unique: true },
		parkingLocation: { type: DataTypes.STRING }
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
