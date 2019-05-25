import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Paper, Grid, withStyles, Typography } from "@material-ui/core";
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
import { roles } from "../../variables/enums";
import { getBookingStatus, toTitleWords } from "../../utils";

let gradients = ["#FF8E53", "#ffd400", "#FE6B8B", "#a500ff", "#0072ff"];

function Home({
	fetchBookings,
	fetchVehicles,
	fetchUsers,
	fetchAccidents,
	auth,
	bookings,
	vehicles,
	users,
	accidents,
	classes
}) {
	useEffect(() => {
		fetchBookings();
		fetchVehicles();
		fetchUsers();
		fetchAccidents();
	}, []);

	const children = [];
	let currentTime = moment();
	let monthEnd = currentTime.endOf("month");
	let monthStart = currentTime.startOf("month");

	if (auth && auth.data) {
		if (bookings && bookings.data) {
			let statuses = [];
			statuses.push("Total");
			let data = bookings.data.reduce((acc, booking) => {
				let bookingStart = moment(booking.from, "X");
				if (bookingStart.isBetween(monthStart, monthEnd)) {
					let day = `${bookingStart.format("D")}`;
					let bookingStatus = toTitleWords(getBookingStatus(booking));
					let existingDay = acc.find(data => data.name === day);
					if (existingDay) {
						existingDay["Total"]++;
						if (existingDay[bookingStatus] !== undefined) {
							existingDay[bookingStatus]++;
						} else {
							statuses.push(bookingStatus);
							existingDay[bookingStatus] = 1;
						}
					} else {
						statuses.push(bookingStatus);
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
		if (vehicles && vehicles.data) {
			let data = vehicles.data.reduce(
				(acc, vehicle) => {
					return acc;
				},
				[
					{
						Booked: 5
					},
					{
						Available: 9
					}
				]
			);
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
		}
		if (users && users.data && auth.data.role !== roles.GUEST) {
			// Add tables
		}
		if (accidents && accidents.data && auth.data.role !== roles.GUEST) {
			let data = accidents.data.reduce((acc, accident) => {
				let accidentTime = moment(accident.createdAt, "X");
				if (accidentTime.isBetween(monthStart, monthEnd)) {
					let day = `${accidentTime.format("D")}`;
					let existingDay = acc.find(data => data.name === day);
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
		<Grid container className={classes.root}>
			{children.map((child, index) => (
				<Grid item xs={12} md={6} key={index}>
					<Paper className={classes.paper}>{child}</Paper>
				</Grid>
			))}
		</Grid>
	);
}

const styles = themes => ({
	paper: {
		padding: themes.spacing(3),
		margin: themes.spacing(1)
	}
});

const mapStateToProps = ({ bookings, vehicles, users, accidents, auth }) => ({
	bookings,
	vehicles,
	users,
	accidents,
	auth
});

export default compose(
	connect(
		mapStateToProps,
		actions
	),
	withStyles(styles)
)(Home);
