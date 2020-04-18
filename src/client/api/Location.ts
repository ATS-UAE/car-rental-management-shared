import { Api } from ".";
import {
	ServerResponseMeta,
	LocationServerResponseGetAll,
	LocationServerResponseGet,
	ExtractServerResponseData
} from "../../shared/typings";

export class Location {
	constructor(
		public data: ExtractServerResponseData<LocationServerResponseGet>,
		public meta: ServerResponseMeta
	) {}

	public static fromClientId = (clientId: number) =>
		Api.execute<ExtractServerResponseData<LocationServerResponseGetAll>>(
			"get",
			`/api/carbooking/clients/${clientId}/locations`
		).then(({ data, ...meta }) => {
			return data.map(l => new Location(l, meta));
		});

	public static getAll = () =>
		Api.execute<ExtractServerResponseData<LocationServerResponseGetAll>>(
			"get",
			`/api/carbooking/locations`
		).then(({ data, ...meta }) => {
			return data.map(l => new Location(l, meta));
		});
}
