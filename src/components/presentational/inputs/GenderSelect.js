import React, { useState } from "react";
import PropTypes from "prop-types";
import SimpleSelect from "./SimpleSelect";

export default function GenderSelect({ required, value, onChange, fullWidth }) {
	const [stateValue, setStateValue] = useState("");
	return (
		<SimpleSelect
			value={value === undefined ? stateValue : value}
			items={[{ value: "m", label: "Male" }, { value: "f", label: "Female" }]}
			onChange={e => (onChange && onChange(e)) || setStateValue(e.target.value)}
			required={required}
			label="Gender"
			id="gender-select"
			name="gender"
			fullWidth={fullWidth}
		/>
	);
}

GenderSelect.propTypes = {
	required: PropTypes.bool,
	value: PropTypes.oneOf(["m", "f"]),
	fullWidth: PropTypes.bool
};

GenderSelect.defaultProps = {
	required: false
};
