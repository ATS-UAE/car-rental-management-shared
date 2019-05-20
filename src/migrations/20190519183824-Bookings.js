"use strict";

module.exports = {
	up: function(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.changeColumn("Bookings", "amount", {
				type: Sequelize.FLOAT,
				defaultValue: 0
			})
		]);
	},

	down: function(queryInterface, Sequelize) {
		// logic for reverting the changes
	}
};
