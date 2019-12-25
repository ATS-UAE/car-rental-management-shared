import React, { FC } from "react";
import { connect, MapStateToProps } from "react-redux";
import moment from "moment";
import { BarChart, BarChartProps } from "../presentational";
import { ReduxState } from "../../typings";

interface AccidentDashBoardStateProps {
	accidents: ReduxState["accidents"];
}

type Props = AccidentDashBoardStateProps;

const AccidentDashBoardBase: FC<Props> = ({ accidents }) => {
	const lastYear = moment()
		.subtract(11, "months")
		.startOf("month");
	const currentTime = moment();
	const data: BarChartProps<{ name: string; [key: string]: any }>["data"] = [];
	const bars: BarChartProps<{ name: string; [key: string]: any }>["bars"] = [];

	if (accidents && accidents.data) {
		for (
			const i = lastYear.clone();
			i <= currentTime.startOf("month");
			i.add(1, "month")
		) {
			const monthName = i.format("MMM");
			const monthData: { name: string; [key: string]: any } = {
				name: monthName,
				count: 0
			};

			for (const accident of accidents.data) {
				const accidentStart = moment(accident.createdAt, "X");

				if (accidentStart.isBetween(i, i.endOf("month"))) {
					if (monthData.count === 0) {
						bars.push(monthName);
					}
					monthData.count++;
				}
			}
			data.push(monthData);
		}
	}

	return (
		<BarChart title={`Year Accidents`} data={data || []} bars={bars} xAxis />
	);
};

const mapStateToProps: MapStateToProps<
	AccidentDashBoardStateProps,
	{},
	ReduxState
> = ({ accidents }) => ({ accidents });

export const AccidentDashBoard = connect(mapStateToProps)(
	AccidentDashBoardBase
);
