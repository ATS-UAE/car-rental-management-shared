import React from "react";
import { renderToString } from "react-dom/server";
import { Marker, withLeaflet } from "react-leaflet";
import L from "leaflet";

import { withStyles } from "@material-ui/core";
import { LocationCity } from "@material-ui/icons";
import classNames from "classnames";

function LocationMapMarkerSVG({ classes, src }) {
	return (
		<div className={classes.root}>
			<svg
				id="Layer_1"
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 782.2 926.42"
				className={classes.svg}
			>
				<path
					d="M391,0C148.68,0,6.76,225.34,0,391c-.51,12.58-2.36,76.58,30.13,150.78,29.55,67.48,81.65,129.77,147.94,174l.14.1c159.85,122.3,178.33,144.28,200.48,202a13.36,13.36,0,0,0,24.89.13c22.78-57.62,42.12-79.47,203.32-200.93L607,717c105.46-70,175-189.88,175-326C782,175.06,606.94,0,391,0ZM379,727.79C202.42,721.62,60.38,579.58,54.21,403,47.4,208.17,208.17,47.4,403,54.21,579.58,60.38,721.62,202.42,727.79,379,734.6,573.83,573.83,734.6,379,727.79Z"
					transform="translate(0.2)"
				/>
			</svg>
			{src ? (
				<img src={src} className={classes.image} alt="Garage location" />
			) : (
				<LocationCity className={classNames(classes.image, classes.noImage)} />
			)}
		</div>
	);
}

const iconStyles = theme => ({
	root: {
		position: "relative"
	},
	svg: {
		fill: "#FF875D"
	},
	noImage: { padding: "10px" },
	image: {
		minHeight: "62px",
		objectFit: "cover",
		backgroundColor: "#FF875D",
		position: "absolute",
		width: "100%",
		left: 0,
		zIndex: -1,
		bottom: "calc(50% + 9px)",
		transform: "translateY(50%)",
		clipPath: "circle(31px at center)"
	}
});

const StyledLocationMapMarkerSVG = withStyles(iconStyles)(LocationMapMarkerSVG);

export let locationIcon = L.divIcon({
	html: renderToString(<StyledLocationMapMarkerSVG />),
	iconSize: [70, 83], // size of the icon
	iconAnchor: [35, 83], // point of the icon which will correspond to marker's location
	popupAnchor: [-3, -76],
	className: "location-icon"
});

function LocationMapMarker(props) {
	return <Marker {...props} icon={locationIcon} />;
}

export default withLeaflet(LocationMapMarker);
