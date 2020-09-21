export * from "./Booking";

export enum SocketEventName {
	BOOKING_APPROVAL = "booking_approval",
	BOOKING_CREATE = "booking_create"
}

export interface SocketNotificationEvent<
	NotificationType extends SocketEventName,
	Data
> {
	name: "notification";
	type: NotificationType;
	data: Data;
}
