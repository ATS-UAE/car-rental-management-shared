module.exports = (sequelize, DataTypes) => {
	let BookingStatus = sequelize.define("BookingStatus", {
		name: { type: DataTypes.STRING, unique: true, allowNull: false }
	});
	return BookingStatus;
};
