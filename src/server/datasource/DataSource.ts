import UserAccessor from "./types/UserAccessor";
import RBAC from "../utils/rbac";
import { Operation, Resource } from "../variables/enums";

export default abstract class DataSource {
	constructor(
		protected db: any,
		protected user?: UserAccessor,
		protected resource?: Resource
	) {}

	protected getUserPermissions = async (
		action: Operation,
		params?: any
	): Promise<{ access: boolean; excludedFields: string[] }> => {
		if (this.user && this.resource) {
			return {
				access: await RBAC.can(this.user.role, action, this.resource, params),
				excludedFields: RBAC.getExcludedFields(
					this.user.role,
					action,
					this.resource
				)
			};
		}
		return { access: false, excludedFields: [] };
	};

	protected createVehicle(data: object): Promise<any> {
		return this.db.Vehicle.create(data);
	}

	protected getVehicles(options?: object): Promise<any> {
		return this.db.Vehicle.findAll({ ...options, include: [{ all: true }] });
	}

	protected getVehicle(id: number, options?: object): Promise<any> {
		return this.db.Vehicle.findByPk(id, {
			...options,
			include: [{ all: true }]
		});
	}

	protected createUser(data: object): Promise<any> {
		return this.db.User.create(data);
	}

	protected getUsers(options?: object): Promise<any> {
		return this.db.User.findAll({ ...options, include: [{ all: true }] });
	}

	protected getUser(id: number, options?: object): Promise<any> {
		return this.db.User.findByPk(id, { ...options, include: [{ all: true }] });
	}

	protected createLocation(data: object): Promise<any> {
		return this.db.Location.create(data);
	}
	protected getLocations(options?: object): Promise<any> {
		return this.db.Location.findAll({ ...options, include: [{ all: true }] });
	}
	protected getLocation(id: number, options?: object): Promise<any> {
		return this.db.Location.findByPk(id, {
			...options,
			include: [{ all: true }]
		});
	}

	protected createBooking(data: object): Promise<any> {
		return this.db.Booking.create(data);
	}
	protected getBookings(options?: object): Promise<any> {
		return this.db.Booking.findAll({ ...options, include: [{ all: true }] });
	}
	protected getBooking(id: number, options?: object): Promise<any> {
		return this.db.Booking.findByPk(id, {
			...options,
			include: [{ all: true }]
		});
	}

	protected createAccident(data: object): Promise<any> {
		return this.db.Accident.create(data);
	}
	protected getAccidents(options?: object): Promise<any> {
		return this.db.Accident.findAll({ ...options, include: [{ all: true }] });
	}
	protected getAccident(id: number, options?: object): Promise<any> {
		return this.db.Accident.findByPk(id, {
			...options,
			include: [{ all: true }]
		});
	}

	protected createClient(data: object): Promise<any> {
		return this.db.Client.create(data);
	}
	protected getClients(options?: object): Promise<any> {
		return this.db.Client.findAll({ ...options, include: [{ all: true }] });
	}
	protected getClient(id: number, options?: object): Promise<any> {
		return this.db.Client.findByPk(id, {
			...options,
			include: [{ all: true }]
		});
	}

	protected createCategory(data: object): Promise<any> {
		return this.db.Category.create(data);
	}
	protected getCategorys(options?: object): Promise<any> {
		return this.db.Category.findAll({ ...options, include: [{ all: true }] });
	}
	protected getCategory(id: number, options?: object): Promise<any> {
		return this.db.Category.findByPk(id, {
			...options,
			include: [{ all: true }]
		});
	}
}
