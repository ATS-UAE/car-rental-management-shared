import {
	UserServerResponseGet,
	ExtractServerResponseData,
	ServerResponseMeta
} from "../../shared/typings";

export class User {
	constructor(
		public data: ExtractServerResponseData<UserServerResponseGet>,
		public meta: ServerResponseMeta
	) {}
}
