export default (sequelize, DataTypes) => {
	let Category = sequelize.define("Category", {
		name: { type: DataTypes.STRING, allowNull: false, unique: true }
	});

	return Category;
};
