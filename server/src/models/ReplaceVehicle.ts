import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	CreatedAt,
	UpdatedAt,
	HasOne
} from "sequelize-typescript";
import { Booking } from ".";

export interface ReplaceVehicleAttributes {
	id: number;
	plateNumber: string;
	brand: string;
	model: string;
	vin: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

@Table
export class ReplaceVehicle extends Model<ReplaceVehicle>
	implements ReplaceVehicleAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column
	public plateNumber: string;

	@Column
	public brand: string;

	@Column
	public model: string;

	@Column
	public vin: string;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;

	@HasOne(() => Booking)
	public readonly booking?: Booking;
}
