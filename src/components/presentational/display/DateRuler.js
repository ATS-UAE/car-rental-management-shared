import React from "react";
import PropTypes from "prop-types";
import { ArrowDropDown } from "@material-ui/icons";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

function DateRuler({ dateRange, classes, ticks }) {
	const dateStart = moment(dateRange.from, "X");
	const dateEnd = moment(dateRange.to, "X");

	let formatting;
	let division;
	let dates = [];
	let count = 1;
	const secondDifference = dateEnd
		.subtract(59, "seconds")
		.diff(dateStart, "seconds");

	if (secondDifference >= 34214399) {
		// >= 13 Months
		formatting = "YYYY";
		division = "seconds";
		count = secondDifference / ticks;
	} else if (secondDifference >= 2591999) {
		// >= 1 Month
		formatting = "MMM YYYY";
		division = "seconds";
		ticks = dateEnd.diff(dateStart, "months");
		count = secondDifference / ticks;
	} else if (secondDifference >= 86399) {
		// >= 1 day
		formatting = "MMM DD";
		division = "seconds";
		ticks = dateEnd.diff(dateStart, "days");
		count = secondDifference / ticks;
	} else if (secondDifference >= 43199) {
		// >= 12 hours
		formatting = "LT";
		division = "seconds";
		count = secondDifference / ticks;
	} else if (secondDifference >= 21599) {
		// >= 6 hours
		formatting = "LT";
		division = "seconds";

		count = secondDifference / ticks;
	} else {
		// < 6 hours
		formatting = "LT";
		division = "seconds";
		count = secondDifference / ticks;
	}
	for (
		let dateIterator = dateStart.clone();
		dateIterator.isBefore(dateEnd.clone().add(count, division));
		dateIterator.add(count, division)
	) {
		dates.push(dateIterator.clone());
	}

	return (
		<div className={classes.container}>
			{dates.map((date, index) => {
				let dateString = date.format(formatting);
				return (
					<div key={dateString + index} className={classes.ticks}>
						<div className={classes.label}>
							<div className={classes.labelText}>{dateString}</div>
							<ArrowDropDown className={classes.labelText} />
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
		whiteSpace: "nowrap"
	},
	labelText: {
		transform: "translateX(-50%)"
	},
	container: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: theme.spacing.unit * 4
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
