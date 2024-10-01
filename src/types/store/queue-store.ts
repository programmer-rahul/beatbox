type TQueueType = "home" | "saved" | "playlist";

interface TQueue {
  type: TQueueType;
  tracksCount?: number;
  name?: string;
}

interface TQueueStore {
  currentQueue: TQueue;
  setCurrentQueue: (newQueue: TQueue) => void;
}

export { TQueueStore, TQueue, TQueueType };
