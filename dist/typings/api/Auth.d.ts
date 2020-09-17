import { UserAttributes, ServerResponse } from "..";
import { DatePropsToUnix } from "../utils";
export interface AuthAttributes extends Omit<UserAttributes, "clientId" | "password"> {
    clientId: number;
}
export declare type AuthServerResponseGet = ServerResponse<DatePropsToUnix<AuthAttributes>>;
