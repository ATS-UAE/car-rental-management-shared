import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppBar from "./components/presentational/AppBar";
class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<AppBar />
				</BrowserRouter>
				<CssBaseline />
			</div>
		);
	}
}

export default App;
