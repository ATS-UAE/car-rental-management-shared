export interface WithServerResponse<Result> {
	code: number;
	errors: string[];
	success: boolean;
	data: Result | null;
}
