import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withStyles, createStyles, Theme, WithStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoginRequiredPage from "./components/pages/LoginRequiredPage";
import All from "./components/pages/All";

import { pages } from "./variables";

function App({ classes }: WithStyles<typeof styles>) {
	return (
		<div className={classes.app}>
			<BrowserRouter>
				<Fragment>
					<Route path="/" exact={false} component={All} />

					<Switch>
						{pages.map(
							({ requireLogin, wrapPaper, id, path, exact, component }) => {
								const renderWrappedComponent = (props: object) => {
									let proppedComponent = component(props);
									let wrapped = wrapPaper ? (
										<Paper className={classes.body}>{proppedComponent}</Paper>
									) : (
										proppedComponent
									);
									wrapped = requireLogin ? (
										<LoginRequiredPage>{wrapped}</LoginRequiredPage>
									) : (
										wrapped
									);
									return wrapped;
								};
								return (
									<Route
										key={id}
										path={path}
										exact={exact}
										render={renderWrappedComponent}
									/>
								);
							}
						)}
					</Switch>
				</Fragment>
			</BrowserRouter>
			<CssBaseline />
		</div>
	);
}

const styles = (theme: Theme) =>
	createStyles({
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
				width: "5px",
				height: "5px"
			},
			/* Track */
			"::-webkit-scrollbar-track": {
				background: "rgba(255, 255, 255, 0.1)",
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
			padding: theme.spacing(2),
			margin: theme.spacing(1),
			height: "100%",
			backgroundColor: "rgba(166, 166, 166, .2)",
			overflowY: "auto",
			[theme.breakpoints.down("xs")]: {
				padding: 0
			}
		}
	});

export default withStyles(styles)(App);
