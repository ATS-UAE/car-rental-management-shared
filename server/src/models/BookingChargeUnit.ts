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
import { Vehicle } from ".";

export interface BookingChargeUnit {
	id: number;
	unit: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

@Table
export class BookingChargeUnit extends Model<BookingChargeUnit>
	implements BookingChargeUnit {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false })
	public unit: string;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

	@HasMany(() => Vehicle)
	public readonly vehicles: Vehicle[];
}
