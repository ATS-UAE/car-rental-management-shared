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
			maxZoom={19}
			{...mapProps}
		>
			<TileLayer
				attribution='<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
				url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en"
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
