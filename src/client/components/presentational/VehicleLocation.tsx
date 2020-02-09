import React, { FC } from "react";
import { DirectionsCar } from "@material-ui/icons";
import { Map, Coordinates, MapMarker } from "./";

export interface VehicleLocationProps {
	position: Coordinates;
}

export const VehicleLocation: FC<VehicleLocationProps> = ({ position }) => {
	return (
		<Map center={position} zoom={11}>
			<MapMarker position={position} icon={DirectionsCar}></MapMarker>
		</Map>
	);
};
