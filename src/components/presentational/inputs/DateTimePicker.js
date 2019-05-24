import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Slider from "./Slider";

function DateTimePicker({ value, id, onChange, classes, label, error }) {
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
	value: PropTypes.number
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
