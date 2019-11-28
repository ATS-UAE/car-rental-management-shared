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

export interface LocationAttributes {
	id: number;
	name: string;
	lat: number;
	lng: number;
	address: string;
	locationImageSrc: string | null;

	readonly createdAt: number;
	readonly updatedAt: number;
}

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
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

	@BelongsToMany(
		() => Client,
		() => ClientLocation
	)
	public readonly clients: Client[];

	@HasMany(() => Vehicle)
	public readonly vehicles?: Vehicle[];
}
