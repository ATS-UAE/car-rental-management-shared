import { Component, ReactType, ComponentType, ReactNode } from "react";
import { cancelablePromise } from "../../../utils/helpers";

interface Props {
	children: (component: ReactType | null) => ReactNode;
	load: () => Promise<ReactType>;
}

interface State {
	mod: ReactType | null;
	promise: ReturnType<typeof cancelablePromise> | null;
}

class DynamicImport extends Component<Props, State> {
	public readonly state: Readonly<State> = {
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
				this.props.load().then(mod => this.setState({ mod: mod }))
			)
		});
	}
	render() {
		return this.props.children(this.state.mod);
	}
}

export default DynamicImport;
