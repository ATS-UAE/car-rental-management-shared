import React from "react";
import GMaps from "../display/GMaps";
import PropTypes from "prop-types";
import { Marker } from "react-google-maps";
import { Button, Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function LocationSelector({
	onClick,
	onSelectorClick,
	value,
	selectorValue,
	classes,
	onSubmit,
	buttonLabel,
	onClose,
	open
}) {
	return (
		<div className={classes.root}>
			<GMaps
				onClick={e =>
					onClick && onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
				}
				defaultCenter={value}
			>
				{value && <Marker position={value} />}
			</GMaps>
			<Dialog open={open} onClose={onClose} fullWidth={true}>
				<GMaps
					onClick={e =>
						onSelectorClick &&
						onSelectorClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
					}
					defaultCenter={value}
				>
					{selectorValue && <Marker position={selectorValue} />}
				</GMaps>
				{onSubmit && (
					<Button
						variant="contained"
						className={classes.button}
						onClick={() => onSubmit()}
					>
						{buttonLabel}
					</Button>
				)}
			</Dialog>
		</div>
	);
}

const styles = theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	button: {
		borderRadius: "0 0 5px 5px"
	}
});

LocationSelector.propTypes = {
	value: PropTypes.shape({
		lng: PropTypes.number,
		lat: PropTypes.number
	}),
	onClick: PropTypes.func,
	onSubmit: PropTypes.func,
	buttonLabel: PropTypes.string
};

LocationSelector.defaultProps = {
	buttonLabel: "Confirm"
};

export default withStyles(styles)(LocationSelector);
