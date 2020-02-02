import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router";
import { mount, ReactWrapper } from "enzyme";
import { API_URL } from "../../utils/helpers/api";
import { BookingTable as BookingTableContainer } from ".";
import { BookingTable, processBookingTableData } from "../presentational";
import { BOOKING_TABLE_DATA } from "../../fixtures";

describe("BookingTable container", () => {
	describe("Actions", () => {
		const mock = new MockAdapter(axios);
		let bookingTable: ReactWrapper<
			any,
			Readonly<{}>,
			React.Component<{}, {}, any>
		>;
		beforeEach(() => {
			mock.reset();

			bookingTable = mount(
				<MemoryRouter>
					<BookingTableContainer />
				</MemoryRouter>
			);
		});

		describe("On approve", () => {
			it("sends PATCH request", async () => {
				const bookingTablePresentational = bookingTable.find(BookingTable);
				const bookingItem = processBookingTableData(BOOKING_TABLE_DATA)[0];
				const requestUri =
					API_URL + `/api/carbooking/bookings/${bookingItem.id}`;

				mock.onGet(requestUri);

				bookingTablePresentational.prop("onApprove")(bookingItem);

				await axios.get("/users").then(function(response) {
					console.log(response.data);
				});

				expect(mock.history["patch"][0].url).toEqual(requestUri);
				expect(mock.history["patch"][0].data).toEqual({
					id: bookingItem.id,
					approved: true
				});
			});
		});
		describe("On deny", () => {
			it("sends PATCH request", async () => {
				const bookingTablePresentational = bookingTable.find(BookingTable);
				const bookingItem = processBookingTableData(BOOKING_TABLE_DATA)[0];
				const requestUri =
					API_URL + `/api/carbooking/bookings/${bookingItem.id}`;

				mock.onGet(requestUri);

				bookingTablePresentational.prop("onApprove")(bookingItem);

				await axios.get("/users").then(function(response) {
					console.log(response.data);
				});

				expect(mock.history["patch"][0].url).toEqual(requestUri);
				expect(mock.history["patch"][0].data).toEqual({
					id: bookingItem.id,
					approved: false
				});
			});
		});
	});
});
