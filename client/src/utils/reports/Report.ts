import api from "../helpers/api";
import { VehicleStatusData, fetchVehicleStatus } from "./api";

export class Report<Data extends Object> {
	constructor(public name: string, public data: Array<Data>) {}
	static vehicleStatus = async () => {
		const data = await fetchVehicleStatus();
		return new Report<VehicleStatusData>("Vehicle Status", data);
	};
}
