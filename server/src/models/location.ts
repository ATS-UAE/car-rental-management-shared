import * as S from "sequelize";
import { Vehicle, Client } from ".";

export interface LocationAttributes {
	id: number;
	name: string;
	lat: number;
	lng: number;
	address: string;
	locationImageSrc: string | null;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class Location extends S.Model implements LocationAttributes {
	public id: number;
	public name: string;
	public lat: number;
	public lng: number;
	public address: string;
	public locationImageSrc: string | null;

	public readonly createdAt: number;
	public readonly updatedAt: number;

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

	public getClients: S.BelongsToManyGetAssociationsMixin<Client>;
	public setClients: S.BelongsToManySetAssociationsMixin<Client, number>;
	public addClients: S.BelongsToManyAddAssociationsMixin<Client, number>;
	public addClient: S.BelongsToManyAddAssociationMixin<Client, number>;
	public createClient: S.BelongsToManyCreateAssociationMixin<Client>;
	public removeClient: S.BelongsToManyRemoveAssociationMixin<Client, number>;
	public removeClients: S.BelongsToManyRemoveAssociationsMixin<Client, number>;
	public hasClient: S.BelongsToManyHasAssociationMixin<Client, number>;
	public hasClients: S.BelongsToManyHasAssociationsMixin<Client, number>;
	public countClients: S.BelongsToManyCountAssociationsMixin;

	public readonly clients?: Client[];
	public readonly vehicles?: Vehicle[];

	public static associations: {
		clients: S.Association<Location, Client>;
		vehicles: S.Association<Location, Vehicle>;
	};

	static load = (sequelize: S.Sequelize) => {
		Location.init(
			{
				name: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Name is required" }
					}
				},
				lat: {
					type: S.DataTypes.DOUBLE,
					allowNull: false,
					validate: {
						notNull: { msg: "Location is required" }
					}
				},
				lng: {
					type: S.DataTypes.DOUBLE,
					allowNull: false,
					validate: {
						notNull: { msg: "Location is required" }
					}
				},
				address: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Address required" }
					}
				},
				locationImageSrc: { type: S.DataTypes.STRING }
			},
			{
				sequelize
			}
		);

		Location.belongsToMany(Client, {
			as: "clients",
			foreignKey: "locationId",
			through: "ClientLocations"
		});

		Location.hasMany(Vehicle, {
			as: "vehicles",
			foreignKey: "locationId"
		});
	};
}
