import { Api } from ".";
import { PartialExcept, ServerResponseMeta } from "../typings";
import { BookingType, Role } from "../variables/enums";

interface BookingAttributes {
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
	vehicle: {
		id: number;
		vin: string;
		plateNumber: string;
		brand: string;
		model: string;
	};

	readonly createdAt: number;
	readonly updatedAt: number;
}

export interface BookingCreateParams
	extends Omit<
		BookingAttributes,
		| "id"
		| "paid"
		| "amount"
		| "approved"
		| "finished"
		| "startMileage"
		| "endMileage"
		| "startFuel"
		| "endFuel"
		| "replaceVehicleId"
		| "createdAt"
		| "updatedAt"
		| "vehicle"
		| "finalized"
	> {
	replaceVehicle?: {
		vin: string;
		plateNumber: string;
		brand: string;
		model: string;
	};
}

export type BookingUpdateParams = Partial<Omit<BookingAttributes, "id">>;

export type BookingGetResponseItem = BookingAttributes;

export class Booking {
	constructor(
		public data: BookingGetResponseItem,
		public meta: ServerResponseMeta
	) {}

	public static fromId = (id: number) =>
		Api.execute<BookingAttributes>(
			"get",
			`/api/carbooking/bookings/${id}`
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(data, meta);
		});

	public reload = () =>
		Api.execute<BookingAttributes>(
			"get",
			`/api/carbooking/bookings/${this.data.id}`
		).then(res => {
			const { data, ...meta } = res;
			this.data = { ...data };
			this.meta = { ...meta };
			return this;
		});

	public static fetch = (id: number) =>
		Api.execute<BookingAttributes>(
			"get",
			`/api/carbooking/bookings/${id}`
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(res.data, meta);
		});

	public static create = (params: BookingCreateParams) =>
		Api.execute<BookingAttributes, BookingCreateParams>(
			"post",
			`/api/carbooking/bookings`,
			{
				body: params
			}
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(res.data, meta);
		});

	public static fetchAll = () =>
		Api.execute<BookingAttributes[]>("get", "/api/carbooking/bookings").then(
			res => {
				const { data, ...meta } = res;
				return data.map(b => new Booking(b, meta));
			}
		);

	public canDelete = (role: Role) => {
		return this.data.approved === null || role === Role.ADMIN;
	};

	public static delete = (id: number) =>
		Api.execute<BookingAttributes>(
			"delete",
			`/api/carbooking/bookings/${id}`
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(data, meta);
		});

	public delete = () => Booking.delete(this.data.id);
	public approve = (approval?: boolean) =>
		Booking.approve(this.data.id, approval);

	public static approve = (id: number, approval?: boolean) =>
		Booking.update(id, { approved: approval === undefined ? true : approval });

	public static pay = (id: number) => Booking.update(id, { paid: true });

	public static update = (id: number, params: BookingUpdateParams) =>
		Api.execute<BookingAttributes, BookingUpdateParams>(
			"patch",
			`/api/carbooking/bookings/${id}`,
			{ body: params }
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(data, meta);
		});

	public finalize = (amount: number) => this.update({ amount });

	public update = (params: BookingUpdateParams) =>
		Api.execute<BookingAttributes, BookingUpdateParams>(
			"patch",
			`/api/carbooking/bookings/${this.data.id}`,
			{ body: params }
		).then(res => {
			const { data, ...meta } = res;
			this.data = { ...this.data, ...data };
			this.meta = meta;
			return this;
		});
}
