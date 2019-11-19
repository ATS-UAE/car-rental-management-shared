import React, { useEffect, useState, FC } from "react";
import {
	withStyles,
	createStyles,
	WithStyles,
	StyledComponentProps
} from "@material-ui/core";
import { Map as LeafletMap, TileLayer, withLeaflet } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { compose } from "recompose";

export interface Coordinates {
	lat: number;
	lng: number;
}

export interface MapProps extends WithStyles<typeof styles> {
	center: Coordinates;
	zoom: number;
	askForLocation?: boolean;
	onLocationAsk?(position: Position | null, error?: PositionError): void;
	onClick?(event: LeafletMouseEvent): void;
}

const SimpleMap: FC<MapProps> = ({
	center,
	zoom,
	onLocationAsk,
	askForLocation,
	children,
	onClick,
	classes
}) => {
	const [viewport, setViewport] = useState();
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
		setViewport({ center: center, zoom: zoom });
	}, []);
	return (
		<LeafletMap
			onClick={onClick}
			className={classes.root}
			onViewportChange={setViewport}
			viewport={viewport}
			maxZoom={19}
		>
			<TileLayer
				attribution='<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
				url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en"
			/>
			{children}
		</LeafletMap>
	);
};
const styles = createStyles({
	root: { height: "100%", width: "100%", minHeight: "200px" }
});

export const Map = compose<
	MapProps,
	Omit<MapProps, "classes"> & Partial<Pick<MapProps, "classes">>
>(
	withStyles(styles),
	withLeaflet
)(SimpleMap);
