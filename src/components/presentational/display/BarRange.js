import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

function generateSegment(width, key, isPrimary, label) {
	const styles = theme => ({
		segment: {
			backgroundColor: isPrimary ? theme.palette.primary.main : "gray",
			width: `${width}%`,
			height: theme.spacing.unit,
			display: "inline-block",
			boxSizing: "border-box",
			backfaceVisibility: "hidden",
			"&:hover": isPrimary
				? {
						border: "red 1px solid"
				  }
				: {}
		}
	});

	const Segment = ({ classes }) => {
		let segment = <div className={classes.segment} />;
		if (isPrimary) {
			return <Tooltip title={label}>{segment}</Tooltip>;
		}
		return segment;
	};
	const StyledSegment = withStyles(styles)(Segment);
	return <StyledSegment key={key} />;
}

export default function BarRange({ values }) {
	return (
		<div>
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

BarRange.propTypes = {
	values: PropTypes.arrayOf(
		PropTypes.shape({
			min: PropTypes.number.isRequired,
			max: PropTypes.number.isRequired
		})
	),
	label: PropTypes.node
};
