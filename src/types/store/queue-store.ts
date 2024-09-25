interface TQueue {
  type: "home" | "saved" | "playlist";
  tracksCount?: number;
}

interface TQueueStore {
  currentQueue: TQueue;
  setCurrentQueue: (newQueue: TQueue) => void;
}

export { TQueueStore };
