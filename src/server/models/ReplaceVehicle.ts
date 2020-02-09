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
import { ReplaceVehicleAttributes } from "../../shared/typings";

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
