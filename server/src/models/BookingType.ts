import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	CreatedAt,
	UpdatedAt,
	HasMany
} from "sequelize-typescript";
import { Booking } from ".";

export interface BookingTypeAttributes {
	id: number;
	name: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

@Table
export class BookingType extends Model<BookingType>
	implements BookingTypeAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false })
	public name: string;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

	@HasMany(() => Booking)
	public readonly bookings: Booking[];
}
