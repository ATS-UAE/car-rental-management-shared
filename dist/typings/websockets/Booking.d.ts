import type { SocketEvent, SocketEventName } from ".";
import { BookingServerResponsePatch } from "../api";
export declare type BookingUpdateEvent = SocketEvent<SocketEventName.BOOKING_UPDATE, BookingServerResponsePatch["data"]>;
