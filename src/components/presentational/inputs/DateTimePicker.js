import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";

function Picker({ value, id, onChange, classes, label, error, disabled }) {
	let dateTime;

	try {
		dateTime = moment(value, "X");
	} catch (e) {
		dateTime = moment();
	} // Time elapsed for the day.

	const handleDateChange = date => {
		onChange({ target: { value: moment(date).unix() } });
	};
	return (
		<DateTimePicker
			value={dateTime.toDate()}
			disablePast
			onChange={handleDateChange}
			disabled={disabled}
			id={id}
			fullWidth
			error={error}
			label={label}
			showTodayButton
		/>
	);
}
Picker.propTypes = {
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

export default withStyles(styles)(Picker);
