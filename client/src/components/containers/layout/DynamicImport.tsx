import { Component } from "react";

import { cancelablePromise } from "../../../utils";

class DynamicImport extends Component {
	state = {
		mod: null,
		promise: null
	};
	componentWillUnmount() {
		if (this.state.promise) {
			this.state.promise.cancel();
		}
	}
	componentWillMount() {
		this.setState({
			promise: cancelablePromise(
				this.props.load().then(mod => this.setState({ mod: mod.default }))
			)
		});
	}
	render() {
		return this.props.children(this.state.mod);
	}
}

export default DynamicImport;
