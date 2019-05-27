import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Slider from "./Slider";

function DateTimePicker({ value, id, onChange, classes, label, error }) {
	let dateTime;

	try {
		dateTime = moment(value, "X");
	} catch (e) {
		dateTime = moment();
	}

	let date = dateTime.format("YYYY-MM-DD"); // Parse date for input.
	let sliderLabel = dateTime.format("LT"); // Local time
	let timeUnix = dateTime.format("X") - dateTime.startOf("day").format("X"); // Time elapsed for the day.
	const handleDateChange = e => {
		let date;
		if (e.target.value) {
			date = moment(e.target.value, "YYYY-MM-DD")
				.add(timeUnix, "seconds")
				.unix();
		} else {
			date = dateTime.unix();
		}

		onChange({ target: { value: date } });
	};
	const handleTimeChange = e => {
		let addSeconds = e.target.value;
		if (e.target.value >= 86400) {
			addSeconds = 86399;
		}
		if (e.target.value < 0) {
			addSeconds = 1;
		}
		let date = dateTime
			.startOf("day")
			.add(addSeconds, "seconds")
			.unix();

		onChange({ target: { value: date } });
	};

	return (
		<div>
			<div className={classes.textField}>
				<TextField
					id={id + "-picker"}
					value={date}
					label={label}
					type="date"
					fullWidth
					onChange={handleDateChange}
					error={error}
				/>
			</div>
			<div className={classes.slider}>
				<Slider
					min={0}
					max={86400}
					step={60}
					label={sliderLabel}
					id={id + "-slider"}
					value={timeUnix}
					onChange={handleTimeChange}
					error={error}
				/>
			</div>
		</div>
	);
}
DateTimePicker.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const styles = theme => ({
	slider: {
		marginTop: theme.spacing(1)
	},
	textField: {
		marginLeft: theme.spacing(6),
		marginRight: theme.spacing(6)
	}
});

export default withStyles(styles)(DateTimePicker);
