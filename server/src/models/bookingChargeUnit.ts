export default (sequelize, DataTypes) => {
	let BookingChargeUnit = sequelize.define("BookingChargeUnit", {
		unit: {
			type: DataTypes.STRING(32),
			allowNull: false,
			validate: {
				notNull: { msg: "Unit is required." }
			}
		}
	});
	BookingChargeUnit.associate = models => {
		models.BookingChargeUnit.hasMany(models.User, {
			foreignKey: {
				name: "bookingChargeUnitId"
			},
			as: "vehicle"
		});
	};
	return BookingChargeUnit;
};
