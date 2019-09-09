"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn("Vehicles", "defleeted", {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }),
    down: (queryInterface, Sequelize) => queryInterface.addColumn("Vehicles", "defleeted")
};
