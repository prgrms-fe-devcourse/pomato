import type { SupabaseClient, RealtimeChannel } from "@supabase/supabase-js";

// realtime 채널 제목
export type Topic = string;

// realtime 기본 factory
export type ChannelFactory = (supabase: SupabaseClient) => RealtimeChannel;

// realtime 채널 factory map
export type RealtimeChannelFactories = Map<Topic, ChannelFactory>;

// realtime 채널 map
export type RealtimeChannels = Map<Topic, RealtimeChannel>;

export type RealtimeHanderConfig = {
  /**
   * 현재 탭이 해당 탭이 아닐 경우 몇 초후 realtime 구독을 취소할지 결정할 설정 파일
   */
  inactiveTabTimeoutSeconds: number;
};

// 채널 콜백
export type SubscriptionEventCallbacks = {
  onSubscribe?: (channel: RealtimeChannel) => void;
  onClose?: (channel: RealtimeChannel) => void;
  onTimeout?: (channel: RealtimeChannel) => void;
  onError?: (channel: RealtimeChannel, err: Error) => void;
};

// 채널별 콜백 map
export type SubscriptionEventCallbacksMap = Map<Topic, SubscriptionEventCallbacks>;
