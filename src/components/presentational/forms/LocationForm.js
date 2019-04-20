import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import LocationSelector from "../inputs/LocationSelector";
import DialogButton from "./DialogButton";
import Form, { FIELDS } from "./Form";
const { TEXT } = FIELDS;

function LocationForm({
	title,
	include,
	errorNotes,
	errors,
	onSubmit,
	onValid,
	onChange,
	onError,
	values,
	buttonLabel,
	onSelectorClick,
	onMapClick,
	onSelectorSubmit,
	locationValue,
	onSelectorClose,
	selectorOpen,
	selectorValue
}) {
	const fields = [
		{
			type: TEXT,
			id: "location-name",
			name: "name",
			props: {
				label: "Location Name",
				required: true
			}
		},
		{
			type: TEXT,
			id: "full-address",
			name: "address",
			props: {
				label: "Full Address",
				required: true
			}
		}
	];
	return (
		<Form
			title={title}
			fields={fields}
			include={include}
			errorNotes={errorNotes}
			errors={errors}
			onSubmit={onSubmit}
			onValid={onValid}
			onChange={onChange}
			onError={onError}
			values={values}
			buttonLabel={buttonLabel}
		>
			<Grid item xs={12}>
				<LocationSelector
					onSubmit={() => onSelectorSubmit && onSelectorSubmit()}
					onSelectorClick={v => onSelectorClick && onSelectorClick(v)}
					value={locationValue}
					onClick={onMapClick}
					open={selectorOpen}
					onClose={() => onSelectorClose && onSelectorClose()}
					selectorValue={selectorValue}
				/>
			</Grid>
		</Form>
	);
}

const styles = {
	locationSelectDialogButton: {
		width: "100%"
	},

	dialog: {
		width: "100%"
	}
};

export default withStyles(styles)(LocationForm);
