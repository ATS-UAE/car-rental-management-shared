import * as S from "sequelize";
import { Booking, User } from ".";

export interface AccidentUserStatusAttributes {
	id: number;
	read: boolean;
	deleted: boolean;
	bookingId: number;
	userId: number;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class AccidentUserStatus extends S.Model
	implements AccidentUserStatusAttributes {
	public id: number;
	public read: boolean;
	public deleted: boolean;
	public bookingId: number;
	public userId: number;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public readonly user?: User;
	public readonly booking?: Booking;

	public static associations: {
		user: S.Association<AccidentUserStatus, User>;
		booking: S.Association<AccidentUserStatus, Booking>;
	};

	static load = (sequelize: S.Sequelize) => {
		AccidentUserStatus.init(
			{
				read: {
					type: S.DataTypes.BOOLEAN,
					defaultValue: false
				},
				deleted: {
					type: S.DataTypes.BOOLEAN,
					defaultValue: false
				}
			},
			{
				sequelize
			}
		);

		AccidentUserStatus.belongsTo(User, {
			foreignKey: { name: "userId", allowNull: false },
			as: "user"
		});

		AccidentUserStatus.belongsTo(Booking, {
			foreignKey: { name: "bookingId", allowNull: false },
			as: "booking"
		});
	};
}
