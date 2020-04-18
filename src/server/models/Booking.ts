import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	DataType,
	UpdatedAt
} from "sequelize-typescript";
import { User, Vehicle, ReplaceVehicle } from ".";
import { BookingType } from "../../shared/typings";
import { BookingAttributes } from "../../shared/typings";

@Table
export class Booking extends Model<Booking> implements BookingAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ defaultValue: false, allowNull: false })
	public paid: boolean;

	@Column({ defaultValue: null })
	public amount: number | null;

	@Column({ allowNull: false, type: DataType.DATE })
	public from: Date;

	@Column({ allowNull: false, type: DataType.DATE })
	public to: Date;

	@Column({ defaultValue: null })
	public approved: boolean | null;

	@Column({ defaultValue: false, allowNull: false })
	public finished: boolean;

	@Column(DataType.FLOAT)
	public startMileage: number | null;

	@Column(DataType.FLOAT)
	public endMileage: number | null;

	@Column(DataType.FLOAT)
	public startFuel: number | null;

	@Column(DataType.FLOAT)
	public endFuel: number | null;

	@Column({ defaultValue: false, type: DataType.BOOLEAN, allowNull: false })
	public returned: boolean;

	@ForeignKey(() => User)
	@Column({ allowNull: false })
	public userId: number;

	@ForeignKey(() => Vehicle)
	@Column({ allowNull: false })
	public vehicleId: number;

	@Column({ allowNull: false, type: DataType.STRING })
	public bookingType: BookingType;

	@ForeignKey(() => ReplaceVehicle)
	@Column
	public replaceVehicleId: number | null;

	@Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
	public returnDate: Date | null;

	@Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
	public pickupDate: Date | null;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;

	@BelongsTo(() => User)
	public readonly user: User;

	@BelongsTo(() => Vehicle)
	public readonly vehicle: Vehicle;

	@BelongsTo(() => ReplaceVehicle)
	public readonly replaceVehicle: ReplaceVehicle;
}
