import React, { FC } from "react";
import moment from "moment";
import * as yup from "yup";
import { Grid, Button, withStyles, createStyles } from "@material-ui/core";
import {
	Form,
	FieldText,
	FormProps,
	InfoText,
	FieldCheckboxGroup,
	FieldDate
} from ".";
import { BookingType } from "../../../shared/typings";

export interface FormFinalizeBookingValues {
	amount: number;
	startMileage?: number;
	endMileage?: number;
	startFuel?: number;
	endFuel?: number;
	returnDate?: Date;
	pickupDate?: Date;
	returned: boolean;
}

interface FormFinalizeBookingProps
	extends FormProps<FormFinalizeBookingValues> {
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

export const formFinalizeBookingSchema = yup.object().shape(
	{
		amount: yup
			.number()
			.typeError("You must specify a number.")
			.required(),
		startMileage: yup
			.number()
			.min(0, "Cannot be negative")
			.transform((v, ogV) => (ogV === "" || v === "" ? undefined : v))
			.when("endMileage", (endMileage, schema) => {
				if (typeof endMileage === "number") {
					return schema.test(
						"no-lower-than-other",
						"Cannot be higher than ending mileage.",
						startMileage => {
							return startMileage !== undefined
								? startMileage <= endMileage
								: true;
						}
					);
				}
			}),
		endMileage: yup
			.number()
			.transform((v, ogV) => (ogV === "" || v === "" ? undefined : v))
			.when("startMileage", (startMileage, schema) => {
				if (typeof startMileage === "number") {
					return schema.test(
						"no-lower-than-other",
						"Cannot be lower than starting mileage.",
						endMileage => {
							return endMileage !== undefined
								? startMileage <= endMileage
								: true;
						}
					);
				}
			}),
		startFuel: yup
			.number()
			.min(0, "Minimum of 0")
			.max(100, "Maximum of 100")
			.transform((v, ogV) => (ogV === "" || v === "" ? undefined : v)),
		endFuel: yup
			.number()
			.min(0, "Minimum of 0")
			.max(100, "Maximum of 100")
			.transform((v, ogV) => (ogV === "" || v === "" ? undefined : v)),
		returnDate: yup.date().when("returned", (returned, schema) => {
			if (returned) {
				return schema.required("Please provide a date");
			}
		}),
		pickupDate: yup.date(),
		returned: yup.boolean()
	},
	[["startMileage", "endMileage"]]
);

const FormFinalizeBookingBase: FC<FormFinalizeBookingProps> = ({
	vehicle,
	user,
	from,
	to,
	loading,
	classes = {},
	onSubmit,
	onCancel,
	currentMileageCounter,
	onChange,
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
	// TODO: Add return checkbox
	return (
		<Form
			validationSchema={formFinalizeBookingSchema}
			footer={action}
			title="Finalize Booking"
			onChange={onChange}
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
						name="endMileage"
						type="number"
						label="Ending km"
					/>
				</Grid>
				<Grid item xs={6}>
					<FieldText
						fullWidth
						name="startFuel"
						type="number"
						label="Start Fuel %"
					/>
				</Grid>
				<Grid item xs={6}>
					<FieldText
						fullWidth
						name="endFuel"
						type="number"
						label="Ending Fuel %"
					/>
				</Grid>
				<Grid item xs={12}>
					<FieldDate fullWidth name="pickupDate" label="Vehicle Pickup Date" />
				</Grid>
				<Grid item xs={12}>
					<FieldText
						fullWidth
						name="amount"
						type="number"
						label="Payment Amount"
					/>
				</Grid>
				<Grid
					item
					xs={formProps.values.returned || currentMileageCounter ? 6 : 12}
				>
					<FieldCheckboxGroup
						name="returned"
						label="Tick if vehicle has been returned."
					/>
				</Grid>
				{formProps.values.returned && (
					<Grid item xs={6}>
						<FieldDate
							fullWidth
							name="returnDate"
							label="Vehicle Return Date"
						/>
					</Grid>
				)}
				{currentMileageCounter && (
					<Grid item xs={6}>
						<InfoText
							classes={{ root: classes.field }}
							title="Wialon Mileage Counter km"
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

export const FormFinalizeBooking = withStyles(styles)(FormFinalizeBookingBase);
