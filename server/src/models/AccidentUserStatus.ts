import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";
import { Accident, User } from ".";

export interface AccidentUserStatusAttributes {
	read: boolean;
	deleted: boolean;
	accidentId: number;
	userId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

@Table
export class AccidentUserStatus extends Model<AccidentUserStatus>
	implements AccidentUserStatusAttributes {
	@Column({ defaultValue: false, allowNull: false })
	public read: boolean;

	@Column({ defaultValue: false, allowNull: false })
	public deleted: boolean;

	@ForeignKey(() => Accident)
	@Column({ allowNull: false })
	public accidentId: number;

	@BelongsTo(() => Accident)
	public accident: Accident;

	@ForeignKey(() => User)
	@Column({ allowNull: false })
	public userId: number;

	@BelongsTo(() => User)
	public user: User;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;
}
