"use strict";

module.exports = {
	up: function(queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn("Bookings", "amount", {
				type: Sequelize.FLOAT
			}),
			queryInterface.addColumn("Vehicles", "vehicleImageSrc", {
				type: Sequelize.STRING
			}),
			queryInterface.addColumn("Locations", "locationImageSrc", {
				type: Sequelize.STRING
			}),
			queryInterface.createTable("Accidents", {
				message: {
					type: Sequelize.STRING(500),
					allowNull: false,
					validate: {
						notNull: { msg: "Message is required." }
					}
				},
				accidentImageSrc: {
					type: Sequelize.STRING
				},
				lat: {
					type: Sequelize.FLOAT
				},
				lng: {
					type: Sequelize.FLOAT
				}
			}),
			queryInterface.addColumn("Accidents", "read", {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			})
		]);
	},

	down: function(queryInterface, Sequelize) {
		// logic for reverting the changes
	}
};
