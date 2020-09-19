import type { BookingServerResponseGet } from "../api";
import type { SocketEvent, SocketEventName } from ".";

export type BookingUpdateEventData = BookingServerResponseGet["data"];

export type BookingUpdateEvent = SocketEvent<
	SocketEventName.BOOKING_UPDATE,
	BookingUpdateEvent
>;
