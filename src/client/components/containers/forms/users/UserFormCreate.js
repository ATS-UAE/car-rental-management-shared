import React, { useState } from "react";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import { Role } from "../../../../../shared/typings";
import * as reduxActions from "../../../../actions";
import { api, apiErrorHandler } from "../../../../utils/helpers";

function UserFormCreate({ auth, fetchUsers, exclude, onSubmit }) {
	let [errorNotes, setErrorNotes] = useState([]);
	let [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});
	return (
		<UserForm
			readOnly={false}
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
					.createUser({
						...values,
						clientId: auth.data.role === Role.MASTER ? null : auth.data.clientId
					})
					.then(() => {
						fetchUsers();
						setValues({});
						setLoading(false);
						onSubmit && onSubmit();
					})
					.catch(e => {
						setErrorNotes([apiErrorHandler(e).message]);
						setLoading(false);
					});
			}}
		/>
	);
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, reduxActions)(UserFormCreate);
