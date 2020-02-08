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
