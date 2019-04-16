import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoginRequiredPage from "./components/pages/LoginRequiredPage";

import { pages } from "./variables";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Fragment>
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
				</Fragment>
			</BrowserRouter>
			<CssBaseline />
		</div>
	);
}

const styles = {
	"@global": {
		body: {
			background: "linear-gradient(215deg, #FE6B8B, #EECDA3)"
		},
		html: {
			height: "100%"
		}
	}
};

export default withStyles(styles)(App);
