import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	BelongsToMany,
	CreatedAt
} from "sequelize-typescript";
import { Client, Vehicle, VehicleCategory } from "./";

export interface CategoryAttributes {
	id: number;
	name: string;
	clientId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

@Table
export class Category extends Model<Category> implements CategoryAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false })
	public name: string;

	@ForeignKey(() => Client)
	@Column({ allowNull: false })
	public clientId: number;

	@CreatedAt
	public readonly createdAt: Date;

	@CreatedAt
	public readonly updatedAt: Date;

	@BelongsTo(() => Client)
	public readonly client: Client;

	@BelongsToMany(
		() => Vehicle,
		() => VehicleCategory
	)
	public readonly vehicles: Vehicle[];
}
