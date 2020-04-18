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
import { VehicleCategoryAttributes } from "../../shared/typings";

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
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;
}
