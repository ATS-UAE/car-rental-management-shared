module.exports = (sequelize, DataTypes) => {
	let Vehicle = sequelize.define("Vehicle", {
		brand: { type: DataTypes.STRING, allowNull: false },
		model: { type: DataTypes.STRING, allowNull: false },
		plateNumber: { type: DataTypes.STRING, allowNull: false },
		chassisNumber: { type: DataTypes.STRING }
	});

	return Vehicle;
};
