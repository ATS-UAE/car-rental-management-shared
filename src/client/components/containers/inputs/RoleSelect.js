import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "../../presentational/inputs/Select";
import * as actions from "../../../actions";
import { Role } from "../../../../shared/typings";
function RoleSelect({ value, required, fullWidth, onChange }) {
	const [stateValue, setStateValue] = useState("");

	const items = Object.keys(Role).map(item => ({
		value: item,
		label: item
	}));
	return (
		<Select
			label="Role"
			id="role"
			onChange={e => {
				onChange(e);
				setStateValue(e.target.value);
			}}
			value={value === undefined ? stateValue : value}
			items={items}
			required={required}
			fullWidth={fullWidth}
		/>
	);
}

export default connect(null, actions)(RoleSelect);
