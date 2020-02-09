const {
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_HOST,
	DATABASE_PORT,
	MAIL_USER,
	MAIL_PASS,
	MAIL_PORT,
	MAIL_HOST,
	SERVER_PORT,
	SERVER_URL,
	SECRET_KEY
} = process.env;

export default {
	database: {
		name: DATABASE_NAME,
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		host: DATABASE_HOST,
		port: DATABASE_PORT,
		sequelize: {
			dialect: <const>"mysql",
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
			user: MAIL_USER,
			pass: MAIL_PASS
		},
		port: MAIL_PORT,
		secure: true,
		host: MAIL_HOST
	},
	serverPort: SERVER_PORT,
	serverUrl: SERVER_URL,
	secretKey: SECRET_KEY
};
