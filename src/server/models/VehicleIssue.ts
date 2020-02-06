import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt,
	HasMany,
	BelongsToMany
} from "sequelize-typescript";
import { Vehicle } from ".";

export interface VehicleIssueAttributes {
	id: number;
	message: string;
	vehicleId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

@Table
export class VehicleIssue extends Model<VehicleIssue>
	implements VehicleIssueAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false })
	public message: string;

	@ForeignKey(() => Vehicle)
	@Column({ allowNull: false })
	public vehicleId: number;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;

	@BelongsTo(() => Vehicle)
	public readonly vehicle: Vehicle;
}
