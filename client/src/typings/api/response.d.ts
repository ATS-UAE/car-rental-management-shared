// TODO: Move api defs in "api" folder.

export interface WithServerResponse<Result> extends ServerResponseMeta {
	data: Result;
}

export interface ServerResponseMeta {
	code: number;
	errors: Array<string | { key: string; value: string }>;
	success: boolean;
	message: string;
}
