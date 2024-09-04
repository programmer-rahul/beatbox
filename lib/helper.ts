const formatMusicFileDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes < 10 ? 0 : ""}${minutes}:${
    remainingSeconds < 10 ? 0 : ""
  }${remainingSeconds}`;
};

export { formatMusicFileDuration };
