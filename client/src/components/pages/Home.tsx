import React, { useEffect, Fragment, FC, ReactNode } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
	Paper,
	Grid,
	withStyles,
	Typography,
	createStyles,
	Theme,
	WithStyles
} from "@material-ui/core";
import moment from "moment";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";
import tinygradient from "tinygradient";

import * as actions from "../../actions";
import { Role } from "../../variables/enums";
import { getBookingStatus, toTitleWords } from "../../utils/helpers";
import {
	Booking,
	VehicleResponse,
	UserResponse,
	Accident,
	Auth,
	WithServerResponse
} from "../../typings/api";

let gradients = ["#FF8E53", "#ffd400", "#FE6B8B", "#a500ff", "#0072ff"];

interface IPageHome {
	auth?: WithServerResponse<Auth>;
	bookings?: WithServerResponse<Booking[]>;
	vehicles?: WithServerResponse<VehicleResponse[]>;
	users?: WithServerResponse<UserResponse[]>;
	accidents?: WithServerResponse<Accident[]>;
}

const Home: FC<IPageHome & typeof actions & WithStyles<typeof styles>> = ({
	fetchBookings,
	fetchVehicles,
	fetchUsers,
	fetchAccidents,
	auth,
	bookings,
	vehicles,
	accidents,
	classes
}) => {
	useEffect(() => {
		fetchBookings();
		fetchVehicles();
		fetchUsers();
		fetchAccidents();
	}, []);

	const children: ReactNode[] = [];
	let currentTime = moment();
	let monthEnd = moment().endOf("month");
	let monthStart = moment().startOf("month");

	if (auth && auth) {
		if (bookings && bookings.data) {
			let statuses: Array<any> = [];
			statuses.push("Total");
			let data = bookings.data.reduce((acc: Array<any>, booking) => {
				let bookingStart = moment(booking.from, "X");
				if (bookingStart.isBetween(monthStart, monthEnd)) {
					let day = `${bookingStart.format("D")}`;
					let bookingStatus = toTitleWords(getBookingStatus(booking));
					let existingDay = acc.find(data => data.name === day);
					statuses.indexOf(bookingStatus) < 0 && statuses.push(bookingStatus);
					if (existingDay) {
						existingDay["Total"]++;
						if (existingDay[bookingStatus] !== undefined) {
							existingDay[bookingStatus]++;
						} else {
							existingDay[bookingStatus] = 1;
						}
					} else {
						acc.push({
							name: day,
							Total: 1,
							[bookingStatus]: 1
						});
					}
				}
				return acc;
			}, []);

			let legendColors = tinygradient(
				gradients.slice(0, Math.max(2, statuses.length))
			).rgb(Math.max(2, statuses.length));
			children.push(
				<Fragment>
					<Typography align="center" variant="h6" component="h1">
						{`${currentTime.format("MMM")} Bookings`}
					</Typography>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							{statuses.map((value, index) => (
								<Bar
									key={value}
									dataKey={value}
									fill={`#${legendColors[index].toHex()}`}
								/>
							))}
						</BarChart>
					</ResponsiveContainer>
				</Fragment>
			);
		}

		let data: any =
			vehicles &&
			bookings &&
			bookings.data &&
			vehicles.data &&
			vehicles.data.reduce(
				(
					acc: [
						{
							Booked: number;
						},
						{
							Available: number;
						}
					],
					vehicle
				): [
					{
						Booked: number;
					},
					{
						Available: number;
					}
				] => {
					if (
						bookings &&
						bookings.data &&
						bookings.data.find(
							booking =>
								booking &&
								booking.vehicleId &&
								booking.vehicleId === vehicle.id &&
								booking.to < currentTime.unix() &&
								booking.finalized === true
						)
					) {
						acc[1].Available++;
					} else {
						acc[0].Booked++;
					}

					return acc;
				},
				[
					{
						Booked: 0
					},
					{
						Available: 0
					}
				]
			);
		data &&
			children.push(
				<Fragment>
					<Typography align="center" variant="h6" component="h1">
						Vehicle Status
					</Typography>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey={"Available"} fill={gradients[0]} />
							<Bar dataKey={"Booked"} fill={gradients[1]} />
						</BarChart>
					</ResponsiveContainer>
				</Fragment>
			);

		if (auth && auth.data && auth.data.role !== Role.GUEST) {
			let data: any =
				accidents &&
				accidents.data &&
				accidents.data.reduce((acc: any, accident) => {
					let accidentTime = moment(accident.createdAt, "X");
					if (accidentTime.isBetween(monthStart, monthEnd)) {
						let day = `${accidentTime.format("D")}`;
						let existingDay = acc.find((data: any) => data.name === day);
						if (existingDay) {
							existingDay["Total"]++;
						} else {
							acc.push({
								name: day,
								Total: 1
							});
						}
					}
					return acc;
				}, []);
			data &&
				children.push(
					<Fragment>
						<Typography align="center" variant="h6" component="h1">
							{`${currentTime.format("MMM")} Accidents`}
						</Typography>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={data}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey={"Total"} fill={gradients[0]} />
							</BarChart>
						</ResponsiveContainer>
					</Fragment>
				);
		}
	}

	return (
		<Grid container>
			{children.map((child, index) => (
				<Grid item xs={12} md={6} key={index}>
					<Paper className={classes.paper}>{child}</Paper>
				</Grid>
			))}
		</Grid>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(3),
			margin: theme.spacing(1)
		}
	});

const mapStateToProps = ({
	bookings,
	vehicles,
	users,
	accidents,
	auth
}: Pick<
	IPageHome,
	"bookings" | "vehicles" | "users" | "accidents" | "auth"
>) => ({
	bookings,
	vehicles,
	users,
	accidents,
	auth
});

export default compose<
	IPageHome & typeof actions & WithStyles<typeof styles>,
	{}
>(
	connect(mapStateToProps, actions),
	withStyles(styles)
)(Home);
