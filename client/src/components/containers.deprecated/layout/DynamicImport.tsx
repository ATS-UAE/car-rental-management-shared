import { Component, ElementType, ReactNode } from "react";
import { CancellablePromise } from "../../../utils/helpers";

interface IProps {
	load: () => Promise<any>;
	children: (component: ElementType | null) => ReactNode | null;
}

interface IState {
	mod: ElementType | null;
	promise: CancellablePromise<any> | null;
}
class DynamicImport extends Component<IProps, IState> {
	public state: IState = {
		mod: null,
		promise: null
	};

	componentWillUnmount() {
		if (this.state.promise) {
			this.state.promise.cancel();
		}
	}

	componentWillMount() {
		const cancellablePromise = new CancellablePromise(this.props.load());
		cancellablePromise
			.getPromise()
			.then(mod => this.setState({ mod: mod.default }));
		this.setState({
			promise: cancellablePromise
		});
	}

	render(): ReactNode | null {
		return this.props.children(this.state.mod);
	}
}

export default DynamicImport;
