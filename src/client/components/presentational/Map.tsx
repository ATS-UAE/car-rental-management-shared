import React, { useEffect, useState, FC, PropsWithChildren } from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import { Map as LeafletMap, TileLayer, withLeaflet } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { compose } from "recompose";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

export interface Coordinates {
	lat: number;
	lng: number;
}

export interface MapProps {
	center: Coordinates;
	classes?: Partial<ClassNameMap<keyof typeof styles>>;
	zoom: number;
	askForLocation?: boolean;
	onLocationAsk?(position: Position | null, error?: PositionError): void;
	onClick?(event: LeafletMouseEvent): void;
}

type InnerProps = WithStyles<typeof styles> & MapProps;

const SimpleMap: FC<MapProps & InnerProps> = ({
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

export const Map = compose<InnerProps, MapProps>(
	withStyles(styles),
	withLeaflet
)(SimpleMap);
