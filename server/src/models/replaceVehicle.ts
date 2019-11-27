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
	name: string;
	brand: string;
	model: string;
	vin: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

@Table
export class ReplaceVehicle extends Model<ReplaceVehicle>
	implements ReplaceVehicleAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column
	public name: string;

	@Column
	public brand: string;

	@Column
	public model: string;

	@Column
	public vin: string;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

	@HasOne(() => Booking)
	public readonly booking?: Booking;
}
