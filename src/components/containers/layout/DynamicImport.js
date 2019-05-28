import React, { Component } from "react";

class DynamicImport extends Component {
	state = {
		mod: null
	};
	componentWillMount() {
		this.props.load().then(mod =>
			this.setState(() => ({
				mod: mod.default
			}))
		);
	}
	render() {
		return this.props.children(this.state.mod);
	}
}

export default DynamicImport;
