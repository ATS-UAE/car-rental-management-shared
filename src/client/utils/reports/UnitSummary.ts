import { Column } from "material-table";

import { ReportUnitSummaryAttributes } from "../../../shared/typings";
import { Generatable } from ".";
import api from "../helpers/api";
import { Role } from "../../../shared/typings";
import { RoleUtils } from "../";

export class UnitSummary implements Generatable<ReportUnitSummaryAttributes[]> {
	public title = "Unit Summary";

	public generate = async () => {
		const response = await api.fetchUnitSummaryReport();
		return response.data;
	};

	public getColumnData = (
		role?: Role
	): Array<Column<ReportUnitSummaryAttributes>> => {
		const showSensitive =
			(role && RoleUtils.isRoleBetter(Role.KEY_MANAGER, role)) || false;

		const columns: Array<Column<ReportUnitSummaryAttributes>> = [
			{
				field: "brand",
				title: "Brand"
			},
			{
				field: "model",
				title: "Model"
			},
			{
				field: "defleeted",
				title: "Defleeted",
				type: "boolean"
			},
			{
				field: "wialonUnit",
				title: "Wialon Enabled",
				type: "boolean"
			},
			{ field: "plateNumber", title: "Plate Number" },
			{ field: "odometer", title: "Odometer", type: "numeric" },
			{ field: "accidents", title: "Accidents", type: "numeric" },
			{ field: "bookings", title: "Bookings", type: "numeric" },
			{
				field: "categories",
				title: "Categories",
				render: rowData => rowData.categories.join(", ")
			},
			{ field: "issues", title: "Issues", type: "numeric" }
		];

		if (showSensitive) {
			columns.push({
				field: "wialonUnitName",
				title: "Wialon Unit"
			});
		}

		if (role === Role.MASTER) {
			columns.push({
				field: "client",
				title: "Client"
			});
		}

		return columns;
	};
}
