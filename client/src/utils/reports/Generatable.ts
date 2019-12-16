import { ExtractServerResponseData, FlattenIfArray } from "../../typings";
import { Column } from "material-table";
import { Role } from "../../variables/enums";

export interface Generatable<T extends Object> {
	generate: () => Promise<T | null> | T | null;
	getColumnData: (role?: Role) => Array<Column<FlattenIfArray<T>>>;
}
