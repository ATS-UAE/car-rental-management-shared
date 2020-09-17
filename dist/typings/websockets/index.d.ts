export * from "./Booking";
export interface SocketEvent<T> {
	name: string;
	data: T;
}
