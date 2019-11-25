import * as S from "sequelize";
import { Vehicle } from ".";

export interface BookingChargeUnit {
	id: number;
	unit: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class BookingChargeUnit extends S.Model implements BookingChargeUnit {
	public id: number;
	public unit: string;

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

	public readonly vehicles?: Vehicle[];

	public static associations: {
		vehicles: S.Association<BookingChargeUnit, Vehicle>;
	};

	static load = (sequelize: S.Sequelize) => {
		BookingChargeUnit.init(
			{
				unit: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Unit is required" }
					}
				}
			},
			{
				sequelize
			}
		);

		BookingChargeUnit.hasMany(Vehicle, {
			as: "vehicles",
			foreignKey: "bookingChargeUnitId"
		});
	};
}
