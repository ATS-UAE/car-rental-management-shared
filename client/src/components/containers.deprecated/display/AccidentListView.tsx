import React, { useState, Fragment, FC } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { History } from "history";
import { compose } from "recompose";
import {
	ListItem,
	Avatar,
	ListItemText,
	Grid,
	withStyles,
	Typography,
	IconButton,
	createStyles,
	Theme,
	WithStyles
} from "@material-ui/core";
import { Delete, Image } from "@material-ui/icons";
import moment from "moment";

import * as actions from "../../../actions";
import { Action, Resource } from "../../../variables/enums";
import api from "../../../utils/helpers/api";
import ListView from "../../presentational/display/ListView";
import AccidentFormCreateButtonDialog from "../forms.deprecated/accidents/AccidentFormCreateButtonDialog";
import FormPage from "../../pages/FormPage";
import { IAccident, IVehicle, IAuth } from "../../../utils/typings/api/";
import { ReactNode } from "react";
import { useStyles } from "../../../utils/helpers/hooks";
// type mapStateToPropsFunction = (state: Pick<IAccidentListViewProps, "accidents">) => Pick<IAccidentListViewProps, "vehicles" | "accidents" | "auth">

const mapStateToProps = ({
	accidents,
	vehicles,
	auth
}: Pick<IAccidentListViewProps, "accidents" | "vehicles" | "auth">) => {
	return { accidents, vehicles, auth };
};

const styles = (theme: Theme) =>
	createStyles({
		actionButton: {
			...theme.mixins.toolbar,
			borderRadius: 0,
			width: "100%"
		}
	});

interface IAccidentListViewProps extends WithStyles<typeof styles> {
	accidents: Array<IAccident>;
	vehicles: Array<IVehicle>;
	history: History;
	auth: IAuth;
	fetchAccidents: typeof actions.fetchAccidents;
}
const AccidentListView: FC<IAccidentListViewProps> = ({
	accidents,
	vehicles,
	history,
	classes,
	auth,
	fetchAccidents
}) => {
	const [formData, setFormData] = useState({});
	return (
		<ListView
			list={
				<Fragment>
					<ListHeader />
					<AccidentList
						history={history}
						accidents={accidents}
						vehicles={vehicles}
						baseRoute="accidents"
					/>
				</Fragment>
			}
			header={<Header />}
			body={<Body />}
		/>
	);
};

interface AccidentListProps {
	accidents: Array<IAccident>;
	vehicles: Array<IVehicles>;
	selected?: number;
	baseRoute: string;
}

const AccidentList: FC<AccidentListProps> = ({
	accidents,
	vehicles,
	selected,
	baseRoute,
	history
}) => {
	return accidents.map(accident => {
		const vehicle = vehicles.find(vehicle => vehicle.id === selected);
		return (
			<ListItem
				selected={selected === accident.id}
				key={accident.id}
				button
				onClick={async () => {
					try {
						let accidentRes = await api.fetchAccident(accident.id);
						let userRes = await api.fetchUser(accident.userId);
						await api.updateAccident({
							id: accident.id,
							read: true
						});

						history.push(`/${baseRoute}/${accident.id}`, {
							accident: accidentRes.data,
							user: userRes.data,
							readAccess
						});
					} catch (e) {
						console.error(e);
						history.push(baseRoute);
					}
				}}
			>
				<Avatar src={accident.accidentImageSrc || undefined}>
					{!accident.accidentImageSrc && <Image />}
				</Avatar>
				<ListItemText
					primary={`${vehicle.brand} ${vehicle.model}`}
					secondary={vehicle.plateNumber}
				/>
			</ListItem>
		);
	});
};

const ListHeader: FC<{}> = () => {
	return (
		<AccidentFormCreateButtonDialog
			classes={{ button: classes.actionButton }}
		/>
	);
};

const Header: FC<{}> = () => {
	return (
		<IconButton
			aria-label="Delete"
			className={classes.deleteButton}
			onClick={() =>
				api.deleteAccident(formData.accident.id).then(() => {
					fetchAccidents();
					setFormData({});
					history.push("/accidents");
				})
			}
		>
			<Delete />
		</IconButton>
	);
};

interface IAccidentListViewBodyProps {
	image?: string;
	user: {
		firstName: string;
		lastName: string;
	};
	date: number;
	message: string;
}

const Body: FC<IAccidentListViewBodyProps> = ({
	image,
	user,
	date,
	message
}) => {
	const classes = useStyles({
		accidentImageSrc: {
			maxWidth: "500px",
			width: "50%",
			display: "block",
			margin: "0 auto"
		}
	})();
	return (
		<Grid container spacing={2}>
			{image && (
				<Grid item xs={12}>
					<img
						src={image}
						alt="Accident"
						className={classes.accidentImageSrc}
					/>
				</Grid>
			)}
			<Grid item xs={12}>
				<Typography>
					<Typography variant="h6" component="span" display="inline">
						From:
					</Typography>
					<Typography variant="subtitle1" component="span" display="inline">
						{`${user.firstName} ${user.lastName}`}
					</Typography>
				</Typography>
				<Typography>
					<Typography variant="h6" component="span" display="inline">
						Date:
					</Typography>
					<Typography variant="subtitle1" component="span" display="inline">
						{moment(date, "X").format("LLL")}
					</Typography>
				</Typography>
				{message && (
					<Fragment>
						<Typography variant="h6" component="span" display="inline">
							Message:
						</Typography>
						{message.split("\n").map((p, i) => (
							<Typography key={i} variant="body1">
								{p}
							</Typography>
						))}
					</Fragment>
				)}
			</Grid>
		</Grid>
	);
};

