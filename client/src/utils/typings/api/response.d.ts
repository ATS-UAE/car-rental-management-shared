export interface Response<Result> {
	code: number;
	errors: string[];
	success: boolean;
	data: Result;
}
