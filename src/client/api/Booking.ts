import { Api, WialonUnit } from ".";
import {
	ServerResponseMeta,
	ExtractServerResponseData,
	BookingServerResponseGet,
	WialonUnitServerResponseGet,
	BookingServerParamsPost,
	BookingServerParamsPatch,
	VehicleServerResponseGet,
	UserServerResponseGet,
	Role
} from "../../shared/typings";
import { User, Vehicle } from ".";

export type BookingUpdateParams = ExtractServerResponseData<
	BookingServerParamsPatch
>;

export type BookingGetResponseItem = ExtractServerResponseData<
	BookingServerResponseGet
>;

export type BookingFinalizeParams = Pick<
	BookingUpdateParams,
	| "returnDate"
	| "pickupDate"
	| "amount"
	| "endFuel"
	| "startFuel"
	| "startMileage"
	| "endMileage"
>;

export type BookingPickupParams = Pick<
	BookingUpdateParams,
	"startMileage" | "startFuel"
>;

export class Booking {
	constructor(
		public data: BookingGetResponseItem,
		public meta: ServerResponseMeta
	) {}

	public static fromId = (id: number) =>
		Api.execute<ExtractServerResponseData<BookingServerResponseGet>>(
			"get",
			`/api/carbooking/bookings/${id}`
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(data, meta);
		});

	public static getVehicleWialonData = (bookingId: number) =>
		Api.execute<ExtractServerResponseData<WialonUnitServerResponseGet>>(
			"get",
			`/api/carbooking/bookings/${bookingId}/vehicle/wialonUnit`
		).then(({ data, ...meta }) => (data ? new WialonUnit(data, meta) : null));

	public reload = () =>
		Api.execute<ExtractServerResponseData<BookingServerResponseGet>>(
			"get",
			`/api/carbooking/bookings/${this.data.id}`
		).then(res => {
			const { data, ...meta } = res;
			this.data = { ...data };
			this.meta = { ...meta };
			return this;
		});

	public static fetch = (id: number) =>
		Api.execute<ExtractServerResponseData<BookingServerResponseGet>>(
			"get",
			`/api/carbooking/bookings/${id}`
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(res.data, meta);
		});

	public static create = (params: BookingServerParamsPost) =>
		Api.execute<
			ExtractServerResponseData<BookingServerResponseGet>,
			BookingServerParamsPost
		>("post", `/api/carbooking/bookings`, {
			body: params
		}).then(res => {
			const { data, ...meta } = res;
			return new Booking(res.data, meta);
		});

	public static fetchAll = () =>
		Api.execute<ExtractServerResponseData<BookingServerResponseGet>[]>(
			"get",
			"/api/carbooking/bookings"
		).then(res => {
			const { data, ...meta } = res;
			return data.map(b => new Booking(b, meta));
		});

	public canDelete = (role: Role) => {
		return this.data.approved === null || role === Role.ADMIN;
	};

	public getUser = () =>
		Api.execute<ExtractServerResponseData<UserServerResponseGet>>(
			"get",
			`/api/carbooking/bookings/${this.data.id}/user`
		).then(({ data, ...meta }) => new User(data, meta));

	public getVehicle = () =>
		Api.execute<ExtractServerResponseData<VehicleServerResponseGet>>(
			"get",
			`/api/carbooking/bookings/${this.data.id}/vehicle`
		).then(({ data, ...meta }) => new Vehicle(data, meta));

	public static destroy = (id: number) =>
		Api.execute<ExtractServerResponseData<BookingServerResponseGet>>(
			"delete",
			`/api/carbooking/bookings/${id}`
		).then(res => {
			const { data, ...meta } = res;
			return new Booking(data, meta);
		});

	public destroy = () => Booking.destroy(this.data.id);

	public approve = (approval?: boolean) =>
		Booking.approve(this.data.id, approval);

	public static approve = (id: number, approval?: boolean) =>
		Booking.update(id, { approved: approval === undefined ? true : approval });

	public static pay = (id: number) => Booking.update(id, { paid: true });

	public static update = (id: number, params: BookingUpdateParams) =>
		Api.execute<
			ExtractServerResponseData<BookingServerResponseGet>,
			BookingUpdateParams
		>("patch", `/api/carbooking/bookings/${id}`, { body: params }).then(res => {
			const { data, ...meta } = res;
			return new Booking(data, meta);
		});

	public finalize = (values: BookingFinalizeParams) => this.update(values);

	public pickup = (values: BookingPickupParams) => this.update(values);

	public update = (params: BookingUpdateParams) =>
		Api.execute<
			ExtractServerResponseData<BookingServerResponseGet>,
			BookingUpdateParams
		>("patch", `/api/carbooking/bookings/${this.data.id}`, {
			body: params
		}).then(res => {
			const { data, ...meta } = res;
			this.data = { ...this.data, ...data };
			this.meta = meta;
			return this;
		});
}
