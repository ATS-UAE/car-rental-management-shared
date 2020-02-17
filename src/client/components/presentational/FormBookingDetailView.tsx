import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import moment from "moment";
import { InfoText } from ".";
import { Role, BookingType } from "../../../shared/typings";
import { toTitleWords } from "../../utils";

export interface FormBookingDetailViewValues {
	booker: string;
	vehicle: string;
	bookingType: BookingType;
	from: Date;
	to: Date;
	pickupDate?: Date;
	returnDate?: Date;
	startMileage?: number;
	endMileage?: number;
	startFuel?: number;
	endFuel?: number;
	amountPaid?: number;
}

export interface FormBookingDetailViewProps {
	values: FormBookingDetailViewValues;
	role: Role;
}

export const FormBookingDetailView: FC<FormBookingDetailViewProps> = ({
	values,
	role
}) => {
	return (
		<Grid container spacing={2}>
			{role !== Role.GUEST && (
				<Grid item xs={6}>
					<InfoText title="Booked By" value={values.booker} fullWidth />
				</Grid>
			)}
			<Grid item xs={6}>
				<InfoText
					title="Booking type"
					value={toTitleWords(values.bookingType)}
					fullWidth
				/>
			</Grid>
			<Grid item xs={6}>
				<InfoText title="Vehicle" value={values.vehicle} fullWidth />
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={6}>
					<InfoText
						title="Start"
						value={moment(values.from).calendar()}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoText
						title="End"
						value={moment(values.to).calendar()}
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={6}>
					<InfoText
						title="Vehicle picked up on"
						value={
							(values.pickupDate && moment(values.pickupDate).calendar()) ||
							"N/A"
						}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoText
						title="Vehicle returned on"
						value={
							(values.returnDate && moment(values.returnDate).calendar()) ||
							"N/A"
						}
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={4}>
					<InfoText
						title="Starting vehicle mileage in km"
						value={values.startMileage || "N/A"}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<InfoText
						title="Ending vehicle mileage in km"
						value={values.endMileage || "N/A"}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<InfoText
						title="Total mileage"
						value={
							(values.endMileage &&
								values.startMileage &&
								values.endMileage - values.startMileage) ||
							"N/A"
						}
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={6}>
					<InfoText
						title="Starting Fuel"
						value={values.startFuel || "N/A"}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<InfoText
						title="Ending Fuel"
						value={values.endFuel || "N/A"}
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<InfoText
					title="Amount Paid"
					value={values.amountPaid || "N/A"}
					fullWidth
				/>
			</Grid>
		</Grid>
	);
};
