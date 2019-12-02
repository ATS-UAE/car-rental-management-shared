import React, { FC, useState } from "react";
import { connect } from "react-redux";

import { ReportArea as ReportAreaPresentational } from "../presentational";
import { UnitSummary } from "../../utils/reports";
import { Column } from "material-table";
import { ReduxState } from "../../typings";

const reportList = [
	{
		label: "Unit Summary",
		value: 1
	}
];

interface ReportAreaStateProps {
	auth: ReduxState["auth"];
}

const getGenerator = (value: number | string) => {
	switch (value) {
		case 1: {
			return new UnitSummary();
		}
		default: {
			throw new Error("Unknown report value of " + value);
		}
	}
};

export const ReportAreaContainer: FC<ReportAreaStateProps> = ({ auth }) => {
	const [selectedReport, setSelectedReport] = useState<number | string>();
	const [columns, setColumns] = useState<Array<Column<any>>>();
	const [data, setData] = useState<object[]>();
	const [loading, setLoading] = useState(false);

	return (
		<ReportAreaPresentational
			reportList={reportList}
			data={data}
			loading={loading}
			onSelect={value => {
				setSelectedReport(value);
			}}
			columns={columns}
			onClick={async () => {
				setLoading(true);
				const report = selectedReport && getGenerator(selectedReport);
				try {
					const data = report && (await report.generate());
					const columns =
						auth &&
						auth.data &&
						report &&
						(await report.getColumnData(auth.data.role.name));
					data && setData(data);
					columns && setColumns(columns);
				} catch (e) {
					console.error(e);
				}
				setLoading(false);
			}}
			value={selectedReport}
		></ReportAreaPresentational>
	);
};

const mapStateToProps = ({ auth }: ReduxState): ReportAreaStateProps => ({
	auth
});

export const ReportArea = connect<ReportAreaStateProps, {}, {}, ReduxState>(
	mapStateToProps
)(ReportAreaContainer);
