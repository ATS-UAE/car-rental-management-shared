import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { pages } from "./variables";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Fragment>
					{pages.map(page => (
						<Route
							key={page.id}
							path={page.path}
							exact={page.exact}
							component={page.component}
						/>
					))}
				</Fragment>
			</BrowserRouter>
			<CssBaseline />
		</div>
	);
}

export default App;
