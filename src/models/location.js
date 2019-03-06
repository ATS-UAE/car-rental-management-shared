module.exports = (sequelize, DataTypes) => {
	let Location = sequelize.define("Location", {
		name: { type: DataTypes.STRING, allowNull: false },
		latitude: { type: DataTypes.DOUBLE, allowNull: false },
		longitude: { type: DataTypes.DOUBLE, allowNull: false }
	});

	return Location;
};
