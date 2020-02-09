import React, { FC } from "react";
import { connect, MapStateToProps } from "react-redux";
import moment from "moment";
import { BarChart, BarChartProps } from "../presentational";
import { getBookingStatus, toTitleWords } from "../../utils/helpers";
import { ReduxState } from "../../reducers";

interface BookingDashBoardStateProps {
	bookings: ReduxState["bookings"];
}

type Props = BookingDashBoardStateProps;

const BookingDashBoardBase: FC<Props> = ({ bookings }) => {
	const lastYear = moment()
		.subtract(11, "months")
		.startOf("month");
	const currentTime = moment();
	const data: BarChartProps<{ name: string; [key: string]: any }>["data"] = [];
	const bars: BarChartProps<{ name: string; [key: string]: any }>["bars"] = [];

	if (bookings && bookings.data) {
		for (
			const i = lastYear.clone();
			i <= currentTime.startOf("month");
			i.add(1, "month")
		) {
			const monthData: { name: string; [key: string]: any } = {
				name: i.format("MMM")
			};
			for (const booking of bookings.data) {
				const bookingStart = moment(booking.from, "X");

				if (bookingStart.isBetween(i, i.endOf("month"))) {
					const bookingStatus = toTitleWords(getBookingStatus(booking));
					if (monthData[bookingStatus]) {
						monthData[bookingStatus]++;
					} else {
						bars.push(bookingStatus);
						monthData[bookingStatus] = 1;
					}
				}
			}
			data.push(monthData);
		}
	}

	return <BarChart title="Year Bookings" data={data} bars={bars} />;
};

const mapStateToProps: MapStateToProps<
	BookingDashBoardStateProps,
	{},
	ReduxState
> = ({ bookings }) => ({ bookings });

export const BookingDashBoard = connect(mapStateToProps)(BookingDashBoardBase);
