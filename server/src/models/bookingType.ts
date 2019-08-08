module.exports = (sequelize, DataTypes) => {
	let BookingType = sequelize.define("BookingType", {
		name: { type: DataTypes.STRING, unique: true, allowNull: false }
	});
	return BookingType;
};
