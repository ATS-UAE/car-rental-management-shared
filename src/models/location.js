module.exports = (sequelize, DataTypes) => {
	let Location = sequelize.define("Location", {
		name: { type: DataTypes.STRING, allowNull: false },
		lat: { type: DataTypes.DOUBLE, allowNull: false },
		lng: { type: DataTypes.DOUBLE, allowNull: false },
		address: { type: DataTypes.STRING, allowNull: false }
	});

	return Location;
};
