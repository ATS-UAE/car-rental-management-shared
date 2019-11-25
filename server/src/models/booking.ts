import * as S from "sequelize";
import { User, Vehicle, ReplaceVehicle, BookingType } from ".";

export interface BookingAttributes {
	id: number;
	paid: boolean;
	amount: number | null;
	from: number;
	to: number;
	approved: boolean | null;
	finished: boolean;
	startMileage: number | null;
	endMileage: number | null;
	startFuel: number | null;
	endFuel: number | null;
	userId: number;
	vehicleId: number;
	bookingTypeId: number;
	replaceVehicleId: number | null;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class Booking extends S.Model implements BookingAttributes {
	public id: number;
	public paid: boolean;
	public amount: number | null;
	public from: number;
	public to: number;
	public approved: boolean | null;
	public finished: boolean;
	public startMileage: number | null;
	public endMileage: number | null;
	public startFuel: number | null;
	public endFuel: number | null;
	public userId: number;
	public vehicleId: number;
	public bookingTypeId: number;
	public replaceVehicleId: number | null;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public readonly user?: User;
	public readonly vehicle?: Vehicle;
	public readonly bookingType?: BookingType;
	public readonly replaceVehicle?: ReplaceVehicle;

	public static associations: {
		booking: S.Association<Booking, User>;
		vehicle: S.Association<Booking, Vehicle>;
		bookingType: S.Association<Booking, BookingType>;
		replaceVehicle: S.Association<Booking, ReplaceVehicle>;
	};

	static load = (sequelize: S.Sequelize) => {
		Booking.init(
			{
				paid: { type: S.DataTypes.BOOLEAN, defaultValue: false },
				amount: { type: S.DataTypes.FLOAT, defaultValue: null },
				from: { type: S.DataTypes.DATE, allowNull: false },
				to: { type: S.DataTypes.DATE, allowNull: false },
				// null means pending, false means denied, true means approved.
				approved: { type: S.DataTypes.BOOLEAN, defaultValue: null },
				finished: { type: S.DataTypes.BOOLEAN, defaultValue: false },
				startMileage: {
					type: S.DataTypes.FLOAT
				},
				endMileage: {
					type: S.DataTypes.FLOAT
				},
				startFuel: {
					type: S.DataTypes.FLOAT
				},
				endFuel: {
					type: S.DataTypes.FLOAT
				}
			},
			{
				sequelize,
				validate: {
					userRequired() {
						if (!this.userId) {
							throw new Error("User is required.");
						}
					},
					vehicleRequired() {
						if (!this.vehicleId) {
							throw new Error("Vehicle is required.");
						}
					},
					bookingTypeRequired() {
						if (!this.bookingTypeId) {
							throw new Error("Booking type is required.");
						}
					}
				}
			}
		);

		Booking.belongsTo(User, {
			foreignKey: {
				name: "userId",
				allowNull: false
			},
			as: "user"
		});
		Booking.belongsTo(Vehicle, {
			foreignKey: {
				name: "vehicleId",
				allowNull: false
			},
			as: "vehicle"
		});
		Booking.belongsTo(BookingType, {
			foreignKey: {
				name: "bookingTypeId",
				allowNull: false
			},
			as: "bookingType"
		});
		Booking.belongsTo(ReplaceVehicle, {
			foreignKey: {
				name: "replaceVehicleId"
			},
			as: "replaceVehicle"
		});
	};
}
