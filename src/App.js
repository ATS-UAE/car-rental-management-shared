import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppBar from "./components/presentational/layout/AppBar";
import { pages } from "./variables";

class App extends Component {
	state = {
		textValue: ""
	};
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Fragment>
						<AppBar />
						<Switch>
							{pages.map(page => (
								<Route
									key={page.path}
									path={page.path}
									exact={true}
									component={page.component}
								/>
							))}
						</Switch>
					</Fragment>
				</BrowserRouter>

				<CssBaseline />
			</div>
		);
	}
}

export default App;
