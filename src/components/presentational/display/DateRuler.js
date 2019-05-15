import React from "react";
import PropTypes from "prop-types";
import { ArrowDropDown } from "@material-ui/icons";
import moment from "moment";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function DateRuler({ dateRange, classes, ticks }) {
	const dateStart = moment(dateRange.from, "X");
	const dateEnd = moment(dateRange.to, "X");
	// Minimum 2 ticks.
	let $ticks = ticks < 2 ? 2 : ticks;
	let increment = (dateEnd.unix() - dateStart.unix()) / $ticks;
	let markers = [];
	markers.push(dateStart);

	for (let i = 2, incrementDate = dateStart.clone(); i < $ticks; i++) {
		let markerDate = incrementDate.add(increment, "seconds");
		markers.push(markerDate.clone());
	}
	markers.push(dateEnd);

	return (
		<div className={classes.container}>
			{markers.map((marker, index) => {
				return (
					<div key={index} className={classes.ticks}>
						<div className={classes.label}>
							<div className={classes.labelText}>
								<Typography variant="subtitle2">
									{marker.format("YYYY-MM-DD")}
								</Typography>
								<Typography variant="caption">
									{marker.format("h:mm a")}
								</Typography>
							</div>
							<ArrowDropDown />
						</div>
					</div>
				);
			})}
		</div>
	);
}

const styles = theme => ({
	ticks: {
		position: "relative"
	},
	label: {
		position: "absolute",
		whiteSpace: "nowrap",
		transform: "translateX(-50%)",
		textAlign: "center"
	},
	labelText: {
		alignText: "center"
	},
	container: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: theme.spacing.unit * 7
	}
});

export default withStyles(styles)(DateRuler);

DateRuler.propTypes = {
	dateRange: PropTypes.shape({
		from: PropTypes.number,
		to: PropTypes.number
	}).isRequired,
	ticks: PropTypes.number
};

DateRuler.defaultProps = {
	ticks: 10
};
