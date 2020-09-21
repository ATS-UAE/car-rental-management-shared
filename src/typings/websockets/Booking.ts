import type { SocketEvent, SocketEventName } from ".";

/**
 * Sends the approval status of the booking.
 */
export type BookingApprovalEventData = boolean | null;

/**
 * Sends the ID of the new booking.
 */
export type BookingCreateEventData = number;

export type BookingApprovalEvent = SocketEvent<
	SocketEventName.BOOKING_APPROVAL,
	BookingApprovalEventData
>;

export type BookingCreateEvent = SocketEvent<
	SocketEventName.BOOKING_CREATE,
	BookingCreateEventData
>;
