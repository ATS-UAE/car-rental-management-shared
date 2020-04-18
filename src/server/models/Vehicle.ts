import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	ForeignKey,
	BelongsTo,
	CreatedAt,
	UpdatedAt,
	HasMany,
	BelongsToMany,
	DataType
} from "sequelize-typescript";
import {
	Client,
	Location,
	Booking,
	VehicleIssue,
	Category,
	VehicleCategory,
	Accident
} from ".";
import { BookingChargeUnit } from "../../shared/typings";
import { VehicleAttributes } from "../../shared/typings";

@Table
export class Vehicle extends Model<Vehicle> implements VehicleAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({ allowNull: false })
	public brand: string;

	@Column({ allowNull: false })
	public model: string;

	@Column({ allowNull: false })
	public plateNumber: string;

	@Column({ allowNull: false })
	public vin: string;

	@Column({ allowNull: false, defaultValue: false })
	public defleeted: boolean;

	@Column
	public parkingLocation: string | null;

	@Column
	public vehicleImageSrc: string | null;

	@Column({ allowNull: false, defaultValue: 0 })
	public bookingChargeCount: number;

	@Column({ allowNull: false, defaultValue: 0 })
	public bookingCharge: number;

	@Column
	public wialonUnitId: number | null;

	@Column({ type: DataType.STRING })
	public bookingChargeUnit: BookingChargeUnit | null;

	@ForeignKey(() => Client)
	@Column
	public clientId: number | null;

	@ForeignKey(() => Location)
	@Column
	public locationId: number | null;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;

	@HasMany(() => Booking)
	public readonly bookings: Booking[];

	@HasMany(() => Accident)
	public readonly accidents: Accident[];

	@HasMany(() => VehicleIssue)
	public readonly vehicleIssues: VehicleIssue[];

	@BelongsToMany(
		() => Category,
		() => VehicleCategory
	)
	public readonly categories: Category[];

	@BelongsTo(() => Client)
	public readonly client: Client;

	@BelongsTo(() => Location)
	public readonly location: Location;
}
