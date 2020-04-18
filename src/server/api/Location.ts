import { Vehicle as VehicleModel } from "../models";
import { Vehicle, UseParameters } from ".";
import { LocationAttributes } from "../../shared/typings";

export type CreateLocationOptions = UseParameters<
	LocationAttributes,
	"name" | "lat" | "lng" | "address",
	"locationImageSrc"
>;

export class Location {
	constructor(public data: VehicleModel) {}

	static get = async () => {};
	static getAll = async () => {};

	public addVehicles = async (vehicles: Vehicle[] | number[]) => {
		const ids: number[] = [];

		// Extract ids
		for (const v of vehicles) {
			if (typeof v === "number") {
				ids.push(v);
			} else {
				ids.push(v.data.id);
			}
		}

		await this.data.$add("vehicles", ids);
	};

	public removeVehicles = async (vehicles: Vehicle[] | number[]) => {
		const ids: number[] = [];

		// Extract ids
		for (const v of vehicles) {
			if (typeof v === "number") {
				ids.push(v);
			} else {
				ids.push(v.data.id);
			}
		}

		await this.data.$remove("vehicles", ids);
	};

	public static create = async (options: CreateLocationOptions) => {};
}
