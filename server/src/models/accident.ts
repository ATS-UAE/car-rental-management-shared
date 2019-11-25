import * as S from "sequelize";
import { User, Vehicle, Booking, AccidentUserStatus } from ".";

export interface AccidentAttributes {
	id: number;
	message: string;
	accidentImageSrc: string;
	accidentVideoSrc: string;
	lat: number;
	lng: number;
	userId: number;
	vehicleId: number;
	bookingId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class Accident extends S.Model implements AccidentAttributes {
	public id: number;
	public message: string;
	public accidentImageSrc: string;
	public accidentVideoSrc: string;
	public lat: number;
	public lng: number;
	public userId: number;
	public vehicleId: number;
	public bookingId: number;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public getUserStatuses: S.BelongsToManyGetAssociationsMixin<User>;
	public setUserStatuses: S.BelongsToManySetAssociationsMixin<User, number>;
	public addUserStatuses: S.BelongsToManyAddAssociationsMixin<User, number>;
	public addUserStatus: S.BelongsToManyAddAssociationMixin<User, number>;
	public createUserStatus: S.BelongsToManyCreateAssociationMixin<User>;
	public removeUserStatus: S.BelongsToManyRemoveAssociationMixin<User, number>;
	public removeUserStatuses: S.BelongsToManyRemoveAssociationsMixin<
		User,
		number
	>;
	public hasUserStatus: S.BelongsToManyHasAssociationMixin<User, number>;
	public hasUserStatuses: S.BelongsToManyHasAssociationsMixin<User, number>;
	public countUserStatuses: S.BelongsToManyCountAssociationsMixin;

	public readonly userStatuses?: AccidentUserStatus[];
	public readonly vehicle?: Vehicle;
	public readonly booking?: Booking;
	public readonly user?: User;

	public static associations: {
		userStatuses: S.Association<Accident, User>;
		vehicle: S.Association<Accident, Vehicle>;
		booking: S.Association<Accident, Booking>;
		user: S.Association<Accident, User>;
	};

	static load = (sequelize: S.Sequelize) => {
		Accident.init(
			{
				message: {
					type: S.DataTypes.STRING(500),
					allowNull: false,
					validate: {
						notNull: { msg: "Message is required." }
					}
				},
				accidentImageSrc: {
					type: S.DataTypes.STRING
				},
				accidentVideoSrc: {
					type: S.DataTypes.STRING
				},
				lat: {
					type: S.DataTypes.FLOAT
				},
				lng: {
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
					bookingRequired() {
						if (!this.bookingId) {
							throw new Error("Booking is required.");
						}
					}
				}
			}
		);

		Accident.belongsTo(User, {
			foreignKey: {
				name: "userId",
				allowNull: false
			},
			as: "user"
		});

		Accident.belongsTo(Vehicle, {
			foreignKey: { name: "vehicleId", allowNull: false },
			as: "vehicle"
		});

		Accident.belongsTo(Booking, {
			foreignKey: { name: "bookingId", allowNull: false },
			as: "booking"
		});

		Accident.belongsToMany(User, {
			through: AccidentUserStatus,
			as: "userStatus",
			foreignKey: "accidentId"
		});
	};
}
