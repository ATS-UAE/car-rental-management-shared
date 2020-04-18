export default class CancellablePromise<T> {
	private promise: Promise<T>;
	private hasCancelled: boolean = false;

	constructor(promise: Promise<T>) {
		this.promise = new Promise<T>((resolve, reject) => {
			promise.then(data => {
				if (this.hasCancelled) {
					resolve(data);
				} else {
					reject(data);
				}
			});
		});
	}

	public cancel(): void {
		this.hasCancelled = true;
	}

	public getPromise(): Promise<T> {
		return this.promise;
	}
}
