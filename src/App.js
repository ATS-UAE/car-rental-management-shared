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
						{pages.map(
							({ requireLogin, wrapPaper, id, path, exact, component }) => {
								const renderWrappedComponent = props => {
									let proppedComponent = React.createElement(component, props);
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
			width: "10px",
			height: "10px"
		},
		/* Track */
		"::-webkit-scrollbar-track": {
			background: "rgba(125, 125, 125, 0.1)",
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
