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
		public data: PartialExcept<BookingAttributes, "id">,
		public meta?: ServerResponseMeta
	) {}

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

	public delete = () =>
		Api.execute<BookingAttributes>("delete", "/api/carbooking/bookings").then(
			res => {
				const { data, ...meta } = res;
				return new Booking(data, meta);
			}
		);

	public approve = (approval?: boolean) => {
		const approved = approval === undefined ? true : false;
		return this.update({ approved });
	};

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
