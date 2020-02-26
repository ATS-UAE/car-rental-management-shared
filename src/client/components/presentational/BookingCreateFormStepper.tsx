import React, { FC, useState, ReactNode } from "react";
import * as yup from "yup";
import _ from "lodash";
import {
	Button,
	WithStyles,
	Paper,
	Typography,
	createStyles,
	withStyles,
	Theme,
	makeStyles,
	Grid,
	GridProps
} from "@material-ui/core";
import {
	FormStepper,
	CardListBookingType,
	FieldDate,
	FieldSelect,
	FormProps,
	FormStatus,
	FieldText,
	MapLocationMarkers,
	CardList,
	CardListItemProps,
	Field,
	FormStep,
	FormStepperChildrenUtils,
	FieldSelectItems
} from ".";
import moment from "moment";
import { BookingType, FlattenIfArray } from "../../../shared/typings";
import {
	ExtractServerResponseData,
	BookingServerResponseGetAll,
	BookingServerParamsPost
} from "../../../shared/typings";
import { rangeOverlap } from "../../utils";
import { BookingGetResponseItem } from "../../api";
import { CardListProps } from "./CardList";

const useFieldStyles = makeStyles(theme => ({
	spacer: {
		"& > *": {
			margin: theme.spacing(1)
		}
	}
}));

const BookingUserScheduleAndTypeFields: FC<{
	onBookingTypeChange: (v: BookingType) => void;
	users?: FieldSelectItems;
}> = ({ onBookingTypeChange, users }) => {
	return (
		<>
			<Grid container spacing={6}>
				<Grid xs={12} md={6} item>
					<FieldDate fullWidth label="Start" name="from" />
				</Grid>
				<Grid xs={12} md={6} item>
					<FieldDate fullWidth label="End" name="to" />
				</Grid>
				{users && (
					<Grid xs={12} md={12} item>
						<FieldSelect fullWidth label="User" name="userId" items={users} />
					</Grid>
				)}
			</Grid>
			<Field<BookingType> name="bookingType">
				{fieldProps => (
					<CardListBookingType
						onClick={v => {
							fieldProps.setFieldValue(v);
							onBookingTypeChange(v);
						}}
						value={fieldProps.value}
					/>
				)}
			</Field>
		</>
	);
};

const ReplaceVehicleFields: FC<{}> = () => {
	return (
		<Grid container spacing={6}>
			<Grid xs={12} md={6} item>
				<FieldText
					fullWidth
					label="Plate Number"
					name="replaceVehicle.plateNumber"
					transformer={v => v.toUpperCase()}
				></FieldText>
			</Grid>
			<Grid xs={12} md={6} item>
				<FieldText
					fullWidth
					label="VIN"
					name="replaceVehicle.vin"
					transformer={v => v.toUpperCase()}
				></FieldText>
			</Grid>
			<Grid xs={12} md={6} item>
				<FieldText
					fullWidth
					label="Brand"
					name="replaceVehicle.brand"
				></FieldText>
			</Grid>
			<Grid xs={12} md={6} item>
				<FieldText
					fullWidth
					label="Model"
					name="replaceVehicle.model"
				></FieldText>
			</Grid>
		</Grid>
	);
};

const LocationFields: FC<{
	locations: BookingCreateFormStepperLocationItem[];
}> = ({ locations }) => {
	return (
		<Grid container direction="column" spacing={2}>
			<Grid item>
				<FieldSelect
					label="Location"
					name="locationId"
					fullWidth
					items={locations.map(l => ({ label: l.label, value: l.value }))}
				/>
			</Grid>
			<Grid item>
				<Field<number> name="locationId">
					{fieldProps => (
						<MapLocationMarkers
							onClick={v => {
								fieldProps.setFieldValue(v);
							}}
							locations={locations.map(l => ({
								name: l.label,
								id: l.value,
								lat: l.lat,
								lng: l.lng
							}))}
							value={fieldProps.value}
						/>
					)}
				</Field>
			</Grid>
		</Grid>
	);
};

const VehicleFieldsBase: FC<{
	vehicles: BookingCreateFormStepperVehicleItem[];
} & WithStyles<typeof vehicleFieldStyles>> = ({ vehicles, classes }) => {
	return (
		<>
			<Field<number> name="vehicleId">
				{fieldProps => (
					<CardList
						cards={vehicles.map(v => {
							const data: FlattenIfArray<CardListProps["cards"]> = {
								GridProps: {
									xs: 12,
									sm: 12,
									className: classes.fullHeight
								},
								id: v.id,
								classes: {
									card: classes.card
								},
								selected: v.id === fieldProps.value,
								title: v.label,
								imgSrc:
									v.vehicleImageSrc || "/static/images/car-no-image-avl.jpg",
								descriptions: [v.plateNumber],
								onClick: () => fieldProps.setFieldValue(v.id),
								iconName: v.id === fieldProps.value ? "Done" : ""
							};
							if (v.cost && data.descriptions) {
								data.descriptions.push(v.cost);
							}
							return data;
						})}
					></CardList>
				)}
			</Field>
		</>
	);
};

