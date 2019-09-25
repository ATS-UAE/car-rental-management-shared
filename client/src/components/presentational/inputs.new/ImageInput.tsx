// import React from "react";
// import {
// 	Paper,
// 	Typography,
// 	createStyles,
// 	Theme,
// 	withStyles,
// 	WithStyles
// } from "@material-ui/core";
// import { CloudUpload } from "@material-ui/icons";

// import { IImageInputProps } from "../../../utils/typings";

// const ImageInput: React.FC<IImageInputProps & WithStyles<typeof styles>> = ({
// 	field,
// 	classes,
// 	error,
// 	disabled,
// 	icon: Icon,
// 	label
// }) => {
// 	let imgSrc = null;
// 	if (field.value) {
// 		if (typeof field.value === "string") imgSrc = field.value;
// 		else imgSrc = URL.createObjectURL(field.value);
// 	}
// 	return (
// 		<div className={classes.root}>
// 			<input
// 				accept="image/*"
// 				className={classes.input}
// 				id={field.name}
// 				type="file"
// 				onBlur={field.onBlur}
// 				onChange={field.onChange}
// 				disabled={disabled}
// 			/>
// 			<label htmlFor={field.name} className={classes.label}>
// 				<Paper className={classes.preview}>
// 					{imgSrc ? (
// 						<img src={imgSrc} alt="Upload" className={classes.uploaded} />
// 					) : (
// 						<Icon className={classes.icon} />
// 					)}
// 				</Paper>
// 				{!disabled && (
// 					<Typography variant="caption" color={error ? "error" : undefined}>
// 						{label}
// 					</Typography>
// 				)}
// 			</label>
// 		</div>
// 	);
// };

// ImageInput.defaultProps = {
// 	icon: CloudUpload
// };

// const styles = (theme: Theme) =>
// 	createStyles({
// 		root: {},
// 		input: {
// 			display: "none"
// 		},
// 		label: {
// 			display: "inline-flex",
// 			flexDirection: "column",
// 			alignItems: "center",
// 			width: ({ fullWidth }: IImageInputProps) =>
// 				fullWidth ? "100%" : undefined
// 		},
// 		preview: {
// 			display: "inline-flex",
// 			borderRadius: "1000px",
// 			width: ({ main }: IImageInputProps) => {
// 				let size = 48;
// 				return main ? `${size * 3}px` : `${size}px`;
// 			},
// 			height: ({ main }: IImageInputProps) => {
// 				let size = 48;
// 				return main ? `${size * 3}px` : `${size}px`;
// 			},
// 			justifyContent: "center",
// 			alignItems: "center",
// 			marginRight: theme.spacing(1),
// 			margin: ({ fullWidth }: IImageInputProps) =>
// 				fullWidth ? "100%" : undefined
// 		},
// 		icon: {
// 			width: ({ main }: IImageInputProps) => {
// 				let size = 30;
// 				return main ? `${size * 3}px` : `${size}px`;
// 			},
// 			height: ({ main }: IImageInputProps) => {
// 				let size = 30;
// 				return main ? `${size * 3}px` : `${size}px`;
// 			}
// 		},
// 		uploaded: {
// 			clipPath: ({ main }: IImageInputProps) => {
// 				let size = 23;
// 				return main
// 					? `circle(${size * 3}px at center)`
// 					: `circle(${size}px at center)`;
// 			},
// 			height: "100%"
// 		},
// 		button: {
// 			padding: theme.spacing(3),
// 			margin: theme.spacing(3)
// 		}
// 	});

// export default withStyles(styles)(ImageInput);
