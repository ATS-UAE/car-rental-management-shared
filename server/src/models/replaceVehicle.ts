import * as S from "sequelize";
import { Booking } from ".";

export interface ReplaceVehicleAttributes {
	id: number;
	name: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class ReplaceVehicle extends S.Model
	implements ReplaceVehicleAttributes {
	public id: number;
	public name: string;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public readonly booking?: Booking;

	public static association: {
		booking: S.Association<ReplaceVehicle, Booking>;
	};

	static load = (sequelize: S.Sequelize) => {
		ReplaceVehicle.init(
			{
				brand: {
					type: S.DataTypes.STRING
				},
				model: {
					type: S.DataTypes.STRING
				},
				plateNumber: {
					type: S.DataTypes.STRING,
					allowNull: false
				},
				vin: {
					type: S.DataTypes.STRING
				}
			},
			{
				sequelize
			}
		);

		ReplaceVehicle.hasOne(Booking, {
			as: "booking",
			foreignKey: "replaceVehicleId"
		});
	};
}
