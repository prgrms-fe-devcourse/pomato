import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";

import type {
  ChannelFactory,
  RealtimeChannelFactories,
  RealtimeChannels,
  SubscriptionEventCallbacksMap,
  SubscriptionEventCallbacks,
  Topic,
} from "@type/realtime.types";
import supabase from "@utils/supabase";

type RealtimeState<T extends SupabaseClient> = {
  inactiveTabTimeoutSeconds: number;
  supabaseClient: T | null;
  channels: RealtimeChannels;
  channelFactories: RealtimeChannelFactories;
  subscriptionEventCallbacks: SubscriptionEventCallbacksMap;
  inactiveTabTimer: ReturnType<typeof setTimeout> | null;
  started: boolean;

  /** 액션 */
  setInactiveTabTimeoutSeconds: (seconds: number) => void;
  setStarted: (started: boolean) => void;
  setInactiveTabTimer: (timer: ReturnType<typeof setTimeout> | null) => void;

  /** 채널 팩토리 관리 */
  addChannelFactory: (topic: Topic, factory: ChannelFactory) => void;
  removeChannelFactory: (topic: Topic) => void;

  /**리얼 타임 채널 관리 */
  addChannel: (topic: Topic, channel: RealtimeChannel) => void;
  removeChannel: (topic: Topic) => void;

  /** 구독된 채널 이벤트 콜백 관리 */
  addSubscriptionEventCallbacks: (topic: Topic, callbacks: SubscriptionEventCallbacks) => void;
  removeSubscriptionEventCallbacks: (topic: Topic) => void;
};

export const useRealtimeStore = create<RealtimeState<SupabaseClient>>((set, get) => ({
  inactiveTabTimeoutSeconds: 10,
  supabaseClient: supabase,
  channels: new Map(),
  channelFactories: new Map(),
  subscriptionEventCallbacks: new Map(),
  inactiveTabTimer: null,
  started: false,

  setInactiveTabTimeoutSeconds: (seconds) => set({ inactiveTabTimeoutSeconds: seconds }),
  setStarted: (started) => set({ started }),
  setInactiveTabTimer: (timer) => set({ inactiveTabTimer: timer }),

  addChannelFactory: (topic, factory: ChannelFactory) => {
    const { channelFactories } = get();
    const newFactories = new Map(channelFactories);
    newFactories.set(topic, factory);
    set({ channelFactories: newFactories });
  },

  removeChannelFactory: (topic) => {
    const { channelFactories } = get();
    const newFactories = new Map(channelFactories);
    newFactories.delete(topic);
    set({ channelFactories: newFactories });
  },

  addChannel: (topic, channel) => {
    const { channels } = get();
    const newChannels = new Map(channels);
    newChannels.set(topic, channel);
    set({ channels: newChannels });
  },

  removeChannel: (topic) => {
    const { channels } = get();
    const newChannels = new Map(channels);
    newChannels.delete(topic);
    set({ channels: newChannels });
  },

  addSubscriptionEventCallbacks: (topic, callbacks) => {
    const { subscriptionEventCallbacks } = get();
    const newSubscriptionEventCallbacks = new Map(subscriptionEventCallbacks);
    newSubscriptionEventCallbacks.set(topic, callbacks);
    set({ subscriptionEventCallbacks: newSubscriptionEventCallbacks });
  },

  removeSubscriptionEventCallbacks: (topic) => {
    const { subscriptionEventCallbacks } = get();
    const newSubscriptionEventCallbacks = new Map(subscriptionEventCallbacks);
    newSubscriptionEventCallbacks.delete(topic);
    set({ subscriptionEventCallbacks: newSubscriptionEventCallbacks });
  },
}));
