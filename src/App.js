import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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

export default App;
