import * as S from "sequelize";
import { Vehicle } from ".";

export interface VehicleIssueAttributes {
	id: number;
	name: string;
	vehicleId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class VehicleIssue extends S.Model implements VehicleIssueAttributes {
	public id: number;
	public name: string;
	public vehicleId: number;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public readonly vehicle?: Vehicle;

	public static associations: {
		vehicle: S.Association<VehicleIssue, Vehicle>;
	};

	static load = (sequelize: S.Sequelize) => {
		VehicleIssue.init(
			{
				message: {
					type: S.DataTypes.STRING(256),
					allowNull: false,
					validate: {
						notNull: { msg: "Message is required." }
					}
				}
			},
			{
				sequelize,
				validate: {
					requireVehicle() {
						if (!this.vehicleId) {
							throw new Error("Vehicle is required.");
						}
					}
				}
			}
		);

		VehicleIssue.belongsTo(Vehicle, {
			foreignKey: { name: "vehicleId", allowNull: false },
			as: "vehicle"
		});
	};
}
