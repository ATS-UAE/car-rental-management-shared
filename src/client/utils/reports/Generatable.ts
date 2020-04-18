import { FlattenIfArray } from "../../../shared/typings";
import { Column } from "material-table";
import { Role } from "../../../shared/typings";

export interface Generatable<T extends Object> {
	title: string;
	generate: () => Promise<T | null> | T | null;
	getColumnData: (role?: Role) => Array<Column<FlattenIfArray<T>>>;
}
