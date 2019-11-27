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
import { Category, Vehicle } from ".";

export interface VehicleCategoryAttributes {
	id: number;
	categoryId: number;
	vehicleId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

@Table
export class VehicleCategory extends Model<VehicleCategory>
	implements VehicleCategoryAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@ForeignKey(() => Category)
	@Column({ allowNull: false })
	public categoryId: number;

	@BelongsTo(() => Category)
	public category: Category;

	@ForeignKey(() => Vehicle)
	@Column({ allowNull: false })
	public vehicleId: number;

	@BelongsTo(() => Vehicle)
	public vehicle: Vehicle;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;
}
