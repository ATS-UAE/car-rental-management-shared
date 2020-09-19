export enum SocketEventName {
	BOOKING_UPDATE = "booking_update",
	BOOKING_CREATE = "booking_create"
}

export interface SocketEvent<EventName extends SocketEventName, Data> {
	name: EventName;
	data: Data;
}
