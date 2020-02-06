import React, { FC, forwardRef } from "react";
import { Column, Action, MaterialTableProps } from "material-table";
import { MaterialTable, tableIcons } from ".";
import { BookingType, BookingStatus, Role } from "../../variables/enums";
import {
	Refresh,
	ThumbUp,
	ThumbDown,
	Delete,
	Edit,
	Check,
	Payment
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
}

export interface BookingTableProps {
	data: BookingTableItemData[];
	onRefresh: () => void;
	onUpdate: (rowData: BookingTabeleRowData) => void;
	onApprove: (rowData: BookingTabeleRowData) => void;
	onDeny: (rowData: BookingTabeleRowData) => void;
	onDelete: (rowData: BookingTabeleRowData) => void;
	onFinalize: (rowData: BookingTabeleRowData) => void;
	onPay: (rowData: BookingTabeleRowData) => void;
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
				onPay
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

type TableActions = {
	onUpdate: BookingTableProps["onUpdate"];
	onApprove: BookingTableProps["onApprove"];
	onDeny: BookingTableProps["onDeny"];
	onDelete: BookingTableProps["onDelete"];
	onRefresh: BookingTableProps["onRefresh"];
	onFinalize: BookingTableProps["onFinalize"];
	onPay: BookingTableProps["onFinalize"];
};

export const getBookingTableActions = (
	role: Role | null,
	tableActions: TableActions
): MaterialTableProps<BookingTabeleRowData>["actions"] => {
	const currentTimestamp = moment();
	const actions: MaterialTableProps<BookingTabeleRowData>["actions"] = [
		{
			icon: () => <Refresh />,
			tooltip: "Refresh Booking List",
			isFreeAction: true,
			onClick: () => tableActions.onRefresh()
		}
	];

	if (role && role !== Role.GUEST) {
		actions.push(
			({ from, approved }) => {
				const expiredBooking = currentTimestamp.isAfter(from);
				const visible = approved === null && !expiredBooking;
				return {
					icon: () => <ThumbUp />,
					tooltip: "Approve",
					hidden: !visible,
					onClick: (e, data) =>
						!Array.isArray(data) && tableActions.onApprove(data)
				};
			},
			({ from, approved }) => {
				const expiredBooking = currentTimestamp.isAfter(from);
				const visible = approved === null && !expiredBooking;
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
				const visible = approved && amount === null;
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
			}
		);
	}

	return actions;
};

export const getBookingTableColumns = (
	role: Role | null
): Column<BookingTabeleRowData>[] => {
	const columns = [...BOOKING_COLUMNS];

	if (role === Role.GUEST || role === null) {
		columns.splice(1, 1);
	}

	return columns;
};

export const processBookingTableData = (
	data: BookingTableItemData[]
): BookingTabeleRowData[] => {
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
			bookingType: toTitleWords(item.bookingType)
		};
	});
};

export interface BookingTabeleRowData {
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
}

const BOOKING_COLUMNS: Column<BookingTabeleRowData>[] = [
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
