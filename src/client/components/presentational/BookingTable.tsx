import React, { FC } from "react";
import { Column, MaterialTableProps } from "material-table";
import { MaterialTable } from ".";
import { BookingType, Role } from "../../../shared/typings";
import {
	Refresh,
	ThumbUp,
	ThumbDown,
	Delete,
	Edit,
	Check,
	Payment,
	Undo,
	Visibility
} from "@material-ui/icons";
import { RoleUtils, toTitleWords, getBookingStatus } from "../../utils";
import moment from "moment";

export interface BookingTableItemData {
	id: number;
	paid: boolean;
	amount: number | null;
	approved: boolean | null;
	username: string;
	vehicle: string;
	createdAt: number;
	from: number;
	to: number;
	bookingType: BookingType;
	finished: boolean;
	pickupDate: number | null;
}

export interface BookingTableProps {
	data: BookingTableItemData[];
	onRefresh: () => void;
	onUpdate: (rowData: BookingTableRowData) => void;
	onApprove: (rowData: BookingTableRowData) => void;
	onDeny: (rowData: BookingTableRowData) => void;
	onDelete: (rowData: BookingTableRowData) => void;
	onFinalize: (rowData: BookingTableRowData) => void;
	onPay: (rowData: BookingTableRowData) => void;
	onPickup: (rowData: BookingTableRowData) => void;
	onView: (rowData: BookingTableRowData) => void;
	role: Role | null;
	isLoading?: boolean;
}

export const BookingTable: FC<BookingTableProps> = ({
	data,
	role,
	onUpdate,
	onApprove,
	onDeny,
	onDelete,
	onRefresh,
	onFinalize,
	onPay,
	onPickup,
	onView,
	isLoading
}) => {
	return (
		<MaterialTable
			data={processBookingTableData(data)}
			columns={getBookingTableColumns(role)}
			actions={getBookingTableActions(role, {
				onUpdate,
				onApprove,
				onDeny,
				onDelete,
				onRefresh,
				onFinalize,
				onPay,
				onPickup,
				onView
			})}
			options={{
				filtering: true,
				grouping: true,
				columnsButton: true,
				pageSizeOptions: [5, 10, 20, 50, 100, 200, 500, 1000],
				exportButton: true,
				emptyRowsWhenPaging: false
			}}
			title="Bookings"
			isLoading={isLoading}
		/>
	);
};

type TableActions = Pick<
	BookingTableProps,
	| "onUpdate"
	| "onApprove"
	| "onDeny"
	| "onDelete"
	| "onRefresh"
	| "onFinalize"
	| "onPay"
	| "onPickup"
	| "onView"
>;

export const getBookingTableActions = (
	role: Role | null,
	tableActions: TableActions
): MaterialTableProps<BookingTableRowData>["actions"] => {
	const currentTimestamp = moment();
	const actions: MaterialTableProps<BookingTableRowData>["actions"] = [
		{
			icon: () => <Refresh />,
			tooltip: "Refresh Booking List",
			isFreeAction: true,
			onClick: () => tableActions.onRefresh()
		},
		() => {
			return {
				icon: () => <Visibility />,
				tooltip: "View booking details",
				onClick: (e, data) => !Array.isArray(data) && tableActions.onView(data)
			};
		}
	];

	if (role && role !== Role.GUEST) {
		actions.push(
			({ approved }) => {
				const visible = approved === null;
				return {
					icon: () => <ThumbUp />,
					tooltip: "Approve",
					hidden: !visible,
					onClick: (e, data) =>
						!Array.isArray(data) && tableActions.onApprove(data)
				};
			},
			({ approved }) => {
				const visible = approved === null;
				return {
					icon: () => <ThumbDown />,
					tooltip: "Deny",
					hidden: !visible,
					onClick: (e, data) =>
						!Array.isArray(data) && tableActions.onDeny(data)
				};
			},
			({ approved }) => {
				const visible = !approved && RoleUtils.isRoleBetter(Role.ADMIN, role);
				return {
					icon: () => <Delete />,
					tooltip: "Delete",
					hidden: !visible,
					onClick: (e, data) =>
						!Array.isArray(data) && tableActions.onDelete(data)
				};
			},
			({ approved, amount }) => {
				const visible =
					approved === null || (approved === true && amount === null);
				return {
					icon: () => <Edit />,
					tooltip: "Update",
					hidden: !visible,
					onClick: (e, data) =>
						!Array.isArray(data) && tableActions.onUpdate(data)
				};
			},
			({ approved, amount }) => {
				const visible = approved === true;
				return {
					icon: () => <Check />,
					tooltip: "Finalize",
					hidden: !visible,
					onClick: (e, data) =>
						!Array.isArray(data) && tableActions.onFinalize(data)
				};
			},
			({ approved, amount, paid }) => {
				const visible = approved && amount !== null && !paid;
				return {
					icon: () => <Payment />,
					tooltip: "Mark as paid",
					hidden: !visible,
					onClick: (e, data) => !Array.isArray(data) && tableActions.onPay(data)
				};
			},
			({ approved, pickupDate }) => {
				const visible = approved && pickupDate === null;
				return {
					icon: () => <Undo />,
					tooltip: "Vehicle pick-up",
					hidden: !visible,
					onClick: (e, data) =>
						!Array.isArray(data) && tableActions.onPickup(data)
				};
			}
		);
	}

	return actions;
};

