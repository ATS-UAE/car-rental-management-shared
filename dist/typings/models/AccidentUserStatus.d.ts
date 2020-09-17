export interface AccidentUserStatusAttributes {
    read: boolean;
    deleted: boolean;
    accidentId: number;
    userId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}
