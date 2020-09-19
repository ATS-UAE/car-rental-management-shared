import type {
	BookingServerResponseGet,
	BookingServerResponsePost
} from "../api";
import type { SocketEvent, SocketEventName } from ".";

export type BookingUpdateEventData = BookingServerResponseGet["data"];

export type BookingCreateEventData = BookingServerResponsePost["data"];

export type BookingUpdateEvent = SocketEvent<
	SocketEventName.BOOKING_UPDATE,
	BookingUpdateEventData
>;

export type BookingCreateEvent = SocketEvent<
	SocketEventName.BOOKING_CREATE,
	BookingCreateEventData
>;
