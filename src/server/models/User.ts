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
	UpdatedAt,
	BelongsToMany,
	HasMany
} from "sequelize-typescript";
import {
	Client,
	Accident,
	AccidentUserStatus,
	Category,
	UserVehicleCategory,
	Booking
} from "./";
import { Role } from "../../shared/typings";
import { UserAttributes } from "../../shared/typings";

@Table
export class User extends Model<User> implements UserAttributes {
	@PrimaryKey
	@AutoIncrement
	@Column
	public id: number;

	@Column({
		allowNull: false,
		unique: { name: "email", msg: "Email address already in use." }
	})
	public username: string;

	@Column({ allowNull: false })
	public firstName: string;

	@Column({ allowNull: false })
	public lastName: string;

	@Column({
		allowNull: false,
		unique: { name: "email", msg: "Email address already in use." }
	})
	public email: string;

	@Column({ allowNull: false })
	public password: string;

	@Column({
		allowNull: false,
		unique: { name: "email", msg: "Email address already in use." }
	})
	public mobileNumber: string;

	@Column
	public contractNo: string | null;

	@Column
	public objectNo: string | null;

	@Column
	public lastLogin: Date | null;

	@Column
	public userImageSrc: string | null;

	@Column
	public licenseImageSrc: string | null;

	@Column({ allowNull: false, defaultValue: false })
	public blocked: boolean;

	@Column({ allowNull: false, defaultValue: false })
	public emailConfirmed: boolean;

	@ForeignKey(() => Client)
	@Column
	public clientId: number | null;

	@Column({ type: DataType.STRING, allowNull: false })
	public role: Role;

	@Column({ type: DataType.STRING, allowNull: false })
	public timeZone: string;

	@ForeignKey(() => User)
	@Column
	public userCreatorId: number;

	@CreatedAt
	public readonly createdAt: Date;

	@UpdatedAt
	public readonly updatedAt: Date;

	@BelongsTo(() => Client)
	client: Client;

	@BelongsTo(() => User, "userCreatorId")
	userCreator: User;

	@BelongsToMany(
		() => Accident,
		() => AccidentUserStatus
	)
	accidentStatuses: AccidentUserStatus[];

	@BelongsToMany(
		() => Category,
		() => UserVehicleCategory
	)
	categories: Category[];

	@HasMany(() => Booking)
	bookings: Booking[];
}
