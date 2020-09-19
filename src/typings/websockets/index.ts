export * from "./Booking";

export enum SocketEventName {
	BOOKING_UPDATE = "booking_update"
}

export interface SocketEvent<EventName extends SocketEventName, Data> {
	name: Event;
	data: Data;
}