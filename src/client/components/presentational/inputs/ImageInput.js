import React from "react";
import { Paper, Typography } from "@material-ui/core";
import * as icons from "@material-ui/icons";
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
	disabled,
	icon
}) {
	let imgSrc = null;
	if (value) {
		if (typeof value === "string") imgSrc = value;
		else imgSrc = URL.createObjectURL(value);
	}
	let Icon = icons[icon];
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
						<Icon className={classes.icon} />
					)}
				</Paper>
				{!disabled && (
					<Typography variant="caption" color={error ? "error" : undefined}>
						{`${label}${required ? "*" : ""}`}
					</Typography>
				)}
			</label>
		</div>
	);
}

ImageInput.defaultProps = {
	icon: "CloudUpload"
};

const styles = theme => {
	return {
		input: {
			display: "none"
		},
		label: {
			display: "inline-flex",
			flexDirection: "column",
			alignItems: "center",
			width: ({ fullWidth }) => fullWidth && "100%"
		},
		preview: {
			display: "inline-flex",
			borderRadius: "1000px",
			width: ({ main }) => {
				let size = 48;
				return main ? `${size * 3}px` : `${size}px`;
			},
			height: ({ main }) => {
				let size = 48;
				return main ? `${size * 3}px` : `${size}px`;
			},
			justifyContent: "center",
			alignItems: "center",
			marginRight: theme.spacing(1),
			margin: ({ fullWidth }) => fullWidth && "auto"
		},
		icon: {
			width: ({ main }) => {
				let size = 30;
				return main ? `${size * 3}px` : `${size}px`;
			},
			height: ({ main }) => {
				let size = 30;
				return main ? `${size * 3}px` : `${size}px`;
			}
		},
		uploaded: {
			clipPath: ({ main }) => {
				let size = 23;
				return main
					? `circle(${size * 3}px at center)`
					: `circle(${size}px at center)`;
			},
			height: "100%"
		},
		button: {
			padding: theme.spacing(3),
			margin: theme.spacing(3)
		}
	};
};

export default withStyles(styles)(ImageInput);
