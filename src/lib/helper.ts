const formatMusicFileDuration = (
  duration: number,
  type: "seconds" | "milliseconds" = "seconds",
): string => {
  const totalSeconds =
    type === "milliseconds"
      ? Math.floor(duration / 1000)
      : Math.floor(duration);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

const calculateRemainingTime = (startTime: Date, duration: number) => {
  const currentTime = new Date();
  const elapsedSeconds = Math.floor(
    (currentTime.getTime() - startTime.getTime()) / 1000,
  );
  return duration - elapsedSeconds;
};

export { formatMusicFileDuration, calculateRemainingTime };
