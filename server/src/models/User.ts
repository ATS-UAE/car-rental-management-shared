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
	BelongsToMany
} from "sequelize-typescript";
import {
	Client,
	Accident,
	AccidentUserStatus,
	Category,
	UserVehicleCategory
} from "./";
import { Role } from "../variables/enums";
export interface UserAttributes {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobileNumber: string;
	contractNo: string | null;
	objectNo: string | null;
	lastLogin: string | null;
	userImageSrc: string | null;
	licenseImageSrc: string | null;
	blocked: boolean;
	emailConfirmed: boolean;
	clientId: number;
	role: Role;
	userCreatorId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

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
	public lastLogin: string | null;

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
	public clientId: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public role: Role;

	@ForeignKey(() => User)
	@Column
	public userCreatorId: number;

	@CreatedAt
	public readonly createdAt: number;

	@UpdatedAt
	public readonly updatedAt: number;

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
}
