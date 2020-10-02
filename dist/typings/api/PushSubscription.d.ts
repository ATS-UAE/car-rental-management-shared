import { ServerResponse } from ".";
export declare type PushSubscriptionParamsPostMobile = {
    type: "expo";
    data: string;
};
export declare type PushSubscriptionParamsPostWeb = PushSubscription;
export declare type PushSubscriptionParamsPost = PushSubscriptionParamsPostMobile | PushSubscriptionParamsPostWeb;
export declare type PushSubscriptionResponsePost = ServerResponse<null>;
