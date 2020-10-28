import { ServerResponse } from ".";

export interface PushSubscriptionParamsPostMobile {
	type: "expo";
	data: string;
}

export interface PushSubscriptionParamsPostWeb {
	endpoint: string;
	keys: {
		p256dh: string;
		auth: string;
	};
}

export type PushSubscriptionParamsPost =
	| PushSubscriptionParamsPostMobile
	| PushSubscriptionParamsPostWeb;

export type PushSubscriptionResponsePost = ServerResponse<null>;
