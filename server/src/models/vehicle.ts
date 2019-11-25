import * as S from "sequelize";
import {
	BookingChargeUnit,
	Client,
	Location,
	Booking,
	VehicleIssue,
	Category
} from ".";

export interface VehicleAttributes {
	id: number;
	objectId: string;
	brand: string;
	model: string;
	plateNumber: string;
	vin: string;
	defleeted: boolean;
	parkingLocation: string | null;
	vehicleImageSrc: string | null;
	bookingChargeCount: number;
	bookingCharge: number;
	wialonUnitId: number | null;
	bookingChargeUnitId: number | null;
	clientId: number;
	locationId: number | null;

	readonly createdAt: number;
	readonly updatedAt: number;
}

export class Vehicle extends S.Model implements VehicleAttributes {
	public id: number;
	public objectId: string;
	public brand: string;
	public model: string;
	public plateNumber: string;
	public vin: string;
	public defleeted: boolean;
	public parkingLocation: string | null;
	public vehicleImageSrc: string | null;
	public bookingChargeCount: number;
	public bookingCharge: number;
	public wialonUnitId: number | null;
	public bookingChargeUnitId: number | null;
	public clientId: number;
	public locationId: number | null;

	public readonly createdAt: number;
	public readonly updatedAt: number;

	public getBookings: S.HasManyGetAssociationsMixin<Booking>;
	public setBookings: S.HasManySetAssociationsMixin<Booking, number>;
	public addBookings: S.HasManyAddAssociationsMixin<Booking, number>;
	public addBooking: S.HasManyAddAssociationMixin<Booking, number>;
	public createBooking: S.HasManyCreateAssociationMixin<Booking>;
	public removeBooking: S.HasManyRemoveAssociationMixin<Booking, number>;
	public removeBookings: S.HasManyRemoveAssociationsMixin<Booking, number>;
	public hasBooking: S.HasManyHasAssociationMixin<Booking, number>;
	public hasBookings: S.HasManyHasAssociationsMixin<Booking, number>;
	public countBookings: S.HasManyCountAssociationsMixin;

	public getVehicleIssues: S.HasManyGetAssociationsMixin<VehicleIssue>;
	public setVehicleIssues: S.HasManySetAssociationsMixin<VehicleIssue, number>;
	public addVehicleIssues: S.HasManyAddAssociationMixin<VehicleIssue, number>;
	public addVehicleIssue: S.HasManyAddAssociationMixin<VehicleIssue, number>;
	public createVehicleIssue: S.HasManyCreateAssociationMixin<VehicleIssue>;
	public removeVehicleIssue: S.HasManyRemoveAssociationMixin<
		VehicleIssue,
		number
	>;
	public removeVehicleIssues: S.HasManyRemoveAssociationsMixin<
		VehicleIssue,
		number
	>;
	public hasVehicleIssue: S.HasManyHasAssociationMixin<VehicleIssue, number>;
	public hasVehicleIssues: S.HasManyHasAssociationsMixin<VehicleIssue, number>;
	public countVehicleIssues: S.HasManyCountAssociationsMixin;

	public getCategories: S.BelongsToManyGetAssociationsMixin<Category>;
	public setCategories: S.BelongsToManySetAssociationsMixin<Category, number>;
	public addCategories: S.BelongsToManyAddAssociationsMixin<Category, number>;
	public addCategory: S.BelongsToManyAddAssociationMixin<Category, number>;
	public createCategory: S.BelongsToManyCreateAssociationMixin<Category>;
	public removeCategory: S.BelongsToManyRemoveAssociationMixin<
		Category,
		number
	>;
	public removeCategories: S.BelongsToManyRemoveAssociationsMixin<
		Category,
		number
	>;
	public hasCategory: S.BelongsToManyHasAssociationMixin<Category, number>;
	public hasCategories: S.BelongsToManyHasAssociationsMixin<Category, number>;
	public countCategories: S.BelongsToManyCountAssociationsMixin;

	public readonly bookings?: Booking[];
	public readonly vehicleIssues?: VehicleIssue[];
	public readonly categories?: Category[];
	public readonly client?: Client;
	public readonly bookingChargeUnit?: BookingChargeUnit;
	public readonly location?: Location;

	public static associations: {
		bookings: S.Association<Vehicle, Booking>;
		vehicleIssue: S.Association<Vehicle, VehicleIssue>;
		categories: S.Association<Vehicle, Category>;
		bookingChargeUnit: S.Association<Vehicle, BookingChargeUnit>;
		location: S.Association<Vehicle, Location>;
	};

	static load = (sequelize: S.Sequelize) => {
		Vehicle.init(
			{
				objectId: {
					type: S.DataTypes.STRING,
					allowNull: false,
					unique: { name: "objectId", msg: "Object ID already in use!" }
				},
				brand: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Brand is required" }
					}
				},
				model: {
					type: S.DataTypes.STRING,
					allowNull: false,
					validate: {
						notNull: { msg: "Model is required" }
					}
				},
				plateNumber: {
					type: S.DataTypes.STRING,
					allowNull: false,
					unique: { name: "plateNumber", msg: "Plate number already in use!" }
				},
				vin: {
					type: S.DataTypes.STRING,
					unique: { name: "vin", msg: "VIN already in use!" }
				},
				defleeted: { type: S.DataTypes.BOOLEAN, defaultValue: false },
				parkingLocation: { type: S.DataTypes.STRING },
				vehicleImageSrc: { type: S.DataTypes.STRING },
				bookingChargeCount: {
					type: S.DataTypes.INTEGER,
					defaultValue: 0,
					allowNull: false
				},
				bookingCharge: {
					type: S.DataTypes.INTEGER,
					defaultValue: 0,
					allowNull: false
				},
				wialonUnitId: {
					type: S.DataTypes.INTEGER
				}
			},
			{
				sequelize
			}
		);

		Vehicle.belongsTo(BookingChargeUnit, {
			as: "bookingChargeUnit",
			foreignKey: {
				name: "bookingChargeUnitId"
			}
		});
		Vehicle.belongsTo(Client, {
			as: "client",
			foreignKey: {
				name: "clientId"
			}
		});
		Vehicle.belongsTo(Location, {
			as: "location",
			foreignKey: "locationId"
		});
		Vehicle.hasMany(Booking, {
			as: "bookings",
			foreignKey: "vehicleId"
		});
		Vehicle.hasMany(VehicleIssue, {
			as: "vehicleIssues",
			foreignKey: "vehicleId"
		});
		Vehicle.belongsToMany(Category, {
			as: "categories",
			through: "VehicleCategories",
			foreignKey: "vehicleId",
			otherKey: "categoryId"
		});
	};
}
