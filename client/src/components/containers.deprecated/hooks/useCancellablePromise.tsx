import { useEffect, useState } from "react";
import { cancelablePromise } from "../../../utils";
export default p => {
	const [promise, setPromise] = useState();
	useEffect(() => {
		setPromise(cancelablePromise(p));
		return () => {
			promise.cancel();
		};
	}, []);
	return promise.promise;
};
