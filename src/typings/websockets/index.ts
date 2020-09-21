export * from "./Booking";

export enum SocketEventName {
	BOOKING_APPROVAL = "booking_approval",
	BOOKING_CREATE = "booking_create"
}

export interface SocketEvent<EventName extends SocketEventName, Data> {
	name: EventName;
	data: Data;
}
