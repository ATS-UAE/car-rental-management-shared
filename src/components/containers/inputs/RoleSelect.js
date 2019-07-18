import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SimpleSelect from "../../presentational/inputs/SimpleSelect";
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
	const items = enums
		? enums.data.roles.map(role => ({ value: role.id, label: role.name }))
		: [{ value: "", label: "Loading..." }];
	return (
		<SimpleSelect
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

export default connect(
	mapStateToProps,
	actions
)(RoleSelect);
