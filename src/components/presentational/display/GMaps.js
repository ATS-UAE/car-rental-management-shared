import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

function GMaps({
	defaultCenter,
	children,
	askForLocation,
	onLocationAsk,
	mapContainerProps,
	classes,
	googleMapProps
}) {
	useEffect(() => {
		askForLocation &&
			window.navigator.geolocation &&
			window.navigator.geolocation.getCurrentPosition(
				position => {
					onLocationAsk && onLocationAsk(position);
				},
				error => {
					onLocationAsk && onLocationAsk(null, error);
				}
			);
	}, []);
	const Component = function() {
		return (
			<GoogleMap
				defaultZoom={8}
				defaultCenter={defaultCenter}
				{...googleMapProps}
			>
				{children}
			</GoogleMap>
		);
	};
	const MapBuild = compose(
		withProps({
			googleMapURL:
				"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
			loadingElement: <div style={{ height: `100%` }} />,
			containerElement: <div className={classes.root} />,
			mapElement: <div style={{ height: `100%` }} {...mapContainerProps} />
		}),
		withScriptjs,
		withGoogleMap
	)(Component);

	return <MapBuild />;
}

GMaps.propTypes = {
	defaultCenter: PropTypes.shape({
		lat: PropTypes.number,
		lng: PropTypes.number
	}),
	askForLocation: PropTypes.bool,
	onLocationAsk: PropTypes.func,
	mapContainerProps: PropTypes.object
};

GMaps.defaultProps = {
	askForLocation: true,
	defaultCenter: { lat: 23.4241, lng: 53.8478 }
};

const styles = {
	root: {
		height: "400px"
	}
};

export default withStyles(styles)(GMaps);
