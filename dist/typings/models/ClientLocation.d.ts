export interface ClientLocationAttributes {
    locationId: number;
    clientId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}
