import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	CreatedAt,
	UpdatedAt,
	HasOne,
	HasMany
} from "sequelize-typescript";
import { User } from ".";

export interface RoleAttributes {
	id: number;
	name: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

@Table
export class Role extends Model<Role> implements RoleAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false, unique: true })
	public name: string;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

	@HasMany(() => User)
	public readonly users?: User[];
}
