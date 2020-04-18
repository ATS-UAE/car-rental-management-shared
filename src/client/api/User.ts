import {
	UserServerResponseGet,
	ExtractServerResponseData,
	ServerResponseMeta,
	LocationServerResponseGetAll
} from "../../shared/typings";
import { Api, Location } from ".";

export class User {
	constructor(
		public data: ExtractServerResponseData<UserServerResponseGet>,
		public meta: ServerResponseMeta
	) {}
	public getLocations = () =>
		Api.execute<ExtractServerResponseData<LocationServerResponseGetAll>>(
			"get",
			`/api/carbooking/users/${this.data.id}/locations`
		).then(({ data, ...meta }) => {
			return data.map(l => new Location(l, meta));
		});
}
