export interface AccidentAttributes {
	id: number;
	message: string;
	accidentImageSrc: string;
	accidentVideoSrc: string;
	lat: number;
	lng: number;
	userId: number;
	vehicleId: number;
	bookingId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface AccidentUserStatusAttributes {
	read: boolean;
	deleted: boolean;
	accidentId: number;
	userId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface BookingAttributes {
	id: number;
	paid: boolean;
	amount: number | null;
	from: Date;
	to: Date;
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

export interface CategoryAttributes {
	id: number;
	name: string;
	clientId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface ClientAttributes {
	id: number;
	name: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface ClientLocationAttributes {
	locationId: number;
	clientId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface LocationAttributes {
	id: number;
	name: string;
	lat: number;
	lng: number;
	address: string;
	locationImageSrc: string | null;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface ReplaceVehicleAttributes {
	id: number;
	plateNumber: string;
	brand: string;
	model: string;
	vin: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

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
	clientId: number | null;
	role: Role;
	userCreatorId: number;
	timeZone: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface UserVehicleCategoryAttributes {
	userId: number;
	categoryId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface VehicleAttributes {
	id: number;
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
	bookingChargeUnit: BookingChargeUnit | null;
	clientId: number | null;
	locationId: number | null;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface VehicleCategoryAttributes {
	categoryId: number;
	vehicleId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface VehicleIssueAttributes {
	id: number;
	message: string;
	vehicleId: number;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}
