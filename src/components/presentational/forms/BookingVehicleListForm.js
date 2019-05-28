import React from "react";
import { withStyles } from "@material-ui/core";
import Form from "./Form";
import CardList from "../display/CardList";
import { validators } from "../../../utils";

function BookingVehicleListForm({
	title,
	exclude,
	errorNotes,
	errors,
	onError,
	values,
	footer,
	hints,
	readOnly,
	vehicles,
	onClick,
	classes
}) {
	const fields = [
		{
			type: CardList,
			id: "vehicle-id",
			name: "vehicleId",
			validators: [validators.requiredField],
			GridProps: {
				xs: 12,
				sm: 12,
				className: classes.fullHeight
			},
			props: {
				cards: vehicles
					.reduce((accumulator, vehicle) => {
						let exists = accumulator.find(
							unique =>
								vehicle.brand === unique.brand && vehicle.model === unique.model
						);
						if (!exists) {
							accumulator.push(vehicle);
						}
						return accumulator;
					}, [])
					.map(({ id, brand, model, vehicleImageSrc }) => ({
						id,
						title: `${brand} ${model}`,
						imgSrc: vehicleImageSrc || "/static/images/car-no-image-avl.jpg",
						props: {
							classes: {
								card: classes.card
							},
							onClick: () => onClick({ vehicleId: id }),
							selected: values.vehicleId === id
						}
					}))
			}
		}
	];

	return (
		<Form
			title={title}
			fields={fields}
			exclude={exclude}
			errorNotes={errorNotes}
			errors={errors}
			onError={onError}
			values={values}
			footer={footer}
			hints={hints}
			readOnly={readOnly}
		/>
	);
}

const styles = {
	card: {
		minHeight: "200px"
	},
	fullHeight: {
		height: "100%",
		overflow: "hidden"
	}
};

export default withStyles(styles)(BookingVehicleListForm);
