import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoginRequiredPage from "./components/pages/LoginRequiredPage";
import All from "./components/pages/All";

import { pages } from "./variables";

function App({ classes }) {
	return (
		<div className={classes.app}>
			<BrowserRouter>
				<Fragment>
					<Route path="/" exact={false} component={All} />

					<Switch>
						{pages.map(page => {
							let component;
							if (page.wrapPaper) {
								component = (
									<Paper className={classes.body}>
										<page.component />
									</Paper>
								);
							} else {
								component = <page.component />;
							}
							if (page.requireLogin) {
								return (
									<Route
										key={page.id}
										path={page.path}
										exact={page.exact}
										render={() => (
											<LoginRequiredPage>{component}</LoginRequiredPage>
										)}
									/>
								);
							}
							return (
								<Route
									key={page.id}
									path={page.path}
									exact={page.exact}
									render={() => component}
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

const styles = theme => ({
	"@global": {
		body: {
			background: "linear-gradient(215deg, #FE6B8B, #EECDA3)",
			height: "100%"
		},
		html: {
			height: "100%"
		},
		"#root": { height: "100%" },
		/* width */
		"::-webkit-scrollbar": {
			width: "10px"
		},
		/* Track */
		"::-webkit-scrollbar-track": {
			opacity: 0,
			borderRadius: "1000px"
		},
		/* Handle */
		"::-webkit-scrollbar-thumb": {
			background: "#888",
			borderRadius: "1000px"
		},
		/* Handle on hover */
		"::-webkit-scrollbar-thumb:hover": {
			background: "linear-gradient(180deg, #FF8E53 30%, #FE6B8B 90%)"
		}
	},
	app: {
		display: "flex",
		flexDirection: "column",
		height: "100%"
	},
	body: {
		padding: theme.spacing.unit * 2,
		margin: theme.spacing.unit * 2,
		height: "100%",
		backgroundColor: "rgba(166, 166, 166, .2)",
		overflowY: "auto"
	}
});

export default withStyles(styles)(App);
