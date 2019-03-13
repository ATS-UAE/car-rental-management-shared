module.exports = (sequelize, DataTypes) => {
	let Booking = sequelize.define("Booking", {
		paid: { type: DataTypes.BOOLEAN, defaultValue: false }
	});
	Booking.associate = models => {
		models.Booking.belongsTo(models.User, {
			foreignKey: {
				name: "userId"
			},
			as: "user"
		});
		models.Booking.belongsTo(models.BookingStatus, {
			foreignKey: {
				name: "bookingStatusId"
			},
			as: "bookingStatus"
		});
		models.Booking.belongsTo(models.BookingType, {
			foreignKey: {
				name: "bookingTypeId"
			},
			as: "bookingType"
		});
	};
	return Booking;
};
