import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from "./components/presentational/AppBar";
class App extends Component {
	render() {
		return (
			<div className="App">
        <AppBar />
        <CssBaseline />
			</div>
		);
	}
}

export default App;
