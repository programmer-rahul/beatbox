export type TQueueType = "home" | "saved" | "playlist";

export interface TQueue {
  type: TQueueType;
  tracksCount?: number;
  name?: string;
}

export interface TQueueSlice {
  currentQueue: TQueue;
  setCurrentQueue: (newQueue: TQueue) => void;
}