// const AccidentListView: FC<IAccidentListViewProps> = ({
// 	accidents,
// 	vehicles,
// 	history,
// 	classes,
// 	auth,
// 	fetchAccidents
// }) => {
// 	const [formData, setFormData] = useState({});

// 	let accidentList = [];
// 	if (accidents && vehicles) {
// 		accidentList =
// 			accidents.length > 0 ? (
// 				accidents.map(accident => (
// 					<Can
// 						key={accident.id}
// 						action={Action.READ}
// 						resource={Resource.ACCIDENTS}
// 						params={{ user: auth, accident }}
// 						yes={readAccess => {
// 							let vehicle = vehicles.find(
// 								vehicle => vehicle.id === accident.vehicleId
// 							);
// 							return (
// 								<ListItem
// 									selected={
// 										formData &&
// 										formData.accident &&
// 										formData.accident.id === accident.id
// 									}
// 									button
// 									onClick={async () => {
// 										try {
// 											let accidentRes = await api.fetchAccident(accident.id);
// 											let userRes = await api.fetchUser(accident.userId);
// 											await api.updateAccident({
// 												id: accident.id,
// 												read: true
// 											});

// 											history.push(`/accidents/${accident.id}`, {
// 												accident: accidentRes.data,
// 												user: userRes.data,
// 												readAccess
// 											});
// 										} catch (e) {
// 											console.error(e);
// 											history.push("/accidents");
// 										}
// 									}}
// 								>
// 									<Avatar src={accident.accidentImageSrc || undefined}>
// 										{!accident.accidentImageSrc && <Image />}
// 									</Avatar>
// 									<ListItemText
// 										primary={`${vehicle.brand} ${vehicle.model}`}
// 										secondary={vehicle.plateNumber}
// 									/>
// 								</ListItem>
// 							);
// 						}}
// 					/>
// 				))
// 			) : (
// 				<ListItem>
// 					<ListItemText primary="There seems to be nothing here" />
// 				</ListItem>
// 			);
// 	}

// 	const listHeader = (
// 		<Grid container justify="space-between">
// 			<Can
// 				action={Action.CREATE}
// 				resource={Resource.ACCIDENTS}
// 				yes={() => (
// 					<AccidentFormCreateButtonDialog
// 						classes={{ button: classes.actionButton }}
// 					/>
// 				)}
// 			/>
// 		</Grid>
// 	);

// 	return (
// 		<ListView
// 			list={
// 				<Fragment>
// 					{listHeader}
// 					{accidentList}
// 				</Fragment>
// 			}
// 			header={
// 				<Can
// 					action={Action.DELETE}
// 					resource={Resource.ACCIDENTS}
// 					yes={() =>
// 						formData && formData.accident ? (
// 							<IconButton
// 								aria-label="Delete"
// 								className={classes.deleteButton}
// 								onClick={() =>
// 									api.deleteAccident(formData.accident.id).then(() => {
// 										fetchAccidents();
// 										setFormData({});
// 										history.push("/accidents");
// 									})
// 								}
// 							>
// 								<Delete />
// 							</IconButton>
// 						) : null
// 					}
// 				/>
// 			}
// 			body={
// 				<FormPage
// 					path="/accidents/:id"
// 					check={({ location }) => /\/accidents\/\d+/.test(location.pathname)}
// 					render={() => {
// 						if (formData && formData.accident && formData.user) {
// 							const accident = formData.accident;
// 							const user = formData.user;
// 							const { accidentImageSrc, message, createdAt } = accident;
// 							const { firstName, lastName } = user;

// 							return (
// 								<Grid container spacing={2}>
// 									{accidentImageSrc && (
// 										<Grid item xs={12}>
// 											<img
// 												src={accidentImageSrc}
// 												alt="Accident"
// 												className={classes.accidentImageSrc}
// 											/>
// 										</Grid>
// 									)}
// 									<Grid item xs={12}>
// 										<Typography>
// 											<Typography
// 												variant="h6"
// 												component="span"
// 												display="inline"
// 											>
// 												From:
// 											</Typography>
// 											<Typography
// 												variant="subtitle1"
// 												component="span"
// 												display="inline"
// 											>
// 												{`${firstName} ${lastName}`}
// 											</Typography>
// 										</Typography>
// 										<Typography>
// 											<Typography
// 												variant="h6"
// 												component="span"
// 												display="inline"
// 											>
// 												Date:
// 											</Typography>
// 											<Typography
// 												variant="subtitle1"
// 												component="span"
// 												display="inline"
// 											>
// 												{moment(createdAt, "X").format("LLL")}
// 											</Typography>
// 										</Typography>
// 										{message && (
// 											<Fragment>
// 												<Typography
// 													variant="h6"
// 													component="span"
// 													display="inline"
// 												>
// 													Message:
// 												</Typography>
// 												{message.split("\n").map((p, i) => (
// 													<Typography key={i} variant="body1">
// 														{p}
// 													</Typography>
// 												))}
// 											</Fragment>
// 										)}
// 									</Grid>
// 								</Grid>
// 							);
// 						}
// 						return null;
// 					}}
// 					popUp={false}
// 					onChange={({ location }) => {
// 						location &&
// 							location.state &&
// 							location.state.accident &&
// 							location.state.user &&
// 							setFormData({
// 								accident: location.state.accident,
// 								user: location.state.user
// 							});
// 					}}
// 				/>
// 			}
// 		/>
// 	);
// }

export default compose<IAccidentListViewProps, {}>(
	withStyles(styles),
	connect(
		mapStateToProps,
		actions
	),
	withRouter
)(AccidentListView);
