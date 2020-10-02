export interface ClientAttributes {
    id: number;
    name: string;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}
