import { User } from "../models";

export interface Castable<R> {
	cast: (user: User) => R;
}

export class Collection<R, T extends Castable<R>> {
	constructor(public data: T[]) {}

	public cast = (user: User) => {
		return this.data.map(item => item.cast(user));
	};
}
