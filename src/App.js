import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoginRequiredPage from "./components/pages/LoginRequiredPage";
import All from "./components/pages/All";

import { pages } from "./variables";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Fragment>
					<Route path="/" exact={false} component={All} />
					<Switch>
						{pages.map(page => {
							if (page.requireLogin) {
								return (
									<Route
										key={page.id}
										path={page.path}
										exact={page.exact}
										render={() => (
											<LoginRequiredPage>
												<page.component />
											</LoginRequiredPage>
										)}
									/>
								);
							}
							return (
								<Route
									key={page.id}
									path={page.path}
									exact={page.exact}
									render={() => <page.component />}
								/>
							);
						})}
					</Switch>
				</Fragment>
			</BrowserRouter>
			<CssBaseline />
		</div>
	);
}

const styles = {
	"@global": {
		body: {
			background: "linear-gradient(215deg, #FE6B8B, #EECDA3)",
			minHeight: "100%"
		},
		html: {
			minHeight: "100%"
		}
	}
};

export default withStyles(styles)(App);
