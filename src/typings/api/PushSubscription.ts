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

export interface PushUnsubscribeParamsPostMobile {
	data: string;
}

export interface PushUnsubscribeParamsPostWeb {
	endpoint: string;
}

export type PushSubscriptionParamsPost =
	| PushSubscriptionParamsPostMobile
	| PushSubscriptionParamsPostWeb;

export type PushUnsubscribeParamsPost =
	| PushUnsubscribeParamsPostMobile
	| PushUnsubscribeParamsPostWeb;

export type PushSubscriptionResponsePost = ServerResponse<null>;

export type PushUnsubscribeResponsePost = ServerResponse<null>;
