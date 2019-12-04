import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "../../presentational/inputs/Select";
import { Role } from "../../../variables/enums";
import * as actions from "../../../actions";

function RoleSelect({
	value,
	enums,
	fetchEnums,
	required,
	fullWidth,
	onChange
}) {
	const [stateValue, setStateValue] = useState("");
	useEffect(() => {
		fetchEnums();
	}, []);

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

const mapStateToProps = ({ enums }) => ({ enums });

export default connect(mapStateToProps, actions)(RoleSelect);
