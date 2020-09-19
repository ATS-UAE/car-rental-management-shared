import type { SocketEvent, SocketEventName } from ".";
import { BookingServerResponsePatch } from "../api";

export type BookingUpdateEvent = SocketEvent<
	SocketEventName.BOOKING_UPDATE,
	BookingServerResponsePatch["data"]
>;
