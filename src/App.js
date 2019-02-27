import React, { Component, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
	state = {
		textValue: ""
	};
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Fragment />
				</BrowserRouter>

				<CssBaseline />
			</div>
		);
	}
}

export default App;