const vehicleFieldStyles = createStyles({
	card: {
		minHeight: "200px"
	},
	fullHeight: {
		height: "100%",
		overflow: "hidden"
	}
});

const VehicleFields = withStyles(vehicleFieldStyles)(VehicleFieldsBase);

const StepperFormActions: FC<{
	onNextDisabled?: boolean;
	onNext?: () => void;
	onPrev?: () => void;
	onSubmitDisabled?: boolean;
	onSubmit?: () => void | Promise<void>;
	loading?: boolean;
}> = ({
	onNext,
	onPrev,
	onSubmit,
	loading,
	onNextDisabled,
	onSubmitDisabled
}) => {
	const classes = useFieldStyles();
	return (
		<div className={classes.spacer}>
			{onPrev && (
				<Button
					onClick={onPrev}
					disabled={loading || onPrev === undefined}
					variant="contained"
					color="primary"
				>
					Previous
				</Button>
			)}
			{onNext && (
				<Button
					disabled={loading || onNextDisabled}
					onClick={onNext}
					variant="contained"
					color="primary"
				>
					Next
				</Button>
			)}
			{onSubmit && (
				<Button
					disabled={onSubmitDisabled || loading}
					onClick={onSubmit}
					variant="contained"
					color="primary"
				>
					Submit
				</Button>
			)}
		</div>
	);
};

export type BookingCreateFormStepperLocationItem = {
	lat: number;
	lng: number;
	value: number;
	label: string;
};

export type BookingCreateFormStepperVehicleItem = {
	label: string;
	plateNumber: string;
	id: number;
	cost?: string;
	locationId: number;
	vehicleImageSrc?: string;
};

const formBookingCreateValidationSchema = yup.object().shape({
	from: yup
		.mixed()
		.required("Required")

		.test(
			"not-greater-than-to",
			'Value should not be greater than the value of "to"',
			function(from) {
				const { to } = this.parent;
				return moment(from).isBefore(to);
			}
		)
		.when(
			"$bookings",
			(
				bookings: ExtractServerResponseData<BookingServerResponseGetAll>,
				schema: yup.MixedSchema
			) => {
				return schema.test(
					"no-same-schedules",
					"You already have a booking during this time.",
					function(from: Date) {
						const { userId, to } = this
							.parent as BookingCreateFormStepperValues;
						if (from && to) {
							return !bookings
								.filter(b => b.userId === userId)
								.some(b =>
									rangeOverlap(
										moment(from).unix(),
										moment(to).unix(),
										b.from,
										b.to
									)
								);
						}
						return true;
					}
				);
			}
		)
		.when("$status", (status: FormStatus, schema: yup.MixedSchema) => {
			if (status === FormStatus.SUBMITTING) {
				return schema.transform(v => moment(v).unix());
			}
		}),
	to: yup
		.mixed()
		.required("Required")
		.test(
			"not-greater-than-to",
			'Value should not be lesser than the value of "from"',
			function(to) {
				const { from } = this.parent;
				return moment(to).isAfter(from);
			}
		)
		.when(
			"$bookings",
			(
				bookings: ExtractServerResponseData<BookingServerResponseGetAll>,
				schema: yup.MixedSchema
			) => {
				return schema.test(
					"no-same-schedules",
					"You already have a booking during this time.",
					function(to: Date) {
						const { userId, from } = this
							.parent as BookingCreateFormStepperValues;
						if (from && to) {
							return !bookings
								.filter(b => b.userId === userId)
								.some(b =>
									rangeOverlap(
										moment(from).unix(),
										moment(to).unix(),
										b.from,
										b.to
									)
								);
						}
						return true;
					}
				);
			}
		)
		.when("$status", (status: FormStatus, schema: yup.MixedSchema) => {
			if (status === FormStatus.SUBMITTING) {
				return schema.transform(v => moment(v).unix());
			}
		}),
	locationId: yup.number().required("Required"),
	userId: yup.number().required("Required"),
	vehicleId: yup.number().required("Required"),
	bookingType: yup
		.mixed<BookingType>()
		.oneOf(Object.values(BookingType))
		.required("Required"),
	replaceVehicle: yup
		.mixed()
		.when(["$values", "$status"], (values, status, schema) => {
			if (
				status === FormStatus.SUBMITTING &&
				values.bookingType !== BookingType.REPLACEMENT
			) {
				return schema.nullable().transform(() => null);
			} else if (values.bookingType === BookingType.REPLACEMENT) {
				return yup.object().shape({
					plateNumber: yup.string().required("Required"),
					brand: yup.string().required("Required"),
					model: yup.string().required("Required"),
					vin: yup
						.string()
						.transform((v: string) => v.toUpperCase())
						.required("Required")
				});
			}
		})
});

