export type TQueueType = "home" | "saved" | "playlist";

export interface TQueue {
  type: TQueueType;
  tracksCount?: number;
  name?: string;
}

export interface TQueueStore {
  currentQueue: TQueue;
  setCurrentQueue: (newQueue: TQueue) => void;
}

