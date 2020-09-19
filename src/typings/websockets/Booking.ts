import type { SocketEvent, SocketEventName } from ".";
import { BookingServerResponsePatch } from "../api";

export type SocketEventBookingUpdate = SocketEvent<
	SocketEventName.BOOKING_UPDATE,
	BookingServerResponsePatch["data"]
>;