export const getBookingTableColumns = (
	role: Role | null
): Column<BookingTableRowData>[] => {
	const columns = [...BOOKING_COLUMNS];

	if (role === Role.GUEST || role === null) {
		columns.splice(1, 1);
	}

	return columns;
};

export const processBookingTableData = (
	data: BookingTableItemData[]
): BookingTableRowData[] => {
	return data.map(item => {
		const bookingSent = moment(item.createdAt, "X");
		const bookingStart = moment(item.from, "X");
		const bookingEnd = moment(item.to, "X");
		return {
			id: item.id,
			username: item.username,
			approved: item.approved,
			vehicle: item.vehicle,
			paid: item.paid,
			amount: item.amount,
			createdAt: bookingSent.toDate(),
			createdAtYear: bookingSent.year(),
			createdAtMonth: bookingSent.format("MMM"),
			createdAtDay: bookingSent.date(),
			from: bookingStart.toDate(),
			fromYear: bookingStart.year(),
			fromMonth: bookingStart.format("MMM"),
			fromDay: bookingStart.date(),
			to: bookingEnd.toDate(),
			toYear: bookingEnd.year(),
			toMonth: bookingEnd.format("MMM"),
			toDay: bookingEnd.date(),
			status: toTitleWords(
				getBookingStatus({
					approved: item.approved,
					from: item.from,
					to: item.to
				})
			),
			bookingType: toTitleWords(item.bookingType),
			pickupDate:
				(item.pickupDate && moment(item.pickupDate, "X").toDate()) || null
		};
	});
};

export interface BookingTableRowData {
	id: number;
	approved: boolean | null;
	username: string;
	vehicle: string;
	amount: number | null;
	paid: boolean;
	createdAt: Date;
	createdAtYear: number;
	createdAtMonth: string;
	createdAtDay: number;
	from: Date;
	fromYear: number;
	fromMonth: string;
	fromDay: number;
	to: Date;
	toYear: number;
	toMonth: string;
	toDay: number;
	status: string;
	bookingType: string;
	pickupDate: Date | null;
}

const BOOKING_COLUMNS: Column<BookingTableRowData>[] = [
	{
		title: "ID",
		type: "numeric",
		field: "id"
	},
	{
		title: "Username",
		field: "username"
	},
	{
		title: "Vehicle",
		field: "vehicle"
	},
	{
		title: "Sent",
		type: "datetime",
		field: "createdAt"
	},
	{
		title: "Sent Date",
		type: "date",
		field: "createdAt",
		hidden: true
	},
	{
		title: "Sent Year",
		field: "createdAtYear",
		hidden: true,
		type: "numeric"
	},
	{
		title: "Sent Month",
		field: "createdAtMonth",
		hidden: true
	},
	{
		title: "Sent Day",
		field: "createdAtDay",
		hidden: true
	},
	{
		title: "Start",
		type: "datetime",
		field: "from"
	},
	{
		title: "Start Date",
		type: "date",
		field: "from",
		hidden: true
	},
	{
		title: "Start Year",
		field: "fromYear",
		hidden: true
	},
	{
		title: "Start Month",
		field: "fromMonth",
		hidden: true
	},
	{
		title: "Start Day",
		field: "fromDay",
		hidden: true
	},
	{
		title: "End",
		type: "datetime",
		field: "to"
	},
	{
		title: "End Date",
		type: "date",
		field: "to",
		hidden: true
	},
	{
		title: "End Year",
		field: "toYear",
		hidden: true
	},
	{
		title: "End Month",
		field: "toMonth",
		hidden: true
	},
	{
		title: "End Day",
		field: "toDay",
		hidden: true
	},
	{
		title: "Type",
		field: "bookingType"
	},
	{
		title: "Status",
		field: "status"
	}
];
