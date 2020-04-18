import React from "react";
import { MaterialTableProps, Action } from "material-table";
import {
	BookingTable,
	BookingTableItemData,
	MaterialTable,
	BookingTableRowData
} from ".";
import { shallow } from "enzyme";
import { Role, BookingType, BookingStatus } from "../../../shared/typings";
import { BOOKING_TABLE_DATA } from "../../fixtures";
import {
	getBookingTableActions,
	processBookingTableData
} from "./BookingTable";
import { toTitleWords } from "../../utils";

const findAction = (
	actions: MaterialTableProps<BookingTableRowData>["actions"],
	tooltip: string,
	data?: BookingTableItemData
): Action<BookingTableRowData> | undefined => {
	const processedData = data
		? processBookingTableData([data])[0]
		: processBookingTableData([BOOKING_TABLE_DATA[0]])[0];
	if (actions) {
		for (const action of actions) {
			let extractedAction: Action<BookingTableRowData>;
			if (typeof action === "function") {
				extractedAction = action(processedData);
			} else {
				extractedAction = action;
			}

			if (extractedAction.tooltip === tooltip) {
				return extractedAction;
			}
		}
	}
};

describe("BookingTable", () => {
	describe("Data Processing", () => {
		const processedData = processBookingTableData(BOOKING_TABLE_DATA);
		for (let i = 0; i < processedData.length; i++) {
			const processedItem = processedData[i];
			const originalItem = BOOKING_TABLE_DATA[i];
			it(`Processes data correctly on item with ID ${processedItem.id}`, () => {
				expect(processedItem.status).toBeOneOf(
					Object.values(BookingStatus).map(t => toTitleWords(t))
				);
				expect(processedItem.bookingType).toBeOneOf(
					Object.values(BookingType).map(t => toTitleWords(t))
				);
				expect(processedItem.bookingType).toBeOneOf(
					Object.values(BookingType).map(t => toTitleWords(t))
				);
				expect(processedItem.id).toEqual(originalItem.id);
				expect(processedItem.username).toEqual(originalItem.username);
				expect(typeof processedItem.vehicle).toEqual("string");
				expect(typeof processedItem.toDay).toEqual("number");
				expect(typeof processedItem.toMonth).toEqual("string");
				expect(typeof processedItem.toYear).toEqual("number");
				expect(processedItem.to instanceof Date).toBeTrue();
				expect(typeof processedItem.fromDay).toEqual("number");
				expect(typeof processedItem.fromMonth).toEqual("string");
				expect(typeof processedItem.fromYear).toEqual("number");
				expect(processedItem.from instanceof Date).toBeTrue();
				expect(typeof processedItem.createdAtDay).toEqual("number");
				expect(typeof processedItem.createdAtMonth).toEqual("string");
				expect(typeof processedItem.createdAtYear).toEqual("number");
				expect(processedItem.createdAt instanceof Date).toBeTrue();
			});
		}
	});

	describe("Props Passing", () => {
		it("Passes correct data into MaterialTable", () => {
			// Check if correct data is being passed into MaterialTable

			const bookingTable = shallow(
				<BookingTable
					data={BOOKING_TABLE_DATA}
					onApprove={() => {}}
					onDeny={() => {}}
					onUpdate={() => {}}
					onDelete={() => {}}
					onFinalize={() => {}}
					onRefresh={() => {}}
					onPay={() => {}}
					role={Role.ADMIN}
					isLoading={true}
				/>
			);

			const materialTable = bookingTable.find(MaterialTable).dive();

			expect(materialTable.prop("data")).toEqual(
				processBookingTableData(BOOKING_TABLE_DATA)
			);

			expect(materialTable.prop("isLoading")).toBeTrue();
		});
	});

	describe("Actions", () => {
		it("Calls actions correctly", () => {
			// Check if correct callbacks are being called

			const approveMockFn = jest.fn();
			const denyMockFn = jest.fn();
			const editMockFn = jest.fn();
			const deleteMockFn = jest.fn();
			const finalizeMockFn = jest.fn();
			const refreshMockFn = jest.fn();
			const payMockFn = jest.fn();

			const bookingTable = shallow(
				<BookingTable
					data={BOOKING_TABLE_DATA}
					onApprove={approveMockFn}
					onDeny={denyMockFn}
					onUpdate={editMockFn}
					onDelete={deleteMockFn}
					onFinalize={finalizeMockFn}
					onRefresh={refreshMockFn}
					onPay={payMockFn}
					role={Role.ADMIN}
				/>
			);

			const materialTable = bookingTable.find(MaterialTable).dive();

			const actions = materialTable.prop<
				MaterialTableProps<BookingTableItemData>["actions"]
			>("actions");

			if (actions) {
				for (const action of actions) {
					if (typeof action === "function") {
						const extractedAction = action(BOOKING_TABLE_DATA[0]);
						extractedAction.onClick(new Event("click"), BOOKING_TABLE_DATA[0]);
					} else {
						action.onClick(new Event("click"), BOOKING_TABLE_DATA[0]);
					}
				}
			}

			expect(approveMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(denyMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(editMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(editMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(deleteMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(deleteMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(finalizeMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(payMockFn).toBeCalledWith(BOOKING_TABLE_DATA[0]);
			expect(refreshMockFn).toBeCalled();
		});

		it("Returns the correct actions for specified roles.", () => {
			for (const role of [...Object.values(Role), null]) {
				const guestActions = getBookingTableActions(role, {
					onApprove: () => {},
					onDeny: () => {},
					onDelete: () => {},
					onUpdate: () => {},
					onRefresh: () => {},
					onFinalize: () => {},
					onPay: () => {}
				});

				const approveAction = findAction(guestActions, "Approve");
				const denyAction = findAction(guestActions, "Deny");
				const deleteAction = findAction(guestActions, "Delete");
				const updateAction = findAction(guestActions, "Update");
				const refreshAction = findAction(guestActions, "Refresh Booking List");
				const finalizeAction = findAction(guestActions, "Finalize");
				const payAction = findAction(guestActions, "Mark as paid");

				if (role === Role.GUEST || role === null) {
					expect(approveAction).toBeUndefined();
					expect(denyAction).toBeUndefined();
					expect(deleteAction).toBeUndefined();
					expect(updateAction).toBeUndefined();
					expect(finalizeAction).toBeUndefined();
					expect(payAction).toBeUndefined();
					expect(refreshAction).toBeDefined();
				} else if (role) {
					expect(approveAction).toBeDefined();
					expect(denyAction).toBeDefined();
					expect(deleteAction).toBeDefined();
					expect(updateAction).toBeDefined();
					expect(finalizeAction).toBeDefined();
					expect(payAction).toBeDefined();
					expect(refreshAction).toBeDefined();
				}
			}
		});

		for (const role of [...Object.values(Role), null]) {
			it(`Hides actions correctly based on role ${role}`, () => {
				const guestActions = getBookingTableActions(role, {
					onApprove: () => {},
					onDeny: () => {},
					onDelete: () => {},
					onUpdate: () => {},
					onRefresh: () => {},
					onFinalize: () => {},
					onPay: () => {}
				});

				const approveAction = findAction(guestActions, "Approve");
				const denyAction = findAction(guestActions, "Deny");
				const deleteAction = findAction(guestActions, "Delete");
				const updateAction = findAction(guestActions, "Update");
				const refreshAction = findAction(guestActions, "Refresh Booking List");
				const finalizeAction = findAction(guestActions, "Finalize");
				const payAction = findAction(guestActions, "Mark as paid");

				if (role === Role.GUEST || role === null) {
					expect(approveAction).toBeUndefined();
					expect(denyAction).toBeUndefined();
					expect(deleteAction).toBeUndefined();
					expect(updateAction).toBeUndefined();
					expect(finalizeAction).toBeUndefined();
					expect(payAction).toBeUndefined();
					expect(refreshAction).toBeDefined();
				} else if (role) {
					expect(approveAction).toBeDefined();
					expect(denyAction).toBeDefined();
					expect(deleteAction).toBeDefined();
					expect(updateAction).toBeDefined();
					expect(finalizeAction).toBeDefined();
					expect(payAction).toBeDefined();
					expect(refreshAction).toBeDefined();
				}
			});
		}

		for (const item of BOOKING_TABLE_DATA) {
			it(`Hides the actions correctly on booking item ID ${item.id}`, () => {
				const actions = getBookingTableActions(Role.MASTER, {
					onApprove: () => {},
					onDeny: () => {},
					onDelete: () => {},
					onUpdate: () => {},
					onRefresh: () => {},
					onFinalize: () => {},
					onPay: () => {}
				});

				const approveAction = findAction(actions, "Approve", item);
				const denyAction = findAction(actions, "Deny", item);
				const deleteAction = findAction(actions, "Delete", item);
				const updateAction = findAction(actions, "Update", item);
				const finalizeAction = findAction(actions, "Finalize", item);
				const payAction = findAction(actions, "Mark as paid", item);
				const refreshAction = findAction(actions, "Refresh Booking List", item);

				expect(Boolean(approveAction?.hidden)).not.toEqual(item.approvable);
				expect(Boolean(denyAction?.hidden)).not.toEqual(item.approvable);
				expect(Boolean(deleteAction?.hidden)).not.toEqual(item.deletable);
				expect(Boolean(updateAction?.hidden)).not.toEqual(item.updatable);
				expect(Boolean(finalizeAction?.hidden)).not.toEqual(item.finalizable);
				expect(Boolean(payAction?.hidden)).not.toEqual(item.payable);
				expect(Boolean(refreshAction?.hidden)).toBeOneOf([undefined, false]);
			});
		}
	});
});
