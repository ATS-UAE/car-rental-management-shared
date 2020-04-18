import React from "react";
import { withStyles } from "@material-ui/core";
import Form from "./Form";
import CardList from "../display/CardList";
import { validators } from "../../../utils/helpers";

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
	classes,
	formProps
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
				cards: vehicles.map(
					({
						id,
						brand,
						model,
						vehicleImageSrc,
						plateNumber,
						bookingChargeUnit,
						bookingCharge,
						bookingChargeCount
					}) => {
						const data = {
							id,
							title: `${brand} ${model}`,
							imgSrc: vehicleImageSrc || "/static/images/car-no-image-avl.jpg",
							descriptions: [plateNumber],
							props: {
								classes: {
									card: classes.card
								},
								selected: id === values.vehicleId,
								onClick: () => onClick({ vehicleId: id }),
								iconName: values.vehicleId === id ? "Done" : ""
							}
						};
						if (bookingChargeUnit) {
							data.descriptions.push(
								`Cost: ${bookingCharge} Dhs per${
									bookingChargeCount === 1 ? " " : ` ${bookingChargeCount}`
								} ${bookingChargeUnit}`
							);
						}
						return data;
					}
				)
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
			{...formProps}
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
