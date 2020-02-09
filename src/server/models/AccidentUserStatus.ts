import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";
import { AccidentUserStatusAttributes } from "../../shared/typings";
import { Accident, User } from ".";

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
