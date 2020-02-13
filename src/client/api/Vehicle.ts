import {
	VehicleAttributes,
	LocationAttributes,
	PartialExcept,
	ServerResponseMeta,
	WialonUnitAttributes,
	LocationServerResponseGet,
	VehicleServerResponseGet,
	ExtractServerResponseData
} from "../../shared/typings";
import { Api, Location } from ".";

export class Vehicle {
	constructor(
		public data: ExtractServerResponseData<VehicleServerResponseGet>,
		public meta?: ServerResponseMeta
	) {}

	public wialonData: WialonUnitAttributes | null = null;

	public getWialonData = async () => {
		if (this.data.wialonUnitId) {
			this.wialonData = await Api.execute<WialonUnitAttributes>(
				"get",
				`/api/carbooking/wialon/${this.data.wialonUnitId}`
			).then(res => res.data);
		}
	};

	public static getLocation = async (vehicleId: number) =>
		Api.execute<ExtractServerResponseData<LocationServerResponseGet>>(
			"get",
			`/api/carbooking/vehicles/${vehicleId}/location`
		).then(({ data, ...meta }) =>
			data !== null ? new Location(data, meta) : null
		);

	public fromId = async (vehicleId: number) =>
		Api.execute<ExtractServerResponseData<VehicleServerResponseGet>>(
			"get",
			`/api/carbooking/vehicles/${vehicleId}`
		).then(({ data, ...meta }) => new Vehicle(data, meta));
}
