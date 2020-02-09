import React, { FC } from "react";
import { Tooltip } from "@material-ui/core";
import { Map, MapMarker } from ".";

type Location = {
	id: number;
	lat: number;
	lng: number;
	name: string;
};

export interface MapLocationMarkers {
	locations: Location[];
	onClick: (locationId: number) => void;
	value: number;
}

const getCenterPoint = (points: Array<[number, number]>): [number, number] => {
	let totalX = 0;
	let totalY = 0;

	for (const point of points) {
		totalX += point[0];
		totalY += point[1];
	}

	return [totalX / points.length, totalY / points.length];
};

const DEFAULT_COORDINATES = {
	lng: Number(process.env.DEFAULT_LNG) || 55.20161,
	lat: Number(process.env.DEFAULT_LAT) || 25.047736
};

export const MapLocationMarkers: FC<MapLocationMarkers> = ({
	locations,
	onClick,
	value
}) => {
	const center =
		locations.length > 0 && getCenterPoint(locations.map(l => [l.lng, l.lat]));
	return (
		<Map
			center={
				(center && { lng: center[0], lat: center[1] }) || DEFAULT_COORDINATES
			}
			zoom={9}
		>
			{locations.map(({ lat, lng, id, name }) => (
				<MapMarker
					key={id}
					title={name}
					position={{ lat, lng }}
					onClick={() => onClick(id)}
					active={id === value}
				/>
			))}
		</Map>
	);
};
