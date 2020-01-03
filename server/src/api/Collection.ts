import { User } from "../models";

export interface Castable {
	cast: (user: User) => any;
}

export class Collection<T extends Castable> {
	constructor(public data: T[]) {}

	public cast = (user: User) => {
		return this.data.map(item => item.cast(user));
	};
}
