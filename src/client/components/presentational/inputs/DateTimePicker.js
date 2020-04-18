import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DateTimePicker } from "@material-ui/pickers";

function Picker({ value, id, onChange, label, error, disabled, fullWidth }) {
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
			onChange={handleDateChange}
			disabled={disabled}
			id={id}
			fullWidth={fullWidth}
			error={error}
			label={label}
			showTodayButton
		/>
	);
}

Picker.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Picker;
