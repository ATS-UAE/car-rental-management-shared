import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	BelongsToMany,
	CreatedAt,
	UpdatedAt,
	HasMany
} from "sequelize-typescript";
import { User, Vehicle, Category, Location, ClientLocation } from ".";

export interface ClientAttributes {
	id: number;
	name: string;

	readonly createdAt: number;
	readonly updatedAt: number;
}

@Table
export class Client extends Model<Client> implements ClientAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false })
	public name: string;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

	@HasMany(() => User)
	public readonly users: User[];

	@HasMany(() => Vehicle)
	public readonly vehicles: Vehicle[];

	@HasMany(() => Category)
	public readonly categories: Category[];

	@BelongsToMany(
		() => Location,
		() => ClientLocation
	)
	public readonly locations: Location[];
}
