import { Api } from ".";
import {
	ServerResponseMeta,
	LocationServerResponseGet,
	ExtractServerResponseData
} from "../../shared/typings";

export class Location {
	constructor(
		public data: ExtractServerResponseData<LocationServerResponseGet>,
		public meta: ServerResponseMeta
	) {}

	public static fromClientId = (clientId: number) =>
		Api.execute<ExtractServerResponseData<LocationServerResponseGet>[]>(
			"get",
			`/api/carbooking/clients/${clientId}/locations`
		).then(({ data, ...meta }) => {
			return data.map(l => new Location(l, meta));
		});
}
