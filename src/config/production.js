module.exports = {
	database: {
		name: "CarBooking",
		username: "root",
		password: process.env.DATABASE_PASS,
		server: {
			dialect: "mysql",
			host: process.env.DATABASE_HOST
		},
		sequelize: {
			hooks: {
				afterFind: results => {
					if (results) {
						let isArray = Array.isArray(results);
						if (isArray) {
							return results.map(result => {
								result.dataValues["createdAt"] = toUnix(result["createdAt"]);
								result.dataValues["updatedAt"] = toUnix(result["updatedAt"]);
							});
						}
						results.dataValues["createdAt"] = toUnix(results["createdAt"]);
						results.dataValues["updatedAt"] = toUnix(results["updatedAt"]);
					}
					return results;
				}
			},
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		}
	},
	mail: {
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		},
		port: 465,
		secure: true,
		host: process.env.EMAIL_HOST
	},
	serverPort: 5000
};
