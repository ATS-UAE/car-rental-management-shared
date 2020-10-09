import { ServerResponse } from ".";

export type PushSubscriptionParamsPostMobile = {
	type: "expo";
	data: string;
};

export type PushSubscriptionParamsPostWeb = {
	endpoint: string;
	keys: {
		p256dh: string;
		auth: string;
	};
};

export type PushSubscriptionParamsPost =
	| PushSubscriptionParamsPostMobile
	| PushSubscriptionParamsPostWeb;

export type PushSubscriptionResponsePost = ServerResponse<null>;
