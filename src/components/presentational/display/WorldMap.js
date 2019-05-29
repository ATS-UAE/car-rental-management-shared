import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Map, TileLayer, withLeaflet } from "react-leaflet";
import { compose } from "recompose";

function WorldMap({
	defaultCenter,
	children,
	askForLocation,
	onLocationAsk,
	mapProps,
	classes,
	onClick,
	defaultZoom
}) {
	const [viewport, setViewport] = useState({});
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
		setViewport({ center: defaultCenter, zoom: defaultZoom });
	}, []);

	return (
		<Map
			onClick={onClick}
			className={classes.root}
			onViewportChange={setViewport}
			viewport={viewport}
			{...mapProps}
		>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{children}
		</Map>
	);
}

WorldMap.propTypes = {
	defaultCenter: PropTypes.shape({
		lat: PropTypes.number,
		lng: PropTypes.number
	}),
	askForLocation: PropTypes.bool,
	onLocationAsk: PropTypes.func,
	mapProps: PropTypes.object,
	onClick: PropTypes.func,
	defaultZoom: PropTypes.number
};

WorldMap.defaultProps = {
	askForLocation: true,
	defaultCenter: { lat: 23.4241, lng: 53.8478 },
	defaultZoom: 8
};

const styles = { root: { height: "100%", width: "100%", minHeight: "200px" } };

export default compose(
	withStyles(styles),
	withLeaflet
)(WorldMap);

// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { compose, withProps } from "recompose";
// import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
// import { withStyles } from "@material-ui/core/styles";

// const ComposedMap = compose(
// 	withProps({
// 		googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
// 			process.env.REACT_APP_GOOGLE_MAPS_API_KEY
// 		}`
// 	}),
// 	withScriptjs,
// 	withGoogleMap
// )(GoogleMap);

// function GMaps({
// 	defaultCenter,
// 	children,
// 	askForLocation,
// 	onLocationAsk,
// 	mapContainerProps,
// 	classes,
// 	onClick,
// 	defaultZoom
// }) {
// 	useEffect(() => {
// 		askForLocation &&
// 			window.navigator.geolocation &&
// 			window.navigator.geolocation.getCurrentPosition(
// 				position => {
// 					onLocationAsk && onLocationAsk(position);
// 				},
// 				error => {
// 					onLocationAsk && onLocationAsk(null, error);
// 				}
// 			);
// 	}, []);

// 	return (
// 		<ComposedMap
// 			loadingElement={<div style={{ height: `100%` }} />}
// 			containerElement={<div className={classes.root} {...mapContainerProps} />}
// 			mapElement={<div style={{ height: `100%` }} />}
// 			defaultZoom={defaultZoom}
// 			defaultCenter={defaultCenter}
// 			onClick={e => onClick && onClick(e)}
// 		>
// 			{children}
// 		</ComposedMap>
// 	);
// }

// GMaps.propTypes = {
// 	defaultCenter: PropTypes.shape({
// 		lat: PropTypes.number,
// 		lng: PropTypes.number
// 	}),
// 	askForLocation: PropTypes.bool,
// 	onLocationAsk: PropTypes.func,
// 	mapContainerProps: PropTypes.object,
// 	googleMapsProps: PropTypes.object,
// 	onClick: PropTypes.func,
// 	defaultZoom: PropTypes.number
// };

// GMaps.defaultProps = {
// 	askForLocation: true,
// 	defaultCenter: { lat: 23.4241, lng: 53.8478 },
// 	defaultZoom: 8
// };

// const styles = {
// 	root: {
// 		height: "400px"
// 	}
// };

// export default withStyles(styles)(GMaps);
