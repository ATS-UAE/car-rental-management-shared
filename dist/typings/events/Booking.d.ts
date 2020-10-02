import type { NotificationEvent, EventName } from ".";
import { BookingAttributes } from "../models";
/**
 * Sends the approval status of the booking.
 */
export declare type BookingApprovalEventData = Pick<BookingAttributes, "id" | "approved">;
/**
 * Sends the ID of the new booking.
 */
export declare type BookingCreateEventData = Pick<BookingAttributes, "id">;
export declare type BookingApprovalEvent = NotificationEvent<EventName.BOOKING_APPROVAL, BookingApprovalEventData>;
export declare type BookingCreateEvent = NotificationEvent<EventName.BOOKING_CREATE, BookingCreateEventData>;
