import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AccidentForm from "./AccidentForm";
import * as reduxActions from "../../../../actions";
import { api } from "../../../../utils/helpers";

function AccidentFormCreate({ fetchAccidents, exclude, onSubmit, auth }) {
	const [errorNotes, setErrorNotes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});

	useEffect(() => {
		if (auth && auth.data) {
			setValues({ ...values, userId: auth.data.id });
		}
	}, [auth]);

	return (
		<AccidentForm
			title="Report an accident"
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
					.createAccident(values)
					.then(() => {
						fetchAccidents();
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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
	mapStateToProps,
	reduxActions
)(AccidentFormCreate);
