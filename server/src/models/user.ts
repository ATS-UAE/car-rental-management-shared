export default (sequelize, { STRING, DATE, BOOLEAN }) => {
	let User = sequelize.define(
		"User",
		{
			username: {
				type: STRING,
				unique: { args: true, msg: "Username already in use!" },
				allowNull: false,
				validate: {
					notNull: { msg: "Username is required" }
				}
			},
			firstName: {
				type: STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "First name is required" }
				}
			},
			lastName: {
				type: STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Last name is required" }
				}
			},
			email: {
				type: STRING,
				unique: { args: true, msg: "Email address already in use!" },
				allowNull: false,
				validate: {
					notNull: { msg: "Email address is required" }
				}
			},
			password: {
				type: STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Password is required" }
				}
			},
			mobileNumber: {
				type: STRING,
				unique: { args: true, msg: "Mobile number already in use!" },
				allowNull: false,
				validate: {
					notNull: { msg: "Mobile number is required" }
				}
			},
			clientNo: {
				type: STRING
			},
			contractNo: {
				type: STRING
			},
			objectNo: {
				type: STRING
			},
			lastLogin: { type: DATE },
			userImageSrc: { type: STRING },
			licenseImageSrc: { type: STRING },
			approved: { type: BOOLEAN, defaultValue: false },
			blocked: { type: BOOLEAN, defaultValue: false },
			emailConfirmed: { type: BOOLEAN, defaultValue: false }
		},
		{
			validate: {
				checkUsername() {
					if (this.username.length < 4) {
						throw new Error("Username length must be at least 4 characters.");
					}
				},
				checkPasswordLength() {
					if (this.password.length < 8) {
						throw new Error("Password length must be at least 8 characters.");
					}
				},
				checkUserParent() {
					if (!this.parentCompanyId && this.userTypeId > 2) {
						throw new Error("User must have a parent company!");
					}
				}
			}
		}
	);

	User.associate = models => {
		models.User.belongsTo(models.Client, {
			foreignKey: {
				name: "clientId",
				allowNull: false,
				validate: {
					notNull: {
						msg: "Please specify which client this user belongs to."
					}
				}
			},
			as: "client"
		});
		models.User.belongsTo(models.Role, {
			foreignKey: {
				name: "roleId",
				allowNull: false,
				validate: {
					notNull: { msg: "Role is required" }
				}
			},
			as: "role"
		});
		models.User.belongsTo(models.User, {
			foreignKey: {
				name: "userCreatorId"
			},
			as: "userCreator"
		});
		models.User.belongsToMany(models.Accident, {
			through: models.AccidentUserStatus,
			as: "accidentStatus",
			foreignKey: "userId"
		});
		models.User.belongsToMany(models.Category, {
			through: "UserVehicleCategories",
			as: "categories",
			foreignKey: "userId",
			otherKey: "categoryId"
		});
	};

	return User;
};
