export * from "./utils";

export interface InviteToken {
	clientId?: number;
	email: string;
}

export interface PasswordResetToken {
	passwordReset: boolean;
	email: string;
}
