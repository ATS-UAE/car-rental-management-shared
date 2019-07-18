import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

function ImageInput({
	classes,
	onChange,
	id,
	label,
	required,
	InputProps,
	error,
	value,
	disabled
}) {
	let imgSrc = null;
	if (value) {
		if (typeof value === "string") imgSrc = value;
		else imgSrc = URL.createObjectURL(value);
	}
	return (
		<div className={classes.root}>
			<input
				accept="image/*"
				className={classes.input}
				id={id}
				type="file"
				onChange={e => onChange && onChange(e)}
				required={required}
				{...InputProps}
				disabled={disabled}
			/>
			<label htmlFor={id} className={classes.label}>
				<Paper className={classes.preview}>
					{imgSrc ? (
						<img src={imgSrc} alt="Upload" className={classes.uploaded} />
					) : (
						<CloudUpload className={classes.uploaded} />
					)}
				</Paper>
				{!disabled && (
					<Typography variant="caption" color={error ? "error" : "primary"}>
						{`${label}${required ? "*" : ""}`}
					</Typography>
				)}
			</label>
		</div>
	);
}

const styles = theme => {
	return {
		input: {
			display: "none"
		},
		label: {
			display: "inline-flex",
			alignItems: "center"
		},
		preview: {
			display: "inline-flex",
			borderRadius: "1000px",
			width: "48px",
			justifyContent: "center",
			alignItems: "center",
			marginRight: theme.spacing(1)
		},
		uploaded: {
			clipPath: "circle(23px at center)",
			height: "48px"
		},
		button: {
			padding: theme.spacing(3),
			margin: theme.spacing(3)
		}
	};
};

export default withStyles(styles)(ImageInput);
