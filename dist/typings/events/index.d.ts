export * from "./Booking";
export declare enum EventName {
    BOOKING_APPROVAL = "booking_approval",
    BOOKING_CREATE = "booking_create"
}
export interface NotificationEvent<NotificationType extends EventName, Data> {
    type: NotificationType;
    data: Data;
}