export type BookingCreateFormStepperValues = {
	locationId: number;
} & BookingServerParamsPost;

export interface BookingCreateFormStepperProps
	extends FormProps<BookingCreateFormStepperValues>,
		WithStyles<typeof styles> {
	vehicles: BookingCreateFormStepperVehicleItem[];
	locations: BookingCreateFormStepperLocationItem[];
	users?: FieldSelectItems;
	bookings: BookingGetResponseItem[];
	loading: boolean;
	onSubmit: (values: BookingCreateFormStepperValues) => void;
}

const BookingCreateFormStepperBase: FC<BookingCreateFormStepperProps> = ({
	onSubmit,
	vehicles,
	locations,
	classes,
	users,
	bookings,
	loading,
	...formProps
}) => {
	const [steps, setSteps] = useState<FormStep[]>([
		{
			id: 1,
			label: "Select booking type and schedule.",
			fields: ["from", "to", "bookingType", "userId"]
		},

		{
			id: 2,
			hidden: true,
			label: "Specify vehicle to be replaced.",
			fields: [
				"replaceVehicle.plateNumber",
				"replaceVehicle.vin",
				"replaceVehicle.brand",
				"replaceVehicle.model"
			]
		},
		{
			id: 3,
			label: "Select location.",
			fields: ["locationId"]
		},
		{
			id: 4,
			label: "Select vehicle to book.",
			fields: ["vehicleId"]
		}
	]);
	const [currentStep, setCurrentStep] = useState(1);
	const getChildren = (
		utils: FormStepperChildrenUtils<BookingCreateFormStepperValues>
	): ReactNode => {
		switch (currentStep) {
			case 1:
				return (
					<BookingUserScheduleAndTypeFields
						users={users}
						onBookingTypeChange={v => {
							if (v === BookingType.REPLACEMENT) {
								utils.setPageState({ hidden: false }, 2);
							} else {
								utils.setPageState({ hidden: true }, 2);
							}
						}}
					/>
				);
			case 2:
				return <ReplaceVehicleFields />;
			case 3:
				return <LocationFields locations={locations} />;
			case 4: {
				const availableVehicles = vehicles.filter(
					v => formProps.values.locationId === v.locationId
				);
				return availableVehicles.length > 0 ? (
					<VehicleFields vehicles={availableVehicles} />
				) : (
					<div className={classes.noVehicles}>
						<Paper className={classes.noVehiclePaper}>
							<Typography variant="h5" component="h1">
								Sorry. There are no available vehicles.
							</Typography>
							<Typography component="p">
								Please change your pickup location or schedule.
							</Typography>
						</Paper>
					</div>
				);
			}
			default:
				return null;
		}
	};

	return (
		<FormStepper<BookingCreateFormStepperValues>
			{...formProps}
			validateOnMount
			steps={steps}
			currentStep={currentStep}
			onStepsChange={setSteps}
			onNavigateStep={setCurrentStep}
			validateOnContextChange
			validationSchema={values => {
				formBookingCreateValidationSchema.validateSync(values, {
					abortEarly: false,
					context: {
						values: values,
						status: FormStatus.CHANGING,
						bookings
					}
				});
			}}
			render={utils => getChildren(utils)}
			actions={utils => {
				const errors = utils.getPageErrors();
				const hasErrors = errors && Object.keys(errors).length > 0;

				return (
					<StepperFormActions
						loading={loading}
						onNextDisabled={hasErrors}
						onNext={
							(!utils.isLastPage &&
								(() => {
									if (hasErrors) {
										utils.touchPageFields();
									} else {
										utils.setPageState({ completed: true });
										utils.nextPage && utils.nextPage();
									}
								})) ||
							undefined
						}
						onPrev={
							(!utils.isFirstPage &&
								(() => {
									utils.setPageState({ completed: false });
									utils.previousPage && utils.previousPage();
								})) ||
							undefined
						}
						onSubmit={
							(utils.isLastPage &&
								(() => {
									const castedValues = formBookingCreateValidationSchema.cast(
										formProps.values,
										{
											context: {
												values: formProps.values,
												bookings,
												status: FormStatus.SUBMITTING
											}
										}
									);
									onSubmit(castedValues);
								})) ||
							undefined
						}
						onSubmitDisabled={hasErrors}
					/>
				);
			}}
		></FormStepper>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			height: "100%"
		},
		form: {
			height: "100%"
		},
		noVehiclePaper: {
			padding: theme.spacing(3, 2)
		},
		noVehicles: {
			margin: theme.spacing(3)
		},
		vehiclelCard: {
			minHeight: "200px"
		},
		vehicleCardList: {
			height: "100%",
			overflow: "hidden"
		}
	});

export const BookingCreateFormStepper = withStyles(styles)(
	BookingCreateFormStepperBase
);
