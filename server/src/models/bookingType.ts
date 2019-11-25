import * as S from "sequelize";
import { Booking } from ".";

export interface BookingTypeAttributes {
	id: number;
	name: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class BookingType extends S.Model implements BookingTypeAttributes {
	public id: number;
	public name: string;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public getBookings: S.HasManyGetAssociationsMixin<Booking>;
	public setBookings: S.HasManySetAssociationsMixin<Booking, number>;
	public addBookings: S.HasManyAddAssociationsMixin<Booking, number>;
	public addBooking: S.HasManyAddAssociationMixin<Booking, number>;
	public createBooking: S.HasManyCreateAssociationMixin<Booking>;
	public removeBooking: S.HasManyRemoveAssociationMixin<Booking, number>;
	public removeBookings: S.HasManyRemoveAssociationsMixin<Booking, number>;
	public hasBooking: S.HasManyHasAssociationMixin<Booking, number>;
	public hasBookings: S.HasManyHasAssociationsMixin<Booking, number>;
	public countBookings: S.HasManyCountAssociationsMixin;

	public readonly bookings?: Booking[];

	public static associations: {
		bookings: S.Association<BookingType, Booking>;
	};

	static load = (sequelize: S.Sequelize) => {
		BookingType.init(
			{
				name: { type: S.DataTypes.STRING, unique: true, allowNull: false }
			},
			{
				sequelize
			}
		);

		BookingType.hasMany(Booking, {
			as: "bookings",
			foreignKey: {
				name: "bookingTypeId",
				allowNull: false
			}
		});
	};
}
