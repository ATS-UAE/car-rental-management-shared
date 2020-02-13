import React, { FC } from "react";
import moment from "moment";
import * as yup from "yup";
import { Grid, Button, withStyles, createStyles } from "@material-ui/core";
import { Form, FieldText, FormProps, InfoText } from ".";
import { BookingType } from "../../../shared/typings";

export interface FormBookingPickupValues {
	startMileage?: number;
	startFuel?: number;
}

interface FormBookingPickupProps extends FormProps<FormBookingPickupValues> {
	bookingType: BookingType | string;
	from: Date;
	to: Date;
	user: string;
	vehicle: string;
	loading?: boolean;
	currentMileageCounter?: number;
	onSubmit: () => void;
	onCancel: () => void;
	classes: Partial<Record<keyof typeof styles, string>>;
}

export const formBookingPickupSchema = yup.object().shape({
	startMileage: yup
		.number()
		.transform((v, ogV) => (ogV === "" ? undefined : v)),
	startFuel: yup
		.number()
		.min(0, "Minimum of 0")
		.max(100, "Maximum of 100")
});

const FormBookingPickupBase: FC<FormBookingPickupProps> = ({
	vehicle,
	user,
	from,
	to,
	loading,
	classes = {},
	onSubmit,
	onCancel,
	currentMileageCounter,
	...formProps
}) => {
	const hasErrors =
		(formProps.errors && Object.keys(formProps.errors).length > 0) || false;
	const action = (
		<Grid container spacing={2}>
			<Grid item>
				<Button
					disabled={loading}
					color="primary"
					variant="contained"
					onClick={onCancel}
				>
					Cancel
				</Button>
			</Grid>
			<Grid item>
				<Button
					disabled={hasErrors || loading}
					color="primary"
					variant="contained"
					onClick={onSubmit}
				>
					Submit
				</Button>
			</Grid>
		</Grid>
	);

	return (
		<Form
			validationSchema={formBookingPickupSchema}
			footer={action}
			title="Mark car as picked up."
			{...formProps}
		>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<InfoText
						classes={{ root: classes.field }}
						title="Vehicle"
						value={vehicle}
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoText
						classes={{ root: classes.field }}
						title="User"
						value={user}
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoText
						classes={{ root: classes.field }}
						title="From"
						value={moment(from).format("lll")}
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoText
						classes={{ root: classes.field }}
						title="To"
						value={moment(to).format("lll")}
					/>
				</Grid>
				<Grid item xs={6}>
					<FieldText
						fullWidth
						name="startMileage"
						type="number"
						label="Starting km"
					/>
				</Grid>
				<Grid item xs={6}>
					<FieldText
						fullWidth
						name="startFuel"
						type="number"
						label="Starting Fuel %"
					/>
				</Grid>
				{currentMileageCounter && (
					<Grid item xs={6}>
						<InfoText
							classes={{ root: classes.field }}
							title="Wialon Mileage Counter"
							value={String(currentMileageCounter)}
						/>
					</Grid>
				)}
			</Grid>
		</Form>
	);
};

const styles = createStyles({
	root: {},
	title: {},
	value: {},
	field: {
		width: "100%"
	}
});

export const FormBookingPickup = withStyles(styles)(FormBookingPickupBase);
