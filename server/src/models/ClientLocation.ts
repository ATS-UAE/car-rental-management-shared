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
import { Client, Location } from ".";

export interface ClientLocationAttributes {
	id: number;
	locationId: number;
	clientId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

@Table
export class ClientLocation extends Model<ClientLocation>
	implements ClientLocationAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@ForeignKey(() => Client)
	@Column({ allowNull: false })
	public clientId: number;

	@BelongsTo(() => Client)
	public client: Client;

	@ForeignKey(() => Location)
	@Column({ allowNull: false })
	public locationId: number;

	@BelongsTo(() => Location)
	public location: Location;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;
}
