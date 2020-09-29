import { ServerResponse } from ".";

export type PushSubscriptionParamsPostMobile = {
	type: "expo";
	data: string;
};

export type PushSubscriptionParamsPostWeb = PushSubscription;

export type PushSubscriptionParamsPost =
	| PushSubscriptionParamsPostMobile
	| PushSubscriptionParamsPostWeb;

export type PushSubscriptionResponsePost = ServerResponse<null>;
