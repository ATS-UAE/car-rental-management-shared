import * as S from "sequelize";
import { User } from ".";

export interface RoleAttributes {
	id: number;
	name: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class Role extends S.Model implements RoleAttributes {
	public id: number;
	public name: string;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public getUsers: S.HasManyGetAssociationsMixin<User>;
	public setUsers: S.HasManySetAssociationsMixin<User, number>;
	public addUsers: S.HasManyAddAssociationsMixin<User, number>;
	public addUser: S.HasManyAddAssociationMixin<User, number>;
	public createUser: S.HasManyCreateAssociationMixin<User>;
	public removeUser: S.HasManyRemoveAssociationMixin<User, number>;
	public removeUsers: S.HasManyRemoveAssociationsMixin<User, number>;
	public hasUser: S.HasManyHasAssociationMixin<User, number>;
	public hasUsers: S.HasManyHasAssociationsMixin<User, number>;
	public countUsers: S.HasManyCountAssociationsMixin;

	public readonly users?: User[];

	public static associations: {
		users: S.Association<Role, User>;
	};

	static load = (sequelize: S.Sequelize) => {
		Role.init(
			{
				name: { type: S.DataTypes.STRING, allowNull: false, unique: true }
			},
			{
				sequelize
			}
		);

		Role.hasMany(User, {
			as: "users",
			foreignKey: "roleId"
		});
	};
}
