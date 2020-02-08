import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";
import { User, Category } from ".";
import { UserVehicleCategoryAttributes } from "../../shared/typings";

@Table
export class UserVehicleCategory extends Model<UserVehicleCategory>
	implements UserVehicleCategoryAttributes {
	@ForeignKey(() => User)
	@Column({ allowNull: false })
	public userId: number;

	@BelongsTo(() => User)
	public user: User;

	@ForeignKey(() => Category)
	@Column({ allowNull: false })
	public categoryId: number;

	@BelongsTo(() => Category)
	public category: Category;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;
}
