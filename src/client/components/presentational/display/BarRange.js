import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import classNames from "classnames";

function generateSegment(width, key, isPrimary, label) {
	const styles = theme => ({
		baseSegment: {
			height: theme.spacing(1),
			backfaceVisibility: "hidden"
		},
		fillerSegment: {
			backgroundColor: "gray",
			flexBasis: `${width}%`
		},
		primarySegment: {
			boxSizing: "border-box",
			borderLeft: `1px solid ${theme.palette.primary.main}`,
			borderRight: `1px solid ${theme.palette.primary.main}`,
			backgroundColor: theme.palette.primary.main,
			flexBasis: `${width}%`,
			flexShrink: 0,
			"&:hover": { boxShadow: "inset 0px 0px 0px 2px red" }
		}
	});

	const Segment = ({ classes }) => {
		let segment = (
			<div
				className={classNames(
					classes.baseSegment,
					isPrimary ? classes.primarySegment : classes.fillerSegment
				)}
			/>
		);
		if (isPrimary) {
			return <Tooltip title={label}>{segment}</Tooltip>;
		}
		return segment;
	};
	const StyledSegment = withStyles(styles)(Segment);
	return <StyledSegment key={key} />;
}

function BarRange({ values, classes }) {
	return (
		<div className={classes.bar}>
			{values.reduce((acc, value, index, array) => {
				let key = `${index}-${value.min}-${value.max}`;
				let previousValue = index > 0 ? array[index - 1] : { min: 0, max: 0 };

				acc.push(
					generateSegment(value.min - previousValue.max, `${key}-empty`, false)
				);
				acc.push(
					generateSegment(
						value.max - value.min,
						`${key}-value`,
						true,
						value.label
					)
				);
				if (index === array.length - 1) {
					acc.push(
						generateSegment(100 - value.max, `${key}-empty-last`, false)
					);
				}
				return acc;
			}, [])}
		</div>
	);
}

const styles = () => ({
	bar: {
		display: "flex"
	}
});

export default withStyles(styles)(BarRange);

BarRange.propTypes = {
	values: PropTypes.arrayOf(
		PropTypes.shape({
			min: PropTypes.number.isRequired,
			max: PropTypes.number.isRequired
		})
	),
	label: PropTypes.node
};
