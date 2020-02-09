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
import { Vehicle, Client, ClientLocation } from ".";
import { LocationAttributes } from "../../shared/typings";

@Table
export class Location extends Model<Location> implements LocationAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false })
	public name: string;

	@Column({ allowNull: false })
	public lat: number;

	@Column({ allowNull: false })
	public lng: number;

	@Column({ allowNull: false })
	public address: string;

	@Column
	public locationImageSrc: string | null;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;

	@BelongsToMany(
		() => Client,
		() => ClientLocation
	)
	public readonly clients: Client[];

	@HasMany(() => Vehicle)
	public readonly vehicles?: Vehicle[];
}