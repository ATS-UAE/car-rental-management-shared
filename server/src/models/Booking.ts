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
import { BookingType } from "../variables/enums";

export interface BookingAttributes {
	id: number;
	paid: boolean;
	amount: number | null;
	from: number;
	to: number;
	approved: boolean | null;
	finished: boolean;
	startMileage: number | null;
	endMileage: number | null;
	startFuel: number | null;
	endFuel: number | null;
	userId: number;
	vehicleId: number;
	bookingType: BookingType;
	replaceVehicleId: number | null;

	readonly createdAt: number;
	readonly updatedAt: number;
}

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
	public from: number;

	@Column({ allowNull: false, type: DataType.DATE })
	public to: number;

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

	@ForeignKey(() => User)
	@Column({ allowNull: false })
	public userId: number;

	@ForeignKey(() => Vehicle)
	@Column({ allowNull: false })
	public vehicleId: number;

	@Column({ allowNull: false, type: DataType.STRING })
	public readonly bookingType: BookingType;

	@ForeignKey(() => ReplaceVehicle)
	@Column
	public replaceVehicleId: number | null;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

	@BelongsTo(() => User)
	public readonly user: User;

	@BelongsTo(() => Vehicle)
	public readonly vehicle: Vehicle;

	@BelongsTo(() => ReplaceVehicle)
	public readonly replaceVehicle: ReplaceVehicle;
}
