import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";
import { Client, Location } from ".";
import { ClientLocationAttributes } from "../../shared/typings";

@Table
export class ClientLocation extends Model<ClientLocation>
	implements ClientLocationAttributes {
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
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;
}