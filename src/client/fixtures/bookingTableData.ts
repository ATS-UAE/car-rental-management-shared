import moment from "moment";
import { BookingType, BookingStatus } from "../../shared/typings";
import { BookingTableItemData } from "../components/presentational";

export interface BookingTableTestItem extends BookingTableItemData {
	approvable: boolean;
	deletable: boolean;
	updatable: boolean;
	finalizable: boolean;
	payable: boolean;
	status: BookingStatus;
}

export const BOOKING_TABLE_DATA: BookingTableTestItem[] = [
	// Status: Pending
	{
		id: 1,
		approved: null,
		username: "Okabe Rintarou",
		finished: false,
		createdAt: moment().unix(),
		from: moment()
			.add(30, "minutes")
			.unix(),
		to: moment()
			.add(1, "day")
			.unix(),
		vehicle: "Toyota",
		bookingType: BookingType.BUSINESS,
		amount: null,
		paid: false,
		approvable: true,
		deletable: true,
		updatable: true,
		finalizable: false,
		payable: false,
		status: BookingStatus.PENDING
	},
	// Status: Denied
	{
		id: 2,
		approved: false,
		username: "Shiina Mayuri",
		finished: false,
		createdAt: moment().unix(),
		from: moment().unix(),
		to: moment()
			.add(1, "day")
			.unix(),
		vehicle: "Toyota",
		bookingType: BookingType.BUSINESS,
		amount: null,
		paid: false,
		approvable: false,
		deletable: true,
		updatable: false,
		finalizable: false,
		payable: false,
		status: BookingStatus.DENIED
	},
	// Status: Approved
	{
		id: 3,
		approved: true,
		username: "Makise Kurisu",
		finished: false,
		createdAt: moment().unix(),
		from: moment().unix(),
		to: moment()
			.add(1, "day")
			.unix(),
		vehicle: "Toyota",
		bookingType: BookingType.BUSINESS,
		amount: null,
		paid: false,
		approvable: false,
		deletable: false,
		updatable: true,
		finalizable: true,
		payable: false,
		status: BookingStatus.APPROVED
	},
	// Status: Expired
	{
		id: 4,
		approved: null,
		username: "Okabe Rintarou",
		finished: false,
		createdAt: moment().unix(),
		from: moment()
			.subtract(1, "day")
			.unix(),
		to: moment()
			.add(1, "day")
			.unix(),
		vehicle: "Toyota",
		bookingType: BookingType.BUSINESS,
		amount: null,
		paid: false,
		approvable: false,
		deletable: true,
		updatable: true,
		finalizable: false,
		payable: false,
		status: BookingStatus.EXPIRED
	},
	// Status: Ongoing
	{
		id: 5,
		approved: true,
		username: "Okabe Rintarou",
		finished: false,
		createdAt: moment().unix(),
		from: moment()
			.subtract(1, "day")
			.unix(),
		to: moment()
			.add(1, "day")
			.unix(),
		vehicle: "Toyota",
		bookingType: BookingType.BUSINESS,
		amount: null,
		paid: false,
		approvable: false,
		deletable: false,
		updatable: true,
		finalizable: true,
		payable: false,
		status: BookingStatus.ONGOING
	},
	// Status: Ongoing
	{
		id: 6,
		approved: true,
		username: "Okabe Rintarou",
		finished: false,
		createdAt: moment().unix(),
		from: moment()
			.subtract(1, "day")
			.unix(),
		to: moment()
			.add(1, "day")
			.unix(),
		vehicle: "Toyota",
		bookingType: BookingType.BUSINESS,
		amount: 100,
		paid: false,
		approvable: false,
		deletable: false,
		updatable: false,
		finalizable: true,
		payable: true,
		status: BookingStatus.ONGOING
	},
	// Status: Finished
	{
		id: 7,
		approved: true,
		username: "Okabe Rintarou",
		finished: false,
		createdAt: moment().unix(),
		from: moment()
			.subtract(2, "days")
			.unix(),
		to: moment()
			.subtract(1, "day")
			.unix(),
		vehicle: "Toyota",
		bookingType: BookingType.BUSINESS,
		amount: 100,
		paid: false,
		approvable: false,
		deletable: false,
		updatable: false,
		finalizable: true,
		payable: true,
		status: BookingStatus.FINISHED
	}
];
