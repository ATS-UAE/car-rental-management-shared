import {
	ServerResponseMeta,
	WialonUnitServerResponseGet,
	ExtractServerResponseData
} from "../../shared/typings";
import { Api, Location } from ".";

export class WialonUnit {
	constructor(
		public data: NonNullable<
			ExtractServerResponseData<WialonUnitServerResponseGet>
		>,
		public meta?: ServerResponseMeta
	) {}

	get mileage() {
		return this.data.mileage;
	}
}
