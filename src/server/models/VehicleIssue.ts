import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";
import { Vehicle } from ".";
import { VehicleIssueAttributes } from "../../shared/typings";

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
