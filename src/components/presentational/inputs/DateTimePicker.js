import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import GenericTextField from "./GenericTextField";
import Slider from "./Slider";
import { withStyles } from "@material-ui/core";

function DateTimePicker({ value, id, onChange, classes, label }) {
	let DateTime = moment(value, "X");

	let date = DateTime.format("YYYY-MM-DD"); // Parse date for input.
	let sliderLabel = DateTime.format("LT"); // Local time
	let timeUnix = DateTime.format("X") - DateTime.startOf("day").format("X"); // Time elapsed for the day.
	const handleDateChange = e => {
		let date;
		if (e.target.value) {
			date = moment(e.target.value, "YYYY-MM-DD")
				.add(timeUnix, "seconds")
				.unix();
		} else {
			date = DateTime.unix();
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
		let date = DateTime.startOf("day")
			.add(addSeconds, "seconds")
			.unix();

		onChange({ target: { value: date } });
	};

	return (
		<div>

			<div className={classes.textField}>
				<GenericTextField
					id={id + "-picker"}
					value={date}
					label={label}
					TextFieldProps={{ type: "date", fullWidth: true}}
					onChange={handleDateChange}
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
				/>
			</div>
		</div>
	);
}
DateTimePicker.propTypes = {
	value: PropTypes.number
};

const styles = theme => ({
	slider: {
		marginTop: theme.spacing.unit
	},
	textField: {
		marginLeft: theme.spacing.unit * 6,
		marginRight: theme.spacing.unit * 6
	}
});

export default withStyles(styles)(DateTimePicker);
