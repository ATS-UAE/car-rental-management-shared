import React, { FC } from "react";
import {
	BookingTable as BookingTableBase,
	BookingTableItemData
} from "../presentational";
import { BookingType, Role } from "../../variables/enums";
import { BOOKING_TABLE_DATA } from "../../fixtures";
import moment from "moment";

export const BookingTable: FC<{}> = () => {
	return (
		<BookingTableBase
			data={BOOKING_TABLE_DATA}
			onApprove={() => {}}
			onDeny={() => {}}
			onUpdate={() => {}}
			onDelete={() => {}}
			onFinalize={() => {}}
			onRefresh={() => {}}
			onPay={() => {}}
			role={Role.ADMIN}
		/>
	);
};
