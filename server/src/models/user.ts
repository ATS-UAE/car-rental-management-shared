import * as S from "sequelize";
import { Client, Role, Accident, AccidentUserStatus, Category } from "./";

export interface UserAttributes {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string;
	contractNo: string | null;
	objectNo: string | null;
	lastLogin: string | null;
	userImageSrc: string | null;
	licenseImageSrc: string | null;
	blocked: boolean;
	emailConfirmed: boolean;
	clientId: number;
	roleId: number;
	userCreatorId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class User extends S.Model implements UserAttributes {
	public id: number;
	public username: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
	public mobileNumber: string;
	public contractNo: string | null;
	public objectNo: string | null;
	public lastLogin: string | null;
	public userImageSrc: string | null;
	public licenseImageSrc: string | null;
	public blocked: boolean;
	public emailConfirmed: boolean;
	public clientId: number;
	public roleId: number;
	public userCreatorId: number;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public getAccidentStatuses: S.BelongsToManyGetAssociationsMixin<
		AccidentUserStatus
	>;
	public setAccidentStatuses: S.BelongsToManySetAssociationsMixin<
		AccidentUserStatus,
		number
	>;
	public addAccidentStatuses: S.BelongsToManyAddAssociationsMixin<
		AccidentUserStatus,
		number
	>;
	public addAccidentStatus: S.BelongsToManyAddAssociationMixin<
		AccidentUserStatus,
		number
	>;
	public createAccidentStatus: S.BelongsToManyCreateAssociationMixin<
		AccidentUserStatus
	>;
	public removeAccidentStatus: S.BelongsToManyRemoveAssociationMixin<
		AccidentUserStatus,
		number
	>;
	public removeAccidentStatuses: S.BelongsToManyRemoveAssociationsMixin<
		AccidentUserStatus,
		number
	>;
	public hasAccidentStatus: S.BelongsToManyHasAssociationMixin<
		AccidentUserStatus,
		number
	>;
	public hasAccidentStatuses: S.BelongsToManyHasAssociationsMixin<
		AccidentUserStatus,
		number
	>;
	public countAccidentStatuses: S.BelongsToManyCountAssociationsMixin;

	public getCategories: S.BelongsToManyGetAssociationsMixin<Category>;
	public setCategories: S.BelongsToManySetAssociationsMixin<Category, number>;
	public addCategories: S.BelongsToManyAddAssociationsMixin<Category, number>;
	public addCategory: S.BelongsToManyAddAssociationMixin<Category, number>;
	public createCategory: S.BelongsToManyCreateAssociationMixin<Category>;
	public removeCategory: S.BelongsToManyRemoveAssociationMixin<
		Category,
		number
	>;
	public removeCategories: S.BelongsToManyRemoveAssociationsMixin<
		Category,
		number
	>;
	public hasCategory: S.BelongsToManyHasAssociationMixin<Category, number>;
	public hasCategories: S.BelongsToManyHasAssociationsMixin<Category, number>;
	public countCategories: S.BelongsToManyCountAssociationsMixin;

	public readonly accidentStatuses?: AccidentUserStatus[];
	public readonly categories?: Category[];
	public readonly client?: Client;
	public readonly role?: Role;

	public static associations: {
		accidentStatuses: S.Association<User, AccidentUserStatus>;
		categories: S.Association<User, Category>;
		client: S.Association<User, Client>;
		role: S.Association<User, Role>;
	};

	static load = (sequelize: S.Sequelize) => {
		User.init(
			{
				username: {
					type: S.DataTypes.STRING,
					unique: { name: "username", msg: "Username already in use!" },
					allowNull: false,
					validate: {
						notNull: { msg: "Username is required" }
					}
				},
				firstName: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "First name is required" }
					}
				},
				lastName: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Last name is required" }
					}
				},
				email: {
					type: S.DataTypes.STRING,
					unique: { name: "email", msg: "Email address already in use!" },
					allowNull: false,
					validate: {
						notNull: { msg: "Email address is required" }
					}
				},
				password: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Password is required" }
					}
				},
				mobileNumber: {
					type: S.DataTypes.STRING,
					unique: {
						name: "mobileNumber",
						msg: "Mobile number already in use!"
					},
					allowNull: false,
					validate: {
						notNull: { msg: "Mobile number is required" }
					}
				},
				contractNo: {
					type: S.DataTypes.STRING
				},
				objectNo: {
					type: S.DataTypes.STRING
				},
				lastLogin: { type: S.DataTypes.DATE },
				userImageSrc: { type: S.DataTypes.STRING },
				licenseImageSrc: { type: S.DataTypes.STRING },
				approved: { type: S.DataTypes.BOOLEAN, defaultValue: false },
				blocked: { type: S.DataTypes.BOOLEAN, defaultValue: false },
				emailConfirmed: { type: S.DataTypes.BOOLEAN, defaultValue: false }
			},
			{
				sequelize,
				validate: {
					checkUsername() {
						if (this.username && this.username.length < 4) {
							throw new Error("Username length must be at least 4 characters.");
						}
					},
					checkPasswordLength() {
						if (this.password && this.password.length < 8) {
							throw new Error("Password length must be at least 8 characters.");
						}
					},
					requireRole() {
						if (!this.roleId) {
							throw new Error("Role is required");
						}
					}
				}
			}
		);

		User.belongsTo(Client, {
			foreignKey: {
				name: "clientId"
			},
			as: "client"
		});
		User.belongsTo(Role, {
			foreignKey: {
				name: "roleId",
				allowNull: false
			},
			as: "role"
		});
		User.belongsTo(User, {
			foreignKey: {
				name: "userCreatorId"
			},
			as: "userCreator"
		});
		User.belongsToMany(Accident, {
			through: AccidentUserStatus,
			as: "accidentStatus",
			foreignKey: "userId"
		});
		User.belongsToMany(Category, {
			through: "UserVehicleCategories",
			as: "categories",
			foreignKey: "userId",
			otherKey: "categoryId"
		});
	};
}
