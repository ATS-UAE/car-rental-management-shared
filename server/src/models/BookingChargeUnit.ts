export default (sequelize, DataTypes) => {
	let BookingChargeUnit = sequelize.define("BookingChargeUnit", {
		unit: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { msg: "Unit is required" }
			}
		}
	});
	BookingChargeUnit.associate = models => {
		models.BookingChargeUnit.hasMany(models.Vehicle, {
			as: "vehicles",
			foreignKey: "bookingChargeUnitId"
		});
	};
	return BookingChargeUnit;
};
