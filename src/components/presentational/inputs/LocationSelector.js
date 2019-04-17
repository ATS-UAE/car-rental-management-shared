import React from "react";
import GMaps from "../display/GMaps";
import PropTypes from "prop-types";
import { Marker } from "react-google-maps";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function LocationSelector({
	googleMapsProps,
	onClick,
	value,
	classes,
	onSubmit,
	buttonLabel,
	mapContainerProps
}) {
	const marker = value ? <Marker position={value} /> : null;
	return (
		<div className={classes.root}>
			<GMaps
				googleMapProps={{
					onClick: e => {
						onClick && onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
					},
					...googleMapsProps
				}}
				mapContainerProps={mapContainerProps}
			>
				{marker}
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
	value: {
		lng: PropTypes.number,
		lat: PropTypes.number
	},
	onClick: PropTypes.func,
	onSubmit: PropTypes.func,
	buttonLabel: PropTypes.string
};

LocationSelector.defaultProps = {
	buttonLabel: "Confirm"
};

export default withStyles(styles)(LocationSelector);
