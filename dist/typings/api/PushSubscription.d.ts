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
export declare type PushSubscriptionParamsPost = PushSubscriptionParamsPostMobile | PushSubscriptionParamsPostWeb;
export declare type PushUnsubscribeParamsPost = PushUnsubscribeParamsPostMobile | PushUnsubscribeParamsPostWeb;
export declare type PushSubscriptionResponsePost = ServerResponse<null>;
export declare type PushUnsubscribeResponsePost = ServerResponse<null>;
