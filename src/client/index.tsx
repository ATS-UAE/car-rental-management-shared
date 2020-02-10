import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { create } from "jss";
import "typeface-roboto";

import reducers from "./reducers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const jss = create({
	plugins: [...jssPreset().plugins]
});

const theme = createMuiTheme({
	// palette: {
	// 	primary: {
	// 		main: "#FF875D",
	// 		contrastText: "#000"
	// 	},
	// 	secondary: { main: "#11cb5f" }
	// },
	// overrides: {
	// 	MuiAppBar: {
	// 		root: {
	// 			background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
	// 			color: "black"
	// 		}
	// 	},
	// 	MuiButton: {
	// 		root: {
	// 			background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
	// 			borderRadius: 3,
	// 			border: 0,
	// 			height: 48,
	// 			padding: "0 30px",
	// 			boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
	// 		},
	// 		text: {
	// 			color: "#000",
	// 			background: "#FF875D",
	// 			boxShadow: "none"
	// 		},
	// 		textPrimary: {
	// 			color: "#000"
	// 		}
	// 	}
	// }
});

let store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(reduxThunk)) // Used for the chrome extension, redux dev tools. And redux-thunk
);

ReactDOM.render(
	<Provider store={store}>
		<StylesProvider jss={jss}>
			<MuiThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<App />
				</MuiPickersUtilsProvider>
			</MuiThemeProvider>
		</StylesProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
