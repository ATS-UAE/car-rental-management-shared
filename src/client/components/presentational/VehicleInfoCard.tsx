import React, { FC } from "react";
import {
	WithStyles,
	withStyles,
	createStyles,
	List,
	ListItemText,
	ListItem,
	Theme
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { InfoCard, InfoCardProps, Coordinates, VehicleLocation } from "./";

export interface VehicleInfoCardProps {
	vin?: string;
	plateNumber?: string;
	brand?: string;
	model?: string;
	image?: string;
	knownIssues?: string[];
	mileage?: number;
	position?: Coordinates;
	parkingLocation?: string;
	customFields?: Array<{
		label: string;
		value: string;
	}>;
}

type KeyValueType =
	| string
	| {
			label: string;
			props?: TypographyProps;
	  };

const generateKeyValueField = (field: {
	key?: KeyValueType;
	value: KeyValueType;
	props?: TypographyProps;
}) => {
	let keyProps: TypographyProps = {};
	let valueProps: TypographyProps = {};

	if (
		field.key &&
		field.key &&
		typeof field.key !== "string" &&
		field.key.props
	) {
		keyProps = field.key.props;
	}
	if (
		field.value &&
		field.value &&
		typeof field.value !== "string" &&
		field.value.props
	) {
		valueProps = field.value.props;
	}
	return (
		<>
			{field.key && (
				<Typography variant="body1" component="span" {...keyProps}>
					{typeof field.key === "string" ? field.key : field.key.label}:
				</Typography>
			)}
			<Typography variant="body1" component="span" {...valueProps}>
				{typeof field.value === "string" ? field.value : field.value.label}
			</Typography>
		</>
	);
};

const generateGridItemKeyValueField = (field: {
	key?: KeyValueType;
	value?: KeyValueType;
}) =>
	field.value ? (
		<Grid item xs={6}>
			{generateKeyValueField({ value: field.value, key: field.key })}
		</Grid>
	) : null;

const generateTabs = ({
	customFields,
	vin,
	plateNumber,
	brand,
	model,
	image,
	knownIssues,
	position,
	classes,
	mileage
}: VehicleInfoCardProps & WithStyles<typeof styles>) => {
	const tabs: InfoCardProps["tabs"] = [];
	tabs.push({
		label: "Vehicle Details",
		body: (
			<div className={classes.paddingTop}>
				{image && (
					<img className={classes.vehicleImage} src={image} alt="Vehicle"></img>
				)}
				<Grid container>
					{generateGridItemKeyValueField({
						key: {
							label: "Chassis",
							props: {
								classes: {
									root: classes.vehicleDetailDescriptionKeys
								}
							}
						},
						value: vin
					})}
					{generateGridItemKeyValueField({
						key: {
							label: "Plate Number",
							props: {
								classes: {
									root: classes.vehicleDetailDescriptionKeys
								}
							}
						},
						value: plateNumber
					})}
					{generateGridItemKeyValueField({
						key: {
							label: "Brand",
							props: {
								classes: {
									root: classes.vehicleDetailDescriptionKeys
								}
							}
						},
						value: brand
					})}
					{generateGridItemKeyValueField({
						key: {
							label: "Model",
							props: {
								classes: {
									root: classes.vehicleDetailDescriptionKeys
								}
							}
						},
						value: model
					})}
					{mileage &&
						generateGridItemKeyValueField({
							key: {
								label: "Mileage",
								props: {
									classes: {
										root: classes.vehicleDetailDescriptionKeys
									}
								}
							},
							value: `${mileage} Km`
						})}
				</Grid>
			</div>
		)
	});

	if (position) {
		tabs.push({
			label: "Location",
			body: <VehicleLocation position={position} />
		});
	}

	if (knownIssues && knownIssues.length) {
		tabs.push({
			label: "Known Issues",
			body: (
				<List component="div" aria-label="Vehicle issues.">
					{knownIssues.map((issue, index) => (
						<ListItem button key={index}>
							<ListItemText primary={issue} />
						</ListItem>
					))}
				</List>
			)
		});
	}

	if (customFields && customFields.length) {
		tabs.push({
			label: "Misc Details",
			body: (
				<Grid container classes={{ root: classes.paddingTop }}>
					{customFields.map(field =>
						generateGridItemKeyValueField({
							key: {
								label: field.label,
								props: {
									classes: {
										root: classes.vehicleDetailDescriptionKeys
									}
								}
							},
							value: field.value
						})
					)}
				</Grid>
			)
		});
	}
	return tabs;
};

const styles = (theme: Theme) =>
	createStyles({
		vehicleDetailDescriptionKeys: {
			paddingRight: theme.spacing(1)
		},
		paddingTop: { paddingTop: theme.spacing(1) },
		vehicleImage: {
			width: "100%"
		}
	});

const VehicleInfoCardBase: FC<
	VehicleInfoCardProps & WithStyles<typeof styles>
> = props => {
	return <InfoCard tabs={generateTabs(props)}></InfoCard>;
};

export const VehicleInfoCard = withStyles(styles)(VehicleInfoCardBase);
