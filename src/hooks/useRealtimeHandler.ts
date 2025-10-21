import {
  REALTIME_SUBSCRIBE_STATES,
  type RealtimeChannel,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { useShallow } from "zustand/shallow";

import { useRealtimeStore } from "@stores/useRealtimeStore";
import type { ChannelFactory, SubscriptionEventCallbacks, Topic } from "@type/realtime.types";

export const useRealtimeHandler = <T extends SupabaseClient>() => {
  const {
    inactiveTabTimeoutSeconds,
    started,
    supabaseClient,
    inactiveTabTimer,
    setInactiveTabTimer,
    setStarted,
    addChannels,
    removeChannels,
    addSubscriptionEventCallbacks,
  } = useRealtimeStore(
    useShallow((state) => ({
      inactiveTabTimeoutSeconds: state.inactiveTabTimeoutSeconds,
      started: state.started,
      supabaseClient: state.supabaseClient,
      inactiveTabTimer: state.inactiveTabTimer,
      setInactiveTabTimer: state.setInactiveTabTimer,
      setStarted: state.setStarted,
      addChannels: state.addChannel,
      removeChannels: state.removeChannel,
      addSubscriptionEventCallbacks: state.addSubscriptionEventCallbacks,
    })),
  );

  const start = () => {
    if (started) {
      console.warn("이미 realtime이 실행중입니다.");
      return () => {};
    }

    setStarted(true);
    const removeVisibilityChangeListener = addOnVisibilityChangeListener();
    subscribeToAllCreatedChannels();

    return () => {
      removeVisibilityChangeListener();
      unsubscribeFromAllChannels();
    };
  };

  const createChannel = (channelFactory: ChannelFactory) => {
    const channel = channelFactory(supabaseClient as T);
    addChannels(channel.topic, channel);
    return channel;
  };

  const addChannel = (
    channelFactory: ChannelFactory,
    isLogin = true,
    newSubscriptionEventCallbacks?: SubscriptionEventCallbacks,
  ) => {
    const channel = createChannel(channelFactory);
    if (useRealtimeStore.getState().channelFactories.has(channel.topic)) {
      console.warn("이미 존재하는 채널입니다");
      unsubscribeFromChannel(channel.topic);
    }
    addChannels(channel.topic, channel);
    if (newSubscriptionEventCallbacks) {
      addSubscriptionEventCallbacks(channel.topic, newSubscriptionEventCallbacks);
    }

    if (started) {
      void subscribeToChannel(channel, isLogin, newSubscriptionEventCallbacks);
    }

    return () => {
      removeChannel(channel.topic);
    };
  };

  const removeChannel = (topic: Topic) => {
    if (!topic.startsWith("realtime:")) {
      topic = `realtime:${topic}`;
    }
    removeChannels(topic);
    unsubscribeFromChannel(topic);
  };

  const subscribeToChannel = async (
    channel: RealtimeChannel,
    isLogin = true,
    newSubscriptionEventCallbacks?: SubscriptionEventCallbacks,
  ) => {
    if (
      channel.state === ("joined" as typeof channel.state) ||
      channel.state === ("joining" as typeof channel.state)
    ) {
      console.debug("이미 연결되어있습니다");
      return;
    }
    if (isLogin) await refreshSession();

    channel.subscribe((status, err) => {
      void handleSubscriptionStateEvent(channel, status, err, newSubscriptionEventCallbacks);
    });
  };

  const subscribeToAllCreatedChannels = () => {
    const channels = useRealtimeStore.getState().channels;
    for (const channel of channels.values()) {
      if (channel) {
        void subscribeToChannel(channel);
      }
    }
  };

  const resubscribeToChannel = (topic: Topic) => {
    const channelFactory = useRealtimeStore.getState().channelFactories.get(topic);
    if (!channelFactory) {
      throw new Error(`Channel factory not found for topic: ${topic}`);
    }
    const channel = createChannel(channelFactory);
    void subscribeToChannel(channel);
  };

  const resubscribeToAllChannels = () => {
    const channels = useRealtimeStore.getState().channels;
    for (const topic of useRealtimeStore.getState().channelFactories.keys()) {
      if (!channels.get(topic)) {
        resubscribeToChannel(topic);
      }
    }
  };

  const unsubscribeFromChannel = (topic: Topic) => {
    if (!topic.startsWith("realtime:")) {
      topic = `realtime:${topic}`;
    }
    const channel = useRealtimeStore.getState().channels.get(topic);
    if (channel && supabaseClient) {
      void supabaseClient.removeChannel(channel);
    }
  };

  const unsubscribeFromAllChannels = () => {
    const channel = useRealtimeStore.getState().channels;
    for (const topic of channel.keys()) {
      unsubscribeFromChannel(topic);
    }
  };

  const handleSubscriptionStateEvent = async (
    channel: RealtimeChannel,
    status: REALTIME_SUBSCRIBE_STATES,
    err: Error | undefined,
    newSubscriptionEventCallbacks?: SubscriptionEventCallbacks,
  ) => {
    const { topic } = channel;
    const callbacks =
      newSubscriptionEventCallbacks ??
      useRealtimeStore.getState().subscriptionEventCallbacks.get(channel.topic);
    switch (status) {
      case REALTIME_SUBSCRIBE_STATES.SUBSCRIBED: {
        console.debug(`'${topic}'에 구독완료`);
        if (callbacks?.onSubscribe) {
          callbacks.onSubscribe(channel);
        }
        break;
      }
      case REALTIME_SUBSCRIBE_STATES.CLOSED: {
        console.debug(`'${topic}에 구독 닫힘`);
        if (callbacks?.onClose) {
          callbacks.onClose(channel);
        }
        break;
      }
      case REALTIME_SUBSCRIBE_STATES.TIMED_OUT: {
        console.debug(`'${topic}'에 구독 타임 아웃`);
        if (callbacks?.onTimeout) {
          callbacks.onTimeout(channel);
        }
        break;
      }
      case REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR: {
        if (document.hidden) {
          console.debug(`${topic} 채널 에러 발생했으며 탭 비활성화 상태로 채널을 제거합니다`);
          await supabaseClient?.removeChannel(channel);
          return;
        } else if (err && err.message?.startsWith("Token has expired")) {
          console.debug("해당 채널 토큰 만료");
          // 재구독
        } else {
          console.warn(`${topic} 채널에 에러 발생`, err?.message);
        }
        if (callbacks?.onError) {
          callbacks.onError(channel, err!);
        }
        break;
      }
      default: {
        throw new Error(`Unknown channel status `);
      }
    }
  };

  const refreshSession = async () => {
    if (!supabaseClient) throw new Error("SupabaseClient가 존재하지 않습니다");

    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
      throw error;
    }
    if (!data.session) {
      throw new Error("세션이 존재하지 않습니다");
    }
    if (supabaseClient.realtime.accessTokenValue !== data.session.access_token) {
      await supabaseClient.realtime.setAuth(data.session.access_token);
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (!inactiveTabTimer) {
        setInactiveTabTimer(
          setTimeout(() => {
            unsubscribeFromAllChannels();
          }, inactiveTabTimeoutSeconds * 1000),
        );
      }
    } else {
      if (inactiveTabTimer) {
        clearTimeout(inactiveTabTimer);
        setInactiveTabTimer(null);
      }
      resubscribeToAllChannels();
    }
  };

  const addOnVisibilityChangeListener = () => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  };

  return {
    started,
    start, // 전체 Realtime 시스템 시작 및 구독 등록
    stop: unsubscribeFromAllChannels, // 전체 중지용 (선택)
    addChannel, // 개별 채널 추가
    removeChannel, // 개별 채널 제거
    subscribeToChannel, // 직접 특정 채널만 다시 구독
    unsubscribeFromChannel, // 특정 채널만 해제 };
  };
};
