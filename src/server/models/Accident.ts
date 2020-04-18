import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	BelongsToMany,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";
import { AccidentAttributes } from "../../shared/typings";
import { User, Vehicle, Booking, AccidentUserStatus } from ".";

@Table
export class Accident extends Model<Accident> implements AccidentAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({
		type: DataType.STRING(500),
		allowNull: false,
		validate: {
			notNull: { msg: "Message is required." }
		}
	})
	public message: string;

	@Column
	public accidentImageSrc: string;

	@Column
	public accidentVideoSrc: string;

	@Column
	public lat: number;

	@Column
	public lng: number;

	@ForeignKey(() => User)
	@Column({ allowNull: false })
	public userId: number;

	@BelongsTo(() => User)
	user: User;

	@ForeignKey(() => Vehicle)
	@Column({ allowNull: false })
	public vehicleId: number;

	@BelongsTo(() => Vehicle)
	vehicle: Vehicle;

	@ForeignKey(() => Booking)
	@Column({ allowNull: false })
	public bookingId: number;

	@BelongsTo(() => Booking)
	booking: Booking;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;

	@BelongsToMany(
		() => User,
		() => AccidentUserStatus,
		"accidentId"
	)
	userStatuses: Array<AccidentUserStatus>;
}
