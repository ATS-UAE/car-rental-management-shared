import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Tooltip } from "@material-ui/core";
import { Slider as MaterialSlider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

function Slider({
	value,
	min,
	max,
	step,
	others,
	onChange,
	id,
	label,
	classes,
	showTooltip,
	showButtons,
	disabled
}) {
	const [mouseDownId, setMouseDownId] = useState([]);
	const handleHold = addMinus => () => {
		let holdValue = value;
		let mouseDownId1;
		let mouseDownId2;
		mouseDownId1 = setTimeout(() => {
			mouseDownId2 = setInterval(() => {
				if (addMinus === "add") {
					onChange({ target: { value: holdValue += step } });
				} else {
					onChange({ target: { value: holdValue -= step } });
				}
			}, 100);
			setMouseDownId([mouseDownId1, mouseDownId2]);
		}, 500);
		setMouseDownId([mouseDownId1, mouseDownId2]);
	};
	const removeHold = () => {
		clearTimeout(mouseDownId[0]);
		clearInterval(mouseDownId[1]);
	};
	const buttonLeft = (
		<IconButton
			onClick={() => {
				onChange({ target: { value: value - step } });
			}}
			onTouchStart={handleHold()}
			onMouseDown={handleHold()}
			onTouchEnd={removeHold}
			onMouseUp={removeHold}
			disabled={disabled}
		>
			<KeyboardArrowLeft />
		</IconButton>
	);

	const buttonRight = (
		<IconButton
			onClick={() => {
				onChange({ target: { value: value + step } });
			}}
			onMouseDown={handleHold("add")}
			onTouchStart={handleHold("add")}
			onTouchEnd={removeHold}
			onMouseUp={removeHold}
			disabled={disabled}
		>
			<KeyboardArrowRight />
		</IconButton>
	);

	return (
		<div className={classes.root}>
			{showTooltip && showButtons ? (
				<Tooltip title={value || 0} aria-label="Value">
					{buttonLeft}
				</Tooltip>
			) : (
				buttonLeft
			)}
			<div className={classes.slider}>
				{label && (
					<Typography id={id} className={classes.label}>
						{label}
					</Typography>
				)}
				<MaterialSlider
					value={value || 0}
					min={min}
					max={max}
					step={step}
					onChange={(e, v) => {
						onChange({ target: { value: v } });
					}}
					{...others}
					disabled={disabled}
				/>
			</div>
			{showTooltip && showButtons ? (
				<Tooltip title={value || 0} aria-label="Value">
					{buttonRight}
				</Tooltip>
			) : (
				buttonRight
			)}
		</div>
	);
}

Slider.propTypes = {
	value: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired,
	others: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	showTooltip: PropTypes.bool
};

Slider.defaultProps = {
	step: 1,
	showTooltip: false,
	showButtons: true
};

const style = theme => ({
	root: {
		display: "flex",
		overflowX: "hidden",
		minHeight: "60px"
	},
	slider: {
		flexGrow: 1
	},
	label: {
		marginBottom: "3px"
	},
	sliderButton: {
		color: theme.palette.primary.main
	}
});

export default withStyles(style)(Slider);
