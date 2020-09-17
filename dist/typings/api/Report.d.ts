import { ServerResponse } from ".";
export interface ReportUnitSummaryAttributes {
    plateNumber: string;
    brand: string;
    model: string;
    odometer: number | null;
    accidents: number;
    bookings: number;
    categories: string[];
    issues: number;
    defleeted: boolean;
    wialonUnit: boolean;
    wialonUnitName?: string | null;
    client?: string;
}
export declare type ReportUnitSummaryServerResponseGetAll = ServerResponse<ReportUnitSummaryAttributes[]>;
