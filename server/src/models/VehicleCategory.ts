import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";
import { Category, Vehicle } from ".";

export interface VehicleCategoryAttributes {
	categoryId: number;
	vehicleId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

@Table
export class VehicleCategory extends Model<VehicleCategory>
	implements VehicleCategoryAttributes {
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
