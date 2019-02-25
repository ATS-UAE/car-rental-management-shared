import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import "typeface-roboto";

import reducers from "./reducers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
	palette: {
		type: "light"
	}
});

let store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(reduxThunk)) // Used for the chrome extension, redux dev tools. And redux-thunk
);

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
