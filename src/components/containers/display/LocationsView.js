import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Marker } from "react-google-maps";
import * as actions from "../../../actions";
import GMaps from "../../presentational/display/GMaps";
import { RESOURCES, ACTIONS } from "../../../variables";
import Can from "../layout/Can";

function LocationsView({ locations, fetchLocations }) {
	useEffect(() => {
		if (!locations) {
			fetchLocations();
		}
	}, []);

	return (
		<Can
			resource={RESOURCES.LOCATIONS}
			action={ACTIONS.READ}
			yes={() => (
				<GMaps>
					{locations &&
						locations.data &&
						locations.data.map(({ lat, lng, name }) => (
							<Marker
								position={{ lat: lat, lng: lng }}
								label={name}
								key={lat + lng + name}
							/>
						))}
				</GMaps>
			)}
		/>
	);
}

const mapStateToProps = ({ locations }) => ({
	locations
});

export default connect(
	mapStateToProps,
	actions
)(LocationsView);
