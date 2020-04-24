import { UserAttributes, ServerResponse } from "../";

export interface AuthAttributes extends Omit<UserAttributes, "clientId"> {
	clientId: number;
}

export type AuthServerResponseGet = ServerResponse<
	Omit<AuthAttributes, "password">
>;
