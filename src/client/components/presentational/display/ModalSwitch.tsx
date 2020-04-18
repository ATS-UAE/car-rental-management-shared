import React, { Component, ReactNode, ComponentType } from "react";
import {
	Route as ReactRouterRoute,
	RouteComponentProps
} from "react-router-dom";
import { Location, History } from "history";
// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on how you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.

interface Route {
	path: string;
	component?: ComponentType;
	render?: (props: RouteComponentProps) => ReactNode;
}

interface Props {
	location: Location<{ modal?: boolean }>;
	history: History;
	routes: Route[];
}

export class ModalSwitch extends Component<Props> {
	previousLocation = this.props.location;

	componentWillUpdate(nextProps) {
		let { location } = this.props;

		// set previousLocation if props.location is not modal
		if (
			nextProps.history.action !== "POP" &&
			(!location.state || !location.state.modal)
		) {
			this.previousLocation = this.props.location;
		}
	}

	render() {
		let { location, routes } = this.props;

		let isModal = !!(
			location.state &&
			location.state.modal &&
			this.previousLocation !== location
		); // not initial render

		return routes.map(({ path, component, render }) =>
			isModal ? (
				<ReactRouterRoute
					key={path}
					path={path}
					component={component}
					render={render}
				/>
			) : null
		);
	}
}
