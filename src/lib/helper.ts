const formatMusicFileDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes < 10 ? 0 : ""}${minutes}:${
    remainingSeconds < 10 ? 0 : ""
  }${remainingSeconds}`;
};

// Debounce function to limit the number of times a function is called
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args); // Call the passed function with its arguments after delay
    }, delay);
  };
}

export { formatMusicFileDuration, debounce };
