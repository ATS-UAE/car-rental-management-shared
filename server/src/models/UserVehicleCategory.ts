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

export interface UserVehicleCategoryAttributes {
	userId: number;
	categoryId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

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
