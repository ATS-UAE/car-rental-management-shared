import {
	ServerResponseMeta,
	ExtractServerResponseData,
	ClientServerResponseGet
} from "../../shared/typings";

export class Client {
	constructor(
		public data: ExtractServerResponseData<ClientServerResponseGet>,
		public meta: ServerResponseMeta
	) {}
}
