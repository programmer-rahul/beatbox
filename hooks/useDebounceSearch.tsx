import { debounce } from "@/libs/debounce";
import { useCallback, useEffect, useState } from "react";

// Custom hook for debounced search
function useDebouncedSearch(initialValue = "", delay = 300) {
  const [searchText, setSearchText] = useState(initialValue);
  const [debouncedSearchText, setDebouncedSearchText] = useState(initialValue);
  const [searching, setSearching] = useState(false);

  const debouncedSetSearchText = useCallback(
    debounce((text) => {
      setDebouncedSearchText(text);
      setSearching(false);
    }, delay),
    [delay],
  );

  useEffect(() => {
    debouncedSetSearchText(searchText);
  }, [searchText, debouncedSetSearchText]);

  return {
    searchText,
    setSearchText,
    debouncedSearchText,
    searching,
    setSearching,
  };
}

export default useDebouncedSearch;
