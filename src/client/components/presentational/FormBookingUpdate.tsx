import React, { FC } from "react";
import * as Yup from "yup";
import moment from "moment";
import { Button, Grid } from "@material-ui/core";
import {
	Form,
	FieldSelect,
	FieldText,
	FieldDate,
	FieldSelectItems,
	FormStatus,
	FormProps,
	FormError
} from ".";
import { BookingType } from "../../../shared/typings";
import { toTitleWords } from "../../utils";

export type FormBookingUpdateValues = Partial<{
	id: number;
	from: Date;
	to: Date;
	userId: number;
	vehicleId: number;
	locationId: number;
	bookingType: BookingType;
	replaceVehicle?: {
		plateNumber?: string;
		brand?: string;
		model?: string;
		vin?: string;
	};
}>;

export interface FormBookingUpdateProps
	extends FormProps<FormBookingUpdateValues> {
	vehicleList: FieldSelectItems;
	userList: FieldSelectItems;
	locationList: FieldSelectItems;
	onSubmit: () => void;
	loading: boolean;
}

export  const formBookingUpdateValidationSchema = Yup.object().shape<
	Omit<FormBookingUpdateValues, "locationId">
>({
	id: Yup.number(),
	from: Yup.mixed()
		.required("Required")
		.when("$status", (status: FormStatus, schema) => {
			if (status === FormStatus.SUBMITTING) {
				return schema.transform(v => moment(v).unix());
			}
		})
		.test(
			"not-greater-than-to",
			'Value should not be greater than the value of "to"',
			function(from) {
				const { to } = this.parent;
				return moment(from).isBefore(to);
			}
		),
	to: Yup.mixed()
		.required("Required")
		.when("$status", (status: FormStatus, schema) => {
			if (status === FormStatus.SUBMITTING) {
				return schema.transform(v => moment(v).unix());
			}
		})
		.test(
			"not-greater-than-to",
			'Value should not be lesser than the value of "from"',
			function(to) {
				const { from } = this.parent;
				return moment(to).isAfter(from);
			}
		),
	userId: Yup.number().required("Required"),
	vehicleId: Yup.number().required("Required"),
	bookingType: Yup.mixed<BookingType>().oneOf(Object.values(BookingType)),
	replaceVehicle: Yup.mixed().when(
		["bookingType", "$status"],
		(bookingType, status, schema) => {
			if (
				status === FormStatus.SUBMITTING &&
				bookingType !== BookingType.REPLACEMENT
			) {
				return schema.nullable().transform(() => null);
			} else if (bookingType === BookingType.REPLACEMENT) {
				return Yup.object().shape({
					plateNumber: Yup.string().required("Required"),
					brand: Yup.string().required("Required"),
					model: Yup.string().required("Required"),
					vin: Yup.string()
						.transform((v: string) => v.toUpperCase())
						.required("Required")
				});
			}
		}
	)
});

export const FormBookingUpdate: FC<FormBookingUpdateProps> = ({
	vehicleList,
	userList,
	locationList,
	onSubmit,
	values,
	loading,
	...formProps
}) => {
	const renderReplaceVehicleFields = () => {
		const isReplacementBooking = values.bookingType === BookingType.REPLACEMENT;
		if (isReplacementBooking) {
			return (
				<>
					<Grid item xs={12} lg={6}>
						<FieldText
							fullWidth
							name="replaceVehicle.plateNumber"
							label="Plate Number"
							transformer={v => v.toUpperCase()}
						/>
					</Grid>
					<Grid item xs={12} lg={6}>
						<FieldText fullWidth name="replaceVehicle.brand" label="Brand" />
					</Grid>
					<Grid item xs={12} lg={6}>
						<FieldText fullWidth name="replaceVehicle.model" label="Model" />
					</Grid>
					<Grid item xs={12} lg={6}>
						<FieldText
							fullWidth
							name="replaceVehicle.vin"
							label="VIN"
							transformer={v => v.toUpperCase()}
						/>
					</Grid>
				</>
			);
		}
		return null;
	};

	return (
		<Form<Omit<FormBookingUpdateValues, "locationId">>
			{...formProps}
			validationSchema={formBookingUpdateValidationSchema}
			values={values}
			title="Update Booking"
			footer={
				<Button variant="contained" color="primary" onClick={onSubmit}>
					Submit
				</Button>
			}
		>
			<Grid container spacing={1}>
				<Grid item xs={12} lg={6}>
					<FieldDate fullWidth name="from" label="From" />
				</Grid>
				<Grid item xs={12} lg={6}>
					<FieldDate fullWidth name="to" label="To" />
				</Grid>
				<Grid item xs={12} lg={6}>
					<FieldSelect
						fullWidth
						name="userId"
						label="Booked User"
						items={userList}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FieldSelect
						fullWidth
						name="bookingType"
						label="Booking Type"
						items={Object.values(BookingType).map(t => ({
							label: toTitleWords(t),
							value: t
						}))}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FieldSelect
						fullWidth
						name="locationId"
						label="Location"
						items={locationList}
					/>
				</Grid>
				<Grid item xs={12} lg={6}>
					<FieldSelect
						fullWidth
						name="vehicleId"
						label="Booked Vehicle"
						items={vehicleList}
					/>
				</Grid>
				{renderReplaceVehicleFields()}
			</Grid>
		</Form>
	);
};
