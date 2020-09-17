import type { SocketEvent } from ".";
import { BookingServerResponsePatch } from "../api";
export declare type BookingUpdateEvent = SocketEvent<
	BookingServerResponsePatch["data"]
>;
