import type { SocketEvent } from ".";
import { BookingServerResponsePatch } from "../api";

export type BookingUpdateEvent = SocketEvent<
	BookingServerResponsePatch["data"]
>;
