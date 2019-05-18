import React, { useState } from "react";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import * as reduxActions from "../../../../actions";
import { api } from "../../../../utils";

function UserFormCreate({ fetchUsers, exclude, onSubmit }) {
	let [errorNotes, setErrorNotes] = useState([]);
	let [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});
	return (
		<UserForm
			title="Create User"
			values={values}
			onChangeEvent={(data, name, event) =>
				event.target.files
					? setValues({ ...data, [name]: event.target.files[0] || "" })
					: setValues(data)
			}
			errorNotes={errorNotes}
			exclude={exclude}
			loading={loading}
			showFooter={true}
			onSubmit={() => {
				setLoading(true);
				api
					.createUser(values)
					.then(() => {
						fetchUsers();
						setValues({});
						setLoading(false);
						onSubmit && onSubmit();
					})
					.catch(e => {
						setErrorNotes([e]);
						setLoading(false);
					});
			}}
		/>
	);
}

export default connect(
	null,
	reduxActions
)(UserFormCreate);
