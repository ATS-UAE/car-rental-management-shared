import { Api } from ".";
import { ServerResponseMeta } from "../typings";

export interface LocationAttributes {
	id: number;
	name: string;
	lat: number;
	lng: number;
	address: string;
	locationImageSrc: string | null;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export class Location {
	constructor(
		public data: LocationAttributes,
		public meta: ServerResponseMeta
	) {}

	public static fromClientId = (clientId: number) =>
		Api.execute<LocationAttributes[]>(
			"get",
			`/api/carbooking/clients/${clientId}/locations`
		).then(({ data, ...meta }) => {
			return data.map(l => new Location(l, meta));
		});
}
