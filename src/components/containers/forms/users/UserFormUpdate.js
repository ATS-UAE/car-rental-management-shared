import React, { useState } from "react";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import * as reduxActions from "../../../../actions";
import { api } from "../../../../utils";

function UserFormUpdate({
	fetchUsers,
	exclude,
	onSubmit,
	readOnly,
	values,
	hints,
	onChangeEvent,
	showFooter,
	title
}) {
	let [errorNotes, setErrorNotes] = useState([]);
	let [loading, setLoading] = useState(false);
	return (
		<UserForm
			title={title}
			hints={hints}
			values={values}
			onChangeEvent={onChangeEvent}
			errorNotes={errorNotes}
			exclude={exclude}
			readOnly={readOnly}
			loading={loading}
			showFooter={showFooter}
			onSubmit={() => {
				setLoading(true);
				api
					.updateUser(values)
					.then(() => {
						fetchUsers();
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
)(UserFormUpdate);
