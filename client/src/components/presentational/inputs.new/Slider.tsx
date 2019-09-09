// import React from "react";
// import {
// 	FormControl,
// 	InputLabel,
// 	Slider as MaterialSlider,
// 	createStyles,
// 	withStyles
// } from "@material-ui/core";

// import { ISliderProps } from "../../../utils/typings";

// const Slider: React.FC<ISliderProps> = ({
// 	min,
// 	max,
// 	step,
// 	field,
// 	label,
// 	classes,
// 	disabled,
// 	fullWidth,
// 	error
// }) => {
// 	return (
// 		<FormControl className={classes.root} fullWidth={fullWidth} error={error}>
// 			{label && (
// 				<InputLabel htmlFor={field.name} className={classes.label}>
// 					{label}
// 				</InputLabel>
// 			)}
// 			<MaterialSlider
// 				onBlur={field.onBlur}
// 				id={field.name}
// 				classes={classes}
// 				value={field.value}
// 				min={min}
// 				max={max}
// 				step={step}
// 				onChange={field.onChange}
// 				disabled={disabled}
// 			/>
// 		</FormControl>
// 	);
// };

// Slider.defaultProps = {
// 	step: 1
// };

// const styles = createStyles({
// 	root: {
// 		display: "flex",
// 		overflowX: "hidden",
// 		minHeight: "60px"
// 	},
// 	label: {
// 		marginBottom: "3px"
// 	}
// });

// export default withStyles(styles)(Slider);
