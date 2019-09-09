import React, { useState } from "react";
import { connect } from "react-redux";
import VehicleForm from "./VehicleForm";
import * as reduxActions from "../../../../actions";
import { api } from "../../../../utils/helpers";

function VehicleFormUpdate({
	fetchVehicles,
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
		<VehicleForm
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
					.updateVehicle(values)
					.then(() => {
						fetchVehicles();
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
)(VehicleFormUpdate);
