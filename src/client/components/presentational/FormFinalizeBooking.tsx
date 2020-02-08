import React, { FC } from "react";
import moment from "moment";
import * as yup from "yup";
import {
	Grid,
	Button,
	withStyles,
	createStyles,
	WithStyles
} from "@material-ui/core";
import {
	Form,
	FieldDate,
	FieldSelect,
	FieldText,
	FormProps,
	FieldSelectItems,
	InfoText
} from ".";
import { BookingType } from "../../../shared/typings";

export interface FormFinalizeBookingValues {
	amount: number;
}

interface FormFinalizeBookingProps
	extends FormProps<FormFinalizeBookingValues> {
	bookingType: BookingType | string;
	from: Date;
	to: Date;
	user: string;
	vehicle: string;
	loading?: boolean;
	onSubmit: () => void;
	onCancel: () => void;
	classes: Partial<Record<keyof typeof styles, string>>;
}

const formFinalizeBookingSchema = yup.object().shape({
	amount: yup
		.number()
		.typeError("You must specify a number.")
		.required()
});

const FormFinalizeBookingBase: FC<FormFinalizeBookingProps> = ({
	vehicle,
	user,
	from,
	to,
	loading,
	classes = {},
	onSubmit,
	onCancel,
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
			validationSchema={formFinalizeBookingSchema}
			footer={action}
			title="Finalize Booking"
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
				<Grid item xs={12}>
					<FieldText
						fullWidth
						name="amount"
						type="number"
						label="Payment Amount"
					/>
				</Grid>
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
