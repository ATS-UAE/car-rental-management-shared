import React, { FC } from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { BookingType } from "../../variables/enums";
import { CardList, CardListProps } from ".";
import { toTitleWords } from "../../utils";

export interface CardListBookingTypeProps {
	classes: Partial<ClassNameMap<keyof typeof styles>>;
	onClick: (value: BookingType) => void;
	value: BookingType;
}

const CardListBookingTypeBase: FC<CardListBookingTypeProps &
	WithStyles<typeof styles>> = ({ onClick, classes, value }) => {
	return (
		<CardList
			classes={{ root: classes.bookingListGridContainer }}
			showAll
			cards={Object.values(BookingType).reduce<CardListProps["cards"]>(
				(acc, type) => {
					let iconName;
					switch (type) {
						case BookingType.PRIVATE:
							iconName = "Map";
							break;
						case BookingType.BUSINESS:
							iconName = "Work";
							break;
						case BookingType.REPLACEMENT:
							iconName = "Repeat";
							break;
						default:
							return acc;
					}
					acc.push({
						GridProps: {
							xs: 4,
							sm: 4,
							md: 4,
							lg: 4
						},
						id: type,
						props: {
							title: toTitleWords(type),
							iconName,
							selected: value === type,
							onClick: () => onClick(type),
							classes: {
								card: classes.bookingListCard
							},
							CardContentProps: {
								classes: {
									root: classes.bookingListCardContent
								}
							},
							TitleProps: {
								classes: {
									root: classes.bookingListCardTitle
								}
							}
						}
					});
					return acc;
				},
				[]
			)}
		/>
	);
};

const styles = (theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			height: "100%"
		},
		map: {
			height: "100%"
		},
		form: {
			flexGrow: 1,
			overflowY: "auto",
			overflowX: "hidden",
			display: "flex",
			flexDirection: "column"
		},
		actions: {
			"& > *": {
				margin: theme.spacing(1)
			}
		},
		noVehiclePaper: {
			padding: theme.spacing(3, 2)
		},
		noVehicles: {
			margin: theme.spacing(3)
		},
		bookingListCard: {
			flexDirection: "column",
			height: "120px"
		},
		bookingListGridContainer: {
			width: "100%",
			maxWidth: "450px",
			margin: "auto"
		},
		bookingListCardContent: {
			padding: theme.spacing(1),
			"&:last-child": {
				paddingBottom: theme.spacing(1)
			}
		},
		bookingListCardTitle: {
			fontSize: "1rem"
		}
	});

export const CardListBookingType = withStyles(styles)(CardListBookingTypeBase);
