export default abstract class DataSource {
	protected db: any;
	constructor(db: any) {
		this.db = db;
	}

	protected createVehicle(data: object): Promise<any> {
		return this.db.Vehicle.create(data);
	}

	protected getVehicles(options?: object): Promise<any> {
		return this.db.Vehicle.findAll(options);
	}

	protected getVehicle(id: number, options?: object): Promise<any> {
		return this.db.Vehicle.findByPk(id, options);
	}

	protected createUser(data: object): Promise<any> {
		return this.db.User.create(data);
	}

	protected getUsers(options?: object): Promise<any> {
		return this.db.User.findAll(options);
	}

	protected getUser(id: number, options?: object): Promise<any> {
		return this.db.User.findByPk(id, options);
	}

	protected createLocation(data: object): Promise<any> {
		return this.db.Booking.create(data);
	}
	protected getLocations(options?: object): Promise<any> {
		return this.db.Location.findAll(options);
	}
	protected getLocation(id: number, options?: object): Promise<any> {
		return this.db.Location.findByPk(id, options);
	}

	protected createBooking(data: object): Promise<any> {
		return this.db.Booking.create(data);
	}
	protected getBookings(options?: object): Promise<any> {
		return this.db.Booking.findAll(options);
	}
	protected getBooking(id: number, options?: object): Promise<any> {
		return this.db.Booking.findByPk(id, options);
	}

	protected createAccident(data: object): Promise<any> {
		return this.db.Accident.create(data);
	}
	protected getAccidents(options?: object): Promise<any> {
		return this.db.Accident.findAll(options);
	}
	protected getAccident(id: number, options?: object): Promise<any> {
		return this.db.Accident.findByPk(id, options);
	}
}
