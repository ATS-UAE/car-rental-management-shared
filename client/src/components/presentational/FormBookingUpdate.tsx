import React, { FC } from "react";
import * as Yup from "yup";
import moment from "moment";
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
import { BookingType } from "../../variables/enums";
import { toTitleWords } from "../../utils";

export interface FormBookingUpdateData {
	from: number;
	to: number;
	userId: number;
	vehicleId: number;
	bookingType: BookingType;
	replaceVehicle?: {
		plateNumber?: string;
		brand?: string;
		model?: string;
		vin?: string;
	};
}

export interface FormBookingUpdateProps
	extends FormProps<FormBookingUpdateData> {
	vehicleList: FieldSelectItems;
	userList: FieldSelectItems;
	onSubmit: () => void;
}

const formBookingUpdateValidationSchema = Yup.object().shape<
	FormBookingUpdateData
>({
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
	onSubmit,
	values,
	...formProps
}) => {
	const renderReplaceVehicleFields = () => {
		const isReplacementBooking = values.bookingType === BookingType.REPLACEMENT;
		if (isReplacementBooking) {
			return (
				<>
					<FieldText
						name="replaceVehicle.plateNumber"
						label="Plate Number"
						transformer={v => v.toUpperCase()}
					/>
					<FieldText name="replaceVehicle.brand" label="Brand" />
					<FieldText name="replaceVehicle.model" label="Model" />
					<FieldText
						name="replaceVehicle.vin"
						label="VIN"
						transformer={v => v.toUpperCase()}
					/>
				</>
			);
		}
		return null;
	};

	return (
		<Form<FormBookingUpdateData>
			{...formProps}
			validationSchema={formBookingUpdateValidationSchema}
			values={values}
		>
			<>
				<FieldDate name="from" label="From" />
				<FieldDate name="to" label="To" />
				<FieldSelect name="userId" label="Booked User" items={userList} />
				<FieldSelect
					name="bookingType"
					label="Booking Type"
					items={Object.values(BookingType).map(t => ({
						label: toTitleWords(t),
						value: t
					}))}
				/>
				<FieldSelect
					name="vehicleId"
					label="Booked Vehicle"
					items={vehicleList}
				/>
				{renderReplaceVehicleFields()}
				<button type="submit" onClick={onSubmit}>
					Submit
				</button>
			</>
		</Form>
	);
};
