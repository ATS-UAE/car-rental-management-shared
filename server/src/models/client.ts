import * as S from "sequelize";
import { User, Vehicle, Category, Location } from ".";

export interface ClientAttributes {
	id: number;
	name: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class Client extends S.Model implements ClientAttributes {
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

	public getVehicles: S.HasManyGetAssociationsMixin<Vehicle>;
	public setVehicles: S.HasManySetAssociationsMixin<Vehicle, number>;
	public addVehicles: S.HasManyAddAssociationsMixin<Vehicle, number>;
	public addVehicle: S.HasManyAddAssociationMixin<Vehicle, number>;
	public createVehicle: S.HasManyCreateAssociationMixin<Vehicle>;
	public removeVehicle: S.HasManyRemoveAssociationMixin<Vehicle, number>;
	public removeVehicles: S.HasManyRemoveAssociationsMixin<Vehicle, number>;
	public hasVehicle: S.HasManyHasAssociationMixin<Vehicle, number>;
	public hasVehicles: S.HasManyHasAssociationsMixin<Vehicle, number>;
	public countVehicles: S.HasManyCountAssociationsMixin;

	public getCategories: S.HasManyGetAssociationsMixin<Category>;
	public setCategories: S.HasManySetAssociationsMixin<Category, number>;
	public addCategories: S.HasManyAddAssociationsMixin<Category, number>;
	public addCategory: S.HasManyAddAssociationMixin<Category, number>;
	public createCategory: S.HasManyCreateAssociationMixin<Category>;
	public removeCategory: S.HasManyRemoveAssociationMixin<Category, number>;
	public removeCategories: S.HasManyRemoveAssociationsMixin<Category, number>;
	public hasCategory: S.HasManyHasAssociationMixin<Category, number>;
	public hasCategories: S.HasManyHasAssociationsMixin<Category, number>;
	public countCategories: S.HasManyCountAssociationsMixin;

	public getLocation: S.BelongsToManyGetAssociationsMixin<Location>;
	public setLocation: S.BelongsToManySetAssociationsMixin<Location, number>;
	public addLocations: S.BelongsToManyAddAssociationsMixin<Location, number>;
	public addLocation: S.BelongsToManyAddAssociationMixin<Location, number>;
	public createLocation: S.BelongsToManyCreateAssociationMixin<Location>;
	public removeLocation: S.BelongsToManyRemoveAssociationMixin<
		Location,
		number
	>;
	public removeLocations: S.BelongsToManyRemoveAssociationsMixin<
		Location,
		number
	>;
	public hasLocation: S.BelongsToManyHasAssociationMixin<Location, number>;
	public hasLocations: S.BelongsToManyHasAssociationsMixin<Location, number>;
	public countLocations: S.BelongsToManyCountAssociationsMixin;

	public readonly users?: User[];
	public readonly vehicles?: Vehicle[];
	public readonly categories?: Category[];
	public readonly locations?: Location[];

	public static associations: {
		users: S.Association<Client, User>;
		vehicles: S.Association<Client, Vehicle>;
		categories: S.Association<Client, Category>;
		locations: S.Association<Client, Location>;
	};

	static load = (sequelize: S.Sequelize) => {
		Client.init(
			{
				name: {
					type: S.DataTypes.STRING,
					unique: { name: "clientName", msg: "Client name already in use!" },
					allowNull: false,
					validate: {
						notNull: { msg: "Client name is required" }
					}
				}
			},
			{
				sequelize
			}
		);
		Client.hasMany(User, {
			foreignKey: {
				name: "clientId"
			},
			as: "users"
		});
		Client.hasMany(Vehicle, {
			foreignKey: {
				name: "clientId"
			},
			as: "vehicles"
		});
		Client.hasMany(Category, {
			foreignKey: {
				name: "clientId"
			},
			as: "categories"
		});
		Client.belongsToMany(Location, {
			as: "locations",
			foreignKey: "clientId",
			through: "ClientLocations"
		});
	};
}
