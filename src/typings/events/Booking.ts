import type { NotificationEvent, EventName } from ".";
import { BookingAttributes } from "../models";

/**
 * Sends the approval status of the booking.
 */
export type BookingApprovalEventData = Pick<
	BookingAttributes,
	"id" | "approved"
>;

/**
 * Sends the ID of the new booking.
 */
export type BookingCreateEventData = Pick<BookingAttributes, "id">;

export type BookingApprovalEvent = NotificationEvent<
	EventName.BOOKING_APPROVAL,
	BookingApprovalEventData
>;

export type BookingCreateEvent = NotificationEvent<
	EventName.BOOKING_CREATE,
	BookingCreateEventData
>;
