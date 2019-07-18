import React, { useState } from "react";
import { connect } from "react-redux";
import VehicleForm from "./VehicleForm";
import * as reduxActions from "../../../../actions";
import { api } from "../../../../utils";

function VehicleFormCreate({ fetchVehicles, exclude, onSubmit }) {
	let [errorNotes, setErrorNotes] = useState([]);
	let [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});
	return (
		<VehicleForm
			title="Create Vehicle"
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
					.createVehicle(values)
					.then(() => {
						fetchVehicles();
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
)(VehicleFormCreate);
